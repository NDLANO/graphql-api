/**
 * Copyright (c) 2023-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import queryString from 'query-string';
import {
  H5pEmbedData,
  H5pPreviewResponse,
  H5pLicenseInformation,
  H5pOembedData,
  OembedProxyData,
} from '@ndla/types-embed';
import { h5pHostUrl } from '../config';
import { fetch, resolveJson } from '../utils/apiHelpers';

const fetchPreviewOembed = async (
  embed: H5pEmbedData,
  context: Context,
): Promise<H5pPreviewResponse> => {
  const url = `${h5pHostUrl()}/oembed/preview?${queryString.stringify({
    url: embed.url,
  })}`;
  const res = await fetch(url, context).then(resolveJson);

  return {
    type: 'preview',
    ...res,
  };
};

const fetchOembed = async (
  embed: H5pEmbedData,
  context: Context,
): Promise<OembedProxyData> => {
  const url = `/oembed-proxy/v1/oembed?url=${embed.url}`;
  const res = await fetch(url, context).then(resolveJson);
  return {
    ...res,
    type: 'proxy',
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
  const url = `${h5pHostUrl()}/v1/resource/${id}/copyright`;
  try {
    const response = await fetch(url, context);
    const oembed = await resolveJson(response);
    return oembed;
  } catch (e) {
    return undefined;
  }
};
