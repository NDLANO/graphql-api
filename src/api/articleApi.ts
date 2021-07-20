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
import cheerio from 'cheerio';

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
    ...article
  }
  if (transposedArticle.visualElement) {
    const parsedElement = cheerio.load(article.visualElement.visualElement);
    const data = parsedElement('embed').data();
    transposedArticle.visualElement = {
      ...data,
      embed : article.visualElement.visualElement,
      language: article.visualElement.language,
    } 

    if (data?.resource === 'image') {
      transposedArticle.visualElement.image = await fetchImage(data.resourceId, context);
    } else if (data?.resource === 'brightcove') {
      transposedArticle.visualElement.url = `https://players.brightcove.net/${data.account}/${data.player}_default/index.html?videoId=${data.videoid}`;
      const license: GQLBrightcoveLicense = await fetchVisualElementLicense(
        article.visualElement.visualElement,
        'brightcoves',
        context,
      );
      transposedArticle.visualElement.copyright = license.copyright;
      transposedArticle.visualElement.copyText = license.copyText;
      transposedArticle.visualElement.thumbnail = license.cover;
    } else if (data?.resource === 'h5p') {
      const visualElementOembed = await fetchOembed(data.url, context);
      transposedArticle.visualElement.oembed = visualElementOembed;
      const license: GQLH5pLicense = await fetchVisualElementLicense(
        article.visualElement.visualElement,
        'h5ps',
        context,
      );
      transposedArticle.visualElement.copyright = license.copyright;
      transposedArticle.visualElement.copyText = license.copyText;
      transposedArticle.visualElement.thumbnail = license.thumbnail;
    } else if (data?.resource === 'external') {
      const visualElementOembed = await fetchOembed(data.url, context);
      transposedArticle.visualElement.oembed = visualElementOembed;
    }
  }
  

  return new Promise((resolve, _reject) => {
    resolve(transposedArticle);
  });
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
      return item.id.toString() === id;
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

async function fetchImage(imageId: string, context: Context) {
  const imageResponse = await fetch(`/image-api/v2/images/${imageId}`, context);
  const image = await resolveJson(imageResponse);
  return {
    title: image.title.title,
    src: image.imageUrl,
    altText: image.alttext.alttext,
    contentType: image.contentType,
    copyright: image.copyright,
  };
}

async function fetchVisualElementLicense(
  visualElement: string,
  resource: string,
  context: Context,
): Promise<GQLBrightcoveLicense | GQLH5pLicense> {
  const host = localConverter ? 'http://localhost:3100' : '';
  const metaDataResponse = await fetch(
    encodeURI(
      `${host}/article-converter/json/${context.language}/meta-data?embed=${visualElement}`,
    ),
    context,
  );
  const metaData = await resolveJson(metaDataResponse);
  return metaData.metaData[resource][0];
}

export async function fetchOembed(
  url: string,
  context: Context,
): Promise<GQLLearningpathStepOembed> {
  const response = await fetch(`/oembed-proxy/v1/oembed?url=${url}`, context);
  return resolveJson(response);
}
