/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { load } from "cheerio";
import { IArticleV2DTO } from "@ndla/types-backend/article-api";
import { IConceptSummaryDTO } from "@ndla/types-backend/concept-api";
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
  GQLQueryArticleArgs,
  GQLTransformedArticleContent,
  GQLArticleTransformedContentArgs,
  GQLRelatedContent,
  GQLVisualElementOembed,
  GQLMetaImageWithCopyright,
} from "../types/schema";

export const Query = {
  async article(_: any, { id }: GQLQueryArticleArgs, context: ContextWithLoaders): Promise<IArticleV2DTO> {
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
    async competenceGoals(article: IArticleV2DTO, _: any, context: ContextWithLoaders): Promise<GQLCompetenceGoal[]> {
      const language =
        article.supportedLanguages?.find((lang) => lang === context.language) ??
        article.supportedLanguages?.[0] ??
        context.language;
      return fetchCompetenceGoals(article.grepCodes ?? [], language, context);
    },
    async coreElements(article: IArticleV2DTO, _: any, context: ContextWithLoaders): Promise<GQLCoreElement[]> {
      const language =
        article.supportedLanguages?.find((lang) => lang === context.language) ??
        article.supportedLanguages?.[0] ??
        context.language;
      return fetchCoreElements(article.grepCodes ?? [], language, context);
    },
    async crossSubjectTopics(
      article: IArticleV2DTO,
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
          path: topic?.path,
          url: topic?.url,
        };
      });
    },
    async concepts(article: IArticleV2DTO, _: any, context: ContextWithLoaders): Promise<IConceptSummaryDTO[]> {
      if (article?.conceptIds && article.conceptIds.length > 0) {
        const results = await searchConcepts({ ids: article.conceptIds }, context);
        return results.results;
      }
      return [];
    },
    async oembed(article: IArticleV2DTO, _: any, context: ContextWithLoaders): Promise<string | undefined> {
      const oembed = await fetchOembed<GQLVisualElementOembed>(`${ndlaUrl}/article/${article.id}`, context);
      if (oembed.html === undefined) return undefined;
      const parsed = load(oembed.html);
      return parsed("iframe").attr("src");
    },
    async metaImage(
      article: IArticleV2DTO,
      _: any,
      context: ContextWithLoaders,
    ): Promise<GQLMetaImageWithCopyright | undefined> {
      if (!article.metaImage) return undefined;
      const imageId = parseInt(article.metaImage?.url?.split("/").pop() ?? "");
      if (isNaN(imageId)) return undefined;
      try {
        const image = await fetchImageV3(imageId, context);
        return {
          ...article.metaImage,
          url: image.image?.imageUrl,
          copyright: image.copyright,
        };
      } catch (error) {
        return undefined;
      }
    },
    introduction(article: IArticleV2DTO): string {
      return article.introduction?.introduction ?? "";
    },
    htmlIntroduction(article: IArticleV2DTO): string {
      return article.introduction?.htmlIntroduction ?? "";
    },
    metaDescription(article: IArticleV2DTO): string {
      return article.metaDescription.metaDescription;
    },
    title(article: IArticleV2DTO): string {
      return article.title.title;
    },
    htmlTitle(article: IArticleV2DTO): string {
      return article.title.htmlTitle;
    },
    tags(article: IArticleV2DTO): string[] {
      return article.tags.tags;
    },
    language(article: IArticleV2DTO): string {
      return article.content.language;
    },
    async transformedContent(
      article: IArticleV2DTO,
      args: GQLArticleTransformedContentArgs,
      context: ContextWithLoaders,
    ): Promise<GQLTransformedArticleContent> {
      return fetchTransformedContent(article, args, context);
    },
    async relatedContent(
      article: IArticleV2DTO,
      args: { subjectId?: string },
      context: ContextWithLoaders,
    ): Promise<GQLRelatedContent[]> {
      return fetchRelatedContent(article, args, context);
    },
  },
};
