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
  fetchTopicFilters,
  fetchResourceResourceTypes,
  fetchTopicResources,
  fetchResourceTypes,
  fetchSubjectPage,
  fetchFrontpage,
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
    async frontpage(_: any, __: any, context: Context): Promise<GQLFrontpage> {
      return fetchFrontpage(context);
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
      args: { all: boolean; filterIds: string },
      context: Context,
    ): Promise<GQLTopic[]> {
      const topics = await context.loaders.subjectTopicsLoader.load({
        subjectId: subject.id,
        filterIds: args.filterIds,
      });
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
    async subjectpage(
      subject: GQLSubject,
      __: any,
      context: Context,
    ): Promise<GQLSubjectPage> {
      const fieldsToMap = ['mostRead', 'editorsChoices', 'latestContent'];

      const subjectPage = await fetchSubjectPage(subject.id.split(':')[2], context);
      const newFields = await Promise.all(fieldsToMap.map(async field => {
        console.log(field)
        console.log("YOYO", subjectPage[field].articleIds, subjectPage[field].location);
        const articles = await context.loaders.resourcesLoader.loadMany(subjectPage[field].articleIds)
        return {[field]: { location: subjectPage[field].location, articles}}
      }));

      console.log("LEL", newFields)
      var obj = newFields.reduce(function(acc, cur, i) {
        acc[i] = cur;
        console.log(acc);
        return {...acc};
      }, {});
      const t =  {...subjectPage, ...obj};
      console.log(t);
      return t;
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
      throw Object.assign(
        new Error(
          'Missing article contentUri for resource with id: ' + resource.id,
        ),
        { status: 404 },
      );
    },
    async resourceTypes(
      resource: GQLResource,
      _: any,
      context: Context,
    ): Promise<GQLResourceType[]> {
      if (resource.resourceTypes) {
        return resource.resourceTypes;
      }
      return fetchResourceResourceTypes(resource.id, context);
    },
  },
  // Mutation: {},
};
