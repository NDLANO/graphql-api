/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import queryString from "query-string";
import { IApiTaxonomyContext, IGroupSearchResult, IMultiSearchSummary } from "@ndla/types-backend/search-api";
import { searchConcepts } from "./conceptApi";
import {
  GQLGroupSearch,
  GQLQuerySearchArgs,
  GQLQuerySearchWithoutPaginationArgs,
  GQLSearch,
  GQLSearchWithoutPagination,
} from "../types/schema";
import { fetch, resolveJson } from "../utils/apiHelpers";

export async function search(searchQuery: GQLQuerySearchArgs, context: Context): Promise<GQLSearch> {
  const query = {
    ...searchQuery,
    "page-size": searchQuery.pageSize,
    "context-types": searchQuery.contextTypes,
    "resource-types": searchQuery.resourceTypes,
    "language-filter": searchQuery.languageFilter,
    "context-filters": searchQuery.contextFilters,
    "grep-codes": searchQuery.grepCodes,
    "aggregate-paths": searchQuery.aggregatePaths,
    "filter-inactive": searchQuery.filterInactive,
  };
  const response = await fetch(`/search-api/v1/search/?${queryString.stringify(query)}`, context, {
    cache: "no-store",
  });
  const searchResults = await resolveJson(response);
  const conceptQuery = {
    ...searchQuery,
    fallback: searchQuery.fallback === "true",
  };
  const concepts = await searchConcepts(conceptQuery, context);
  return {
    ...searchResults,
    results: searchResults.results.map((result: IMultiSearchSummary) => transformResult(result)),
    concepts: { concepts },
  };
}

export async function groupSearch(searchQuery: GQLQuerySearchArgs, context: Context): Promise<GQLGroupSearch> {
  const query = {
    ...searchQuery,
    "page-size": searchQuery.pageSize,
    "resource-types": searchQuery.resourceTypes,
    "context-types": searchQuery.contextTypes,
    "grep-codes": searchQuery.grepCodes,
    "aggregate-paths": searchQuery.aggregatePaths,
    "filter-inactive": searchQuery.filterInactive,
  };
  const response = await fetch(`/search-api/v1/search/group/?${queryString.stringify(query)}`, context, {
    cache: "no-store",
  });
  const subjects = searchQuery.subjects?.split(",") || [];
  const json = await resolveJson(response);
  return json.map((result: IGroupSearchResult) => ({
    ...result,
    resources: result.results.map((contentTypeResult) => {
      const path =
        contentTypeResult.contexts.find((c) => (subjects.length === 1 ? c.rootId === subjects[0] : c.isPrimary))
          ?.path ?? contentTypeResult.paths?.[0];

      const isLearningpath = contentTypeResult.learningResourceType === "learningpath";
      return {
        ...contentTypeResult,
        path: path || (isLearningpath ? `/learningpaths/${contentTypeResult.id}` : `/article/${contentTypeResult.id}`),
        name: contentTypeResult.title.title,
        ingress: contentTypeResult.metaDescription.metaDescription,
        contexts: contentTypeResult.contexts,
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

const queryOnGivenPage = (searchQuery: GQLQuerySearchWithoutPaginationArgs, page: string, context: Context) =>
  fetch(
    `/search-api/v1/search/?${queryString.stringify({
      ...searchQuery,
      page,
      "page-size": "100",
      "context-types": searchQuery.contextTypes,
      "resource-types": searchQuery.resourceTypes,
      "language-filter": searchQuery.languageFilter,
      "context-filters": searchQuery.contextFilters,
    })}`,
    context,
    { cache: "no-store" },
  );

export async function searchWithoutPagination(
  searchQuery: GQLQuerySearchWithoutPaginationArgs,
  context: Context,
): Promise<GQLSearchWithoutPagination> {
  const firstQuery = await queryOnGivenPage(searchQuery, "1", context);
  const firstPageJson = await resolveJson(firstQuery);
  const numberOfPages = Math.ceil(firstPageJson.totalCount / firstPageJson.pageSize);

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
    results: allResultsJson.flatMap((json) =>
      json.results.map((result: IMultiSearchSummary) => transformResult(result)),
    ),
  };
}

const transformResult = (result: IMultiSearchSummary) => ({
  ...result,
  title: result.title.title,
  contexts: fixContext(result.contexts),
  metaDescription: result.metaDescription?.metaDescription,
  metaImage: result.metaImage,
});

const fixContext = (contexts: IApiTaxonomyContext[] | undefined) =>
  contexts?.map((context) => ({
    ...context,
    path: context.path.includes("/resource/") ? `${context.path}/` : context.path,
  }));
