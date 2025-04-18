/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import queryString from "query-string";
import {
  IGrepSearchInputDTO,
  IGrepSearchResultsDTO,
  IGroupSearchResultDTO,
  IMultiSearchSummaryDTO,
  INodeHitDTO,
} from "@ndla/types-backend/search-api";
import {
  GQLCompetenceGoal,
  GQLCoreElement,
  GQLElement,
  GQLGroupSearch,
  GQLNodeSearchResult,
  GQLQuerySearchArgs,
  GQLQuerySearchWithoutPaginationArgs,
  GQLReference,
  GQLSearch,
  GQLSearchResultUnion,
  GQLSearchWithoutPagination,
} from "../types/schema";
import { fetch, resolveJson } from "../utils/apiHelpers";

export async function search(searchQuery: GQLQuerySearchArgs, context: Context): Promise<GQLSearch> {
  const query = {
    ...searchQuery,
    "page-size": searchQuery.pageSize,
    "context-types": searchQuery.contextTypes,
    "result-types": searchQuery.resultTypes,
    "node-types": searchQuery.nodeTypes,
    "resource-types": searchQuery.resourceTypes,
    "language-filter": searchQuery.languageFilter,
    "grep-codes": searchQuery.grepCodes,
    "aggregate-paths": searchQuery.aggregatePaths,
    "filter-inactive": searchQuery.filterInactive,
  };
  const response = await fetch(`/search-api/v1/search/?${queryString.stringify(query)}`, context, {
    cache: "no-store",
  });
  const subjects = searchQuery.subjects?.split(",") || [];
  const searchResults = await resolveJson(response);
  return {
    ...searchResults,
    results: searchResults.results.map((result: IMultiSearchSummaryDTO) => transformResult(result, subjects)),
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
  return json.map((searchResult: IGroupSearchResultDTO) => ({
    ...searchResult,
    resources: searchResult.results
      .map((result) => {
        if (result.typename === "NodeHitDTO") return null;
        const searchCtx = result.contexts.find((c) => (subjects.length === 1 ? c.rootId === subjects[0] : c.isPrimary));
        const url = searchCtx?.url ?? result.contexts?.[0]?.url;
        const isLearningpath = result.learningResourceType === "learningpath";
        return {
          ...result,
          url: url || (isLearningpath ? `/learningpaths/${result.id}` : `/article/${result.id}`),
          name: result.title.title,
          title: result.title.title,
          htmlTitle: result.title.htmlTitle,
          ingress: result.metaDescription.metaDescription,
          context: result.context,
          contexts: result.contexts,
        };
      })
      .filter(Boolean),
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
  const subjects = searchQuery.subjects?.split(",") || [];
  return {
    results: allResultsJson.flatMap((json) =>
      json.results.map((result: IMultiSearchSummaryDTO | INodeHitDTO) => transformResult(result, subjects)),
    ),
  };
}

const transformResult = (result: IMultiSearchSummaryDTO | INodeHitDTO, subjects: string[]): GQLSearchResultUnion => {
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

export const grepSearch = async (input: IGrepSearchInputDTO, context: Context): Promise<IGrepSearchResultsDTO> => {
  const response = await fetch(`/search-api/v1/search/grep`, context, {
    method: "POST",
    body: JSON.stringify(input),
  });

  return resolveJson(response);
};

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
