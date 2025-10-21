/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { gql } from "graphql-tag";
import { makeExecutableSchema } from "@graphql-tools/schema";

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
    image: ImageMetaInformation!
    hasRSS: Boolean!
  }

  type PodcastSeries implements PodcastSeriesBase {
    id: Int!
    title: Title!
    description: Description!
    supportedLanguages: [String!]!
    coverPhoto: CoverPhoto!
    image: ImageMetaInformation!
    hasRSS: Boolean!
  }

  type PodcastSeriesWithEpisodes implements PodcastSeriesBase {
    id: Int!
    title: Title!
    description: Description!
    supportedLanguages: [String!]!
    episodes: [Audio!]
    coverPhoto: CoverPhoto!
    image: ImageMetaInformation!
    hasRSS: Boolean!
    content: ResourceEmbed
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
  }

  type MetaImage {
    url: String!
    alt: String!
  }

  type Meta {
    id: Int!
    title: String!
    htmlTitle: String!
    introduction: String
    htmlIntroduction: String
    metaDescription: String
    metaImage: MetaImage
    lastUpdated: String
    availability: String
    language: String
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
    canEdit: Boolean!
    description: String
    introduction: String
    embedUrl: LearningpathStepEmbedUrl
    license: License
    copyright: LearningpathCopyright
    metaUrl: String!
    revision: Int!
    status: String!
    supportedLanguages: [String!]!
    type: String!
    articleId: Int
    resource(rootId: String, parentId: String): Resource
    showTitle: Boolean!
    oembed: LearningpathStepOembed
    opengraph: ExternalOpengraph
  }

  type MyNdlaLearningpathStep {
    id: Int!
    title: String!
    seqNo: Int!
    canEdit: Boolean!
    introduction: String
    description: String
    embedUrl: LearningpathStepEmbedUrl
    license: License
    copyright: LearningpathCopyright
    metaUrl: String!
    revision: Int!
    status: String!
    supportedLanguages: [String!]!
    type: String!
    articleId: Int
    resource(rootId: String, parentId: String): Resource
    showTitle: Boolean!
    oembed: LearningpathStepOembed
    opengraph: ExternalOpengraph
  }

  type LearningpathCoverphoto {
    url: String!
    metaUrl: String!
  }

  type LearningpathCopyright {
    license: License!
    contributors: [Contributor!]!
  }

  type LearningpathSeqNo {
    seqNo: Int!
  }

  type Learningpath {
    id: Int!
    title: String!
    description: String!
    introduction: String
    copyright: LearningpathCopyright!
    duration: Int
    canEdit: Boolean!
    verificationStatus: String!
    created: String!
    lastUpdated: String!
    tags: [String!]!
    supportedLanguages: [String!]!
    isBasedOn: Int
    basedOn: String
    learningsteps: [LearningpathStep!]!
    metaUrl: String!
    revision: Int!
    learningstepUrl: String!
    status: String!
    coverphoto: LearningpathCoverphoto
    madeAvailable: String
    isMyNDLAOwner: Boolean!
  }

  type MyNdlaLearningpath {
    id: Int!
    title: String!
    introduction: String
    description: String!
    copyright: LearningpathCopyright!
    duration: Int
    canEdit: Boolean!
    verificationStatus: String!
    created: String!
    lastUpdated: String!
    tags: [String!]!
    supportedLanguages: [String!]!
    isBasedOn: Int
    basedOn: String
    learningsteps: [MyNdlaLearningpathStep!]!
    metaUrl: String!
    revision: Int!
    learningstepUrl: String!
    status: String!
    coverphoto: LearningpathCoverphoto
    madeAvailable: String
    isMyNDLAOwner: Boolean!
  }

  input LearningpathEmbedInput {
    url: String!
    embedType: String!
  }

  input ContributorInput {
    type: String!
    name: String!
  }

  input LicenseInput {
    license: String!
    url: String
    description: String
  }

  input LearningpathCopyrightInput {
    license: LicenseInput!
    contributors: [ContributorInput!]!
  }

  input LearningpathNewInput {
    title: String!
    description: String
    introduction: String
    coverPhotoMetaUrl: String
    duration: Int
    tags: [String!]
    language: String!
    copyright: LearningpathCopyrightInput!
  }

  input LearningpathUpdateInput {
    title: String
    coverPhotoMetaUrl: String
    introduction: String
    language: String!
    revision: Int!
    description: String
    duration: Int
    tags: [String!]
    deleteMessage: Boolean
    copyright: LearningpathCopyrightInput
  }

  input LearningpathCopyInput {
    title: String!
    description: String
    language: String!
    coverPhotoMetaUrl: String
    duration: Int
    tags: [String!]
    copyright: LearningpathCopyrightInput
  }

  input LearningpathStepNewInput {
    title: String!
    articleId: Int
    introduction: String
    description: String
    language: String!
    embedUrl: LearningpathEmbedInput
    showTitle: Boolean!
    type: String!
    license: String
    copyright: LearningpathCopyrightInput
  }

  input LearningpathStepUpdateInput {
    revision: Int!
    articleId: Int
    title: String
    introduction: String
    language: String!
    description: String
    embedUrl: LearningpathEmbedInput
    showTitle: Boolean
    type: String
    license: String
    copyright: LearningpathCopyrightInput
  }

  type TaxonomyMetadata {
    grepCodes: [String!]!
    visible: Boolean!
    customFields: StringRecord!
  }

  interface TaxBase {
    id: String!
    name: String!
    url: String
  }

  interface TaxonomyEntity {
    id: String!
    name: String!
    contentUri: String
    metadata: TaxonomyMetadata!
    relevanceId: String
    contextId: String
    contexts: [TaxonomyContext!]!
    context: TaxonomyContext
    breadcrumbs: [String!]!
    supportedLanguages: [String!]!
    resourceTypes: [ResourceType!]
    url: String
    language: String
    nodeType: String!
  }

  interface WithArticle {
    contentUri: String
    article: Article
    availability: String
    meta: Meta
  }

  type Node implements TaxonomyEntity & WithArticle & TaxBase {
    id: String!
    name: String!
    contentUri: String
    metadata: TaxonomyMetadata!
    relevanceId: String
    contextId: String
    contexts: [TaxonomyContext!]!
    context: TaxonomyContext
    breadcrumbs: [String!]!
    supportedLanguages: [String!]!
    resourceTypes: [ResourceType!]
    url: String
    language: String
    nodeType: String!
    connectionId: String
    rank: Int
    parentId: String
    children(recursive: Boolean, nodeType: String): [Node!]
    links: [Node!]
    alternateNodes: [Node!]
    meta: Meta
    article: Article
    availability: String
    learningpath: Learningpath
    subjectpage: SubjectPage
    grepCodes: [String!]
  }

  type Resource implements TaxonomyEntity & WithArticle & TaxBase {
    id: String!
    name: String!
    contentUri: String
    metadata: TaxonomyMetadata!
    relevanceId: String
    contexts: [TaxonomyContext!]!
    context: TaxonomyContext
    contextId: String
    breadcrumbs: [String!]!
    supportedLanguages: [String!]!
    resourceTypes: [ResourceType!]
    url: String
    language: String
    nodeType: String!
    rank: Int
    parents: [Topic!]
    meta: Meta
    learningpath: Learningpath
    article: Article
    availability: String
  }

  type TaxonomyCrumb implements TaxBase {
    id: String!
    contextId: String!
    name: String!
    url: String!
  }

  type TaxonomyContext {
    contextId: String!
    breadcrumbs: [String!]!
    name: String!
    url: String!
    parentIds: [String!]!
    rootId: String!
    relevance: String!
    root: String!
    isActive: Boolean!
    parents: [TaxonomyCrumb!]
  }

  type Topic implements TaxonomyEntity & WithArticle & TaxBase {
    id: String!
    name: String!
    contentUri: String
    metadata: TaxonomyMetadata!
    relevanceId: String
    contexts: [TaxonomyContext!]!
    context: TaxonomyContext
    contextId: String
    breadcrumbs: [String!]!
    supportedLanguages: [String!]!
    resourceTypes: [ResourceType!]
    url: String
    language: String
    nodeType: String!
    meta: Meta
    article: Article
    availability: String
    isPrimary: Boolean
    parentId: String
    subtopics: [Topic!]
    coreResources(subjectId: String): [Resource!]
    supplementaryResources(subjectId: String): [Resource!]
    alternateTopics: [Topic!]
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
    processed: Boolean
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
    id: String!
    title: String!
    src: String!
    altText: String!
    copyright: Copyright!
    contentType: String
    copyText: String
  }

  type AudioLicense {
    id: String!
    title: String!
    src: String!
    copyright: Copyright!
    copyText: String
  }

  type PodcastLicense {
    id: String!
    title: String!
    src: String!
    copyright: Copyright!
    copyText: String
    description: String
    coverPhotoUrl: String
  }

  type BrightcoveIframe {
    src: String!
    height: Int!
    width: Int!
  }

  type BrightcoveLicense {
    id: String!
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
    id: String!
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
    processed: Boolean
  }

  type ConceptLicense {
    id: String!
    title: String!
    src: String
    content: String
    copyright: ConceptCopyright
  }

  type GlossLicense {
    id: String!
    title: String!
    src: String
    content: String
    metaImageUrl: String
    copyright: ConceptCopyright
  }

  type TextblockLicense {
    title: String
    copyright: Copyright!
  }

  type ArticleMetaData {
    footnotes: [FootNote!]!
    images: [ImageLicense!]!
    audios: [AudioLicense!]!
    podcasts: [PodcastLicense!]!
    brightcoves: [BrightcoveLicense!]!
    h5ps: [H5pLicense!]!
    concepts: [ConceptLicense!]!
    glosses: [GlossLicense!]!
    textblocks: [TextblockLicense!]!
    copyText: String
  }

  type RelatedContent {
    title: String!
    url: String!
  }

  type MetaImageWithCopyright {
    alt: String!
    url: String!
    copyright: Copyright!
  }

  type Article {
    id: Int!
    revision: Int!
    title: String!
    htmlTitle: String!
    slug: String
    introduction: String
    htmlIntroduction: String
    content: String!
    created: String!
    updated: String!
    published: String!
    metaImage: MetaImageWithCopyright
    metaDescription: String!
    articleType: String!
    oldNdlaUrl: String
    requiredLibraries: [ArticleRequiredLibrary!]
    supportedLanguages: [String!]
    copyright: Copyright!
    tags: [String!]
    grepCodes: [String!]
    competenceGoals: [CompetenceGoal!]
    coreElements: [CoreElement!]
    crossSubjectTopics(subjectId: String): [CrossSubjectElement!]
    conceptIds: [Int!]
    concepts: [Concept!]
    relatedContent(subjectId: String): [RelatedContent!]
    availability: String
    revisionDate: String
    language: String!
    transformedContent(transformArgs: TransformedArticleContentInput): TransformedArticleContent!
    oembed: String
    transformedDisclaimer(transformArgs: TransformedArticleContentInput): TransformedArticleContent!
    traits: [String!]!
  }

  input TransformedArticleContentInput {
    subjectId: String
    contextId: String
    isOembed: String
    showVisualElement: String
    path: String
    previewH5p: Boolean
    draftConcept: Boolean
    absoluteUrl: Boolean
  }

  type TransformedArticleContent {
    content: String!
    visualElement: VisualElement
    metaData: ArticleMetaData
    visualElementEmbed: ResourceEmbed
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
    url: String
  }

  type Element {
    reference: Reference!
  }

  type Reference {
    id: String!
    title: String!
    code: String
  }

  type FrontpageMenu {
    articleId: Int!
    article: Article!
    menu: [FrontpageMenu]
    hideLevel: Boolean
  }

  type SubjectPageVisualElement {
    type: String!
    url: String!
    imageUrl: String
    alt: String
    imageLicense: ImageLicense
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
    banner: SubjectPageBanner!
    id: Int!
    name: String!
    about: SubjectPageAbout
    metaDescription: String
    supportedLanguages: [String!]!
    connectedTo: [SubjectLink]!
    buildsOn: [SubjectLink]!
    leadsTo: [SubjectLink]!
  }

  type SubjectLink {
    name: String
    path: String
    url: String
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
    article: Article
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
    url: String!
  }

  type MovieMeta {
    title: String!
    metaImage: MetaImage
    metaDescription: String
  }

  type MovieResourceTypes {
    resourceTypes: [ResourceType!]
  }

  type Subject implements TaxonomyEntity & TaxBase {
    id: String!
    name: String!
    contentUri: String
    metadata: TaxonomyMetadata!
    relevanceId: String
    contexts: [TaxonomyContext!]!
    context: TaxonomyContext
    contextId: String
    breadcrumbs: [String!]!
    supportedLanguages: [String!]!
    resourceTypes: [ResourceType!]
    url: String
    language: String
    nodeType: String!
    subjectpage: SubjectPage
    topics(all: Boolean): [Topic!]
    allTopics: [Topic!]
    grepCodes: [String!]
  }

  type ProgrammePage {
    id: String!
    contextId: String
    title: Title!
    url: String
    contentUri: String
    metaDescription: String
    desktopImage: MetaImage
    mobileImage: MetaImage
    grades: [Grade!]
    supportedLanguages: [String!]!
  }

  type Grade {
    id: String!
    title: Title!
    url: String
    categories: [Category!]
  }

  type Category {
    id: String!
    title: Title!
    isProgrammeSubject: Boolean!
    subjects: [Subject!]
  }

  interface SearchResult {
    id: String!
    title: String!
    supportedLanguages: [String!]!
    url: String!
    metaDescription: String!
    context: SearchContext
    contexts: [SearchContext!]!
  }

  union SearchResultUnion = ArticleSearchResult | LearningpathSearchResult | NodeSearchResult

  type ArticleSearchResult implements SearchResult {
    id: String!
    title: String!
    htmlTitle: String!
    supportedLanguages: [String!]!
    url: String!
    metaDescription: String!
    metaImage: MetaImage
    traits: [String!]!
    context: SearchContext
    contexts: [SearchContext!]!
  }

  type LearningpathSearchResult implements SearchResult {
    id: String!
    title: String!
    htmlTitle: String!
    supportedLanguages: [String!]!
    url: String!
    metaDescription: String!
    metaImage: MetaImage
    traits: [String!]!
    context: SearchContext
    contexts: [SearchContext!]!
  }

  type NodeSearchResult implements SearchResult {
    id: String!
    title: String!
    htmlTitle: String!
    supportedLanguages: [String!]!
    url: String!
    metaDescription: String!
    metaImage: MetaImage
    context: SearchContext
    contexts: [SearchContext!]!
  }

  type SearchContext {
    breadcrumbs: [String!]!
    contextType: String!
    resourceTypes: [SearchContextResourceTypes!]!
    root: String!
    rootId: String!
    relevance: String!
    relevanceId: String!
    path: String!
    publicId: String!
    language: String!
    isPrimary: Boolean!
    isActive: Boolean!
    contextId: String!
    url: String!
  }

  type SearchContextResourceTypes {
    id: String!
    name: String!
    language: String!
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

  type Concept {
    id: Int!
    title: String!
    htmlTitle: String!
    content: String!
    created: String!
    tags: [String!]!
    visualElement: VisualElement
    copyright: ConceptCopyright
    source: String
    supportedLanguages: [String!]!
    glossData: Gloss
    conceptType: String!
  }

  type Gloss {
    gloss: String!
    wordClass: String!
    originalLanguage: String!
    transcriptions: Transcription!
    examples: [[Examples!]!]
  }

  type Examples {
    example: String!
    language: String!
    transcriptions: Transcription!
  }

  type Transcription {
    pinyin: String
    traditional: String
  }

  type Search {
    pageSize: Int!
    page: Int
    language: String!
    totalCount: Int!
    results: [SearchResult!]!
    suggestions: [SuggestionResult!]!
    aggregations: [AggregationResult!]!
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
    title: String!
    htmlTitle: String!
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
    description: String
    breadcrumbs: [Breadcrumb!]!
    parentId: String
    subfolders: [Folder!]!
    resources: [FolderResource!]!
    created: String!
    updated: String!
    owner: Owner
  }

  type Owner {
    name: String!
  }

  type SharedFolder {
    id: String!
    name: String!
    status: String!
    description: String
    breadcrumbs: [Breadcrumb!]!
    parentId: String
    subfolders: [SharedFolder!]!
    resources: [FolderResource!]!
    created: String!
    updated: String!
    owner: Owner
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

  type MyNdlaGroup {
    id: String!
    displayName: String!
    isPrimarySchool: Boolean!
    parentId: String
  }

  type MyNdlaPersonalData {
    id: Int!
    feideId: String!
    username: String!
    email: String!
    displayName: String!
    favoriteSubjects: [String!]!
    role: String!
    arenaEnabled: Boolean!
    organization: String!
    groups: [MyNdlaGroup!]!
  }

  type ConfigMetaBoolean {
    key: String!
    value: Boolean!
  }

  type ConfigMetaStringList {
    key: String!
    value: [String!]!
  }

  type ResourceMetaData {
    images: [ImageLicense!]!
    audios: [AudioLicense!]!
    podcasts: [PodcastLicense!]!
    brightcoves: [BrightcoveLicense!]!
    h5ps: [H5pLicense!]!
    concepts: [ConceptLicense!]!
    glosses: [GlossLicense!]!
  }

  type ResourceEmbed {
    content: String!
    meta: ResourceMetaData!
  }

  input ResourceEmbedInput {
    id: String!
    type: String!
    conceptType: String
  }

  type CategoryBreadcrumb {
    id: Int!
    title: String!
  }

  type UserFolder {
    folders: [Folder!]!
    sharedFolders: [SharedFolder!]!
  }

  type ImageV3 {
    fileName: String!
    size: Int!
    contentType: String!
    imageUrl: String!
    dimensions: ImageDimensions
    language: String!
  }

  type ImageMetaInformationV3 {
    id: String!
    metaUrl: String!
    title: Title!
    alttext: ImageAltText!
    copyright: Copyright!
    tags: Tags!
    caption: Caption!
    supportedLanguages: [String!]!
    created: String!
    createdBy: String!
    modelRelease: String!
    editorNotes: [EditorNote!]
    image: ImageV3!
  }

  type ImageSearch {
    totalCount: Int!
    page: Int!
    pageSize: Int!
    language: String!
    results: [ImageMetaInformationV3!]!
  }

  type ExternalOpengraph {
    title: String
    description: String
    url: String
    imageUrl: String
    imageAlt: String
  }

  type Query {
    node(id: String, rootId: String, parentId: String, contextId: String): Node
    nodes(
      nodeType: String
      contentUri: String
      metadataFilterKey: String
      metadataFilterValue: String
      filterVisible: Boolean
      ids: [String!]
    ): [Node!]
    nodeByArticleId(articleId: String, nodeId: String): Node
    resource(id: String!, subjectId: String, topicId: String): Resource
    articleResource(articleId: String, taxonomyId: String): Resource
    article(id: String!): Article
    subject(id: String!): Subject
    subjectpage(id: Int!): SubjectPage
    filmfrontpage: FilmFrontpage
    learningpath(pathId: String!): Learningpath
    myNdlaLearningpath(pathId: String!): MyNdlaLearningpath
    myLearningpaths: [MyNdlaLearningpath!]
    programmes: [ProgrammePage!]
    programme(path: String, contextId: String): ProgrammePage
    subjects(metadataFilterKey: String, metadataFilterValue: String, filterVisible: Boolean, ids: [String!]): [Subject!]
    topic(id: String!, subjectId: String): Topic
    topics(contentUri: String!, filterVisible: Boolean): [Topic!]
    frontpage: FrontpageMenu
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
      levels: String
      sort: String
      fallback: String
      subjects: String
      languageFilter: String
      relevance: String
      grepCodes: String
      traits: [String!]
      aggregatePaths: [String!]
      filterInactive: Boolean
      license: String
      resultTypes: String
      nodeTypes: String
      tags: [String!]
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
      filterInactive: Boolean
      license: String
      tags: [String!]
    ): [GroupSearch!]
    searchWithoutPagination(
      query: String
      contextTypes: String
      language: String
      ids: [Int!]
      resourceTypes: String
      levels: String
      sort: String
      fallback: String
      subjects: String
      languageFilter: String
      relevance: String
      license: String
      tags: [String!]
    ): SearchWithoutPagination
    audio(id: Int!): Audio
    podcastSearch(page: Int!, pageSize: Int!, fallback: Boolean): AudioSearch
    podcastSeries(id: Int!): PodcastSeriesWithEpisodes
    podcastSeriesSearch(page: Int!, pageSize: Int!, fallback: Boolean): PodcastSeriesSearch
    alerts: [UptimeAlert]
    folders(includeSubfolders: Boolean, includeResources: Boolean): UserFolder!
    folderResourceMeta(resource: FolderResourceMetaSearchInput!): FolderResourceMeta
    folderResourceMetaSearch(resources: [FolderResourceMetaSearchInput!]!): [FolderResourceMeta!]!
    folder(id: String!, includeSubfolders: Boolean, includeResources: Boolean): Folder!
    sharedFolder(id: String!): SharedFolder!
    allFolderResources(size: Int): [FolderResource!]!
    personalData: MyNdlaPersonalData
    image(id: String!): ImageMetaInformationV2
    examLockStatus: ConfigMetaBoolean!
    aiEnabledOrgs: ConfigMetaStringList
    arenaEnabledOrgs: ConfigMetaStringList
    resourceEmbed(id: String!, type: String!): ResourceEmbed!
    resourceEmbeds(resources: [ResourceEmbedInput!]!): ResourceEmbed!
    subjectCollection(language: String!): [Subject!]
    imageSearch(query: String, page: Int, pageSize: Int, license: String): ImageSearch!
    imageV3(id: String!): ImageMetaInformationV3
    learningpathStepOembed(url: String!): LearningpathStepOembed!
    opengraph(url: String!): ExternalOpengraph
  }

  type Mutation {
    addFolder(name: String!, parentId: String, status: String, description: String): Folder!
    updateFolder(id: String!, name: String, status: String, description: String): Folder!
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
    updatePersonalData(favoriteSubjects: [String]): MyNdlaPersonalData!
    sortFolders(parentId: String, sortedIds: [String!]!): SortResult!
    sortResources(parentId: String!, sortedIds: [String!]!): SortResult!
    sortSavedSharedFolders(sortedIds: [String!]!): SortResult!
    updateFolderStatus(folderId: String!, status: String!): [String!]!
    copySharedFolder(folderId: String!, destinationFolderId: String): Folder!
    transformArticleContent(
      content: String!
      visualElement: String
      subject: String
      previewH5p: Boolean
      draftConcept: Boolean
      absoluteUrl: Boolean
    ): String!
    favoriteSharedFolder(folderId: String!): String!
    unFavoriteSharedFolder(folderId: String!): String!
    updateLearningpathStatus(id: Int!, status: String!): MyNdlaLearningpath!
    deleteLearningpath(id: Int!): Boolean
    newLearningpath(params: LearningpathNewInput!): MyNdlaLearningpath!
    updateLearningpath(learningpathId: Int!, params: LearningpathUpdateInput!): MyNdlaLearningpath!
    newLearningpathStep(learningpathId: Int!, params: LearningpathStepNewInput!): MyNdlaLearningpathStep!
    updateLearningpathStep(
      learningpathId: Int!
      learningstepId: Int!
      params: LearningpathStepUpdateInput!
    ): MyNdlaLearningpathStep!
    deleteLearningpathStep(learningpathId: Int!, learningstepId: Int!): Boolean
    copyLearningpath(learningpathId: Int!, params: LearningpathCopyInput!): MyNdlaLearningpath!
    updateLearningpathStepSeqNo(learningpathId: Int!, learningpathStepId: Int!, seqNo: Int!): LearningpathSeqNo!
  }
`;

const schema = makeExecutableSchema({
  typeDefs,
  resolverValidationOptions: { requireResolversForResolveType: "ignore" },
});

export default schema;
