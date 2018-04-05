/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  fetchArticle,
  fetchResource,
  fetchSubjects,
  fetchFilters,
  fetchTopics,
  fetchResourceResourceTypes,
  fetchTopicResources,
  fetchResourceTypes,
} from './data/api';

type Id = {
  id: string;
};

export const resolvers = {
  Query: {
    async resource(_: any, { id }: Id, context: Context) {
      return fetchResource(id, context);
    },
    async article(_: any, { id }: Id, context: Context) {
      return fetchArticle(id, context);
    },
    async subject(_: any, { id }: Id, context: Context) {
      const list = await fetchSubjects(context);
      return list.find(subject => subject.id === id);
    },
    async subjects(_: any, __: any, context: Context) {
      return fetchSubjects(context);
    },
    async topic(_: any, { id }: { id: string }, context: Context) {
      const list = await fetchTopics(context);
      return list.find(topic => topic.id === id);
    },
    async topics(_: any, __: any, context: Context) {
      return fetchTopics(context);
    },
    async filters(_: any, __: any, context: Context) {
      return fetchFilters(context);
    },
    async resourceTypes(_: any, __: any, context: Context) {
      return fetchResourceTypes(context);
    },
  },
  Topic: {
    async article(topic, _: any, context: Context) {
      if (topic.contentUri && topic.contentUri.startsWith('urn:article')) {
        return fetchArticle(
          topic.contentUri.replace('urn:article:', ''),
          context
        );
      }
    },
    async meta(topic, _: any, context: Context) {
      if (topic.contentUri && topic.contentUri.startsWith('urn:article')) {
        return context.loaders.articlesLoader.load(
          topic.contentUri.replace('urn:article:', '')
        );
      }
    },
    async coreResources(topic, _: any, context: Context) {
      return fetchTopicResources(topic.id, 'urn:relevance:core', context);
    },
    async subtopics(topic, _: any, context: Context) {
      const subjectId = 'urn:' + topic.path.split('/')[1];
      const topics = await context.loaders.subjectTopicsLoader.load(subjectId);
      return topics.filter(t => t.parent === topic.id);
    },
    async supplementaryResources(topic, _: any, context: Context) {
      return fetchTopicResources(
        topic.id,
        'urn:relevance:supplementary',
        context
      );
    },
  },
  Subject: {
    async topics(subject, _: any, context: Context) {
      const topics = await context.loaders.subjectTopicsLoader.load(subject.id);
      return topics.filter(topic => topic.parent === subject.id);
    },
    async filters(subject, __: any, context: Context) {
      return context.loaders.filterLoader.load(subject.id);
    },
  },
  ResourceTypeDefinition: {
    async subtypes(resourceType) {
      return resourceType.subtypes;
    },
  },
  Resource: {
    async article(resource, _: any, context: Context) {
      if (
        resource.contentUri &&
        resource.contentUri.startsWith('urn:article')
      ) {
        return fetchArticle(
          resource.contentUri.replace('urn:article:', ''),
          context
        );
      }
    },
    async resourceTypes(resource, _: any, context: Context) {
      return fetchResourceResourceTypes(resource.id, context);
    },
  },
  // Mutation: {},
};
