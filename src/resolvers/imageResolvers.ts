/**
 * Copyright (c) 2023-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {
  IImageMetaInformationV2DTO,
  IImageMetaInformationV3DTO,
  ISearchResultV3DTO,
} from "@ndla/types-backend/image-api";
import { fetchImage, fetchImageV3, searchImages } from "../api/imageApi";
import { GQLQueryImageArgs, GQLQueryImageSearchArgs } from "../types/schema";

export const Query = {
  async image(
    _: any,
    { id }: GQLQueryImageArgs,
    context: ContextWithLoaders,
  ): Promise<IImageMetaInformationV2DTO | null> {
    return fetchImage(id, context);
  },
  async imageV3(
    _: any,
    { id }: GQLQueryImageArgs,
    context: ContextWithLoaders,
  ): Promise<IImageMetaInformationV3DTO | null> {
    return fetchImageV3(id, context);
  },
  async imageSearch(_: any, args: GQLQueryImageSearchArgs, context: ContextWithLoaders): Promise<ISearchResultV3DTO> {
    return searchImages(args, context);
  },
};

export const resolvers = {};
