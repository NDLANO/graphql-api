/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';

export const typeDefs = `

type ResourceTypeDefinition {
  id: String!
  name: String!
  subtypes: [ResourceTypeDefinition]
}

type ResourceType {
  id: String!
  name: String!
  resources(topicId: String!): [Resource]
}

type Meta {
  id: Int!
  title: String!
  introduction: String
  metaDescription: String
  metaImage: String
  lastUpdated: String
}

type Resource {
  id: String!
  name: String!
  contentUri: String
  path: String
  resourceTypes: [ResourceType]
  meta: Meta
  article: Article,
  filters: [Filter],
  parentTopics: [Topic]
}

type License {
  license: String!
  url: String
  description: String
}

type Contributor {
  type: String!
  name: String!
}

type Copyright {
  license: License
  creators: [Contributor]
  processors: [Contributor]
  rightsholders: [Contributor]
}

type ArticleRequiredLibrary {
  name: String!
  url: String!
  mediaType: String!
}

type FootNote {
  ref: Int!
  title: String!
  year: String!
  authors: [String]!
  edition: String
  publisher: String
  url: String
}

type ImageLicense {
  title: String!
  src: String!
  altText: String!
  copyright: Copyright!
}

type AudioLicense {
  title: String!
  src: String!
  copyright: Copyright!
}

type BrightcoveIframe {
  src: String!
  height: Int!
  width: Int!
}

type BrightcoveLicense {
  title: String!
  cover: String
  src: String
  iframe: BrightcoveIframe
  copyright: Copyright!
}


type ArticleMetaData {
  footnotes: [FootNote]
  images: [ImageLicense]
  audios: [AudioLicense]
  brightcoves: [BrightcoveLicense]
}

type Article {
  id: Int!
  revision: Int!
  title: String!
  introduction: String
  content: String!
  created: String!
  updated: String!
  visualElement: String
  metaImage: String
  metaDescription: String!
  articleType: String!
  oldNdlaUrl: String
  requiredLibraries: [ArticleRequiredLibrary]
  metaData: ArticleMetaData
  supportedLanguages: [String]
  copyright: Copyright!
}

type Filter {
  id: String!
  name: String!
  connectionId: String
  relevanceId: String
}

type Topic {
  id: String!
  contentUri: String
  name: String!
  path: String
  isPrimary: Boolean
  parent: String
  article: Article
  meta: Meta
  subtopics(filterIds: String): [Topic]
  filters: [Filter]
  coreResources(filterIds: String): [Resource]
  supplementaryResources(filterIds: String): [Resource]
}

type FrontpageSubjects {
  name: String
  subjects: [Subject]
}

type Frontpage {
  topical: [Resource]
  categories: [FrontpageSubjects]
}

type SubjectPageArticles {
  resources: [Resource]
}

type SubjectPageTopical {
  resource: Resource
}

type SubjectPageVisualElement {
  type: String
  url: String
  alt: String
}

type SubjectPageAbout {
  title: String
  description: String
  visualElement: SubjectPageVisualElement
}

type SubjectPageGoTo {
  resourceTypes: [ResourceTypeDefinition]
}

type SubjectPageBanner {
  desktopUrl: String
  desktopId: String
  mobileUrl: String
  mobileId: String
}

type SubjectPage {
  topical: SubjectPageTopical
  mostRead: SubjectPageArticles
  banner: SubjectPageBanner
  id: Int!
  name: String
  facebook: String
  editorsChoices: SubjectPageArticles
  latestContent: SubjectPageArticles
  about: SubjectPageAbout
  goTo: SubjectPageGoTo
  displayInTwoColumns: Boolean
  twitter: String
}

type Subject {
  id: String!
  contentUri: String
  name: String!
  path: String!
  filters: [Filter]
  subjectpage: SubjectPage
  topics(all: Boolean filterIds: String): [Topic]
}

type Query {
  resource(id: String!): Resource
  article(id: String!): Article
  subject(id: String!): Subject
  subjects: [Subject]
  topic(id: String!): Topic
  topics: [Topic]
  frontpage: Frontpage
  filters: [Filter]
  resourceTypes: [ResourceTypeDefinition]
}

`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
