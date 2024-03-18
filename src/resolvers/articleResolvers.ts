/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

// @ts-strict-ignore

import { IArticleV2 } from "@ndla/types-backend/article-api";
import {
  fetchArticle,
  fetchCompetenceGoals,
  fetchCoreElements,
  fetchCrossSubjectTopicsByCode,
  fetchImageV3,
  fetchSubjectTopics,
  searchConcepts,
} from "../api";
import { fetchTransformedContent, fetchRelatedContent } from "../api/articleApi";
import { Concept } from "../api/conceptApi";
import {
  GQLCompetenceGoal,
  GQLCoreElement,
  GQLCrossSubjectElement,
  GQLMetaImage,
  GQLQueryArticleArgs,
  GQLTransformedArticleContent,
  GQLArticleTransformedContentArgs,
  GQLRelatedContent,
} from "../types/schema";
import parseMarkdown from "../utils/parseMarkdown";

export const Query = {
  async article(_: any, { id }: GQLQueryArticleArgs, context: ContextWithLoaders): Promise<IArticleV2> {
    return fetchArticle(
      {
        articleId: id,
      },
      context,
    );
  },
};

export const resolvers = {
  Article: {
    async competenceGoals(article: IArticleV2, _: any, context: ContextWithLoaders): Promise<GQLCompetenceGoal[]> {
      const language =
        article.supportedLanguages.find((lang) => lang === context.language) || article.supportedLanguages[0];
      return fetchCompetenceGoals(article.grepCodes, language, context);
    },
    async coreElements(article: IArticleV2, _: any, context: ContextWithLoaders): Promise<GQLCoreElement[]> {
      const language =
        article.supportedLanguages.find((lang) => lang === context.language) || article.supportedLanguages[0];
      return fetchCoreElements(article.grepCodes, language, context);
    },
    async crossSubjectTopics(
      article: IArticleV2,
      args: { subjectId: string },
      context: ContextWithLoaders,
    ): Promise<GQLCrossSubjectElement[]> {
      const crossSubjectCodes = article.grepCodes.filter((code) => code.startsWith("TT"));
      const language =
        article.supportedLanguages.find((lang) => lang === context.language) || article.supportedLanguages[0];
      const crossSubjectTopicInfo = await fetchCrossSubjectTopicsByCode(crossSubjectCodes, language, context);
      const topics = await fetchSubjectTopics(args.subjectId, context);
      return crossSubjectTopicInfo.map((crossSubjectTopic) => ({
        title: crossSubjectTopic.title,
        code: crossSubjectTopic.code,
        id: crossSubjectTopic.id,
        path: topics.find((topic: { name: string }) => topic.name === crossSubjectTopic.title)?.path,
      }));
    },
    async concepts(article: IArticleV2, _: any, context: ContextWithLoaders): Promise<Concept[]> {
      if (article?.conceptIds && article.conceptIds.length > 0) {
        const results = await searchConcepts({ ids: article.conceptIds }, context);
        return results.concepts;
      }
      return [];
    },
    async metaImage(article: IArticleV2, _: any, context: ContextWithLoaders): Promise<GQLMetaImage | undefined> {
      if (article.metaImage) {
        const imageId = article.metaImage.url.split("/").pop() ?? "";
        const image = await fetchImageV3(imageId, context);
        return {
          ...article.metaImage,
          url: image.image.imageUrl,
        };
      }
    },
    introduction(article: IArticleV2): string {
      return parseMarkdown({
        markdown: article.introduction?.htmlIntroduction ?? "",
        inline: true,
      });
    },
    htmlIntroduction(article: IArticleV2): string {
      return article.introduction?.htmlIntroduction ?? "";
    },
    metaDescription(article: IArticleV2): string {
      return article.metaDescription.metaDescription;
    },
    title(article: IArticleV2): string {
      return article.title.title;
    },
    htmlTitle(article: IArticleV2): string {
      return article.title.htmlTitle;
    },
    tags(article: IArticleV2): string[] {
      return article.tags.tags;
    },
    language(article: IArticleV2): string {
      return article.content.language;
    },
    async transformedContent(
      article: IArticleV2,
      args: GQLArticleTransformedContentArgs,
      context: ContextWithLoaders,
    ): Promise<GQLTransformedArticleContent> {
      return fetchTransformedContent(article, args, context);
    },
    async relatedContent(
      article: IArticleV2,
      args: { subjectId?: string },
      context: ContextWithLoaders,
    ): Promise<GQLRelatedContent[]> {
      return fetchRelatedContent(article, args, context);
    },
  },
};
