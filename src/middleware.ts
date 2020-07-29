/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Request, Response, NextFunction } from 'express';
import { IKeyValueCache } from './cache';
import crypto from 'crypto';

interface IHint {
  path: any[];
  maxAge: number;
}

interface IOperation {
  query: string;
  variables?: any;
  operationName: string;
}

function hashQuery(query: string) {
  const q = query.replace(/\s+/g, '');
  const key = crypto
    .createHash('sha256')
    .update(q)
    .digest('hex');
  return key;
}

function isOperation(data: any): data is IOperation {
  return data.query;
}

function isOperationArray(data: any): data is IOperation[] {
  return Array.isArray(data);
}

export async function lookup(
  cache: IKeyValueCache,
  data: IOperation[] | IOperation,
): Promise<string | undefined> {
  if (isOperation(data)) {
    const key = hashQuery(data.query);
    const value = await cache.get(key);
    return value;
  } else if (isOperationArray(data)) {
    const values = await Promise.all(
      data.map(async (operation: IOperation) => {
        const key = hashQuery(operation.query);
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

/*export const getFromCacheIfAny = (cache: IKeyValueCache) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { method } = req;
  // (N.B! we don't handle persisted queries)
  if (method === 'POST') {
    const data: IOperation[] | IOperation = req.body;
    const value = await lookup(cache, data);
    if (value) {
      // Cache hit. End response and don't call next middleware
      res.setHeader('X-Cache', 'HIT');
      res.setHeader('Content-Type', 'application/json');
      res.setHeader(
        'Content-Length',
        Buffer.byteLength(value, 'utf8').toString(),
      );
      res.write(value);
      res.end();
      return;
    }
  }

  next();
};*/

function hasCacheControl(extensions: any) {
  return (
    extensions &&
    extensions.cacheControl &&
    extensions.cacheControl.hints &&
    extensions.cacheControl.hints.length > 0
  );
}

function removeExtensions(gqlResponse: any) {
  return { ...gqlResponse, extensions: undefined };
}

export const storeInCache = (cache: IKeyValueCache) => async (
  query: string,
  gqlResponse: any,
): Promise<any> => {
  if (gqlResponse.errors) {
    // skip caching for responses with errors
    return removeExtensions(gqlResponse);
  }

  // only if query, we don't cache mutations
  if (query && query.trim().indexOf('query') === 0) {
    const extensions = gqlResponse.extensions;
    // only cache if cache control is enabled
    if (hasCacheControl(extensions)) {
      // Find min maxAge in all hints and set it
      const hintWithMinAge = extensions.cacheControl.hints.reduce(
        (minHint: IHint, cur: IHint) =>
          cur.maxAge < minHint.maxAge ? cur : minHint,
      );

      const minAgeInMs = hintWithMinAge.maxAge * 1000;

      const key = hashQuery(query);

      await cache.set(
        key,
        JSON.stringify(removeExtensions(gqlResponse)),
        minAgeInMs,
      );
    }
  }
  return removeExtensions(gqlResponse);
};
