/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { IFrontPage, IFilmFrontPageData, ISubjectPageData } from "@ndla/types-backend/frontpage-api";
import { fetch, resolveJson } from "../utils/apiHelpers";

export interface IMovieMeta {
  title: string;
  metaDescription?: string;
  metaImage?: {
    url: string;
    alt: string;
    language: string;
  };
}

export async function fetchFrontpage(context: Context): Promise<IFrontPage> {
  const response = await fetch(`/frontpage-api/v1/frontpage`, context);
  return await resolveJson(response);
}

export async function fetchSubjectPage(subjectPageId: number, context: Context): Promise<ISubjectPageData> {
  const response = await fetch(
    `/frontpage-api/v1/subjectpage/${subjectPageId}?language=${context.language}&fallback=true`,
    context,
  );
  return await resolveJson(response);
}

export async function fetchFilmFrontpage(context: Context): Promise<IFilmFrontPageData> {
  const response = await fetch(`/frontpage-api/v1/filmfrontpage`, context);
  return await resolveJson(response);
}
