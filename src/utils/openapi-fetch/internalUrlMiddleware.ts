/**
 * Copyright (c) 2025-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Middleware } from "openapi-fetch";
import { apiResourceUrl } from "../apiHelpers";
import { environmentApiHost } from "../../config";

/** This middleware replaces ndla api urls with internal api-gateway if applicable */
export const OATSInternalUrlMiddleware: Middleware = {
  async onRequest({ request }) {
    const url = new URL(request.url);
    const withoutHost = url.toString().replace(url.origin, "");
    if (url.hostname === environmentApiHost) {
      const newUrl = apiResourceUrl(withoutHost);
      return new Request(newUrl, request);
    }
    return request;
  },
};
