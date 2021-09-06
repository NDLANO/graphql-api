/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { fetch, resolveJson } from '../utils/apiHelpers';
import { localConverter } from '../config';
import { getArticleIdFromUrn } from '../utils/articleHelpers';
import { parseVisualElement } from '../utils/visualelementHelpers';

export async function fetchArticle(
  params: {
    articleId: string;
    filterIds?: string;
    subjectId?: string;
    isOembed?: string;
    path?: string;
  },
  context: Context,
): Promise<GQLArticle> {
  const host = localConverter ? 'http://localhost:3100' : '';
  const filterParam = params.filterIds ? `&filters=${params.filterIds}` : '';
  const subjectParam = params.subjectId ? `&subject=${params.subjectId}` : '';
  const oembedParam = params.isOembed ? `&isOembed=${params.isOembed}` : '';
  const pathParam = params.path ? `&path=${params.path}` : '';
  const response = await fetch(
    `${host}/article-converter/json/${context.language}/${params.articleId}?1=1${filterParam}${subjectParam}${oembedParam}${pathParam}`,
    context,
  );

  const article = await resolveJson(response);
  let transposedArticle: GQLArticle = {
    ...article,
  };

  if (transposedArticle.visualElement) {
    try {
      transposedArticle.visualElement = {
        ...(await parseVisualElement(
          article.visualElement.visualElement,
          context,
        )),
        embed: article.visualElement.visualElement,
        language: article.visualElement.language,
      };
    } catch (e) {
      transposedArticle.visualElement = undefined;
    }
  }

  return transposedArticle;
}

export async function fetchArticlesPage(
  articleIds: string[],
  context: Context,
  pageSize: number,
  page: number,
) {
  return fetch(
    `/article-api/v2/articles/?ids=${articleIds.join(',')}&language=${
      context.language
    }&pageSize=${pageSize}&page=${page}&license=all&fallback=true`,
    context,
  ).then(res => res.json());
}

export async function fetchArticles(
  articleIds: string[],
  context: Context,
): Promise<GQLMeta[]> {
  const pageSize = 100;
  const ids = articleIds.filter(id => id && id !== 'undefined');
  const firstPage = await fetchArticlesPage(ids, context, pageSize, 1);
  const numberOfPages = Math.ceil(firstPage.totalCount / firstPage.pageSize);

  const requests = [firstPage];
  if (numberOfPages > 1) {
    for (let i = 2; i <= numberOfPages; i += 1) {
      requests.push(fetchArticlesPage(ids, context, pageSize, i));
    }
  }
  const results = await Promise.all(requests);
  const articles = results.reduce((acc, res) => [...acc, ...res.results], []);

  // The api does not always return the exact number of results as ids provided.
  // So always map over ids so that dataLoader gets the right amount of results in correct order.
  return articleIds.map(id => {
    const article = articles.find((item: { id: number }) => {
      return item.id.toString() === id.toString();
    });
    if (article) {
      return {
        id: article.id,
        title: article.title.title,
        introduction: article.introduction?.introduction,
        metaDescription: article.metaDescription?.metaDescription,
        lastUpdated: article.lastUpdated,
        metaImage: article.metaImage,
      };
    }
    return null;
  });
}

export async function fetchMovieMeta(
  articleUrn: string,
  context: Context,
): Promise<GQLMovieMeta> {
  const articleId = getArticleIdFromUrn(articleUrn);
  const response = await fetch(
    `/article-api/v2/articles/?ids=${articleId}&language=${context.language}&license=all&fallback=true`,
    context,
  );
  const json = await resolveJson(response);
  const article = json.results.find((item: { id: number }) => {
    return item.id.toString() === articleId;
  });

  if (article) {
    return {
      title: article.title.title,
      metaDescription: article.metaDescription?.metaDescription,
      metaImage: article.metaImage,
    };
  }
  return null;
}
