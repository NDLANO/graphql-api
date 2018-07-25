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

export const getFromCacheIfAny = (cache: KeyValueCache) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { method } = req;
  const data = req.method === 'POST' ? req.body : req.query;

  if (
    method === 'POST' &&
    data.query &&
    data.query.trim().indexOf('query') === 0 // only if query, don't cache mutations
  ) {
    const key = hashPostBody(data.query);
    const value = await cache.get(key);

    if (value) {
      // Cache hit. End response and don't call next middleware
      sendContent(res, value);
      return;
    }
  }
  next();
};

export const storeInCache = (cache: KeyValueCache) => async (
  req: Request,
  gqlResponse: any,
) => {
  const { method } = req;
  const data = req.method === 'POST' ? req.body : req.query;

  // only cache POST request (N.B! we don't handle persisted queries)
  if (method === 'POST' && data.query) {
    const extensions = gqlResponse.extensions;
    // only cache if cache control is enabled
    if (extensions && extensions.cacheControl) {
      // get extensions cache duration
      const minAge = extensions.cacheControl.hints.reduce(
        (min: number, p: any) => (p.maxAge < min ? p.maxAge : min),
        60,
      );

      const minAgeInMs = minAge * 1000;
      const key = hashPostBody(data.query);

      delete gqlResponse.extensions;
      await cache.set(key, JSON.stringify(gqlResponse), minAgeInMs);
    }
  }
};
