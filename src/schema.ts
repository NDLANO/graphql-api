/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { gql } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';

export const typeDefs = gql`
  scalar JSON

  type AudioFile {
    url: String!
    mimeType: String!
    fileSize: Int!
    language: String!
  }

  type Title {
    title: String!
    language: String!
  }

  type Description {
    description: String!
    language: String!
  }

  type Tags {
    tags: [String!]!
    language: String!
  }

  type CoverPhoto {
    id: String!
    url: String!
    altText: String!
  }

  type PodcastMeta {
    introduction: String!
    coverPhoto: CoverPhoto!
    language: String!
  }

  type Manuscript {
    manuscript: String!
    language: String!
  }

  type Audio {
    id: Int!
    revision: Int!
    title: Title!
    audioFile: AudioFile!
    copyright: Copyright!
    tags: Tags!
    supportedLanguages: [String!]!
    audioType: String!
    podcastMeta: PodcastMeta
    series: PodcastSeries
    manuscript: Manuscript
    created: String!
    updated: String!
  }

  type PodcastSeries {
    id: Int!
    title: Title!
    description: Description!
    supportedLanguages: [String!]!
    episodes: [Audio!]
    coverPhoto: CoverPhoto!
  }

  type AudioSummary {
    id: Int!
    title: Title!
    audioType: String!
    url: String!
    license: String!
    supportedLanguages: [String!]!
    manuscript: Manuscript
    podcastMeta: PodcastMeta
    series: PodcastSeries
    lastUpdated: String!
  }

  type AudioSearch {
    pageSize: Int!
    page: Int
    language: String!
    totalCount: Int!
    results: [Audio!]!
  }

  type PodcastSeriesSummary {
    id: Int!
    title: Title!
    description: Description!
    supportedLanguages: [String!]
    episodes: [AudioSummary!]
    coverPhoto: CoverPhoto!
  }

  type PodcastSeriesSearch {
    pageSize: Int!
    page: Int
    language: String!
    totalCount: Int!
    results: [PodcastSeriesSummary!]!
  }

  type ResourceTypeDefinition {
    id: String!
    name: String!
    subtypes: [ResourceTypeDefinition!]
  }

  type ResourceType {
    id: String!
    name: String!
    resources(topicId: String!): [Resource!]
  }

  type MetaImage {
    url: String!
    alt: String!
  }

  type Meta {
    id: Int!
    title: String!
    introduction: String
    metaDescription: String
    metaImage: MetaImage
    lastUpdated: String
    availability: String
  }

  type LearningpathStepEmbedUrl {
    url: String!
    embedType: String!
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
    metaUrl: String!
    revision: Int!
    status: String!
    supportedLanguages: [String!]!
    type: String!
    article: Article
    resource: Resource
    showTitle: Boolean!
    oembed: LearningpathStepOembed
  }

  type LearningpathCoverphoto {
    url: String
    metaUrl: String!
  }

  type LearningpathCopyright {
    license: License!
    contributors: [Contributor!]!
  }

  type Learningpath {
    id: Int!
    title: String!
    description: String!
    copyright: LearningpathCopyright!
    duration: Int
    canEdit: Boolean!
    verificationStatus: String!
    lastUpdated: String!
    tags: [String!]!
    supportedLanguages: [String!]!
    isBasedOn: Int
    learningsteps: [LearningpathStep!]!
    metaUrl: String!
    revision: Int!
    learningstepUrl: String!
    status: String!
    coverphoto: LearningpathCoverphoto
  }

  type TaxonomyMetadata {
    grepCodes: [String!]
    visible: Boolean
    customFields: JSON
  }

  interface TaxonomyEntity {
    id: String!
    name: String!
    contentUri: String
    path: String
    paths: [String!]
    metadata: TaxonomyMetadata
    relevanceId: String
    rank: Int
  }

  interface WithArticle {
    meta: Meta
    availability: String
  }

  type Resource implements TaxonomyEntity & WithArticle {
    id: String!
    name: String!
    contentUri: String
    path: String
    paths: [String!]
    meta: Meta
    metadata: TaxonomyMetadata
    learningpath: Learningpath
    relevanceId: String
    rank: Int
    article(subjectId: String, isOembed: String): Article
    availability: String
    resourceTypes: [ResourceType!]
    parentTopics: [Topic!]
    breadcrumbs: [[String!]!]
  }

  type Topic implements TaxonomyEntity & WithArticle {
    id: String!
    name: String!
    contentUri: String
    path: String
    paths: [String!]
    meta: Meta
    metadata: TaxonomyMetadata
    relevanceId: String
    rank: Int
    article(subjectId: String, showVisualElement: String): Article
    availability: String
    isPrimary: Boolean
    parent: String
    subtopics: [Topic!]
    pathTopics: [[Topic!]!]
    coreResources(subjectId: String): [Resource!]
    supplementaryResources(subjectId: String): [Resource!]
    alternateTopics: [Topic!]
    breadcrumbs: [[String!]!]
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
    license: License!
    creators: [Contributor!]!
    processors: [Contributor!]!
    rightsholders: [Contributor!]!
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
    authors: [String!]!
    edition: String
    publisher: String
    url: String
  }

  type ImageLicense {
    title: String!
    src: String!
    altText: String!
    copyright: Copyright!
    contentType: String
    copyText: String
  }

  type AudioLicense {
    title: String!
    src: String!
    copyright: Copyright!
    copyText: String
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
    copyText: String
  }

  type H5pLicense {
    title: String!
    src: String
    thumbnail: String
    copyright: Copyright!
    copyText: String
  }

  type ConceptCopyright {
    license: License
    creators: [Contributor!]!
    processors: [Contributor!]!
    rightsholders: [Contributor!]!
    origin: String
  }

  type ConceptLicense {
    title: String!
    src: String
    copyright: ConceptCopyright
    copyText: String
  }

  type ArticleMetaData {
    footnotes: [FootNote!]
    images: [ImageLicense!]
    audios: [AudioLicense!]
    brightcoves: [BrightcoveLicense!]
    h5ps: [H5pLicense!]
    concepts: [ConceptLicense!]
    copyText: String
  }

  type RelatedContent {
    title: String!
    url: String!
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
    visualElement: VisualElement
    metaImage: MetaImage
    metaDescription: String!
    articleType: String!
    oldNdlaUrl: String
    requiredLibraries: [ArticleRequiredLibrary!]
    metaData: ArticleMetaData
    supportedLanguages: [String!]
    copyright: Copyright!
    tags: [String!]
    grepCodes: [String!]
    competenceGoals: [CompetenceGoal!]
    coreElements: [CoreElement!]
    crossSubjectTopics(subjectId: String): [CrossSubjectElement!]
    oembed: String
    conceptIds: [String!]
    concepts: [DetailedConcept!]
    relatedContent: [RelatedContent!]
    availability: String
  }

  type embedVisualelement {
    visualElement: VisualElement
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
    crossSubjectTopicsCodes: [Element!]
    crossSubjectTopics: [Element!]
    coreElementsCodes: [Element!]
    coreElements: [Element!]
    competenceAimSetId: String
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

  type Category {
    name: String!
    subjects: [Subject!]!
  }

  type Frontpage {
    topical: [Resource!]!
    categories: [Category!]!
  }

  type SubjectPageVisualElement {
    type: String!
    url: String!
    alt: String
  }

  type SubjectPageAbout {
    title: String!
    description: String!
    visualElement: SubjectPageVisualElement!
  }

  type SubjectPageBanner {
    desktopUrl: String!
    desktopId: String!
    mobileUrl: String
    mobileId: String
  }

  type SubjectPage {
    topical(subjectId: String): TaxonomyEntity
    mostRead(subjectId: String): [TaxonomyEntity!]!
    banner: SubjectPageBanner!
    id: Int!
    name: String!
    facebook: String
    editorsChoices(subjectId: String): [TaxonomyEntity!]!
    latestContent(subjectId: String): [TaxonomyEntity!]
    about: SubjectPageAbout
    goTo: [ResourceTypeDefinition!]!
    metaDescription: String
    layout: String!
    twitter: String
    supportedLanguages: [String!]!
  }

  type FilmPageAbout {
    title: String!
    description: String!
    visualElement: SubjectPageVisualElement!
    language: String!
  }

  type FilmFrontpage {
    name: String!
    about: [FilmPageAbout!]!
    movieThemes: [MovieTheme!]!
    slideShow: [Movie!]!
  }

  type MovieTheme {
    name: [Name!]!
    movies: [Movie!]!
  }

  type Name {
    name: String!
    language: String!
  }

  type Movie {
    id: String!
    title: String!
    metaImage: MetaImage
    metaDescription: String!
    resourceTypes: [ResourceType!]!
    path: String!
  }

  type MovieMeta {
    title: String!
    metaImage: MetaImage
    metaDescription: String
  }

  type MoviePath {
    path: String
    paths: [String!]
  }

  type MovieResourceTypes {
    resourceTypes: [ResourceType!]
  }

  type Subject implements TaxonomyEntity {
    id: String!
    contentUri: String
    name: String!
    path: String
    paths: [String!]
    metadata: TaxonomyMetadata
    relevanceId: String
    rank: Int
    subjectpage: SubjectPage
    topics(all: Boolean): [Topic!]
    allTopics: [Topic!]
    grepCodes: [String!]
  }

  interface SearchResult {
    id: Int!
    title: String!
    supportedLanguages: [String!]!
    url: String!
    metaDescription: String!
    metaImage: MetaImage
    traits: [String!]!
    contexts: [SearchContext!]!
  }

  type ArticleSearchResult implements SearchResult {
    id: Int!
    title: String!
    supportedLanguages: [String!]!
    url: String!
    metaDescription: String!
    metaImage: MetaImage
    traits: [String!]!
    contexts: [SearchContext!]!
  }

  type LearningpathSearchResult implements SearchResult {
    id: Int!
    title: String!
    supportedLanguages: [String!]!
    url: String!
    metaDescription: String!
    metaImage: MetaImage
    traits: [String!]!
    contexts: [SearchContext!]!
  }

  type FrontpageSearchResult {
    id: String!
    name: String!
    resourceTypes: [SearchContextResourceTypes!]!
    subject: String!
    path: String!
    filters: [SearchContextFilter!]!
  }

  type SearchContext {
    breadcrumbs: [String!]!
    learningResourceType: String!
    resourceTypes: [SearchContextResourceTypes!]!
    subject: String!
    subjectId: String!
    relevance: String!
    path: String!
    id: String!
    language: String!
    filters: [SearchContextFilter!]!
  }

  type SearchContextResourceTypes {
    id: String!
    name: String!
    language: String!
  }

  type SearchContextFilter {
    id: String!
    name: String!
    relevance: String!
  }

  type VisualElementOembed {
    title: String
    html: String
    fullscreen: Boolean
  }

  type VisualElement {
    resource: String
    url: String
    copyright: Copyright
    language: String
    embed: String
    title: String
    brightcove: BrightcoveElement
    h5p: H5pElement
    oembed: VisualElementOembed
    image: ImageElement
  }

  type ImageElement {
    resourceid: String
    alt: String
    caption: String
    lowerRightX: Float
    lowerRightY: Float
    upperLeftX: Float
    upperLeftY: Float
    focalX: Float
    focalY: Float
    src: String!
    altText: String!
    contentType: String
    copyText: String
  }

  type BrightcoveElement {
    videoid: String
    player: String
    account: String
    caption: String
    description: String
    cover: String
    src: String
    download: String
    iframe: BrightcoveIframe
    uploadDate: String
    copyText: String
  }

  type H5pElement {
    src: String
    thumbnail: String
    copyText: String
  }

  type ListingPage {
    subjects: [Subject!]
    tags: [String!]
  }

  type ConceptResult {
    totalCount: Int!
    page: Int
    pageSize: Int!
    language: String!
    concepts: [Concept!]!
  }

  type Concept {
    id: Int!
    title: String!
    content: String!
    tags: [String!]!
    subjectIds: [String!]
    subjectNames: [String!]
    metaImage: MetaImage!
    visualElement: VisualElement
  }

  type DetailedConcept {
    id: Int!
    title: String!
    content: String
    created: String
    tags: [String!]
    image: ImageLicense
    subjectIds: [String!]
    subjectNames: [String!]
    articleIds: [String!]
    articles: [Meta!]
    visualElement: VisualElement
    copyright: ConceptCopyright
  }

  type Search {
    pageSize: Int!
    page: Int
    language: String!
    totalCount: Int!
    results: [SearchResult!]!
    suggestions: [SuggestionResult!]!
    aggregations: [AggregationResult!]!
    concepts: ConceptResult
  }

  type SearchWithoutPagination {
    results: [SearchResult!]!
  }

  type SuggestionResult {
    name: String!
    suggestions: [SearchSuggestion!]!
  }

  type AggregationResult {
    field: String!
    sumOtherDocCount: Int!
    docCountErrorUpperBound: Int!
    values: [BucketResult!]!
  }

  type BucketResult {
    value: String!
    count: Int!
  }

  type SearchSuggestion {
    text: String!
    offset: Int!
    length: Int!
    options: [SuggestOption!]!
  }

  type SuggestOption {
    text: String!
    score: Float!
  }

  type GroupSearchResult {
    id: Int!
    path: String!
    name: String!
    ingress: String!
    traits: [String!]!
    contexts: [SearchContext!]!
    metaImage: MetaImage
    url: String!
  }

  type GroupSearch {
    language: String!
    resourceType: String!
    resources: [GroupSearchResult!]!
    suggestions: [SuggestionResult!]!
    aggregations: [AggregationResult!]!
    totalCount: Int!
    page: Int
    pageSize: Int!
  }

  type FrontPageResources {
    results: [FrontpageSearchResult!]!
    totalCount: Int!
    suggestions: [SuggestionResult!]!
  }

  type FrontpageSearch {
    topicResources: FrontPageResources!
    learningResources: FrontPageResources!
  }

  type Query {
    resource(id: String!, subjectId: String, topicId: String): Resource
    article(
      id: String!
      subjectId: String
      isOembed: String
      path: String
      showVisualElement: String
    ): Article
    subject(id: String!): Subject
    subjectpage(id: Int!): SubjectPage
    filmfrontpage: FilmFrontpage
    learningpath(pathId: String!): Learningpath
    subjects: [Subject!]
    topic(id: String!, subjectId: String): Topic
    topics(contentUri: String, filterVisible: Boolean): [Topic!]
    frontpage: Frontpage
    competenceGoals(
      codes: [String]
      nodeId: String
      language: String
    ): [CompetenceGoal!]
    competenceGoal(code: String!, language: String): CompetenceGoal
    coreElements(codes: [String], language: String): [CoreElement!]
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
      aggregatePaths: [String!]
    ): Search
    resourceTypes: [ResourceTypeDefinition!]
    groupSearch(
      query: String
      subjects: String
      levels: String
      resourceTypes: String
      contextTypes: String
      page: String
      pageSize: String
      language: String
      fallback: String
      grepCodes: String
      aggregatePaths: [String!]
    ): [GroupSearch!]
    listingPage(subjects: String): ListingPage
    concepts(ids: [String!]!): [Concept!]
    detailedConcept(id: String): DetailedConcept
    conceptSearch(
      query: String
      subjects: String
      tags: String
      page: String
      pageSize: String
      exactMatch: Boolean
      language: String
      fallback: Boolean
    ): ConceptResult
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
    ): SearchWithoutPagination
    podcast(id: Int!): Audio
    podcastSearch(page: Int, pageSize: Int): AudioSearch
    podcastSeries(id: Int!): PodcastSeries
    podcastSeriesSearch(page: Int, pageSize: Int): PodcastSeriesSearch
  }
`;

const schema = makeExecutableSchema({
  typeDefs,
  resolverValidationOptions: { requireResolversForResolveType: 'ignore' },
});

export default schema;
