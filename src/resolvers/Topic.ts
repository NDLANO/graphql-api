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
} from '../data/api';

import { findApplicableFilters } from './findApplicableFilters';

interface Id {
  id: string;
}

const Query = {
  async topic(_: any, { id }: Id, context: Context): Promise<GQLTopic> {
    const list = await fetchTopics(context);
    return list.find(topic => topic.id === id);
  },
  async topics(_: any, __: any, context: Context): Promise<GQLTopic[]> {
    return fetchTopics(context);
  },
};

const Topic = {
  async article(
    topic: GQLTopic,
    args: { filterIds?: string; subjectId?: string },
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
    topic: GQLTopic,
    _: any,
    context: Context,
  ): Promise<GQLFilter[]> {
    return fetchTopicFilters(topic.id, context);
  },
  async meta(topic: GQLTopic, _: any, context: Context): Promise<GQLMeta> {
    if (topic.contentUri && topic.contentUri.startsWith('urn:article')) {
      return context.loaders.articlesLoader.load(
        topic.contentUri.replace('urn:article:', ''),
      );
    }
  },
  async coreResources(
    topic: GQLTopic,
    args: { filterIds?: string; subjectId?: string },
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
    topic: GQLTopic,
    args: { filterIds?: string; subjectId?: string },
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
    topic: GQLTopic,
    args: { filterIds: string },
    context: Context,
  ): Promise<GQLTopic[]> {
    const subjectId = 'urn:' + topic.path.split('/')[1];
    const topics = await context.loaders.subjectTopicsLoader.load({
      subjectId,
      filterIds: args.filterIds,
    });
    return topics.filter((t: GQLTopic) => t.parent === topic.id);
  },
};

export { Query, Topic };
