/**
 * Copyright (c) 2021-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
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

export async function fetchVisualElementLicense(
  visualElement: string,
  resource: string,
  context: Context,
): Promise<GQLBrightcoveLicense | GQLH5pLicense> {
  const host = localConverter ? 'http://localhost:3100' : '';
  const metaDataResponse = await fetch(
    encodeURI(
      `${host}/article-converter/json/${context.language}/meta-data?embed=${visualElement}`,
    ),
    context,
  );
  const metaData = await resolveJson(metaDataResponse);
  return metaData.metaData[resource][0];
}

export async function fetchOembed(
  url: string,
  context: Context,
): Promise<GQLLearningpathStepOembed> {
  const response = await fetch(`/oembed-proxy/v1/oembed?url=${url}`, context);
  return resolveJson(response);
}
