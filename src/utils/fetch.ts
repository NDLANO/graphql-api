/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { performance } from "perf_hooks";
import { cacheTime, getCache, getCacheKey, setHeaderIfShouldNotCache } from "../cache";
import { slowLogTimeout as configSlowLogTimeout } from "../config";
import getLogger from "../utils/logger";

const invalidCacheOptions: RequestCache[] = ["no-store", "reload"];
const slowLogTimeout = parseInt(configSlowLogTimeout);

const isCacheable = (requestOptions: RequestInit = {}): boolean => {
  if (requestOptions.cache && invalidCacheOptions.includes(requestOptions.cache)) return false;
  return requestOptions.method === undefined || requestOptions.method === "GET";
};

function cachedResponse(data: string | undefined): Response | null {
  if (!data) return null;

  const parsed = JSON.parse(data);

  return new Response(parsed.body, {
    headers: parsed.headers,
    status: 200,
  });
}

async function pureFetch(url: string, init?: RequestInit): Promise<Response> {
  const startTime = performance.now();

  const response = await fetch(url, init);
  const elapsedTime = performance.now() - startTime;
  if (elapsedTime > slowLogTimeout) {
    getLogger().info(
      `Fetching '${url}' took ${elapsedTime.toFixed(2)}ms which is slower than slow log timeout of ${slowLogTimeout}ms`,
    );
  }

  return response;
}

export async function externalFetch(url: string, ctx: Context, options?: RequestInit): Promise<Response> {
  const cache = getCache();
  if (!cache) throw Error("Failed to retrieve cache.");

  if (!ctx.shouldUseCache || !isCacheable(options)) {
    const response = await pureFetch(url, options);
    setHeaderIfShouldNotCache(response, ctx);
    return response;
  }

  const cacheKey = getCacheKey(url, ctx);
  const data = await cache.get(cacheKey);
  const cached = cachedResponse(data);
  if (cached) return cached;

  const response = await pureFetch(url, options);
  const shouldCache = setHeaderIfShouldNotCache(response, ctx);

  if (response.status !== 200) return response;
  const body = await response.text();

  if (shouldCache) {
    const cacheKey = getCacheKey(url, ctx);
    await cache.set(
      cacheKey,
      JSON.stringify({
        body,
        headers: response.headers,
      }),
      cacheTime,
    );
  }

  return new Response(body, {
    headers: response.headers,
    status: 200,
  });
}
