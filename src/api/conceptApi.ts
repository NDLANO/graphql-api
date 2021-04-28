/**
 * Copyright (c) 2020-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import queryString from 'query-string';
import { fetch, resolveJson } from '../utils/apiHelpers';

interface ConceptSearchResultJson extends SearchResultJson {
  tags?: {
    tags: string[];
  };
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

export async function fetchListingPage(
  context: Context,
): Promise<GQLListingPage> {
  const subjectIds: string[] = await resolveJson(
    await fetch(`/concept-api/v1/concepts/subjects/`, context),
  );
  const subjects = await Promise.all(
    subjectIds.map(async id =>
      resolveJson(await fetch(`/taxonomy/v1/subjects/${id}`, context)),
    ),
  );
  const tags = await resolveJson(
    await fetch(`/concept-api/v1/concepts/tags/`, context),
  );
  return {
    subjects,
    tags,
  };
}
