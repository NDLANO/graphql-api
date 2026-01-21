/**
 * Copyright (c) 2023-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  H5pEmbedData,
  H5pPreviewResponse,
  H5pLicenseInformation,
  H5pOembedData,
  OembedProxyData,
  H5pInfo,
} from "@ndla/types-embed";
import { h5pHostUrl } from "../config";
import { resolveJson } from "../utils/apiHelpers";
import { externalFetch } from "../utils/fetch";
import { createAuthClient, resolveJsonOATS } from "../utils/openapi-fetch/utils";
import { openapi } from "@ndla/types-backend/oembed-proxy";

const client = createAuthClient<openapi.paths>();

const H5P_HOST_URL = h5pHostUrl();

const fetchPreviewOembed = async (embed: H5pEmbedData, context: Context): Promise<H5pPreviewResponse> => {
  const params = new URLSearchParams({ url: embed.url }).toString();
  const url = `${H5P_HOST_URL}/oembed/preview?${params}`;
  const res = await externalFetch(url, context).then(resolveJson);

  return {
    type: "preview",
    ...res,
  };
};

const fetchOembed = async (embed: H5pEmbedData): Promise<OembedProxyData> => {
  const res = await client
    .GET("/oembed-proxy/v1/oembed", {
      params: { query: { url: embed.url } },
    })
    .then(resolveJsonOATS);

  return {
    ...res,
    type: "proxy",
  };
};

export const fetchH5pOembed = async (
  embed: H5pEmbedData,
  context: Context,
  preview: boolean,
): Promise<H5pOembedData> => {
  if (preview) {
    return fetchPreviewOembed(embed, context);
  } else {
    return fetchOembed(embed);
  }
};

export const fetchH5pLicenseInformation = async (
  id: string | undefined,
  context: Context,
): Promise<H5pLicenseInformation | undefined> => {
  if (!id) return undefined;
  const url = `${H5P_HOST_URL}/v2/resource/${id}/copyright`;
  try {
    const response = await externalFetch(url, context);
    const oembed = await resolveJson(response);
    return oembed;
  } catch (e) {
    return undefined;
  }
};

export const fetchH5pInfo = async (id: string | undefined, context: Context): Promise<H5pInfo | undefined> => {
  if (!id) return undefined;
  const infoUrl = `${H5P_HOST_URL}/v1/resource/${id}/info`;
  try {
    const response = await externalFetch(infoUrl, context);
    return await resolveJson(response);
  } catch (e) {
    return undefined;
  }
};
