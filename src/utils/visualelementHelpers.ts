/**
 * Copyright (c) 2021-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { load } from "cheerio";
import { fetch, resolveJson } from "./apiHelpers";
import { fetchH5pLicenseInformation, fetchH5pInfo } from "../api/h5pApi";
import { convertToSimpleImage, fetchImage } from "../api/imageApi";
import { fetchOembed } from "../api/oembedApi";
import { localConverter } from "../config";
import {
  GQLBrightcoveLicense,
  GQLCopyright,
  GQLH5pElement,
  GQLImageLicense,
  GQLVisualElement,
  GQLVisualElementOembed,
} from "../types/schema";

export async function fetchVisualElementLicense<T>(
  visualElement: string,
  resource: string,
  context: Context,
): Promise<T> {
  const host = localConverter ? "http://localhost:3100" : "";
  const metaDataResponse = await fetch(
    encodeURI(`${host}/article-converter/json/${context.language}/meta-data?embed=${visualElement}`),
    context,
  );
  const metaData = await resolveJson(metaDataResponse);
  return metaData.metaData[resource]?.[0] ?? "";
}

export async function parseVisualElement(
  visualElementEmbed: string,
  context: Context,
): Promise<GQLVisualElement | null> {
  const parsedElement = load(visualElementEmbed);
  const data: any = parsedElement("ndlaembed").data();

  switch (data?.resource) {
    case "brightcove":
      return await parseBrightcoveFromEmbed(data, context, visualElementEmbed);
    case "h5p":
      return await parseH5PFromEmbed(data, context);
    case "image":
      return await parseImageFromEmbed(data, context, visualElementEmbed);
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
  visualElementEmbed: string,
): Promise<GQLVisualElement> => {
  const license = await fetchVisualElementLicense<GQLBrightcoveLicense>(visualElementEmbed, "brightcoves", context);
  return {
    url: `https://players.brightcove.net/${embedData.account}/${embedData.player}_default/index.html?videoId=${embedData.videoid}`,
    brightcove: {
      iframe: license.iframe,
      src: license.src,
      cover: license.cover,
      description: license.description,
      download: license.download,
      uploadDate: license.uploadDate,
      ...embedData,
    },
    title: license.title,
    copyright: license.copyright,
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

const parseImageFromEmbed = async (
  embedData: VisualElementImage,
  context: Context,
  visualElementEmbed: string,
): Promise<GQLVisualElement> => {
  const [image, license] = await Promise.all([
    fetchImage(embedData.resourceId, context),
    fetchVisualElementLicense<GQLImageLicense>(visualElementEmbed, "images", context),
  ]);
  const transformedImage = image && convertToSimpleImage(image);

  return {
    image: {
      ...embedData,
      alt: embedData.alt || transformedImage?.altText || "",
      src: license.src || transformedImage?.src || "",
      altText: embedData.alt || transformedImage?.altText || "",
      caption: embedData.caption,
    },
    url: embedData.url,
    copyright: license.copyright,
    title: license.title || transformedImage?.title,
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
