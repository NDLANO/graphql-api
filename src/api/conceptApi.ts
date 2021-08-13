/**
 * Copyright (c) 2020-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import queryString from 'query-string';
import { fetch, resolveJson } from '../utils/apiHelpers';
import { fetchSubject } from './taxonomyApi';
import { fetchArticlesPage } from './articleApi';
import { fetchImage, parseVisualElement } from '../utils/visualelementHelpers';

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
    fallback?: boolean;
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
        const concept = await fetch(
          `/concept-api/v1/concepts/${id}?language=${context.language}&fallback=true`,
          context,
        );
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
  const response = await fetch(
    `/concept-api/v1/concepts/${id}?language=${context.language}&fallback=true`,
    context,
  );
  const concept: ConceptSearchResultJson = await resolveJson(response);
  const detailedConcept: GQLDetailedConcept = {
    title: concept.title.title,
    content: concept.content.content,
    created: concept.created,
    subjectIds: concept.subjectIds,
    copyright: concept.copyright,
  };
  const metaImageId = concept.metaImage?.url?.split('/').pop();
  if (metaImageId) {
    detailedConcept.image = await fetchImage(metaImageId, context);
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
    detailedConcept.visualElement = await parseVisualElement(
      concept.visualElement.visualElement,
      context,
    );
  }
  return detailedConcept;
}

export async function fetchListingPage(
  context: Context,
): Promise<GQLListingPage> {
  const subjectIds: string[] = await resolveJson(
    await fetch(`/concept-api/v1/concepts/subjects/`, context),
  );
  const subjectResults = await Promise.allSettled(
    subjectIds.map(id => fetchSubject(id, context)),
  );
  const subjects = (subjectResults.filter(
    result => result.status === 'fulfilled',
  ) as Array<PromiseFulfilledResult<GQLSubject>>).map(res => res.value);

  const tags = await resolveJson(
    await fetch(
      `/concept-api/v1/concepts/tags/?language=${context.language}`,
      context,
    ),
  );
  return {
    subjects,
    tags,
  };
}
