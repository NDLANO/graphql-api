/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  fetchArticle,
  fetchCompetenceGoals,
  fetchMovieMeta,
  fetchMovieTax,
} from '../api';

interface IdWithFilter {
  id: string;
  filterIds?: string;
}

export const Query = {
  async article(
    _: any,
    { id, filterIds }: IdWithFilter,
    context: Context,
  ): Promise<GQLArticle> {
    return fetchArticle(id, filterIds, context);
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
        const nodeId = article.oldNdlaUrl.split('/').pop();
        return fetchCompetenceGoals(nodeId, context);
      }
      return null;
    },
  },
};
