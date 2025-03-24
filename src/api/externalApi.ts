/**
 * Copyright (c) 2023-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { youtube } from "@googleapis/youtube";
import queryString from "query-string";
import { OembedEmbedData, OembedProxyData } from "@ndla/types-embed";
import { googleApiKey } from "../config";
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
  if (!url.includes("youtu")) {
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
  } else {
    const videoId = url.split("/")[3]?.split("?")[0] ?? "";
    const yt_metadata = await youtube({
      version: "v3",
      auth: googleApiKey,
    }).videos.list({
      id: [videoId],
      part: ["snippet"],
    });
    const data = yt_metadata.data.items?.[0]?.snippet;
    return {
      title: data?.title ?? undefined,
      description: data?.description ?? undefined,
      imageUrl: data?.thumbnails?.default?.url ?? undefined,
      imageAlt: data?.title ?? undefined,
      url,
    };
  }
};
