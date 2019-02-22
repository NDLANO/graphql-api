/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { fetch, resolveJson } from '../utils/apiHelpers';
import { localConverter } from '../config';

export async function fetchArticle(
  articleId: string,
  filterIds: string,
  context: Context,
): Promise<GQLArticle> {
  const host = localConverter ? 'http://localhost:3100' : '';
  const response = await fetch(
    `${host}/article-converter/json/${context.language}/${articleId}${
      filterIds ? `?filters=${filterIds}` : ''
    }`,
    context,
  );
  return resolveJson(response);
}

export async function fetchArticles(
  articleIds: string[],
  context: Context,
): Promise<GQLMeta[]> {
  const response = await fetch(
    `/article-api/v2/articles/?ids=${articleIds.join(',')}&language=${
      context.language
    }&fallback=true`,
    context,
  );
  const json = await resolveJson(response);

  // The api does not always return the exact number of results as ids provided.
  // So always map over ids so that dataLoader gets the right amount of results in correct order.
  return articleIds.map(id => {
    const article = json.results.find((item: { id: number }) => {
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
