/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { load } from "cheerio";
import { IArticleV2 } from "@ndla/types-backend/article-api";
import { IConceptSummary } from "@ndla/types-backend/concept-api";
import {
  fetchArticle,
  fetchOembed,
  fetchCompetenceGoals,
  fetchCoreElements,
  fetchCrossSubjectTopicsByCode,
  fetchImageV3,
  fetchSubjectTopics,
  searchConcepts,
} from "../api";
import { fetchTransformedContent, fetchRelatedContent } from "../api/articleApi";
import { ndlaUrl } from "../config";
import {
  GQLCompetenceGoal,
  GQLCoreElement,
  GQLCrossSubjectElement,
  GQLMetaImage,
  GQLQueryArticleArgs,
  GQLTransformedArticleContent,
  GQLArticleTransformedContentArgs,
  GQLRelatedContent,
  GQLVisualElementOembed,
  GQLMetaImageWithCopyright,
} from "../types/schema";

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
        article.supportedLanguages?.find((lang) => lang === context.language) ??
        article.supportedLanguages?.[0] ??
        context.language;
      return fetchCompetenceGoals(article.grepCodes ?? [], language, context);
    },
    async coreElements(article: IArticleV2, _: any, context: ContextWithLoaders): Promise<GQLCoreElement[]> {
      const language =
        article.supportedLanguages?.find((lang) => lang === context.language) ??
        article.supportedLanguages?.[0] ??
        context.language;
      return fetchCoreElements(article.grepCodes ?? [], language, context);
    },
    async crossSubjectTopics(
      article: IArticleV2,
      args: { subjectId: string },
      context: ContextWithLoaders,
    ): Promise<GQLCrossSubjectElement[]> {
      const crossSubjectCodes = article.grepCodes?.filter((code) => code.startsWith("TT")) ?? [];
      const language =
        article.supportedLanguages?.find((lang) => lang === context.language) ??
        article.supportedLanguages?.[0] ??
        context.language;
      const crossSubjectTopicInfo = await fetchCrossSubjectTopicsByCode(crossSubjectCodes, language, context);
      const topics = await fetchSubjectTopics(args.subjectId, context);
      return crossSubjectTopicInfo.map((crossSubjectTopic) => ({
        title: crossSubjectTopic.title,
        code: crossSubjectTopic.code,
        id: crossSubjectTopic.id,
        path: topics.find((topic: { name: string }) => topic.name === crossSubjectTopic.title)?.path,
      }));
    },
    async concepts(article: IArticleV2, _: any, context: ContextWithLoaders): Promise<IConceptSummary[]> {
      if (article?.conceptIds && article.conceptIds.length > 0) {
        const results = await searchConcepts({ ids: article.conceptIds }, context);
        return results.results;
      }
      return [];
    },
    async oembed(article: IArticleV2, _: any, context: ContextWithLoaders): Promise<string | undefined> {
      const oembed = await fetchOembed<GQLVisualElementOembed>(`${ndlaUrl}/article/${article.id}`, context);
      if (oembed.html === undefined) return undefined;
      const parsed = load(oembed.html);
      return parsed("iframe").attr("src");
    },
    async metaImage(
      article: IArticleV2,
      _: any,
      context: ContextWithLoaders,
    ): Promise<GQLMetaImageWithCopyright | undefined> {
      if (!article.metaImage) return undefined;
      const imageId = article.metaImage.url.split("/").pop() ?? "";
      const image = await fetchImageV3(imageId, context);
      return {
        ...article.metaImage,
        url: image.image?.imageUrl,
        copyright: image.copyright,
      };
    },
    introduction(article: IArticleV2): string {
      return article.introduction?.introduction ?? "";
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
