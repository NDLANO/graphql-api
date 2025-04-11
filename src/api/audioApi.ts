/**
 * Copyright (c) 2021-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  IAudioMetaInformationDTO,
  IAudioSummarySearchResultDTO,
  ISeriesDTO,
  openapi,
  SeriesSummarySearchResultDTO,
} from "@ndla/types-backend/audio-api";
import { createAuthClient, resolveJsonOATS } from "../utils/openapi-fetch/utils";

const client = createAuthClient<openapi.paths>();

const getNumberId = (audioId: number | string): number => {
  if (typeof audioId === "string") {
    const numberId = parseInt(audioId);
    if (isNaN(numberId)) {
      throw new Error(`Invalid audioId: ${audioId}`);
    }
    return numberId;
  }
  return audioId;
};

export async function fetchAudio(context: Context, audioId: number | string): Promise<IAudioMetaInformationDTO | null> {
  const response = await client.GET("/audio-api/v1/audio/{audio-id}", {
    params: {
      path: {
        "audio-id": getNumberId(audioId),
      },
      query: {
        language: context.language,
      },
    },
  });
  try {
    return await resolveJsonOATS(response);
  } catch (e) {
    return null;
  }
}

export async function fetchAudioV2(context: Context, audioId: number | string): Promise<IAudioMetaInformationDTO> {
  return client
    .GET("/audio-api/v1/audio/{audio-id}", {
      params: {
        path: {
          "audio-id": getNumberId(audioId),
        },
        query: {
          language: context.language,
        },
      },
    })
    .then(resolveJsonOATS);
}

export async function fetchPodcastsPage(
  context: Context,
  pageSize: number,
  page: number,
  fallback: boolean,
): Promise<IAudioSummarySearchResultDTO> {
  return client
    .GET("/audio-api/v1/audio", {
      params: {
        query: {
          "page-size": pageSize,
          page,
          "audio-type": "podcast",
          language: context.language,
          fallback,
        },
      },
    })
    .then(resolveJsonOATS);
}

export async function fetchPodcastSeries(context: Context, podcastId: number): Promise<ISeriesDTO> {
  return client
    .GET("/audio-api/v1/series/{series-id}", {
      params: {
        path: {
          "series-id": podcastId,
        },
        query: { language: context.language },
      },
    })
    .then(resolveJsonOATS);
}

export async function fetchPodcastSeriesPage(
  context: Context,
  pageSize: number,
  page: number,
  fallback: boolean,
): Promise<SeriesSummarySearchResultDTO> {
  return client
    .GET("/audio-api/v1/series", {
      params: {
        query: {
          "page-size": pageSize,
          page,
          language: context.language,
          fallback,
        },
      },
    })
    .then(resolveJsonOATS);
}
