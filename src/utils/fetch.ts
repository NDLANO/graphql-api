/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { performance } from "perf_hooks";
import nodeFetch, { Response, Request, RequestInit } from "node-fetch";
import { IKeyValueCache, setHeaderIfShouldNotCache } from "../cache";
import getLogger from "../utils/logger";

function getCacheKey(url: string, { versionHash }: Context, { useTaxonomyCache }: RequestOptions): string {
  if (useTaxonomyCache && versionHash && versionHash !== "default") return `${url}_${versionHash}`;
  return url;
}

export default function createFetch(options: { cache: IKeyValueCache; disableCache: boolean; context: Context }) {
  if (!options || !options.cache) throw Error("cache is a required option");

  const { cache } = options;

  async function pureFetch(
    url: string | Request,
    ctx: Context,
    init?: RequestInit,
  ): Promise<{ response: Response; shouldCache: boolean }> {
    const startTime = performance.now();
    const slowLogTimeout = 500;

    const headers = {
      ...init?.headers,
      "x-correlation-id": ctx.res.locals.correlationId,
    };

    const requestInit = { ...init, headers };

    const response = await nodeFetch(url, requestInit);
    const elapsedTime = performance.now() - startTime;
    if (elapsedTime > slowLogTimeout) {
      getLogger().warn(
        `Fetching '${url}' took ${elapsedTime.toFixed(
          2,
        )}ms which is slower than slow log timeout of ${slowLogTimeout}ms`,
      );
    }

    const shouldCache = setHeaderIfShouldNotCache(response, ctx);
    return { response, shouldCache };
  }

  function cachedResponse(url: string, data: string | undefined): Response | null {
    if (!data) return null;

    const parsed = JSON.parse(data);

    return new Response(parsed.body, {
      url,
      headers: parsed.headers,
      status: 200,
    });
  }

  async function cachingFetch(url: string, ctx: Context, reqOptions: RequestOptions) {
    const { response, shouldCache } = await pureFetch(url, ctx, reqOptions);

    if (response.status === 200) {
      const body = await response.text();

      if (shouldCache) {
        const cacheKey = getCacheKey(url, ctx, reqOptions);
        await cache.set(
          cacheKey,
          JSON.stringify({
            body,
            headers: response.headers,
          }),
          1000 * 60 * 5, // 5 min
        );
      }

      return new Response(body, {
        url,
        headers: response.headers,
        status: 200,
      });
    }
    return response;
  }

  return async function cachedFetch(url: string, ctx: Context, reqOptions: RequestOptions = {}): Promise<Response> {
    const isCachable =
      (reqOptions.method === undefined || reqOptions.method === "GET") &&
      reqOptions.cache !== "no-store" &&
      reqOptions.cache !== "reload";

    if (!isCachable || options.disableCache === true) {
      return pureFetch(url, ctx, reqOptions).then((r) => r.response);
    }
    const cacheKey = getCacheKey(url, ctx, reqOptions);
    const data = await cache.get(cacheKey);
    const cached = await cachedResponse(url, data);
    if (cached) return cached;

    return cachingFetch(url, ctx, reqOptions);
  };
}
