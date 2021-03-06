/**
 * Copyright (c) 2021-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { fetchPodcast, fetchPodcastsPage } from '../api/audioApi';

export const Query = {
  async podcast(
    _: any,
    { id }: QueryToPodcastArgs,
    context: Context,
  ): Promise<GQLAudio> {
    return fetchPodcast(id, context);
  },
  async podcastSearch(
    _: any,
    { pageSize, page }: QueryToPodcastSearchArgs,
    context: Context,
  ): Promise<GQLAudioSearch> {
    return fetchPodcastsPage(context, pageSize, page);
  },
};

export const resolvers = {};
