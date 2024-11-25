/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { ILearningPathSummaryV2, ILearningPathV2, ISearchResultV2 } from "@ndla/types-backend/learningpath-api";
import { GQLMutationUpdateStatusLearningpathArgs } from "../types/schema";
import { fetch, resolveJson } from "../utils/apiHelpers";

export async function fetchLearningpaths(
  learningpathIds: string[],
  context: Context,
): Promise<Array<ILearningPathSummaryV2 | undefined>> {
  const response = await fetch(
    `/learningpath-api/v2/learningpaths/?language=${context.language}&fallback=true&ids=${learningpathIds.join(",")}`,
    context,
  );
  const json: ISearchResultV2 = await resolveJson(response);

  // The api does not always return the exact number of results as ids provided.
  // So always map over ids so that dataLoader gets the right amount of results in correct order.
  return learningpathIds.map((id) => {
    const learningpath = json.results.find((item) => {
      return item.id.toString() === id;
    });
    return learningpath;
  });
}

export async function fetchMyLearningpaths(context: Context): Promise<Array<ILearningPathV2>> {
  const response = await fetch(
    `/learningpath-api/v2/learningpaths/mine?language=${context.language}&fallback=true`,
    context,
  );
  return await resolveJson(response);
}

export async function fetchLearningpath(id: string, context: Context): Promise<ILearningPathV2> {
  const response = await fetch(
    `/learningpath-api/v2/learningpaths/${id}?language=${context.language}&fallback=true`,
    context,
  );
  return await resolveJson(response);
}

export async function updateLearningpathStatus(
  { id, status }: GQLMutationUpdateStatusLearningpathArgs,
  context: Context,
): Promise<string[]> {
  const response = await fetch(`/learningpath-api/v2/learningpaths/${id}/status`, context, {
    method: "PUT",
    body: JSON.stringify({ status: status }),
  });
  return await resolveJson(response);
}

export async function deleteLearningpath(id: number, context: Context): Promise<string[]> {
  const response = await fetch(`/learningpath-api/v2/learningpaths/${id}`, context, {
    method: "DELETE",
  });
  return await resolveJson(response);
}
