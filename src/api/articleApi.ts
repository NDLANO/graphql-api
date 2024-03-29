/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { IArticleV2 } from "@ndla/types-backend/article-api";
import { queryNodes } from "./taxonomyApi";
import { transformArticle } from "./transformArticleApi";
import { ndlaUrl } from "../config";
import {
  GQLArticleTransformedContentArgs,
  GQLMeta,
  GQLRelatedContent,
  GQLTransformedArticleContent,
} from "../types/schema";
import { fetch, resolveJson } from "../utils/apiHelpers";
import { getArticleIdFromUrn, findPrimaryPath } from "../utils/articleHelpers";

interface ArticleParams {
  articleId: string;
}

export const fetchTransformedContent = async (
  article: IArticleV2,
  _params: GQLArticleTransformedContentArgs,
  context: Context,
): Promise<GQLTransformedArticleContent> => {
  const params = _params.transformArgs ?? {};
  const subject = params.subjectId;
  const previewH5p = params.previewH5p;
  const { content, metaData, visualElement, visualElementEmbed } = await transformArticle(
    article.content.content,
    context,
    article.visualElement?.visualElement,
    {
      subject,
      draftConcept: params.draftConcept,
      previewH5p,
      absoluteUrl: params.absoluteUrl,
      showVisualElement: params.showVisualElement === "true",
    },
  );

  return {
    content: (article.articleType === "standard" ? content : content === "<section></section>" ? "" : content) ?? "",
    metaData,
    visualElement,
    visualElementEmbed: visualElementEmbed,
  };
};

export async function fetchRelatedContent(
  article: IArticleV2,
  params: { subjectId?: string },
  context: Context,
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
        const nodes = await queryNodes(
          {
            contentURI: `urn:article:${related.id}`,
            language: context.language,
          },
          context,
        );
        const node = nodes?.[0];
        if (node) {
          const primaryPath = params.subjectId ? findPrimaryPath(node.paths, params.subjectId) : undefined;
          const path = primaryPath ?? node.path;
          return {
            title: node.name,
            url: `${ndlaUrl}${path}`,
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

export async function fetchArticle(params: ArticleParams, context: Context): Promise<IArticleV2> {
  const article = await fetchSimpleArticle(params.articleId, context);
  return article;
}

export async function fetchArticlesPage(
  articleIds: string[],
  context: Context,
  pageSize: number,
  page: number,
): Promise<IArticleV2[]> {
  return fetch(
    `/article-api/v2/articles/ids?ids=${articleIds.join(",")}&language=${
      context.language
    }&page-size=${pageSize}&page=${page}&license=all&fallback=true`,
    context,
  ).then((res) => res.json());
}

export async function fetchArticles(articleIds: string[], context: Context): Promise<(GQLMeta | null)[]> {
  const pageSize = 100;
  const ids = articleIds.filter((id) => id && id !== "undefined");
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
  return articleIds.map<GQLMeta | null>((id) => {
    const article = articles.find((item: { id: number }) => {
      return item.id.toString() === id.toString();
    });
    if (article) {
      return {
        id: article.id,
        title: article.title.title,
        htmlTitle: article.title.htmlTitle,
        introduction: article.introduction?.introduction,
        htmlIntroduction: article.introduction?.htmlIntroduction,
        metaDescription: article.metaDescription?.metaDescription,
        lastUpdated: article.updated,
        metaImage: article.metaImage,
        availability: article.availability,
        language: article.content.language,
      };
    }
    return null;
  });
}

export async function fetchSimpleArticle(articleUrn: string, context: Context): Promise<IArticleV2> {
  const articleId = getArticleIdFromUrn(articleUrn);
  const response = await fetch(
    `/article-api/v2/articles/${articleId}?language=${context.language}&license=all&fallback=true`,
    context,
  );
  return await resolveJson(response);
}
