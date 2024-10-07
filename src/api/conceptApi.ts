/**
 * Copyright (c) 2020-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import queryString from "query-string";
import { IConceptSearchResult, IConcept, IConceptSummary } from "@ndla/types-backend/concept-api";
import { fetchSubject } from "./taxonomyApi";
import { GQLListingPage, GQLSubject } from "../types/schema";
import { fetch, resolveJson } from "../utils/apiHelpers";

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
): Promise<IConceptSearchResult> {
  const idsString = params.ids?.join(",");
  const query = {
    query: params.query,
    subjects: params.subjects,
    tags: params.tags,
    page: params.page,
    language: params.language,
    fallback: params.fallback,
    ids: idsString,
    "page-size": params.pageSize,
    "exact-match": params.exactMatch,
    "concept-type": params.conceptType,
    sort: "title",
  };
  const response = await fetch(`/concept-api/v1/concepts?${queryString.stringify(query)}`, context);
  const conceptResult: IConceptSearchResult = await resolveJson(response);
  return conceptResult;
}

export async function fetchConcept(id: string | number, context: Context): Promise<IConcept | undefined> {
  const response = await fetch(`/concept-api/v1/concepts/${id}?language=${context.language}&fallback=true`, context);
  try {
    const concept: IConcept = await resolveJson(response);
    return concept;
  } catch (e) {
    return undefined;
  }
}

export async function fetchListingPage(context: Context, querySubjects?: string): Promise<GQLListingPage> {
  const subjectIds: string[] = await resolveJson(await fetch(`/concept-api/v1/concepts/subjects/`, context));
  const subjectResults = await Promise.allSettled(subjectIds.map((id) => fetchSubject(context, id)));
  const subjects = (
    subjectResults.filter((result) => result.status === "fulfilled") as Array<PromiseFulfilledResult<GQLSubject>>
  ).map((res) => res.value);

  const params = queryString.stringify({
    language: context.language,
    subjects: querySubjects,
  });
  const tags = await resolveJson(await fetch(`/concept-api/v1/concepts/tags/?${params}`, context)).catch((error) => {
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
  return !tags.some((tag: string | TagType) => typeof tag !== "string");
};

const getTags = (tags: string[] | TagType[]) => {
  if (isStringArray(tags)) {
    return tags;
  } else if (tags.length > 0) {
    return Array.from(new Set(tags.flatMap((t) => t.tags)));
  }
  return [];
};

export const fetchEmbedConcept = async (id: string, context: Context, draftConcept: boolean): Promise<IConcept> => {
  const endpoint = draftConcept ? "drafts" : "concepts";
  const url = `/concept-api/v1/${endpoint}/${id}?language=${context.language}&fallback=true`;
  const res = await fetch(url, context);
  const resolved: IConcept = await resolveJson(res);
  return resolved;
};

export const fetchEmbedConcepts = async (
  tag: string,
  subjectId: string,
  context: Context,
  draftConcept: boolean,
): Promise<IConceptSummary[]> => {
  const endpoint = draftConcept ? "drafts" : "concepts";
  const params = queryString.stringify({
    tags: tag,
    subjects: subjectId,
    language: context.language,
    "page-size": 1000,
  });
  const url = `/concept-api/v1/${endpoint}/?${params}`;
  const res = await fetch(url, context).then(resolveJson);
  return res.results;
};
