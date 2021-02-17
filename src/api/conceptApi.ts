/**
 * Copyright (c) 2020-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import queryString from 'query-string';
import { fetch, resolveJson } from '../utils/apiHelpers';
import logger from '../utils/logger';

export async function searchConcepts(
  searchquery: string,
  subjects: string,
  language: string,
  context: Context,
): Promise<[GQLConcept]> {
  const query = {
    query: searchquery,
    language,
    subjects,
    fallback: true,
    'exact-match': true,
    sort: '-title',
  };
  const response = await fetch(
    `/concept-api/v1/concepts?${queryString.stringify(query)}`,
    context,
  );
  const conceptResult = await resolveJson(response);
  return conceptResult.results?.map((res: SearchResultJson) => ({
    id: res.id,
    title: res.title.title,
    content: res.content.content,
    metaImage: res.metaImage,
  }));
}

export async function fetchConcepts(
  conceptIds: string[],
  context: Context,
): Promise<GQLConcept[]> {
  const response = await Promise.all(
    conceptIds.map(id => fetch(`/concept-api/v1/concepts/${id}`, context)),
  );
  const concepts = await Promise.all(
    response.map(async concept => {
      try {
        return await resolveJson(concept);
      } catch (e) {
        return undefined;
      }
    }),
  );
  return concepts.reduce((acc: GQLConcept[], res: SearchResultJson) => {
    if (res !== undefined) {
      acc.push({
        id: res.id,
        title: res.title.title,
        content: res.content.content,
        metaImage: res.metaImage,
      });
    }
    return acc;
  }, []);
}
