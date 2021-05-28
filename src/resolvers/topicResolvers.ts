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
  fetchTopic,
  fetchTopicFilters,
  fetchTopicResources,
  fetchSubtopics,
  fetchOembed,
  fetchSubject,
  fetchSubjects,
} from '../api';
import {
  filterMissingArticles,
  getArticleIdFromUrn,
} from '../utils/articleHelpers';
import { ndlaUrl } from '../config';

interface TopicResponse {
  id: string;
  name: string;
  contentUri?: string;
  path: string;
  paths?: string[];
}

export const Query = {
  async topic(
    _: any,
    { id, subjectId }: QueryToTopicArgs,
    context: Context,
  ): Promise<GQLTopic> {
    return fetchTopic({ id, subjectId }, context);
  },
  async topics(
    _: any,
    { contentUri, filterVisible }: QueryToTopicsArgs,
    context: Context,
  ): Promise<GQLTopic[]> {
    const topicList = await fetchTopics({ contentUri }, context);
    if (!filterVisible) return topicList;

    const topicsWithPath = topicList.filter(t => t.path != null);
    const subjectList = await fetchSubjects(context);

    const topicsWithVisibleSubject = topicsWithPath.filter(topic => {
      const subjectId = topic.path.split('/')[1];
      const parentSubject = subjectList.find(subject =>
        subject.id.includes(subjectId),
      );
      return parentSubject.metadata.visible === true;
    });
    return topicsWithVisibleSubject;
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
        const articleId = getArticleIdFromUrn(topic.contentUri);
        return Promise.resolve(
          fetchArticle(
            {
              articleId,
              filterIds: args.filterIds,
              subjectId: args.subjectId,
              path: topic.path,
            },
            context,
          ).then(article => {
            return Object.assign({}, article, {
              oembed: fetchOembed(`${ndlaUrl}${topic.path}`, context).then(
                oembed => oembed.html.split('"')[3],
              ),
            });
          }),
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
      const filters = await fetchTopicFilters(topic.id, context);
      return filters.filter(filter =>
        filter.metadata ? filter.metadata.visible : true,
      );
    },
    async meta(
      topic: TopicResponse,
      _: any,
      context: Context,
    ): Promise<GQLMeta> {
      if (topic.contentUri && topic.contentUri.startsWith('urn:article')) {
        return context.loaders.articlesLoader.load(
          getArticleIdFromUrn(topic.contentUri),
        );
      }
    },
    async coreResources(
      topic: TopicResponse,
      args: TopicToCoreResourcesArgs,
      context: Context,
    ): Promise<GQLResource[]> {
      const topicResources = await fetchTopicResources(
        {
          topic,
          subjectId: args.subjectId,
          relevance: 'urn:relevance:core',
          filters: args.filterIds,
        },
        context,
      );
      return filterMissingArticles(topicResources, context);
    },
    async supplementaryResources(
      topic: TopicResponse,
      args: TopicToSupplementaryResourcesArgs,
      context: Context,
    ): Promise<GQLResource[]> {
      const topicResources = await fetchTopicResources(
        {
          topic,
          subjectId: args.subjectId,
          relevance: 'urn:relevance:supplementary',
          filters: args.filterIds,
        },
        context,
      );
      return filterMissingArticles(topicResources, context);
    },
    async subtopics(
      topic: TopicResponse,
      args: TopicToSubtopicsArgs,
      context: Context,
    ): Promise<GQLTopic[]> {
      const subtopics = await fetchSubtopics(
        { id: topic.id, filterIds: args.filterIds },
        context,
      );
      return filterMissingArticles(subtopics, context);
    },
    async pathTopics(
      topic: TopicResponse,
      args: TopicToSubtopicsArgs,
      context: Context,
    ): Promise<GQLTopic[][]> {
      return Promise.all(
        topic.paths?.map(async path => {
          const topicsToFetch = path
            .split('/')
            .filter(pathElement => pathElement.includes('topic:'));
          return Promise.all(
            topicsToFetch.map(async id =>
              fetchTopic({ id: `urn:${id}` }, context),
            ),
          );
        }),
      );
    },
    async breadcrumbs(
      topic: TopicResponse,
      __: any,
      context: Context,
    ): Promise<string[][]> {
      return Promise.all(
        topic.paths?.map(async path => {
          return Promise.all(
            path
              .split('/')
              .slice(1)
              .map(async id => {
                if (id.includes('subject:')) {
                  return (await fetchSubject(`urn:${id}`, context)).name;
                } else if (id.includes('topic:')) {
                  return (await fetchTopic({ id: `urn:${id}` }, context)).name;
                }
              }),
          );
        }),
      );
    },
  },
};
