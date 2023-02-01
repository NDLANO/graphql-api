// @ts-strict-ignore
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
  searchConcepts,
} from '../api';
import { Concept } from '../api/conceptApi';
import {
  GQLArticle,
  GQLCompetenceGoal,
  GQLCoreElement,
  GQLCrossSubjectElement,
  GQLQueryArticleArgs,
} from '../types/schema';

export const Query = {
  async article(
    _: any,
    {
      id,
      subjectId,
      isOembed,
      path,
      showVisualElement,
      convertEmbeds,
    }: GQLQueryArticleArgs,
    context: ContextWithLoaders,
  ): Promise<GQLArticle> {
    return fetchArticle(
      {
        articleId: id,
        subjectId,
        isOembed,
        path,
        showVisualElement,
        convertEmbeds,
      },
      context,
    );
  },
};

export const resolvers = {
  Article: {
    async competenceGoals(
      article: GQLArticle,
      _: any,
      context: ContextWithLoaders,
    ): Promise<GQLCompetenceGoal[]> {
      const language =
        article.supportedLanguages.find(lang => lang === context.language) ||
        article.supportedLanguages[0];
      return fetchCompetenceGoals(article.grepCodes, language, context);
    },
    async coreElements(
      article: GQLArticle,
      _: any,
      context: ContextWithLoaders,
    ): Promise<GQLCoreElement[]> {
      const language =
        article.supportedLanguages.find(lang => lang === context.language) ||
        article.supportedLanguages[0];
      return fetchCoreElements(article.grepCodes, language, context);
    },
    async crossSubjectTopics(
      article: GQLArticle,
      args: { subjectId: string },
      context: ContextWithLoaders,
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
      const topics = await fetchSubjectTopics(args.subjectId, context);
      return crossSubjectTopicInfo.map(crossSubjectTopic => ({
        title: crossSubjectTopic.title,
        code: crossSubjectTopic.code,
        id: crossSubjectTopic.id,
        path: topics.find(
          (topic: { name: string }) => topic.name === crossSubjectTopic.title,
        )?.path,
      }));
    },
    async concepts(
      article: GQLArticle,
      _: any,
      context: ContextWithLoaders,
    ): Promise<Concept[]> {
      if (article?.conceptIds && article.conceptIds.length > 0) {
        const results = await searchConcepts(
          { ids: article.conceptIds },
          context,
        );
        return results.concepts;
      }
      return [];
    },
  },
};
