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
import { fetch } from "../utils/fetch";

const fetchPreviewOembed = async (embed: H5pEmbedData, context: Context): Promise<H5pPreviewResponse> => {
  const params = new URLSearchParams({ url: embed.url }).toString();
  const url = `${h5pHostUrl()}/oembed/preview?${params}`;
  const res = await fetch(url, context).then(resolveJson);

  return {
    type: "preview",
    ...res,
  };
};

const fetchOembed = async (embed: H5pEmbedData, context: Context): Promise<OembedProxyData> => {
  const params = new URLSearchParams({ url: embed.url }).toString();
  const url = `/oembed-proxy/v1/oembed?${params}`;
  const res = await fetch(url, context).then(resolveJson);
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
    return fetchOembed(embed, context);
  }
};

export const fetchH5pLicenseInformation = async (
  id: string | undefined,
  context: Context,
): Promise<H5pLicenseInformation | undefined> => {
  if (!id) return undefined;
  const url = `${h5pHostUrl()}/v2/resource/${id}/copyright`;
  try {
    const response = await fetch(url, context);
    const oembed = await resolveJson(response);
    return oembed;
  } catch (e) {
    return undefined;
  }
};

export const fetchH5pInfo = async (id: string | undefined, context: Context): Promise<H5pInfo | undefined> => {
  if (!id) return undefined;
  const infoUrl = `${h5pHostUrl()}/v1/resource/${id}/info`;
  try {
    const response = await fetch(infoUrl, context);
    return await resolveJson(response);
  } catch (e) {
    return undefined;
  }
};
