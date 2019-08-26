import { expandResourcesFromAllContexts } from './../utils/apiHelpers';
/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import queryString from 'query-string';
import { fetch, resolveJson } from '../utils/apiHelpers';

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
  const convertedJson = convertSearchResultPaths(json);
  return {
    ...convertedJson,
    results: convertedJson.results.map((result: SearchResultJson) => ({
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
          ? contentTypeResult.paths[0]
          : contentTypeResult.url,
      name: contentTypeResult.title
        ? contentTypeResult.title.title
        : contentTypeResult.title,
    })),
  }));
}

export async function frontpageSearch(
  searchQuery: QueryToSearchArgs,
  context: Context,
): Promise<GQLFrontpageSearch> {
  const topicQuery = {
    ...searchQuery,
    'context-types': 'topic-article',
  };
  const resourceQuery = {
    ...searchQuery,
    'context-types': 'standard',
  };
  const [topicReponse, resourceResponse] = await Promise.all([
    fetch(
      `/search-api/v1/search/?${queryString.stringify(topicQuery)}`,
      context,
      { cache: 'no-store' },
    ),
    fetch(
      `/search-api/v1/search/?${queryString.stringify(resourceQuery)}`,
      context,
      { cache: 'no-store' },
    ),
  ]);

  const topicJson = await resolveJson(topicReponse);
  const resourceJson = await resolveJson(resourceResponse);
  return {
    topicResources: {
      ...topicJson,
      results: expandResourcesFromAllContexts(topicJson.results),
    },
    learningResources: {
      ...resourceJson,
      results: expandResourcesFromAllContexts(resourceJson.results),
    },
  };
}

const queryWithPage = (
  searchQuery: QueryToSearchArgs,
  page: String,
  context: Context,
) =>
  fetch(
    `/search-api/v1/search/?${queryString.stringify({
      ...searchQuery,
      page: page,
      'page-size': '100',
      'context-types': searchQuery.contextTypes,
      'resource-types': searchQuery.resourceTypes,
      'language-filter': searchQuery.languageFilter,
      'context-filters': searchQuery.contextFilters,
    })}`,
    context,
    { cache: 'no-store' },
  );

const convertSearchResultPaths = (json: any) => {
  // convert all search result paths with ending slash if it is not a resource type
  if (json && json.totalCount && json.results) {
    const resultLength = json.results.length;
    for (let x = 0; x < resultLength; x++) {
      if (json.results[x].contexts && json.results[x].contexts.length) {
        const contextsLength = json.results[x].contexts.length;
        for (let y = 0; y < contextsLength; y++) {
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
  return json;
};

export async function searchWithoutPagination(
  searchQuery: QueryToSearchWithoutPaginationArgs,
  context: Context,
): Promise<GQLSearch> {
  const firstQuery = queryWithPage(searchQuery, '1', context);
  const firstQueryResponse = await firstQuery;
  const firstPageJson = await resolveJson(firstQueryResponse);
  const numberOfPages = Math.ceil(
    firstPageJson.totalCount / firstPageJson.pageSize,
  );

  const requests = [];
  if (numberOfPages > 1) {
    for (let i = 2; i <= numberOfPages; i += 1) {
      requests.push(queryWithPage(searchQuery, i.toString(), context));
    }
  }
  const response = await Promise.all(requests);
  const allResultsJson = await Promise.all(response.map(resolveJson));
  allResultsJson.push(firstPageJson);
  const convertedJson = allResultsJson.map(json =>
    convertSearchResultPaths(json),
  );

  return {
    ...convertedJson,
    results: convertedJson.flatMap(json =>
      json.results.map((result: SearchResultJson) => ({
        ...result,
        title: result.title.title,
        metaDescription: result.metaDescription
          ? result.metaDescription.metaDescription
          : undefined,
        metaImage: result.metaImage
          ? { url: result.metaImage.url, alt: result.metaImage.alt }
          : undefined,
      })),
    ),
  };
}
