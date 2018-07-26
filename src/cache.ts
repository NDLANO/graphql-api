/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import createLRUCache from 'lru-cache';

export interface KeyValueCache {
  get(key: string): Promise<string | undefined>;
  set(key: string, value: string, maxAge?: number): Promise<void>;
}

// size: 50 mb default
export const createCache = (
  options: { size: number } = { size: 50000000 },
): KeyValueCache => {
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
