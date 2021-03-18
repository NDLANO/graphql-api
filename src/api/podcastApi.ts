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
  const response = await fetch(`/audio-api/v1/audio/${podcastId}`, context, {
    cache: 'no-store',
  });

  const audio = await resolveJson(response);
  console.log(audio);
  if (audio) {
    return {
      ...audio,
      title: audio.title?.title,
      tags: audio.tags?.tags,
    };
  }
}

export async function fetchPodcastList(
  page: string,
  pageSize: string,
  context: Context,
) {}
