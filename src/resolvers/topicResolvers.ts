/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  fetchArticle,
  fetchTopics,
  fetchTopicFilters,
  fetchTopicResources,
  fetchSubtopics,
} from '../api';

import { findApplicableFilters } from './findApplicableFilters';

interface TopicResponse {
  id: string;
  name: string;
  contentUri?: string;
  path?: string;
}

interface Id {
  id: string;
}

export const Query = {
  async topic(_: any, { id }: Id, context: Context): Promise<GQLTopic> {
    const list = await fetchTopics(context);
    return list.find(topic => topic.id === id);
  },
  async topics(_: any, __: any, context: Context): Promise<GQLTopic[]> {
    return fetchTopics(context);
  },
};

export const resolvers: { Topic: GQLTopicTypeResolver<TopicResponse> } = {
  Topic: {
    async article(
      topic: TopicResponse,
      args: TopicToArticleArgs,
      context: Context,
    ): Promise<GQLArticle> {
      if (topic.contentUri && topic.contentUri.startsWith('urn:article')) {
        const filters = await findApplicableFilters(args, context);
        return fetchArticle(
          topic.contentUri.replace('urn:article:', ''),
          filters,
          context,
        );
      }
      throw Object.assign(
        new Error('Missing article contentUri for topic with id: ' + topic.id),
        { status: 404 },
      );
    },
    async filters(
      topic: TopicResponse,
      _: any,
      context: Context,
    ): Promise<GQLFilter[]> {
      return fetchTopicFilters(topic.id, context);
    },
    async meta(
      topic: TopicResponse,
      _: any,
      context: Context,
    ): Promise<GQLMeta> {
      if (topic.contentUri && topic.contentUri.startsWith('urn:article')) {
        return context.loaders.articlesLoader.load(
          topic.contentUri.replace('urn:article:', ''),
        );
      }
    },
    async coreResources(
      topic: TopicResponse,
      args: TopicToCoreResourcesArgs,
      context: Context,
    ): Promise<GQLResource[]> {
      const filters = await findApplicableFilters(args, context);

      return fetchTopicResources(
        {
          topicId: topic.id,
          relevance: 'urn:relevance:core',
          filters,
        },
        context,
      );
    },
    async supplementaryResources(
      topic: TopicResponse,
      args: TopicToSupplementaryResourcesArgs,
      context: Context,
    ): Promise<GQLResource[]> {
      const filters = await findApplicableFilters(args, context);

      return fetchTopicResources(
        {
          topicId: topic.id,
          relevance: 'urn:relevance:supplementary',
          filters,
        },
        context,
      );
    },
    async subtopics(
      topic: TopicResponse,
      args: TopicToSubtopicsArgs,
      context: Context,
    ): Promise<GQLTopic[]> {
      return fetchSubtopics(
        { id: topic.id, filterIds: args.filterIds },
        context,
      );
    },
  },
};
