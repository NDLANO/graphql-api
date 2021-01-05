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
import { searchConcepts } from './conceptApi';

interface GroupSearchJSON {
  results: [ContentTypeJSON];
  resourceType: string;
}

interface ContentContext {
  breadcrumbs: string[];
  path: string;
  resourceTypes: [
    {
      id: string;
      name: string;
      language: string;
    },
  ];
}

interface ContentTypeJSON {
  paths: [string];
  url: string;
  title: {
    title: string;
  };
  metaDescription: {
    metaDescription: string;
  };
  metaImage: {
    url: string;
    alt: string;
  };
  contexts: ContentContext[];
}

interface SearchResultContexts {
  id: string;
  path: string;
  subject: string;
  resourceTypes: Array<{ name: string }>;
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
    'grep-codes': searchQuery.grepCodes,
  };
  const response = await fetch(
    `/search-api/v1/search/?${queryString.stringify(query)}`,
    context,
    { cache: 'no-store' },
  );
  const searchResults = await resolveJson(response);
  const concepts = await searchConcepts(
    searchQuery.query,
    searchQuery.subjects,
    searchQuery.language,
    context,
  );
  return {
    ...searchResults,
    results: searchResults.results.map((result: SearchResultJson) =>
      transformResult(result),
    ),
    concepts: { concepts },
  };
}

export async function groupSearch(
  searchQuery: QueryToSearchArgs,
  context: Context,
): Promise<GQLGroupSearch> {
  const query = {
    ...searchQuery,
    'page-size': searchQuery.pageSize,
    'resource-types': searchQuery.resourceTypes,
    'context-types': searchQuery.contextTypes,
  };
  const response = await fetch(
    `/search-api/v1/search/group/?${queryString.stringify(query)}`,
    context,
    { cache: 'no-store' },
  );
  const subjects = searchQuery.subjects?.split(',') || [];
  const json = await resolveJson(response);
  return json.map((result: GroupSearchJSON) => ({
    ...result,
    resources: result.results.map((contentTypeResult: ContentTypeJSON) => {
      const path =
        subjects.length === 1
          ? contentTypeResult.paths?.find(
              p => p.split('/')[1] === subjects[0].replace('urn:', ''),
            )
          : contentTypeResult.paths?.[0];
      return {
        ...contentTypeResult,
        path: path || contentTypeResult.url,
        name: contentTypeResult.title?.title,
        ingress: contentTypeResult.metaDescription?.metaDescription,
        contexts: contentTypeResult.contexts?.map(c => ({
          breadcrumbs: c.breadcrumbs,
          path: c.path,
          resourceTypes: c.resourceTypes,
        })),
        ...(contentTypeResult.metaImage && {
          metaImage: {
            url: contentTypeResult.metaImage?.url,
            alt: contentTypeResult.metaImage?.alt,
          },
        }),
      };
    }),
  }));
}

export async function conceptSearch(
  searchQuery: QueryToSearchArgs,
  context: Context,
): Promise<[GQLConcept]> {
  return searchConcepts(
    searchQuery.query,
    searchQuery.subjects,
    searchQuery.language,
    context,
  );
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

const queryOnGivenPage = (
  searchQuery: QueryToSearchWithoutPaginationArgs,
  page: string,
  context: Context,
) =>
  fetch(
    `/search-api/v1/search/?${queryString.stringify({
      ...searchQuery,
      page,
      'page-size': '100',
      'context-types': searchQuery.contextTypes,
      'resource-types': searchQuery.resourceTypes,
      'language-filter': searchQuery.languageFilter,
      'context-filters': searchQuery.contextFilters,
    })}`,
    context,
    { cache: 'no-store' },
  );

export async function searchWithoutPagination(
  searchQuery: QueryToSearchWithoutPaginationArgs,
  context: Context,
): Promise<GQLSearch> {
  const firstQuery = await queryOnGivenPage(searchQuery, '1', context);
  const firstPageJson = await resolveJson(firstQuery);
  const numberOfPages = Math.ceil(
    firstPageJson.totalCount / firstPageJson.pageSize,
  );

  const requests = [];
  if (numberOfPages > 1) {
    for (let i = 2; i <= numberOfPages; i += 1) {
      requests.push(queryOnGivenPage(searchQuery, i.toString(), context));
    }
  }
  const response = await Promise.all(requests);
  const allResultsJson = await Promise.all(response.map(resolveJson));
  allResultsJson.push(firstPageJson);
  return {
    results: allResultsJson.flatMap(json =>
      json.results.map((result: SearchResultJson) => transformResult(result)),
    ),
  };
}

const transformResult = (result: SearchResultJson) => ({
  ...result,
  title: result.title.title,
  contexts: fixContext(result.contexts),
  metaDescription: result.metaDescription?.metaDescription,
  metaImage: result.metaImage,
});

const fixContext = (contexts: SearchResultContexts[]) =>
  contexts.map(context => ({
    ...context,
    path: context.path.includes('/resource/')
      ? `${context.path}/`
      : context.path,
  }));
