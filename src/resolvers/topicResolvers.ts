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
  fetchTopicResources,
  fetchSubtopics,
  fetchOembed,
  fetchSubject,
  fetchSubjectTopics,
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
    context: ContextWithLoaders,
  ): Promise<GQLTopic> {
    if (subjectId) {
      const topics = await fetchSubjectTopics(subjectId, context);
      return topics.find(topic => topic.id === id);
    }
    return fetchTopic({ id }, context);
  },
  async topics(
    params: any,
    { contentUri, filterVisible }: QueryToTopicsArgs,
    context: ContextWithLoaders,
  ): Promise<GQLTopic[]> {
    const topicList = await fetchTopics({ contentUri }, context);
    if (!filterVisible) return topicList;

    const topicsWithPath = topicList.filter(t => t.path != null);
    // TODO: Replace parent-filtering with changes in taxonomy
    const data = await context.loaders.subjectsLoader.load(params);
    const topicsWithVisibleSubject = topicsWithPath.filter(topic => {
      const subjectId = topic.path.split('/')[1];
      const parentSubject = data.subjects.find(subject =>
        subject.id.includes(subjectId),
      );
      return parentSubject.metadata.visible === true;
    });
    return topicsWithVisibleSubject;
  },
};

export const resolvers: { Topic: GQLTopicTypeResolver<TopicResponse> } = {
  Topic: {
    async availability(
      topic: TopicResponse,
      _: TopicToArticleArgs,
      context: ContextWithLoaders,
    ) {
      const article = await context.loaders.articlesLoader.load(
        getArticleIdFromUrn(topic.contentUri),
      );
      return article.availability;
    },
    async article(
      topic: TopicResponse,
      args: TopicToArticleArgs,
      context: ContextWithLoaders,
    ): Promise<GQLArticle> {
      if (topic.contentUri && topic.contentUri.startsWith('urn:article')) {
        const articleId = getArticleIdFromUrn(topic.contentUri);
        return Promise.resolve(
          fetchArticle(
            {
              articleId,
              subjectId: args.subjectId,
              showVisualElement: args.showVisualElement,
              path: topic.path,
            },
            context,
          ).then(article => {
            const path = topic.path || `/article/${articleId}`;
            return Object.assign({}, article, {
              oembed: fetchOembed(`${ndlaUrl}${path}`, context).then(
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
    async meta(
      topic: TopicResponse,
      _: any,
      context: ContextWithLoaders,
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
      context: ContextWithLoaders,
    ): Promise<GQLResource[]> {
      const topicResources = await fetchTopicResources(
        {
          topic,
          subjectId: args.subjectId,
          relevance: 'urn:relevance:core',
        },
        context,
      );
      return filterMissingArticles(topicResources, context);
    },
    async supplementaryResources(
      topic: TopicResponse,
      args: TopicToSupplementaryResourcesArgs,
      context: ContextWithLoaders,
    ): Promise<GQLResource[]> {
      const topicResources = await fetchTopicResources(
        {
          topic,
          subjectId: args.subjectId,
          relevance: 'urn:relevance:supplementary',
        },
        context,
      );
      return filterMissingArticles(topicResources, context);
    },
    async subtopics(
      topic: TopicResponse,
      _: any,
      context: ContextWithLoaders,
    ): Promise<GQLTopic[]> {
      const subtopics = await fetchSubtopics({ id: topic.id }, context);
      return filterMissingArticles(subtopics, context);
    },
    async pathTopics(
      topic: TopicResponse,
      _: any,
      context: ContextWithLoaders,
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
    async alternateTopics(
      topic: TopicResponse,
      params: any,
      context: ContextWithLoaders,
    ): Promise<GQLTopic[]> {
      const { contentUri, id, path } = topic;
      if (!path) {
        const topicList = await fetchTopics({ contentUri }, context);
        const alternatesWithPath = topicList
          .filter(t => t.id !== id)
          .filter(t => t.path);
        // TODO: Replace parent-filtering with changes in taxonomy
        const data = await context.loaders.subjectsLoader.load(params);
        const topicsWithVisibleSubject = alternatesWithPath.filter(t => {
          const subjectId = t.path.split('/')[1];
          const parentSubject = data.subjects.find(
            subject => subject.id === `urn:${subjectId}`,
          );
          return parentSubject?.metadata.visible === true;
        });
        return topicsWithVisibleSubject;
      }
      return;
    },
    async breadcrumbs(
      topic: TopicResponse,
      __: any,
      context: ContextWithLoaders,
    ): Promise<string[][]> {
      return Promise.all(
        topic.paths?.map(async path => {
          return Promise.all(
            path
              .split('/')
              .slice(1)
              .map(async id => {
                if (id.includes('subject:')) {
                  return (await fetchSubject(context, `urn:${id}`)).name;
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
