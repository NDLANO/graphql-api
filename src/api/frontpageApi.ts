/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { openapi, FrontPageDTO, FilmFrontPageDTO, SubjectPageDTO } from "@ndla/types-backend/frontpage-api";
import { createAuthClient, resolveJsonOATS } from "../utils/openapi-fetch/utils";

const client = createAuthClient<openapi.paths>();

export interface IMovieMeta {
  title: string;
  metaDescription?: string;
  metaImage?: {
    url: string;
    alt: string;
    language: string;
  };
}

export async function fetchFrontpage(_context: Context): Promise<FrontPageDTO> {
  return client.GET("/frontpage-api/v1/frontpage").then(resolveJsonOATS);
}

export async function fetchSubjectPage(subjectPageId: number, context: Context): Promise<SubjectPageDTO> {
  return client
    .GET("/frontpage-api/v1/subjectpage/{subjectpage-id}", {
      params: {
        path: {
          "subjectpage-id": subjectPageId,
        },
        query: {
          language: context.language,
          fallback: true,
        },
      },
    })
    .then(resolveJsonOATS);
}

export async function fetchSubjectPages(ids: readonly number[], context: Context): Promise<SubjectPageDTO[]> {
  return client
    .GET("/frontpage-api/v1/subjectpage/ids", {
      params: {
        query: {
          ids: ids.slice(),
          language: context.language,
          fallback: true,
        },
      },
    })
    .then(resolveJsonOATS);
}

export async function fetchFilmFrontpage(_context: Context): Promise<FilmFrontPageDTO> {
  return client.GET("/frontpage-api/v1/filmfrontpage").then(resolveJsonOATS);
}
