/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const { books, article, resource } = require('./connectors');

const resolvers = {
  Query: {
    async books() {
      return books();
    },
    async resource(_, { id }, context) {
      return resource(id, context);
    },
    async article(_, { id }, context) {
      return article(id, context);
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
