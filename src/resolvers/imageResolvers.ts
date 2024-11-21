/**
 * Copyright (c) 2023-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { IImageMetaInformationV2, IImageMetaInformationV3, ISearchResultV3 } from "@ndla/types-backend/image-api";
import { fetchImage, fetchImageV3, searchImages } from "../api/imageApi";
import { GQLQueryImageArgs, GQLQueryImageSearchArgs } from "../types/schema";

export const Query = {
  async image(_: any, { id }: GQLQueryImageArgs, context: ContextWithLoaders): Promise<IImageMetaInformationV2 | null> {
    return fetchImage(id, context);
  },
  async imageV3(
    _: any,
    { id }: GQLQueryImageArgs,
    context: ContextWithLoaders,
  ): Promise<IImageMetaInformationV3 | null> {
    return fetchImageV3(id, context);
  },
  async imageSearch(_: any, args: GQLQueryImageSearchArgs, context: ContextWithLoaders): Promise<ISearchResultV3> {
    return searchImages(args, context);
  },
};

export const resolvers = {};
