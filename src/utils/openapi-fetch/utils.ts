/**
 * Copyright (c) 2025-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import createClient, { FetchResponse } from "openapi-fetch";
import type { MediaType } from "openapi-typescript-helpers";
import { OATSCacheMiddleware } from "./cacheMiddleware";
import { OATSInternalUrlMiddleware } from "./internalUrlMiddleware";
import { getHeadersFromContext } from "../apiHelpers";
import getLogger from "../logger";
import { GraphQLError } from "graphql";
import { apiUrl } from "../../config";
import { getContextOrThrow } from "../context/contextStore";

export const resolveOATS = async <A extends Record<string | number, any>, B, C extends MediaType>(
  res: FetchResponse<A, B, C>,
) => {
  const { data, response, error } = res;
  if (response.ok) return data;

  const message = `Api call to ${response.url} failed with status ${response.status} ${response.statusText}`;
  throw new GraphQLError(message, { extensions: { status: response.status, json: error ?? data } });
};

/** Resolves a response from OpenApi-TS fetch client and asserts that the response is successful */
export const resolveJsonOATS = async <A extends Record<string | number, any>, B, C extends MediaType>(
  res: FetchResponse<A, B, C>,
) => {
  const { data, response, error } = res;
  if (response.ok && data) return data;
  const message = `Api call to ${response.url} failed with status ${response.status} ${response.statusText}`;
  throw new GraphQLError(message, { extensions: { status: response.status, json: error ?? data } });
};

export interface ClientCreateOptions {
  disableCache?: boolean;
}

export function createAuthClient<T extends {}>(options?: ClientCreateOptions) {
  const client = createClient<T>({
    baseUrl: apiUrl,
    fetch: fetchFunction,
    querySerializer: {
      array: {
        style: "form",
        explode: false,
      },
    },
  });

  if (!options?.disableCache) client.use(OATSCacheMiddleware);
  client.use(OATSInternalUrlMiddleware);

  return client;
}

async function fetchFunction(req: globalThis.Request): Promise<globalThis.Response> {
  const startTime = performance.now();
  const slowLogTimeout = 500;

  const ctx = getContextOrThrow();
  const headers = getHeadersFromContext(ctx);

  for (const [key, value] of Object.entries(headers)) {
    if (value !== undefined && value !== null) req.headers.set(key, value);
  }

  const response = await globalThis.fetch(req);

  const elapsedTime = performance.now() - startTime;
  if (elapsedTime > slowLogTimeout) {
    getLogger().info(
      `Fetching '${req.url}' took ${elapsedTime.toFixed(
        2,
      )}ms which is slower than slow log timeout of ${slowLogTimeout}ms`,
    );
  }

  return response;
}
