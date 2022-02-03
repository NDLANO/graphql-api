/**
 * Copyright (c) 2021-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  IAudioMetaInformation,
  IAudioSummary,
  IAudioSummarySearchResult,
} from '@ndla/types-audio-api';
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
    context: Context,
  ): Promise<IAudioMetaInformation> {
    return fetchPodcast(context, id);
  },
  async podcastSearch(
    _: any,
    { pageSize, page }: QueryToPodcastSearchArgs,
    context: Context,
  ): Promise<IAudioSummarySearchResult> {
    return fetchPodcastsPage(context, pageSize, page);
  },
  async podcastSeries(
    _: any,
    { id }: QueryToPodcastSeriesArgs,
    context: Context,
  ): Promise<IAudioMetaInformation> {
    return fetchPodcastSeries(context, id);
  },
  async podcastSeriesSearch(
    _: any,
    { pageSize, page }: QueryToPodcastSeriesSearchArgs,
    context: Context,
  ): Promise<IAudioSummarySearchResult> {
    return fetchPodcastSeriesPage(context, pageSize, page);
  },
};

export const resolvers = {
  AudioSearch: {
    async results(
      searchResult: IAudioSummarySearchResult,
      _: any,
      context: Context,
    ) {
      return await Promise.all(
        searchResult.results.map(audio => fetchPodcast(context, audio.id)),
      );
    },
  },
};
