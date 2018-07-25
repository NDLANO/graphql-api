/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Request, Response, NextFunction } from 'express';
import { KeyValueCache } from './cache';
import crypto from 'crypto';

interface Operation {
  query: string;
  variables?: any;
  operationName: string;
}

const hashPostBody = (query: string) => {
  // trim query
  const q = query.replace(/\s+/g, '');
  const key = crypto
    .createHash('sha256')
    .update(q)
    .digest('hex');
  return key;
};

const sendContent = (res: Response, value: string) => {
  res.setHeader('X-Cache', 'HIT');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Length', Buffer.byteLength(value, 'utf8').toString());
  res.write(value);
  res.end();
};

function isOperation(data: any): data is Operation {
  return data.query;
}

function isOperationArray(data: any): data is Operation[] {
  return Array.isArray(data);
}

async function lookup(
  cache: KeyValueCache,
  data: Operation[] | Operation,
): Promise<string | undefined> {
  if (
    isOperation(data) &&
    data.query.trim().indexOf('query') === 0 // only if query, don't cache mutations
  ) {
    const key = hashPostBody(data.query);
    const value = await cache.get(key);
    return value;
  } else if (isOperationArray(data)) {
    const values = await Promise.all(
      data.map(async (operation: Operation) => {
        const key = hashPostBody(operation.query);
        const value = await cache.get(key);
        return value ? JSON.parse(value) : value;
      }),
    );

    if (values.every(value => value !== undefined)) {
      return JSON.stringify(values);
    }
  }
  return undefined;
}

export const getFromCacheIfAny = (cache: KeyValueCache) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { method } = req;
  // (N.B! we don't handle persisted queries)

  if (method === 'POST') {
    const data: Operation[] | Operation = req.body;
    const value = await lookup(cache, data);
    if (value) {
      // Cache hit. End response and don't call next middleware
      sendContent(res, value);
      return;
    }
  }

  next();
};

export const storeInCache = (cache: KeyValueCache) => async (
  query: string,
  gqlResponse: any,
): Promise<any> => {
  if (gqlResponse.errors) {
    // skip caching for responses with errors
    delete gqlResponse.extensions;
    return gqlResponse;
  }

  // only if query, we don't cache mutations
  if (query && query.trim().indexOf('query') === 0) {
    const extensions = gqlResponse.extensions;
    // only cache if cache control is enabled
    if (extensions && extensions.cacheControl) {
      // get extensions cache duration
      const minAge = extensions.cacheControl.hints.reduce(
        (min: number, p: any) => (p.maxAge < min ? p.maxAge : min),
        60,
      );

      const minAgeInMs = minAge * 1000;
      const key = hashPostBody(query);

      delete gqlResponse.extensions;
      await cache.set(key, JSON.stringify(gqlResponse), minAgeInMs);
    }
  }
  return gqlResponse;
};
