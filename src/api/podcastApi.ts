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
    if (audio.err) {
      return null;
    }
    return {
      ...audio,
      title: audio.title?.title,
      tags: audio.tags?.tags,
    };
  } catch (e) {
    return null;
  }
}

export async function fetchPodcastList(
  page: string,
  pageSize: string,
  context: Context,
) {}
