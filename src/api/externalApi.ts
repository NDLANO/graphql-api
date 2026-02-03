/**
 * Copyright (c) 2023-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { youtube } from "@googleapis/youtube";
import { openapi } from "@ndla/types-backend/oembed-proxy";
import { OembedEmbedData, OembedProxyData } from "@ndla/types-embed";
import openGraph from "open-graph-scraper";
import { googleApiKey } from "../config";
import { GQLExternalOpengraph } from "../types/schema";
import { createAuthClient, resolveJsonOATS } from "../utils/openapi-fetch/utils";

const client = createAuthClient<openapi.paths>();

export const fetchExternalOembed = async (embed: OembedEmbedData, context: Context): Promise<OembedProxyData> => {
  return await fetchOembedUrl(embed.url, context);
};

export const fetchOembedUrl = async (url: string, _context: Context): Promise<OembedProxyData> => {
  const response = await client.GET("/oembed-proxy/v1/oembed", { params: { query: { url } } }).then(resolveJsonOATS);
  return { ...response, type: "proxy" };
};

export const getYoutubeVideoId = (url: string) => {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname.includes("youtu")) {
      let videoId;
      if (urlObj.pathname.startsWith("/watch")) {
        videoId = urlObj.searchParams.get("v");
      } else {
        videoId = urlObj.pathname.split("/")?.[1]?.split("?")[0];
      }
      return videoId ?? "";
    }
  } catch (_) {
    // No url
  }
  return "";
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
    const videoId = getYoutubeVideoId(url);
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
