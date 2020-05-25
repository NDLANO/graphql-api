/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { fetchArticle, fetchCompetenceGoal } from '../api';

export const Query = {
  async article(
    _: any,
    { id, filterIds, subjectId, removeRelatedContent }: QueryToArticleArgs,
    context: Context,
  ): Promise<GQLArticle> {
    return fetchArticle(
      { articleId: id, filterIds, subjectId, removeRelatedContent },
      context,
    );
  },
};

export const resolvers = {
  Article: {
    async competenceGoals(
      article: GQLArticle,
      _: any,
      context: Context,
    ): Promise<GQLCompetenceGoal[]> {
      if (article.grepCodes) {
        return Promise.all(
          article.grepCodes.map(code => fetchCompetenceGoal(code, context)),
        );
      }
      return [];
    },
  },
};
