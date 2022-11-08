import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T;
export type InputMaybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  StringRecord: any;
};

export type GQLAggregationResult = {
  __typename?: 'AggregationResult';
  docCountErrorUpperBound: Scalars['Int'];
  field: Scalars['String'];
  sumOtherDocCount: Scalars['Int'];
  values: Array<GQLBucketResult>;
};

export type GQLArticle = {
  __typename?: 'Article';
  articleType: Scalars['String'];
  availability?: Maybe<Scalars['String']>;
  competenceGoals?: Maybe<Array<GQLCompetenceGoal>>;
  conceptIds?: Maybe<Array<Scalars['Int']>>;
  concepts?: Maybe<Array<GQLConcept>>;
  content: Scalars['String'];
  copyright: GQLCopyright;
  coreElements?: Maybe<Array<GQLCoreElement>>;
  created: Scalars['String'];
  crossSubjectTopics?: Maybe<Array<GQLCrossSubjectElement>>;
  grepCodes?: Maybe<Array<Scalars['String']>>;
  id: Scalars['Int'];
  introduction?: Maybe<Scalars['String']>;
  metaData?: Maybe<GQLArticleMetaData>;
  metaDescription: Scalars['String'];
  metaImage?: Maybe<GQLMetaImage>;
  oembed?: Maybe<Scalars['String']>;
  oldNdlaUrl?: Maybe<Scalars['String']>;
  published: Scalars['String'];
  relatedContent?: Maybe<Array<GQLRelatedContent>>;
  requiredLibraries?: Maybe<Array<GQLArticleRequiredLibrary>>;
  revision: Scalars['Int'];
  revisionDate?: Maybe<Scalars['String']>;
  supportedLanguages?: Maybe<Array<Scalars['String']>>;
  tags?: Maybe<Array<Scalars['String']>>;
  title: Scalars['String'];
  updated: Scalars['String'];
  visualElement?: Maybe<GQLVisualElement>;
};


export type GQLArticleCrossSubjectTopicsArgs = {
  subjectId?: InputMaybe<Scalars['String']>;
};

export type GQLArticleFolderResourceMeta = GQLFolderResourceMeta & {
  __typename?: 'ArticleFolderResourceMeta';
  description: Scalars['String'];
  id: Scalars['Int'];
  metaImage?: Maybe<GQLMetaImage>;
  resourceTypes: Array<GQLFolderResourceResourceType>;
  title: Scalars['String'];
  type: Scalars['String'];
};

export type GQLArticleMetaData = {
  __typename?: 'ArticleMetaData';
  audios?: Maybe<Array<GQLAudioLicense>>;
  brightcoves?: Maybe<Array<GQLBrightcoveLicense>>;
  concepts?: Maybe<Array<GQLConceptLicense>>;
  copyText?: Maybe<Scalars['String']>;
  footnotes?: Maybe<Array<GQLFootNote>>;
  h5ps?: Maybe<Array<GQLH5pLicense>>;
  images?: Maybe<Array<GQLImageLicense>>;
  podcasts?: Maybe<Array<GQLPodcastLicense>>;
};

export type GQLArticleRequiredLibrary = {
  __typename?: 'ArticleRequiredLibrary';
  mediaType: Scalars['String'];
  name: Scalars['String'];
  url: Scalars['String'];
};

export type GQLArticleSearchResult = GQLSearchResult & {
  __typename?: 'ArticleSearchResult';
  contexts: Array<GQLSearchContext>;
  id: Scalars['Int'];
  metaDescription: Scalars['String'];
  metaImage?: Maybe<GQLMetaImage>;
  supportedLanguages: Array<Scalars['String']>;
  title: Scalars['String'];
  traits: Array<Scalars['String']>;
  url: Scalars['String'];
};

export type GQLAudio = GQLAudioBase & {
  __typename?: 'Audio';
  audioFile: GQLAudioFile;
  audioType: Scalars['String'];
  copyright: GQLCopyright;
  created: Scalars['String'];
  id: Scalars['Int'];
  manuscript?: Maybe<GQLManuscript>;
  podcastMeta?: Maybe<GQLPodcastMeta>;
  revision: Scalars['Int'];
  supportedLanguages: Array<Scalars['String']>;
  tags: GQLTags;
  title: GQLTitle;
  updated: Scalars['String'];
};

export type GQLAudioBase = {
  audioFile: GQLAudioFile;
  audioType: Scalars['String'];
  copyright: GQLCopyright;
  created: Scalars['String'];
  id: Scalars['Int'];
  manuscript?: Maybe<GQLManuscript>;
  podcastMeta?: Maybe<GQLPodcastMeta>;
  revision: Scalars['Int'];
  supportedLanguages: Array<Scalars['String']>;
  tags: GQLTags;
  title: GQLTitle;
  updated: Scalars['String'];
};

export type GQLAudioFile = {
  __typename?: 'AudioFile';
  fileSize: Scalars['Int'];
  language: Scalars['String'];
  mimeType: Scalars['String'];
  url: Scalars['String'];
};

export type GQLAudioLicense = {
  __typename?: 'AudioLicense';
  copyText?: Maybe<Scalars['String']>;
  copyright: GQLCopyright;
  src: Scalars['String'];
  title: Scalars['String'];
};

export type GQLAudioSearch = {
  __typename?: 'AudioSearch';
  language: Scalars['String'];
  page?: Maybe<Scalars['Int']>;
  pageSize: Scalars['Int'];
  results: Array<GQLAudioSummary>;
  totalCount: Scalars['Int'];
};

export type GQLAudioSummary = {
  __typename?: 'AudioSummary';
  audioType: Scalars['String'];
  id: Scalars['Int'];
  lastUpdated: Scalars['String'];
  license: Scalars['String'];
  manuscript?: Maybe<GQLManuscript>;
  podcastMeta?: Maybe<GQLPodcastMeta>;
  supportedLanguages: Array<Scalars['String']>;
  title: GQLTitle;
  url: Scalars['String'];
};

export type GQLAudioWithSeries = GQLAudioBase & {
  __typename?: 'AudioWithSeries';
  audioFile: GQLAudioFile;
  audioType: Scalars['String'];
  copyright: GQLCopyright;
  created: Scalars['String'];
  id: Scalars['Int'];
  manuscript?: Maybe<GQLManuscript>;
  podcastMeta?: Maybe<GQLPodcastMeta>;
  revision: Scalars['Int'];
  series?: Maybe<GQLPodcastSeries>;
  supportedLanguages: Array<Scalars['String']>;
  tags: GQLTags;
  title: GQLTitle;
  updated: Scalars['String'];
};

export type GQLBreadcrumb = {
  __typename?: 'Breadcrumb';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type GQLBrightcoveElement = {
  __typename?: 'BrightcoveElement';
  account?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  cover?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  download?: Maybe<Scalars['String']>;
  iframe?: Maybe<GQLBrightcoveIframe>;
  player?: Maybe<Scalars['String']>;
  src?: Maybe<Scalars['String']>;
  uploadDate?: Maybe<Scalars['String']>;
  videoid?: Maybe<Scalars['String']>;
};

export type GQLBrightcoveIframe = {
  __typename?: 'BrightcoveIframe';
  height: Scalars['Int'];
  src: Scalars['String'];
  width: Scalars['Int'];
};

export type GQLBrightcoveLicense = {
  __typename?: 'BrightcoveLicense';
  copyright: GQLCopyright;
  cover?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  download?: Maybe<Scalars['String']>;
  iframe?: Maybe<GQLBrightcoveIframe>;
  src?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  uploadDate?: Maybe<Scalars['String']>;
};

export type GQLBucketResult = {
  __typename?: 'BucketResult';
  count: Scalars['Int'];
  value: Scalars['String'];
};

export type GQLCategory = {
  __typename?: 'Category';
  name: Scalars['String'];
  subjects: Array<GQLSubject>;
};

export type GQLCompetenceGoal = {
  __typename?: 'CompetenceGoal';
  code?: Maybe<Scalars['String']>;
  competenceAimSetId?: Maybe<Scalars['String']>;
  competenceGoalSet?: Maybe<GQLReference>;
  competenceGoalSetCode?: Maybe<Scalars['String']>;
  coreElements?: Maybe<Array<GQLElement>>;
  coreElementsCodes?: Maybe<Array<GQLElement>>;
  crossSubjectTopics?: Maybe<Array<GQLElement>>;
  crossSubjectTopicsCodes?: Maybe<Array<GQLElement>>;
  curriculum?: Maybe<GQLReference>;
  curriculumCode?: Maybe<Scalars['String']>;
  curriculumId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  language?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  type: Scalars['String'];
};

export type GQLConcept = {
  __typename?: 'Concept';
  articleIds: Array<Scalars['Int']>;
  articles?: Maybe<Array<GQLMeta>>;
  content: Scalars['String'];
  copyright?: Maybe<GQLConceptCopyright>;
  created: Scalars['String'];
  id: Scalars['Int'];
  image?: Maybe<GQLImageLicense>;
  metaImage?: Maybe<GQLMetaImage>;
  source?: Maybe<Scalars['String']>;
  subjectIds?: Maybe<Array<Scalars['String']>>;
  subjectNames?: Maybe<Array<Scalars['String']>>;
  tags: Array<Scalars['String']>;
  title: Scalars['String'];
  visualElement?: Maybe<GQLVisualElement>;
};

export type GQLConceptCopyright = {
  __typename?: 'ConceptCopyright';
  creators: Array<GQLContributor>;
  license?: Maybe<GQLLicense>;
  origin?: Maybe<Scalars['String']>;
  processors: Array<GQLContributor>;
  rightsholders: Array<GQLContributor>;
};

export type GQLConceptLicense = {
  __typename?: 'ConceptLicense';
  copyright?: Maybe<GQLConceptCopyright>;
  src?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type GQLConceptResult = {
  __typename?: 'ConceptResult';
  concepts: Array<GQLConcept>;
  language: Scalars['String'];
  page?: Maybe<Scalars['Int']>;
  pageSize: Scalars['Int'];
  totalCount: Scalars['Int'];
};

export type GQLContributor = {
  __typename?: 'Contributor';
  name: Scalars['String'];
  type: Scalars['String'];
};

export type GQLCopyright = {
  __typename?: 'Copyright';
  creators: Array<GQLContributor>;
  license: GQLLicense;
  origin?: Maybe<Scalars['String']>;
  processors: Array<GQLContributor>;
  rightsholders: Array<GQLContributor>;
};

export type GQLCoreElement = {
  __typename?: 'CoreElement';
  curriculum?: Maybe<GQLReference>;
  curriculumCode?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  language?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type GQLCoverPhoto = {
  __typename?: 'CoverPhoto';
  altText: Scalars['String'];
  id: Scalars['String'];
  url: Scalars['String'];
};

export type GQLCrossSubjectElement = {
  __typename?: 'CrossSubjectElement';
  code?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type GQLDescription = {
  __typename?: 'Description';
  description: Scalars['String'];
  language: Scalars['String'];
};

export type GQLElement = {
  __typename?: 'Element';
  explanation: Array<Maybe<Scalars['String']>>;
  reference: GQLReference;
};

export type GQLEmbedVisualelement = {
  __typename?: 'EmbedVisualelement';
  visualElement?: Maybe<GQLVisualElement>;
};

export type GQLFilmFrontpage = {
  __typename?: 'FilmFrontpage';
  about: Array<GQLFilmPageAbout>;
  movieThemes: Array<GQLMovieTheme>;
  name: Scalars['String'];
  slideShow: Array<GQLMovie>;
};

export type GQLFilmPageAbout = {
  __typename?: 'FilmPageAbout';
  description: Scalars['String'];
  language: Scalars['String'];
  title: Scalars['String'];
  visualElement: GQLSubjectPageVisualElement;
};

export type GQLFolder = {
  __typename?: 'Folder';
  breadcrumbs: Array<GQLBreadcrumb>;
  id: Scalars['String'];
  name: Scalars['String'];
  parentId?: Maybe<Scalars['String']>;
  resources: Array<GQLFolderResource>;
  status: Scalars['String'];
  subfolders: Array<GQLFolder>;
};

export type GQLFolderResource = {
  __typename?: 'FolderResource';
  created: Scalars['String'];
  id: Scalars['String'];
  path: Scalars['String'];
  resourceId?: Maybe<Scalars['Int']>;
  resourceType: Scalars['String'];
  tags: Array<Scalars['String']>;
};

export type GQLFolderResourceMeta = {
  description: Scalars['String'];
  id: Scalars['Int'];
  metaImage?: Maybe<GQLMetaImage>;
  resourceTypes: Array<GQLFolderResourceResourceType>;
  title: Scalars['String'];
  type: Scalars['String'];
};

export type GQLFolderResourceMetaSearchInput = {
  id: Scalars['Int'];
  path: Scalars['String'];
  resourceType: Scalars['String'];
};

export type GQLFolderResourceResourceType = {
  __typename?: 'FolderResourceResourceType';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type GQLFootNote = {
  __typename?: 'FootNote';
  authors: Array<Scalars['String']>;
  edition?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['String']>;
  ref: Scalars['Int'];
  title: Scalars['String'];
  url?: Maybe<Scalars['String']>;
  year: Scalars['String'];
};

export type GQLFrontPageResources = {
  __typename?: 'FrontPageResources';
  results: Array<GQLFrontpageSearchResult>;
  suggestions: Array<GQLSuggestionResult>;
  totalCount: Scalars['Int'];
};

export type GQLFrontpage = {
  __typename?: 'Frontpage';
  categories: Array<GQLCategory>;
  topical: Array<GQLResource>;
};

export type GQLFrontpageSearch = {
  __typename?: 'FrontpageSearch';
  learningResources: GQLFrontPageResources;
  topicResources: GQLFrontPageResources;
};

export type GQLFrontpageSearchResult = {
  __typename?: 'FrontpageSearchResult';
  filters: Array<GQLSearchContextFilter>;
  id: Scalars['String'];
  name: Scalars['String'];
  path: Scalars['String'];
  resourceTypes: Array<GQLSearchContextResourceTypes>;
  subject: Scalars['String'];
};

export type GQLGroupSearch = {
  __typename?: 'GroupSearch';
  aggregations: Array<GQLAggregationResult>;
  language: Scalars['String'];
  page?: Maybe<Scalars['Int']>;
  pageSize: Scalars['Int'];
  resourceType: Scalars['String'];
  resources: Array<GQLGroupSearchResult>;
  suggestions: Array<GQLSuggestionResult>;
  totalCount: Scalars['Int'];
};

export type GQLGroupSearchResult = {
  __typename?: 'GroupSearchResult';
  contexts: Array<GQLSearchContext>;
  id: Scalars['Int'];
  ingress: Scalars['String'];
  metaImage?: Maybe<GQLMetaImage>;
  name: Scalars['String'];
  path: Scalars['String'];
  traits: Array<Scalars['String']>;
  url: Scalars['String'];
};

export type GQLH5pElement = {
  __typename?: 'H5pElement';
  src?: Maybe<Scalars['String']>;
  thumbnail?: Maybe<Scalars['String']>;
};

export type GQLH5pLicense = {
  __typename?: 'H5pLicense';
  copyright: GQLCopyright;
  src?: Maybe<Scalars['String']>;
  thumbnail?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type GQLImageElement = {
  __typename?: 'ImageElement';
  alt?: Maybe<Scalars['String']>;
  altText: Scalars['String'];
  caption?: Maybe<Scalars['String']>;
  contentType?: Maybe<Scalars['String']>;
  copyText?: Maybe<Scalars['String']>;
  focalX?: Maybe<Scalars['Float']>;
  focalY?: Maybe<Scalars['Float']>;
  lowerRightX?: Maybe<Scalars['Float']>;
  lowerRightY?: Maybe<Scalars['Float']>;
  resourceid?: Maybe<Scalars['String']>;
  src: Scalars['String'];
  upperLeftX?: Maybe<Scalars['Float']>;
  upperLeftY?: Maybe<Scalars['Float']>;
};

export type GQLImageLicense = {
  __typename?: 'ImageLicense';
  altText: Scalars['String'];
  contentType?: Maybe<Scalars['String']>;
  copyText?: Maybe<Scalars['String']>;
  copyright: GQLCopyright;
  src: Scalars['String'];
  title: Scalars['String'];
};

export type GQLImageMetaInformation = {
  __typename?: 'ImageMetaInformation';
  altText: Scalars['String'];
  caption: Scalars['String'];
  contentType: Scalars['String'];
  copyright: GQLCopyright;
  created: Scalars['String'];
  createdBy: Scalars['String'];
  id: Scalars['String'];
  imageUrl: Scalars['String'];
  metaUrl: Scalars['String'];
  size: Scalars['Int'];
  supportedLanguages: Array<Scalars['String']>;
  tags: Array<Scalars['String']>;
  title: Scalars['String'];
};

export type GQLLearningpath = {
  __typename?: 'Learningpath';
  canEdit: Scalars['Boolean'];
  copyright: GQLLearningpathCopyright;
  coverphoto?: Maybe<GQLLearningpathCoverphoto>;
  description: Scalars['String'];
  duration?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  isBasedOn?: Maybe<Scalars['Int']>;
  lastUpdated: Scalars['String'];
  learningstepUrl: Scalars['String'];
  learningsteps: Array<GQLLearningpathStep>;
  metaUrl: Scalars['String'];
  revision: Scalars['Int'];
  status: Scalars['String'];
  supportedLanguages: Array<Scalars['String']>;
  tags: Array<Scalars['String']>;
  title: Scalars['String'];
  verificationStatus: Scalars['String'];
};

export type GQLLearningpathCopyright = {
  __typename?: 'LearningpathCopyright';
  contributors: Array<GQLContributor>;
  license: GQLLicense;
};

export type GQLLearningpathCoverphoto = {
  __typename?: 'LearningpathCoverphoto';
  metaUrl: Scalars['String'];
  url: Scalars['String'];
};

export type GQLLearningpathFolderResourceMeta = GQLFolderResourceMeta & {
  __typename?: 'LearningpathFolderResourceMeta';
  description: Scalars['String'];
  id: Scalars['Int'];
  metaImage?: Maybe<GQLMetaImage>;
  resourceTypes: Array<GQLFolderResourceResourceType>;
  title: Scalars['String'];
  type: Scalars['String'];
};

export type GQLLearningpathSearchResult = GQLSearchResult & {
  __typename?: 'LearningpathSearchResult';
  contexts: Array<GQLSearchContext>;
  id: Scalars['Int'];
  metaDescription: Scalars['String'];
  metaImage?: Maybe<GQLMetaImage>;
  supportedLanguages: Array<Scalars['String']>;
  title: Scalars['String'];
  traits: Array<Scalars['String']>;
  url: Scalars['String'];
};

export type GQLLearningpathStep = {
  __typename?: 'LearningpathStep';
  article?: Maybe<GQLArticle>;
  description?: Maybe<Scalars['String']>;
  embedUrl?: Maybe<GQLLearningpathStepEmbedUrl>;
  id: Scalars['Int'];
  license?: Maybe<GQLLicense>;
  metaUrl: Scalars['String'];
  oembed?: Maybe<GQLLearningpathStepOembed>;
  resource?: Maybe<GQLResource>;
  revision: Scalars['Int'];
  seqNo: Scalars['Int'];
  showTitle: Scalars['Boolean'];
  status: Scalars['String'];
  supportedLanguages: Array<Scalars['String']>;
  title: Scalars['String'];
  type: Scalars['String'];
};

export type GQLLearningpathStepEmbedUrl = {
  __typename?: 'LearningpathStepEmbedUrl';
  embedType: Scalars['String'];
  url: Scalars['String'];
};

export type GQLLearningpathStepOembed = {
  __typename?: 'LearningpathStepOembed';
  height: Scalars['Int'];
  html: Scalars['String'];
  type: Scalars['String'];
  version: Scalars['String'];
  width: Scalars['Int'];
};

export type GQLLicense = {
  __typename?: 'License';
  description?: Maybe<Scalars['String']>;
  license: Scalars['String'];
  url?: Maybe<Scalars['String']>;
};

export type GQLListingPage = {
  __typename?: 'ListingPage';
  subjects?: Maybe<Array<GQLSubject>>;
  tags?: Maybe<Array<Scalars['String']>>;
};

export type GQLManuscript = {
  __typename?: 'Manuscript';
  language: Scalars['String'];
  manuscript: Scalars['String'];
};

export type GQLMeta = {
  __typename?: 'Meta';
  availability?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  introduction?: Maybe<Scalars['String']>;
  lastUpdated?: Maybe<Scalars['String']>;
  metaDescription?: Maybe<Scalars['String']>;
  metaImage?: Maybe<GQLMetaImage>;
  title: Scalars['String'];
};

export type GQLMetaImage = {
  __typename?: 'MetaImage';
  alt: Scalars['String'];
  url: Scalars['String'];
};

export type GQLMovie = {
  __typename?: 'Movie';
  id: Scalars['String'];
  metaDescription: Scalars['String'];
  metaImage?: Maybe<GQLMetaImage>;
  path: Scalars['String'];
  resourceTypes: Array<GQLResourceType>;
  title: Scalars['String'];
};

export type GQLMovieMeta = {
  __typename?: 'MovieMeta';
  metaDescription?: Maybe<Scalars['String']>;
  metaImage?: Maybe<GQLMetaImage>;
  title: Scalars['String'];
};

export type GQLMoviePath = {
  __typename?: 'MoviePath';
  path?: Maybe<Scalars['String']>;
  paths?: Maybe<Array<Scalars['String']>>;
};

export type GQLMovieResourceTypes = {
  __typename?: 'MovieResourceTypes';
  resourceTypes?: Maybe<Array<GQLResourceType>>;
};

export type GQLMovieTheme = {
  __typename?: 'MovieTheme';
  movies: Array<GQLMovie>;
  name: Array<GQLName>;
};

export type GQLMutation = {
  __typename?: 'Mutation';
  addFolder: GQLFolder;
  addFolderResource: GQLFolderResource;
  deleteFolder: Scalars['String'];
  deleteFolderResource: Scalars['String'];
  deletePersonalData: Scalars['Boolean'];
  sortFolders: GQLSortResult;
  sortResources: GQLSortResult;
  updateFolder: GQLFolder;
  updateFolderResource: GQLFolderResource;
};


export type GQLMutationAddFolderArgs = {
  name: Scalars['String'];
  parentId?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
};


export type GQLMutationAddFolderResourceArgs = {
  folderId: Scalars['String'];
  path: Scalars['String'];
  resourceId: Scalars['Int'];
  resourceType: Scalars['String'];
  tags?: InputMaybe<Array<Scalars['String']>>;
};


export type GQLMutationDeleteFolderArgs = {
  id: Scalars['String'];
};


export type GQLMutationDeleteFolderResourceArgs = {
  folderId: Scalars['String'];
  resourceId: Scalars['String'];
};


export type GQLMutationSortFoldersArgs = {
  parentId?: InputMaybe<Scalars['String']>;
  sortedIds: Array<Scalars['String']>;
};


export type GQLMutationSortResourcesArgs = {
  parentId: Scalars['String'];
  sortedIds: Array<Scalars['String']>;
};


export type GQLMutationUpdateFolderArgs = {
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
};


export type GQLMutationUpdateFolderResourceArgs = {
  id: Scalars['String'];
  tags?: InputMaybe<Array<Scalars['String']>>;
};

export type GQLName = {
  __typename?: 'Name';
  language: Scalars['String'];
  name: Scalars['String'];
};

export type GQLNewFolder = {
  __typename?: 'NewFolder';
  name: Scalars['String'];
  parentId?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type GQLNewFolderResource = {
  __typename?: 'NewFolderResource';
  path: Scalars['String'];
  resourceType: Scalars['String'];
  tags?: Maybe<Array<Scalars['String']>>;
};

export type GQLPodcastLicense = {
  __typename?: 'PodcastLicense';
  copyText?: Maybe<Scalars['String']>;
  copyright: GQLCopyright;
  description?: Maybe<Scalars['String']>;
  src: Scalars['String'];
  title: Scalars['String'];
};

export type GQLPodcastMeta = {
  __typename?: 'PodcastMeta';
  image?: Maybe<GQLImageMetaInformation>;
  introduction: Scalars['String'];
  language: Scalars['String'];
};

export type GQLPodcastSeries = GQLPodcastSeriesBase & {
  __typename?: 'PodcastSeries';
  coverPhoto: GQLCoverPhoto;
  description: GQLDescription;
  id: Scalars['Int'];
  supportedLanguages: Array<Scalars['String']>;
  title: GQLTitle;
};

export type GQLPodcastSeriesBase = {
  coverPhoto: GQLCoverPhoto;
  description: GQLDescription;
  id: Scalars['Int'];
  supportedLanguages: Array<Scalars['String']>;
  title: GQLTitle;
};

export type GQLPodcastSeriesSearch = {
  __typename?: 'PodcastSeriesSearch';
  language: Scalars['String'];
  page?: Maybe<Scalars['Int']>;
  pageSize: Scalars['Int'];
  results: Array<GQLPodcastSeriesSummary>;
  totalCount: Scalars['Int'];
};

export type GQLPodcastSeriesSummary = {
  __typename?: 'PodcastSeriesSummary';
  coverPhoto: GQLCoverPhoto;
  description: GQLDescription;
  episodes?: Maybe<Array<GQLAudioSummary>>;
  id: Scalars['Int'];
  supportedLanguages?: Maybe<Array<Scalars['String']>>;
  title: GQLTitle;
};

export type GQLPodcastSeriesWithEpisodes = GQLPodcastSeriesBase & {
  __typename?: 'PodcastSeriesWithEpisodes';
  coverPhoto: GQLCoverPhoto;
  description: GQLDescription;
  episodes?: Maybe<Array<GQLAudio>>;
  id: Scalars['Int'];
  supportedLanguages: Array<Scalars['String']>;
  title: GQLTitle;
};

export type GQLQuery = {
  __typename?: 'Query';
  alerts?: Maybe<Array<Maybe<GQLUptimeAlert>>>;
  allFolderResources: Array<GQLFolderResource>;
  article?: Maybe<GQLArticle>;
  competenceGoal?: Maybe<GQLCompetenceGoal>;
  competenceGoals?: Maybe<Array<GQLCompetenceGoal>>;
  concept?: Maybe<GQLConcept>;
  conceptSearch?: Maybe<GQLConceptResult>;
  coreElement?: Maybe<GQLCoreElement>;
  coreElements?: Maybe<Array<GQLCoreElement>>;
  filmfrontpage?: Maybe<GQLFilmFrontpage>;
  folder: GQLFolder;
  folderResourceMeta?: Maybe<GQLFolderResourceMeta>;
  folderResourceMetaSearch: Array<GQLFolderResourceMeta>;
  folders: Array<GQLFolder>;
  frontpage?: Maybe<GQLFrontpage>;
  frontpageSearch?: Maybe<GQLFrontpageSearch>;
  groupSearch?: Maybe<Array<GQLGroupSearch>>;
  learningpath?: Maybe<GQLLearningpath>;
  listingPage?: Maybe<GQLListingPage>;
  podcast?: Maybe<GQLAudioWithSeries>;
  podcastSearch?: Maybe<GQLAudioSearch>;
  podcastSeries?: Maybe<GQLPodcastSeriesWithEpisodes>;
  podcastSeriesSearch?: Maybe<GQLPodcastSeriesSearch>;
  resource?: Maybe<GQLResource>;
  resourceTypes?: Maybe<Array<GQLResourceTypeDefinition>>;
  search?: Maybe<GQLSearch>;
  searchWithoutPagination?: Maybe<GQLSearchWithoutPagination>;
  subject?: Maybe<GQLSubject>;
  subjectpage?: Maybe<GQLSubjectPage>;
  subjects?: Maybe<Array<GQLSubject>>;
  topic?: Maybe<GQLTopic>;
  topics?: Maybe<Array<GQLTopic>>;
};


export type GQLQueryAllFolderResourcesArgs = {
  size?: InputMaybe<Scalars['Int']>;
};


export type GQLQueryArticleArgs = {
  id: Scalars['String'];
  isOembed?: InputMaybe<Scalars['String']>;
  path?: InputMaybe<Scalars['String']>;
  showVisualElement?: InputMaybe<Scalars['String']>;
  subjectId?: InputMaybe<Scalars['String']>;
};


export type GQLQueryCompetenceGoalArgs = {
  code: Scalars['String'];
  language?: InputMaybe<Scalars['String']>;
};


export type GQLQueryCompetenceGoalsArgs = {
  codes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  language?: InputMaybe<Scalars['String']>;
  nodeId?: InputMaybe<Scalars['String']>;
};


export type GQLQueryConceptArgs = {
  id: Scalars['Int'];
};


export type GQLQueryConceptSearchArgs = {
  exactMatch?: InputMaybe<Scalars['Boolean']>;
  fallback?: InputMaybe<Scalars['Boolean']>;
  ids?: InputMaybe<Array<Scalars['Int']>>;
  language?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  query?: InputMaybe<Scalars['String']>;
  subjects?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Scalars['String']>;
};


export type GQLQueryCoreElementArgs = {
  code: Scalars['String'];
  language?: InputMaybe<Scalars['String']>;
};


export type GQLQueryCoreElementsArgs = {
  codes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  language?: InputMaybe<Scalars['String']>;
};


export type GQLQueryFolderArgs = {
  id: Scalars['Int'];
  includeResources?: InputMaybe<Scalars['Boolean']>;
  includeSubfolders?: InputMaybe<Scalars['Boolean']>;
};


export type GQLQueryFolderResourceMetaArgs = {
  resource: GQLFolderResourceMetaSearchInput;
};


export type GQLQueryFolderResourceMetaSearchArgs = {
  resources: Array<GQLFolderResourceMetaSearchInput>;
};


export type GQLQueryFoldersArgs = {
  includeResources?: InputMaybe<Scalars['Boolean']>;
  includeSubfolders?: InputMaybe<Scalars['Boolean']>;
};


export type GQLQueryFrontpageSearchArgs = {
  query?: InputMaybe<Scalars['String']>;
};


export type GQLQueryGroupSearchArgs = {
  aggregatePaths?: InputMaybe<Array<Scalars['String']>>;
  contextTypes?: InputMaybe<Scalars['String']>;
  fallback?: InputMaybe<Scalars['String']>;
  grepCodes?: InputMaybe<Scalars['String']>;
  language?: InputMaybe<Scalars['String']>;
  levels?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  query?: InputMaybe<Scalars['String']>;
  resourceTypes?: InputMaybe<Scalars['String']>;
  subjects?: InputMaybe<Scalars['String']>;
};


export type GQLQueryLearningpathArgs = {
  pathId: Scalars['String'];
};


export type GQLQueryListingPageArgs = {
  subjects?: InputMaybe<Scalars['String']>;
};


export type GQLQueryPodcastArgs = {
  id: Scalars['Int'];
};


export type GQLQueryPodcastSearchArgs = {
  fallback?: InputMaybe<Scalars['Boolean']>;
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
};


export type GQLQueryPodcastSeriesArgs = {
  id: Scalars['Int'];
};


export type GQLQueryPodcastSeriesSearchArgs = {
  fallback?: InputMaybe<Scalars['Boolean']>;
  page: Scalars['Int'];
  pageSize: Scalars['Int'];
};


export type GQLQueryResourceArgs = {
  id: Scalars['String'];
  subjectId?: InputMaybe<Scalars['String']>;
  topicId?: InputMaybe<Scalars['String']>;
};


export type GQLQuerySearchArgs = {
  aggregatePaths?: InputMaybe<Array<Scalars['String']>>;
  contextFilters?: InputMaybe<Scalars['String']>;
  contextTypes?: InputMaybe<Scalars['String']>;
  fallback?: InputMaybe<Scalars['String']>;
  grepCodes?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<Scalars['Int']>>;
  language?: InputMaybe<Scalars['String']>;
  languageFilter?: InputMaybe<Scalars['String']>;
  levels?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  query?: InputMaybe<Scalars['String']>;
  relevance?: InputMaybe<Scalars['String']>;
  resourceTypes?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
  subjects?: InputMaybe<Scalars['String']>;
};


export type GQLQuerySearchWithoutPaginationArgs = {
  contextFilters?: InputMaybe<Scalars['String']>;
  contextTypes?: InputMaybe<Scalars['String']>;
  fallback?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<Scalars['Int']>>;
  language?: InputMaybe<Scalars['String']>;
  languageFilter?: InputMaybe<Scalars['String']>;
  levels?: InputMaybe<Scalars['String']>;
  query?: InputMaybe<Scalars['String']>;
  relevance?: InputMaybe<Scalars['String']>;
  resourceTypes?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
  subjects?: InputMaybe<Scalars['String']>;
};


export type GQLQuerySubjectArgs = {
  id: Scalars['String'];
};


export type GQLQuerySubjectpageArgs = {
  id: Scalars['Int'];
};


export type GQLQuerySubjectsArgs = {
  filterVisible?: InputMaybe<Scalars['Boolean']>;
  metadataFilterKey?: InputMaybe<Scalars['String']>;
  metadataFilterValue?: InputMaybe<Scalars['String']>;
};


export type GQLQueryTopicArgs = {
  id: Scalars['String'];
  subjectId?: InputMaybe<Scalars['String']>;
};


export type GQLQueryTopicsArgs = {
  contentUri?: InputMaybe<Scalars['String']>;
  filterVisible?: InputMaybe<Scalars['Boolean']>;
};

export type GQLReference = {
  __typename?: 'Reference';
  code?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  title: Scalars['String'];
};

export type GQLRelatedContent = {
  __typename?: 'RelatedContent';
  title: Scalars['String'];
  url: Scalars['String'];
};

export type GQLResource = GQLTaxonomyEntity & GQLWithArticle & {
  __typename?: 'Resource';
  article?: Maybe<GQLArticle>;
  availability?: Maybe<Scalars['String']>;
  breadcrumbs?: Maybe<Array<Array<Scalars['String']>>>;
  contentUri?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  learningpath?: Maybe<GQLLearningpath>;
  meta?: Maybe<GQLMeta>;
  metadata: GQLTaxonomyMetadata;
  name: Scalars['String'];
  parents?: Maybe<Array<GQLTopic>>;
  path: Scalars['String'];
  paths: Array<Scalars['String']>;
  rank?: Maybe<Scalars['Int']>;
  relevanceId?: Maybe<Scalars['String']>;
  resourceTypes?: Maybe<Array<GQLResourceType>>;
  supportedLanguages: Array<Scalars['String']>;
};


export type GQLResourceArticleArgs = {
  isOembed?: InputMaybe<Scalars['String']>;
  subjectId?: InputMaybe<Scalars['String']>;
};

export type GQLResourceType = {
  __typename?: 'ResourceType';
  id: Scalars['String'];
  name: Scalars['String'];
  resources?: Maybe<Array<GQLResource>>;
};


export type GQLResourceTypeResourcesArgs = {
  topicId: Scalars['String'];
};

export type GQLResourceTypeDefinition = {
  __typename?: 'ResourceTypeDefinition';
  id: Scalars['String'];
  name: Scalars['String'];
  subtypes?: Maybe<Array<GQLResourceTypeDefinition>>;
};

export type GQLSearch = {
  __typename?: 'Search';
  aggregations: Array<GQLAggregationResult>;
  concepts?: Maybe<GQLConceptResult>;
  language: Scalars['String'];
  page?: Maybe<Scalars['Int']>;
  pageSize: Scalars['Int'];
  results: Array<GQLSearchResult>;
  suggestions: Array<GQLSuggestionResult>;
  totalCount: Scalars['Int'];
};

export type GQLSearchContext = {
  __typename?: 'SearchContext';
  breadcrumbs: Array<Scalars['String']>;
  filters: Array<GQLSearchContextFilter>;
  id: Scalars['String'];
  language: Scalars['String'];
  learningResourceType: Scalars['String'];
  path: Scalars['String'];
  relevance: Scalars['String'];
  resourceTypes: Array<GQLSearchContextResourceTypes>;
  subject: Scalars['String'];
  subjectId: Scalars['String'];
};

export type GQLSearchContextFilter = {
  __typename?: 'SearchContextFilter';
  id: Scalars['String'];
  name: Scalars['String'];
  relevance: Scalars['String'];
};

export type GQLSearchContextResourceTypes = {
  __typename?: 'SearchContextResourceTypes';
  id: Scalars['String'];
  language: Scalars['String'];
  name: Scalars['String'];
};

export type GQLSearchResult = {
  contexts: Array<GQLSearchContext>;
  id: Scalars['Int'];
  metaDescription: Scalars['String'];
  metaImage?: Maybe<GQLMetaImage>;
  supportedLanguages: Array<Scalars['String']>;
  title: Scalars['String'];
  traits: Array<Scalars['String']>;
  url: Scalars['String'];
};

export type GQLSearchSuggestion = {
  __typename?: 'SearchSuggestion';
  length: Scalars['Int'];
  offset: Scalars['Int'];
  options: Array<GQLSuggestOption>;
  text: Scalars['String'];
};

export type GQLSearchWithoutPagination = {
  __typename?: 'SearchWithoutPagination';
  results: Array<GQLSearchResult>;
};

export type GQLSortResult = {
  __typename?: 'SortResult';
  parentId?: Maybe<Scalars['String']>;
  sortedIds: Array<Scalars['String']>;
};

export type GQLSubject = GQLTaxonomyEntity & {
  __typename?: 'Subject';
  allTopics?: Maybe<Array<GQLTopic>>;
  contentUri?: Maybe<Scalars['String']>;
  grepCodes: Array<Scalars['String']>;
  id: Scalars['String'];
  metadata: GQLTaxonomyMetadata;
  name: Scalars['String'];
  path: Scalars['String'];
  paths: Array<Scalars['String']>;
  rank?: Maybe<Scalars['Int']>;
  relevanceId: Scalars['String'];
  subjectpage?: Maybe<GQLSubjectPage>;
  supportedLanguages: Array<Scalars['String']>;
  topics?: Maybe<Array<GQLTopic>>;
};


export type GQLSubjectTopicsArgs = {
  all?: InputMaybe<Scalars['Boolean']>;
};

export type GQLSubjectPage = {
  __typename?: 'SubjectPage';
  about?: Maybe<GQLSubjectPageAbout>;
  banner: GQLSubjectPageBanner;
  editorsChoices: Array<GQLTaxonomyEntity>;
  facebook?: Maybe<Scalars['String']>;
  goTo: Array<GQLResourceTypeDefinition>;
  id: Scalars['Int'];
  latestContent?: Maybe<Array<GQLTaxonomyEntity>>;
  layout: Scalars['String'];
  metaDescription?: Maybe<Scalars['String']>;
  mostRead: Array<GQLTaxonomyEntity>;
  name: Scalars['String'];
  supportedLanguages: Array<Scalars['String']>;
  topical?: Maybe<GQLTaxonomyEntity>;
  twitter?: Maybe<Scalars['String']>;
};


export type GQLSubjectPageEditorsChoicesArgs = {
  subjectId?: InputMaybe<Scalars['String']>;
};


export type GQLSubjectPageLatestContentArgs = {
  subjectId?: InputMaybe<Scalars['String']>;
};


export type GQLSubjectPageMostReadArgs = {
  subjectId?: InputMaybe<Scalars['String']>;
};


export type GQLSubjectPageTopicalArgs = {
  subjectId?: InputMaybe<Scalars['String']>;
};

export type GQLSubjectPageAbout = {
  __typename?: 'SubjectPageAbout';
  description: Scalars['String'];
  title: Scalars['String'];
  visualElement: GQLSubjectPageVisualElement;
};

export type GQLSubjectPageBanner = {
  __typename?: 'SubjectPageBanner';
  desktopId: Scalars['String'];
  desktopUrl: Scalars['String'];
  mobileId?: Maybe<Scalars['String']>;
  mobileUrl?: Maybe<Scalars['String']>;
};

export type GQLSubjectPageVisualElement = {
  __typename?: 'SubjectPageVisualElement';
  alt?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  url: Scalars['String'];
};

export type GQLSuggestOption = {
  __typename?: 'SuggestOption';
  score: Scalars['Float'];
  text: Scalars['String'];
};

export type GQLSuggestionResult = {
  __typename?: 'SuggestionResult';
  name: Scalars['String'];
  suggestions: Array<GQLSearchSuggestion>;
};

export type GQLTags = {
  __typename?: 'Tags';
  language: Scalars['String'];
  tags: Array<Scalars['String']>;
};

export type GQLTaxonomyEntity = {
  contentUri?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  metadata: GQLTaxonomyMetadata;
  name: Scalars['String'];
  path: Scalars['String'];
  paths: Array<Scalars['String']>;
  rank?: Maybe<Scalars['Int']>;
  relevanceId?: Maybe<Scalars['String']>;
  supportedLanguages: Array<Scalars['String']>;
};

export type GQLTaxonomyMetadata = {
  __typename?: 'TaxonomyMetadata';
  customFields: Scalars['StringRecord'];
  grepCodes: Array<Scalars['String']>;
  visible: Scalars['Boolean'];
};

export type GQLTitle = {
  __typename?: 'Title';
  language: Scalars['String'];
  title: Scalars['String'];
};

export type GQLTopic = GQLTaxonomyEntity & GQLWithArticle & {
  __typename?: 'Topic';
  alternateTopics?: Maybe<Array<GQLTopic>>;
  article?: Maybe<GQLArticle>;
  availability?: Maybe<Scalars['String']>;
  breadcrumbs?: Maybe<Array<Array<Scalars['String']>>>;
  contentUri?: Maybe<Scalars['String']>;
  coreResources?: Maybe<Array<GQLResource>>;
  id: Scalars['String'];
  isPrimary?: Maybe<Scalars['Boolean']>;
  meta?: Maybe<GQLMeta>;
  metadata: GQLTaxonomyMetadata;
  name: Scalars['String'];
  parent?: Maybe<Scalars['String']>;
  path: Scalars['String'];
  pathTopics?: Maybe<Array<Array<GQLTopic>>>;
  paths: Array<Scalars['String']>;
  rank?: Maybe<Scalars['Int']>;
  relevanceId?: Maybe<Scalars['String']>;
  subtopics?: Maybe<Array<GQLTopic>>;
  supplementaryResources?: Maybe<Array<GQLResource>>;
  supportedLanguages: Array<Scalars['String']>;
};


export type GQLTopicArticleArgs = {
  showVisualElement?: InputMaybe<Scalars['String']>;
  subjectId?: InputMaybe<Scalars['String']>;
};


export type GQLTopicCoreResourcesArgs = {
  subjectId?: InputMaybe<Scalars['String']>;
};


export type GQLTopicSupplementaryResourcesArgs = {
  subjectId?: InputMaybe<Scalars['String']>;
};

export type GQLUpdatedFolder = {
  __typename?: 'UpdatedFolder';
  name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type GQLUpdatedFolderResource = {
  __typename?: 'UpdatedFolderResource';
  tags?: Maybe<Array<Scalars['String']>>;
};

export type GQLUptimeAlert = {
  __typename?: 'UptimeAlert';
  body?: Maybe<Scalars['String']>;
  closable: Scalars['Boolean'];
  number: Scalars['Int'];
  title: Scalars['String'];
};

export type GQLVisualElement = {
  __typename?: 'VisualElement';
  brightcove?: Maybe<GQLBrightcoveElement>;
  copyright?: Maybe<GQLCopyright>;
  embed?: Maybe<Scalars['String']>;
  h5p?: Maybe<GQLH5pElement>;
  image?: Maybe<GQLImageElement>;
  language?: Maybe<Scalars['String']>;
  oembed?: Maybe<GQLVisualElementOembed>;
  resource?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type GQLVisualElementOembed = {
  __typename?: 'VisualElementOembed';
  fullscreen?: Maybe<Scalars['Boolean']>;
  html?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type GQLWithArticle = {
  availability?: Maybe<Scalars['String']>;
  meta?: Maybe<GQLMeta>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type GQLResolversTypes = {
  AggregationResult: ResolverTypeWrapper<GQLAggregationResult>;
  Article: ResolverTypeWrapper<GQLArticle>;
  ArticleFolderResourceMeta: ResolverTypeWrapper<GQLArticleFolderResourceMeta>;
  ArticleMetaData: ResolverTypeWrapper<GQLArticleMetaData>;
  ArticleRequiredLibrary: ResolverTypeWrapper<GQLArticleRequiredLibrary>;
  ArticleSearchResult: ResolverTypeWrapper<GQLArticleSearchResult>;
  Audio: ResolverTypeWrapper<GQLAudio>;
  AudioBase: GQLResolversTypes['Audio'] | GQLResolversTypes['AudioWithSeries'];
  AudioFile: ResolverTypeWrapper<GQLAudioFile>;
  AudioLicense: ResolverTypeWrapper<GQLAudioLicense>;
  AudioSearch: ResolverTypeWrapper<GQLAudioSearch>;
  AudioSummary: ResolverTypeWrapper<GQLAudioSummary>;
  AudioWithSeries: ResolverTypeWrapper<GQLAudioWithSeries>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Breadcrumb: ResolverTypeWrapper<GQLBreadcrumb>;
  BrightcoveElement: ResolverTypeWrapper<GQLBrightcoveElement>;
  BrightcoveIframe: ResolverTypeWrapper<GQLBrightcoveIframe>;
  BrightcoveLicense: ResolverTypeWrapper<GQLBrightcoveLicense>;
  BucketResult: ResolverTypeWrapper<GQLBucketResult>;
  Category: ResolverTypeWrapper<GQLCategory>;
  CompetenceGoal: ResolverTypeWrapper<GQLCompetenceGoal>;
  Concept: ResolverTypeWrapper<GQLConcept>;
  ConceptCopyright: ResolverTypeWrapper<GQLConceptCopyright>;
  ConceptLicense: ResolverTypeWrapper<GQLConceptLicense>;
  ConceptResult: ResolverTypeWrapper<GQLConceptResult>;
  Contributor: ResolverTypeWrapper<GQLContributor>;
  Copyright: ResolverTypeWrapper<GQLCopyright>;
  CoreElement: ResolverTypeWrapper<GQLCoreElement>;
  CoverPhoto: ResolverTypeWrapper<GQLCoverPhoto>;
  CrossSubjectElement: ResolverTypeWrapper<GQLCrossSubjectElement>;
  Description: ResolverTypeWrapper<GQLDescription>;
  Element: ResolverTypeWrapper<GQLElement>;
  EmbedVisualelement: ResolverTypeWrapper<GQLEmbedVisualelement>;
  FilmFrontpage: ResolverTypeWrapper<GQLFilmFrontpage>;
  FilmPageAbout: ResolverTypeWrapper<GQLFilmPageAbout>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Folder: ResolverTypeWrapper<GQLFolder>;
  FolderResource: ResolverTypeWrapper<GQLFolderResource>;
  FolderResourceMeta: GQLResolversTypes['ArticleFolderResourceMeta'] | GQLResolversTypes['LearningpathFolderResourceMeta'];
  FolderResourceMetaSearchInput: GQLFolderResourceMetaSearchInput;
  FolderResourceResourceType: ResolverTypeWrapper<GQLFolderResourceResourceType>;
  FootNote: ResolverTypeWrapper<GQLFootNote>;
  FrontPageResources: ResolverTypeWrapper<GQLFrontPageResources>;
  Frontpage: ResolverTypeWrapper<GQLFrontpage>;
  FrontpageSearch: ResolverTypeWrapper<GQLFrontpageSearch>;
  FrontpageSearchResult: ResolverTypeWrapper<GQLFrontpageSearchResult>;
  GroupSearch: ResolverTypeWrapper<GQLGroupSearch>;
  GroupSearchResult: ResolverTypeWrapper<GQLGroupSearchResult>;
  H5pElement: ResolverTypeWrapper<GQLH5pElement>;
  H5pLicense: ResolverTypeWrapper<GQLH5pLicense>;
  ImageElement: ResolverTypeWrapper<GQLImageElement>;
  ImageLicense: ResolverTypeWrapper<GQLImageLicense>;
  ImageMetaInformation: ResolverTypeWrapper<GQLImageMetaInformation>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Learningpath: ResolverTypeWrapper<GQLLearningpath>;
  LearningpathCopyright: ResolverTypeWrapper<GQLLearningpathCopyright>;
  LearningpathCoverphoto: ResolverTypeWrapper<GQLLearningpathCoverphoto>;
  LearningpathFolderResourceMeta: ResolverTypeWrapper<GQLLearningpathFolderResourceMeta>;
  LearningpathSearchResult: ResolverTypeWrapper<GQLLearningpathSearchResult>;
  LearningpathStep: ResolverTypeWrapper<GQLLearningpathStep>;
  LearningpathStepEmbedUrl: ResolverTypeWrapper<GQLLearningpathStepEmbedUrl>;
  LearningpathStepOembed: ResolverTypeWrapper<GQLLearningpathStepOembed>;
  License: ResolverTypeWrapper<GQLLicense>;
  ListingPage: ResolverTypeWrapper<GQLListingPage>;
  Manuscript: ResolverTypeWrapper<GQLManuscript>;
  Meta: ResolverTypeWrapper<GQLMeta>;
  MetaImage: ResolverTypeWrapper<GQLMetaImage>;
  Movie: ResolverTypeWrapper<GQLMovie>;
  MovieMeta: ResolverTypeWrapper<GQLMovieMeta>;
  MoviePath: ResolverTypeWrapper<GQLMoviePath>;
  MovieResourceTypes: ResolverTypeWrapper<GQLMovieResourceTypes>;
  MovieTheme: ResolverTypeWrapper<GQLMovieTheme>;
  Mutation: ResolverTypeWrapper<{}>;
  Name: ResolverTypeWrapper<GQLName>;
  NewFolder: ResolverTypeWrapper<GQLNewFolder>;
  NewFolderResource: ResolverTypeWrapper<GQLNewFolderResource>;
  PodcastLicense: ResolverTypeWrapper<GQLPodcastLicense>;
  PodcastMeta: ResolverTypeWrapper<GQLPodcastMeta>;
  PodcastSeries: ResolverTypeWrapper<GQLPodcastSeries>;
  PodcastSeriesBase: GQLResolversTypes['PodcastSeries'] | GQLResolversTypes['PodcastSeriesWithEpisodes'];
  PodcastSeriesSearch: ResolverTypeWrapper<GQLPodcastSeriesSearch>;
  PodcastSeriesSummary: ResolverTypeWrapper<GQLPodcastSeriesSummary>;
  PodcastSeriesWithEpisodes: ResolverTypeWrapper<GQLPodcastSeriesWithEpisodes>;
  Query: ResolverTypeWrapper<{}>;
  Reference: ResolverTypeWrapper<GQLReference>;
  RelatedContent: ResolverTypeWrapper<GQLRelatedContent>;
  Resource: ResolverTypeWrapper<GQLResource>;
  ResourceType: ResolverTypeWrapper<GQLResourceType>;
  ResourceTypeDefinition: ResolverTypeWrapper<GQLResourceTypeDefinition>;
  Search: ResolverTypeWrapper<GQLSearch>;
  SearchContext: ResolverTypeWrapper<GQLSearchContext>;
  SearchContextFilter: ResolverTypeWrapper<GQLSearchContextFilter>;
  SearchContextResourceTypes: ResolverTypeWrapper<GQLSearchContextResourceTypes>;
  SearchResult: GQLResolversTypes['ArticleSearchResult'] | GQLResolversTypes['LearningpathSearchResult'];
  SearchSuggestion: ResolverTypeWrapper<GQLSearchSuggestion>;
  SearchWithoutPagination: ResolverTypeWrapper<GQLSearchWithoutPagination>;
  SortResult: ResolverTypeWrapper<GQLSortResult>;
  String: ResolverTypeWrapper<Scalars['String']>;
  StringRecord: ResolverTypeWrapper<Scalars['StringRecord']>;
  Subject: ResolverTypeWrapper<GQLSubject>;
  SubjectPage: ResolverTypeWrapper<GQLSubjectPage>;
  SubjectPageAbout: ResolverTypeWrapper<GQLSubjectPageAbout>;
  SubjectPageBanner: ResolverTypeWrapper<GQLSubjectPageBanner>;
  SubjectPageVisualElement: ResolverTypeWrapper<GQLSubjectPageVisualElement>;
  SuggestOption: ResolverTypeWrapper<GQLSuggestOption>;
  SuggestionResult: ResolverTypeWrapper<GQLSuggestionResult>;
  Tags: ResolverTypeWrapper<GQLTags>;
  TaxonomyEntity: GQLResolversTypes['Resource'] | GQLResolversTypes['Subject'] | GQLResolversTypes['Topic'];
  TaxonomyMetadata: ResolverTypeWrapper<GQLTaxonomyMetadata>;
  Title: ResolverTypeWrapper<GQLTitle>;
  Topic: ResolverTypeWrapper<GQLTopic>;
  UpdatedFolder: ResolverTypeWrapper<GQLUpdatedFolder>;
  UpdatedFolderResource: ResolverTypeWrapper<GQLUpdatedFolderResource>;
  UptimeAlert: ResolverTypeWrapper<GQLUptimeAlert>;
  VisualElement: ResolverTypeWrapper<GQLVisualElement>;
  VisualElementOembed: ResolverTypeWrapper<GQLVisualElementOembed>;
  WithArticle: GQLResolversTypes['Resource'] | GQLResolversTypes['Topic'];
};

/** Mapping between all available schema types and the resolvers parents */
export type GQLResolversParentTypes = {
  AggregationResult: GQLAggregationResult;
  Article: GQLArticle;
  ArticleFolderResourceMeta: GQLArticleFolderResourceMeta;
  ArticleMetaData: GQLArticleMetaData;
  ArticleRequiredLibrary: GQLArticleRequiredLibrary;
  ArticleSearchResult: GQLArticleSearchResult;
  Audio: GQLAudio;
  AudioBase: GQLResolversParentTypes['Audio'] | GQLResolversParentTypes['AudioWithSeries'];
  AudioFile: GQLAudioFile;
  AudioLicense: GQLAudioLicense;
  AudioSearch: GQLAudioSearch;
  AudioSummary: GQLAudioSummary;
  AudioWithSeries: GQLAudioWithSeries;
  Boolean: Scalars['Boolean'];
  Breadcrumb: GQLBreadcrumb;
  BrightcoveElement: GQLBrightcoveElement;
  BrightcoveIframe: GQLBrightcoveIframe;
  BrightcoveLicense: GQLBrightcoveLicense;
  BucketResult: GQLBucketResult;
  Category: GQLCategory;
  CompetenceGoal: GQLCompetenceGoal;
  Concept: GQLConcept;
  ConceptCopyright: GQLConceptCopyright;
  ConceptLicense: GQLConceptLicense;
  ConceptResult: GQLConceptResult;
  Contributor: GQLContributor;
  Copyright: GQLCopyright;
  CoreElement: GQLCoreElement;
  CoverPhoto: GQLCoverPhoto;
  CrossSubjectElement: GQLCrossSubjectElement;
  Description: GQLDescription;
  Element: GQLElement;
  EmbedVisualelement: GQLEmbedVisualelement;
  FilmFrontpage: GQLFilmFrontpage;
  FilmPageAbout: GQLFilmPageAbout;
  Float: Scalars['Float'];
  Folder: GQLFolder;
  FolderResource: GQLFolderResource;
  FolderResourceMeta: GQLResolversParentTypes['ArticleFolderResourceMeta'] | GQLResolversParentTypes['LearningpathFolderResourceMeta'];
  FolderResourceMetaSearchInput: GQLFolderResourceMetaSearchInput;
  FolderResourceResourceType: GQLFolderResourceResourceType;
  FootNote: GQLFootNote;
  FrontPageResources: GQLFrontPageResources;
  Frontpage: GQLFrontpage;
  FrontpageSearch: GQLFrontpageSearch;
  FrontpageSearchResult: GQLFrontpageSearchResult;
  GroupSearch: GQLGroupSearch;
  GroupSearchResult: GQLGroupSearchResult;
  H5pElement: GQLH5pElement;
  H5pLicense: GQLH5pLicense;
  ImageElement: GQLImageElement;
  ImageLicense: GQLImageLicense;
  ImageMetaInformation: GQLImageMetaInformation;
  Int: Scalars['Int'];
  Learningpath: GQLLearningpath;
  LearningpathCopyright: GQLLearningpathCopyright;
  LearningpathCoverphoto: GQLLearningpathCoverphoto;
  LearningpathFolderResourceMeta: GQLLearningpathFolderResourceMeta;
  LearningpathSearchResult: GQLLearningpathSearchResult;
  LearningpathStep: GQLLearningpathStep;
  LearningpathStepEmbedUrl: GQLLearningpathStepEmbedUrl;
  LearningpathStepOembed: GQLLearningpathStepOembed;
  License: GQLLicense;
  ListingPage: GQLListingPage;
  Manuscript: GQLManuscript;
  Meta: GQLMeta;
  MetaImage: GQLMetaImage;
  Movie: GQLMovie;
  MovieMeta: GQLMovieMeta;
  MoviePath: GQLMoviePath;
  MovieResourceTypes: GQLMovieResourceTypes;
  MovieTheme: GQLMovieTheme;
  Mutation: {};
  Name: GQLName;
  NewFolder: GQLNewFolder;
  NewFolderResource: GQLNewFolderResource;
  PodcastLicense: GQLPodcastLicense;
  PodcastMeta: GQLPodcastMeta;
  PodcastSeries: GQLPodcastSeries;
  PodcastSeriesBase: GQLResolversParentTypes['PodcastSeries'] | GQLResolversParentTypes['PodcastSeriesWithEpisodes'];
  PodcastSeriesSearch: GQLPodcastSeriesSearch;
  PodcastSeriesSummary: GQLPodcastSeriesSummary;
  PodcastSeriesWithEpisodes: GQLPodcastSeriesWithEpisodes;
  Query: {};
  Reference: GQLReference;
  RelatedContent: GQLRelatedContent;
  Resource: GQLResource;
  ResourceType: GQLResourceType;
  ResourceTypeDefinition: GQLResourceTypeDefinition;
  Search: GQLSearch;
  SearchContext: GQLSearchContext;
  SearchContextFilter: GQLSearchContextFilter;
  SearchContextResourceTypes: GQLSearchContextResourceTypes;
  SearchResult: GQLResolversParentTypes['ArticleSearchResult'] | GQLResolversParentTypes['LearningpathSearchResult'];
  SearchSuggestion: GQLSearchSuggestion;
  SearchWithoutPagination: GQLSearchWithoutPagination;
  SortResult: GQLSortResult;
  String: Scalars['String'];
  StringRecord: Scalars['StringRecord'];
  Subject: GQLSubject;
  SubjectPage: GQLSubjectPage;
  SubjectPageAbout: GQLSubjectPageAbout;
  SubjectPageBanner: GQLSubjectPageBanner;
  SubjectPageVisualElement: GQLSubjectPageVisualElement;
  SuggestOption: GQLSuggestOption;
  SuggestionResult: GQLSuggestionResult;
  Tags: GQLTags;
  TaxonomyEntity: GQLResolversParentTypes['Resource'] | GQLResolversParentTypes['Subject'] | GQLResolversParentTypes['Topic'];
  TaxonomyMetadata: GQLTaxonomyMetadata;
  Title: GQLTitle;
  Topic: GQLTopic;
  UpdatedFolder: GQLUpdatedFolder;
  UpdatedFolderResource: GQLUpdatedFolderResource;
  UptimeAlert: GQLUptimeAlert;
  VisualElement: GQLVisualElement;
  VisualElementOembed: GQLVisualElementOembed;
  WithArticle: GQLResolversParentTypes['Resource'] | GQLResolversParentTypes['Topic'];
};

export type GQLAggregationResultResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['AggregationResult'] = GQLResolversParentTypes['AggregationResult']> = {
  docCountErrorUpperBound?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  field?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  sumOtherDocCount?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  values?: Resolver<Array<GQLResolversTypes['BucketResult']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLArticleResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Article'] = GQLResolversParentTypes['Article']> = {
  articleType?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  availability?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  competenceGoals?: Resolver<Maybe<Array<GQLResolversTypes['CompetenceGoal']>>, ParentType, ContextType>;
  conceptIds?: Resolver<Maybe<Array<GQLResolversTypes['Int']>>, ParentType, ContextType>;
  concepts?: Resolver<Maybe<Array<GQLResolversTypes['Concept']>>, ParentType, ContextType>;
  content?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  copyright?: Resolver<GQLResolversTypes['Copyright'], ParentType, ContextType>;
  coreElements?: Resolver<Maybe<Array<GQLResolversTypes['CoreElement']>>, ParentType, ContextType>;
  created?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  crossSubjectTopics?: Resolver<Maybe<Array<GQLResolversTypes['CrossSubjectElement']>>, ParentType, ContextType, Partial<GQLArticleCrossSubjectTopicsArgs>>;
  grepCodes?: Resolver<Maybe<Array<GQLResolversTypes['String']>>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  introduction?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  metaData?: Resolver<Maybe<GQLResolversTypes['ArticleMetaData']>, ParentType, ContextType>;
  metaDescription?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  metaImage?: Resolver<Maybe<GQLResolversTypes['MetaImage']>, ParentType, ContextType>;
  oembed?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  oldNdlaUrl?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  published?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  relatedContent?: Resolver<Maybe<Array<GQLResolversTypes['RelatedContent']>>, ParentType, ContextType>;
  requiredLibraries?: Resolver<Maybe<Array<GQLResolversTypes['ArticleRequiredLibrary']>>, ParentType, ContextType>;
  revision?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  revisionDate?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  supportedLanguages?: Resolver<Maybe<Array<GQLResolversTypes['String']>>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<GQLResolversTypes['String']>>, ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  updated?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  visualElement?: Resolver<Maybe<GQLResolversTypes['VisualElement']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLArticleFolderResourceMetaResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ArticleFolderResourceMeta'] = GQLResolversParentTypes['ArticleFolderResourceMeta']> = {
  description?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  metaImage?: Resolver<Maybe<GQLResolversTypes['MetaImage']>, ParentType, ContextType>;
  resourceTypes?: Resolver<Array<GQLResolversTypes['FolderResourceResourceType']>, ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLArticleMetaDataResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ArticleMetaData'] = GQLResolversParentTypes['ArticleMetaData']> = {
  audios?: Resolver<Maybe<Array<GQLResolversTypes['AudioLicense']>>, ParentType, ContextType>;
  brightcoves?: Resolver<Maybe<Array<GQLResolversTypes['BrightcoveLicense']>>, ParentType, ContextType>;
  concepts?: Resolver<Maybe<Array<GQLResolversTypes['ConceptLicense']>>, ParentType, ContextType>;
  copyText?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  footnotes?: Resolver<Maybe<Array<GQLResolversTypes['FootNote']>>, ParentType, ContextType>;
  h5ps?: Resolver<Maybe<Array<GQLResolversTypes['H5pLicense']>>, ParentType, ContextType>;
  images?: Resolver<Maybe<Array<GQLResolversTypes['ImageLicense']>>, ParentType, ContextType>;
  podcasts?: Resolver<Maybe<Array<GQLResolversTypes['PodcastLicense']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLArticleRequiredLibraryResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ArticleRequiredLibrary'] = GQLResolversParentTypes['ArticleRequiredLibrary']> = {
  mediaType?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLArticleSearchResultResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ArticleSearchResult'] = GQLResolversParentTypes['ArticleSearchResult']> = {
  contexts?: Resolver<Array<GQLResolversTypes['SearchContext']>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  metaDescription?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  metaImage?: Resolver<Maybe<GQLResolversTypes['MetaImage']>, ParentType, ContextType>;
  supportedLanguages?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  traits?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLAudioResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Audio'] = GQLResolversParentTypes['Audio']> = {
  audioFile?: Resolver<GQLResolversTypes['AudioFile'], ParentType, ContextType>;
  audioType?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  copyright?: Resolver<GQLResolversTypes['Copyright'], ParentType, ContextType>;
  created?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  manuscript?: Resolver<Maybe<GQLResolversTypes['Manuscript']>, ParentType, ContextType>;
  podcastMeta?: Resolver<Maybe<GQLResolversTypes['PodcastMeta']>, ParentType, ContextType>;
  revision?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  supportedLanguages?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  tags?: Resolver<GQLResolversTypes['Tags'], ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['Title'], ParentType, ContextType>;
  updated?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLAudioBaseResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['AudioBase'] = GQLResolversParentTypes['AudioBase']> = {
  __resolveType: TypeResolveFn<'Audio' | 'AudioWithSeries', ParentType, ContextType>;
  audioFile?: Resolver<GQLResolversTypes['AudioFile'], ParentType, ContextType>;
  audioType?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  copyright?: Resolver<GQLResolversTypes['Copyright'], ParentType, ContextType>;
  created?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  manuscript?: Resolver<Maybe<GQLResolversTypes['Manuscript']>, ParentType, ContextType>;
  podcastMeta?: Resolver<Maybe<GQLResolversTypes['PodcastMeta']>, ParentType, ContextType>;
  revision?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  supportedLanguages?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  tags?: Resolver<GQLResolversTypes['Tags'], ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['Title'], ParentType, ContextType>;
  updated?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
};

export type GQLAudioFileResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['AudioFile'] = GQLResolversParentTypes['AudioFile']> = {
  fileSize?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  language?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  mimeType?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLAudioLicenseResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['AudioLicense'] = GQLResolversParentTypes['AudioLicense']> = {
  copyText?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  copyright?: Resolver<GQLResolversTypes['Copyright'], ParentType, ContextType>;
  src?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLAudioSearchResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['AudioSearch'] = GQLResolversParentTypes['AudioSearch']> = {
  language?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  page?: Resolver<Maybe<GQLResolversTypes['Int']>, ParentType, ContextType>;
  pageSize?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  results?: Resolver<Array<GQLResolversTypes['AudioSummary']>, ParentType, ContextType>;
  totalCount?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLAudioSummaryResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['AudioSummary'] = GQLResolversParentTypes['AudioSummary']> = {
  audioType?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  lastUpdated?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  license?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  manuscript?: Resolver<Maybe<GQLResolversTypes['Manuscript']>, ParentType, ContextType>;
  podcastMeta?: Resolver<Maybe<GQLResolversTypes['PodcastMeta']>, ParentType, ContextType>;
  supportedLanguages?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['Title'], ParentType, ContextType>;
  url?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLAudioWithSeriesResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['AudioWithSeries'] = GQLResolversParentTypes['AudioWithSeries']> = {
  audioFile?: Resolver<GQLResolversTypes['AudioFile'], ParentType, ContextType>;
  audioType?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  copyright?: Resolver<GQLResolversTypes['Copyright'], ParentType, ContextType>;
  created?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  manuscript?: Resolver<Maybe<GQLResolversTypes['Manuscript']>, ParentType, ContextType>;
  podcastMeta?: Resolver<Maybe<GQLResolversTypes['PodcastMeta']>, ParentType, ContextType>;
  revision?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  series?: Resolver<Maybe<GQLResolversTypes['PodcastSeries']>, ParentType, ContextType>;
  supportedLanguages?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  tags?: Resolver<GQLResolversTypes['Tags'], ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['Title'], ParentType, ContextType>;
  updated?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLBreadcrumbResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Breadcrumb'] = GQLResolversParentTypes['Breadcrumb']> = {
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLBrightcoveElementResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['BrightcoveElement'] = GQLResolversParentTypes['BrightcoveElement']> = {
  account?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  caption?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  cover?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  download?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  iframe?: Resolver<Maybe<GQLResolversTypes['BrightcoveIframe']>, ParentType, ContextType>;
  player?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  src?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  uploadDate?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  videoid?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLBrightcoveIframeResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['BrightcoveIframe'] = GQLResolversParentTypes['BrightcoveIframe']> = {
  height?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  src?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  width?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLBrightcoveLicenseResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['BrightcoveLicense'] = GQLResolversParentTypes['BrightcoveLicense']> = {
  copyright?: Resolver<GQLResolversTypes['Copyright'], ParentType, ContextType>;
  cover?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  download?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  iframe?: Resolver<Maybe<GQLResolversTypes['BrightcoveIframe']>, ParentType, ContextType>;
  src?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  uploadDate?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLBucketResultResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['BucketResult'] = GQLResolversParentTypes['BucketResult']> = {
  count?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  value?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCategoryResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Category'] = GQLResolversParentTypes['Category']> = {
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  subjects?: Resolver<Array<GQLResolversTypes['Subject']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCompetenceGoalResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['CompetenceGoal'] = GQLResolversParentTypes['CompetenceGoal']> = {
  code?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  competenceAimSetId?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  competenceGoalSet?: Resolver<Maybe<GQLResolversTypes['Reference']>, ParentType, ContextType>;
  competenceGoalSetCode?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  coreElements?: Resolver<Maybe<Array<GQLResolversTypes['Element']>>, ParentType, ContextType>;
  coreElementsCodes?: Resolver<Maybe<Array<GQLResolversTypes['Element']>>, ParentType, ContextType>;
  crossSubjectTopics?: Resolver<Maybe<Array<GQLResolversTypes['Element']>>, ParentType, ContextType>;
  crossSubjectTopicsCodes?: Resolver<Maybe<Array<GQLResolversTypes['Element']>>, ParentType, ContextType>;
  curriculum?: Resolver<Maybe<GQLResolversTypes['Reference']>, ParentType, ContextType>;
  curriculumCode?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  curriculumId?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  language?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLConceptResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Concept'] = GQLResolversParentTypes['Concept']> = {
  articleIds?: Resolver<Array<GQLResolversTypes['Int']>, ParentType, ContextType>;
  articles?: Resolver<Maybe<Array<GQLResolversTypes['Meta']>>, ParentType, ContextType>;
  content?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  copyright?: Resolver<Maybe<GQLResolversTypes['ConceptCopyright']>, ParentType, ContextType>;
  created?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  image?: Resolver<Maybe<GQLResolversTypes['ImageLicense']>, ParentType, ContextType>;
  metaImage?: Resolver<Maybe<GQLResolversTypes['MetaImage']>, ParentType, ContextType>;
  source?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  subjectIds?: Resolver<Maybe<Array<GQLResolversTypes['String']>>, ParentType, ContextType>;
  subjectNames?: Resolver<Maybe<Array<GQLResolversTypes['String']>>, ParentType, ContextType>;
  tags?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  visualElement?: Resolver<Maybe<GQLResolversTypes['VisualElement']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLConceptCopyrightResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ConceptCopyright'] = GQLResolversParentTypes['ConceptCopyright']> = {
  creators?: Resolver<Array<GQLResolversTypes['Contributor']>, ParentType, ContextType>;
  license?: Resolver<Maybe<GQLResolversTypes['License']>, ParentType, ContextType>;
  origin?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  processors?: Resolver<Array<GQLResolversTypes['Contributor']>, ParentType, ContextType>;
  rightsholders?: Resolver<Array<GQLResolversTypes['Contributor']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLConceptLicenseResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ConceptLicense'] = GQLResolversParentTypes['ConceptLicense']> = {
  copyright?: Resolver<Maybe<GQLResolversTypes['ConceptCopyright']>, ParentType, ContextType>;
  src?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLConceptResultResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ConceptResult'] = GQLResolversParentTypes['ConceptResult']> = {
  concepts?: Resolver<Array<GQLResolversTypes['Concept']>, ParentType, ContextType>;
  language?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  page?: Resolver<Maybe<GQLResolversTypes['Int']>, ParentType, ContextType>;
  pageSize?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  totalCount?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLContributorResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Contributor'] = GQLResolversParentTypes['Contributor']> = {
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCopyrightResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Copyright'] = GQLResolversParentTypes['Copyright']> = {
  creators?: Resolver<Array<GQLResolversTypes['Contributor']>, ParentType, ContextType>;
  license?: Resolver<GQLResolversTypes['License'], ParentType, ContextType>;
  origin?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  processors?: Resolver<Array<GQLResolversTypes['Contributor']>, ParentType, ContextType>;
  rightsholders?: Resolver<Array<GQLResolversTypes['Contributor']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCoreElementResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['CoreElement'] = GQLResolversParentTypes['CoreElement']> = {
  curriculum?: Resolver<Maybe<GQLResolversTypes['Reference']>, ParentType, ContextType>;
  curriculumCode?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  language?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCoverPhotoResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['CoverPhoto'] = GQLResolversParentTypes['CoverPhoto']> = {
  altText?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCrossSubjectElementResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['CrossSubjectElement'] = GQLResolversParentTypes['CrossSubjectElement']> = {
  code?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  path?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLDescriptionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Description'] = GQLResolversParentTypes['Description']> = {
  description?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  language?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLElementResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Element'] = GQLResolversParentTypes['Element']> = {
  explanation?: Resolver<Array<Maybe<GQLResolversTypes['String']>>, ParentType, ContextType>;
  reference?: Resolver<GQLResolversTypes['Reference'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLEmbedVisualelementResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['EmbedVisualelement'] = GQLResolversParentTypes['EmbedVisualelement']> = {
  visualElement?: Resolver<Maybe<GQLResolversTypes['VisualElement']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLFilmFrontpageResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['FilmFrontpage'] = GQLResolversParentTypes['FilmFrontpage']> = {
  about?: Resolver<Array<GQLResolversTypes['FilmPageAbout']>, ParentType, ContextType>;
  movieThemes?: Resolver<Array<GQLResolversTypes['MovieTheme']>, ParentType, ContextType>;
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  slideShow?: Resolver<Array<GQLResolversTypes['Movie']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLFilmPageAboutResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['FilmPageAbout'] = GQLResolversParentTypes['FilmPageAbout']> = {
  description?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  language?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  visualElement?: Resolver<GQLResolversTypes['SubjectPageVisualElement'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLFolderResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Folder'] = GQLResolversParentTypes['Folder']> = {
  breadcrumbs?: Resolver<Array<GQLResolversTypes['Breadcrumb']>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  parentId?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  resources?: Resolver<Array<GQLResolversTypes['FolderResource']>, ParentType, ContextType>;
  status?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  subfolders?: Resolver<Array<GQLResolversTypes['Folder']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLFolderResourceResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['FolderResource'] = GQLResolversParentTypes['FolderResource']> = {
  created?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  path?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  resourceId?: Resolver<Maybe<GQLResolversTypes['Int']>, ParentType, ContextType>;
  resourceType?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  tags?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLFolderResourceMetaResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['FolderResourceMeta'] = GQLResolversParentTypes['FolderResourceMeta']> = {
  __resolveType: TypeResolveFn<'ArticleFolderResourceMeta' | 'LearningpathFolderResourceMeta', ParentType, ContextType>;
  description?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  metaImage?: Resolver<Maybe<GQLResolversTypes['MetaImage']>, ParentType, ContextType>;
  resourceTypes?: Resolver<Array<GQLResolversTypes['FolderResourceResourceType']>, ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
};

export type GQLFolderResourceResourceTypeResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['FolderResourceResourceType'] = GQLResolversParentTypes['FolderResourceResourceType']> = {
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLFootNoteResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['FootNote'] = GQLResolversParentTypes['FootNote']> = {
  authors?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  edition?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  publisher?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  ref?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  year?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLFrontPageResourcesResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['FrontPageResources'] = GQLResolversParentTypes['FrontPageResources']> = {
  results?: Resolver<Array<GQLResolversTypes['FrontpageSearchResult']>, ParentType, ContextType>;
  suggestions?: Resolver<Array<GQLResolversTypes['SuggestionResult']>, ParentType, ContextType>;
  totalCount?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLFrontpageResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Frontpage'] = GQLResolversParentTypes['Frontpage']> = {
  categories?: Resolver<Array<GQLResolversTypes['Category']>, ParentType, ContextType>;
  topical?: Resolver<Array<GQLResolversTypes['Resource']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLFrontpageSearchResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['FrontpageSearch'] = GQLResolversParentTypes['FrontpageSearch']> = {
  learningResources?: Resolver<GQLResolversTypes['FrontPageResources'], ParentType, ContextType>;
  topicResources?: Resolver<GQLResolversTypes['FrontPageResources'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLFrontpageSearchResultResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['FrontpageSearchResult'] = GQLResolversParentTypes['FrontpageSearchResult']> = {
  filters?: Resolver<Array<GQLResolversTypes['SearchContextFilter']>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  path?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  resourceTypes?: Resolver<Array<GQLResolversTypes['SearchContextResourceTypes']>, ParentType, ContextType>;
  subject?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLGroupSearchResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['GroupSearch'] = GQLResolversParentTypes['GroupSearch']> = {
  aggregations?: Resolver<Array<GQLResolversTypes['AggregationResult']>, ParentType, ContextType>;
  language?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  page?: Resolver<Maybe<GQLResolversTypes['Int']>, ParentType, ContextType>;
  pageSize?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  resourceType?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  resources?: Resolver<Array<GQLResolversTypes['GroupSearchResult']>, ParentType, ContextType>;
  suggestions?: Resolver<Array<GQLResolversTypes['SuggestionResult']>, ParentType, ContextType>;
  totalCount?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLGroupSearchResultResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['GroupSearchResult'] = GQLResolversParentTypes['GroupSearchResult']> = {
  contexts?: Resolver<Array<GQLResolversTypes['SearchContext']>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  ingress?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  metaImage?: Resolver<Maybe<GQLResolversTypes['MetaImage']>, ParentType, ContextType>;
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  path?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  traits?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLH5pElementResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['H5pElement'] = GQLResolversParentTypes['H5pElement']> = {
  src?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  thumbnail?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLH5pLicenseResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['H5pLicense'] = GQLResolversParentTypes['H5pLicense']> = {
  copyright?: Resolver<GQLResolversTypes['Copyright'], ParentType, ContextType>;
  src?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  thumbnail?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLImageElementResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ImageElement'] = GQLResolversParentTypes['ImageElement']> = {
  alt?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  altText?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  caption?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  contentType?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  copyText?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  focalX?: Resolver<Maybe<GQLResolversTypes['Float']>, ParentType, ContextType>;
  focalY?: Resolver<Maybe<GQLResolversTypes['Float']>, ParentType, ContextType>;
  lowerRightX?: Resolver<Maybe<GQLResolversTypes['Float']>, ParentType, ContextType>;
  lowerRightY?: Resolver<Maybe<GQLResolversTypes['Float']>, ParentType, ContextType>;
  resourceid?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  src?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  upperLeftX?: Resolver<Maybe<GQLResolversTypes['Float']>, ParentType, ContextType>;
  upperLeftY?: Resolver<Maybe<GQLResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLImageLicenseResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ImageLicense'] = GQLResolversParentTypes['ImageLicense']> = {
  altText?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  contentType?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  copyText?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  copyright?: Resolver<GQLResolversTypes['Copyright'], ParentType, ContextType>;
  src?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLImageMetaInformationResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ImageMetaInformation'] = GQLResolversParentTypes['ImageMetaInformation']> = {
  altText?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  caption?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  contentType?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  copyright?: Resolver<GQLResolversTypes['Copyright'], ParentType, ContextType>;
  created?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  createdBy?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  imageUrl?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  metaUrl?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  size?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  supportedLanguages?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  tags?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLLearningpathResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Learningpath'] = GQLResolversParentTypes['Learningpath']> = {
  canEdit?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
  copyright?: Resolver<GQLResolversTypes['LearningpathCopyright'], ParentType, ContextType>;
  coverphoto?: Resolver<Maybe<GQLResolversTypes['LearningpathCoverphoto']>, ParentType, ContextType>;
  description?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  duration?: Resolver<Maybe<GQLResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  isBasedOn?: Resolver<Maybe<GQLResolversTypes['Int']>, ParentType, ContextType>;
  lastUpdated?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  learningstepUrl?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  learningsteps?: Resolver<Array<GQLResolversTypes['LearningpathStep']>, ParentType, ContextType>;
  metaUrl?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  revision?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  supportedLanguages?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  tags?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  verificationStatus?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLLearningpathCopyrightResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['LearningpathCopyright'] = GQLResolversParentTypes['LearningpathCopyright']> = {
  contributors?: Resolver<Array<GQLResolversTypes['Contributor']>, ParentType, ContextType>;
  license?: Resolver<GQLResolversTypes['License'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLLearningpathCoverphotoResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['LearningpathCoverphoto'] = GQLResolversParentTypes['LearningpathCoverphoto']> = {
  metaUrl?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLLearningpathFolderResourceMetaResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['LearningpathFolderResourceMeta'] = GQLResolversParentTypes['LearningpathFolderResourceMeta']> = {
  description?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  metaImage?: Resolver<Maybe<GQLResolversTypes['MetaImage']>, ParentType, ContextType>;
  resourceTypes?: Resolver<Array<GQLResolversTypes['FolderResourceResourceType']>, ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLLearningpathSearchResultResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['LearningpathSearchResult'] = GQLResolversParentTypes['LearningpathSearchResult']> = {
  contexts?: Resolver<Array<GQLResolversTypes['SearchContext']>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  metaDescription?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  metaImage?: Resolver<Maybe<GQLResolversTypes['MetaImage']>, ParentType, ContextType>;
  supportedLanguages?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  traits?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLLearningpathStepResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['LearningpathStep'] = GQLResolversParentTypes['LearningpathStep']> = {
  article?: Resolver<Maybe<GQLResolversTypes['Article']>, ParentType, ContextType>;
  description?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  embedUrl?: Resolver<Maybe<GQLResolversTypes['LearningpathStepEmbedUrl']>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  license?: Resolver<Maybe<GQLResolversTypes['License']>, ParentType, ContextType>;
  metaUrl?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  oembed?: Resolver<Maybe<GQLResolversTypes['LearningpathStepOembed']>, ParentType, ContextType>;
  resource?: Resolver<Maybe<GQLResolversTypes['Resource']>, ParentType, ContextType>;
  revision?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  seqNo?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  showTitle?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
  status?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  supportedLanguages?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLLearningpathStepEmbedUrlResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['LearningpathStepEmbedUrl'] = GQLResolversParentTypes['LearningpathStepEmbedUrl']> = {
  embedType?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLLearningpathStepOembedResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['LearningpathStepOembed'] = GQLResolversParentTypes['LearningpathStepOembed']> = {
  height?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  html?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  version?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  width?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLLicenseResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['License'] = GQLResolversParentTypes['License']> = {
  description?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  license?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLListingPageResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ListingPage'] = GQLResolversParentTypes['ListingPage']> = {
  subjects?: Resolver<Maybe<Array<GQLResolversTypes['Subject']>>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<GQLResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLManuscriptResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Manuscript'] = GQLResolversParentTypes['Manuscript']> = {
  language?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  manuscript?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLMetaResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Meta'] = GQLResolversParentTypes['Meta']> = {
  availability?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  introduction?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  lastUpdated?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  metaDescription?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  metaImage?: Resolver<Maybe<GQLResolversTypes['MetaImage']>, ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLMetaImageResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['MetaImage'] = GQLResolversParentTypes['MetaImage']> = {
  alt?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLMovieResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Movie'] = GQLResolversParentTypes['Movie']> = {
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  metaDescription?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  metaImage?: Resolver<Maybe<GQLResolversTypes['MetaImage']>, ParentType, ContextType>;
  path?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  resourceTypes?: Resolver<Array<GQLResolversTypes['ResourceType']>, ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLMovieMetaResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['MovieMeta'] = GQLResolversParentTypes['MovieMeta']> = {
  metaDescription?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  metaImage?: Resolver<Maybe<GQLResolversTypes['MetaImage']>, ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLMoviePathResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['MoviePath'] = GQLResolversParentTypes['MoviePath']> = {
  path?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  paths?: Resolver<Maybe<Array<GQLResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLMovieResourceTypesResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['MovieResourceTypes'] = GQLResolversParentTypes['MovieResourceTypes']> = {
  resourceTypes?: Resolver<Maybe<Array<GQLResolversTypes['ResourceType']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLMovieThemeResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['MovieTheme'] = GQLResolversParentTypes['MovieTheme']> = {
  movies?: Resolver<Array<GQLResolversTypes['Movie']>, ParentType, ContextType>;
  name?: Resolver<Array<GQLResolversTypes['Name']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLMutationResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Mutation'] = GQLResolversParentTypes['Mutation']> = {
  addFolder?: Resolver<GQLResolversTypes['Folder'], ParentType, ContextType, RequireFields<GQLMutationAddFolderArgs, 'name'>>;
  addFolderResource?: Resolver<GQLResolversTypes['FolderResource'], ParentType, ContextType, RequireFields<GQLMutationAddFolderResourceArgs, 'folderId' | 'path' | 'resourceId' | 'resourceType'>>;
  deleteFolder?: Resolver<GQLResolversTypes['String'], ParentType, ContextType, RequireFields<GQLMutationDeleteFolderArgs, 'id'>>;
  deleteFolderResource?: Resolver<GQLResolversTypes['String'], ParentType, ContextType, RequireFields<GQLMutationDeleteFolderResourceArgs, 'folderId' | 'resourceId'>>;
  deletePersonalData?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
  sortFolders?: Resolver<GQLResolversTypes['SortResult'], ParentType, ContextType, RequireFields<GQLMutationSortFoldersArgs, 'sortedIds'>>;
  sortResources?: Resolver<GQLResolversTypes['SortResult'], ParentType, ContextType, RequireFields<GQLMutationSortResourcesArgs, 'parentId' | 'sortedIds'>>;
  updateFolder?: Resolver<GQLResolversTypes['Folder'], ParentType, ContextType, RequireFields<GQLMutationUpdateFolderArgs, 'id'>>;
  updateFolderResource?: Resolver<GQLResolversTypes['FolderResource'], ParentType, ContextType, RequireFields<GQLMutationUpdateFolderResourceArgs, 'id'>>;
};

export type GQLNameResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Name'] = GQLResolversParentTypes['Name']> = {
  language?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLNewFolderResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['NewFolder'] = GQLResolversParentTypes['NewFolder']> = {
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  parentId?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLNewFolderResourceResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['NewFolderResource'] = GQLResolversParentTypes['NewFolderResource']> = {
  path?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  resourceType?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<GQLResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLPodcastLicenseResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['PodcastLicense'] = GQLResolversParentTypes['PodcastLicense']> = {
  copyText?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  copyright?: Resolver<GQLResolversTypes['Copyright'], ParentType, ContextType>;
  description?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  src?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLPodcastMetaResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['PodcastMeta'] = GQLResolversParentTypes['PodcastMeta']> = {
  image?: Resolver<Maybe<GQLResolversTypes['ImageMetaInformation']>, ParentType, ContextType>;
  introduction?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  language?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLPodcastSeriesResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['PodcastSeries'] = GQLResolversParentTypes['PodcastSeries']> = {
  coverPhoto?: Resolver<GQLResolversTypes['CoverPhoto'], ParentType, ContextType>;
  description?: Resolver<GQLResolversTypes['Description'], ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  supportedLanguages?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['Title'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLPodcastSeriesBaseResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['PodcastSeriesBase'] = GQLResolversParentTypes['PodcastSeriesBase']> = {
  __resolveType: TypeResolveFn<'PodcastSeries' | 'PodcastSeriesWithEpisodes', ParentType, ContextType>;
  coverPhoto?: Resolver<GQLResolversTypes['CoverPhoto'], ParentType, ContextType>;
  description?: Resolver<GQLResolversTypes['Description'], ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  supportedLanguages?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['Title'], ParentType, ContextType>;
};

export type GQLPodcastSeriesSearchResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['PodcastSeriesSearch'] = GQLResolversParentTypes['PodcastSeriesSearch']> = {
  language?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  page?: Resolver<Maybe<GQLResolversTypes['Int']>, ParentType, ContextType>;
  pageSize?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  results?: Resolver<Array<GQLResolversTypes['PodcastSeriesSummary']>, ParentType, ContextType>;
  totalCount?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLPodcastSeriesSummaryResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['PodcastSeriesSummary'] = GQLResolversParentTypes['PodcastSeriesSummary']> = {
  coverPhoto?: Resolver<GQLResolversTypes['CoverPhoto'], ParentType, ContextType>;
  description?: Resolver<GQLResolversTypes['Description'], ParentType, ContextType>;
  episodes?: Resolver<Maybe<Array<GQLResolversTypes['AudioSummary']>>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  supportedLanguages?: Resolver<Maybe<Array<GQLResolversTypes['String']>>, ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['Title'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLPodcastSeriesWithEpisodesResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['PodcastSeriesWithEpisodes'] = GQLResolversParentTypes['PodcastSeriesWithEpisodes']> = {
  coverPhoto?: Resolver<GQLResolversTypes['CoverPhoto'], ParentType, ContextType>;
  description?: Resolver<GQLResolversTypes['Description'], ParentType, ContextType>;
  episodes?: Resolver<Maybe<Array<GQLResolversTypes['Audio']>>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  supportedLanguages?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['Title'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLQueryResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Query'] = GQLResolversParentTypes['Query']> = {
  alerts?: Resolver<Maybe<Array<Maybe<GQLResolversTypes['UptimeAlert']>>>, ParentType, ContextType>;
  allFolderResources?: Resolver<Array<GQLResolversTypes['FolderResource']>, ParentType, ContextType, Partial<GQLQueryAllFolderResourcesArgs>>;
  article?: Resolver<Maybe<GQLResolversTypes['Article']>, ParentType, ContextType, RequireFields<GQLQueryArticleArgs, 'id'>>;
  competenceGoal?: Resolver<Maybe<GQLResolversTypes['CompetenceGoal']>, ParentType, ContextType, RequireFields<GQLQueryCompetenceGoalArgs, 'code'>>;
  competenceGoals?: Resolver<Maybe<Array<GQLResolversTypes['CompetenceGoal']>>, ParentType, ContextType, Partial<GQLQueryCompetenceGoalsArgs>>;
  concept?: Resolver<Maybe<GQLResolversTypes['Concept']>, ParentType, ContextType, RequireFields<GQLQueryConceptArgs, 'id'>>;
  conceptSearch?: Resolver<Maybe<GQLResolversTypes['ConceptResult']>, ParentType, ContextType, Partial<GQLQueryConceptSearchArgs>>;
  coreElement?: Resolver<Maybe<GQLResolversTypes['CoreElement']>, ParentType, ContextType, RequireFields<GQLQueryCoreElementArgs, 'code'>>;
  coreElements?: Resolver<Maybe<Array<GQLResolversTypes['CoreElement']>>, ParentType, ContextType, Partial<GQLQueryCoreElementsArgs>>;
  filmfrontpage?: Resolver<Maybe<GQLResolversTypes['FilmFrontpage']>, ParentType, ContextType>;
  folder?: Resolver<GQLResolversTypes['Folder'], ParentType, ContextType, RequireFields<GQLQueryFolderArgs, 'id'>>;
  folderResourceMeta?: Resolver<Maybe<GQLResolversTypes['FolderResourceMeta']>, ParentType, ContextType, RequireFields<GQLQueryFolderResourceMetaArgs, 'resource'>>;
  folderResourceMetaSearch?: Resolver<Array<GQLResolversTypes['FolderResourceMeta']>, ParentType, ContextType, RequireFields<GQLQueryFolderResourceMetaSearchArgs, 'resources'>>;
  folders?: Resolver<Array<GQLResolversTypes['Folder']>, ParentType, ContextType, Partial<GQLQueryFoldersArgs>>;
  frontpage?: Resolver<Maybe<GQLResolversTypes['Frontpage']>, ParentType, ContextType>;
  frontpageSearch?: Resolver<Maybe<GQLResolversTypes['FrontpageSearch']>, ParentType, ContextType, Partial<GQLQueryFrontpageSearchArgs>>;
  groupSearch?: Resolver<Maybe<Array<GQLResolversTypes['GroupSearch']>>, ParentType, ContextType, Partial<GQLQueryGroupSearchArgs>>;
  learningpath?: Resolver<Maybe<GQLResolversTypes['Learningpath']>, ParentType, ContextType, RequireFields<GQLQueryLearningpathArgs, 'pathId'>>;
  listingPage?: Resolver<Maybe<GQLResolversTypes['ListingPage']>, ParentType, ContextType, Partial<GQLQueryListingPageArgs>>;
  podcast?: Resolver<Maybe<GQLResolversTypes['AudioWithSeries']>, ParentType, ContextType, RequireFields<GQLQueryPodcastArgs, 'id'>>;
  podcastSearch?: Resolver<Maybe<GQLResolversTypes['AudioSearch']>, ParentType, ContextType, RequireFields<GQLQueryPodcastSearchArgs, 'page' | 'pageSize'>>;
  podcastSeries?: Resolver<Maybe<GQLResolversTypes['PodcastSeriesWithEpisodes']>, ParentType, ContextType, RequireFields<GQLQueryPodcastSeriesArgs, 'id'>>;
  podcastSeriesSearch?: Resolver<Maybe<GQLResolversTypes['PodcastSeriesSearch']>, ParentType, ContextType, RequireFields<GQLQueryPodcastSeriesSearchArgs, 'page' | 'pageSize'>>;
  resource?: Resolver<Maybe<GQLResolversTypes['Resource']>, ParentType, ContextType, RequireFields<GQLQueryResourceArgs, 'id'>>;
  resourceTypes?: Resolver<Maybe<Array<GQLResolversTypes['ResourceTypeDefinition']>>, ParentType, ContextType>;
  search?: Resolver<Maybe<GQLResolversTypes['Search']>, ParentType, ContextType, Partial<GQLQuerySearchArgs>>;
  searchWithoutPagination?: Resolver<Maybe<GQLResolversTypes['SearchWithoutPagination']>, ParentType, ContextType, Partial<GQLQuerySearchWithoutPaginationArgs>>;
  subject?: Resolver<Maybe<GQLResolversTypes['Subject']>, ParentType, ContextType, RequireFields<GQLQuerySubjectArgs, 'id'>>;
  subjectpage?: Resolver<Maybe<GQLResolversTypes['SubjectPage']>, ParentType, ContextType, RequireFields<GQLQuerySubjectpageArgs, 'id'>>;
  subjects?: Resolver<Maybe<Array<GQLResolversTypes['Subject']>>, ParentType, ContextType, Partial<GQLQuerySubjectsArgs>>;
  topic?: Resolver<Maybe<GQLResolversTypes['Topic']>, ParentType, ContextType, RequireFields<GQLQueryTopicArgs, 'id'>>;
  topics?: Resolver<Maybe<Array<GQLResolversTypes['Topic']>>, ParentType, ContextType, Partial<GQLQueryTopicsArgs>>;
};

export type GQLReferenceResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Reference'] = GQLResolversParentTypes['Reference']> = {
  code?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLRelatedContentResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['RelatedContent'] = GQLResolversParentTypes['RelatedContent']> = {
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLResourceResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Resource'] = GQLResolversParentTypes['Resource']> = {
  article?: Resolver<Maybe<GQLResolversTypes['Article']>, ParentType, ContextType, Partial<GQLResourceArticleArgs>>;
  availability?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  breadcrumbs?: Resolver<Maybe<Array<Array<GQLResolversTypes['String']>>>, ParentType, ContextType>;
  contentUri?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  learningpath?: Resolver<Maybe<GQLResolversTypes['Learningpath']>, ParentType, ContextType>;
  meta?: Resolver<Maybe<GQLResolversTypes['Meta']>, ParentType, ContextType>;
  metadata?: Resolver<GQLResolversTypes['TaxonomyMetadata'], ParentType, ContextType>;
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  parents?: Resolver<Maybe<Array<GQLResolversTypes['Topic']>>, ParentType, ContextType>;
  path?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  paths?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  rank?: Resolver<Maybe<GQLResolversTypes['Int']>, ParentType, ContextType>;
  relevanceId?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  resourceTypes?: Resolver<Maybe<Array<GQLResolversTypes['ResourceType']>>, ParentType, ContextType>;
  supportedLanguages?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLResourceTypeResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ResourceType'] = GQLResolversParentTypes['ResourceType']> = {
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  resources?: Resolver<Maybe<Array<GQLResolversTypes['Resource']>>, ParentType, ContextType, RequireFields<GQLResourceTypeResourcesArgs, 'topicId'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLResourceTypeDefinitionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ResourceTypeDefinition'] = GQLResolversParentTypes['ResourceTypeDefinition']> = {
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  subtypes?: Resolver<Maybe<Array<GQLResolversTypes['ResourceTypeDefinition']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLSearchResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Search'] = GQLResolversParentTypes['Search']> = {
  aggregations?: Resolver<Array<GQLResolversTypes['AggregationResult']>, ParentType, ContextType>;
  concepts?: Resolver<Maybe<GQLResolversTypes['ConceptResult']>, ParentType, ContextType>;
  language?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  page?: Resolver<Maybe<GQLResolversTypes['Int']>, ParentType, ContextType>;
  pageSize?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  results?: Resolver<Array<GQLResolversTypes['SearchResult']>, ParentType, ContextType>;
  suggestions?: Resolver<Array<GQLResolversTypes['SuggestionResult']>, ParentType, ContextType>;
  totalCount?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLSearchContextResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['SearchContext'] = GQLResolversParentTypes['SearchContext']> = {
  breadcrumbs?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  filters?: Resolver<Array<GQLResolversTypes['SearchContextFilter']>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  language?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  learningResourceType?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  path?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  relevance?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  resourceTypes?: Resolver<Array<GQLResolversTypes['SearchContextResourceTypes']>, ParentType, ContextType>;
  subject?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  subjectId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLSearchContextFilterResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['SearchContextFilter'] = GQLResolversParentTypes['SearchContextFilter']> = {
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  relevance?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLSearchContextResourceTypesResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['SearchContextResourceTypes'] = GQLResolversParentTypes['SearchContextResourceTypes']> = {
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  language?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLSearchResultResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['SearchResult'] = GQLResolversParentTypes['SearchResult']> = {
  __resolveType: TypeResolveFn<'ArticleSearchResult' | 'LearningpathSearchResult', ParentType, ContextType>;
  contexts?: Resolver<Array<GQLResolversTypes['SearchContext']>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  metaDescription?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  metaImage?: Resolver<Maybe<GQLResolversTypes['MetaImage']>, ParentType, ContextType>;
  supportedLanguages?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  traits?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
};

export type GQLSearchSuggestionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['SearchSuggestion'] = GQLResolversParentTypes['SearchSuggestion']> = {
  length?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  offset?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  options?: Resolver<Array<GQLResolversTypes['SuggestOption']>, ParentType, ContextType>;
  text?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLSearchWithoutPaginationResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['SearchWithoutPagination'] = GQLResolversParentTypes['SearchWithoutPagination']> = {
  results?: Resolver<Array<GQLResolversTypes['SearchResult']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLSortResultResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['SortResult'] = GQLResolversParentTypes['SortResult']> = {
  parentId?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  sortedIds?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface GQLStringRecordScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['StringRecord'], any> {
  name: 'StringRecord';
}

export type GQLSubjectResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Subject'] = GQLResolversParentTypes['Subject']> = {
  allTopics?: Resolver<Maybe<Array<GQLResolversTypes['Topic']>>, ParentType, ContextType>;
  contentUri?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  grepCodes?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  metadata?: Resolver<GQLResolversTypes['TaxonomyMetadata'], ParentType, ContextType>;
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  path?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  paths?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  rank?: Resolver<Maybe<GQLResolversTypes['Int']>, ParentType, ContextType>;
  relevanceId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  subjectpage?: Resolver<Maybe<GQLResolversTypes['SubjectPage']>, ParentType, ContextType>;
  supportedLanguages?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  topics?: Resolver<Maybe<Array<GQLResolversTypes['Topic']>>, ParentType, ContextType, Partial<GQLSubjectTopicsArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLSubjectPageResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['SubjectPage'] = GQLResolversParentTypes['SubjectPage']> = {
  about?: Resolver<Maybe<GQLResolversTypes['SubjectPageAbout']>, ParentType, ContextType>;
  banner?: Resolver<GQLResolversTypes['SubjectPageBanner'], ParentType, ContextType>;
  editorsChoices?: Resolver<Array<GQLResolversTypes['TaxonomyEntity']>, ParentType, ContextType, Partial<GQLSubjectPageEditorsChoicesArgs>>;
  facebook?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  goTo?: Resolver<Array<GQLResolversTypes['ResourceTypeDefinition']>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  latestContent?: Resolver<Maybe<Array<GQLResolversTypes['TaxonomyEntity']>>, ParentType, ContextType, Partial<GQLSubjectPageLatestContentArgs>>;
  layout?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  metaDescription?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  mostRead?: Resolver<Array<GQLResolversTypes['TaxonomyEntity']>, ParentType, ContextType, Partial<GQLSubjectPageMostReadArgs>>;
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  supportedLanguages?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  topical?: Resolver<Maybe<GQLResolversTypes['TaxonomyEntity']>, ParentType, ContextType, Partial<GQLSubjectPageTopicalArgs>>;
  twitter?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLSubjectPageAboutResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['SubjectPageAbout'] = GQLResolversParentTypes['SubjectPageAbout']> = {
  description?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  visualElement?: Resolver<GQLResolversTypes['SubjectPageVisualElement'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLSubjectPageBannerResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['SubjectPageBanner'] = GQLResolversParentTypes['SubjectPageBanner']> = {
  desktopId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  desktopUrl?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  mobileId?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  mobileUrl?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLSubjectPageVisualElementResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['SubjectPageVisualElement'] = GQLResolversParentTypes['SubjectPageVisualElement']> = {
  alt?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLSuggestOptionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['SuggestOption'] = GQLResolversParentTypes['SuggestOption']> = {
  score?: Resolver<GQLResolversTypes['Float'], ParentType, ContextType>;
  text?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLSuggestionResultResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['SuggestionResult'] = GQLResolversParentTypes['SuggestionResult']> = {
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  suggestions?: Resolver<Array<GQLResolversTypes['SearchSuggestion']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLTagsResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Tags'] = GQLResolversParentTypes['Tags']> = {
  language?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  tags?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLTaxonomyEntityResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['TaxonomyEntity'] = GQLResolversParentTypes['TaxonomyEntity']> = {
  __resolveType: TypeResolveFn<'Resource' | 'Subject' | 'Topic', ParentType, ContextType>;
  contentUri?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  metadata?: Resolver<GQLResolversTypes['TaxonomyMetadata'], ParentType, ContextType>;
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  path?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  paths?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  rank?: Resolver<Maybe<GQLResolversTypes['Int']>, ParentType, ContextType>;
  relevanceId?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  supportedLanguages?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
};

export type GQLTaxonomyMetadataResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['TaxonomyMetadata'] = GQLResolversParentTypes['TaxonomyMetadata']> = {
  customFields?: Resolver<GQLResolversTypes['StringRecord'], ParentType, ContextType>;
  grepCodes?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  visible?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLTitleResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Title'] = GQLResolversParentTypes['Title']> = {
  language?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLTopicResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Topic'] = GQLResolversParentTypes['Topic']> = {
  alternateTopics?: Resolver<Maybe<Array<GQLResolversTypes['Topic']>>, ParentType, ContextType>;
  article?: Resolver<Maybe<GQLResolversTypes['Article']>, ParentType, ContextType, Partial<GQLTopicArticleArgs>>;
  availability?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  breadcrumbs?: Resolver<Maybe<Array<Array<GQLResolversTypes['String']>>>, ParentType, ContextType>;
  contentUri?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  coreResources?: Resolver<Maybe<Array<GQLResolversTypes['Resource']>>, ParentType, ContextType, Partial<GQLTopicCoreResourcesArgs>>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  isPrimary?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>;
  meta?: Resolver<Maybe<GQLResolversTypes['Meta']>, ParentType, ContextType>;
  metadata?: Resolver<GQLResolversTypes['TaxonomyMetadata'], ParentType, ContextType>;
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  parent?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  path?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  pathTopics?: Resolver<Maybe<Array<Array<GQLResolversTypes['Topic']>>>, ParentType, ContextType>;
  paths?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  rank?: Resolver<Maybe<GQLResolversTypes['Int']>, ParentType, ContextType>;
  relevanceId?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  subtopics?: Resolver<Maybe<Array<GQLResolversTypes['Topic']>>, ParentType, ContextType>;
  supplementaryResources?: Resolver<Maybe<Array<GQLResolversTypes['Resource']>>, ParentType, ContextType, Partial<GQLTopicSupplementaryResourcesArgs>>;
  supportedLanguages?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLUpdatedFolderResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['UpdatedFolder'] = GQLResolversParentTypes['UpdatedFolder']> = {
  name?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLUpdatedFolderResourceResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['UpdatedFolderResource'] = GQLResolversParentTypes['UpdatedFolderResource']> = {
  tags?: Resolver<Maybe<Array<GQLResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLUptimeAlertResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['UptimeAlert'] = GQLResolversParentTypes['UptimeAlert']> = {
  body?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  closable?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
  number?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLVisualElementResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['VisualElement'] = GQLResolversParentTypes['VisualElement']> = {
  brightcove?: Resolver<Maybe<GQLResolversTypes['BrightcoveElement']>, ParentType, ContextType>;
  copyright?: Resolver<Maybe<GQLResolversTypes['Copyright']>, ParentType, ContextType>;
  embed?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  h5p?: Resolver<Maybe<GQLResolversTypes['H5pElement']>, ParentType, ContextType>;
  image?: Resolver<Maybe<GQLResolversTypes['ImageElement']>, ParentType, ContextType>;
  language?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  oembed?: Resolver<Maybe<GQLResolversTypes['VisualElementOembed']>, ParentType, ContextType>;
  resource?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLVisualElementOembedResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['VisualElementOembed'] = GQLResolversParentTypes['VisualElementOembed']> = {
  fullscreen?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>;
  html?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLWithArticleResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['WithArticle'] = GQLResolversParentTypes['WithArticle']> = {
  __resolveType: TypeResolveFn<'Resource' | 'Topic', ParentType, ContextType>;
  availability?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  meta?: Resolver<Maybe<GQLResolversTypes['Meta']>, ParentType, ContextType>;
};

export type GQLResolvers<ContextType = any> = {
  AggregationResult?: GQLAggregationResultResolvers<ContextType>;
  Article?: GQLArticleResolvers<ContextType>;
  ArticleFolderResourceMeta?: GQLArticleFolderResourceMetaResolvers<ContextType>;
  ArticleMetaData?: GQLArticleMetaDataResolvers<ContextType>;
  ArticleRequiredLibrary?: GQLArticleRequiredLibraryResolvers<ContextType>;
  ArticleSearchResult?: GQLArticleSearchResultResolvers<ContextType>;
  Audio?: GQLAudioResolvers<ContextType>;
  AudioBase?: GQLAudioBaseResolvers<ContextType>;
  AudioFile?: GQLAudioFileResolvers<ContextType>;
  AudioLicense?: GQLAudioLicenseResolvers<ContextType>;
  AudioSearch?: GQLAudioSearchResolvers<ContextType>;
  AudioSummary?: GQLAudioSummaryResolvers<ContextType>;
  AudioWithSeries?: GQLAudioWithSeriesResolvers<ContextType>;
  Breadcrumb?: GQLBreadcrumbResolvers<ContextType>;
  BrightcoveElement?: GQLBrightcoveElementResolvers<ContextType>;
  BrightcoveIframe?: GQLBrightcoveIframeResolvers<ContextType>;
  BrightcoveLicense?: GQLBrightcoveLicenseResolvers<ContextType>;
  BucketResult?: GQLBucketResultResolvers<ContextType>;
  Category?: GQLCategoryResolvers<ContextType>;
  CompetenceGoal?: GQLCompetenceGoalResolvers<ContextType>;
  Concept?: GQLConceptResolvers<ContextType>;
  ConceptCopyright?: GQLConceptCopyrightResolvers<ContextType>;
  ConceptLicense?: GQLConceptLicenseResolvers<ContextType>;
  ConceptResult?: GQLConceptResultResolvers<ContextType>;
  Contributor?: GQLContributorResolvers<ContextType>;
  Copyright?: GQLCopyrightResolvers<ContextType>;
  CoreElement?: GQLCoreElementResolvers<ContextType>;
  CoverPhoto?: GQLCoverPhotoResolvers<ContextType>;
  CrossSubjectElement?: GQLCrossSubjectElementResolvers<ContextType>;
  Description?: GQLDescriptionResolvers<ContextType>;
  Element?: GQLElementResolvers<ContextType>;
  EmbedVisualelement?: GQLEmbedVisualelementResolvers<ContextType>;
  FilmFrontpage?: GQLFilmFrontpageResolvers<ContextType>;
  FilmPageAbout?: GQLFilmPageAboutResolvers<ContextType>;
  Folder?: GQLFolderResolvers<ContextType>;
  FolderResource?: GQLFolderResourceResolvers<ContextType>;
  FolderResourceMeta?: GQLFolderResourceMetaResolvers<ContextType>;
  FolderResourceResourceType?: GQLFolderResourceResourceTypeResolvers<ContextType>;
  FootNote?: GQLFootNoteResolvers<ContextType>;
  FrontPageResources?: GQLFrontPageResourcesResolvers<ContextType>;
  Frontpage?: GQLFrontpageResolvers<ContextType>;
  FrontpageSearch?: GQLFrontpageSearchResolvers<ContextType>;
  FrontpageSearchResult?: GQLFrontpageSearchResultResolvers<ContextType>;
  GroupSearch?: GQLGroupSearchResolvers<ContextType>;
  GroupSearchResult?: GQLGroupSearchResultResolvers<ContextType>;
  H5pElement?: GQLH5pElementResolvers<ContextType>;
  H5pLicense?: GQLH5pLicenseResolvers<ContextType>;
  ImageElement?: GQLImageElementResolvers<ContextType>;
  ImageLicense?: GQLImageLicenseResolvers<ContextType>;
  ImageMetaInformation?: GQLImageMetaInformationResolvers<ContextType>;
  Learningpath?: GQLLearningpathResolvers<ContextType>;
  LearningpathCopyright?: GQLLearningpathCopyrightResolvers<ContextType>;
  LearningpathCoverphoto?: GQLLearningpathCoverphotoResolvers<ContextType>;
  LearningpathFolderResourceMeta?: GQLLearningpathFolderResourceMetaResolvers<ContextType>;
  LearningpathSearchResult?: GQLLearningpathSearchResultResolvers<ContextType>;
  LearningpathStep?: GQLLearningpathStepResolvers<ContextType>;
  LearningpathStepEmbedUrl?: GQLLearningpathStepEmbedUrlResolvers<ContextType>;
  LearningpathStepOembed?: GQLLearningpathStepOembedResolvers<ContextType>;
  License?: GQLLicenseResolvers<ContextType>;
  ListingPage?: GQLListingPageResolvers<ContextType>;
  Manuscript?: GQLManuscriptResolvers<ContextType>;
  Meta?: GQLMetaResolvers<ContextType>;
  MetaImage?: GQLMetaImageResolvers<ContextType>;
  Movie?: GQLMovieResolvers<ContextType>;
  MovieMeta?: GQLMovieMetaResolvers<ContextType>;
  MoviePath?: GQLMoviePathResolvers<ContextType>;
  MovieResourceTypes?: GQLMovieResourceTypesResolvers<ContextType>;
  MovieTheme?: GQLMovieThemeResolvers<ContextType>;
  Mutation?: GQLMutationResolvers<ContextType>;
  Name?: GQLNameResolvers<ContextType>;
  NewFolder?: GQLNewFolderResolvers<ContextType>;
  NewFolderResource?: GQLNewFolderResourceResolvers<ContextType>;
  PodcastLicense?: GQLPodcastLicenseResolvers<ContextType>;
  PodcastMeta?: GQLPodcastMetaResolvers<ContextType>;
  PodcastSeries?: GQLPodcastSeriesResolvers<ContextType>;
  PodcastSeriesBase?: GQLPodcastSeriesBaseResolvers<ContextType>;
  PodcastSeriesSearch?: GQLPodcastSeriesSearchResolvers<ContextType>;
  PodcastSeriesSummary?: GQLPodcastSeriesSummaryResolvers<ContextType>;
  PodcastSeriesWithEpisodes?: GQLPodcastSeriesWithEpisodesResolvers<ContextType>;
  Query?: GQLQueryResolvers<ContextType>;
  Reference?: GQLReferenceResolvers<ContextType>;
  RelatedContent?: GQLRelatedContentResolvers<ContextType>;
  Resource?: GQLResourceResolvers<ContextType>;
  ResourceType?: GQLResourceTypeResolvers<ContextType>;
  ResourceTypeDefinition?: GQLResourceTypeDefinitionResolvers<ContextType>;
  Search?: GQLSearchResolvers<ContextType>;
  SearchContext?: GQLSearchContextResolvers<ContextType>;
  SearchContextFilter?: GQLSearchContextFilterResolvers<ContextType>;
  SearchContextResourceTypes?: GQLSearchContextResourceTypesResolvers<ContextType>;
  SearchResult?: GQLSearchResultResolvers<ContextType>;
  SearchSuggestion?: GQLSearchSuggestionResolvers<ContextType>;
  SearchWithoutPagination?: GQLSearchWithoutPaginationResolvers<ContextType>;
  SortResult?: GQLSortResultResolvers<ContextType>;
  StringRecord?: GraphQLScalarType;
  Subject?: GQLSubjectResolvers<ContextType>;
  SubjectPage?: GQLSubjectPageResolvers<ContextType>;
  SubjectPageAbout?: GQLSubjectPageAboutResolvers<ContextType>;
  SubjectPageBanner?: GQLSubjectPageBannerResolvers<ContextType>;
  SubjectPageVisualElement?: GQLSubjectPageVisualElementResolvers<ContextType>;
  SuggestOption?: GQLSuggestOptionResolvers<ContextType>;
  SuggestionResult?: GQLSuggestionResultResolvers<ContextType>;
  Tags?: GQLTagsResolvers<ContextType>;
  TaxonomyEntity?: GQLTaxonomyEntityResolvers<ContextType>;
  TaxonomyMetadata?: GQLTaxonomyMetadataResolvers<ContextType>;
  Title?: GQLTitleResolvers<ContextType>;
  Topic?: GQLTopicResolvers<ContextType>;
  UpdatedFolder?: GQLUpdatedFolderResolvers<ContextType>;
  UpdatedFolderResource?: GQLUpdatedFolderResourceResolvers<ContextType>;
  UptimeAlert?: GQLUptimeAlertResolvers<ContextType>;
  VisualElement?: GQLVisualElementResolvers<ContextType>;
  VisualElementOembed?: GQLVisualElementOembedResolvers<ContextType>;
  WithArticle?: GQLWithArticleResolvers<ContextType>;
};

