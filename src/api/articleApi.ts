/**
 *
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { IArticleV2 } from '@ndla/types-backend/article-api';
import { localConverter, ndlaUrl } from '../config';
import { GQLArticle, GQLMeta } from '../types/schema';
import { fetch, resolveJson } from '../utils/apiHelpers';
import { getArticleIdFromUrn, findPrimaryPath } from '../utils/articleHelpers';
import { parseVisualElement } from '../utils/visualelementHelpers';
import { queryNodes } from './taxonomyApi';
import { transformArticle } from './transformArticleApi';

interface ArticleParams {
  convertEmbeds?: boolean;
  articleId: string;
  subjectId?: string;
  isOembed?: string;
  showVisualElement?: string;
  path?: string;
  previewH5p?: boolean;
  draftConcept?: boolean;
  absoluteUrl?: boolean;
}

const _fetchTransformedArticle = async (
  params: ArticleParams,
  context: Context,
) => {
  if (!params.convertEmbeds) {
    const host = localConverter ? 'http://localhost:3100' : '';
    const subjectParam = params.subjectId ? `&subject=${params.subjectId}` : '';
    const oembedParam = params.isOembed ? `&isOembed=${params.isOembed}` : '';
    const visualElementParam = params.showVisualElement
      ? `&showVisualElement=${params.showVisualElement}`
      : '';
    const pathParam = params.path ? `&path=${params.path}` : '';
    const res = await fetch(
      `${host}/article-converter/json/${context.language}/${params.articleId}?1=1${subjectParam}${oembedParam}${pathParam}${visualElementParam}`,
      context,
    ).then(resolveJson);

    if (res.visualElement) {
      try {
        res.visualElement = {
          ...(await parseVisualElement(
            res.visualElement.visualElement,
            context,
          )),
          embed: res.visualElement.visualElement,
          language: res.visualElement.language,
        };
      } catch (e) {
        res.visualElement = undefined;
      }
    }

    return res;
  } else {
    const subject = params.subjectId;
    const previewH5p = params.previewH5p;
    const article = await fetchSimpleArticle(params.articleId, context);
    const {
      content,
      metaData,
      visualElement,
      visualElementEmbed,
    } = await transformArticle(
      article.content.content,
      context,
      article.visualElement?.visualElement,
      {
        subject,
        draftConcept: params.draftConcept,
        previewH5p,
        absoluteUrl: params.absoluteUrl,
        showVisualElement: params.showVisualElement === 'true',
      },
    );
    return {
      ...article,
      introduction: article.introduction?.introduction ?? '',
      metaDescription: article.metaDescription.metaDescription,
      title: article.title.title,
      metaData,
      tags: article.tags.tags,
      visualElementEmbed,
      content:
        article.articleType === 'standard'
          ? content
          : content === '<section></section>'
          ? ''
          : content,
      visualElement,
      language: article.content.language,
    };
  }
};

export async function fetchArticle(
  params: ArticleParams,
  context: Context,
): Promise<GQLArticle> {
  const article = await _fetchTransformedArticle(params, context);

  const nullableRelatedContent = await Promise.all(
    article?.relatedContent?.map(async (rc: any) => {
      if (typeof rc !== 'number') {
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
          const primaryPath = params.subjectId
            ? findPrimaryPath(node.paths, params.subjectId)
            : undefined;
          const path = primaryPath ?? node.path;
          return {
            title: node.name,
            url: `${ndlaUrl}${path}`,
          };
        } else {
          return {
            title: related.title.title ?? '',
            url: `${ndlaUrl}/article/${related.id}`,
          };
        }
      } catch (e) {
        return undefined;
      }
    }),
  );
  const relatedContent = nullableRelatedContent.filter((rc: any) => !!rc);

  return {
    ...article,
    relatedContent: relatedContent ?? [],
  };
}

export async function fetchArticlesPage(
  articleIds: string[],
  context: Context,
  pageSize: number,
  page: number,
) {
  return fetch(
    `/article-api/v2/articles/ids/?ids=${articleIds.join(',')}&language=${
      context.language
    }&page-size=${pageSize}&page=${page}&license=all&fallback=true`,
    context,
  ).then(res => res.json());
}

export async function fetchArticles(
  articleIds: string[],
  context: Context,
): Promise<(GQLMeta | null)[]> {
  const pageSize = 100;
  const ids = articleIds.filter(id => id && id !== 'undefined');
  const numberOfPages = Math.ceil(ids.length / pageSize);

  const requests = [];
  if (numberOfPages) {
    for (let i = 0; i <= numberOfPages; i += 1) {
      requests.push(fetchArticlesPage(ids, context, pageSize, i));
    }
  }
  const results = await Promise.all(requests);
  const articles = results.reduce((acc, res) => [...acc, ...res], []);

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

export async function fetchSimpleArticle(
  articleUrn: string,
  context: Context,
): Promise<IArticleV2> {
  const articleId = getArticleIdFromUrn(articleUrn);
  const response = await fetch(
    `/article-api/v2/articles/${articleId}?language=${context.language}&license=all&fallback=true`,
    context,
  );
  return await resolveJson(response);
}
