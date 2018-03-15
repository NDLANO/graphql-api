/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

const typeDefs = `
type Book { title: String, author: String }
type Query { books: [Book] }
#type Mutation
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = schema;
