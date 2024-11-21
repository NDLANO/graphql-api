/**
 * Copyright (c) 2022-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import qs from 'query-string';
import { IImageMetaInformationV2, IImageMetaInformationV3, ISearchResultV3, Sort } from "@ndla/types-backend/image-api";
import { GQLQueryImageSearchArgs } from "../types/schema";
import { fetch, resolveJson } from "../utils/apiHelpers";

export async function fetchImage(imageId: string, context: Context): Promise<IImageMetaInformationV2 | null> {
  const languageParam = context.language ? `?language=${context.language}` : "";
  const response = await fetch(`/image-api/v2/images/${imageId}${languageParam}`, context);
  try {
    return await resolveJson(response);
  } catch (e) {
    return null;
  }
}

export async function fetchImageV3(imageId: string, context: Context): Promise<IImageMetaInformationV3> {
  const languageParam = context.language ? `?language=${context.language}` : "";
  const response = await fetch(`/image-api/v3/images/${imageId}${languageParam}`, context);
  return await resolveJson(response);
}

export async function searchImages(params: GQLQueryImageSearchArgs, context: Context): Promise<ISearchResultV3> {
  const queryStr = qs.stringify({
    "page-size": params.pageSize,
    page: params.page,
    query: params.query
  });
  const response = await fetch(`/image-api/v3/images?${queryStr}`, context);
  return await resolveJson(response);
}

export function convertToSimpleImage(image: IImageMetaInformationV2) {
  return {
    title: image.title.title,
    src: image.imageUrl,
    altText: image.alttext.alttext,
    contentType: image.contentType,
    copyright: image.copyright,
  };
}
