/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  openapi,
  LearningPathV2DTO,
  LearningStepV2DTO,
  AuthorDTO,
  CopyrightDTO,
} from "@ndla/types-backend/learningpath-api";
import {
  GQLLearningpathSeqNo,
  GQLMutationCopyLearningpathArgs,
  GQLMutationDeleteLearningpathStepArgs,
  GQLMutationNewLearningpathArgs,
  GQLMutationNewLearningpathStepArgs,
  GQLMutationUpdateLearningpathArgs,
  GQLMutationUpdateLearningpathStatusArgs,
  GQLMutationUpdateLearningpathStepArgs,
  GQLMutationUpdateLearningpathStepSeqNoArgs,
} from "../types/schema";
import { getNumberIdOrThrow } from "../utils/apiHelpers";
import { createAuthClient, resolveJsonOATS } from "../utils/openapi-fetch/utils";

const client = createAuthClient<openapi.paths>();
const cachelessClient = createAuthClient<openapi.paths>({ disableCache: true });

export async function fetchLearningpaths(
  learningpathIds: number[],
  context: Context,
): Promise<Array<LearningPathV2DTO | undefined>> {
  const json = await client
    .GET("/learningpath-api/v2/learningpaths/ids", {
      params: {
        query: {
          ids: learningpathIds,
          language: context.language,
          fallback: true,
        },
      },
    })
    .then(resolveJsonOATS);
  // The api does not always return the exact number of results as ids provided.
  // So always map over ids so that dataLoader gets the right amount of results in correct order.
  return learningpathIds.map((id) => {
    const learningpath = json.find((item) => {
      return item.id === id;
    });
    return learningpath;
  });
}

export async function fetchMyLearningpaths(_context: Context): Promise<Array<LearningPathV2DTO>> {
  return cachelessClient.GET("/learningpath-api/v2/learningpaths/mine").then(resolveJsonOATS);
}

export async function fetchMyLearningpath(id: string, context: Context): Promise<LearningPathV2DTO> {
  return cachelessClient
    .GET("/learningpath-api/v2/learningpaths/{learningpath_id}", {
      params: {
        path: {
          learningpath_id: getNumberIdOrThrow(id),
        },
        query: {
          language: context.language,
          fallback: true,
        },
      },
    })
    .then(resolveJsonOATS);
}

export async function fetchLearningpath(id: string, context: Context): Promise<LearningPathV2DTO> {
  return client
    .GET("/learningpath-api/v2/learningpaths/{learningpath_id}", {
      params: {
        path: {
          learningpath_id: getNumberIdOrThrow(id),
        },
        query: {
          language: context.language,
          fallback: true,
        },
      },
    })
    .then(resolveJsonOATS);
}

export async function updateLearningpathStatus(
  { id, status }: GQLMutationUpdateLearningpathStatusArgs,
  _context: Context,
): Promise<LearningPathV2DTO> {
  return client
    .PUT("/learningpath-api/v2/learningpaths/{learningpath_id}/status", {
      params: { path: { learningpath_id: id } },
      body: { status },
    })
    .then(resolveJsonOATS);
}

export async function deleteLearningpath(id: number, _context: Context): Promise<boolean> {
  const { response } = await client.DELETE("/learningpath-api/v2/learningpaths/{learningpath_id}", {
    params: { path: { learningpath_id: id } },
  });
  return response.ok;
}

export async function createLearningpath(
  { params }: GQLMutationNewLearningpathArgs,
  _context: Context,
): Promise<LearningPathV2DTO> {
  return client
    .POST("/learningpath-api/v2/learningpaths", {
      body: {
        ...params,
        copyright: {
          ...params.copyright,
          contributors: params.copyright.contributors as AuthorDTO[],
        },
      },
    })
    .then(resolveJsonOATS);
}

export async function updateLearningpath(
  { learningpathId, params }: GQLMutationUpdateLearningpathArgs,
  _context: Context,
): Promise<LearningPathV2DTO> {
  const copyright = params.copyright
    ? {
        ...params.copyright,
        contributors: params.copyright?.contributors as AuthorDTO[],
      }
    : undefined;
  return client
    .PATCH("/learningpath-api/v2/learningpaths/{learningpath_id}", {
      params: { path: { learningpath_id: learningpathId } },
      body: {
        ...params,
        copyright,
      },
    })
    .then(resolveJsonOATS);
}

export async function createLearningstep(
  { learningpathId, params }: GQLMutationNewLearningpathStepArgs,
  _context: Context,
): Promise<LearningStepV2DTO> {
  return client
    .POST("/learningpath-api/v2/learningpaths/{learningpath_id}/learningsteps", {
      params: { path: { learningpath_id: learningpathId } },
      body: {
        ...params,
        copyright: params.copyright as CopyrightDTO | undefined,
      },
    })
    .then(resolveJsonOATS);
}

export async function updateLearningstep(
  { learningpathId, learningstepId, params }: GQLMutationUpdateLearningpathStepArgs,
  _context: Context,
): Promise<LearningStepV2DTO> {
  return client
    .PATCH("/learningpath-api/v2/learningpaths/{learningpath_id}/learningsteps/{learningstep_id}", {
      params: {
        path: {
          learningpath_id: learningpathId,
          learningstep_id: learningstepId,
        },
      },
      body: {
        ...params,
        copyright: params.copyright as CopyrightDTO | undefined,
      },
    })
    .then(resolveJsonOATS);
}

export async function deleteLearningstep(
  { learningstepId, learningpathId }: GQLMutationDeleteLearningpathStepArgs,
  _context: Context,
): Promise<boolean> {
  const { response } = await client.DELETE(
    "/learningpath-api/v2/learningpaths/{learningpath_id}/learningsteps/{learningstep_id}",
    {
      params: {
        path: {
          learningpath_id: learningpathId,
          learningstep_id: learningstepId,
        },
      },
    },
  );
  return response.ok;
}

export async function copyLearningpath(
  { learningpathId, params }: GQLMutationCopyLearningpathArgs,
  _context: Context,
): Promise<LearningPathV2DTO> {
  const copyright = params.copyright
    ? { ...params.copyright, contributors: params.copyright.contributors as AuthorDTO[] }
    : undefined;
  return client
    .POST("/learningpath-api/v2/learningpaths/{learningpath_id}/copy", {
      body: {
        ...params,
        copyright,
      },
      params: { path: { learningpath_id: learningpathId } },
    })
    .then(resolveJsonOATS);
}

export async function updateLearningpathStepSeqNo(
  { learningpathId, learningpathStepId, seqNo }: GQLMutationUpdateLearningpathStepSeqNoArgs,
  _context: Context,
): Promise<GQLLearningpathSeqNo> {
  return client
    .PUT("/learningpath-api/v2/learningpaths/{learningpath_id}/learningsteps/{learningstep_id}/seqNo", {
      body: { seqNo },
      params: {
        path: {
          learningpath_id: learningpathId,
          learningstep_id: learningpathStepId,
        },
      },
    })
    .then(resolveJsonOATS);
}
