/**
 * Copyright (c) 2021-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { IAudioMetaInformationDTO, IAudioSummarySearchResultDTO, ISeriesDTO } from "@ndla/types-backend/audio-api";
import { fetch, resolveJson } from "../utils/apiHelpers";

export async function fetchAudio(context: Context, audioId: number | string): Promise<IAudioMetaInformationDTO | null> {
  const response = await fetch(`/audio-api/v1/audio/${audioId}?language=${context.language}`, context);
  try {
    return await resolveJson(response);
  } catch (e) {
    return null;
  }
}

export async function fetchAudioV2(context: Context, audioId: number | string): Promise<IAudioMetaInformationDTO> {
  const response = await fetch(`/audio-api/v1/audio/${audioId}?language=${context.language}`, context);
  return await resolveJson(response);
}

export async function fetchPodcastsPage(
  context: Context,
  pageSize: number,
  page: number,
  fallback: boolean,
): Promise<IAudioSummarySearchResultDTO> {
  const response = await fetch(
    `/audio-api/v1/audio/?page-size=${pageSize}&page=${page}&audio-type=podcast&language=${context.language}&fallback=${fallback}`,
    context,
  );
  return await resolveJson(response);
}

export async function fetchPodcastSeries(context: Context, podcastId: number): Promise<ISeriesDTO> {
  const response = await fetch(`/audio-api/v1/series/${podcastId}?language=${context.language}`, context);
  return await resolveJson(response);
}

export async function fetchPodcastSeriesPage(
  context: Context,
  pageSize: number,
  page: number,
  fallback: boolean,
): Promise<IAudioSummarySearchResultDTO> {
  const response = await fetch(
    `/audio-api/v1/series/?page-size=${pageSize}&page=${page}&language=${context.language}&fallback=${fallback}`,
    context,
  );
  return await resolveJson(response);
}
