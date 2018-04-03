/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const {
  article,
  resource,
  subjects,
  filters,
  topics,
  resourceResourceTypes,
  topicResources,
  resourceTypes,
} = require('./data/api');

const resolvers = {
  Query: {
    async resource(_, { id }, context) {
      return resource(id, context);
    },
    async article(_, { id }, context) {
      return article(id, context);
    },
    async subject(_, { id }, context) {
      const list = await subjects(context);
      return list.find(subject => subject.id === id);
    },
    async subjects(_, __, context) {
      return subjects(context);
    },
    async topic(_, { id }, context) {
      const list = await topics(context);
      return list.find(topic => topic.id === id);
    },
    async topics(_, __, context) {
      return topics(context);
    },
    async filters(_, __, context) {
      return filters(context);
    },
    async resourceTypes(_, __, context) {
      return resourceTypes(context);
    },
  },
  Topic: {
    async article(topic, _, context) {
      if (topic.contentUri && topic.contentUri.startsWith('urn:article')) {
        return article(topic.contentUri.replace('urn:article:', ''), context);
      }
    },
    async meta(topic, _, context) {
      if (topic.contentUri && topic.contentUri.startsWith('urn:article')) {
        return context.loaders.articlesLoader.load(
          topic.contentUri.replace('urn:article:', '')
        );
      }
    },
    async coreResources(topic, _, context) {
      return topicResources(topic.id, 'urn:relevance:core', context);
    },
    async subtopics(topic, _, context) {
      const subjectId = 'urn:' + topic.path.split('/')[1];
      const topics = await context.loaders.subjectTopicsLoader.load(subjectId);
      return topics.filter(t => t.parent === topic.id);
    },
    async supplementaryResources(topic, _, context) {
      return topicResources(topic.id, 'urn:relevance:supplementary', context);
    },
  },
  Subject: {
    async topics(subject, _, context) {
      const topics = await context.loaders.subjectTopicsLoader.load(subject.id);
      return topics.filter(topic => topic.parent === subject.id);
    },
    async filters(subject, __, context) {
      return context.loaders.filterLoader.load(subject.id);
    },
  },
  ResourceTypeDefinition: {
    async subtypes(resourceType) {
      return resourceType.subtypes;
    },
  },
  Resource: {
    async article(resource, _, context) {
      if (
        resource.contentUri &&
        resource.contentUri.startsWith('urn:article')
      ) {
        return article(
          resource.contentUri.replace('urn:article:', ''),
          context
        );
      }
    },
    async resourceTypes(resource, _, context) {
      return resourceResourceTypes(resource.id, context);
    },
  },
  // Mutation: {},
};

module.exports = resolvers;
