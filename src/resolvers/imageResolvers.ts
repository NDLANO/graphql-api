import { IImageMetaInformationV2 } from '@ndla/types-backend/image-api';
import { GQLQueryImageArgs } from '../types/schema';
import { fetchImage } from '../api/imageApi';

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
