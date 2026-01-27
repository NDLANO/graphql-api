/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import LRUCache from "lru-cache";

export interface IKeyValueCache {
  get(key: string): Promise<string | undefined>;
  set(key: string, value: string, maxAge?: number): Promise<void>;
}

export const cacheTime = 1000 * 60 * 5; // 5 min

// Create a cache with a generic interface.
// Uses lru-cache now, but should be simple to switch to a redis/memcache implementation using the same interface
export const createCache = (
  // size: 100 mb default
  options: { size: number } = { size: 100000000 },
): IKeyValueCache => {
  const cache = new LRUCache<string, string>({
    maxSize: options.size,
    sizeCalculation: (n, key) => n.length + key.length,
  });

  return {
    async get(key) {
      return cache.get(key);
    },
    async set(key, value, maxAge) {
      if (maxAge) {
        cache.set(key, value, { ttl: maxAge });
      } else {
        cache.set(key, value);
      }
    },
  };
};

const cacheControlValues = ["no-store", "private", "no-cache"]; // In order of strictness
const getCacheStrictness = (cacheControlValue: string | number | string[] | undefined): number => {
  return cacheControlValues.findIndex((header) => cacheControlValue === header);
};

/** Returns `true` if the response can be cached, and `false` if the result shouldn't be cached. */
export const setHeaderIfShouldNotCache = (response: Response, context: Context): boolean => {
  const cacheControlResponse = response.headers.get("cache-control")?.toLowerCase();

  const presetHeader = context.res.getHeader("cache-control");
  const presetStrictness = getCacheStrictness(presetHeader);
  const newStrictness = getCacheStrictness(cacheControlResponse);

  if (presetStrictness < newStrictness && cacheControlResponse) {
    context.res.setHeader("cache-control", cacheControlResponse);
  }

  return newStrictness === -1;
};

const cache = createCache();

export function getCacheKey(url: string, { versionHash }: Context, useTaxonomyCache?: boolean): string {
  if (useTaxonomyCache && versionHash && versionHash !== "default") {
    return `${url}_${versionHash}`;
  }
  return url;
}

export function getCache() {
  return cache;
}
