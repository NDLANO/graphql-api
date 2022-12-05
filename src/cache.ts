/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import createLRUCache from 'lru-cache';
import { Response } from 'node-fetch';

export interface IKeyValueCache {
  get(key: string): Promise<string | undefined>;
  set(key: string, value: string, maxAge?: number): Promise<void>;
}

// Create a cache with a generic interface.
// Uses lru-cache now, but should be simple to switch to a redis/memcache implementation using the same interface
export const createCache = (
  // size: 100 mb default
  options: { size: number } = { size: 100000000 },
): IKeyValueCache => {
  const cache = createLRUCache({
    max: options.size,
    length: (n: string, key: string) => n.length + key.length,
  });

  return {
    async get(key) {
      return cache.get(key);
    },
    async set(key, value, maxAge) {
      if (maxAge) {
        cache.set(key, value, maxAge);
      } else {
        cache.set(key, value);
      }
    },
  };
};

const cacheControlValues = ['no-store', 'private', 'no-cache']; // In order of strictness
const getCacheStrictness = (
  cacheControlValue: string | number | string[] | undefined,
): number => {
  return cacheControlValues.findIndex(header => cacheControlValue === header);
};

/** Returns `true` if the response can be cached, and `false` if the result shouldn't be cached. */
export const setHeaderIfShouldNotCache = (
  response: Response,
  context: Context,
): boolean => {
  const { res } = context;

  const cacheControlResponse = response.headers
    .get('cache-control')
    ?.toLowerCase();

  const presetHeader = res.getHeader('cache-control');
  const presetStrictness = getCacheStrictness(presetHeader);
  const newStrictness = getCacheStrictness(cacheControlResponse);

  if (presetStrictness < newStrictness && cacheControlResponse) {
    res.setHeader('cache-control', cacheControlResponse);
  }

  return newStrictness === -1;
};
