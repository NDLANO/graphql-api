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
  const fetchFn = createFetch({
    cache,
  });

  const headers = context.token
    ? {
        Authorization: `Bearer ${context.token.access_token}`,
      }
    : {};
  return fetchFn(apiResourceUrl(path), {
    headers,
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
    return externalsToH5pMetaData(json);
  }

  const message = `Api call to ${url} failed with status ${status} ${statusText}`;
  throw Object.assign(new Error(message), { status, json });
}

// converting h5p object from externals to graphQL schema type (Copyright-type)
function externalsToH5pMetaData(obj: any) {
  // looking for externals array
  if (
    obj &&
    obj.metaData &&
    obj.metaData.externals &&
    obj.metaData.externals.length
  ) {
    const h5pArray: any[] = [];
    obj.metaData.externals.map((i: { h5p: any; url: string }) => {
      if (i && i.h5p) {
        // this element have h5p object
        let copyrightElement = {
          license: {
            license: licenseFixer(
              i.h5p.license || '',
              i.h5p.licenseVersion || '',
            ),
            url: i.h5p.source || '',
            description: i.h5p.licenseExtras || '',
          },
          creators: new Array(),
          processors: new Array(),
          rightsholders: i.h5p.authors.map(
            (author: { role: any; name?: string }) => {
              return { type: roleMapper(author.role || ''), name: author.name };
            },
          ),
          origin: i.h5p.source || '',
        };
        h5pArray.push({
          copyright: copyrightElement,
          title: i.h5p.title,
          src: i.url || '',
        });
      }
      return i;
    });

    // adding h5p array
    if (h5pArray.length > 0) {
      obj.metaData.h5ps = h5pArray;
    }
    return obj;
  }
  return obj;
}

// map roles to same roles we use
function roleMapper(role: string): string {
  const objRoles: { [key: string]: string } = {
    Author: 'Writer',
    Editor: 'Editorial',
    Licensee: 'Rightsholder',
  };
  return objRoles[role] || role;
}

// convert the license format from h5p format to license format that we use on other elements
function licenseFixer(lic: any, licVer: any) {
  return `${lic.replace(' ', '-')}-${licVer}`;
}
