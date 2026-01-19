/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { ArticleV2DTO } from "@ndla/types-backend/article-api";
import { ConceptSummaryDTO } from "@ndla/types-backend/concept-api";
import { fetchArticle, fetchSubjectTopics, searchConcepts } from "../api";
import { coreElements, fetchCrossSubjectTopicsByCode, grepSearch } from "../api/searchApi";

import {
  fetchTransformedContent,
  fetchRelatedContent,
  fetchTransformedDisclaimer,
  fetchVisualElementEmbed,
} from "../api/articleApi";
import { ndlaUrl } from "../config";
import {
  GQLArticleTransformedContentArgs,
  GQLCompetenceGoal,
  GQLCoreElement,
  GQLCrossSubjectElement,
  GQLImageMetaInformationV3,
  GQLQueryArticleArgs,
  GQLRelatedContent,
  GQLResourceEmbed,
  GQLTransformedArticleContent,
} from "../types/schema";

export const Query = {
  async article(_: any, { id }: GQLQueryArticleArgs, context: ContextWithLoaders): Promise<ArticleV2DTO> {
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
    async competenceGoals(article: ArticleV2DTO, _: any, context: ContextWithLoaders): Promise<GQLCompetenceGoal[]> {
      if (!(article.grepCodes ?? []).length) return [];

      const language =
        article.supportedLanguages?.find((lang) => lang === context.language) ??
        article.supportedLanguages?.[0] ??
        context.language;
      const result = await grepSearch(
        { codes: article.grepCodes.filter((code) => code.startsWith("KM")), language: language },
        context,
      );
      return result.results.map((hit) => {
        return {
          ...hit,
          type: "LK20",
          id: hit.code,
          title: hit.title.title,
        };
      });
    },
    async coreElements(article: ArticleV2DTO, _: any, context: ContextWithLoaders): Promise<GQLCoreElement[]> {
      const language =
        article.supportedLanguages?.find((lang) => lang === context.language) ??
        article.supportedLanguages?.[0] ??
        context.language;
      return coreElements(article.grepCodes ?? [], language, context);
    },
    async crossSubjectTopics(
      article: ArticleV2DTO,
      args: { subjectId: string },
      context: ContextWithLoaders,
    ): Promise<GQLCrossSubjectElement[]> {
      const crossSubjectCodes = article.grepCodes?.filter((code) => code.startsWith("TT")) ?? [];
      if (!crossSubjectCodes.length) {
        return [];
      }
      const language =
        article.supportedLanguages?.find((lang) => lang === context.language) ??
        article.supportedLanguages?.[0] ??
        context.language;
      const crossSubjectTopicInfo = await fetchCrossSubjectTopicsByCode(crossSubjectCodes, language, context);
      const topics = await fetchSubjectTopics(args.subjectId, context);
      return crossSubjectTopicInfo.map((crossSubjectTopic) => {
        const topic = topics.find((topic) => topic.name === crossSubjectTopic.title);
        return {
          title: crossSubjectTopic.title,
          code: crossSubjectTopic.code,
          id: crossSubjectTopic.id,
          url: topic?.url,
        };
      });
    },
    async concepts(article: ArticleV2DTO, _: any, context: ContextWithLoaders): Promise<ConceptSummaryDTO[]> {
      if (article?.conceptIds && article.conceptIds.length > 0) {
        const results = await searchConcepts({ ids: article.conceptIds }, context);
        return results.results;
      }
      return [];
    },
    oembed(article: ArticleV2DTO, _: any, context: ContextWithLoaders): string {
      return `${ndlaUrl}/article-iframe/${context.language}/article/${article.id}`;
    },
    async metaImage(
      article: ArticleV2DTO,
      _: any,
      context: ContextWithLoaders,
    ): Promise<GQLImageMetaInformationV3 | undefined> {
      if (!article.metaImage) return undefined;
      const imageId = parseInt(article.metaImage?.url?.split("/").pop() ?? "");
      if (isNaN(imageId)) return undefined;
      try {
        const image = await context.loaders.imagesLoader.load(imageId);
        if (!image) return undefined;
        return image;
      } catch (error) {
        return undefined;
      }
    },
    introduction(article: ArticleV2DTO): string {
      return article.introduction?.introduction ?? "";
    },
    htmlIntroduction(article: ArticleV2DTO): string {
      return article.introduction?.htmlIntroduction ?? "";
    },
    metaDescription(article: ArticleV2DTO): string {
      return article.metaDescription.metaDescription;
    },
    title(article: ArticleV2DTO): string {
      return article.title.title;
    },
    htmlTitle(article: ArticleV2DTO): string {
      return article.title.htmlTitle;
    },
    tags(article: ArticleV2DTO): string[] {
      return article.tags.tags;
    },
    language(article: ArticleV2DTO): string {
      return article.content.language;
    },
    requiredLibraries(article: ArticleV2DTO): ArticleV2DTO["requiredLibraries"] {
      return article.requiredLibraries.map((lib) =>
        lib.url.startsWith("http://") ? { ...lib, url: lib.url.replace("http://", "https://") } : lib,
      );
    },
    async transformedDisclaimer(
      article: ArticleV2DTO,
      args: GQLArticleTransformedContentArgs,
      context: ContextWithLoaders,
    ): Promise<GQLTransformedArticleContent> {
      return fetchTransformedDisclaimer(article, args, context);
    },
    async transformedContent(
      article: ArticleV2DTO,
      args: GQLArticleTransformedContentArgs,
      context: ContextWithLoaders,
    ): Promise<GQLTransformedArticleContent> {
      return fetchTransformedContent(article, args, context);
    },
    async relatedContent(
      article: ArticleV2DTO,
      args: { subjectId?: string },
      context: ContextWithLoaders,
    ): Promise<GQLRelatedContent[]> {
      return fetchRelatedContent(article, args, context);
    },
    visualElementEmbed(
      article: ArticleV2DTO,
      _: any,
      context: ContextWithLoaders,
    ): Promise<GQLResourceEmbed | undefined> {
      return fetchVisualElementEmbed(article, context);
    },
  },
};
