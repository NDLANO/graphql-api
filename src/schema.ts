/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { gql } from 'graphql-tag';
import { makeExecutableSchema } from '@graphql-tools/schema';

export const typeDefs = gql`
  scalar StringRecord

  type ImageMetaInformationV2 {
    id: String!
    metaUrl: String!
    title: Title!
    alttext: ImageAltText!
    imageUrl: String!
    size: Int!
    contentType: String!
    copyright: Copyright!
    tags: Tags!
    caption: Caption!
    supportedLanguages: [String!]
    created: String!
    createdBy: String!
    modelRelease: String!
    editorNotes: [EditorNote!]
    imageDimensions: ImageDimensions
  }

  type ImageDimensions {
    width: Int!
    height: Int!
  }

  type EditorNote {
    timestamp: String!
    updatedBy: String!
    note: String!
  }

  type Caption {
    caption: String!
    language: String!
  }

  type ImageAltText {
    alttext: String!
    language: String!
  }

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
    image: ImageMetaInformation
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
    manuscript: Manuscript
    created: String!
    updated: String!
    series: PodcastSeries
  }

  interface PodcastSeriesBase {
    id: Int!
    title: Title!
    description: Description!
    supportedLanguages: [String!]!
    coverPhoto: CoverPhoto!
  }

  type PodcastSeries implements PodcastSeriesBase {
    id: Int!
    title: Title!
    description: Description!
    supportedLanguages: [String!]!
    coverPhoto: CoverPhoto!
  }

  type PodcastSeriesWithEpisodes implements PodcastSeriesBase {
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
    lastUpdated: String!
  }

  type AudioSearch {
    pageSize: Int!
    page: Int
    language: String!
    totalCount: Int!
    results: [AudioSummary!]!
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
    url: String!
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
    grepCodes: [String!]!
    visible: Boolean!
    customFields: StringRecord!
  }

  interface TaxonomyEntity {
    id: String!
    name: String!
    contentUri: String
    path: String!
    paths: [String!]!
    metadata: TaxonomyMetadata!
    relevanceId: String
    rank: Int
    supportedLanguages: [String!]!
  }

  interface WithArticle {
    meta: Meta
    availability: String
  }

  type Resource implements TaxonomyEntity & WithArticle {
    id: String!
    name: String!
    contentUri: String
    path: String!
    paths: [String!]!
    meta: Meta
    metadata: TaxonomyMetadata!
    learningpath: Learningpath
    relevanceId: String
    rank: Int
    article(
      subjectId: String
      isOembed: String
      convertEmbeds: Boolean
    ): Article
    availability: String
    resourceTypes: [ResourceType!]
    parents: [Topic!]
    breadcrumbs: [[String!]!]
    supportedLanguages: [String!]!
  }

  type Topic implements TaxonomyEntity & WithArticle {
    id: String!
    name: String!
    contentUri: String
    path: String!
    paths: [String!]!
    meta: Meta
    metadata: TaxonomyMetadata!
    relevanceId: String
    rank: Int
    article(
      subjectId: String
      showVisualElement: String
      convertEmbeds: Boolean
    ): Article
    availability: String
    isPrimary: Boolean
    parent: String
    subtopics: [Topic!]
    pathTopics: [[Topic!]!]
    coreResources(subjectId: String): [Resource!]
    supplementaryResources(subjectId: String): [Resource!]
    alternateTopics: [Topic!]
    breadcrumbs: [[String!]!]
    supportedLanguages: [String!]!
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

  type ImageMetaInformation {
    id: String!
    metaUrl: String!
    title: String!
    altText: String!
    imageUrl: String!
    size: Int!
    contentType: String!
    copyright: Copyright!
    tags: [String!]!
    caption: String!
    supportedLanguages: [String!]!
    created: String!
    createdBy: String!
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

  type PodcastLicense {
    title: String!
    src: String!
    copyright: Copyright!
    copyText: String
    description: String
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
    copyright: Copyright
    uploadDate: String
  }

  type H5pLicense {
    title: String!
    src: String
    thumbnail: String
    copyright: Copyright
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
  }

  type ArticleMetaData {
    footnotes: [FootNote!]
    images: [ImageLicense!]
    audios: [AudioLicense!]
    podcasts: [PodcastLicense!]
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
    conceptIds: [Int!]
    concepts: [Concept!]
    relatedContent: [RelatedContent!]
    availability: String
    revisionDate: String
  }

  type EmbedVisualelement {
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
    path: String!
    paths: [String!]!
    metadata: TaxonomyMetadata!
    relevanceId: String!
    rank: Int
    subjectpage: SubjectPage
    topics(all: Boolean): [Topic!]
    allTopics: [Topic!]
    grepCodes: [String!]!
    supportedLanguages: [String!]!
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
    customFields: BrightcoveCustomFields
    name: String
  }

  type BrightcoveCustomFields {
    license: String!
    licenseInfo: [String!]!
    accountId: String
  }

  type H5pElement {
    src: String
    thumbnail: String
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
    created: String!
    tags: [String!]!
    image: ImageLicense
    subjectIds: [String!]
    subjectNames: [String!]
    articleIds: [Int!]!
    articles: [Meta!]
    metaImage: MetaImage
    visualElement: VisualElement
    copyright: ConceptCopyright
    source: String
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

  type UptimeAlert {
    title: String!
    body: String
    number: Int!
    closable: Boolean!
  }

  type Breadcrumb {
    id: String!
    name: String!
  }

  type Folder {
    id: String!
    name: String!
    status: String!
    breadcrumbs: [Breadcrumb!]!
    parentId: String
    subfolders: [Folder!]!
    resources: [FolderResource!]!
    created: String!
    updated: String!
  }

  type FolderResource {
    id: String!
    resourceId: String!
    resourceType: String!
    path: String!
    created: String!
    tags: [String!]!
  }

  input FolderResourceMetaSearchInput {
    id: String!
    resourceType: String!
    path: String!
  }

  type FolderResourceResourceType {
    id: String!
    name: String!
  }

  interface FolderResourceMeta {
    id: String!
    type: String!
    resourceTypes: [FolderResourceResourceType!]!
    metaImage: MetaImage
    title: String!
    description: String!
  }

  type ArticleFolderResourceMeta implements FolderResourceMeta {
    id: String!
    type: String!
    resourceTypes: [FolderResourceResourceType!]!
    metaImage: MetaImage
    title: String!
    description: String!
  }

  type LearningpathFolderResourceMeta implements FolderResourceMeta {
    id: String!
    type: String!
    resourceTypes: [FolderResourceResourceType!]!
    metaImage: MetaImage
    title: String!
    description: String!
  }

  type ConceptFolderResourceMeta implements FolderResourceMeta {
    id: String!
    type: String!
    resourceTypes: [FolderResourceResourceType!]!
    metaImage: MetaImage
    title: String!
    description: String!
  }

  type ImageFolderResourceMeta implements FolderResourceMeta {
    id: String!
    type: String!
    resourceTypes: [FolderResourceResourceType!]!
    metaImage: MetaImage
    title: String!
    description: String!
  }

  type AudioFolderResourceMeta implements FolderResourceMeta {
    id: String!
    type: String!
    resourceTypes: [FolderResourceResourceType!]!
    metaImage: MetaImage
    title: String!
    description: String!
  }

  type VideoFolderResourceMeta implements FolderResourceMeta {
    id: String!
    type: String!
    resourceTypes: [FolderResourceResourceType!]!
    metaImage: MetaImage
    title: String!
    description: String!
  }

  type NewFolder {
    name: String!
    parentId: String
    status: String
  }

  type NewFolderResource {
    resourceType: String!
    path: String!
    tags: [String!]
  }

  type UpdatedFolder {
    name: String
    status: String
  }

  type UpdatedFolderResource {
    tags: [String!]
  }

  type SortResult {
    sortedIds: [String!]!
    parentId: String
  }

  type MyNdlaPersonalData {
    id: Int!
    favoriteSubjects: [String!]!
    role: String!
  }

  type Query {
    resource(id: String!, subjectId: String, topicId: String): Resource
    article(
      id: String!
      subjectId: String
      isOembed: String
      draftConcept: Boolean
      absoluteUrl: Boolean
      path: String
      showVisualElement: String
      convertEmbeds: Boolean
    ): Article
    subject(id: String!): Subject
    subjectpage(id: Int!): SubjectPage
    filmfrontpage: FilmFrontpage
    learningpath(pathId: String!): Learningpath
    subjects(
      metadataFilterKey: String
      metadataFilterValue: String
      filterVisible: Boolean
    ): [Subject!]
    topic(id: String!, subjectId: String): Topic
    topics(contentUri: String, filterVisible: Boolean): [Topic!]
    frontpage: Frontpage
    competenceGoals(codes: [String], language: String): [CompetenceGoal!]
    competenceGoal(code: String!, language: String): CompetenceGoal
    coreElements(codes: [String], language: String): [CoreElement!]
    coreElement(code: String!, language: String): CoreElement
    search(
      query: String
      page: Int
      pageSize: Int
      contextTypes: String
      language: String
      ids: [Int!]
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
      page: Int
      pageSize: Int
      language: String
      fallback: String
      grepCodes: String
      aggregatePaths: [String!]
    ): [GroupSearch!]
    listingPage(subjects: String): ListingPage
    concept(id: Int!): Concept
    conceptSearch(
      query: String
      subjects: String
      tags: String
      ids: [Int!]
      page: Int
      pageSize: Int
      exactMatch: Boolean
      language: String
      fallback: Boolean
    ): ConceptResult
    frontpageSearch(query: String): FrontpageSearch
    searchWithoutPagination(
      query: String
      contextTypes: String
      language: String
      ids: [Int!]
      resourceTypes: String
      contextFilters: String
      levels: String
      sort: String
      fallback: String
      subjects: String
      languageFilter: String
      relevance: String
    ): SearchWithoutPagination
    audio(id: Int!): Audio
    podcastSearch(page: Int!, pageSize: Int!, fallback: Boolean): AudioSearch
    podcastSeries(id: Int!): PodcastSeriesWithEpisodes
    podcastSeriesSearch(
      page: Int!
      pageSize: Int!
      fallback: Boolean
    ): PodcastSeriesSearch
    alerts: [UptimeAlert]
    folders(includeSubfolders: Boolean, includeResources: Boolean): [Folder!]!
    folderResourceMeta(
      resource: FolderResourceMetaSearchInput!
    ): FolderResourceMeta
    folderResourceMetaSearch(
      resources: [FolderResourceMetaSearchInput!]!
    ): [FolderResourceMeta!]!
    folder(
      id: String!
      includeSubfolders: Boolean
      includeResources: Boolean
    ): Folder!
    sharedFolder(
      id: String!
      includeSubfolders: Boolean
      includeResources: Boolean
    ): Folder!
    allFolderResources(size: Int): [FolderResource!]!
    personalData: MyNdlaPersonalData!
    image(id: String!): ImageMetaInformationV2
    brightcoveVideo(id: String!): BrightcoveElement
  }

  type Mutation {
    addFolder(name: String!, parentId: String, status: String): Folder!
    updateFolder(id: String!, name: String, status: String): Folder!
    deleteFolder(id: String!): String!
    addFolderResource(
      resourceId: String!
      folderId: String!
      resourceType: String!
      path: String!
      tags: [String!]
    ): FolderResource!
    updateFolderResource(id: String!, tags: [String!]): FolderResource!
    deleteFolderResource(folderId: String!, resourceId: String!): String!
    deletePersonalData: Boolean!
    updatePersonalData(favoriteSubjects: [String!]!): MyNdlaPersonalData!
    sortFolders(parentId: String, sortedIds: [String!]!): SortResult!
    sortResources(parentId: String!, sortedIds: [String!]!): SortResult!
    updateFolderStatus(folderId: String!, status: String!): [String!]!
    transformArticleContent(
      content: String!
      visualElement: String
      subject: String
      previewH5p: Boolean
      draftConcept: Boolean
      absoluteUrl: Boolean
    ): String!
  }
`;

const schema = makeExecutableSchema({
  typeDefs,
  resolverValidationOptions: { requireResolversForResolveType: 'ignore' },
});

export default schema;
