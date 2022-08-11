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
  IPodcastMeta,
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
  ): Promise<IAudioMetaInformation | null> {
    return fetchPodcast(context, id);
  },
  async podcastSearch(
    _: any,
    { pageSize, page, fallback }: QueryToPodcastSearchArgs,
    context: ContextWithLoaders,
  ): Promise<IAudioSummarySearchResult> {
    return fetchPodcastsPage(context, pageSize, page, fallback ?? false);
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
    { pageSize, page, fallback }: QueryToPodcastSeriesSearchArgs,
    context: ContextWithLoaders,
  ): Promise<IAudioSummarySearchResult> {
    return fetchPodcastSeriesPage(context, pageSize, page, fallback ?? false);
  },
};

export const resolvers = {
  PodcastMeta: {
    async image(
      podcastMeta: IPodcastMeta,
      _: any,
      context: ContextWithLoaders,
    ): Promise<GQLImageMetaInformation | null> {
      const id = podcastMeta?.coverPhoto.id;
      if (!id) {
        return null;
      }
      const image = await fetchImage(id, context);

      if (!image) {
        return null;
      }

      return {
        ...image,
        title: image.title.title,
        altText: image.alttext.alttext,
        caption: image.caption.caption,
        tags: image.tags.tags,
      };
    },
  },
};
