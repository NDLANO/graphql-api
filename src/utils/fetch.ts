/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import nodeFetch, { Response, Request, RequestInit } from 'node-fetch';
import { AbortSignal } from 'abort-controller';
import { IKeyValueCache } from '../cache';
import { performance } from 'perf_hooks';
import logger from '../utils/logger';

export default function createFetch(options: {
  cache: IKeyValueCache;
  disableCache: boolean;
  signal: AbortSignal;
}) {
  if (!options || !options.cache) throw Error('cache is a required option');

  const { cache } = options;

  async function pureFetch(
    url: string | Request,
    init?: RequestInit,
  ): Promise<Response> {
    const startTime = performance.now();
    const slowLogTimeout = 500;

    const res = await nodeFetch(url, init);
    const elapsedTime = performance.now() - startTime;
    if (elapsedTime > slowLogTimeout) {
      logger.warn(
        `Fetching '${url}' took ${elapsedTime.toFixed(
          2,
        )}ms which is slower than slow log timeout of ${slowLogTimeout}ms`,
      );
    }
    return res;
  }

  function cachedResponse(url: string, data: string): Response {
    if (!data) return null;

    const parsed = JSON.parse(data);

    return new Response(parsed.body, {
      // @ts-ignore
      url,
      headers: parsed.headers,
      status: 200,
    });
  }

  async function cachingFetch(url: string, reqOptions: RequestOptions) {
    const response = await pureFetch(url, reqOptions);

    if (response.status === 200) {
      const body = await response.text();
      await cache.set(
        url,
        JSON.stringify({
          body,
          headers: response.headers,
        }),
        1000 * 60 * 5, // 5 min
      );
      return new Response(body, {
        // @ts-ignore
        url,
        headers: response.headers,
        status: 200,
      });
    }
    return response;
  }

  return async function cachedFetch(
    url: string,
    reqOptions: RequestOptions = {},
  ): Promise<Response> {
    const isCachable =
      (reqOptions.method === undefined || reqOptions.method === 'GET') &&
      reqOptions.cache !== 'no-store' &&
      reqOptions.cache !== 'reload';

    if (!isCachable || options.disableCache === true) {
      return pureFetch(url, reqOptions);
    }

    const data = await cache.get(url);
    const cached = await cachedResponse(url, data);
    if (cached) return cached;

    return cachingFetch(url, reqOptions);
  };
}
