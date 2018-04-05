/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import nodeFetch from 'node-fetch';
import { apiUrl } from '../config';

const apiBaseUrl = (() => {
  // if (process.env.NODE_ENV === 'test') {
  //   return 'http://some-api';
  // }
  return apiUrl;
})();

function apiResourceUrl(path: string) {
  return apiBaseUrl + path;
}

async function fetchHelper(path: string, context: Context, options?: any) {
  return nodeFetch(apiResourceUrl(path), {
    headers: {
      Authorization: `Bearer ${context.token.access_token}`,
    },
    ...options,
  });
}

export const fetch = fetchHelper;
