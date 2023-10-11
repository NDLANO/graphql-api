/**
 * Copyright (c) 2020-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import queryString from 'query-string';
import { uniq } from 'lodash';
import {
  IConceptSearchResult,
  IConcept,
  IConceptSummary,
} from '@ndla/types-backend/concept-api';
import { fetch, resolveJson } from '../utils/apiHelpers';
import { fetchSubject } from './taxonomyApi';
import { GQLListingPage, GQLSubject } from '../types/schema';
import parseMarkdown from '../utils/parseMarkdown';

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
  content: string;
  created: string;
  tags: string[];
  articleIds: number[];
  subjectIds: string[];
  copyright?: IConcept['copyright'];
  source?: string;
  metaImage?: IConcept['metaImage'];
  visualElement?: IConcept['visualElement'];
  supportedLanguages: string[];
  glossData?: IConcept['glossData'];
  conceptType: IConcept['conceptType'];
}

export async function searchConcepts(
  params: {
    query?: string;
    subjects?: string;
    ids?: number[];
    tags?: string;
    page?: number;
    pageSize?: number;
    exactMatch?: boolean;
    language?: string;
    fallback?: boolean;
    conceptType?: string;
  },
  context: Context,
): Promise<ConceptResult> {
  const idsString = params.ids?.join(',');
  const query = {
    query: params.query,
    subjects: params.subjects,
    tags: params.tags,
    page: params.page,
    language: params.language,
    fallback: params.fallback,
    ids: idsString,
    'page-size': params.pageSize,
    'exact-match': params.exactMatch,
    'concept-type': params.conceptType,
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
      created: res.created,
      articleIds: res.articleIds,
      title: res.title.title,
      content: res.content.content,
      tags: res.tags?.tags || [],
      subjectIds: res.subjectIds || [],
      metaImage: res.metaImage,
      copyright: res.copyright,
      visualElement: res.visualElement,
      supportedLanguages: res.supportedLanguages,
      conceptType: res.conceptType,
    })),
  };
}

export async function fetchConcept(
  id: string | number,
  context: Context,
): Promise<Concept | undefined> {
  const response = await fetch(
    `/concept-api/v1/concepts/${id}?language=${context.language}&fallback=true`,
    context,
  );
  try {
    const concept: IConcept = await resolveJson(response);
    return {
      id: concept.id,
      title: concept.title.title,
      content: concept.content?.content ?? '',
      created: concept.created,
      tags: concept.tags?.tags ?? [],
      articleIds: concept.articleIds,
      subjectIds: concept.subjectIds ?? [],
      copyright: concept.copyright,
      source: concept.source,
      metaImage: concept.metaImage,
      visualElement: concept.visualElement,
      supportedLanguages: concept.supportedLanguages,
      conceptType: concept.conceptType,
      glossData: concept.glossData,
    };
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
    subjectIds.map(id => fetchSubject(context, id)),
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

export const fetchEmbedConcept = async (
  id: string,
  context: Context,
  draftConcept: boolean,
): Promise<IConcept> => {
  const endpoint = draftConcept ? 'drafts' : 'concepts';
  const url = `/concept-api/v1/${endpoint}/${id}?language=${context.language}&fallback=true`;
  const res = await fetch(url, context);
  const resolved: IConcept = await resolveJson(res);
  if (resolved.content) {
    return {
      ...resolved,
      content: {
        ...resolved.content,
        content: parseMarkdown({ markdown: resolved.content.content }),
      },
    };
  }
  return resolved;
};

export const fetchEmbedConcepts = async (
  tag: string,
  subjectId: string,
  context: Context,
  draftConcept: boolean,
): Promise<IConceptSummary[]> => {
  const endpoint = draftConcept ? 'drafts' : 'concepts';
  const params = queryString.stringify({
    tags: tag,
    subjects: subjectId,
    language: context.language,
    'page-size': 1000,
  });
  const url = `/concept-api/v1/${endpoint}/?${params}`;
  const res = await fetch(url, context).then(resolveJson);
  return res.results;
};
