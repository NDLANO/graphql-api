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

export type GQLArenaBreadcrumb = {
  __typename?: 'ArenaBreadcrumb';
  id: Scalars['Int'];
  name: Scalars['String'];
  type: Scalars['String'];
};

export type GQLArenaCategory = {
  __typename?: 'ArenaCategory';
  description: Scalars['String'];
  disabled: Scalars['Boolean'];
  htmlDescription: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  postCount: Scalars['Int'];
  slug: Scalars['String'];
  topicCount: Scalars['Int'];
  topics?: Maybe<Array<GQLArenaTopic>>;
};

export type GQLArenaPost = {
  __typename?: 'ArenaPost';
  content: Scalars['String'];
  id: Scalars['Int'];
  isMainPost: Scalars['Boolean'];
  timestamp: Scalars['String'];
  topicId: Scalars['Int'];
  user: GQLArenaUser;
};

export type GQLArenaTopic = {
  __typename?: 'ArenaTopic';
  breadcrumbs: Array<GQLArenaBreadcrumb>;
  categoryId: Scalars['Int'];
  id: Scalars['Int'];
  locked: Scalars['Boolean'];
  postCount: Scalars['Int'];
  posts: Array<GQLArenaPost>;
  slug: Scalars['String'];
  timestamp: Scalars['String'];
  title: Scalars['String'];
};

export type GQLArenaUser = {
  __typename?: 'ArenaUser';
  displayName: Scalars['String'];
  id: Scalars['Int'];
  profilePicture?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
  username: Scalars['String'];
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
  language: Scalars['String'];
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
  slug?: Maybe<Scalars['String']>;
  supportedLanguages?: Maybe<Array<Scalars['String']>>;
  tags?: Maybe<Array<Scalars['String']>>;
  title: Scalars['String'];
  updated: Scalars['String'];
  visualElement?: Maybe<GQLVisualElement>;
  visualElementEmbed?: Maybe<GQLResourceEmbed>;
};


export type GQLArticleCrossSubjectTopicsArgs = {
  subjectId?: InputMaybe<Scalars['String']>;
};

export type GQLArticleFolderResourceMeta = GQLFolderResourceMeta & {
  __typename?: 'ArticleFolderResourceMeta';
  description: Scalars['String'];
  id: Scalars['String'];
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

export type GQLAudio = {
  __typename?: 'Audio';
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

export type GQLAudioFile = {
  __typename?: 'AudioFile';
  fileSize: Scalars['Int'];
  language: Scalars['String'];
  mimeType: Scalars['String'];
  url: Scalars['String'];
};

export type GQLAudioFolderResourceMeta = GQLFolderResourceMeta & {
  __typename?: 'AudioFolderResourceMeta';
  description: Scalars['String'];
  id: Scalars['String'];
  metaImage?: Maybe<GQLMetaImage>;
  resourceTypes: Array<GQLFolderResourceResourceType>;
  title: Scalars['String'];
  type: Scalars['String'];
};

export type GQLAudioLicense = {
  __typename?: 'AudioLicense';
  copyText?: Maybe<Scalars['String']>;
  copyright: GQLCopyright;
  id: Scalars['String'];
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

export type GQLBreadcrumb = {
  __typename?: 'Breadcrumb';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type GQLBrightcoveCustomFields = {
  __typename?: 'BrightcoveCustomFields';
  accountId?: Maybe<Scalars['String']>;
  license: Scalars['String'];
  licenseInfo: Array<Scalars['String']>;
};

export type GQLBrightcoveElement = {
  __typename?: 'BrightcoveElement';
  account?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  cover?: Maybe<Scalars['String']>;
  customFields?: Maybe<GQLBrightcoveCustomFields>;
  description?: Maybe<Scalars['String']>;
  download?: Maybe<Scalars['String']>;
  iframe?: Maybe<GQLBrightcoveIframe>;
  name?: Maybe<Scalars['String']>;
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
  copyright?: Maybe<GQLCopyright>;
  cover?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  download?: Maybe<Scalars['String']>;
  id: Scalars['String'];
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

export type GQLCaption = {
  __typename?: 'Caption';
  caption: Scalars['String'];
  language: Scalars['String'];
};

export type GQLCategory = {
  __typename?: 'Category';
  id: Scalars['String'];
  isProgrammeSubject: Scalars['Boolean'];
  subjects?: Maybe<Array<GQLSubject>>;
  title: GQLTitle;
};

export type GQLCompetenceGoal = {
  __typename?: 'CompetenceGoal';
  code?: Maybe<Scalars['String']>;
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
  conceptType: Scalars['String'];
  content: Scalars['String'];
  copyright?: Maybe<GQLConceptCopyright>;
  created: Scalars['String'];
  glossData?: Maybe<GQLGloss>;
  id: Scalars['Int'];
  image?: Maybe<GQLImageLicense>;
  metaImage?: Maybe<GQLMetaImage>;
  source?: Maybe<Scalars['String']>;
  subjectIds?: Maybe<Array<Scalars['String']>>;
  subjectNames?: Maybe<Array<Scalars['String']>>;
  supportedLanguages: Array<Scalars['String']>;
  tags: Array<Scalars['String']>;
  title: Scalars['String'];
  visualElement?: Maybe<GQLVisualElement>;
};

export type GQLConceptCopyright = {
  __typename?: 'ConceptCopyright';
  creators: Array<GQLContributor>;
  license?: Maybe<GQLLicense>;
  origin?: Maybe<Scalars['String']>;
  processed?: Maybe<Scalars['Boolean']>;
  processors: Array<GQLContributor>;
  rightsholders: Array<GQLContributor>;
};

export type GQLConceptFolderResourceMeta = GQLFolderResourceMeta & {
  __typename?: 'ConceptFolderResourceMeta';
  description: Scalars['String'];
  id: Scalars['String'];
  metaImage?: Maybe<GQLMetaImage>;
  resourceTypes: Array<GQLFolderResourceResourceType>;
  title: Scalars['String'];
  type: Scalars['String'];
};

export type GQLConceptLicense = {
  __typename?: 'ConceptLicense';
  content?: Maybe<Scalars['String']>;
  copyright?: Maybe<GQLConceptCopyright>;
  id: Scalars['String'];
  metaImageUrl?: Maybe<Scalars['String']>;
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

export type GQLConfigMetaBoolean = {
  __typename?: 'ConfigMetaBoolean';
  key: Scalars['String'];
  value: Scalars['Boolean'];
};

export type GQLConfigMetaStringList = {
  __typename?: 'ConfigMetaStringList';
  key: Scalars['String'];
  value: Array<Scalars['String']>;
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
  processed?: Maybe<Scalars['Boolean']>;
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

export type GQLEditorNote = {
  __typename?: 'EditorNote';
  note: Scalars['String'];
  timestamp: Scalars['String'];
  updatedBy: Scalars['String'];
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

export type GQLExamples = {
  __typename?: 'Examples';
  example: Scalars['String'];
  language: Scalars['String'];
  transcriptions: GQLTranscription;
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
  created: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
  parentId?: Maybe<Scalars['String']>;
  resources: Array<GQLFolderResource>;
  status: Scalars['String'];
  subfolders: Array<GQLFolder>;
  updated: Scalars['String'];
};

export type GQLFolderResource = {
  __typename?: 'FolderResource';
  created: Scalars['String'];
  id: Scalars['String'];
  path: Scalars['String'];
  resourceId: Scalars['String'];
  resourceType: Scalars['String'];
  tags: Array<Scalars['String']>;
};

export type GQLFolderResourceMeta = {
  description: Scalars['String'];
  id: Scalars['String'];
  metaImage?: Maybe<GQLMetaImage>;
  resourceTypes: Array<GQLFolderResourceResourceType>;
  title: Scalars['String'];
  type: Scalars['String'];
};

export type GQLFolderResourceMetaSearchInput = {
  id: Scalars['String'];
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

export type GQLFrontpageMenu = {
  __typename?: 'FrontpageMenu';
  article: GQLArticle;
  articleId: Scalars['Int'];
  menu?: Maybe<Array<Maybe<GQLFrontpageMenu>>>;
};

export type GQLFrontpageSearch = {
  __typename?: 'FrontpageSearch';
  learningResources: GQLFrontPageResources;
  topicResources: GQLFrontPageResources;
};

export type GQLFrontpageSearchResult = {
  __typename?: 'FrontpageSearchResult';
  id: Scalars['String'];
  name: Scalars['String'];
  path: Scalars['String'];
  resourceTypes: Array<GQLSearchContextResourceTypes>;
  subject: Scalars['String'];
};

export type GQLGloss = {
  __typename?: 'Gloss';
  examples?: Maybe<Array<Array<GQLExamples>>>;
  gloss: Scalars['String'];
  originalLanguage: Scalars['String'];
  transcriptions: GQLTranscription;
  wordClass: Scalars['String'];
};

export type GQLGrade = {
  __typename?: 'Grade';
  categories?: Maybe<Array<GQLCategory>>;
  id: Scalars['String'];
  title: GQLTitle;
  url: Scalars['String'];
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
  copyright?: Maybe<GQLCopyright>;
  id: Scalars['String'];
  src?: Maybe<Scalars['String']>;
  thumbnail?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type GQLImageAltText = {
  __typename?: 'ImageAltText';
  alttext: Scalars['String'];
  language: Scalars['String'];
};

export type GQLImageDimensions = {
  __typename?: 'ImageDimensions';
  height: Scalars['Int'];
  width: Scalars['Int'];
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

export type GQLImageFolderResourceMeta = GQLFolderResourceMeta & {
  __typename?: 'ImageFolderResourceMeta';
  description: Scalars['String'];
  id: Scalars['String'];
  metaImage?: Maybe<GQLMetaImage>;
  resourceTypes: Array<GQLFolderResourceResourceType>;
  title: Scalars['String'];
  type: Scalars['String'];
};

export type GQLImageLicense = {
  __typename?: 'ImageLicense';
  altText: Scalars['String'];
  contentType?: Maybe<Scalars['String']>;
  copyText?: Maybe<Scalars['String']>;
  copyright: GQLCopyright;
  id: Scalars['String'];
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

export type GQLImageMetaInformationV2 = {
  __typename?: 'ImageMetaInformationV2';
  alttext: GQLImageAltText;
  caption: GQLCaption;
  contentType: Scalars['String'];
  copyright: GQLCopyright;
  created: Scalars['String'];
  createdBy: Scalars['String'];
  editorNotes?: Maybe<Array<GQLEditorNote>>;
  id: Scalars['String'];
  imageDimensions?: Maybe<GQLImageDimensions>;
  imageUrl: Scalars['String'];
  metaUrl: Scalars['String'];
  modelRelease: Scalars['String'];
  size: Scalars['Int'];
  supportedLanguages?: Maybe<Array<Scalars['String']>>;
  tags: GQLTags;
  title: GQLTitle;
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
  id: Scalars['String'];
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
  copySharedFolder: GQLFolder;
  deleteFolder: Scalars['String'];
  deleteFolderResource: Scalars['String'];
  deletePersonalData: Scalars['Boolean'];
  sortFolders: GQLSortResult;
  sortResources: GQLSortResult;
  transformArticleContent: Scalars['String'];
  updateFolder: GQLFolder;
  updateFolderResource: GQLFolderResource;
  updateFolderStatus: Array<Scalars['String']>;
  updatePersonalData: GQLMyNdlaPersonalData;
};


export type GQLMutationAddFolderArgs = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  parentId?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
};


export type GQLMutationAddFolderResourceArgs = {
  folderId: Scalars['String'];
  path: Scalars['String'];
  resourceId: Scalars['String'];
  resourceType: Scalars['String'];
  tags?: InputMaybe<Array<Scalars['String']>>;
};


export type GQLMutationCopySharedFolderArgs = {
  destinationFolderId?: InputMaybe<Scalars['String']>;
  folderId: Scalars['String'];
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


export type GQLMutationTransformArticleContentArgs = {
  absoluteUrl?: InputMaybe<Scalars['Boolean']>;
  content: Scalars['String'];
  draftConcept?: InputMaybe<Scalars['Boolean']>;
  previewH5p?: InputMaybe<Scalars['Boolean']>;
  subject?: InputMaybe<Scalars['String']>;
  visualElement?: InputMaybe<Scalars['String']>;
};


export type GQLMutationUpdateFolderArgs = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
};


export type GQLMutationUpdateFolderResourceArgs = {
  id: Scalars['String'];
  tags?: InputMaybe<Array<Scalars['String']>>;
};


export type GQLMutationUpdateFolderStatusArgs = {
  folderId: Scalars['String'];
  status: Scalars['String'];
};


export type GQLMutationUpdatePersonalDataArgs = {
  favoriteSubjects: Array<Scalars['String']>;
};

export type GQLMyNdlaPersonalData = {
  __typename?: 'MyNdlaPersonalData';
  arenaEnabled: Scalars['Boolean'];
  favoriteSubjects: Array<Scalars['String']>;
  id: Scalars['Int'];
  organization: Scalars['String'];
  role: Scalars['String'];
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
  coverPhotoUrl?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
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
  hasRSS: Scalars['Boolean'];
  id: Scalars['Int'];
  image: GQLImageMetaInformation;
  supportedLanguages: Array<Scalars['String']>;
  title: GQLTitle;
};

export type GQLPodcastSeriesBase = {
  coverPhoto: GQLCoverPhoto;
  description: GQLDescription;
  hasRSS: Scalars['Boolean'];
  id: Scalars['Int'];
  image: GQLImageMetaInformation;
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
  content?: Maybe<GQLResourceEmbed>;
  coverPhoto: GQLCoverPhoto;
  description: GQLDescription;
  episodes?: Maybe<Array<GQLAudio>>;
  hasRSS: Scalars['Boolean'];
  id: Scalars['Int'];
  image: GQLImageMetaInformation;
  supportedLanguages: Array<Scalars['String']>;
  title: GQLTitle;
};

export type GQLProgrammePage = {
  __typename?: 'ProgrammePage';
  contentUri?: Maybe<Scalars['String']>;
  desktopImage?: Maybe<GQLMetaImage>;
  grades?: Maybe<Array<GQLGrade>>;
  id: Scalars['String'];
  metaDescription?: Maybe<Scalars['String']>;
  mobileImage?: Maybe<GQLMetaImage>;
  title: GQLTitle;
  url: Scalars['String'];
};

export type GQLQuery = {
  __typename?: 'Query';
  alerts?: Maybe<Array<Maybe<GQLUptimeAlert>>>;
  allFolderResources: Array<GQLFolderResource>;
  arenaCategories: Array<GQLArenaCategory>;
  arenaCategory?: Maybe<GQLArenaCategory>;
  arenaEnabledOrgs?: Maybe<GQLConfigMetaStringList>;
  arenaRecentTopics: Array<GQLArenaTopic>;
  arenaTopic?: Maybe<GQLArenaTopic>;
  arenaTopicsByUser: Array<GQLArenaTopic>;
  arenaUser?: Maybe<GQLArenaUser>;
  article?: Maybe<GQLArticle>;
  audio?: Maybe<GQLAudio>;
  competenceGoal?: Maybe<GQLCompetenceGoal>;
  competenceGoals?: Maybe<Array<GQLCompetenceGoal>>;
  concept?: Maybe<GQLConcept>;
  conceptSearch?: Maybe<GQLConceptResult>;
  coreElement?: Maybe<GQLCoreElement>;
  coreElements?: Maybe<Array<GQLCoreElement>>;
  examLockStatus: GQLConfigMetaBoolean;
  filmfrontpage?: Maybe<GQLFilmFrontpage>;
  folder: GQLFolder;
  folderResourceMeta?: Maybe<GQLFolderResourceMeta>;
  folderResourceMetaSearch: Array<GQLFolderResourceMeta>;
  folders: Array<GQLFolder>;
  frontpage?: Maybe<GQLFrontpageMenu>;
  frontpageSearch?: Maybe<GQLFrontpageSearch>;
  groupSearch?: Maybe<Array<GQLGroupSearch>>;
  image?: Maybe<GQLImageMetaInformationV2>;
  learningpath?: Maybe<GQLLearningpath>;
  listingPage?: Maybe<GQLListingPage>;
  personalData: GQLMyNdlaPersonalData;
  podcastSearch?: Maybe<GQLAudioSearch>;
  podcastSeries?: Maybe<GQLPodcastSeriesWithEpisodes>;
  podcastSeriesSearch?: Maybe<GQLPodcastSeriesSearch>;
  programme?: Maybe<GQLProgrammePage>;
  programmes?: Maybe<Array<GQLProgrammePage>>;
  resource?: Maybe<GQLResource>;
  resourceEmbed: GQLResourceEmbed;
  resourceEmbeds: GQLResourceEmbed;
  resourceTypes?: Maybe<Array<GQLResourceTypeDefinition>>;
  search?: Maybe<GQLSearch>;
  searchWithoutPagination?: Maybe<GQLSearchWithoutPagination>;
  sharedFolder: GQLSharedFolder;
  subject?: Maybe<GQLSubject>;
  subjectpage?: Maybe<GQLSubjectPage>;
  subjects?: Maybe<Array<GQLSubject>>;
  topic?: Maybe<GQLTopic>;
  topics?: Maybe<Array<GQLTopic>>;
};


export type GQLQueryAllFolderResourcesArgs = {
  size?: InputMaybe<Scalars['Int']>;
};


export type GQLQueryArenaCategoryArgs = {
  categoryId: Scalars['Int'];
  page: Scalars['Int'];
};


export type GQLQueryArenaTopicArgs = {
  page: Scalars['Int'];
  topicId: Scalars['Int'];
};


export type GQLQueryArenaTopicsByUserArgs = {
  userSlug: Scalars['String'];
};


export type GQLQueryArenaUserArgs = {
  username: Scalars['String'];
};


export type GQLQueryArticleArgs = {
  absoluteUrl?: InputMaybe<Scalars['Boolean']>;
  convertEmbeds?: InputMaybe<Scalars['Boolean']>;
  draftConcept?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['String'];
  isOembed?: InputMaybe<Scalars['String']>;
  path?: InputMaybe<Scalars['String']>;
  showVisualElement?: InputMaybe<Scalars['String']>;
  subjectId?: InputMaybe<Scalars['String']>;
};


export type GQLQueryAudioArgs = {
  id: Scalars['Int'];
};


export type GQLQueryCompetenceGoalArgs = {
  code: Scalars['String'];
  language?: InputMaybe<Scalars['String']>;
};


export type GQLQueryCompetenceGoalsArgs = {
  codes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  language?: InputMaybe<Scalars['String']>;
};


export type GQLQueryConceptArgs = {
  id: Scalars['Int'];
};


export type GQLQueryConceptSearchArgs = {
  conceptType?: InputMaybe<Scalars['String']>;
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
  id: Scalars['String'];
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
  filterInactive?: InputMaybe<Scalars['Boolean']>;
  grepCodes?: InputMaybe<Scalars['String']>;
  language?: InputMaybe<Scalars['String']>;
  levels?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  query?: InputMaybe<Scalars['String']>;
  resourceTypes?: InputMaybe<Scalars['String']>;
  subjects?: InputMaybe<Scalars['String']>;
};


export type GQLQueryImageArgs = {
  id: Scalars['String'];
};


export type GQLQueryLearningpathArgs = {
  pathId: Scalars['String'];
};


export type GQLQueryListingPageArgs = {
  subjects?: InputMaybe<Scalars['String']>;
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


export type GQLQueryProgrammeArgs = {
  path?: InputMaybe<Scalars['String']>;
};


export type GQLQueryResourceArgs = {
  id: Scalars['String'];
  subjectId?: InputMaybe<Scalars['String']>;
  topicId?: InputMaybe<Scalars['String']>;
};


export type GQLQueryResourceEmbedArgs = {
  id: Scalars['String'];
  type: Scalars['String'];
};


export type GQLQueryResourceEmbedsArgs = {
  resources: Array<GQLResourceEmbedInput>;
};


export type GQLQuerySearchArgs = {
  aggregatePaths?: InputMaybe<Array<Scalars['String']>>;
  contextFilters?: InputMaybe<Scalars['String']>;
  contextTypes?: InputMaybe<Scalars['String']>;
  fallback?: InputMaybe<Scalars['String']>;
  filterInactive?: InputMaybe<Scalars['Boolean']>;
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


export type GQLQuerySharedFolderArgs = {
  id: Scalars['String'];
  includeResources?: InputMaybe<Scalars['Boolean']>;
  includeSubfolders?: InputMaybe<Scalars['Boolean']>;
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
  breadcrumbs: Array<Scalars['String']>;
  contentUri?: Maybe<Scalars['String']>;
  contexts: Array<GQLTaxonomyContext>;
  id: Scalars['String'];
  language?: Maybe<Scalars['String']>;
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
  url?: Maybe<Scalars['String']>;
};


export type GQLResourceArticleArgs = {
  convertEmbeds?: InputMaybe<Scalars['Boolean']>;
  isOembed?: InputMaybe<Scalars['String']>;
  subjectId?: InputMaybe<Scalars['String']>;
};

export type GQLResourceEmbed = {
  __typename?: 'ResourceEmbed';
  content: Scalars['String'];
  meta: GQLResourceMetaData;
};

export type GQLResourceEmbedInput = {
  conceptType?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  type: Scalars['String'];
};

export type GQLResourceMetaData = {
  __typename?: 'ResourceMetaData';
  audios?: Maybe<Array<GQLAudioLicense>>;
  brightcoves?: Maybe<Array<GQLBrightcoveLicense>>;
  concepts?: Maybe<Array<GQLConceptLicense>>;
  h5ps?: Maybe<Array<GQLH5pLicense>>;
  images?: Maybe<Array<GQLImageLicense>>;
  podcasts?: Maybe<Array<GQLPodcastLicense>>;
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
  contextId: Scalars['String'];
  contextType: Scalars['String'];
  id: Scalars['String'];
  isActive: Scalars['Boolean'];
  isPrimary: Scalars['Boolean'];
  isVisible: Scalars['Boolean'];
  language: Scalars['String'];
  learningResourceType: Scalars['String'];
  parentIds: Array<Scalars['String']>;
  path: Scalars['String'];
  publicId: Scalars['String'];
  relevance: Scalars['String'];
  relevanceId: Scalars['String'];
  resourceTypes: Array<GQLSearchContextResourceTypes>;
  root: Scalars['String'];
  rootId: Scalars['String'];
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

export type GQLSharedFolder = {
  __typename?: 'SharedFolder';
  breadcrumbs: Array<GQLBreadcrumb>;
  created: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
  parentId?: Maybe<Scalars['String']>;
  resources: Array<GQLFolderResource>;
  status: Scalars['String'];
  subfolders: Array<GQLSharedFolder>;
  updated: Scalars['String'];
};

export type GQLSortResult = {
  __typename?: 'SortResult';
  parentId?: Maybe<Scalars['String']>;
  sortedIds: Array<Scalars['String']>;
};

export type GQLSubject = GQLTaxonomyEntity & {
  __typename?: 'Subject';
  allTopics?: Maybe<Array<GQLTopic>>;
  breadcrumbs: Array<Scalars['String']>;
  contentUri?: Maybe<Scalars['String']>;
  contexts: Array<GQLTaxonomyContext>;
  grepCodes?: Maybe<Array<Scalars['String']>>;
  id: Scalars['String'];
  language?: Maybe<Scalars['String']>;
  metadata: GQLTaxonomyMetadata;
  name: Scalars['String'];
  path: Scalars['String'];
  paths: Array<Scalars['String']>;
  relevanceId?: Maybe<Scalars['String']>;
  resourceTypes?: Maybe<Array<GQLResourceType>>;
  subjectpage?: Maybe<GQLSubjectPage>;
  supportedLanguages: Array<Scalars['String']>;
  topics?: Maybe<Array<GQLTopic>>;
  url?: Maybe<Scalars['String']>;
};


export type GQLSubjectTopicsArgs = {
  all?: InputMaybe<Scalars['Boolean']>;
};

export type GQLSubjectLink = {
  __typename?: 'SubjectLink';
  name?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
};

export type GQLSubjectPage = {
  __typename?: 'SubjectPage';
  about?: Maybe<GQLSubjectPageAbout>;
  banner: GQLSubjectPageBanner;
  buildsOn: Array<Maybe<GQLSubjectLink>>;
  connectedTo: Array<Maybe<GQLSubjectLink>>;
  id: Scalars['Int'];
  leadsTo: Array<Maybe<GQLSubjectLink>>;
  metaDescription?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  supportedLanguages: Array<Scalars['String']>;
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

export type GQLTaxonomyContext = {
  __typename?: 'TaxonomyContext';
  breadcrumbs: Array<Scalars['String']>;
  parentIds: Array<Scalars['String']>;
  path: Scalars['String'];
};

export type GQLTaxonomyEntity = {
  breadcrumbs: Array<Scalars['String']>;
  contentUri?: Maybe<Scalars['String']>;
  contexts: Array<GQLTaxonomyContext>;
  id: Scalars['String'];
  language?: Maybe<Scalars['String']>;
  metadata: GQLTaxonomyMetadata;
  name: Scalars['String'];
  path: Scalars['String'];
  paths: Array<Scalars['String']>;
  relevanceId?: Maybe<Scalars['String']>;
  resourceTypes?: Maybe<Array<GQLResourceType>>;
  supportedLanguages: Array<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
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
  breadcrumbs: Array<Scalars['String']>;
  contentUri?: Maybe<Scalars['String']>;
  contexts: Array<GQLTaxonomyContext>;
  coreResources?: Maybe<Array<GQLResource>>;
  id: Scalars['String'];
  isPrimary?: Maybe<Scalars['Boolean']>;
  language?: Maybe<Scalars['String']>;
  meta?: Maybe<GQLMeta>;
  metadata: GQLTaxonomyMetadata;
  name: Scalars['String'];
  parent?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['String']>;
  path: Scalars['String'];
  pathTopics?: Maybe<Array<Array<GQLTopic>>>;
  paths: Array<Scalars['String']>;
  relevanceId?: Maybe<Scalars['String']>;
  resourceTypes?: Maybe<Array<GQLResourceType>>;
  subtopics?: Maybe<Array<GQLTopic>>;
  supplementaryResources?: Maybe<Array<GQLResource>>;
  supportedLanguages: Array<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};


export type GQLTopicArticleArgs = {
  convertEmbeds?: InputMaybe<Scalars['Boolean']>;
  showVisualElement?: InputMaybe<Scalars['String']>;
  subjectId?: InputMaybe<Scalars['String']>;
};


export type GQLTopicCoreResourcesArgs = {
  subjectId?: InputMaybe<Scalars['String']>;
};


export type GQLTopicSupplementaryResourcesArgs = {
  subjectId?: InputMaybe<Scalars['String']>;
};

export type GQLTranscription = {
  __typename?: 'Transcription';
  pinyin?: Maybe<Scalars['String']>;
  traditional?: Maybe<Scalars['String']>;
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

export type GQLVideoFolderResourceMeta = GQLFolderResourceMeta & {
  __typename?: 'VideoFolderResourceMeta';
  description: Scalars['String'];
  id: Scalars['String'];
  metaImage?: Maybe<GQLMetaImage>;
  resourceTypes: Array<GQLFolderResourceResourceType>;
  title: Scalars['String'];
  type: Scalars['String'];
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
  ArenaBreadcrumb: ResolverTypeWrapper<GQLArenaBreadcrumb>;
  ArenaCategory: ResolverTypeWrapper<GQLArenaCategory>;
  ArenaPost: ResolverTypeWrapper<GQLArenaPost>;
  ArenaTopic: ResolverTypeWrapper<GQLArenaTopic>;
  ArenaUser: ResolverTypeWrapper<GQLArenaUser>;
  Article: ResolverTypeWrapper<GQLArticle>;
  ArticleFolderResourceMeta: ResolverTypeWrapper<GQLArticleFolderResourceMeta>;
  ArticleMetaData: ResolverTypeWrapper<GQLArticleMetaData>;
  ArticleRequiredLibrary: ResolverTypeWrapper<GQLArticleRequiredLibrary>;
  ArticleSearchResult: ResolverTypeWrapper<GQLArticleSearchResult>;
  Audio: ResolverTypeWrapper<GQLAudio>;
  AudioFile: ResolverTypeWrapper<GQLAudioFile>;
  AudioFolderResourceMeta: ResolverTypeWrapper<GQLAudioFolderResourceMeta>;
  AudioLicense: ResolverTypeWrapper<GQLAudioLicense>;
  AudioSearch: ResolverTypeWrapper<GQLAudioSearch>;
  AudioSummary: ResolverTypeWrapper<GQLAudioSummary>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Breadcrumb: ResolverTypeWrapper<GQLBreadcrumb>;
  BrightcoveCustomFields: ResolverTypeWrapper<GQLBrightcoveCustomFields>;
  BrightcoveElement: ResolverTypeWrapper<GQLBrightcoveElement>;
  BrightcoveIframe: ResolverTypeWrapper<GQLBrightcoveIframe>;
  BrightcoveLicense: ResolverTypeWrapper<GQLBrightcoveLicense>;
  BucketResult: ResolverTypeWrapper<GQLBucketResult>;
  Caption: ResolverTypeWrapper<GQLCaption>;
  Category: ResolverTypeWrapper<GQLCategory>;
  CompetenceGoal: ResolverTypeWrapper<GQLCompetenceGoal>;
  Concept: ResolverTypeWrapper<GQLConcept>;
  ConceptCopyright: ResolverTypeWrapper<GQLConceptCopyright>;
  ConceptFolderResourceMeta: ResolverTypeWrapper<GQLConceptFolderResourceMeta>;
  ConceptLicense: ResolverTypeWrapper<GQLConceptLicense>;
  ConceptResult: ResolverTypeWrapper<GQLConceptResult>;
  ConfigMetaBoolean: ResolverTypeWrapper<GQLConfigMetaBoolean>;
  ConfigMetaStringList: ResolverTypeWrapper<GQLConfigMetaStringList>;
  Contributor: ResolverTypeWrapper<GQLContributor>;
  Copyright: ResolverTypeWrapper<GQLCopyright>;
  CoreElement: ResolverTypeWrapper<GQLCoreElement>;
  CoverPhoto: ResolverTypeWrapper<GQLCoverPhoto>;
  CrossSubjectElement: ResolverTypeWrapper<GQLCrossSubjectElement>;
  Description: ResolverTypeWrapper<GQLDescription>;
  EditorNote: ResolverTypeWrapper<GQLEditorNote>;
  Element: ResolverTypeWrapper<GQLElement>;
  EmbedVisualelement: ResolverTypeWrapper<GQLEmbedVisualelement>;
  Examples: ResolverTypeWrapper<GQLExamples>;
  FilmFrontpage: ResolverTypeWrapper<GQLFilmFrontpage>;
  FilmPageAbout: ResolverTypeWrapper<GQLFilmPageAbout>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Folder: ResolverTypeWrapper<GQLFolder>;
  FolderResource: ResolverTypeWrapper<GQLFolderResource>;
  FolderResourceMeta: GQLResolversTypes['ArticleFolderResourceMeta'] | GQLResolversTypes['AudioFolderResourceMeta'] | GQLResolversTypes['ConceptFolderResourceMeta'] | GQLResolversTypes['ImageFolderResourceMeta'] | GQLResolversTypes['LearningpathFolderResourceMeta'] | GQLResolversTypes['VideoFolderResourceMeta'];
  FolderResourceMetaSearchInput: GQLFolderResourceMetaSearchInput;
  FolderResourceResourceType: ResolverTypeWrapper<GQLFolderResourceResourceType>;
  FootNote: ResolverTypeWrapper<GQLFootNote>;
  FrontPageResources: ResolverTypeWrapper<GQLFrontPageResources>;
  FrontpageMenu: ResolverTypeWrapper<GQLFrontpageMenu>;
  FrontpageSearch: ResolverTypeWrapper<GQLFrontpageSearch>;
  FrontpageSearchResult: ResolverTypeWrapper<GQLFrontpageSearchResult>;
  Gloss: ResolverTypeWrapper<GQLGloss>;
  Grade: ResolverTypeWrapper<GQLGrade>;
  GroupSearch: ResolverTypeWrapper<GQLGroupSearch>;
  GroupSearchResult: ResolverTypeWrapper<GQLGroupSearchResult>;
  H5pElement: ResolverTypeWrapper<GQLH5pElement>;
  H5pLicense: ResolverTypeWrapper<GQLH5pLicense>;
  ImageAltText: ResolverTypeWrapper<GQLImageAltText>;
  ImageDimensions: ResolverTypeWrapper<GQLImageDimensions>;
  ImageElement: ResolverTypeWrapper<GQLImageElement>;
  ImageFolderResourceMeta: ResolverTypeWrapper<GQLImageFolderResourceMeta>;
  ImageLicense: ResolverTypeWrapper<GQLImageLicense>;
  ImageMetaInformation: ResolverTypeWrapper<GQLImageMetaInformation>;
  ImageMetaInformationV2: ResolverTypeWrapper<GQLImageMetaInformationV2>;
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
  MyNdlaPersonalData: ResolverTypeWrapper<GQLMyNdlaPersonalData>;
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
  ProgrammePage: ResolverTypeWrapper<GQLProgrammePage>;
  Query: ResolverTypeWrapper<{}>;
  Reference: ResolverTypeWrapper<GQLReference>;
  RelatedContent: ResolverTypeWrapper<GQLRelatedContent>;
  Resource: ResolverTypeWrapper<GQLResource>;
  ResourceEmbed: ResolverTypeWrapper<GQLResourceEmbed>;
  ResourceEmbedInput: GQLResourceEmbedInput;
  ResourceMetaData: ResolverTypeWrapper<GQLResourceMetaData>;
  ResourceType: ResolverTypeWrapper<GQLResourceType>;
  ResourceTypeDefinition: ResolverTypeWrapper<GQLResourceTypeDefinition>;
  Search: ResolverTypeWrapper<GQLSearch>;
  SearchContext: ResolverTypeWrapper<GQLSearchContext>;
  SearchContextFilter: ResolverTypeWrapper<GQLSearchContextFilter>;
  SearchContextResourceTypes: ResolverTypeWrapper<GQLSearchContextResourceTypes>;
  SearchResult: GQLResolversTypes['ArticleSearchResult'] | GQLResolversTypes['LearningpathSearchResult'];
  SearchSuggestion: ResolverTypeWrapper<GQLSearchSuggestion>;
  SearchWithoutPagination: ResolverTypeWrapper<GQLSearchWithoutPagination>;
  SharedFolder: ResolverTypeWrapper<GQLSharedFolder>;
  SortResult: ResolverTypeWrapper<GQLSortResult>;
  String: ResolverTypeWrapper<Scalars['String']>;
  StringRecord: ResolverTypeWrapper<Scalars['StringRecord']>;
  Subject: ResolverTypeWrapper<GQLSubject>;
  SubjectLink: ResolverTypeWrapper<GQLSubjectLink>;
  SubjectPage: ResolverTypeWrapper<GQLSubjectPage>;
  SubjectPageAbout: ResolverTypeWrapper<GQLSubjectPageAbout>;
  SubjectPageBanner: ResolverTypeWrapper<GQLSubjectPageBanner>;
  SubjectPageVisualElement: ResolverTypeWrapper<GQLSubjectPageVisualElement>;
  SuggestOption: ResolverTypeWrapper<GQLSuggestOption>;
  SuggestionResult: ResolverTypeWrapper<GQLSuggestionResult>;
  Tags: ResolverTypeWrapper<GQLTags>;
  TaxonomyContext: ResolverTypeWrapper<GQLTaxonomyContext>;
  TaxonomyEntity: GQLResolversTypes['Resource'] | GQLResolversTypes['Subject'] | GQLResolversTypes['Topic'];
  TaxonomyMetadata: ResolverTypeWrapper<GQLTaxonomyMetadata>;
  Title: ResolverTypeWrapper<GQLTitle>;
  Topic: ResolverTypeWrapper<GQLTopic>;
  Transcription: ResolverTypeWrapper<GQLTranscription>;
  UpdatedFolder: ResolverTypeWrapper<GQLUpdatedFolder>;
  UpdatedFolderResource: ResolverTypeWrapper<GQLUpdatedFolderResource>;
  UptimeAlert: ResolverTypeWrapper<GQLUptimeAlert>;
  VideoFolderResourceMeta: ResolverTypeWrapper<GQLVideoFolderResourceMeta>;
  VisualElement: ResolverTypeWrapper<GQLVisualElement>;
  VisualElementOembed: ResolverTypeWrapper<GQLVisualElementOembed>;
  WithArticle: GQLResolversTypes['Resource'] | GQLResolversTypes['Topic'];
};

/** Mapping between all available schema types and the resolvers parents */
export type GQLResolversParentTypes = {
  AggregationResult: GQLAggregationResult;
  ArenaBreadcrumb: GQLArenaBreadcrumb;
  ArenaCategory: GQLArenaCategory;
  ArenaPost: GQLArenaPost;
  ArenaTopic: GQLArenaTopic;
  ArenaUser: GQLArenaUser;
  Article: GQLArticle;
  ArticleFolderResourceMeta: GQLArticleFolderResourceMeta;
  ArticleMetaData: GQLArticleMetaData;
  ArticleRequiredLibrary: GQLArticleRequiredLibrary;
  ArticleSearchResult: GQLArticleSearchResult;
  Audio: GQLAudio;
  AudioFile: GQLAudioFile;
  AudioFolderResourceMeta: GQLAudioFolderResourceMeta;
  AudioLicense: GQLAudioLicense;
  AudioSearch: GQLAudioSearch;
  AudioSummary: GQLAudioSummary;
  Boolean: Scalars['Boolean'];
  Breadcrumb: GQLBreadcrumb;
  BrightcoveCustomFields: GQLBrightcoveCustomFields;
  BrightcoveElement: GQLBrightcoveElement;
  BrightcoveIframe: GQLBrightcoveIframe;
  BrightcoveLicense: GQLBrightcoveLicense;
  BucketResult: GQLBucketResult;
  Caption: GQLCaption;
  Category: GQLCategory;
  CompetenceGoal: GQLCompetenceGoal;
  Concept: GQLConcept;
  ConceptCopyright: GQLConceptCopyright;
  ConceptFolderResourceMeta: GQLConceptFolderResourceMeta;
  ConceptLicense: GQLConceptLicense;
  ConceptResult: GQLConceptResult;
  ConfigMetaBoolean: GQLConfigMetaBoolean;
  ConfigMetaStringList: GQLConfigMetaStringList;
  Contributor: GQLContributor;
  Copyright: GQLCopyright;
  CoreElement: GQLCoreElement;
  CoverPhoto: GQLCoverPhoto;
  CrossSubjectElement: GQLCrossSubjectElement;
  Description: GQLDescription;
  EditorNote: GQLEditorNote;
  Element: GQLElement;
  EmbedVisualelement: GQLEmbedVisualelement;
  Examples: GQLExamples;
  FilmFrontpage: GQLFilmFrontpage;
  FilmPageAbout: GQLFilmPageAbout;
  Float: Scalars['Float'];
  Folder: GQLFolder;
  FolderResource: GQLFolderResource;
  FolderResourceMeta: GQLResolversParentTypes['ArticleFolderResourceMeta'] | GQLResolversParentTypes['AudioFolderResourceMeta'] | GQLResolversParentTypes['ConceptFolderResourceMeta'] | GQLResolversParentTypes['ImageFolderResourceMeta'] | GQLResolversParentTypes['LearningpathFolderResourceMeta'] | GQLResolversParentTypes['VideoFolderResourceMeta'];
  FolderResourceMetaSearchInput: GQLFolderResourceMetaSearchInput;
  FolderResourceResourceType: GQLFolderResourceResourceType;
  FootNote: GQLFootNote;
  FrontPageResources: GQLFrontPageResources;
  FrontpageMenu: GQLFrontpageMenu;
  FrontpageSearch: GQLFrontpageSearch;
  FrontpageSearchResult: GQLFrontpageSearchResult;
  Gloss: GQLGloss;
  Grade: GQLGrade;
  GroupSearch: GQLGroupSearch;
  GroupSearchResult: GQLGroupSearchResult;
  H5pElement: GQLH5pElement;
  H5pLicense: GQLH5pLicense;
  ImageAltText: GQLImageAltText;
  ImageDimensions: GQLImageDimensions;
  ImageElement: GQLImageElement;
  ImageFolderResourceMeta: GQLImageFolderResourceMeta;
  ImageLicense: GQLImageLicense;
  ImageMetaInformation: GQLImageMetaInformation;
  ImageMetaInformationV2: GQLImageMetaInformationV2;
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
  MyNdlaPersonalData: GQLMyNdlaPersonalData;
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
  ProgrammePage: GQLProgrammePage;
  Query: {};
  Reference: GQLReference;
  RelatedContent: GQLRelatedContent;
  Resource: GQLResource;
  ResourceEmbed: GQLResourceEmbed;
  ResourceEmbedInput: GQLResourceEmbedInput;
  ResourceMetaData: GQLResourceMetaData;
  ResourceType: GQLResourceType;
  ResourceTypeDefinition: GQLResourceTypeDefinition;
  Search: GQLSearch;
  SearchContext: GQLSearchContext;
  SearchContextFilter: GQLSearchContextFilter;
  SearchContextResourceTypes: GQLSearchContextResourceTypes;
  SearchResult: GQLResolversParentTypes['ArticleSearchResult'] | GQLResolversParentTypes['LearningpathSearchResult'];
  SearchSuggestion: GQLSearchSuggestion;
  SearchWithoutPagination: GQLSearchWithoutPagination;
  SharedFolder: GQLSharedFolder;
  SortResult: GQLSortResult;
  String: Scalars['String'];
  StringRecord: Scalars['StringRecord'];
  Subject: GQLSubject;
  SubjectLink: GQLSubjectLink;
  SubjectPage: GQLSubjectPage;
  SubjectPageAbout: GQLSubjectPageAbout;
  SubjectPageBanner: GQLSubjectPageBanner;
  SubjectPageVisualElement: GQLSubjectPageVisualElement;
  SuggestOption: GQLSuggestOption;
  SuggestionResult: GQLSuggestionResult;
  Tags: GQLTags;
  TaxonomyContext: GQLTaxonomyContext;
  TaxonomyEntity: GQLResolversParentTypes['Resource'] | GQLResolversParentTypes['Subject'] | GQLResolversParentTypes['Topic'];
  TaxonomyMetadata: GQLTaxonomyMetadata;
  Title: GQLTitle;
  Topic: GQLTopic;
  Transcription: GQLTranscription;
  UpdatedFolder: GQLUpdatedFolder;
  UpdatedFolderResource: GQLUpdatedFolderResource;
  UptimeAlert: GQLUptimeAlert;
  VideoFolderResourceMeta: GQLVideoFolderResourceMeta;
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

export type GQLArenaBreadcrumbResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ArenaBreadcrumb'] = GQLResolversParentTypes['ArenaBreadcrumb']> = {
  id?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLArenaCategoryResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ArenaCategory'] = GQLResolversParentTypes['ArenaCategory']> = {
  description?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  disabled?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
  htmlDescription?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  postCount?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  slug?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  topicCount?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  topics?: Resolver<Maybe<Array<GQLResolversTypes['ArenaTopic']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLArenaPostResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ArenaPost'] = GQLResolversParentTypes['ArenaPost']> = {
  content?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  isMainPost?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
  timestamp?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  topicId?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  user?: Resolver<GQLResolversTypes['ArenaUser'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLArenaTopicResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ArenaTopic'] = GQLResolversParentTypes['ArenaTopic']> = {
  breadcrumbs?: Resolver<Array<GQLResolversTypes['ArenaBreadcrumb']>, ParentType, ContextType>;
  categoryId?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  locked?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
  postCount?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  posts?: Resolver<Array<GQLResolversTypes['ArenaPost']>, ParentType, ContextType>;
  slug?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLArenaUserResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ArenaUser'] = GQLResolversParentTypes['ArenaUser']> = {
  displayName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  profilePicture?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  slug?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
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
  language?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
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
  slug?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  supportedLanguages?: Resolver<Maybe<Array<GQLResolversTypes['String']>>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<GQLResolversTypes['String']>>, ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  updated?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  visualElement?: Resolver<Maybe<GQLResolversTypes['VisualElement']>, ParentType, ContextType>;
  visualElementEmbed?: Resolver<Maybe<GQLResolversTypes['ResourceEmbed']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLArticleFolderResourceMetaResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ArticleFolderResourceMeta'] = GQLResolversParentTypes['ArticleFolderResourceMeta']> = {
  description?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
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
  series?: Resolver<Maybe<GQLResolversTypes['PodcastSeries']>, ParentType, ContextType>;
  supportedLanguages?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  tags?: Resolver<GQLResolversTypes['Tags'], ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['Title'], ParentType, ContextType>;
  updated?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLAudioFileResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['AudioFile'] = GQLResolversParentTypes['AudioFile']> = {
  fileSize?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  language?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  mimeType?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLAudioFolderResourceMetaResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['AudioFolderResourceMeta'] = GQLResolversParentTypes['AudioFolderResourceMeta']> = {
  description?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  metaImage?: Resolver<Maybe<GQLResolversTypes['MetaImage']>, ParentType, ContextType>;
  resourceTypes?: Resolver<Array<GQLResolversTypes['FolderResourceResourceType']>, ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLAudioLicenseResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['AudioLicense'] = GQLResolversParentTypes['AudioLicense']> = {
  copyText?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  copyright?: Resolver<GQLResolversTypes['Copyright'], ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
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

export type GQLBreadcrumbResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Breadcrumb'] = GQLResolversParentTypes['Breadcrumb']> = {
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLBrightcoveCustomFieldsResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['BrightcoveCustomFields'] = GQLResolversParentTypes['BrightcoveCustomFields']> = {
  accountId?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  license?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  licenseInfo?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLBrightcoveElementResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['BrightcoveElement'] = GQLResolversParentTypes['BrightcoveElement']> = {
  account?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  caption?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  cover?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  customFields?: Resolver<Maybe<GQLResolversTypes['BrightcoveCustomFields']>, ParentType, ContextType>;
  description?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  download?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  iframe?: Resolver<Maybe<GQLResolversTypes['BrightcoveIframe']>, ParentType, ContextType>;
  name?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
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
  copyright?: Resolver<Maybe<GQLResolversTypes['Copyright']>, ParentType, ContextType>;
  cover?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  download?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
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

export type GQLCaptionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Caption'] = GQLResolversParentTypes['Caption']> = {
  caption?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  language?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCategoryResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Category'] = GQLResolversParentTypes['Category']> = {
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  isProgrammeSubject?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
  subjects?: Resolver<Maybe<Array<GQLResolversTypes['Subject']>>, ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['Title'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCompetenceGoalResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['CompetenceGoal'] = GQLResolversParentTypes['CompetenceGoal']> = {
  code?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
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
  conceptType?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  copyright?: Resolver<Maybe<GQLResolversTypes['ConceptCopyright']>, ParentType, ContextType>;
  created?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  glossData?: Resolver<Maybe<GQLResolversTypes['Gloss']>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  image?: Resolver<Maybe<GQLResolversTypes['ImageLicense']>, ParentType, ContextType>;
  metaImage?: Resolver<Maybe<GQLResolversTypes['MetaImage']>, ParentType, ContextType>;
  source?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  subjectIds?: Resolver<Maybe<Array<GQLResolversTypes['String']>>, ParentType, ContextType>;
  subjectNames?: Resolver<Maybe<Array<GQLResolversTypes['String']>>, ParentType, ContextType>;
  supportedLanguages?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  tags?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  visualElement?: Resolver<Maybe<GQLResolversTypes['VisualElement']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLConceptCopyrightResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ConceptCopyright'] = GQLResolversParentTypes['ConceptCopyright']> = {
  creators?: Resolver<Array<GQLResolversTypes['Contributor']>, ParentType, ContextType>;
  license?: Resolver<Maybe<GQLResolversTypes['License']>, ParentType, ContextType>;
  origin?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  processed?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>;
  processors?: Resolver<Array<GQLResolversTypes['Contributor']>, ParentType, ContextType>;
  rightsholders?: Resolver<Array<GQLResolversTypes['Contributor']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLConceptFolderResourceMetaResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ConceptFolderResourceMeta'] = GQLResolversParentTypes['ConceptFolderResourceMeta']> = {
  description?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  metaImage?: Resolver<Maybe<GQLResolversTypes['MetaImage']>, ParentType, ContextType>;
  resourceTypes?: Resolver<Array<GQLResolversTypes['FolderResourceResourceType']>, ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLConceptLicenseResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ConceptLicense'] = GQLResolversParentTypes['ConceptLicense']> = {
  content?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  copyright?: Resolver<Maybe<GQLResolversTypes['ConceptCopyright']>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  metaImageUrl?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
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

export type GQLConfigMetaBooleanResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ConfigMetaBoolean'] = GQLResolversParentTypes['ConfigMetaBoolean']> = {
  key?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLConfigMetaStringListResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ConfigMetaStringList'] = GQLResolversParentTypes['ConfigMetaStringList']> = {
  key?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
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
  processed?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>;
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

export type GQLEditorNoteResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['EditorNote'] = GQLResolversParentTypes['EditorNote']> = {
  note?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  updatedBy?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
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

export type GQLExamplesResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Examples'] = GQLResolversParentTypes['Examples']> = {
  example?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  language?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  transcriptions?: Resolver<GQLResolversTypes['Transcription'], ParentType, ContextType>;
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
  created?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  parentId?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  resources?: Resolver<Array<GQLResolversTypes['FolderResource']>, ParentType, ContextType>;
  status?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  subfolders?: Resolver<Array<GQLResolversTypes['Folder']>, ParentType, ContextType>;
  updated?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLFolderResourceResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['FolderResource'] = GQLResolversParentTypes['FolderResource']> = {
  created?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  path?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  resourceId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  resourceType?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  tags?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLFolderResourceMetaResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['FolderResourceMeta'] = GQLResolversParentTypes['FolderResourceMeta']> = {
  __resolveType: TypeResolveFn<'ArticleFolderResourceMeta' | 'AudioFolderResourceMeta' | 'ConceptFolderResourceMeta' | 'ImageFolderResourceMeta' | 'LearningpathFolderResourceMeta' | 'VideoFolderResourceMeta', ParentType, ContextType>;
  description?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
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

export type GQLFrontpageMenuResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['FrontpageMenu'] = GQLResolversParentTypes['FrontpageMenu']> = {
  article?: Resolver<GQLResolversTypes['Article'], ParentType, ContextType>;
  articleId?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  menu?: Resolver<Maybe<Array<Maybe<GQLResolversTypes['FrontpageMenu']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLFrontpageSearchResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['FrontpageSearch'] = GQLResolversParentTypes['FrontpageSearch']> = {
  learningResources?: Resolver<GQLResolversTypes['FrontPageResources'], ParentType, ContextType>;
  topicResources?: Resolver<GQLResolversTypes['FrontPageResources'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLFrontpageSearchResultResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['FrontpageSearchResult'] = GQLResolversParentTypes['FrontpageSearchResult']> = {
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  path?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  resourceTypes?: Resolver<Array<GQLResolversTypes['SearchContextResourceTypes']>, ParentType, ContextType>;
  subject?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLGlossResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Gloss'] = GQLResolversParentTypes['Gloss']> = {
  examples?: Resolver<Maybe<Array<Array<GQLResolversTypes['Examples']>>>, ParentType, ContextType>;
  gloss?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  originalLanguage?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  transcriptions?: Resolver<GQLResolversTypes['Transcription'], ParentType, ContextType>;
  wordClass?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLGradeResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Grade'] = GQLResolversParentTypes['Grade']> = {
  categories?: Resolver<Maybe<Array<GQLResolversTypes['Category']>>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['Title'], ParentType, ContextType>;
  url?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
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
  copyright?: Resolver<Maybe<GQLResolversTypes['Copyright']>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  src?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  thumbnail?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLImageAltTextResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ImageAltText'] = GQLResolversParentTypes['ImageAltText']> = {
  alttext?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  language?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLImageDimensionsResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ImageDimensions'] = GQLResolversParentTypes['ImageDimensions']> = {
  height?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  width?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
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

export type GQLImageFolderResourceMetaResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ImageFolderResourceMeta'] = GQLResolversParentTypes['ImageFolderResourceMeta']> = {
  description?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  metaImage?: Resolver<Maybe<GQLResolversTypes['MetaImage']>, ParentType, ContextType>;
  resourceTypes?: Resolver<Array<GQLResolversTypes['FolderResourceResourceType']>, ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLImageLicenseResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ImageLicense'] = GQLResolversParentTypes['ImageLicense']> = {
  altText?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  contentType?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  copyText?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  copyright?: Resolver<GQLResolversTypes['Copyright'], ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
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

export type GQLImageMetaInformationV2Resolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ImageMetaInformationV2'] = GQLResolversParentTypes['ImageMetaInformationV2']> = {
  alttext?: Resolver<GQLResolversTypes['ImageAltText'], ParentType, ContextType>;
  caption?: Resolver<GQLResolversTypes['Caption'], ParentType, ContextType>;
  contentType?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  copyright?: Resolver<GQLResolversTypes['Copyright'], ParentType, ContextType>;
  created?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  createdBy?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  editorNotes?: Resolver<Maybe<Array<GQLResolversTypes['EditorNote']>>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  imageDimensions?: Resolver<Maybe<GQLResolversTypes['ImageDimensions']>, ParentType, ContextType>;
  imageUrl?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  metaUrl?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  modelRelease?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  size?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  supportedLanguages?: Resolver<Maybe<Array<GQLResolversTypes['String']>>, ParentType, ContextType>;
  tags?: Resolver<GQLResolversTypes['Tags'], ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['Title'], ParentType, ContextType>;
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
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
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
  copySharedFolder?: Resolver<GQLResolversTypes['Folder'], ParentType, ContextType, RequireFields<GQLMutationCopySharedFolderArgs, 'folderId'>>;
  deleteFolder?: Resolver<GQLResolversTypes['String'], ParentType, ContextType, RequireFields<GQLMutationDeleteFolderArgs, 'id'>>;
  deleteFolderResource?: Resolver<GQLResolversTypes['String'], ParentType, ContextType, RequireFields<GQLMutationDeleteFolderResourceArgs, 'folderId' | 'resourceId'>>;
  deletePersonalData?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
  sortFolders?: Resolver<GQLResolversTypes['SortResult'], ParentType, ContextType, RequireFields<GQLMutationSortFoldersArgs, 'sortedIds'>>;
  sortResources?: Resolver<GQLResolversTypes['SortResult'], ParentType, ContextType, RequireFields<GQLMutationSortResourcesArgs, 'parentId' | 'sortedIds'>>;
  transformArticleContent?: Resolver<GQLResolversTypes['String'], ParentType, ContextType, RequireFields<GQLMutationTransformArticleContentArgs, 'content'>>;
  updateFolder?: Resolver<GQLResolversTypes['Folder'], ParentType, ContextType, RequireFields<GQLMutationUpdateFolderArgs, 'id'>>;
  updateFolderResource?: Resolver<GQLResolversTypes['FolderResource'], ParentType, ContextType, RequireFields<GQLMutationUpdateFolderResourceArgs, 'id'>>;
  updateFolderStatus?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType, RequireFields<GQLMutationUpdateFolderStatusArgs, 'folderId' | 'status'>>;
  updatePersonalData?: Resolver<GQLResolversTypes['MyNdlaPersonalData'], ParentType, ContextType, RequireFields<GQLMutationUpdatePersonalDataArgs, 'favoriteSubjects'>>;
};

export type GQLMyNdlaPersonalDataResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['MyNdlaPersonalData'] = GQLResolversParentTypes['MyNdlaPersonalData']> = {
  arenaEnabled?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
  favoriteSubjects?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  organization?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
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
  coverPhotoUrl?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
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
  hasRSS?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  image?: Resolver<GQLResolversTypes['ImageMetaInformation'], ParentType, ContextType>;
  supportedLanguages?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['Title'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLPodcastSeriesBaseResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['PodcastSeriesBase'] = GQLResolversParentTypes['PodcastSeriesBase']> = {
  __resolveType: TypeResolveFn<'PodcastSeries' | 'PodcastSeriesWithEpisodes', ParentType, ContextType>;
  coverPhoto?: Resolver<GQLResolversTypes['CoverPhoto'], ParentType, ContextType>;
  description?: Resolver<GQLResolversTypes['Description'], ParentType, ContextType>;
  hasRSS?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  image?: Resolver<GQLResolversTypes['ImageMetaInformation'], ParentType, ContextType>;
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
  content?: Resolver<Maybe<GQLResolversTypes['ResourceEmbed']>, ParentType, ContextType>;
  coverPhoto?: Resolver<GQLResolversTypes['CoverPhoto'], ParentType, ContextType>;
  description?: Resolver<GQLResolversTypes['Description'], ParentType, ContextType>;
  episodes?: Resolver<Maybe<Array<GQLResolversTypes['Audio']>>, ParentType, ContextType>;
  hasRSS?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  image?: Resolver<GQLResolversTypes['ImageMetaInformation'], ParentType, ContextType>;
  supportedLanguages?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['Title'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLProgrammePageResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ProgrammePage'] = GQLResolversParentTypes['ProgrammePage']> = {
  contentUri?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  desktopImage?: Resolver<Maybe<GQLResolversTypes['MetaImage']>, ParentType, ContextType>;
  grades?: Resolver<Maybe<Array<GQLResolversTypes['Grade']>>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  metaDescription?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  mobileImage?: Resolver<Maybe<GQLResolversTypes['MetaImage']>, ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['Title'], ParentType, ContextType>;
  url?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLQueryResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Query'] = GQLResolversParentTypes['Query']> = {
  alerts?: Resolver<Maybe<Array<Maybe<GQLResolversTypes['UptimeAlert']>>>, ParentType, ContextType>;
  allFolderResources?: Resolver<Array<GQLResolversTypes['FolderResource']>, ParentType, ContextType, Partial<GQLQueryAllFolderResourcesArgs>>;
  arenaCategories?: Resolver<Array<GQLResolversTypes['ArenaCategory']>, ParentType, ContextType>;
  arenaCategory?: Resolver<Maybe<GQLResolversTypes['ArenaCategory']>, ParentType, ContextType, RequireFields<GQLQueryArenaCategoryArgs, 'categoryId' | 'page'>>;
  arenaEnabledOrgs?: Resolver<Maybe<GQLResolversTypes['ConfigMetaStringList']>, ParentType, ContextType>;
  arenaRecentTopics?: Resolver<Array<GQLResolversTypes['ArenaTopic']>, ParentType, ContextType>;
  arenaTopic?: Resolver<Maybe<GQLResolversTypes['ArenaTopic']>, ParentType, ContextType, RequireFields<GQLQueryArenaTopicArgs, 'page' | 'topicId'>>;
  arenaTopicsByUser?: Resolver<Array<GQLResolversTypes['ArenaTopic']>, ParentType, ContextType, RequireFields<GQLQueryArenaTopicsByUserArgs, 'userSlug'>>;
  arenaUser?: Resolver<Maybe<GQLResolversTypes['ArenaUser']>, ParentType, ContextType, RequireFields<GQLQueryArenaUserArgs, 'username'>>;
  article?: Resolver<Maybe<GQLResolversTypes['Article']>, ParentType, ContextType, RequireFields<GQLQueryArticleArgs, 'id'>>;
  audio?: Resolver<Maybe<GQLResolversTypes['Audio']>, ParentType, ContextType, RequireFields<GQLQueryAudioArgs, 'id'>>;
  competenceGoal?: Resolver<Maybe<GQLResolversTypes['CompetenceGoal']>, ParentType, ContextType, RequireFields<GQLQueryCompetenceGoalArgs, 'code'>>;
  competenceGoals?: Resolver<Maybe<Array<GQLResolversTypes['CompetenceGoal']>>, ParentType, ContextType, Partial<GQLQueryCompetenceGoalsArgs>>;
  concept?: Resolver<Maybe<GQLResolversTypes['Concept']>, ParentType, ContextType, RequireFields<GQLQueryConceptArgs, 'id'>>;
  conceptSearch?: Resolver<Maybe<GQLResolversTypes['ConceptResult']>, ParentType, ContextType, Partial<GQLQueryConceptSearchArgs>>;
  coreElement?: Resolver<Maybe<GQLResolversTypes['CoreElement']>, ParentType, ContextType, RequireFields<GQLQueryCoreElementArgs, 'code'>>;
  coreElements?: Resolver<Maybe<Array<GQLResolversTypes['CoreElement']>>, ParentType, ContextType, Partial<GQLQueryCoreElementsArgs>>;
  examLockStatus?: Resolver<GQLResolversTypes['ConfigMetaBoolean'], ParentType, ContextType>;
  filmfrontpage?: Resolver<Maybe<GQLResolversTypes['FilmFrontpage']>, ParentType, ContextType>;
  folder?: Resolver<GQLResolversTypes['Folder'], ParentType, ContextType, RequireFields<GQLQueryFolderArgs, 'id'>>;
  folderResourceMeta?: Resolver<Maybe<GQLResolversTypes['FolderResourceMeta']>, ParentType, ContextType, RequireFields<GQLQueryFolderResourceMetaArgs, 'resource'>>;
  folderResourceMetaSearch?: Resolver<Array<GQLResolversTypes['FolderResourceMeta']>, ParentType, ContextType, RequireFields<GQLQueryFolderResourceMetaSearchArgs, 'resources'>>;
  folders?: Resolver<Array<GQLResolversTypes['Folder']>, ParentType, ContextType, Partial<GQLQueryFoldersArgs>>;
  frontpage?: Resolver<Maybe<GQLResolversTypes['FrontpageMenu']>, ParentType, ContextType>;
  frontpageSearch?: Resolver<Maybe<GQLResolversTypes['FrontpageSearch']>, ParentType, ContextType, Partial<GQLQueryFrontpageSearchArgs>>;
  groupSearch?: Resolver<Maybe<Array<GQLResolversTypes['GroupSearch']>>, ParentType, ContextType, Partial<GQLQueryGroupSearchArgs>>;
  image?: Resolver<Maybe<GQLResolversTypes['ImageMetaInformationV2']>, ParentType, ContextType, RequireFields<GQLQueryImageArgs, 'id'>>;
  learningpath?: Resolver<Maybe<GQLResolversTypes['Learningpath']>, ParentType, ContextType, RequireFields<GQLQueryLearningpathArgs, 'pathId'>>;
  listingPage?: Resolver<Maybe<GQLResolversTypes['ListingPage']>, ParentType, ContextType, Partial<GQLQueryListingPageArgs>>;
  personalData?: Resolver<GQLResolversTypes['MyNdlaPersonalData'], ParentType, ContextType>;
  podcastSearch?: Resolver<Maybe<GQLResolversTypes['AudioSearch']>, ParentType, ContextType, RequireFields<GQLQueryPodcastSearchArgs, 'page' | 'pageSize'>>;
  podcastSeries?: Resolver<Maybe<GQLResolversTypes['PodcastSeriesWithEpisodes']>, ParentType, ContextType, RequireFields<GQLQueryPodcastSeriesArgs, 'id'>>;
  podcastSeriesSearch?: Resolver<Maybe<GQLResolversTypes['PodcastSeriesSearch']>, ParentType, ContextType, RequireFields<GQLQueryPodcastSeriesSearchArgs, 'page' | 'pageSize'>>;
  programme?: Resolver<Maybe<GQLResolversTypes['ProgrammePage']>, ParentType, ContextType, Partial<GQLQueryProgrammeArgs>>;
  programmes?: Resolver<Maybe<Array<GQLResolversTypes['ProgrammePage']>>, ParentType, ContextType>;
  resource?: Resolver<Maybe<GQLResolversTypes['Resource']>, ParentType, ContextType, RequireFields<GQLQueryResourceArgs, 'id'>>;
  resourceEmbed?: Resolver<GQLResolversTypes['ResourceEmbed'], ParentType, ContextType, RequireFields<GQLQueryResourceEmbedArgs, 'id' | 'type'>>;
  resourceEmbeds?: Resolver<GQLResolversTypes['ResourceEmbed'], ParentType, ContextType, RequireFields<GQLQueryResourceEmbedsArgs, 'resources'>>;
  resourceTypes?: Resolver<Maybe<Array<GQLResolversTypes['ResourceTypeDefinition']>>, ParentType, ContextType>;
  search?: Resolver<Maybe<GQLResolversTypes['Search']>, ParentType, ContextType, Partial<GQLQuerySearchArgs>>;
  searchWithoutPagination?: Resolver<Maybe<GQLResolversTypes['SearchWithoutPagination']>, ParentType, ContextType, Partial<GQLQuerySearchWithoutPaginationArgs>>;
  sharedFolder?: Resolver<GQLResolversTypes['SharedFolder'], ParentType, ContextType, RequireFields<GQLQuerySharedFolderArgs, 'id'>>;
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
  breadcrumbs?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  contentUri?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  contexts?: Resolver<Array<GQLResolversTypes['TaxonomyContext']>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  language?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
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
  url?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLResourceEmbedResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ResourceEmbed'] = GQLResolversParentTypes['ResourceEmbed']> = {
  content?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  meta?: Resolver<GQLResolversTypes['ResourceMetaData'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLResourceMetaDataResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ResourceMetaData'] = GQLResolversParentTypes['ResourceMetaData']> = {
  audios?: Resolver<Maybe<Array<GQLResolversTypes['AudioLicense']>>, ParentType, ContextType>;
  brightcoves?: Resolver<Maybe<Array<GQLResolversTypes['BrightcoveLicense']>>, ParentType, ContextType>;
  concepts?: Resolver<Maybe<Array<GQLResolversTypes['ConceptLicense']>>, ParentType, ContextType>;
  h5ps?: Resolver<Maybe<Array<GQLResolversTypes['H5pLicense']>>, ParentType, ContextType>;
  images?: Resolver<Maybe<Array<GQLResolversTypes['ImageLicense']>>, ParentType, ContextType>;
  podcasts?: Resolver<Maybe<Array<GQLResolversTypes['PodcastLicense']>>, ParentType, ContextType>;
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
  contextId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  contextType?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  isActive?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
  isPrimary?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
  isVisible?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
  language?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  learningResourceType?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  parentIds?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  path?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  publicId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  relevance?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  relevanceId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  resourceTypes?: Resolver<Array<GQLResolversTypes['SearchContextResourceTypes']>, ParentType, ContextType>;
  root?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  rootId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
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

export type GQLSharedFolderResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['SharedFolder'] = GQLResolversParentTypes['SharedFolder']> = {
  breadcrumbs?: Resolver<Array<GQLResolversTypes['Breadcrumb']>, ParentType, ContextType>;
  created?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  parentId?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  resources?: Resolver<Array<GQLResolversTypes['FolderResource']>, ParentType, ContextType>;
  status?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  subfolders?: Resolver<Array<GQLResolversTypes['SharedFolder']>, ParentType, ContextType>;
  updated?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
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
  breadcrumbs?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  contentUri?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  contexts?: Resolver<Array<GQLResolversTypes['TaxonomyContext']>, ParentType, ContextType>;
  grepCodes?: Resolver<Maybe<Array<GQLResolversTypes['String']>>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  language?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  metadata?: Resolver<GQLResolversTypes['TaxonomyMetadata'], ParentType, ContextType>;
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  path?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  paths?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  relevanceId?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  resourceTypes?: Resolver<Maybe<Array<GQLResolversTypes['ResourceType']>>, ParentType, ContextType>;
  subjectpage?: Resolver<Maybe<GQLResolversTypes['SubjectPage']>, ParentType, ContextType>;
  supportedLanguages?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  topics?: Resolver<Maybe<Array<GQLResolversTypes['Topic']>>, ParentType, ContextType, Partial<GQLSubjectTopicsArgs>>;
  url?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLSubjectLinkResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['SubjectLink'] = GQLResolversParentTypes['SubjectLink']> = {
  name?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  path?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLSubjectPageResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['SubjectPage'] = GQLResolversParentTypes['SubjectPage']> = {
  about?: Resolver<Maybe<GQLResolversTypes['SubjectPageAbout']>, ParentType, ContextType>;
  banner?: Resolver<GQLResolversTypes['SubjectPageBanner'], ParentType, ContextType>;
  buildsOn?: Resolver<Array<Maybe<GQLResolversTypes['SubjectLink']>>, ParentType, ContextType>;
  connectedTo?: Resolver<Array<Maybe<GQLResolversTypes['SubjectLink']>>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  leadsTo?: Resolver<Array<Maybe<GQLResolversTypes['SubjectLink']>>, ParentType, ContextType>;
  metaDescription?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  supportedLanguages?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
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

export type GQLTaxonomyContextResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['TaxonomyContext'] = GQLResolversParentTypes['TaxonomyContext']> = {
  breadcrumbs?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  parentIds?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  path?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLTaxonomyEntityResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['TaxonomyEntity'] = GQLResolversParentTypes['TaxonomyEntity']> = {
  __resolveType: TypeResolveFn<'Resource' | 'Subject' | 'Topic', ParentType, ContextType>;
  breadcrumbs?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  contentUri?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  contexts?: Resolver<Array<GQLResolversTypes['TaxonomyContext']>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  language?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  metadata?: Resolver<GQLResolversTypes['TaxonomyMetadata'], ParentType, ContextType>;
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  path?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  paths?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  relevanceId?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  resourceTypes?: Resolver<Maybe<Array<GQLResolversTypes['ResourceType']>>, ParentType, ContextType>;
  supportedLanguages?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
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
  breadcrumbs?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  contentUri?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  contexts?: Resolver<Array<GQLResolversTypes['TaxonomyContext']>, ParentType, ContextType>;
  coreResources?: Resolver<Maybe<Array<GQLResolversTypes['Resource']>>, ParentType, ContextType, Partial<GQLTopicCoreResourcesArgs>>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  isPrimary?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>;
  language?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  meta?: Resolver<Maybe<GQLResolversTypes['Meta']>, ParentType, ContextType>;
  metadata?: Resolver<GQLResolversTypes['TaxonomyMetadata'], ParentType, ContextType>;
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  parent?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  parentId?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  path?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  pathTopics?: Resolver<Maybe<Array<Array<GQLResolversTypes['Topic']>>>, ParentType, ContextType>;
  paths?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  relevanceId?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  resourceTypes?: Resolver<Maybe<Array<GQLResolversTypes['ResourceType']>>, ParentType, ContextType>;
  subtopics?: Resolver<Maybe<Array<GQLResolversTypes['Topic']>>, ParentType, ContextType>;
  supplementaryResources?: Resolver<Maybe<Array<GQLResolversTypes['Resource']>>, ParentType, ContextType, Partial<GQLTopicSupplementaryResourcesArgs>>;
  supportedLanguages?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLTranscriptionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Transcription'] = GQLResolversParentTypes['Transcription']> = {
  pinyin?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  traditional?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
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

export type GQLVideoFolderResourceMetaResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['VideoFolderResourceMeta'] = GQLResolversParentTypes['VideoFolderResourceMeta']> = {
  description?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  metaImage?: Resolver<Maybe<GQLResolversTypes['MetaImage']>, ParentType, ContextType>;
  resourceTypes?: Resolver<Array<GQLResolversTypes['FolderResourceResourceType']>, ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
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
  ArenaBreadcrumb?: GQLArenaBreadcrumbResolvers<ContextType>;
  ArenaCategory?: GQLArenaCategoryResolvers<ContextType>;
  ArenaPost?: GQLArenaPostResolvers<ContextType>;
  ArenaTopic?: GQLArenaTopicResolvers<ContextType>;
  ArenaUser?: GQLArenaUserResolvers<ContextType>;
  Article?: GQLArticleResolvers<ContextType>;
  ArticleFolderResourceMeta?: GQLArticleFolderResourceMetaResolvers<ContextType>;
  ArticleMetaData?: GQLArticleMetaDataResolvers<ContextType>;
  ArticleRequiredLibrary?: GQLArticleRequiredLibraryResolvers<ContextType>;
  ArticleSearchResult?: GQLArticleSearchResultResolvers<ContextType>;
  Audio?: GQLAudioResolvers<ContextType>;
  AudioFile?: GQLAudioFileResolvers<ContextType>;
  AudioFolderResourceMeta?: GQLAudioFolderResourceMetaResolvers<ContextType>;
  AudioLicense?: GQLAudioLicenseResolvers<ContextType>;
  AudioSearch?: GQLAudioSearchResolvers<ContextType>;
  AudioSummary?: GQLAudioSummaryResolvers<ContextType>;
  Breadcrumb?: GQLBreadcrumbResolvers<ContextType>;
  BrightcoveCustomFields?: GQLBrightcoveCustomFieldsResolvers<ContextType>;
  BrightcoveElement?: GQLBrightcoveElementResolvers<ContextType>;
  BrightcoveIframe?: GQLBrightcoveIframeResolvers<ContextType>;
  BrightcoveLicense?: GQLBrightcoveLicenseResolvers<ContextType>;
  BucketResult?: GQLBucketResultResolvers<ContextType>;
  Caption?: GQLCaptionResolvers<ContextType>;
  Category?: GQLCategoryResolvers<ContextType>;
  CompetenceGoal?: GQLCompetenceGoalResolvers<ContextType>;
  Concept?: GQLConceptResolvers<ContextType>;
  ConceptCopyright?: GQLConceptCopyrightResolvers<ContextType>;
  ConceptFolderResourceMeta?: GQLConceptFolderResourceMetaResolvers<ContextType>;
  ConceptLicense?: GQLConceptLicenseResolvers<ContextType>;
  ConceptResult?: GQLConceptResultResolvers<ContextType>;
  ConfigMetaBoolean?: GQLConfigMetaBooleanResolvers<ContextType>;
  ConfigMetaStringList?: GQLConfigMetaStringListResolvers<ContextType>;
  Contributor?: GQLContributorResolvers<ContextType>;
  Copyright?: GQLCopyrightResolvers<ContextType>;
  CoreElement?: GQLCoreElementResolvers<ContextType>;
  CoverPhoto?: GQLCoverPhotoResolvers<ContextType>;
  CrossSubjectElement?: GQLCrossSubjectElementResolvers<ContextType>;
  Description?: GQLDescriptionResolvers<ContextType>;
  EditorNote?: GQLEditorNoteResolvers<ContextType>;
  Element?: GQLElementResolvers<ContextType>;
  EmbedVisualelement?: GQLEmbedVisualelementResolvers<ContextType>;
  Examples?: GQLExamplesResolvers<ContextType>;
  FilmFrontpage?: GQLFilmFrontpageResolvers<ContextType>;
  FilmPageAbout?: GQLFilmPageAboutResolvers<ContextType>;
  Folder?: GQLFolderResolvers<ContextType>;
  FolderResource?: GQLFolderResourceResolvers<ContextType>;
  FolderResourceMeta?: GQLFolderResourceMetaResolvers<ContextType>;
  FolderResourceResourceType?: GQLFolderResourceResourceTypeResolvers<ContextType>;
  FootNote?: GQLFootNoteResolvers<ContextType>;
  FrontPageResources?: GQLFrontPageResourcesResolvers<ContextType>;
  FrontpageMenu?: GQLFrontpageMenuResolvers<ContextType>;
  FrontpageSearch?: GQLFrontpageSearchResolvers<ContextType>;
  FrontpageSearchResult?: GQLFrontpageSearchResultResolvers<ContextType>;
  Gloss?: GQLGlossResolvers<ContextType>;
  Grade?: GQLGradeResolvers<ContextType>;
  GroupSearch?: GQLGroupSearchResolvers<ContextType>;
  GroupSearchResult?: GQLGroupSearchResultResolvers<ContextType>;
  H5pElement?: GQLH5pElementResolvers<ContextType>;
  H5pLicense?: GQLH5pLicenseResolvers<ContextType>;
  ImageAltText?: GQLImageAltTextResolvers<ContextType>;
  ImageDimensions?: GQLImageDimensionsResolvers<ContextType>;
  ImageElement?: GQLImageElementResolvers<ContextType>;
  ImageFolderResourceMeta?: GQLImageFolderResourceMetaResolvers<ContextType>;
  ImageLicense?: GQLImageLicenseResolvers<ContextType>;
  ImageMetaInformation?: GQLImageMetaInformationResolvers<ContextType>;
  ImageMetaInformationV2?: GQLImageMetaInformationV2Resolvers<ContextType>;
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
  MyNdlaPersonalData?: GQLMyNdlaPersonalDataResolvers<ContextType>;
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
  ProgrammePage?: GQLProgrammePageResolvers<ContextType>;
  Query?: GQLQueryResolvers<ContextType>;
  Reference?: GQLReferenceResolvers<ContextType>;
  RelatedContent?: GQLRelatedContentResolvers<ContextType>;
  Resource?: GQLResourceResolvers<ContextType>;
  ResourceEmbed?: GQLResourceEmbedResolvers<ContextType>;
  ResourceMetaData?: GQLResourceMetaDataResolvers<ContextType>;
  ResourceType?: GQLResourceTypeResolvers<ContextType>;
  ResourceTypeDefinition?: GQLResourceTypeDefinitionResolvers<ContextType>;
  Search?: GQLSearchResolvers<ContextType>;
  SearchContext?: GQLSearchContextResolvers<ContextType>;
  SearchContextFilter?: GQLSearchContextFilterResolvers<ContextType>;
  SearchContextResourceTypes?: GQLSearchContextResourceTypesResolvers<ContextType>;
  SearchResult?: GQLSearchResultResolvers<ContextType>;
  SearchSuggestion?: GQLSearchSuggestionResolvers<ContextType>;
  SearchWithoutPagination?: GQLSearchWithoutPaginationResolvers<ContextType>;
  SharedFolder?: GQLSharedFolderResolvers<ContextType>;
  SortResult?: GQLSortResultResolvers<ContextType>;
  StringRecord?: GraphQLScalarType;
  Subject?: GQLSubjectResolvers<ContextType>;
  SubjectLink?: GQLSubjectLinkResolvers<ContextType>;
  SubjectPage?: GQLSubjectPageResolvers<ContextType>;
  SubjectPageAbout?: GQLSubjectPageAboutResolvers<ContextType>;
  SubjectPageBanner?: GQLSubjectPageBannerResolvers<ContextType>;
  SubjectPageVisualElement?: GQLSubjectPageVisualElementResolvers<ContextType>;
  SuggestOption?: GQLSuggestOptionResolvers<ContextType>;
  SuggestionResult?: GQLSuggestionResultResolvers<ContextType>;
  Tags?: GQLTagsResolvers<ContextType>;
  TaxonomyContext?: GQLTaxonomyContextResolvers<ContextType>;
  TaxonomyEntity?: GQLTaxonomyEntityResolvers<ContextType>;
  TaxonomyMetadata?: GQLTaxonomyMetadataResolvers<ContextType>;
  Title?: GQLTitleResolvers<ContextType>;
  Topic?: GQLTopicResolvers<ContextType>;
  Transcription?: GQLTranscriptionResolvers<ContextType>;
  UpdatedFolder?: GQLUpdatedFolderResolvers<ContextType>;
  UpdatedFolderResource?: GQLUpdatedFolderResourceResolvers<ContextType>;
  UptimeAlert?: GQLUptimeAlertResolvers<ContextType>;
  VideoFolderResourceMeta?: GQLVideoFolderResourceMetaResolvers<ContextType>;
  VisualElement?: GQLVisualElementResolvers<ContextType>;
  VisualElementOembed?: GQLVisualElementOembedResolvers<ContextType>;
  WithArticle?: GQLWithArticleResolvers<ContextType>;
};

