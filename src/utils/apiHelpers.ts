// @ts-strict-ignore
/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Response } from 'node-fetch';
import { GraphQLError } from 'graphql';
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
    disableCache: !context.shouldUseCache,
    context,
  });

  const accessTokenAuth = context.token
    ? { Authorization: `Bearer ${context.token.access_token}` }
    : null;

  const feideAuthorization = context.feideAuthorization
    ? { feideAuthorization: context.feideAuthorization }
    : null;

  const versionHash = context.versionHash
    ? { versionhash: context.versionHash }
    : null;

  const cacheHeaders = !context.shouldUseCache
    ? { 'Cache-Control': 'no-cache' }
    : {};

  const headers = {
    ...feideAuthorization,
    ...versionHash,
    ...accessTokenAuth,
    ...cacheHeaders,
  };

  return fetchFn(apiResourceUrl(path), context, {
    headers,
    ...options,
  });
}

export const fetch = fetchHelper;

export async function resolveNothingFromStatus(
  response: Response,
): Promise<void> {
  const { status, ok, url, statusText } = response;

  if (ok) {
    return;
  }

  const message = `Api call to ${url} failed with status ${status} ${statusText}`;
  throw new GraphQLError(message, { extensions: { status } });
}

export async function resolveJson(
  response: Response,
  fallback?: any,
): Promise<any> {
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
  if (fallback) {
    console.error(message);
    return fallback;
  }
  throw new GraphQLError(message, { extensions: { status, json } });
}

// converting h5p object from externals to graphQL schema type (Copyright-type)
function externalsToH5pMetaData(obj: any) {
  // looking for externals array
  if (obj?.metaData?.h5ps?.length) {
    const h5pArray: any[] = [];
    obj.metaData.h5ps.map(
      (i: { h5p: any; assets: any[]; url: string; copyText: string }) => {
        if (i && i.h5p) {
          // this element have h5p object
          let copyrightElement = {
            license: {
              license: licenseFixer(
                i.h5p.license || '',
                i.h5p.licenseVersion || '4.0',
              ),
              url: i.h5p.source || '',
              description: i.h5p.licenseExtras || '',
            },
            creators: [] as any[],
            processors: [] as any[],
            rightsholders: i.h5p.authors
              ? i.h5p.authors.map((author: { role: any; name?: string }) => {
                  return {
                    type: roleMapper(author.role || ''),
                    name: author.name || '',
                  };
                })
              : [],
            origin: i.h5p.source || '',
          };
          h5pArray.push({
            copyright: copyrightElement,
            title: i.h5p.title || '',
            src: i.url || '',
            thumbnail: i.h5p.thumbnail || i.assets?.[0]?.thumbnail,
            copyText: i.copyText,
          });
        }
        return i;
      },
    );

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
export function licenseFixer(lic: string, licVer: string) {
  if (lic === 'C') {
    return 'COPYRIGHTED';
  }
  if (!lic.includes('CC BY')) {
    return lic.replace(' ', '-');
  }
  return `${lic.replace(' ', '-')}-${licVer}`;
}

export const expandResourcesFromAllContexts = (
  resourceResult: [SearchResultJson],
) =>
  resourceResult.reduce((allResults: [], resource: SearchResultJson) => {
    return [
      ...allResults,
      ...resource.contexts.map(ctx => ({
        ...ctx,
        path: `${ctx.path}`,
        name: resource.title.title,
      })),
    ];
  }, []);
