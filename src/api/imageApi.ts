/**
 * Copyright (c) 2022-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { openapi, ImageMetaInformationV3DTO, SearchResultV3DTO } from "@ndla/types-backend/image-api";
import { GQLImageLicense, GQLQueryImageSearchArgs } from "../types/schema";
import { createAuthClient, resolveJsonOATS } from "../utils/openapi-fetch/utils";
import { getNumberIdOrThrow } from "../utils/apiHelpers";

const client = createAuthClient<openapi.paths>();

export async function fetchImageV3(imageId: number | string, context: Context): Promise<ImageMetaInformationV3DTO> {
  return client
    .GET("/image-api/v3/images/{image_id}", {
      params: {
        path: {
          image_id: getNumberIdOrThrow(imageId),
        },
        query: { language: context.language },
      },
    })
    .then(resolveJsonOATS);
}

export async function fetchImages(imageIds: number[], context: Context): Promise<ImageMetaInformationV3DTO[]> {
  return client
    .GET("/image-api/v3/images/ids", {
      params: {
        query: {
          ids: imageIds.slice(),
          language: context.language,
        },
      },
    })
    .then(resolveJsonOATS);
}

export async function searchImages(params: GQLQueryImageSearchArgs, _context: Context): Promise<SearchResultV3DTO> {
  return client
    .GET("/image-api/v3/images", {
      params: {
        query: {
          "page-size": params.pageSize,
          license: params.license,
          page: params.page,
          query: params.query,
        },
      },
    })
    .then(resolveJsonOATS);
}

export function convertToSimpleImage(image: ImageMetaInformationV3DTO) {
  return {
    title: image.title.title,
    src: image.image.imageUrl,
    altText: image.alttext.alttext,
    contentType: image.image.contentType,
    copyright: image.copyright,
  };
}

export function convertToImageLicense(imageMeta: ImageMetaInformationV3DTO): GQLImageLicense {
  return {
    id: imageMeta.id,
    title: imageMeta.title.title,
    src: imageMeta.image.imageUrl,
    altText: imageMeta.alttext.alttext,
    contentType: imageMeta.image.contentType,
    copyright: imageMeta.copyright,
  };
}
