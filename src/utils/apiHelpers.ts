/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Response } from 'node-fetch';
import { apiUrl } from '../config';
import createFetch from './fetch';
import { createCache } from '../cache';

const apiBaseUrl = (() => {
  // if (process.env.NODE_ENV === 'test') {
  //   return 'http://some-api';
  // }
  return apiUrl;
})();

function apiResourceUrl(path: string): string {
  if (path.startsWith('http')) {
    return path;
  }
  return apiBaseUrl + path;
}

const cache = createCache();

async function fetchHelper(
  path: string,
  context: Context,
  options?: RequestOptions,
): Promise<Response> {
  const fetch = createFetch({
    cache,
  });

  return fetch(apiResourceUrl(path), {
    headers: {
      Authorization: `Bearer ${context.token.access_token}`,
    },
    ...options,
  });
}

export const fetch = fetchHelper;

export async function resolveJson(response: Response): Promise<any> {
  const { status, ok, url, statusText } = response;

  if (status === 204) {
    // nothing to resolve
    return;
  }

  const json = await response.json();

  if (ok) {
    return json;
  }

  const message = `Api call to ${url} failed with status ${status} ${statusText}`;
  throw Object.assign(new Error(message), { status, json });
}
