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
  topics,
  subjectTopics,
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
  },
  Topic: {
    async article(topic, _, context) {
      if (topic.contentUri && topic.contentUri.startsWith('urn:article')) {
        return article(topic.contentUri.replace('urn:article:', ''), context);
      }
    },
    async meta(topic, _, context) {
      if (topic.contentUri && topic.contentUri.startsWith('urn:article')) {
        return article(topic.contentUri.replace('urn:article:', ''), context);
      }
    },
  },
  Subject: {
    async topics(subject, _, context) {
      return subjectTopics(subject.id, context);
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
  },
  // Mutation: {},
};

module.exports = resolvers;
