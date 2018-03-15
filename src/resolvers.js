/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const { books } = require('./connectors');

const resolvers = {
  Query: {
    async books() {
      return books();
    },
  },
  // Mutation: {},
};

module.exports = resolvers;
