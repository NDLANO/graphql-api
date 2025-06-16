/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { openapi, OEmbedDTO } from "@ndla/types-backend/oembed-proxy";
import { createAuthClient, resolveJsonOATS } from "../utils/openapi-fetch/utils";

const client = createAuthClient<openapi.paths>();

export async function fetchOembed(url: string, _context: Context): Promise<OEmbedDTO | null> {
  const result = await client.GET("/oembed-proxy/v1/oembed", { params: { query: { url } } });
  if (result.response.status === 404) return null;
  return resolveJsonOATS(result);
}
