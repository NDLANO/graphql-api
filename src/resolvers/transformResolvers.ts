/**
 * Copyright (c) 2023-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { transformArticle } from '../api/transformArticleApi';
import {
  GQLMutationResolvers,
  GQLMutationTransformArticleContentArgs,
} from '../types/schema';

export const Mutations: Pick<
  GQLMutationResolvers,
  'transformArticleContent'
> = {
  async transformArticleContent(
    _: any,
    {
      content,
      visualElement,
      absoluteUrl,
      previewH5p,
      subject,
      draftConcept,
    }: GQLMutationTransformArticleContentArgs,
    context: ContextWithLoaders,
  ): Promise<string> {
    const data = await transformArticle(content, context, visualElement ?? '', {
      subject,
      absoluteUrl,
      previewH5p,
      draftConcept,
      showVisualElement: !!visualElement,
    });
    return data.content ?? '';
  },
};
