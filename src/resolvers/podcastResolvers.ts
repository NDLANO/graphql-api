/**
 * Copyright (c) 2021-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  IAudioMetaInformationDTO,
  IAudioSummarySearchResultDTO,
  IPodcastMetaDTO,
  ISeriesDTO,
} from "@ndla/types-backend/audio-api";
import { fetchAudio, fetchPodcastSeries, fetchPodcastSeriesPage, fetchPodcastsPage } from "../api/audioApi";
import { fetchImage } from "../api/imageApi";
import { fetchResourceEmbeds } from "../api/resourceEmbedApi";
import {
  GQLImageMetaInformation,
  GQLQueryAudioArgs,
  GQLQueryPodcastSearchArgs,
  GQLQueryPodcastSeriesArgs,
  GQLQueryPodcastSeriesSearchArgs,
  GQLResourceEmbed,
  GQLResourceEmbedInput,
} from "../types/schema";

export const Query = {
  async audio(
    _: any,
    { id }: GQLQueryAudioArgs,
    context: ContextWithLoaders,
  ): Promise<IAudioMetaInformationDTO | null> {
    return fetchAudio(context, id);
  },
  async podcastSearch(
    _: any,
    { pageSize, page, fallback }: GQLQueryPodcastSearchArgs,
    context: ContextWithLoaders,
  ): Promise<IAudioSummarySearchResultDTO> {
    return fetchPodcastsPage(context, pageSize, page, fallback ?? false);
  },
  async podcastSeries(_: any, { id }: GQLQueryPodcastSeriesArgs, context: ContextWithLoaders): Promise<ISeriesDTO> {
    return fetchPodcastSeries(context, id);
  },
  async podcastSeriesSearch(
    _: any,
    { pageSize, page, fallback }: GQLQueryPodcastSeriesSearchArgs,
    context: ContextWithLoaders,
  ): Promise<IAudioSummarySearchResultDTO> {
    return fetchPodcastSeriesPage(context, pageSize, page, fallback ?? false);
  },
};

export const resolvers = {
  PodcastSeriesWithEpisodes: {
    async content(series: ISeriesDTO, _: any, context: ContextWithLoaders): Promise<GQLResourceEmbed | null> {
      if (!series.episodes?.length) {
        return null;
      }
      const embeds: GQLResourceEmbedInput[] = series.episodes.map((ep) => ({
        id: ep.id.toString(),
        type: "audio",
      }));
      return await fetchResourceEmbeds({ resources: embeds }, context);
    },
    async image(
      podcastSeries: ISeriesDTO,
      _: any,
      context: ContextWithLoaders,
    ): Promise<GQLImageMetaInformation | null> {
      const id = podcastSeries?.coverPhoto.id;
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
  PodcastMeta: {
    async image(
      podcastMeta: IPodcastMetaDTO,
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
