/**
 * Copyright (c) 2021-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  IAudioMetaInformation,
  IAudioSummarySearchResult,
} from '@ndla/types-audio-api';
import { fetch, resolveJson } from '../utils/apiHelpers';

export async function fetchPodcast(
  context: Context,
  podcastId: number,
): Promise<IAudioMetaInformation | null> {
  const response = await fetch(`/audio-api/v1/audio/${podcastId}`, context);
  try {
    const audio = await resolveJson(response);
    if (audio.audioType !== 'podcast') {
      return null;
    }
    return audio;
  } catch (e) {
    return null;
  }
}

export async function fetchPodcastsPage(
  context: Context,
  pageSize: number,
  page: number,
): Promise<IAudioSummarySearchResult> {
  const response = await fetch(
    `/audio-api/v1/audio/?page-size=${pageSize}&page=${page}&audio-type=podcast`,
    context,
  );
  return await resolveJson(response);
}

export async function fetchPodcastSeries(
  context: Context,
  podcastId: number,
): Promise<IAudioMetaInformation> {
  const response = await fetch(`/audio-api/v1/series/${podcastId}`, context);
  return await resolveJson(response);
}

export async function fetchPodcastSeriesPage(
  context: Context,
  pageSize: number,
  page: number,
): Promise<IAudioSummarySearchResult> {
  const response = await fetch(
    `/audio-api/v1/series/?page-size=${pageSize}&page=${page}`,
    context,
  );
  return await resolveJson(response);
}
