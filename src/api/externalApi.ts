/**
 * Copyright (c) 2023-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import queryString from "query-string";
import { OembedEmbedData, OembedProxyData } from "@ndla/types-embed";
import { fetch, resolveJson } from "../utils/apiHelpers";
import openGraph from "open-graph-scraper";
import { GQLExternalOpengraph } from "../types/schema";

export const fetchExternalOembed = async (embed: OembedEmbedData, context: Context): Promise<OembedProxyData> => {
  return await fetchOembedUrl(embed.url, context);
};

export const fetchOembedUrl = async (url: string, context: Context): Promise<OembedProxyData> => {
  const res = await fetch(
    `/oembed-proxy/v1/oembed?${queryString.stringify({
      url,
    })}`,
    context,
  );
  return await resolveJson(res);
};

export const fetchOpengraph = async (url: string): Promise<GQLExternalOpengraph | null> => {
  const ogs = await openGraph({ url });
  if (ogs.error) {
    return null;
  }

  return {
    title: ogs.result.ogTitle,
    description: ogs.result.ogDescription,
    imageUrl: ogs.result.ogImage?.[0]?.url,
    imageAlt: ogs.result.ogImage?.[0]?.alt,
    url: ogs.result.ogUrl,
  };
};
