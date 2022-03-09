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
import {
  fetchPodcast,
  fetchPodcastSeries,
  fetchPodcastSeriesPage,
  fetchPodcastsPage,
} from '../api/audioApi';
import { fetchImage } from '../api/imageApi';

export const Query = {
  async podcast(
    _: any,
    { id }: QueryToPodcastArgs,
    context: ContextWithLoaders,
  ): Promise<IAudioMetaInformation> {
    return fetchPodcast(context, id);
  },
  async podcastSearch(
    _: any,
    { pageSize, page }: QueryToPodcastSearchArgs,
    context: ContextWithLoaders,
  ): Promise<IAudioSummarySearchResult> {
    return fetchPodcastsPage(context, pageSize, page);
  },
  async podcastSeries(
    _: any,
    { id }: QueryToPodcastSeriesArgs,
    context: ContextWithLoaders,
  ): Promise<IAudioMetaInformation> {
    return fetchPodcastSeries(context, id);
  },
  async podcastSeriesSearch(
    _: any,
    { pageSize, page }: QueryToPodcastSeriesSearchArgs,
    context: ContextWithLoaders,
  ): Promise<IAudioSummarySearchResult> {
    return fetchPodcastSeriesPage(context, pageSize, page);
  },
};

export const resolvers = {
  PodcastMeta: {
    async image(
      audio: IAudioMetaInformation,
      _: any,
      context: ContextWithLoaders,
    ): Promise<GQLImageMetaInformation> {
      const id = audio.podcastMeta.coverPhoto.id;
      if (!id) {
        return null;
      }
      const image = await fetchImage(id, context);

      if (!image.id) {
        return null;
      }
      return {
        ...image,
        title: image.title.title,
        alttext: image.alttext.alttext,
        caption: image.caption.caption,
        tags: image.tags.tags,
      };
    },
  },
};
