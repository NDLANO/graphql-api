/**
 * Copyright (c) 2020-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { ConceptSearchResultDTO, ConceptDTO, openapi } from "@ndla/types-backend/concept-api";
import { getNumberIdOrThrow } from "../utils/apiHelpers";
import { createAuthClient, resolveJsonOATS } from "../utils/openapi-fetch/utils";

const client = createAuthClient<openapi.paths>();

export async function searchConcepts(
  params: {
    ids?: number[];
  },
  _context: Context,
): Promise<ConceptSearchResultDTO> {
  return client
    .GET("/concept-api/v1/concepts", {
      params: {
        query: {
          ids: params.ids,
          sort: "title",
        },
      },
    })
    .then(resolveJsonOATS);
}

export async function fetchConcept(id: string | number, context: Context): Promise<ConceptDTO | undefined> {
  const response = await client.GET("/concept-api/v1/concepts/{concept_id}", {
    params: {
      path: {
        concept_id: getNumberIdOrThrow(id),
      },
      query: {
        language: context.language,
        fallback: true,
      },
    },
  });
  try {
    const concept: ConceptDTO = await resolveJsonOATS(response);
    return concept;
  } catch (e) {
    return undefined;
  }
}

export const fetchEmbedConcept = async (id: string, context: Context, draftConcept: boolean): Promise<ConceptDTO> => {
  const options = {
    params: {
      path: { concept_id: getNumberIdOrThrow(id) },
      query: { language: context.language, fallback: true },
    },
  };

  if (draftConcept) {
    return client.GET("/concept-api/v1/drafts/{concept_id}", options).then(resolveJsonOATS);
  } else {
    return client.GET("/concept-api/v1/concepts/{concept_id}", options).then(resolveJsonOATS);
  }
};
