/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  openapi,
  GrepSearchInputDTO,
  GrepSearchResultsDTO,
  MultiSearchSummaryDTO,
  NodeHitDTO,
  MultiSearchResultDTO,
} from "@ndla/types-backend/search-api";
import {
  GQLCompetenceGoal,
  GQLCoreElement,
  GQLElement,
  GQLNodeSearchResult,
  GQLQuerySearchArgs,
  GQLQuerySearchWithoutPaginationArgs,
  GQLReference,
  GQLSearch,
  GQLSearchResultUnion,
  GQLSearchWithoutPagination,
} from "../types/schema";
import { createAuthClient, resolveJsonOATS } from "../utils/openapi-fetch/utils";

const client = createAuthClient<openapi.paths>();

function commaSeparatedStringToArray(input: string | string[] | undefined): string[] | undefined {
  if (!input) return;
  if (Array.isArray(input)) return input;
  return input.split(",").map((s) => s.trim());
}

type SearchQueryParams = openapi.operations["getSearch-apiV1Search"]["parameters"]["query"];

const convertQuery = (searchQuery: GQLQuerySearchArgs): SearchQueryParams => {
  return {
    ...searchQuery,
    "page-size": searchQuery.pageSize,
    "context-types": commaSeparatedStringToArray(searchQuery.contextTypes),
    "result-types": commaSeparatedStringToArray(searchQuery.resultTypes),
    "node-types": commaSeparatedStringToArray(searchQuery.nodeTypes),
    "resource-types": commaSeparatedStringToArray(searchQuery.resourceTypes),
    "language-filter": commaSeparatedStringToArray(searchQuery.languageFilter),
    "grep-codes": commaSeparatedStringToArray(searchQuery.grepCodes),
    "aggregate-paths": commaSeparatedStringToArray(searchQuery.aggregatePaths),
    "filter-inactive": searchQuery.filterInactive,
    fallback: searchQuery.fallback === "true",
    subjects: commaSeparatedStringToArray(searchQuery.subjects),
    relevance: commaSeparatedStringToArray(searchQuery.relevance),
  };
};

export async function search(searchQuery: GQLQuerySearchArgs, _context: Context): Promise<GQLSearch> {
  const query = convertQuery(searchQuery);
  const response = await client.GET("/search-api/v1/search", {
    headers: {
      "cache-control": "no-store",
    },
    params: { query },
  });

  const subjects = commaSeparatedStringToArray(searchQuery.subjects) || [];
  const searchResults = await resolveJsonOATS(response);
  return {
    ...searchResults,
    results: searchResults.results.map((result) => transformResult(result, subjects)),
  };
}

async function queryOnGivenPage(
  searchQuery: GQLQuerySearchWithoutPaginationArgs,
  page: number,
  _context: Context,
): Promise<MultiSearchResultDTO> {
  const query = convertQuery(searchQuery);
  return client
    .GET("/search-api/v1/search", {
      headers: {
        "cache-control": "no-store",
      },
      params: {
        query: {
          ...query,
          "page-size": 100,
          page,
        },
      },
    })
    .then(resolveJsonOATS);
}

export async function searchWithoutPagination(
  searchQuery: GQLQuerySearchWithoutPaginationArgs,
  context: Context,
): Promise<GQLSearchWithoutPagination> {
  const firstPageJson = await queryOnGivenPage(searchQuery, 1, context);
  const numberOfPages = Math.ceil(firstPageJson.totalCount / firstPageJson.pageSize);

  const requests = [];
  if (numberOfPages > 1) {
    for (let i = 2; i <= numberOfPages; i += 1) {
      requests.push(queryOnGivenPage(searchQuery, i, context));
    }
  }
  const allResultsJson = await Promise.all(requests);
  allResultsJson.push(firstPageJson);
  const subjects = searchQuery.subjects?.split(",") || [];
  return {
    results: allResultsJson.flatMap((json) =>
      json.results.map((result: MultiSearchSummaryDTO | NodeHitDTO) => transformResult(result, subjects)),
    ),
  };
}

const transformResult = (result: MultiSearchSummaryDTO | NodeHitDTO, subjects: string[]): GQLSearchResultUnion => {
  if (result.typename === "NodeHitDTO") {
    const ret: GQLNodeSearchResult = {
      __typename: "NodeSearchResult",
      htmlTitle: result.title,
      title: result.title,
      supportedLanguages: [],
      metaDescription: result.subjectPage?.metaDescription.metaDescription ?? "",
      id: result.id,
      url: result.url ?? "",
      context: result.context,
      contexts: [],
    };
    return ret;
  }
  const searchCtx = result.contexts.find((c) => (subjects.length === 1 ? c.rootId === subjects[0] : c.isPrimary));
  const url = searchCtx?.url ?? result.contexts?.[0]?.url;
  const isLearningpath = result.learningResourceType === "learningpath";
  return {
    ...result,
    id: result.id.toString(),
    __typename: isLearningpath ? "LearningpathSearchResult" : "ArticleSearchResult",
    url: url || (isLearningpath ? `/learningpaths/${result.id}` : `/article/${result.id}`),
    title: result.title.title,
    htmlTitle: result.title.htmlTitle,
    metaDescription: result.metaDescription?.metaDescription,
    context: searchCtx ? { ...searchCtx } : undefined,
  };
};

export const grepSearch = async (input: GrepSearchInputDTO, _context: Context): Promise<GrepSearchResultsDTO> =>
  client.POST("/search-api/v1/search/grep", { body: input }).then(resolveJsonOATS);

export const competenceGoals = async (
  codes: string[],
  language: string | undefined,
  context: Context,
): Promise<GQLCompetenceGoal[]> => {
  const references = await grepSearch({ language, codes, pageSize: codes.length }, context);
  const competenceGoals = references.results.filter((r) => {
    return r.typename === "GrepKompetansemaalDTO";
  });

  return competenceGoals.map((reference) => {
    const crossSubjectTopicsCodes: GQLElement[] = reference.tverrfagligeTemaer.map((t) => {
      return {
        reference: {
          id: t.code,
          code: t.code,
          title: t.title.title,
        },
      };
    });

    const competenceGoalSet: GQLReference | undefined = {
      id: reference.kompetansemaalSett.code,
      code: reference.kompetansemaalSett.code,
      title: reference.kompetansemaalSett.title,
    };

    const goal: GQLCompetenceGoal = {
      ...reference,
      id: reference.code,
      title: reference.title.title,
      type: "LK20",
      curriculumCode: reference.laereplan.code,
      curriculum: {
        id: reference.laereplan.code,
        code: reference.laereplan.code,
        title: reference.laereplan.title,
      },
      competenceGoalSetCode: reference.kompetansemaalSett.code,
      crossSubjectTopicsCodes,
      competenceGoalSet,
    };

    return goal;
  });
};

export const coreElements = async (
  codes: string[],
  language: string | undefined,
  context: Context,
): Promise<GQLCoreElement[]> => {
  if (!codes.length) return [];
  const coreElementCodes = codes.filter((c) => c.startsWith("KE"));
  if (!coreElementCodes.length) return [];

  const fetched = await grepSearch({ codes: coreElementCodes, language, pageSize: 100 }, context);
  const coreElements = fetched.results.filter((r) => {
    return r.typename === "GrepKjerneelementDTO";
  });
  return coreElements.map((reference) => {
    return {
      id: reference.code,
      title: reference.title.title,
      description: reference.description.description,
      curriculumCode: reference.laereplan.code,
      curriculum: {
        code: reference.laereplan.code,
        id: reference.laereplan.code,
        title: reference.laereplan.title,
      },
    };
  });
};

export const fetchCompetenceGoalSetCodes = async (code: string, context: Context): Promise<string[]> => {
  const fetched = await grepSearch({ codes: [code], pageSize: 100 }, context);
  const filtered = fetched.results.filter((result) => result.typename === "GrepKompetansemaalSettDTO");
  return filtered.flatMap((result) => result.kompetansemaal.map((k) => k.code));
};

export const fetchCrossSubjectTopicsByCode = async (
  inputCodes: string[],
  language: string | undefined,
  context: Context,
): Promise<GQLReference[]> => {
  const codes = inputCodes.filter((code) => code.startsWith("TT"));
  const fetched = await grepSearch({ codes, language, pageSize: 100 }, context);
  return fetched.results
    .filter((result) => result.typename === "GrepTverrfagligTemaDTO")
    .map((result) => {
      return {
        ...result,
        id: result.code,
        title: result.title.title,
      };
    });
};
