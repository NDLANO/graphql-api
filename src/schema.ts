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

  interface TaxonomyEntity {
    id: String!
    name: String!
    contentUri: String
    path: String
    paths: [String]
    meta: Meta
    article(filterIds: String, subjectId: String): Article
    filters: [Filter]
  }

  type Resource implements TaxonomyEntity {
    id: String!
    name: String!
    contentUri: String
    path: String
    paths: [String]
    meta: Meta
    article(filterIds: String, subjectId: String): Article
    filters: [Filter]
    resourceTypes: [ResourceType]
    parentTopics: [Topic]
  }

  type Topic implements TaxonomyEntity {
    id: String!
    name: String!
    contentUri: String
    meta: Meta
    article(filterIds: String, subjectId: String): Article
    filters: [Filter]
    path: String
    paths: [String]
    isPrimary: Boolean
    parent: String
    subtopics(filterIds: String): [Topic]
    coreResources(filterIds: String, subjectId: String): [Resource]
    supplementaryResources(filterIds: String, subjectId: String): [Resource]
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
    origin: String
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
    published: String!
    visualElement: String
    metaImage: MetaImage
    metaDescription: String!
    articleType: String!
    oldNdlaUrl: String
    requiredLibraries: [ArticleRequiredLibrary]
    metaData: ArticleMetaData
    supportedLanguages: [String]
    copyright: Copyright!
    competenceGoals: [CompetenceGoal]
  }

  type CompetenceGoal {
    id: String!
    curriculumId: String!
    name: String!
    curriculum: CompetenceCurriculum
  }

  type CompetenceCurriculum {
    id: String!
    name: String!
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

  type Category {
    name: String
    subjects: [Subject]
  }

  type Frontpage {
    topical: [Resource]
    categories: [Category]
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

  type SubjectPageBanner {
    desktopUrl: String
    desktopId: String
    mobileUrl: String
    mobileId: String
  }

  type SubjectPage {
    topical(subjectId: String): TaxonomyEntity
    mostRead(subjectId: String): [TaxonomyEntity]
    banner: SubjectPageBanner
    id: Int!
    name: String
    facebook: String
    editorsChoices(subjectId: String): [TaxonomyEntity]
    latestContent(subjectId: String): [TaxonomyEntity]
    about: SubjectPageAbout
    goTo: [ResourceTypeDefinition]
    metaDescription: String
    layout: String
    twitter: String
  }

  type Subject {
    id: String!
    contentUri: String
    name: String!
    path: String!
    filters: [SubjectFilter]
    frontpageFilters: [SubjectFilter]
    subjectpage: SubjectPage
    topics(all: Boolean, filterIds: String): [Topic]
  }

  type SearchResult {
    id: Int!
    title: String
    supportedLanguages: [String]
    url: String
    metaDescription: String
    metaImage: MetaImage
    contentType: String
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
    pageSize: Int
    page: Int
    language: String
    totalCount: Int
    results: [SearchResult]
  }

  type GroupSearchResult {
    id: Int!
    path: String!
    name: String!
  }

  type GroupSearch {
    language: String
    resourceType: String
    resources: [GroupSearchResult]
    totalCount: Int
  }

  type Query {
    resource(id: String!, subjectId: String): Resource
    article(id: String!, filterIds: String, subjectId: String): Article
    subject(id: String!): Subject
    subjectpage(id: String!): SubjectPage
    subjects: [Subject]
    topic(id: String!, subjectId: String): Topic
    topics: [Topic]
    frontpage: Frontpage
    filters: [SubjectFilter]
    competenceGoals(nodeId: String!): [CompetenceGoal]
    search(
      query: String
      page: String
      pageSize: String
      contextTypes: String
      language: String
      ids: String
      resourceTypes: String
      contextFilters: String
      levels: String
      sort: String
      fallback: Boolean
      subjects: String
      languageFilter: String
      relevance: String
    ): Search
    resourceTypes: [ResourceTypeDefinition]
    groupSearch(
      query: String
      subjects: String
      resourceTypes: String
    ): [GroupSearch]
  }
`;

const schema = makeExecutableSchema({
  typeDefs,
  resolverValidationOptions: { requireResolversForResolveType: false },
});

export default schema;
