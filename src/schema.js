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

type ResourceTypeDefinition {
  id: String!
  name: String!
  subtypes: [ResourceTypeDefinition]
}

type ResourceType {
  id: String!
  name: String!
}

type Resource {
  id: String!
  name: String!
  contentUri: String
  path: String!
  article: Article
  resourceTypes: [ResourceType]
}

type Article {
  id: Int!
  title: String!
  content: String!
  introduction: String!
  metaDescription: String!
}

type ArticleSubset {
  id: Int!
  title: String!
  introduction: String
  metaDescription: String
}

type Description {
  value: String!
}

type Filter {
  id: String!
  name: String!
  subjectId: String!
}

type Topic {
  id: String!
  contentUri: String
  name: String!
  path: String!
  article: Article
  meta: ArticleSubset
  coreResources: [Resource]
  supplementaryResources: [Resource]
}

type Subject {
  id: String!
  contentUri: String
  name: String!
  path: String!
  filters: [Filter]
  topics: [Topic]
}


type Query {
  resource(id: String!): Resource
  article(id: String!): Article
  subject(id: String!): Subject
  subjects: [Subject]
  topic(id: String!): Topic
  topics: [Topic]
  filters: [Filter]
  resourceTypes: [ResourceTypeDefinition]
}

`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = schema;
