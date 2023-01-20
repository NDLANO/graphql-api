/**
 * Copyright (c) 2021-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import cheerio from 'cheerio';
import { convertToSimpleImage, fetchImage } from '../api/imageApi';
import { fetchOembed } from '../api/oembedApi';
import { localConverter } from '../config';
import {
  GQLBrightcoveLicense,
  GQLH5pElement,
  GQLH5pLicense,
  GQLVisualElement,
  GQLVisualElementOembed,
} from '../types/schema';
import { fetch, resolveJson } from './apiHelpers';

export async function fetchVisualElementLicense<T>(
  visualElement: string,
  resource: string,
  context: Context,
): Promise<T> {
  const host = localConverter ? 'http://localhost:3100' : '';
  const metaDataResponse = await fetch(
    encodeURI(
      `${host}/article-converter/json/${context.language}/meta-data?embed=${visualElement}`,
    ),
    context,
  );
  const metaData = await resolveJson(metaDataResponse);
  return metaData.metaData[resource]?.[0] ?? '';
}

export async function parseVisualElement(
  visualElementEmbed: string,
  context: Context,
) {
  const parsedElement = cheerio.load(visualElementEmbed);
  const data = parsedElement('ndlaembed').data();

  switch (data?.resource) {
    case 'brightcove':
      return await parseBrightcoveFromEmbed(data, context, visualElementEmbed);
    case 'h5p':
      return await parseH5PFromEmbed(data, context, visualElementEmbed);
    case 'image':
      return await parseImageFromEmbed(data, context, visualElementEmbed);
    case 'oembed':
      return await parseOembedFromEmbed(data, context);
    default:
      return { url: data.url };
  }
}

const parseBrightcoveFromEmbed = async (
  embedData: any,
  context: Context,
  visualElementEmbed: string,
): Promise<GQLVisualElement> => {
  const license = await fetchVisualElementLicense<GQLBrightcoveLicense>(
    visualElementEmbed,
    'brightcoves',
    context,
  );
  return {
    url: `https://players.brightcove.net/${embedData.account}/${embedData.player}_default/index.html?videoId=${embedData.videoid}`,
    brightcove: {
      ...license,
      ...embedData,
    },
    copyright: license.copyright,
    resource: 'brightcove',
  };
};

const parseH5PFromEmbed = async (
  embedData: any,
  context: Context,
  visualElementEmbed: string,
) => {
  const [license, visualElementOembed] = await Promise.all([
    await fetchVisualElementLicense<GQLH5pLicense>(
      visualElementEmbed,
      'h5ps',
      context,
    ),
    await fetchOembed<GQLH5pElement>(embedData.url, context),
  ]);

  if (!visualElementOembed) return null;
  return {
    url: embedData.url,
    h5p: visualElementOembed,
    copyright: license.copyright,
    title: license.title,
    resource: 'h5p',
  };
};

const parseImageFromEmbed = async (
  embedData: any,
  context: Context,
  visualElementEmbed: string,
) => {
  const [image, license] = await Promise.all([
    fetchImage(embedData.resourceId, context),
    fetchVisualElementLicense<GQLBrightcoveLicense | GQLH5pLicense>(
      visualElementEmbed,
      'images',
      context,
    ),
  ]);

  const transformedImage = image && convertToSimpleImage(image);

  return {
    image: {
      ...transformedImage,
      ...embedData,
      ...license,
      altText: embedData.alt,
      caption: embedData.caption,
    },
    url: embedData.url,
    copyright: license.copyright,
    title: license.title,
    resource: 'image',
  };
};

const parseOembedFromEmbed = async (embedData: any, context: Context) => {
  const visualElementOembed = await fetchOembed<GQLVisualElementOembed>(
    embedData.url,
    context,
  );
  if (!visualElementOembed) return null;
  return {
    url: embedData.url,
    oembed: visualElementOembed,
    resource: 'oembed',
  };
};
