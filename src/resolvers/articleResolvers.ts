/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { fetchArticle, fetchCompetenceGoals, fetchCoreElements } from '../api';

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
      const nodeId = article.oldNdlaUrl?.split('/').pop();
      return fetchCompetenceGoals(article.grepCodes, nodeId, context);
    },
    async coreElements(
      article: GQLArticle,
      _: any,
      context: Context,
    ): Promise<GQLCoreElement[]> {
      return fetchCoreElements(article.grepCodes, context);
    },
  },
};
