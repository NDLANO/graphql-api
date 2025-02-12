/**
 * Copyright (c) 2021-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { load } from "cheerio";
import { fetchH5pLicenseInformation, fetchH5pInfo } from "../api/h5pApi";
import { convertToSimpleImage, fetchImage } from "../api/imageApi";
import { fetchOembed } from "../api/oembedApi";
import { fetchVideo, fetchVideoSources } from "../api/videoApi";
import { getBrightcoveCopyright } from "./brightcoveUtils";
import { GQLCopyright, GQLH5pElement, GQLVisualElement, GQLVisualElementOembed } from "../types/schema";

export async function parseVisualElement(
  visualElementEmbed: string,
  context: Context,
): Promise<GQLVisualElement | null> {
  const parsedElement = load(visualElementEmbed);
  const data: any = parsedElement("ndlaembed").data();

  switch (data?.resource) {
    case "brightcove":
      return await parseBrightcoveFromEmbed(data, context);
    case "h5p":
      return await parseH5PFromEmbed(data, context);
    case "image":
      return await parseImageFromEmbed(data, context);
    case "external":
      return await parseOembedFromEmbed(data, context);
    default:
      return {
        url: data.url,
        resource: data.resource,
      };
  }
}

interface VisualElementBrightcove {
  account: string;
  player: string;
  videoid: string;
  resource: string;
  caption: string;
  title: string;
}

const parseBrightcoveFromEmbed = async (
  embedData: VisualElementBrightcove,
  context: Context,
): Promise<GQLVisualElement> => {
  const [video, sources] = await Promise.all([
    fetchVideo(embedData.videoid, embedData.account, context),
    fetchVideoSources(embedData.videoid, embedData.account, context),
  ]);
  const mp4s = sources
    .filter((source) => source.container === "MP4" && source.src)
    .sort((a, b) => (b.size ?? 0) - (a.size ?? 0));
  const source = sources.filter((s) => s.width && s.height).sort((a, b) => (b.height ?? 0) - (a.height ?? 0))[0];
  const license = getBrightcoveCopyright(video.custom_fields, context.language);
  const url = `https://players.brightcove.net/${embedData.account}/${embedData.player}_default/index.html?videoId=${embedData.videoid}`;
  return {
    url,
    brightcove: {
      iframe: {
        src: url,
        width: source?.width ?? 640,
        height: source?.height ?? 480,
      },
      src: url,
      cover: video?.images?.poster?.src,
      description: (video?.description || video.long_description || video.name) ?? "",
      download: mp4s[0]?.src,
      uploadDate: video.published_at ?? undefined,
      ...embedData,
    },
    title: video?.name,
    copyright: license,
    resource: "brightcove",
  };
};

interface VisualElementH5P {
  resource: string;
  path: string;
  url: string;
}

const parseH5PFromEmbed = async (embedData: VisualElementH5P, context: Context): Promise<GQLVisualElement | null> => {
  const pathArr = embedData.path?.split("/") || [];
  const h5pId = pathArr[pathArr.length - 1];
  const [license, visualElementOembed, h5pInfo] = await Promise.all([
    fetchH5pLicenseInformation(h5pId, context),
    fetchOembed<GQLH5pElement>(embedData.url, context),
    fetchH5pInfo(h5pId, context),
  ]);

  if (!visualElementOembed) return null;
  const copyright: GQLCopyright | undefined = license?.h5p.authors
    ? {
        creators:
          license?.h5p.authors.map((creators) => {
            return { type: creators.role, name: creators.name };
          }) ?? [],
        rightsholders: [],
        processors: [],
        license: {
          license: "",
        },
      }
    : undefined;
  return {
    url: embedData.url,
    h5p: {
      ...visualElementOembed,
      src: embedData.url,
    },
    copyright: copyright,
    title: h5pInfo?.title,
    resource: "h5p",
  };
};

interface VisualElementImage {
  resourceId: string;
  resource: string;
  alt: string;
  size: string;
  align: string;
  url: string;
  caption?: string;
}

const parseImageFromEmbed = async (embedData: VisualElementImage, context: Context): Promise<GQLVisualElement> => {
  const [image] = await Promise.all([fetchImage(embedData.resourceId, context)]);
  const transformedImage = image && convertToSimpleImage(image);

  return {
    image: {
      ...embedData,
      alt: embedData.alt || transformedImage?.altText || "",
      src: transformedImage?.src || "",
      altText: embedData.alt || transformedImage?.altText || "",
      caption: embedData.caption,
    },
    url: embedData.url,
    copyright: transformedImage?.copyright,
    title: transformedImage?.title,
    resource: "image",
  };
};

interface VisualElementOembed {
  url: string;
}

const parseOembedFromEmbed = async (
  embedData: VisualElementOembed,
  context: Context,
): Promise<GQLVisualElement | null> => {
  const visualElementOembed = await fetchOembed<GQLVisualElementOembed>(embedData.url, context);
  if (!visualElementOembed) return null;
  return {
    url: embedData.url,
    oembed: visualElementOembed,
    resource: "oembed",
  };
};
