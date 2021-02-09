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

  type LearningpathStepEmbedUrl {
    url: String
    embedType: String
  }

  type LearningpathStepOembed {
    type: String!
    version: String!
    height: Int!
    html: String!
    width: Int!
  }

  type LearningpathStep {
    id: Int!
    title: String!
    seqNo: Int!
    description: String
    embedUrl: LearningpathStepEmbedUrl
    license: License
    metaUrl: String
    revision: Int
    status: String
    supportedLanguages: [String]
    type: String
    article: Article
    resource: Resource
    showTitle: Boolean
    oembed: LearningpathStepOembed
  }

  type LearningpathCoverphoto {
    url: String
    metaUrl: String
  }

  type LearningpathCopyright {
    license: License
    contributors: [Contributor]
  }

  type Learningpath {
    id: Int!
    title: String!
    description: String
    copyright: LearningpathCopyright
    duration: Int
    canEdit: Boolean
    verificationStatus: String
    lastUpdated: String
    tags: [String]
    supportedLanguages: [String]
    isBasedOn: Int
    learningsteps: [LearningpathStep]
    metaUrl: String
    revision: Int
    learningstepUrl: String
    status: String
    coverphoto: LearningpathCoverphoto
  }

  type TaxonomyMetadata {
    grepCodes: [String]
    visible: Boolean
  }

  interface TaxonomyEntity {
    id: String!
    name: String!
    contentUri: String
    path: String
    paths: [String]
    meta: Meta
    metadata: TaxonomyMetadata
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
    metadata: TaxonomyMetadata
    article(
      filterIds: String
      subjectId: String
      removeRelatedContent: String
    ): Article
    learningpath: Learningpath
    filters: [Filter]
    resourceTypes: [ResourceType]
    parentTopics: [Topic]
  }

  type Topic implements TaxonomyEntity {
    id: String!
    name: String!
    contentUri: String
    meta: Meta
    metadata: TaxonomyMetadata
    article(filterIds: String, subjectId: String): Article
    filters: [Filter]
    path: String
    paths: [String]
    isPrimary: Boolean
    parent: String
    subtopics(filterIds: String): [Topic]
    pathTopics: [[Topic]]
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
    description: String
    cover: String
    src: String
    download: String
    iframe: BrightcoveIframe
    copyright: Copyright!
    uploadDate: String
  }

  type H5pLicense {
    title: String!
    src: String
    copyright: Copyright!
  }

  type ConceptLicense {
    title: String!
    src: String
    copyright: Copyright
  }

  type ArticleMetaData {
    footnotes: [FootNote]
    images: [ImageLicense]
    audios: [AudioLicense]
    brightcoves: [BrightcoveLicense]
    h5ps: [H5pLicense]
    concepts: [ConceptLicense]
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
    tags: [String]
    grepCodes: [String]
    competenceGoals: [CompetenceGoal]
    coreElements: [CoreElement]
    crossSubjectTopics(subjectId: String, filterIds: String): [CrossSubjectElement]
    oembed: String
  }

  type CompetenceGoal {
    id: String!
    code: String
    title: String!
    type: String!
    language: String
    curriculumId: String
    curriculumCode: String
    curriculum: Reference
    competenceGoalSetCode: String
    competenceGoalSet: Reference
    crossSubjectTopicsCodes: [Element]
    crossSubjectTopics: [Element]
    coreElementsCodes: [Element]
    coreElements: [Element]
  }

  type CoreElement {
    id: String!
    title: String!
    description: String
    language: String
    curriculumCode: String
    curriculum: Reference
  }
  
  type CrossSubjectElement {
    title: String!
    code: String
    path: String
  }

  type Element {
    reference: Reference!
    explanation: [String]!
  }

  type Reference {
    id: String!
    title: String!
    code: String
  }

  type Filter {
    id: String!
    name: String!
    connectionId: String
    relevanceId: String
    subjectId: String
    metadata: TaxonomyMetadata
  }

  type SubjectFilter {
    id: String!
    name: String!
    subjectId: String!
    contentUri: String
    subjectpage: SubjectPage
    metadata: TaxonomyMetadata
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

  type FilmPageAbout {
    title: String
    description: String
    visualElement: SubjectPageVisualElement
    language: String
  }

  type FilmFrontpage {
    name: String
    about: [FilmPageAbout]
    movieThemes: [MovieTheme]
    slideShow: [Movie]
  }

  type MovieTheme {
    name: [Name]
    movies: [Movie]
  }

  type Name {
    name: String
    language: String
  }

  type Movie {
    id: String!
    title: String
    metaImage: MetaImage
    metaDescription: String
    resourceTypes: [ResourceType]
    path: String
  }

  type MovieMeta {
    title: String
    metaImage: MetaImage
    metaDescription: String
  }

  type MoviePath {
    path: String
  }

  type MovieResourceTypes {
    resourceTypes: [ResourceType]
  }

  type Subject {
    id: String!
    contentUri: String
    name: String!
    path: String!
    metadata: TaxonomyMetadata
    filters: [SubjectFilter]
    frontpageFilters: [SubjectFilter]
    subjectpage: SubjectPage
    topics(all: Boolean, filterIds: String): [Topic]
  }

  interface SearchResult {
    id: Int!
    title: String
    supportedLanguages: [String]
    url: String
    metaDescription: String
    metaImage: MetaImage
    contentType: String
    traits: [String]
    contexts: [SearchContext]
  }

  type ArticleSearchResult implements SearchResult {
    id: Int!
    title: String
    supportedLanguages: [String]
    url: String
    metaDescription: String
    metaImage: MetaImage
    contentType: String
    traits: [String]
    contexts: [SearchContext]
  }

  type LearningpathSearchResult implements SearchResult {
    id: Int!
    title: String
    supportedLanguages: [String]
    url: String
    metaDescription: String
    metaImage: MetaImage
    contentType: String
    traits: [String]
    contexts: [SearchContext]
  }

  type FrontpageSearchResult {
    id: String!
    name: String
    resourceTypes: [SearchContextResourceTypes]
    subject: String
    path: String
    filters: [SearchContextFilter]
  }

  type SearchContext {
    breadcrumbs: [String]
    learningResourceType: String
    resourceTypes: [SearchContextResourceTypes]
    subject: String
    subjectId: String
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
    id: String
    name: String
    relevance: String
  }

  type ConceptResult {
    concepts: [Concept]
  }

  type Concept {
    id: Int
    title: String
    content: String
    metaImage: MetaImage
  }

  type Search {
    pageSize: Int
    page: Int
    language: String
    totalCount: Int
    results: [SearchResult]
    suggestions: [SuggestionResult]
    concepts: ConceptResult
  }

  type SuggestionResult {
    name: String
    suggestions: [SearchSuggestion]
  }

  type SearchSuggestion {
    text: String
    offset: Int
    length: Int
    options: [SuggestOption]
  }

  type SuggestOption {
    text: String
    score: Float
  }

  type GroupSearchResult {
    id: Int!
    path: String!
    name: String!
    ingress: String
    traits: [String]
    contexts: [SearchContext]
    metaImage: MetaImage
  }

  type GroupSearch {
    language: String
    resourceType: String
    resources: [GroupSearchResult]
    suggestions: [SuggestionResult]
    totalCount: Int
  }

  type FrontPageResources {
    results: [FrontpageSearchResult]
    totalCount: Int
  }

  type FrontpageSearch {
    topicResources: FrontPageResources
    learningResources: FrontPageResources
  }

  type Query {
    resource(id: String!, subjectId: String): Resource
    article(
      id: String!
      filterIds: String
      subjectId: String
      removeRelatedContent: String
    ): Article
    subject(id: String!): Subject
    subjectpage(id: String!): SubjectPage
    filmfrontpage: FilmFrontpage
    learningpath(pathId: String!): Learningpath
    learningpathStep(pathId: String!, stepId: String!): LearningpathStep
    subjects: [Subject]
    topic(id: String!, subjectId: String): Topic
    topics: [Topic]
    frontpage: Frontpage
    filters: [SubjectFilter]
    competenceGoals(
      codes: [String]
      nodeId: String
      language: String
    ): [CompetenceGoal]
    competenceGoal(code: String!, language: String): CompetenceGoal
    coreElements(codes: [String], language: String): [CoreElement]
    coreElement(code: String!, language: String): CoreElement
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
      fallback: String
      subjects: String
      languageFilter: String
      relevance: String
      grepCodes: String
    ): Search
    resourceTypes: [ResourceTypeDefinition]
    groupSearch(
      query: String
      subjects: String
      resourceTypes: String
      contextTypes: String
      page: String
      pageSize: String
      language: String
      fallback: String
    ): [GroupSearch]
    conceptSearch(query: String, subjects: String, language: String): [Concept]
    frontpageSearch(query: String): FrontpageSearch
    searchWithoutPagination(
      query: String
      contextTypes: String
      language: String
      ids: String
      resourceTypes: String
      contextFilters: String
      levels: String
      sort: String
      fallback: String
      subjects: String
      languageFilter: String
      relevance: String
    ): Search
  }
`;

const schema = makeExecutableSchema({
  typeDefs,
  resolverValidationOptions: { requireResolversForResolveType: false },
});

export default schema;
