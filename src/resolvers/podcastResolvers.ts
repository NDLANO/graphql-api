/**
 * Copyright (c) 2021-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  fetchPodcast,
  fetchPodcastSeries,
  fetchPodcastSeriesPage,
  fetchPodcastsPage,
} from '../api/audioApi';

export const Query = {
  async podcast(
    _: any,
    { id }: QueryToPodcastArgs,
    context: ContextWithLoaders,
  ): Promise<GQLAudio> {
    return fetchPodcast(context, id);
  },
  async podcastSearch(
    _: any,
    { pageSize, page }: QueryToPodcastSearchArgs,
    context: ContextWithLoaders,
  ): Promise<GQLAudioSearch> {
    return fetchPodcastsPage(context, pageSize, page);
  },
  async podcastSeries(
    _: any,
    { id }: QueryToPodcastSeriesArgs,
    context: ContextWithLoaders,
  ): Promise<GQLPodcastSeries> {
    return fetchPodcastSeries(context, id);
  },
  async podcastSeriesSearch(
    _: any,
    { pageSize, page }: QueryToPodcastSeriesSearchArgs,
    context: ContextWithLoaders,
  ): Promise<GQLPodcastSeriesSearch> {
    return fetchPodcastSeriesPage(context, pageSize, page);
  },
};

export const resolvers = {};
