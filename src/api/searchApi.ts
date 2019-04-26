/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import queryString from 'query-string';
import { fetch, resolveJson } from '../utils/apiHelpers';

interface JsonResult {
  title: {
    title: string;
  };
  id: number;
  metaDescription: {
    metaDescription: string;
  };
  metaImage: { url: string; alt: string };
}

interface GroupSearchJSON {
  results: [ContentTypeJSON];
  resourceType: string;
}

interface ContentTypeJSON {
  paths: [string];
  url: string;
  title: {
    title: string;
  };
}

export async function search(
  searchQuery: QueryToSearchArgs,
  context: Context,
): Promise<GQLSearch> {
  const query = {
    ...searchQuery,
    'page-size': searchQuery.pageSize,
    'context-types': searchQuery.contextTypes,
    'resource-types': searchQuery.resourceTypes,
    'language-filter': searchQuery.languageFilter,
    'context-filters': searchQuery.contextFilters,
  };
  const response = await fetch(
    `/search-api/v1/search/?${queryString.stringify(query)}`,
    context,
    { cache: 'no-store' },
  );
  const json = await resolveJson(response);
  // convert all search result paths with ending slash if it is not a resource type
  if (json && json.totalCount && json.results) {
    const resultLength = json.results.length;
    for (let x = 0; x < xLength; x++) {
      if (json.results[x].contexts && json.results[x].contexts.length) {
        const yLength = json.results[x].contexts.length;
        for (let y = 0; y < yLength; y++) {
          if (json.results[x].contexts[y] && json.results[x].contexts[y].path) {
            let newPath = json.results[x].contexts[y].path;
            const pattern = new RegExp(/resource/gi);
            if (!pattern.test(newPath)) {
              json.results[x].contexts[y].path = `${newPath}/`;
            }
          }
        }
      }
    }
  }
  return {
    ...json,
    results: json.results.map((result: JsonResult) => ({
      ...result,
      title: result.title.title,
      metaDescription: result.metaDescription
        ? result.metaDescription.metaDescription
        : undefined,
      metaImage: result.metaImage
        ? { url: result.metaImage.url, alt: result.metaImage.alt }
        : undefined,
    })),
  };
}

export async function groupSearch(
  searchQuery: QueryToSearchArgs,
  context: Context,
): Promise<GQLGroupSearch> {
  const query = {
    ...searchQuery,
    'resource-types': searchQuery.resourceTypes,
  };
  const response = await fetch(
    `/search-api/v1/search/group/?${queryString.stringify(query)}`,
    context,
    { cache: 'no-store' },
  );
  const json = await resolveJson(response);
  return json.map((result: GroupSearchJSON) => ({
    ...result,
    resources: result.results.map((contentTypeResult: ContentTypeJSON) => ({
      ...contentTypeResult,
      path:
        contentTypeResult.paths && contentTypeResult.paths.length > 0
          ? `/subjects${contentTypeResult.paths[0]}`
          : contentTypeResult.url,
      name: contentTypeResult.title
        ? contentTypeResult.title.title
        : contentTypeResult.title,
    })),
  }));
}
