/**
 * Copyright (c) 2023-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import queryString from 'query-string';
import { OembedEmbedData, OembedProxyData } from '@ndla/types-embed';
import { fetch, resolveJson } from '../utils/apiHelpers';

export const fetchExternalOembed = async (
  embed: OembedEmbedData,
  context: Context,
): Promise<OembedProxyData> => {
  const url = `/oembed-proxy/v1/oembed?${queryString.stringify({
    url: embed.url,
  })}`;
  const res = await fetch(url, context);
  return await resolveJson(res);
};
