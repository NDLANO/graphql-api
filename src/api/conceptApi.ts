/**
 * Copyright (c) 2020-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import queryString from "query-string";
import { IConceptSearchResultDTO, IConceptDTO } from "@ndla/types-backend/concept-api";
import { fetch, resolveJson } from "../utils/apiHelpers";

export async function searchConcepts(
  params: {
    ids?: number[];
  },
  context: Context,
): Promise<IConceptSearchResultDTO> {
  const idsString = params.ids?.join(",");
  const query = {
    ids: idsString,
    sort: "title",
  };
  const response = await fetch(`/concept-api/v1/concepts?${queryString.stringify(query)}`, context);
  const conceptResult: IConceptSearchResultDTO = await resolveJson(response);
  return conceptResult;
}

export async function fetchConcept(id: string | number, context: Context): Promise<IConceptDTO | undefined> {
  const response = await fetch(`/concept-api/v1/concepts/${id}?language=${context.language}&fallback=true`, context);
  try {
    const concept: IConceptDTO = await resolveJson(response);
    return concept;
  } catch (e) {
    return undefined;
  }
}

export const fetchEmbedConcept = async (id: string, context: Context, draftConcept: boolean): Promise<IConceptDTO> => {
  const endpoint = draftConcept ? "drafts" : "concepts";
  const url = `/concept-api/v1/${endpoint}/${id}?language=${context.language}&fallback=true`;
  const res = await fetch(url, context);
  const resolved: IConceptDTO = await resolveJson(res);
  return resolved;
};
