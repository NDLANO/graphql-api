/**
 * Copyright (c) 2020-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import queryString from 'query-string';
import { fetch, resolveJson } from '../utils/apiHelpers';

export async function searchConcepts(
  searchquery: string,
  language: string,
  context: Context,
): Promise<[GQLConcept]> {
  const query = {
    query: searchquery,
    language: language,
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
