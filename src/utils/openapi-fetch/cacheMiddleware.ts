/**
 * Copyright (c) 2025-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Middleware } from "openapi-fetch";
import { getContextOrThrow } from "../context/contextStore";
import { cacheTime, getCache, getCacheKey, setHeaderIfShouldNotCache } from "../../cache";

export function cachedResponse(data: string | undefined): globalThis.Response | null {
  if (!data) return null;

  const { body, headers } = JSON.parse(data);
  return new globalThis.Response(body, {
    headers,
    status: 200,
  });
}

export const OATSCacheMiddleware: Middleware = {
  async onRequest({ request }) {
    const cacheControl = request.headers.get("Cache-Control");

    const isCacheable =
      (request.method === undefined || request.method === "GET") &&
      cacheControl !== "no-store" &&
      cacheControl !== "reload";

    if (!isCacheable) return request;

    const ctx = getContextOrThrow();
    const cacheKey = getCacheKey(request.url, ctx);
    const data = await getCache().get(cacheKey);
    const cached = cachedResponse(data);
    if (cached) return cached;
    return request;
  },
  async onResponse({ request, response }) {
    const ctx = getContextOrThrow();
    const shouldCache = setHeaderIfShouldNotCache(response, ctx);
    if (response.status !== 200 || !shouldCache || request.method !== "GET") return;

    const cacheKey = getCacheKey(request.url, ctx);
    const headers: Record<string, unknown> = {};
    const body = await response.text();
    response.headers.forEach((value, key) => (headers[key] = value));
    await getCache().set(
      cacheKey,
      JSON.stringify({
        body,
        headers,
      }),
      cacheTime,
    );

    const responseOpts = {
      ...response,
      headers: response.headers,
      status: response.status,
    };

    if (!body) return new globalThis.Response(null, responseOpts);
    else return new globalThis.Response(body, responseOpts);
  },
};
