/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import nodeFetch, { Response } from 'node-fetch';
import { IKeyValueCache } from '../cache';

export default function createFetch(options: { cache: IKeyValueCache }) {
  if (!options || !options.cache) throw Error('cache is a required option');

  const { cache } = options;

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
    const response = await nodeFetch(url, reqOptions);
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

    if (!isCachable) {
      return nodeFetch(url, reqOptions);
    }

    const data = await cache.get(url);

    const cached = await cachedResponse(url, data);

    if (cached) return cached;

    return cachingFetch(url, reqOptions);
  };
}
