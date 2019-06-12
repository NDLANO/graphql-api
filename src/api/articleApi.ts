/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { fetch, resolveJson } from '../utils/apiHelpers';
import { localConverter } from '../config';
import { Response } from 'apollo-env';

export async function fetchArticle(
  params: {
    articleId: string;
    filterIds?: string;
    subjectId?: string;
  },
  context: Context,
): Promise<GQLArticle> {
  const host = localConverter ? 'http://localhost:3100' : '';
  const response = await fetch(
    `${host}/article-converter/json/${context.language}/${
      params.articleId
    }?1=1${params.filterIds ? `&filters=${params.filterIds}` : ''}
      ${params.subjectId ? `&subject=${params.subjectId}` : ''}`,
    context,
  );
  return resolveJson(response);
}

async function fetchArticlesPage(
  articleIds: string[],
  context: Context,
  pageSize: number,
  page: number,
) {
  return fetch(
    `/article-api/v2/articles/?ids=${articleIds.join(',')}&language=${
      context.language
    }&pageSize=${pageSize}&page=${page}&fallback=true`,
    context,
  ).then(res => res.json());
}

export async function fetchArticles(
  articleIds: string[],
  context: Context,
): Promise<GQLMeta[]> {
  const pageSize = 100;
  const firstPage = await fetchArticlesPage(articleIds, context, pageSize, 1);
  const numberOfPages = Math.ceil(firstPage.totalCount / firstPage.pageSize);

  const requests = [firstPage];
  for (let i = 1; i < numberOfPages; i += 1) {
    requests.push(fetchArticlesPage(articleIds, context, pageSize, i));
  }
  const results = await Promise.all(requests);
  const articles = results.reduce((acc, res) => [...acc, ...res.results], []);

  // The api does not always return the exact number of results as ids provided.
  // So always map over ids so that dataLoader gets the right amount of results in correct order.
  return articleIds.map(id => {
    const article = articles.find((item: { id: number }) => {
      return item.id.toString() === id;
    });
    if (article) {
      return {
        id: article.id,
        title: article.title.title,
        introduction: article.introduction
          ? article.introduction.introduction
          : undefined,
        metaDescription: article.metaDescription
          ? article.metaDescription.metaDescription
          : undefined,
        lastUpdated: article.lastUpdated || undefined,
        metaImage: article.metaImage
          ? { url: article.metaImage.url, alt: article.metaImage.alt }
          : undefined,
      };
    }
    return null;
  });
}

export async function fetchMovieMeta(
  articleId: string,
  context: Context,
): Promise<GQLMovieMeta> {
  const id = articleId.replace('urn:article:', '');
  const response = await fetch(
    `/article-api/v2/articles/?ids=${id}&language=${
      context.language
    }&fallback=true`,
    context,
  );
  const json = await resolveJson(response);

  const article = json.results.find((item: { id: number }) => {
    return item.id.toString() === id;
  });

  if (article) {
    return {
      title: article.title.title,
      metaDescription: article.metaDescription
        ? article.metaDescription.metaDescription
        : undefined,
      metaImage: article.metaImage
        ? { url: article.metaImage.url, alt: article.metaImage.alt }
        : undefined,
    };
  }
  return null;
}
