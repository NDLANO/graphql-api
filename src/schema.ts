/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { gql } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

export const typeDefs = gql`
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

  type MetaImage {
    url: String
    alt: String
  }

  type Meta {
    id: Int!
    title: String!
    introduction: String
    metaDescription: String
    metaImage: MetaImage
    lastUpdated: String
  }

  type Resource {
    id: String!
    name: String!
    contentUri: String
    path: String
    resourceTypes: [ResourceType]
    meta: Meta
    article: Article
    filters: [Filter]
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
    metaImage: MetaImage
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

  type SubjectFilter {
    id: String!
    name: String!
    subjectId: String!
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
    filters: [SubjectFilter]
    subjectpage: SubjectPage
    topics(all: Boolean, filterIds: String): [Topic]
  }

  type SearchResult {
    id: String!
    title: String
    supportedLanguages: [String]
    url: String
    metaDescription: String
    metaImage: MetaImage
    contexts: [SearchContext]
  }

  type SearchContext {
    breadcrumbs: [String]
    learningResourceType: String
    resourceTypes: [SearchContextResourceTypes]
    subject: String
    path: String
    id: String
    language: String
    filters: [SearchContextFilter]
  }

  type SearchContextResourceTypes {
    id: String
    name: String
    language: String
  }

  type SearchContextFilter {
    name: String
    relevance: String
  }

  type Search {
    pageSize: String
    page: String
    language: String
    totalCount: String
    results: [SearchResult]
  }

  type Query {
    resource(id: String!): Resource
    article(id: String!): Article
    subject(id: String!): Subject
    subjects: [Subject]
    topic(id: String!): Topic
    topics: [Topic]
    frontpage: Frontpage
    filters: [SubjectFilter]
    search(
      query: String
      page: String
      pageSize: String
      contextTypes: String
      language: String
      ids: String
      resourceTypes: String
      levels: String
      sort: String
      fallback: Boolean
      subjects: String
      languageFilter: [String]
    ): Search
    resourceTypes: [ResourceTypeDefinition]
  }
`;

const schema = makeExecutableSchema({ typeDefs });

export default schema;
