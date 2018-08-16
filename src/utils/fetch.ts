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

  function cachingFetch(url: string, options: RequestOptions) {
    return nodeFetch(url, options).then((response: Response) => {
      if (response.status === 200) {
        return response
          .clone()
          .text()
          .then(body => {
            return cache.set(
              url,
              JSON.stringify({
                body: body,
                headers: response.headers.raw(),
              }),
              1000 * 60 * 5, // 5 min
            );
          })
          .then(() => {
            return response;
          });
      }
      return response;
    });
  }

  return function cachedFetch(
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

    return cache
      .get(url)
      .then(data => cachedResponse(url, data))
      .then(cached => {
        // return the cached result if it exist
        if (cached) return cached;

        // return fetch request after setting cache
        return cachingFetch(url, options);
      });
  };
}
