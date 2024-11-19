/**
 * Copyright (c) 2023-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { IImageMetaInformationV2 } from "@ndla/types-backend/image-api";
import { fetchImage, searchImages } from "../api/imageApi";
import { GQLQueryImageArgs, GQLQuerySearchImagesArgs } from "../types/schema";

export const Query = {
  async image(_: any, { id }: GQLQueryImageArgs, context: ContextWithLoaders): Promise<IImageMetaInformationV2 | null> {
    return fetchImage(id, context);
  },
  async searchImages(
    _: any,
    args: GQLQuerySearchImagesArgs,
    context: ContextWithLoaders,
  ): Promise<IImageMetaInformationV2> {
    return searchImages(args, context);
  },
};

export const resolvers = {};
