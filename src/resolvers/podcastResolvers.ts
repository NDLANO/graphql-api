/**
 * Copyright (c) 2021-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  AudioMetaInformationDTO,
  AudioSummarySearchResultDTO,
  PodcastMetaDTO,
  SeriesDTO,
  SeriesSummarySearchResultDTO,
} from "@ndla/types-backend/audio-api";
import { fetchAudio, fetchPodcastSeries, fetchPodcastSeriesPage, fetchPodcastsPage } from "../api/audioApi";
import { fetchImageV3 } from "../api/imageApi";
import { fetchResourceEmbeds } from "../api/resourceEmbedApi";
import {
  GQLImageMetaInformationV3,
  GQLQueryAudioArgs,
  GQLQueryPodcastSearchArgs,
  GQLQueryPodcastSeriesArgs,
  GQLQueryPodcastSeriesSearchArgs,
  GQLResourceEmbed,
  GQLResourceEmbedInput,
} from "../types/schema";

export const Query = {
  async audio(_: any, { id }: GQLQueryAudioArgs, context: ContextWithLoaders): Promise<AudioMetaInformationDTO | null> {
    return fetchAudio(context, id);
  },
  async podcastSearch(
    _: any,
    { pageSize, page, fallback }: GQLQueryPodcastSearchArgs,
    context: ContextWithLoaders,
  ): Promise<AudioSummarySearchResultDTO> {
    return fetchPodcastsPage(context, pageSize, page, fallback ?? false);
  },
  async podcastSeries(_: any, { id }: GQLQueryPodcastSeriesArgs, context: ContextWithLoaders): Promise<SeriesDTO> {
    return fetchPodcastSeries(context, id);
  },
  async podcastSeriesSearch(
    _: any,
    { pageSize, page, fallback }: GQLQueryPodcastSeriesSearchArgs,
    context: ContextWithLoaders,
  ): Promise<SeriesSummarySearchResultDTO> {
    return fetchPodcastSeriesPage(context, pageSize, page, fallback ?? false);
  },
};

export const resolvers = {
  PodcastSeriesWithEpisodes: {
    async content(series: SeriesDTO, _: any, context: ContextWithLoaders): Promise<GQLResourceEmbed | null> {
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
      podcastSeries: SeriesDTO,
      _: any,
      context: ContextWithLoaders,
    ): Promise<GQLImageMetaInformationV3 | null> {
      const id = podcastSeries?.coverPhoto.id;
      if (!id) {
        return null;
      }
      return await fetchImageV3(id, context).catch(() => null);
    },
  },
  PodcastMeta: {
    async image(
      podcastMeta: PodcastMetaDTO,
      _: any,
      context: ContextWithLoaders,
    ): Promise<GQLImageMetaInformationV3 | null> {
      const id = podcastMeta?.coverPhoto.id;
      if (!id) {
        return null;
      }
      return await fetchImageV3(id, context).catch(() => null);
    },
  },
};
