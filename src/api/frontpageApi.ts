/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { openapi, IFrontPageDTO, IFilmFrontPageDTO, ISubjectPageDTO } from "@ndla/types-backend/frontpage-api";
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

export async function fetchFrontpage(_context: Context): Promise<IFrontPageDTO> {
  return client.GET("/frontpage-api/v1/frontpage").then(resolveJsonOATS);
}

export async function fetchSubjectPage(subjectPageId: number, context: Context): Promise<ISubjectPageDTO> {
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

export async function fetchFilmFrontpage(_context: Context): Promise<IFilmFrontPageDTO> {
  return client.GET("/frontpage-api/v1/filmfrontpage").then(resolveJsonOATS);
}
