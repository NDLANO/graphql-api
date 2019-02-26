/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { fetch, resolveJson } from '../utils/apiHelpers';

export interface RSubjectCategory {
  id: string;
  filters: string[];
}

export interface RCategory {
  name: string;
  subjects: RSubjectCategory[];
}
export interface FrontpageResponse {
  topical: string[];
  categories: RCategory[];
}

export async function fetchFrontpage(
  context: Context,
): Promise<FrontpageResponse> {
  const response = await fetch(`/frontpage-api/v1/frontpage/`, context);

  const frontpage: FrontpageResponse = await resolveJson(response);

  return frontpage;
}

export async function fetchSubjectPage(
  subjectPageId: string,
  context: Context,
): Promise<GQLSubjectPage> {
  const response = await fetch(
    `/frontpage-api/v1/subjectpage/${subjectPageId}?language=${
      context.language
    }`,
    context,
  );
  const subjectPage: GQLSubjectPage = await resolveJson(response);
  return subjectPage;
}
