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

type ResourceType {
  id: String,
  name: String,
}

type Resource {
  id: String!,
  name: String!,
  contentUri: String,
  path: String,
  article: [Article]
  resourceTypes: [ResourceType]
}

type Article {
  title: String!,
  content: String!,
  resourceTypes: [ResourceType]
}

type Query {
  books: [Book]
  resource(id: String!): Resource
}

`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = schema;
