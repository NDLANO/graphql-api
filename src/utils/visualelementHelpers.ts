/**
 * Copyright (c) 2021-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import cheerio from 'cheerio';
import { localConverter } from '../config';
import { fetch, resolveJson } from './apiHelpers';

export async function fetchImage(imageId: string, context: Context) {
  const imageResponse = await fetch(`/image-api/v2/images/${imageId}`, context);
  const image = await resolveJson(imageResponse);
  return {
    title: image.title.title,
    src: image.imageUrl,
    altText: image.alttext.alttext,
    contentType: image.contentType,
    copyright: image.copyright,
  };
}

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

export async function fetchOembed(
  url: string,
  context: Context,
): Promise<GQLLearningpathStepOembed> {
  const response = await fetch(`/oembed-proxy/v1/oembed?url=${url}`, context);
  return resolveJson(response);
}

export async function parseVisualElement(
  visualElementEmbed: string,
  context: Context,
) {
  const parsedElement = cheerio.load(visualElementEmbed);
  const data = parsedElement('embed').data();
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
      const visualElementOembed = await fetchOembed(data.url, context);
      license = await fetchVisualElementLicense<GQLH5pLicense>(
        visualElementEmbed,
        'h5ps',
        context,
      );
      visualElement.url = data.url;
      visualElement.h5p = {
        ...visualElementOembed,
        ...license,
      };
    } else if (data?.resource === 'image') {
      const image = await fetchImage(data.resourceId, context);
      license = await fetchVisualElementLicense<
        GQLBrightcoveLicense | GQLH5pLicense
      >(visualElementEmbed, 'images', context);
      visualElement.image = {
        ...image,
        ...license,
        caption: data.caption,
      };
      visualElement.url = data.url;
    }

    visualElement.copyright = license.copyright;
    visualElement.title = license.title;
  } else {
    const visualElementOembed = await fetchOembed(data.url, context);
    visualElement.url = data.url;
    visualElement.oembed = visualElementOembed;
  }

  return visualElement;
}
