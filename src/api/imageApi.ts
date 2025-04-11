/**
 * Copyright (c) 2022-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  openapi,
  IImageMetaInformationV2DTO,
  IImageMetaInformationV3DTO,
  ISearchResultV3DTO,
} from "@ndla/types-backend/image-api";
import { GQLImageLicense, GQLQueryImageSearchArgs } from "../types/schema";
import { createAuthClient, resolveJsonOATS } from "../utils/openapi-fetch/utils";

const client = createAuthClient<openapi.paths>();

const getNumberId = (imageId: number | string): number => {
  if (typeof imageId === "string") {
    const numberId = parseInt(imageId);
    if (isNaN(numberId)) {
      throw new Error(`Invalid imageId: ${imageId}`);
    }
    return numberId;
  }
  return imageId;
};

export async function fetchImage(imageId: string, context: Context): Promise<IImageMetaInformationV2DTO | null> {
  const response = await client.GET("/image-api/v2/images/{image_id}", {
    params: {
      path: {
        image_id: getNumberId(imageId),
      },
      query: {
        language: context.language,
      },
    },
  });

  try {
    return await resolveJsonOATS(response);
  } catch (e) {
    return null;
  }
}

export async function fetchImageV3(imageId: number | string, context: Context): Promise<IImageMetaInformationV3DTO> {
  return client
    .GET("/image-api/v3/images/{image_id}", {
      params: {
        path: {
          image_id: getNumberId(imageId),
        },
        query: { language: context.language },
      },
    })
    .then(resolveJsonOATS);
}

export async function searchImages(params: GQLQueryImageSearchArgs, _context: Context): Promise<ISearchResultV3DTO> {
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

export function convertToSimpleImage(image: IImageMetaInformationV2DTO) {
  return {
    title: image.title.title,
    src: image.imageUrl,
    altText: image.alttext.alttext,
    contentType: image.contentType,
    copyright: image.copyright,
  };
}

export function convertToImageLicense(imageMeta: IImageMetaInformationV3DTO): GQLImageLicense {
  return {
    id: imageMeta.id,
    title: imageMeta.title.title,
    src: imageMeta.image.imageUrl,
    altText: imageMeta.alttext.alttext,
    contentType: imageMeta.image.contentType,
    copyright: imageMeta.copyright,
  };
}
