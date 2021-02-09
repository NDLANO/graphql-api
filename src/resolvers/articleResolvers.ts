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
  fetchCoreElements,
  fetchCrossSubjectTopicsByCode,
  fetchSubjectTopics,
} from '../api';

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
      const language =
        article.supportedLanguages.find(lang => lang === context.language) ||
        article.supportedLanguages[0];
      return fetchCompetenceGoals(article.grepCodes, nodeId, language, context);
    },
    async coreElements(
      article: GQLArticle,
      _: any,
      context: Context,
    ): Promise<GQLCoreElement[]> {
      const language =
        article.supportedLanguages.find(lang => lang === context.language) ||
        article.supportedLanguages[0];
      return fetchCoreElements(article.grepCodes, language, context);
    },
    async crossSubjectTopics(
      article: GQLArticle,
      args: { subjectId: string; filterIds: string },
      context: Context,
    ): Promise<GQLCrossSubjectElement[]> {
      const crossSubjectCodes = article.grepCodes.filter(code =>
        code.startsWith('TT'),
      );
      const language =
        article.supportedLanguages.find(lang => lang === context.language) ||
        article.supportedLanguages[0];
      const crossSubjectTopicInfo = await fetchCrossSubjectTopicsByCode(
        crossSubjectCodes,
        language,
        context,
      );
      const topics = await fetchSubjectTopics(
        args.subjectId,
        args.filterIds,
        context,
      );
      return crossSubjectTopicInfo.map(
        crossSubjectTopic => ({
          ...crossSubjectTopic,
          path: topics.find((topic: { name: string }) => topic.name === crossSubjectTopic.title)?.path,
        })
      );
    },
  },
};
