/**
 * Copyright (c) 2020-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import queryString from 'query-string';
import { uniq } from 'lodash';
import { IConceptSearchResult, IConcept } from '@ndla/types-concept-api';
import { fetch, resolveJson } from '../utils/apiHelpers';
import { fetchSubject } from './taxonomyApi';

export interface ConceptResult {
  totalCount: number;
  page?: number;
  pageSize: number;
  language: string;
  concepts: Concept[];
}

export interface Concept {
  id: number;
  title: string;
  content?: string;
  created?: string;
  tags: string[];
  articleIds?: number[];
  subjectIds: string[];
  copyright?: IConcept['copyright'];
  source?: string;
  metaImage?: IConcept['metaImage'];
  visualElement?: IConcept['visualElement'];
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
): Promise<ConceptResult> {
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
  const conceptResult: IConceptSearchResult = await resolveJson(response);
  return {
    totalCount: conceptResult.totalCount,
    page: conceptResult.page,
    pageSize: conceptResult.pageSize,
    language: conceptResult.language,
    concepts: conceptResult.results.map(res => ({
      id: res.id,
      title: res.title.title,
      content: res.content.content,
      tags: res.tags?.tags || [],
      subjectIds: res.subjectIds || [],
      metaImage: res.metaImage,
      copyright: res.copyright,
      visualElement: res.visualElement,
    })),
  };
}

export async function fetchConcepts(
  conceptIds: string[],
  context: Context,
): Promise<Concept[]> {
  return (
    await Promise.all(
      conceptIds.map(async id => {
        const concept = await fetch(
          `/concept-api/v1/concepts/${id}?language=${context.language}&fallback=true`,
          context,
        );
        try {
          const res: IConcept = await resolveJson(concept);
          const result: Concept = {
            id: res.id,
            title: res.title.title,
            content: res.content.content,
            created: res.created,
            tags: res.tags?.tags || [],
            articleIds: res.articleIds,
            subjectIds: res.subjectIds || [],
            metaImage: res.metaImage,
            copyright: res.copyright,
            source: res.source,
            visualElement: res.visualElement,
          };
          return result;
        } catch (e) {
          return undefined;
        }
      }),
    )
  ).filter(c => !!c);
}

export async function fetchDetailedConcepts(
  conceptIds: string[],
  context: Context,
): Promise<Concept[]> {
  return (
    await Promise.all(
      conceptIds.map(async id => fetchDetailedConcept(id, context)),
    )
  ).filter(c => !!c);
}

export async function fetchDetailedConcept(
  id: string,
  context: Context,
): Promise<Concept | undefined> {
  const response = await fetch(
    `/concept-api/v1/concepts/${id}?language=${context.language}&fallback=true`,
    context,
  );
  try {
    const concept: IConcept = await resolveJson(response);
    const detailedConcept: Concept = {
      id: concept.id,
      title: concept.title.title,
      content: concept.content.content,
      created: concept.created,
      tags: concept.tags?.tags ?? [],
      articleIds: concept.articleIds,
      subjectIds: concept.subjectIds,
      copyright: concept.copyright,
      source: concept.source,
      metaImage: concept.metaImage,
      visualElement: concept.visualElement,
    };
    return detailedConcept;
  } catch (e) {
    return undefined;
  }
}

export async function fetchListingPage(
  context: Context,
  querySubjects?: string,
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

  const params = queryString.stringify({
    language: context.language,
    subjects: querySubjects,
  });
  const tags = await resolveJson(
    await fetch(`/concept-api/v1/concepts/tags/?${params}`, context),
  ).catch(error => {
    if (error.status !== 404) {
      throw error;
    } else {
      return [{ tags: [] }];
    }
  });
  return {
    subjects,
    tags: getTags(tags),
  };
}

interface TagType {
  tags: string[];
}

const isStringArray = (tags: string[] | TagType[]): tags is string[] => {
  return !tags.some((tag: string | TagType) => typeof tag !== 'string');
};

const getTags = (tags: string[] | TagType[]) => {
  if (isStringArray(tags)) {
    return tags;
  } else if (tags.length > 0) {
    return uniq(tags.flatMap(t => t.tags));
  }
  return [];
};
