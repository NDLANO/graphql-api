/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { fetchArticle, fetchCompetenceGoals } from '../api';

export const Query = {
  async article(
    _: any,
    { id, filterIds, subjectId }: QueryToArticleArgs,
    context: Context,
  ): Promise<GQLArticle> {
    return fetchArticle({ articleId: id, filterIds, subjectId }, context);
  },
};

export const resolvers = {
  Article: {
    async competenceGoals(
      article: GQLArticle,
      _: any,
      context: Context,
    ): Promise<GQLCompetenceGoal[]> {
      if (article.oldNdlaUrl) {
        const code = article.oldNdlaUrl.split('/').pop();
        return fetchCompetenceGoals(code, context);
      }
      return null;
    },
  },
};
