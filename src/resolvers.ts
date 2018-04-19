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
    async resource(_: any, { id }: Id, context: Context): Promise<GQLResource> {
      return fetchResource(id, context);
    },
    async article(_: any, { id }: Id, context: Context): Promise<GQLArticle> {
      return fetchArticle(id, context);
    },
    async subject(_: any, { id }: Id, context: Context): Promise<GQLSubject> {
      const list = await fetchSubjects(context);
      return list.find(subject => subject.id === id);
    },
    async subjects(_: any, __: any, context: Context): Promise<GQLSubject[]> {
      return fetchSubjects(context);
    },
    async topic(_: any, { id }: Id, context: Context): Promise<GQLTopic> {
      const list = await fetchTopics(context);
      return list.find(topic => topic.id === id);
    },
    async topics(_: any, __: any, context: Context): Promise<GQLTopic[]> {
      return fetchTopics(context);
    },
    async filters(_: any, __: any, context: Context): Promise<GQLFilter[]> {
      return fetchFilters(context);
    },
    async resourceTypes(
      _: any,
      __: any,
      context: Context,
    ): Promise<GQLResourceType[]> {
      return fetchResourceTypes(context);
    },
  },
  Topic: {
    async article(
      topic: GQLTopic,
      _: any,
      context: Context,
    ): Promise<GQLArticle> {
      if (topic.contentUri && topic.contentUri.startsWith('urn:article')) {
        return fetchArticle(
          topic.contentUri.replace('urn:article:', ''),
          context,
        );
      }
    },
    async meta(
      topic: GQLTopic,
      _: any,
      context: Context,
    ): Promise<GQLArticleSubset> {
      if (topic.contentUri && topic.contentUri.startsWith('urn:article')) {
        return context.loaders.articlesLoader.load(
          topic.contentUri.replace('urn:article:', ''),
        );
      }
    },
    async coreResources(
      topic: GQLTopic,
      _: any,
      context: Context,
    ): Promise<GQLResource[]> {
      return fetchTopicResources(topic.id, 'urn:relevance:core', context);
    },
    async subtopics(
      topic: GQLTopic,
      _: any,
      context: Context,
    ): Promise<GQLTopic[]> {
      const subjectId = 'urn:' + topic.path.split('/')[1];
      const topics = await context.loaders.subjectTopicsLoader.load(subjectId);
      return topics.filter((t: GQLTopic) => t.parent === topic.id);
    },
    async supplementaryResources(
      topic: GQLTopic,
      _: any,
      context: Context,
    ): Promise<GQLResource[]> {
      return fetchTopicResources(
        topic.id,
        'urn:relevance:supplementary',
        context,
      );
    },
  },
  Subject: {
    async topics(
      subject: GQLSubject,
      args: any,
      context: Context,
    ): Promise<GQLTopic[]> {
      const topics = await context.loaders.subjectTopicsLoader.load(subject.id);
      if (args.all) {
        return topics;
      }
      return topics.filter((topic: GQLTopic) => topic.parent === subject.id);
    },
    async filters(
      subject: GQLSubject,
      __: any,
      context: Context,
    ): Promise<GQLFilter[]> {
      return context.loaders.filterLoader.load(subject.id);
    },
  },
  ResourceTypeDefinition: {
    async subtypes(
      resourceType: GQLResourceTypeDefinition,
    ): Promise<GQLResourceTypeDefinition[]> {
      return resourceType.subtypes;
    },
  },
  Resource: {
    async article(
      resource: GQLResource,
      _: any,
      context: Context,
    ): Promise<GQLArticle> {
      if (
        resource.contentUri &&
        resource.contentUri.startsWith('urn:article')
      ) {
        return fetchArticle(
          resource.contentUri.replace('urn:article:', ''),
          context,
        );
      }
    },
    async resourceTypes(
      resource: GQLResource,
      _: any,
      context: Context,
    ): Promise<GQLResourceType[]> {
      return fetchResourceResourceTypes(resource.id, context);
    },
  },
  // Mutation: {},
};
