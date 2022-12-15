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
  let visualElement: GQLVisualElement = {
    title: '',
    resource: data.resource,
  };

  if (data?.resource !== 'external') {
    let license;

    if (data?.resource === 'brightcove') {
      visualElement.url = `https://players.brightcove.net/${data.account}/${data.player}_default/index.html?videoId=${data.videoid}`;
      license = await fetchVisualElementLicense<GQLBrightcoveLicense>(
        visualElementEmbed,
        'brightcoves',
        context,
      );
      visualElement.brightcove = {
        ...license,
        ...data,
      };
    } else if (data?.resource === 'h5p') {
      const visualElementOembed = await fetchOembed<GQLH5pElement>(
        data.url,
        context,
      );
      if (!visualElementOembed) return null;
      license = await fetchVisualElementLicense<GQLH5pLicense>(
        visualElementEmbed,
        'h5ps',
        context,
      );
      visualElement.url = data.url;
      visualElement.h5p = visualElementOembed;
    } else if (data?.resource === 'image') {
      const image = await fetchImage(data.resourceId, context);
      const transformedImage = image && convertToSimpleImage(image);
      license = await fetchVisualElementLicense<
        GQLBrightcoveLicense | GQLH5pLicense
      >(visualElementEmbed, 'images', context);
      visualElement.image = {
        ...transformedImage,
        ...data,
        ...license,
        altText: data.alt,
        caption: data.caption,
      };
      visualElement.url = data.url;
    } else {
      visualElement.url = data.url;
    }

    visualElement.copyright = license?.copyright;
    visualElement.title = license?.title;
  } else {
    const visualElementOembed = await fetchOembed<GQLVisualElementOembed>(
      data.url,
      context,
    );
    if (!visualElementOembed) return null;
    visualElement.url = data.url;
    visualElement.oembed = visualElementOembed;
  }

  return visualElement;
}
