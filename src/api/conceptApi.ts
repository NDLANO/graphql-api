/**
 * Copyright (c) 2020-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import queryString from 'query-string';
import cheerio from 'cheerio';
import { fetch, resolveJson } from '../utils/apiHelpers';
import { fetchSubject } from './taxonomyApi';
import { fetchArticlesPage } from './articleApi';

interface ConceptSearchResultJson extends SearchResultJson {
  tags?: {
    tags: string[];
  };
  visualElement?: {
    visualElement: string;
  };
  copyright: {
    license: {
      license: string;
    };
  };
  articleIds?: string[];
  subjectIds?: string[];
  created: string;
}

export async function searchConcepts(
  params: {
    query?: string;
    subjects?: string;
    tags?: string;
    page?: string;
    pageSize?: string;
    exactMatch?: boolean;
    language?: string;
  },
  context: Context,
): Promise<GQLConceptResult> {
  const query = {
    ...params,
    'page-size': params.pageSize,
    'exact-match': params.exactMatch,
    sort: 'title',
  };
  const response = await fetch(
    `/concept-api/v1/concepts?${queryString.stringify(query)}`,
    context,
  );
  const conceptResult = await resolveJson(response);
  return {
    totalCount: conceptResult.totalCount,
    concepts: conceptResult.results?.map((res: ConceptSearchResultJson) => ({
      id: res.id,
      title: res.title.title,
      content: res.content.content,
      tags: res.tags?.tags || [],
      metaImage: res.metaImage,
    })),
  };
}

export async function fetchConcepts(
  conceptIds: string[],
  context: Context,
): Promise<GQLConcept[]> {
  return (
    await Promise.all(
      conceptIds.map(async id => {
        const concept = await fetch(`/concept-api/v1/concepts/${id}`, context);
        try {
          const res: SearchResultJson = await resolveJson(concept);
          const result: GQLConcept = {
            id: res.id,
            title: res.title.title,
            content: res.content.content,
            metaImage: res.metaImage,
          };
          return result;
        } catch (e) {
          return undefined;
        }
      }),
    )
  ).filter(c => !!c);
}

export async function fetchDetailedConcept(
  id: string,
  context: Context,
): Promise<GQLDetailedConcept> {
  const response = await fetch(`/concept-api/v1/concepts/${id}`, context);
  const concept: ConceptSearchResultJson = await resolveJson(response);
  const detailedConcept: GQLDetailedConcept = {
    title: concept.title.title,
    content: concept.content.content,
    created: concept.created,
    subjectIds: concept.subjectIds,
    copyright: concept.copyright,
  };
  let image;
  const imageId = concept.metaImage?.url?.split('/').pop();
  if (imageId) {
    const imageResponse = await fetch(
      `/image-api/v2/images/${imageId}`,
      context,
    );
    image = await resolveJson(imageResponse);
    detailedConcept.image = {
      title: image.title.title,
      src: image.imageUrl,
      altText: image.alttext.alttext,
      copyright: image.copyright,
    };
  }
  if (concept.articleIds) {
    const articles = await fetchArticlesPage(
      concept.articleIds,
      context,
      concept.articleIds.length,
      1,
    );
    detailedConcept.articles = concept.articleIds.map(articleId => {
      const article = articles.results.find((item: { id: number }) => {
        return item.id.toString() === articleId.toString();
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
    });
  }
  if (concept.visualElement) {
    const parsedElement = cheerio.load(concept.visualElement.visualElement);
    const data = parsedElement('embed').data();
    detailedConcept.visualElement = data;
    if (data?.resource === 'image') {
      detailedConcept.visualElement.image = {
        imageUrl: image.imageUrl,
        contentType: image.contentType,
      };
    } else if (data?.resource === 'h5p' || data?.resource === 'external') {
      const visualElementOembed = await resolveJson(
        await fetch(`/oembed-proxy/v1/oembed/?url=${data.url}`, context),
      );
      detailedConcept.visualElement.oembed = visualElementOembed;
    } else if (data?.resource === 'brightcove') {
      detailedConcept.visualElement.url = `https://players.brightcove.net/${data.account}/${data.player}_default/index.html?videoId=${data.videoid}`;
    }
  }
  return detailedConcept;
}

export async function fetchListingPage(
  context: Context,
): Promise<GQLListingPage> {
  const subjectIds: string[] = await resolveJson(
    await fetch(`/concept-api/v1/concepts/subjects/`, context),
  );
  const subjects = await Promise.all(
    subjectIds.map(id => fetchSubject(id, context)),
  );
  const tags = await resolveJson(
    await fetch(`/concept-api/v1/concepts/tags/`, context),
  );
  return {
    subjects,
    tags,
  };
}
