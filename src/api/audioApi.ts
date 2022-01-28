/**
 * Copyright (c) 2021-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { fetch, resolveJson } from '../utils/apiHelpers';

export async function fetchPodcast(
  context: Context,
  podcastId: number,
): Promise<GQLAudio> {
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
): Promise<GQLAudioSearch> {
  const response = await fetch(
    `/audio-api/v1/audio/?page-size=${pageSize}&page=${page}&audio-type=podcast`,
    context,
  );

  const audioSearch: GQLAudioSearch = await resolveJson(response);
  const results = await Promise.all(
    audioSearch.results.map(audio => fetchPodcast(context, audio.id)),
  );

  return {
    ...audioSearch,
    results,
  };
}

export async function fetchPodcastSeries(
  context: Context,
  podcastId: number,
): Promise<GQLPodcastSeries> {
  const response = await fetch(`/audio-api/v1/series/${podcastId}`, context);
  const series: GQLPodcastSeries = await resolveJson(response);

  const episodes = await Promise.all(
    series.episodes.map(audio => fetchPodcast(context, audio.id)),
  );

  return { ...series, episodes };
}

export async function fetchPodcastSeriesPage(
  context: Context,
  pageSize: number,
  page: number,
): Promise<GQLPodcastSeriesSearch> {
  const response = await fetch(
    `/audio-api/v1/series/?page-size=${pageSize}&page=${page}`,
    context,
  );

  const podcastSeriesSearch: GQLPodcastSeriesSearch = await resolveJson(
    response,
  );

  return podcastSeriesSearch;
}
