/**
 * Copyright (c) 2023-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { IImageMetaInformationV2 } from '@ndla/types-backend/image-api';
import { fetchImage } from '../api/imageApi';
import { GQLQueryImageArgs } from '../types/schema';

export const Query = {
  async image(
    _: any,
    { id }: GQLQueryImageArgs,
    context: ContextWithLoaders,
  ): Promise<IImageMetaInformationV2 | null> {
    return fetchImage(id, context);
  },
};

export const resolvers = {};
