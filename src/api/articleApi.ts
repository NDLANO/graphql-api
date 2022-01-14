/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { localConverter, ndlaUrl } from '../config';
import { fetch, resolveJson } from '../utils/apiHelpers';
import { getArticleIdFromUrn, findPrimaryPath } from '../utils/articleHelpers';
import { parseVisualElement } from '../utils/visualelementHelpers';
import {
  queryResourcesOnContentURI,
  queryTopicsOnContentURI,
} from './taxonomyApi';

export async function fetchArticle(
  params: {
    articleId: string;
    subjectId?: string;
    isOembed?: string;
    showVisualElement?: string;
    path?: string;
  },
  context: Context,
): Promise<GQLArticle> {
  const host = localConverter ? 'http://localhost:3100' : '';
  const subjectParam = params.subjectId ? `&subject=${params.subjectId}` : '';
  const oembedParam = params.isOembed ? `&isOembed=${params.isOembed}` : '';
  const visualElementParam = params.showVisualElement
    ? `&showVisualElement=${params.showVisualElement}`
    : '';
  const pathParam = params.path ? `&path=${params.path}` : '';
  const response = await fetch(
    `${host}/article-converter/json/${context.language}/${params.articleId}?1=1${subjectParam}${oembedParam}${pathParam}${visualElementParam}`,
    context,
  );

  const article = await resolveJson(response);
  const nullableRelatedContent = await Promise.all(
    article?.relatedContent?.map(async (rc: any) => {
      if (typeof rc === 'number') {
        return Promise.resolve(fetchArticle({ articleId: `${rc}` }, context))
          .then(async related => {
            let topicOrResource;
            if (related.articleType === 'topic-article') {
              topicOrResource = await queryTopicsOnContentURI(
                `urn:article:${related.id}`,
                context,
              );
            } else {
              topicOrResource = await queryResourcesOnContentURI(
                `urn:article:${related.id}`,
                context,
              );
            }
            return topicOrResource || related;
          })
          .then((topicOrResource: any) => {
            let path = `/article/${topicOrResource.id}`;
            let title = '';
            if (topicOrResource.hasOwnProperty('paths')) {
              path = topicOrResource.path;
              if (params.subjectId) {
                const primaryPath = findPrimaryPath(
                  topicOrResource.paths,
                  params.subjectId,
                );
                path = primaryPath || path;
              }
              title = topicOrResource.name;
            } else {
              title = topicOrResource.title;
            }
            return {
              title,
              url: `${ndlaUrl}${path}`,
            };
          })
          .catch(err => {
            return undefined;
          });
      } else {
        return {
          title: rc.title,
          url: rc.url,
        };
      }
    }),
  );
  const relatedContent = nullableRelatedContent.filter((rc: any) => !!rc);
  let transposedArticle: GQLArticle = {
    ...article,
    relatedContent,
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
        availability: article.availability,
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
