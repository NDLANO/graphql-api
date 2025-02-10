/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { ILearningPathV2DTO, ILearningStepV2DTO } from "@ndla/types-backend/learningpath-api";
import {
  GQLMutationDeleteLearningpathStepArgs,
  GQLMutationNewLearningpathArgs,
  GQLMutationNewLearningpathStepArgs,
  GQLMutationUpdateLearningpathArgs,
  GQLMutationUpdateLearningpathStatusArgs,
  GQLMutationUpdateLearningpathStepArgs,
} from "../types/schema";
import { fetch, resolveJson } from "../utils/apiHelpers";

export async function fetchLearningpaths(
  learningpathIds: string[],
  context: Context,
): Promise<Array<ILearningPathV2DTO | undefined>> {
  const response = await fetch(
    `/learningpath-api/v2/learningpaths/ids?language=${context.language}&ids=${learningpathIds.join(",")}`,
    context,
  );
  const json: ILearningPathV2DTO[] = await resolveJson(response);
  // The api does not always return the exact number of results as ids provided.
  // So always map over ids so that dataLoader gets the right amount of results in correct order.
  return learningpathIds.map((id) => {
    const learningpath = json.find((item) => {
      return item.id.toString() === id;
    });
    return learningpath;
  });
}

export async function fetchMyLearningpaths(context: Context): Promise<Array<ILearningPathV2DTO>> {
  const response = await fetch(
    `/learningpath-api/v2/learningpaths/mine?language=${context.language}&fallback=true`,
    context,
  );
  return await resolveJson(response);
}

export async function fetchLearningpath(id: string, context: Context): Promise<ILearningPathV2DTO> {
  const response = await fetch(
    `/learningpath-api/v2/learningpaths/${id}?language=${context.language}&fallback=true`,
    context,
  );
  return await resolveJson(response);
}

export async function updateLearningpathStatus(
  { id, status }: GQLMutationUpdateLearningpathStatusArgs,
  context: Context,
): Promise<ILearningPathV2DTO> {
  const response = await fetch(`/learningpath-api/v2/learningpaths/${id}/status`, context, {
    method: "PUT",
    body: JSON.stringify({ status: status }),
  });
  return await resolveJson(response);
}

export async function deleteLearningpath(id: number, context: Context): Promise<boolean> {
  const response = await fetch(`/learningpath-api/v2/learningpaths/${id}`, context, {
    method: "DELETE",
  });
  return response.ok;
}

export async function createLearningpath(
  { params }: GQLMutationNewLearningpathArgs,
  context: Context,
): Promise<ILearningPathV2DTO> {
  const response = await fetch("/learningpath-api/v2/learningpaths", context, {
    method: "POST",
    body: JSON.stringify(params),
  });
  return await resolveJson(response);
}

export async function updateLearningpath(
  { learningpathId, params }: GQLMutationUpdateLearningpathArgs,
  context: Context,
): Promise<ILearningPathV2DTO> {
  const response = await fetch(`/learningpath-api/v2/learningpaths/${learningpathId}`, context, {
    method: "PATCH",
    body: JSON.stringify(params),
  });
  return await resolveJson(response);
}

export async function createLearningstep(
  { learningpathId, params }: GQLMutationNewLearningpathStepArgs,
  context: Context,
): Promise<ILearningStepV2DTO> {
  const response = await fetch(`/learningpath-api/v2/learningpaths/${learningpathId}/learningsteps`, context, {
    method: "POST",
    body: JSON.stringify(params),
  });
  return await resolveJson(response);
}

export async function updateLearningstep(
  { learningpathId, learningstepId, params }: GQLMutationUpdateLearningpathStepArgs,
  context: Context,
): Promise<ILearningStepV2DTO> {
  const response = await fetch(
    `/learningpath-api/v2/learningpaths/${learningpathId}/learningsteps/${learningstepId}`,
    context,
    {
      method: "PATCH",
      body: JSON.stringify(params),
    },
  );
  return await resolveJson(response);
}

export async function deleteLearningstep(
  { learningstepId, learningpathId }: GQLMutationDeleteLearningpathStepArgs,
  context: Context,
): Promise<string[]> {
  const response = await fetch(
    `/learningpath-api/v2/learningpaths/${learningpathId}/learningsteps/${learningstepId}`,
    context,
    {
      method: "DELETE",
    },
  );
  return await resolveJson(response);
}
