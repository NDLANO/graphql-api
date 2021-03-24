/**
 * Copyright (c) 2021-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { fetch, resolveJson } from '../utils/apiHelpers';

export async function fetchPodcast(
  podcastId: string,
  context: Context,
): Promise<GQLAudio> {
  const response = await fetch(`/audio-api/v1/audio/${podcastId}`, context);
  try {
    const audio = await resolveJson(response);
    console.log(audio);
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
  pageSize: string,
  page: string,
): Promise<GQLAudioSearch> {
  const response = await fetch(
    `/audio-api/v1/audio/?pageSize=${pageSize}&page=${page}&audio-type=podcast`,
    context,
  );

  const audioSearch: GQLAudioSearch = await resolveJson(response);

  const results = await Promise.all(
    audioSearch.results.map(audio => fetchPodcast(audio.id, context)),
  );

  return {
    ...audioSearch,
    results,
  };
}
