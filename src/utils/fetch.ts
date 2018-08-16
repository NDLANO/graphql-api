/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import nodeFetch, { Response } from 'node-fetch';
import { KeyValueCache } from '../cache';

export default function createFetch(options: { cache: KeyValueCache }) {
  if (!options || !options.cache) throw Error('cache is a required option');

  const { cache } = options;

  function cachedResponse(url: string, data: string): Response {
    if (!data) return null;

    const parsed = JSON.parse(data);

    return new Response(parsed.body, {
      // @ts-ignore
      url: url,
      headers: parsed.headers,
      status: 200,
    });
  }

  async function cachingFetch(url: string, options: RequestOptions) {
    const response = await nodeFetch(url, options);
    if (response.status === 200) {
      const clonedResponse = response.clone();
      const body = await clonedResponse.text();
      await cache.set(
        url,
        JSON.stringify({
          body,
          headers: clonedResponse.headers.raw(),
        }),
        1000 * 60 * 5, // 5 min
      );
    }
    return response;
  }

  return async function cachedFetch(
    url: string,
    options: RequestOptions = {},
  ): Promise<Response> {
    const isCachable =
      (options.method === undefined || options.method === 'GET') &&
      options.cache !== 'no-store' &&
      options.cache !== 'reload';

    if (!isCachable) {
      return nodeFetch(url, options);
    }

    const data = await cache.get(url);

    const cached = await cachedResponse(url, data);

    if (cached) return cached;

    return cachingFetch(url, options);
  };
}
