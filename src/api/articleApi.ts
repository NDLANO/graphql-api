/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { ArticleV2DTO, openapi } from "@ndla/types-backend/article-api";
import { transformArticle, transformVisualElement } from "./transformArticleApi";
import { ndlaUrl } from "../config";
import {
  GQLArticleTransformedContentArgs,
  GQLRelatedContent,
  GQLResourceEmbed,
  GQLTransformedArticleContent,
} from "../types/schema";
import { createAuthClient, resolveJsonOATS } from "../utils/openapi-fetch/utils";
import { getArticleIdFromUrn } from "../utils/articleHelpers";

interface ArticleParams {
  articleId: string;
}

const client = createAuthClient<openapi.paths>();

export const fetchTransformedContent = async (
  article: ArticleV2DTO,
  _params: GQLArticleTransformedContentArgs,
  context: ContextWithLoaders,
): Promise<GQLTransformedArticleContent> => {
  const params = _params.transformArgs ?? {};
  let subjectId = params.subjectId;
  if (params.contextId && !subjectId) {
    const contextNode = await context.loaders.nodesLoader.load({
      contextId: params.contextId,
      includeContexts: true,
      filterProgrammes: true,
    });
    const contextRootId = contextNode[0]?.context?.rootId;
    if (contextRootId) {
      subjectId = contextRootId;
    }
  }
  const { content, metaData } = await transformArticle(
    article.content.content,
    context,
    article.visualElement?.visualElement,
    {
      subject: subjectId,
      draftConcept: params.draftConcept,
      previewH5p: params.previewH5p,
      absoluteUrl: params.absoluteUrl,
      showVisualElement: params.showVisualElement === "true",
    },
  );

  return {
    content: (article.articleType === "standard" ? content : content === "<section></section>" ? "" : content) ?? "",
    metaData,
  };
};

export const fetchTransformedDisclaimer = async (
  article: ArticleV2DTO,
  _params: GQLArticleTransformedContentArgs,
  context: ContextWithLoaders,
): Promise<GQLTransformedArticleContent> => {
  if (!article.disclaimer?.disclaimer) return { content: "" };
  const params = _params.transformArgs ?? {};
  let subjectId = params.subjectId;
  if (params.contextId && !subjectId) {
    const contextNode = await context.loaders.nodesLoader.load({
      contextId: params.contextId,
      includeContexts: true,
      filterProgrammes: true,
    });
    const contextRootId = contextNode[0]?.context?.rootId;
    if (contextRootId) {
      subjectId = contextRootId;
    }
  }
  const { content, metaData } = await transformArticle(article.disclaimer.disclaimer, context, undefined, {
    subject: subjectId,
    draftConcept: params.draftConcept,
    previewH5p: params.previewH5p,
    absoluteUrl: params.absoluteUrl,
    showVisualElement: params.showVisualElement === "true",
  });
  return { content: content ?? "", metaData };
};

export async function fetchVisualElementEmbed(
  article: ArticleV2DTO,
  context: ContextWithLoaders,
): Promise<GQLResourceEmbed | undefined> {
  if (!article.visualElement?.visualElement) {
    return undefined;
  }
  const visualElementEmbed = await transformVisualElement(article.visualElement.visualElement, context);
  return visualElementEmbed;
}

export async function fetchRelatedContent(
  article: ArticleV2DTO,
  params: { subjectId?: string },
  context: ContextWithLoaders,
): Promise<GQLRelatedContent[]> {
  const nullableRelatedContent: (GQLRelatedContent | undefined)[] = await Promise.all(
    article?.relatedContent?.map(async (rc) => {
      if (typeof rc !== "number") {
        return {
          title: rc.title,
          url: rc.url,
        };
      }
      try {
        const related = await fetchSimpleArticle(`urn:article:${rc}`, context);
        const nodes = await context.loaders.nodesLoader.load({
          contentURI: `urn:article:${related.id}`,
          language: context.language,
          includeContexts: true,
          filterProgrammes: true,
        });
        const node = nodes?.[0];
        if (node) {
          const ctx = node.contexts.find((c) => c.rootId === params.subjectId) ?? node.context;
          const url = ctx?.url ?? node.url;
          return {
            title: node.name,
            url: `${ndlaUrl}${url}`,
          };
        } else {
          return {
            title: related.title.title ?? "",
            url: `${ndlaUrl}/article/${related.id}`,
          };
        }
      } catch (e) {
        return undefined;
      }
    }),
  );
  const relatedContent = nullableRelatedContent.filter((rc: any) => !!rc);
  return relatedContent as GQLRelatedContent[];
}

export async function fetchArticle(params: ArticleParams, context: Context): Promise<ArticleV2DTO> {
  const article = await fetchSimpleArticle(params.articleId, context);
  return article;
}

export async function fetchArticlesPage(
  articleIds: number[],
  context: Context,
  pageSize: number,
  page: number,
): Promise<ArticleV2DTO[]> {
  return client
    .GET("/article-api/v2/articles/ids", {
      params: {
        query: {
          ids: articleIds,
          language: context.language,
          "page-size": pageSize,
          page,
          license: "all",
          fallback: true,
        },
      },
    })
    .then(resolveJsonOATS);
}

export async function fetchArticles(articleIds: string[], context: Context): Promise<(ArticleV2DTO | undefined)[]> {
  const pageSize = 100;
  const ids = articleIds.map((id) => parseInt(id)).filter((id) => isNaN(id) === false);
  const numberOfPages = Math.ceil(ids.length / pageSize);

  const requests = [];
  if (numberOfPages) {
    for (let i = 0; i < numberOfPages; i += 1) {
      requests.push(fetchArticlesPage(ids, context, pageSize, i));
    }
  }
  const results = await Promise.all(requests);
  const articles = results.reduce((acc, res) => [...acc, ...res], []);

  // The api does not always return the exact number of results as ids provided.
  // So always map over ids so that dataLoader gets the right amount of results in correct order.
  return articleIds.map((id) => articles.find((article) => article.id.toString() === id.toString()));
}

export async function fetchSimpleArticle(articleUrn: string, context: Context): Promise<ArticleV2DTO> {
  return await client
    .GET("/article-api/v2/articles/{article_id}", {
      params: {
        path: {
          article_id: getArticleIdFromUrn(articleUrn),
        },
        query: {
          language: context.language,
          license: "all",
          fallback: true,
        },
      },
    })
    .then(resolveJsonOATS);
}
