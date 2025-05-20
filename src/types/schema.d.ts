import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T;
export type InputMaybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  StringRecord: { input: any; output: any; }
};

export type GQLAggregationResult = {
  __typename?: 'AggregationResult';
  docCountErrorUpperBound: Scalars['Int']['output'];
  field: Scalars['String']['output'];
  sumOtherDocCount: Scalars['Int']['output'];
  values: Array<GQLBucketResult>;
};

export type GQLArticle = {
  __typename?: 'Article';
  articleType: Scalars['String']['output'];
  availability?: Maybe<Scalars['String']['output']>;
  competenceGoals?: Maybe<Array<GQLCompetenceGoal>>;
  conceptIds?: Maybe<Array<Scalars['Int']['output']>>;
  concepts?: Maybe<Array<GQLConcept>>;
  content: Scalars['String']['output'];
  copyright: GQLCopyright;
  coreElements?: Maybe<Array<GQLCoreElement>>;
  created: Scalars['String']['output'];
  crossSubjectTopics?: Maybe<Array<GQLCrossSubjectElement>>;
  grepCodes?: Maybe<Array<Scalars['String']['output']>>;
  htmlIntroduction?: Maybe<Scalars['String']['output']>;
  htmlTitle: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  introduction?: Maybe<Scalars['String']['output']>;
  language: Scalars['String']['output'];
  metaDescription: Scalars['String']['output'];
  metaImage?: Maybe<GQLMetaImageWithCopyright>;
  oembed?: Maybe<Scalars['String']['output']>;
  oldNdlaUrl?: Maybe<Scalars['String']['output']>;
  published: Scalars['String']['output'];
  relatedContent?: Maybe<Array<GQLRelatedContent>>;
  requiredLibraries?: Maybe<Array<GQLArticleRequiredLibrary>>;
  revision: Scalars['Int']['output'];
  revisionDate?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  supportedLanguages?: Maybe<Array<Scalars['String']['output']>>;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  title: Scalars['String']['output'];
  transformedContent: GQLTransformedArticleContent;
  transformedDisclaimer: GQLTransformedArticleContent;
  updated: Scalars['String']['output'];
};


export type GQLArticleCrossSubjectTopicsArgs = {
  subjectId?: InputMaybe<Scalars['String']['input']>;
};


export type GQLArticleRelatedContentArgs = {
  subjectId?: InputMaybe<Scalars['String']['input']>;
};


export type GQLArticleTransformedContentArgs = {
  transformArgs?: InputMaybe<GQLTransformedArticleContentInput>;
};


export type GQLArticleTransformedDisclaimerArgs = {
  transformArgs?: InputMaybe<GQLTransformedArticleContentInput>;
};

export type GQLArticleFolderResourceMeta = GQLFolderResourceMeta & {
  __typename?: 'ArticleFolderResourceMeta';
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  metaImage?: Maybe<GQLMetaImage>;
  resourceTypes: Array<GQLFolderResourceResourceType>;
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type GQLArticleMetaData = {
  __typename?: 'ArticleMetaData';
  audios?: Maybe<Array<GQLAudioLicense>>;
  brightcoves?: Maybe<Array<GQLBrightcoveLicense>>;
  concepts?: Maybe<Array<GQLConceptLicense>>;
  copyText?: Maybe<Scalars['String']['output']>;
  footnotes?: Maybe<Array<GQLFootNote>>;
  glosses?: Maybe<Array<GQLGlossLicense>>;
  h5ps?: Maybe<Array<GQLH5pLicense>>;
  images?: Maybe<Array<GQLImageLicense>>;
  podcasts?: Maybe<Array<GQLPodcastLicense>>;
  textblocks?: Maybe<Array<GQLTextblockLicense>>;
};

export type GQLArticleRequiredLibrary = {
  __typename?: 'ArticleRequiredLibrary';
  mediaType: Scalars['String']['output'];
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type GQLArticleSearchResult = GQLSearchResult & {
  __typename?: 'ArticleSearchResult';
  context?: Maybe<GQLSearchContext>;
  contexts: Array<GQLSearchContext>;
  htmlTitle: Scalars['String']['output'];
  id: Scalars['String']['output'];
  metaDescription: Scalars['String']['output'];
  metaImage?: Maybe<GQLMetaImage>;
  supportedLanguages: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  traits: Array<Scalars['String']['output']>;
  url: Scalars['String']['output'];
};

export type GQLAudio = {
  __typename?: 'Audio';
  audioFile: GQLAudioFile;
  audioType: Scalars['String']['output'];
  copyright: GQLCopyright;
  created: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  manuscript?: Maybe<GQLManuscript>;
  podcastMeta?: Maybe<GQLPodcastMeta>;
  revision: Scalars['Int']['output'];
  series?: Maybe<GQLPodcastSeries>;
  supportedLanguages: Array<Scalars['String']['output']>;
  tags: GQLTags;
  title: GQLTitle;
  updated: Scalars['String']['output'];
};

export type GQLAudioFile = {
  __typename?: 'AudioFile';
  fileSize: Scalars['Int']['output'];
  language: Scalars['String']['output'];
  mimeType: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type GQLAudioFolderResourceMeta = GQLFolderResourceMeta & {
  __typename?: 'AudioFolderResourceMeta';
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  metaImage?: Maybe<GQLMetaImage>;
  resourceTypes: Array<GQLFolderResourceResourceType>;
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type GQLAudioLicense = {
  __typename?: 'AudioLicense';
  copyText?: Maybe<Scalars['String']['output']>;
  copyright: GQLCopyright;
  id: Scalars['String']['output'];
  src: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type GQLAudioSearch = {
  __typename?: 'AudioSearch';
  language: Scalars['String']['output'];
  page?: Maybe<Scalars['Int']['output']>;
  pageSize: Scalars['Int']['output'];
  results: Array<GQLAudioSummary>;
  totalCount: Scalars['Int']['output'];
};

export type GQLAudioSummary = {
  __typename?: 'AudioSummary';
  audioType: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastUpdated: Scalars['String']['output'];
  license: Scalars['String']['output'];
  manuscript?: Maybe<GQLManuscript>;
  podcastMeta?: Maybe<GQLPodcastMeta>;
  supportedLanguages: Array<Scalars['String']['output']>;
  title: GQLTitle;
  url: Scalars['String']['output'];
};

export type GQLBreadcrumb = {
  __typename?: 'Breadcrumb';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type GQLBrightcoveCustomFields = {
  __typename?: 'BrightcoveCustomFields';
  accountId?: Maybe<Scalars['String']['output']>;
  license: Scalars['String']['output'];
  licenseInfo: Array<Scalars['String']['output']>;
};

export type GQLBrightcoveElement = {
  __typename?: 'BrightcoveElement';
  account?: Maybe<Scalars['String']['output']>;
  caption?: Maybe<Scalars['String']['output']>;
  cover?: Maybe<Scalars['String']['output']>;
  customFields?: Maybe<GQLBrightcoveCustomFields>;
  description?: Maybe<Scalars['String']['output']>;
  download?: Maybe<Scalars['String']['output']>;
  iframe?: Maybe<GQLBrightcoveIframe>;
  name?: Maybe<Scalars['String']['output']>;
  player?: Maybe<Scalars['String']['output']>;
  src?: Maybe<Scalars['String']['output']>;
  uploadDate?: Maybe<Scalars['String']['output']>;
  videoid?: Maybe<Scalars['String']['output']>;
};

export type GQLBrightcoveIframe = {
  __typename?: 'BrightcoveIframe';
  height: Scalars['Int']['output'];
  src: Scalars['String']['output'];
  width: Scalars['Int']['output'];
};

export type GQLBrightcoveLicense = {
  __typename?: 'BrightcoveLicense';
  copyright?: Maybe<GQLCopyright>;
  cover?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  download?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  iframe?: Maybe<GQLBrightcoveIframe>;
  src?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  uploadDate?: Maybe<Scalars['String']['output']>;
};

export type GQLBucketResult = {
  __typename?: 'BucketResult';
  count: Scalars['Int']['output'];
  value: Scalars['String']['output'];
};

export type GQLCaption = {
  __typename?: 'Caption';
  caption: Scalars['String']['output'];
  language: Scalars['String']['output'];
};

export type GQLCategory = {
  __typename?: 'Category';
  id: Scalars['String']['output'];
  isProgrammeSubject: Scalars['Boolean']['output'];
  subjects?: Maybe<Array<GQLSubject>>;
  title: GQLTitle;
};

export type GQLCategoryBreadcrumb = {
  __typename?: 'CategoryBreadcrumb';
  id: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type GQLCompetenceGoal = {
  __typename?: 'CompetenceGoal';
  code?: Maybe<Scalars['String']['output']>;
  competenceGoalSet?: Maybe<GQLReference>;
  competenceGoalSetCode?: Maybe<Scalars['String']['output']>;
  coreElements?: Maybe<Array<GQLElement>>;
  coreElementsCodes?: Maybe<Array<GQLElement>>;
  crossSubjectTopics?: Maybe<Array<GQLElement>>;
  crossSubjectTopicsCodes?: Maybe<Array<GQLElement>>;
  curriculum?: Maybe<GQLReference>;
  curriculumCode?: Maybe<Scalars['String']['output']>;
  curriculumId?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  language?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type GQLConcept = {
  __typename?: 'Concept';
  articleIds: Array<Scalars['Int']['output']>;
  articles?: Maybe<Array<GQLMeta>>;
  conceptType: Scalars['String']['output'];
  content: Scalars['String']['output'];
  copyright?: Maybe<GQLConceptCopyright>;
  created: Scalars['String']['output'];
  glossData?: Maybe<GQLGloss>;
  id: Scalars['Int']['output'];
  source?: Maybe<Scalars['String']['output']>;
  subjectIds?: Maybe<Array<Scalars['String']['output']>>;
  subjectNames?: Maybe<Array<Scalars['String']['output']>>;
  supportedLanguages: Array<Scalars['String']['output']>;
  tags: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  visualElement?: Maybe<GQLVisualElement>;
};

export type GQLConceptCopyright = {
  __typename?: 'ConceptCopyright';
  creators: Array<GQLContributor>;
  license?: Maybe<GQLLicense>;
  origin?: Maybe<Scalars['String']['output']>;
  processed?: Maybe<Scalars['Boolean']['output']>;
  processors: Array<GQLContributor>;
  rightsholders: Array<GQLContributor>;
};

export type GQLConceptFolderResourceMeta = GQLFolderResourceMeta & {
  __typename?: 'ConceptFolderResourceMeta';
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  metaImage?: Maybe<GQLMetaImage>;
  resourceTypes: Array<GQLFolderResourceResourceType>;
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type GQLConceptLicense = {
  __typename?: 'ConceptLicense';
  content?: Maybe<Scalars['String']['output']>;
  copyright?: Maybe<GQLConceptCopyright>;
  id: Scalars['String']['output'];
  src?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type GQLConfigMetaBoolean = {
  __typename?: 'ConfigMetaBoolean';
  key: Scalars['String']['output'];
  value: Scalars['Boolean']['output'];
};

export type GQLConfigMetaStringList = {
  __typename?: 'ConfigMetaStringList';
  key: Scalars['String']['output'];
  value: Array<Scalars['String']['output']>;
};

export type GQLContributor = {
  __typename?: 'Contributor';
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type GQLContributorInput = {
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type GQLCopyright = {
  __typename?: 'Copyright';
  creators: Array<GQLContributor>;
  license: GQLLicense;
  origin?: Maybe<Scalars['String']['output']>;
  processed?: Maybe<Scalars['Boolean']['output']>;
  processors: Array<GQLContributor>;
  rightsholders: Array<GQLContributor>;
};

export type GQLCoreElement = {
  __typename?: 'CoreElement';
  curriculum?: Maybe<GQLReference>;
  curriculumCode?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  language?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type GQLCoverPhoto = {
  __typename?: 'CoverPhoto';
  altText: Scalars['String']['output'];
  id: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type GQLCrossSubjectElement = {
  __typename?: 'CrossSubjectElement';
  code?: Maybe<Scalars['String']['output']>;
  path?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  url?: Maybe<Scalars['String']['output']>;
};

export type GQLDescription = {
  __typename?: 'Description';
  description: Scalars['String']['output'];
  language: Scalars['String']['output'];
};

export type GQLEditorNote = {
  __typename?: 'EditorNote';
  note: Scalars['String']['output'];
  timestamp: Scalars['String']['output'];
  updatedBy: Scalars['String']['output'];
};

export type GQLElement = {
  __typename?: 'Element';
  reference: GQLReference;
};

export type GQLEmbedVisualelement = {
  __typename?: 'EmbedVisualelement';
  visualElement?: Maybe<GQLVisualElement>;
};

export type GQLExamples = {
  __typename?: 'Examples';
  example: Scalars['String']['output'];
  language: Scalars['String']['output'];
  transcriptions: GQLTranscription;
};

export type GQLExternalOpengraph = {
  __typename?: 'ExternalOpengraph';
  description?: Maybe<Scalars['String']['output']>;
  imageAlt?: Maybe<Scalars['String']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type GQLFilmFrontpage = {
  __typename?: 'FilmFrontpage';
  about: Array<GQLFilmPageAbout>;
  article?: Maybe<GQLArticle>;
  movieThemes: Array<GQLMovieTheme>;
  name: Scalars['String']['output'];
  slideShow: Array<GQLMovie>;
};

export type GQLFilmPageAbout = {
  __typename?: 'FilmPageAbout';
  description: Scalars['String']['output'];
  language: Scalars['String']['output'];
  title: Scalars['String']['output'];
  visualElement: GQLSubjectPageVisualElement;
};

export type GQLFolder = {
  __typename?: 'Folder';
  breadcrumbs: Array<GQLBreadcrumb>;
  created: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  owner?: Maybe<GQLOwner>;
  parentId?: Maybe<Scalars['String']['output']>;
  resources: Array<GQLFolderResource>;
  status: Scalars['String']['output'];
  subfolders: Array<GQLFolder>;
  updated: Scalars['String']['output'];
};

export type GQLFolderResource = {
  __typename?: 'FolderResource';
  created: Scalars['String']['output'];
  id: Scalars['String']['output'];
  path: Scalars['String']['output'];
  resourceId: Scalars['String']['output'];
  resourceType: Scalars['String']['output'];
  tags: Array<Scalars['String']['output']>;
};

export type GQLFolderResourceMeta = {
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  metaImage?: Maybe<GQLMetaImage>;
  resourceTypes: Array<GQLFolderResourceResourceType>;
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type GQLFolderResourceMetaSearchInput = {
  id: Scalars['String']['input'];
  path: Scalars['String']['input'];
  resourceType: Scalars['String']['input'];
};

export type GQLFolderResourceResourceType = {
  __typename?: 'FolderResourceResourceType';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type GQLFootNote = {
  __typename?: 'FootNote';
  authors: Array<Scalars['String']['output']>;
  edition?: Maybe<Scalars['String']['output']>;
  publisher?: Maybe<Scalars['String']['output']>;
  ref: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  url?: Maybe<Scalars['String']['output']>;
  year: Scalars['String']['output'];
};

export type GQLFrontpageMenu = {
  __typename?: 'FrontpageMenu';
  article: GQLArticle;
  articleId: Scalars['Int']['output'];
  hideLevel?: Maybe<Scalars['Boolean']['output']>;
  menu?: Maybe<Array<Maybe<GQLFrontpageMenu>>>;
};

export type GQLGloss = {
  __typename?: 'Gloss';
  examples?: Maybe<Array<Array<GQLExamples>>>;
  gloss: Scalars['String']['output'];
  originalLanguage: Scalars['String']['output'];
  transcriptions: GQLTranscription;
  wordClass: Scalars['String']['output'];
};

export type GQLGlossLicense = {
  __typename?: 'GlossLicense';
  content?: Maybe<Scalars['String']['output']>;
  copyright?: Maybe<GQLConceptCopyright>;
  id: Scalars['String']['output'];
  metaImageUrl?: Maybe<Scalars['String']['output']>;
  src?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type GQLGrade = {
  __typename?: 'Grade';
  categories?: Maybe<Array<GQLCategory>>;
  id: Scalars['String']['output'];
  title: GQLTitle;
  url?: Maybe<Scalars['String']['output']>;
};

export type GQLGroupSearch = {
  __typename?: 'GroupSearch';
  aggregations: Array<GQLAggregationResult>;
  language: Scalars['String']['output'];
  page?: Maybe<Scalars['Int']['output']>;
  pageSize: Scalars['Int']['output'];
  resourceType: Scalars['String']['output'];
  resources: Array<GQLGroupSearchResult>;
  suggestions: Array<GQLSuggestionResult>;
  totalCount: Scalars['Int']['output'];
};

export type GQLGroupSearchResult = {
  __typename?: 'GroupSearchResult';
  contexts: Array<GQLSearchContext>;
  htmlTitle: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  ingress: Scalars['String']['output'];
  metaImage?: Maybe<GQLMetaImage>;
  name: Scalars['String']['output'];
  path: Scalars['String']['output'];
  title: Scalars['String']['output'];
  traits: Array<Scalars['String']['output']>;
  url: Scalars['String']['output'];
};

export type GQLH5pElement = {
  __typename?: 'H5pElement';
  src?: Maybe<Scalars['String']['output']>;
  thumbnail?: Maybe<Scalars['String']['output']>;
};

export type GQLH5pLicense = {
  __typename?: 'H5pLicense';
  copyright?: Maybe<GQLCopyright>;
  id: Scalars['String']['output'];
  src?: Maybe<Scalars['String']['output']>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type GQLImageAltText = {
  __typename?: 'ImageAltText';
  alttext: Scalars['String']['output'];
  language: Scalars['String']['output'];
};

export type GQLImageDimensions = {
  __typename?: 'ImageDimensions';
  height: Scalars['Int']['output'];
  width: Scalars['Int']['output'];
};

export type GQLImageElement = {
  __typename?: 'ImageElement';
  alt?: Maybe<Scalars['String']['output']>;
  altText: Scalars['String']['output'];
  caption?: Maybe<Scalars['String']['output']>;
  contentType?: Maybe<Scalars['String']['output']>;
  copyText?: Maybe<Scalars['String']['output']>;
  focalX?: Maybe<Scalars['Float']['output']>;
  focalY?: Maybe<Scalars['Float']['output']>;
  lowerRightX?: Maybe<Scalars['Float']['output']>;
  lowerRightY?: Maybe<Scalars['Float']['output']>;
  resourceid?: Maybe<Scalars['String']['output']>;
  src: Scalars['String']['output'];
  upperLeftX?: Maybe<Scalars['Float']['output']>;
  upperLeftY?: Maybe<Scalars['Float']['output']>;
};

export type GQLImageFolderResourceMeta = GQLFolderResourceMeta & {
  __typename?: 'ImageFolderResourceMeta';
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  metaImage?: Maybe<GQLMetaImage>;
  resourceTypes: Array<GQLFolderResourceResourceType>;
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type GQLImageLicense = {
  __typename?: 'ImageLicense';
  altText: Scalars['String']['output'];
  contentType?: Maybe<Scalars['String']['output']>;
  copyText?: Maybe<Scalars['String']['output']>;
  copyright: GQLCopyright;
  id: Scalars['String']['output'];
  src: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type GQLImageMetaInformation = {
  __typename?: 'ImageMetaInformation';
  altText: Scalars['String']['output'];
  caption: Scalars['String']['output'];
  contentType: Scalars['String']['output'];
  copyright: GQLCopyright;
  created: Scalars['String']['output'];
  createdBy: Scalars['String']['output'];
  id: Scalars['String']['output'];
  imageUrl: Scalars['String']['output'];
  metaUrl: Scalars['String']['output'];
  size: Scalars['Int']['output'];
  supportedLanguages: Array<Scalars['String']['output']>;
  tags: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type GQLImageMetaInformationV2 = {
  __typename?: 'ImageMetaInformationV2';
  alttext: GQLImageAltText;
  caption: GQLCaption;
  contentType: Scalars['String']['output'];
  copyright: GQLCopyright;
  created: Scalars['String']['output'];
  createdBy: Scalars['String']['output'];
  editorNotes?: Maybe<Array<GQLEditorNote>>;
  id: Scalars['String']['output'];
  imageDimensions?: Maybe<GQLImageDimensions>;
  imageUrl: Scalars['String']['output'];
  metaUrl: Scalars['String']['output'];
  modelRelease: Scalars['String']['output'];
  size: Scalars['Int']['output'];
  supportedLanguages?: Maybe<Array<Scalars['String']['output']>>;
  tags: GQLTags;
  title: GQLTitle;
};

export type GQLImageMetaInformationV3 = {
  __typename?: 'ImageMetaInformationV3';
  alttext: GQLImageAltText;
  caption: GQLCaption;
  copyright: GQLCopyright;
  created: Scalars['String']['output'];
  createdBy: Scalars['String']['output'];
  editorNotes?: Maybe<Array<GQLEditorNote>>;
  id: Scalars['String']['output'];
  image: GQLImageV3;
  metaUrl: Scalars['String']['output'];
  modelRelease: Scalars['String']['output'];
  supportedLanguages: Array<Scalars['String']['output']>;
  tags: GQLTags;
  title: GQLTitle;
};

export type GQLImageSearch = {
  __typename?: 'ImageSearch';
  language: Scalars['String']['output'];
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  results: Array<GQLImageMetaInformationV3>;
  totalCount: Scalars['Int']['output'];
};

export type GQLImageV3 = {
  __typename?: 'ImageV3';
  contentType: Scalars['String']['output'];
  dimensions?: Maybe<GQLImageDimensions>;
  fileName: Scalars['String']['output'];
  imageUrl: Scalars['String']['output'];
  language: Scalars['String']['output'];
  size: Scalars['Int']['output'];
};

export type GQLLearningpath = {
  __typename?: 'Learningpath';
  canEdit: Scalars['Boolean']['output'];
  copyright: GQLLearningpathCopyright;
  coverphoto?: Maybe<GQLLearningpathCoverphoto>;
  created: Scalars['String']['output'];
  description: Scalars['String']['output'];
  duration?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  isBasedOn?: Maybe<Scalars['Int']['output']>;
  isMyNDLAOwner: Scalars['Boolean']['output'];
  lastUpdated: Scalars['String']['output'];
  learningstepUrl: Scalars['String']['output'];
  learningsteps: Array<GQLLearningpathStep>;
  madeAvailable?: Maybe<Scalars['String']['output']>;
  metaUrl: Scalars['String']['output'];
  revision: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  supportedLanguages: Array<Scalars['String']['output']>;
  tags: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  verificationStatus: Scalars['String']['output'];
};

export type GQLLearningpathCopyInput = {
  copyright?: InputMaybe<GQLLearningpathCopyrightInput>;
  coverPhotoMetaUrl?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  language: Scalars['String']['input'];
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
};

export type GQLLearningpathCopyright = {
  __typename?: 'LearningpathCopyright';
  contributors: Array<GQLContributor>;
  license: GQLLicense;
};

export type GQLLearningpathCopyrightInput = {
  contributors: Array<GQLContributorInput>;
  license: GQLLicenseInput;
};

export type GQLLearningpathCoverphoto = {
  __typename?: 'LearningpathCoverphoto';
  metaUrl: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type GQLLearningpathEmbedInput = {
  embedType: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type GQLLearningpathFolderResourceMeta = GQLFolderResourceMeta & {
  __typename?: 'LearningpathFolderResourceMeta';
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  metaImage?: Maybe<GQLMetaImage>;
  resourceTypes: Array<GQLFolderResourceResourceType>;
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type GQLLearningpathNewInput = {
  copyright: GQLLearningpathCopyrightInput;
  coverPhotoMetaUrl?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  introduction?: InputMaybe<Scalars['String']['input']>;
  language: Scalars['String']['input'];
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
};

export type GQLLearningpathSearchResult = GQLSearchResult & {
  __typename?: 'LearningpathSearchResult';
  context?: Maybe<GQLSearchContext>;
  contexts: Array<GQLSearchContext>;
  htmlTitle: Scalars['String']['output'];
  id: Scalars['String']['output'];
  metaDescription: Scalars['String']['output'];
  metaImage?: Maybe<GQLMetaImage>;
  supportedLanguages: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  traits: Array<Scalars['String']['output']>;
  url: Scalars['String']['output'];
};

export type GQLLearningpathSeqNo = {
  __typename?: 'LearningpathSeqNo';
  seqNo: Scalars['Int']['output'];
};

export type GQLLearningpathStep = {
  __typename?: 'LearningpathStep';
  description?: Maybe<Scalars['String']['output']>;
  embedUrl?: Maybe<GQLLearningpathStepEmbedUrl>;
  id: Scalars['Int']['output'];
  introduction?: Maybe<Scalars['String']['output']>;
  license?: Maybe<GQLLicense>;
  metaUrl: Scalars['String']['output'];
  oembed?: Maybe<GQLLearningpathStepOembed>;
  opengraph?: Maybe<GQLExternalOpengraph>;
  resource?: Maybe<GQLResource>;
  revision: Scalars['Int']['output'];
  seqNo: Scalars['Int']['output'];
  showTitle: Scalars['Boolean']['output'];
  status: Scalars['String']['output'];
  supportedLanguages: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
};


export type GQLLearningpathStepResourceArgs = {
  parentId?: InputMaybe<Scalars['String']['input']>;
  rootId?: InputMaybe<Scalars['String']['input']>;
};

export type GQLLearningpathStepEmbedUrl = {
  __typename?: 'LearningpathStepEmbedUrl';
  embedType: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type GQLLearningpathStepNewInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  embedUrl?: InputMaybe<GQLLearningpathEmbedInput>;
  introduction?: InputMaybe<Scalars['String']['input']>;
  language: Scalars['String']['input'];
  license?: InputMaybe<Scalars['String']['input']>;
  showTitle: Scalars['Boolean']['input'];
  title: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type GQLLearningpathStepOembed = {
  __typename?: 'LearningpathStepOembed';
  height: Scalars['Int']['output'];
  html: Scalars['String']['output'];
  type: Scalars['String']['output'];
  version: Scalars['String']['output'];
  width: Scalars['Int']['output'];
};

export type GQLLearningpathStepUpdateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  embedUrl?: InputMaybe<GQLLearningpathEmbedInput>;
  introduction?: InputMaybe<Scalars['String']['input']>;
  language: Scalars['String']['input'];
  license?: InputMaybe<Scalars['String']['input']>;
  revision: Scalars['Int']['input'];
  showTitle?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type GQLLearningpathUpdateInput = {
  copyright?: InputMaybe<GQLLearningpathCopyrightInput>;
  coverPhotoMetaUrl?: InputMaybe<Scalars['String']['input']>;
  deleteMessage?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  language: Scalars['String']['input'];
  revision: Scalars['Int']['input'];
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type GQLLicense = {
  __typename?: 'License';
  description?: Maybe<Scalars['String']['output']>;
  license: Scalars['String']['output'];
  url?: Maybe<Scalars['String']['output']>;
};

export type GQLLicenseInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  license: Scalars['String']['input'];
  url?: InputMaybe<Scalars['String']['input']>;
};

export type GQLManuscript = {
  __typename?: 'Manuscript';
  language: Scalars['String']['output'];
  manuscript: Scalars['String']['output'];
};

export type GQLMeta = {
  __typename?: 'Meta';
  availability?: Maybe<Scalars['String']['output']>;
  htmlIntroduction?: Maybe<Scalars['String']['output']>;
  htmlTitle: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  introduction?: Maybe<Scalars['String']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  lastUpdated?: Maybe<Scalars['String']['output']>;
  metaDescription?: Maybe<Scalars['String']['output']>;
  metaImage?: Maybe<GQLMetaImage>;
  title: Scalars['String']['output'];
};

export type GQLMetaImage = {
  __typename?: 'MetaImage';
  alt: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type GQLMetaImageWithCopyright = {
  __typename?: 'MetaImageWithCopyright';
  alt: Scalars['String']['output'];
  copyright: GQLCopyright;
  url: Scalars['String']['output'];
};

export type GQLMovie = {
  __typename?: 'Movie';
  id: Scalars['String']['output'];
  metaDescription: Scalars['String']['output'];
  metaImage?: Maybe<GQLMetaImage>;
  resourceTypes: Array<GQLResourceType>;
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type GQLMovieMeta = {
  __typename?: 'MovieMeta';
  metaDescription?: Maybe<Scalars['String']['output']>;
  metaImage?: Maybe<GQLMetaImage>;
  title: Scalars['String']['output'];
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
  copyLearningpath: GQLMyNdlaLearningpath;
  copySharedFolder: GQLFolder;
  deleteFolder: Scalars['String']['output'];
  deleteFolderResource: Scalars['String']['output'];
  deleteLearningpath?: Maybe<Scalars['Boolean']['output']>;
  deleteLearningpathStep?: Maybe<Array<Scalars['String']['output']>>;
  deletePersonalData: Scalars['Boolean']['output'];
  favoriteSharedFolder: Scalars['String']['output'];
  newLearningpath: GQLMyNdlaLearningpath;
  newLearningpathStep: GQLMyNdlaLearningpathStep;
  sortFolders: GQLSortResult;
  sortResources: GQLSortResult;
  sortSavedSharedFolders: GQLSortResult;
  transformArticleContent: Scalars['String']['output'];
  unFavoriteSharedFolder: Scalars['String']['output'];
  updateFolder: GQLFolder;
  updateFolderResource: GQLFolderResource;
  updateFolderStatus: Array<Scalars['String']['output']>;
  updateLearningpath: GQLMyNdlaLearningpath;
  updateLearningpathStatus: GQLMyNdlaLearningpath;
  updateLearningpathStep: GQLMyNdlaLearningpathStep;
  updateLearningpathStepSeqNo: GQLLearningpathSeqNo;
  updatePersonalData: GQLMyNdlaPersonalData;
};


export type GQLMutationAddFolderArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


export type GQLMutationAddFolderResourceArgs = {
  folderId: Scalars['String']['input'];
  path: Scalars['String']['input'];
  resourceId: Scalars['String']['input'];
  resourceType: Scalars['String']['input'];
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type GQLMutationCopyLearningpathArgs = {
  learningpathId: Scalars['Int']['input'];
  params: GQLLearningpathCopyInput;
};


export type GQLMutationCopySharedFolderArgs = {
  destinationFolderId?: InputMaybe<Scalars['String']['input']>;
  folderId: Scalars['String']['input'];
};


export type GQLMutationDeleteFolderArgs = {
  id: Scalars['String']['input'];
};


export type GQLMutationDeleteFolderResourceArgs = {
  folderId: Scalars['String']['input'];
  resourceId: Scalars['String']['input'];
};


export type GQLMutationDeleteLearningpathArgs = {
  id: Scalars['Int']['input'];
};


export type GQLMutationDeleteLearningpathStepArgs = {
  learningpathId: Scalars['Int']['input'];
  learningstepId: Scalars['Int']['input'];
};


export type GQLMutationFavoriteSharedFolderArgs = {
  folderId: Scalars['String']['input'];
};


export type GQLMutationNewLearningpathArgs = {
  params: GQLLearningpathNewInput;
};


export type GQLMutationNewLearningpathStepArgs = {
  learningpathId: Scalars['Int']['input'];
  params: GQLLearningpathStepNewInput;
};


export type GQLMutationSortFoldersArgs = {
  parentId?: InputMaybe<Scalars['String']['input']>;
  sortedIds: Array<Scalars['String']['input']>;
};


export type GQLMutationSortResourcesArgs = {
  parentId: Scalars['String']['input'];
  sortedIds: Array<Scalars['String']['input']>;
};


export type GQLMutationSortSavedSharedFoldersArgs = {
  sortedIds: Array<Scalars['String']['input']>;
};


export type GQLMutationTransformArticleContentArgs = {
  absoluteUrl?: InputMaybe<Scalars['Boolean']['input']>;
  content: Scalars['String']['input'];
  draftConcept?: InputMaybe<Scalars['Boolean']['input']>;
  prettyUrl?: InputMaybe<Scalars['Boolean']['input']>;
  previewH5p?: InputMaybe<Scalars['Boolean']['input']>;
  subject?: InputMaybe<Scalars['String']['input']>;
  visualElement?: InputMaybe<Scalars['String']['input']>;
};


export type GQLMutationUnFavoriteSharedFolderArgs = {
  folderId: Scalars['String']['input'];
};


export type GQLMutationUpdateFolderArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


export type GQLMutationUpdateFolderResourceArgs = {
  id: Scalars['String']['input'];
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type GQLMutationUpdateFolderStatusArgs = {
  folderId: Scalars['String']['input'];
  status: Scalars['String']['input'];
};


export type GQLMutationUpdateLearningpathArgs = {
  learningpathId: Scalars['Int']['input'];
  params: GQLLearningpathUpdateInput;
};


export type GQLMutationUpdateLearningpathStatusArgs = {
  id: Scalars['Int']['input'];
  status: Scalars['String']['input'];
};


export type GQLMutationUpdateLearningpathStepArgs = {
  learningpathId: Scalars['Int']['input'];
  learningstepId: Scalars['Int']['input'];
  params: GQLLearningpathStepUpdateInput;
};


export type GQLMutationUpdateLearningpathStepSeqNoArgs = {
  learningpathId: Scalars['Int']['input'];
  learningpathStepId: Scalars['Int']['input'];
  seqNo: Scalars['Int']['input'];
};


export type GQLMutationUpdatePersonalDataArgs = {
  arenaAccepted?: InputMaybe<Scalars['Boolean']['input']>;
  favoriteSubjects?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  shareNameAccepted?: InputMaybe<Scalars['Boolean']['input']>;
};

export type GQLMyNdlaGroup = {
  __typename?: 'MyNdlaGroup';
  displayName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isPrimarySchool: Scalars['Boolean']['output'];
  parentId?: Maybe<Scalars['String']['output']>;
};

export type GQLMyNdlaLearningpath = {
  __typename?: 'MyNdlaLearningpath';
  canEdit: Scalars['Boolean']['output'];
  copyright: GQLLearningpathCopyright;
  coverphoto?: Maybe<GQLLearningpathCoverphoto>;
  created: Scalars['String']['output'];
  description: Scalars['String']['output'];
  duration?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  isBasedOn?: Maybe<Scalars['Int']['output']>;
  isMyNDLAOwner: Scalars['Boolean']['output'];
  lastUpdated: Scalars['String']['output'];
  learningstepUrl: Scalars['String']['output'];
  learningsteps: Array<GQLMyNdlaLearningpathStep>;
  madeAvailable?: Maybe<Scalars['String']['output']>;
  metaUrl: Scalars['String']['output'];
  revision: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  supportedLanguages: Array<Scalars['String']['output']>;
  tags: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  verificationStatus: Scalars['String']['output'];
};

export type GQLMyNdlaLearningpathStep = {
  __typename?: 'MyNdlaLearningpathStep';
  description?: Maybe<Scalars['String']['output']>;
  embedUrl?: Maybe<GQLLearningpathStepEmbedUrl>;
  id: Scalars['Int']['output'];
  introduction?: Maybe<Scalars['String']['output']>;
  license?: Maybe<GQLLicense>;
  metaUrl: Scalars['String']['output'];
  oembed?: Maybe<GQLLearningpathStepOembed>;
  opengraph?: Maybe<GQLExternalOpengraph>;
  resource?: Maybe<GQLResource>;
  revision: Scalars['Int']['output'];
  seqNo: Scalars['Int']['output'];
  showTitle: Scalars['Boolean']['output'];
  status: Scalars['String']['output'];
  supportedLanguages: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
};


export type GQLMyNdlaLearningpathStepResourceArgs = {
  parentId?: InputMaybe<Scalars['String']['input']>;
  rootId?: InputMaybe<Scalars['String']['input']>;
};

export type GQLMyNdlaPersonalData = {
  __typename?: 'MyNdlaPersonalData';
  arenaAccepted: Scalars['Boolean']['output'];
  arenaEnabled: Scalars['Boolean']['output'];
  displayName: Scalars['String']['output'];
  email: Scalars['String']['output'];
  favoriteSubjects: Array<Scalars['String']['output']>;
  feideId: Scalars['String']['output'];
  groups: Array<GQLMyNdlaGroup>;
  id: Scalars['Int']['output'];
  organization: Scalars['String']['output'];
  role: GQLUserRole;
  shareNameAccepted: Scalars['Boolean']['output'];
  username: Scalars['String']['output'];
};

export type GQLName = {
  __typename?: 'Name';
  language: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type GQLNewFolder = {
  __typename?: 'NewFolder';
  name: Scalars['String']['output'];
  parentId?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type GQLNewFolderResource = {
  __typename?: 'NewFolderResource';
  path: Scalars['String']['output'];
  resourceType: Scalars['String']['output'];
  tags?: Maybe<Array<Scalars['String']['output']>>;
};

export type GQLNode = GQLTaxBase & GQLTaxonomyEntity & GQLWithArticle & {
  __typename?: 'Node';
  alternateNodes?: Maybe<Array<GQLNode>>;
  article?: Maybe<GQLArticle>;
  availability?: Maybe<Scalars['String']['output']>;
  breadcrumbs: Array<Scalars['String']['output']>;
  children?: Maybe<Array<GQLNode>>;
  connectionId?: Maybe<Scalars['String']['output']>;
  contentUri?: Maybe<Scalars['String']['output']>;
  context?: Maybe<GQLTaxonomyContext>;
  contextId?: Maybe<Scalars['String']['output']>;
  contexts: Array<GQLTaxonomyContext>;
  grepCodes?: Maybe<Array<Scalars['String']['output']>>;
  id: Scalars['String']['output'];
  language?: Maybe<Scalars['String']['output']>;
  learningpath?: Maybe<GQLLearningpath>;
  meta?: Maybe<GQLMeta>;
  metadata: GQLTaxonomyMetadata;
  name: Scalars['String']['output'];
  nodeType: Scalars['String']['output'];
  parentId?: Maybe<Scalars['String']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  relevanceId?: Maybe<Scalars['String']['output']>;
  resourceTypes?: Maybe<Array<GQLResourceType>>;
  subjectpage?: Maybe<GQLSubjectPage>;
  supportedLanguages: Array<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};


export type GQLNodeChildrenArgs = {
  nodeType?: InputMaybe<Scalars['String']['input']>;
  recursive?: InputMaybe<Scalars['Boolean']['input']>;
};

export type GQLNodeSearchResult = GQLSearchResult & {
  __typename?: 'NodeSearchResult';
  context?: Maybe<GQLSearchContext>;
  contexts: Array<GQLSearchContext>;
  htmlTitle: Scalars['String']['output'];
  id: Scalars['String']['output'];
  metaDescription: Scalars['String']['output'];
  metaImage?: Maybe<GQLMetaImage>;
  supportedLanguages: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type GQLOwner = {
  __typename?: 'Owner';
  name: Scalars['String']['output'];
};

export type GQLPodcastLicense = {
  __typename?: 'PodcastLicense';
  copyText?: Maybe<Scalars['String']['output']>;
  copyright: GQLCopyright;
  coverPhotoUrl?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  src: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type GQLPodcastMeta = {
  __typename?: 'PodcastMeta';
  image?: Maybe<GQLImageMetaInformation>;
  introduction: Scalars['String']['output'];
  language: Scalars['String']['output'];
};

export type GQLPodcastSeries = GQLPodcastSeriesBase & {
  __typename?: 'PodcastSeries';
  coverPhoto: GQLCoverPhoto;
  description: GQLDescription;
  hasRSS: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
  image: GQLImageMetaInformation;
  supportedLanguages: Array<Scalars['String']['output']>;
  title: GQLTitle;
};

export type GQLPodcastSeriesBase = {
  coverPhoto: GQLCoverPhoto;
  description: GQLDescription;
  hasRSS: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
  image: GQLImageMetaInformation;
  supportedLanguages: Array<Scalars['String']['output']>;
  title: GQLTitle;
};

export type GQLPodcastSeriesSearch = {
  __typename?: 'PodcastSeriesSearch';
  language: Scalars['String']['output'];
  page?: Maybe<Scalars['Int']['output']>;
  pageSize: Scalars['Int']['output'];
  results: Array<GQLPodcastSeriesSummary>;
  totalCount: Scalars['Int']['output'];
};

export type GQLPodcastSeriesSummary = {
  __typename?: 'PodcastSeriesSummary';
  coverPhoto: GQLCoverPhoto;
  description: GQLDescription;
  episodes?: Maybe<Array<GQLAudioSummary>>;
  id: Scalars['Int']['output'];
  supportedLanguages?: Maybe<Array<Scalars['String']['output']>>;
  title: GQLTitle;
};

export type GQLPodcastSeriesWithEpisodes = GQLPodcastSeriesBase & {
  __typename?: 'PodcastSeriesWithEpisodes';
  content?: Maybe<GQLResourceEmbed>;
  coverPhoto: GQLCoverPhoto;
  description: GQLDescription;
  episodes?: Maybe<Array<GQLAudio>>;
  hasRSS: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
  image: GQLImageMetaInformation;
  supportedLanguages: Array<Scalars['String']['output']>;
  title: GQLTitle;
};

export type GQLProgrammePage = {
  __typename?: 'ProgrammePage';
  contentUri?: Maybe<Scalars['String']['output']>;
  contextId?: Maybe<Scalars['String']['output']>;
  desktopImage?: Maybe<GQLMetaImage>;
  grades?: Maybe<Array<GQLGrade>>;
  id: Scalars['String']['output'];
  metaDescription?: Maybe<Scalars['String']['output']>;
  mobileImage?: Maybe<GQLMetaImage>;
  title: GQLTitle;
  url?: Maybe<Scalars['String']['output']>;
};

export type GQLQuery = {
  __typename?: 'Query';
  aiEnabledOrgs?: Maybe<GQLConfigMetaStringList>;
  alerts?: Maybe<Array<Maybe<GQLUptimeAlert>>>;
  allFolderResources: Array<GQLFolderResource>;
  arenaEnabledOrgs?: Maybe<GQLConfigMetaStringList>;
  article?: Maybe<GQLArticle>;
  articleResource?: Maybe<GQLResource>;
  audio?: Maybe<GQLAudio>;
  competenceGoal?: Maybe<GQLCompetenceGoal>;
  competenceGoals?: Maybe<Array<GQLCompetenceGoal>>;
  coreElement?: Maybe<GQLCoreElement>;
  coreElements?: Maybe<Array<GQLCoreElement>>;
  examLockStatus: GQLConfigMetaBoolean;
  filmfrontpage?: Maybe<GQLFilmFrontpage>;
  folder: GQLFolder;
  folderResourceMeta?: Maybe<GQLFolderResourceMeta>;
  folderResourceMetaSearch: Array<GQLFolderResourceMeta>;
  folders: GQLUserFolder;
  frontpage?: Maybe<GQLFrontpageMenu>;
  groupSearch?: Maybe<Array<GQLGroupSearch>>;
  image?: Maybe<GQLImageMetaInformationV2>;
  imageSearch: GQLImageSearch;
  imageV3?: Maybe<GQLImageMetaInformationV3>;
  learningpath?: Maybe<GQLLearningpath>;
  learningpathStepOembed: GQLLearningpathStepOembed;
  myLearningpaths?: Maybe<Array<GQLMyNdlaLearningpath>>;
  myNdlaLearningpath?: Maybe<GQLMyNdlaLearningpath>;
  node?: Maybe<GQLNode>;
  nodeByArticleId?: Maybe<GQLNode>;
  nodes?: Maybe<Array<GQLNode>>;
  opengraph?: Maybe<GQLExternalOpengraph>;
  personalData?: Maybe<GQLMyNdlaPersonalData>;
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
  subjectCollection?: Maybe<Array<GQLSubject>>;
  subjectpage?: Maybe<GQLSubjectPage>;
  subjects?: Maybe<Array<GQLSubject>>;
  topic?: Maybe<GQLTopic>;
  topics?: Maybe<Array<GQLTopic>>;
};


export type GQLQueryAllFolderResourcesArgs = {
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type GQLQueryArticleArgs = {
  id: Scalars['String']['input'];
};


export type GQLQueryArticleResourceArgs = {
  articleId?: InputMaybe<Scalars['String']['input']>;
  taxonomyId?: InputMaybe<Scalars['String']['input']>;
};


export type GQLQueryAudioArgs = {
  id: Scalars['Int']['input'];
};


export type GQLQueryCompetenceGoalArgs = {
  code: Scalars['String']['input'];
  language?: InputMaybe<Scalars['String']['input']>;
};


export type GQLQueryCompetenceGoalsArgs = {
  codes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  language?: InputMaybe<Scalars['String']['input']>;
};


export type GQLQueryCoreElementArgs = {
  code: Scalars['String']['input'];
  language?: InputMaybe<Scalars['String']['input']>;
};


export type GQLQueryCoreElementsArgs = {
  codes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  language?: InputMaybe<Scalars['String']['input']>;
};


export type GQLQueryFolderArgs = {
  id: Scalars['String']['input'];
  includeResources?: InputMaybe<Scalars['Boolean']['input']>;
  includeSubfolders?: InputMaybe<Scalars['Boolean']['input']>;
};


export type GQLQueryFolderResourceMetaArgs = {
  resource: GQLFolderResourceMetaSearchInput;
};


export type GQLQueryFolderResourceMetaSearchArgs = {
  resources: Array<GQLFolderResourceMetaSearchInput>;
};


export type GQLQueryFoldersArgs = {
  includeResources?: InputMaybe<Scalars['Boolean']['input']>;
  includeSubfolders?: InputMaybe<Scalars['Boolean']['input']>;
};


export type GQLQueryGroupSearchArgs = {
  aggregatePaths?: InputMaybe<Array<Scalars['String']['input']>>;
  contextTypes?: InputMaybe<Scalars['String']['input']>;
  fallback?: InputMaybe<Scalars['String']['input']>;
  filterInactive?: InputMaybe<Scalars['Boolean']['input']>;
  grepCodes?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  levels?: InputMaybe<Scalars['String']['input']>;
  license?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  resourceTypes?: InputMaybe<Scalars['String']['input']>;
  subjects?: InputMaybe<Scalars['String']['input']>;
};


export type GQLQueryImageArgs = {
  id: Scalars['String']['input'];
};


export type GQLQueryImageSearchArgs = {
  license?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
};


export type GQLQueryImageV3Args = {
  id: Scalars['String']['input'];
};


export type GQLQueryLearningpathArgs = {
  pathId: Scalars['String']['input'];
};


export type GQLQueryLearningpathStepOembedArgs = {
  url: Scalars['String']['input'];
};


export type GQLQueryMyNdlaLearningpathArgs = {
  pathId: Scalars['String']['input'];
};


export type GQLQueryNodeArgs = {
  contextId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  rootId?: InputMaybe<Scalars['String']['input']>;
};


export type GQLQueryNodeByArticleIdArgs = {
  articleId?: InputMaybe<Scalars['String']['input']>;
  nodeId?: InputMaybe<Scalars['String']['input']>;
};


export type GQLQueryNodesArgs = {
  contentUri?: InputMaybe<Scalars['String']['input']>;
  filterVisible?: InputMaybe<Scalars['Boolean']['input']>;
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
  metadataFilterKey?: InputMaybe<Scalars['String']['input']>;
  metadataFilterValue?: InputMaybe<Scalars['String']['input']>;
  nodeType?: InputMaybe<Scalars['String']['input']>;
};


export type GQLQueryOpengraphArgs = {
  url: Scalars['String']['input'];
};


export type GQLQueryPodcastSearchArgs = {
  fallback?: InputMaybe<Scalars['Boolean']['input']>;
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
};


export type GQLQueryPodcastSeriesArgs = {
  id: Scalars['Int']['input'];
};


export type GQLQueryPodcastSeriesSearchArgs = {
  fallback?: InputMaybe<Scalars['Boolean']['input']>;
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
};


export type GQLQueryProgrammeArgs = {
  contextId?: InputMaybe<Scalars['String']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
};


export type GQLQueryResourceArgs = {
  id: Scalars['String']['input'];
  subjectId?: InputMaybe<Scalars['String']['input']>;
  topicId?: InputMaybe<Scalars['String']['input']>;
};


export type GQLQueryResourceEmbedArgs = {
  id: Scalars['String']['input'];
  type: Scalars['String']['input'];
};


export type GQLQueryResourceEmbedsArgs = {
  resources: Array<GQLResourceEmbedInput>;
};


export type GQLQuerySearchArgs = {
  aggregatePaths?: InputMaybe<Array<Scalars['String']['input']>>;
  contextTypes?: InputMaybe<Scalars['String']['input']>;
  fallback?: InputMaybe<Scalars['String']['input']>;
  filterInactive?: InputMaybe<Scalars['Boolean']['input']>;
  grepCodes?: InputMaybe<Scalars['String']['input']>;
  ids?: InputMaybe<Array<Scalars['Int']['input']>>;
  language?: InputMaybe<Scalars['String']['input']>;
  languageFilter?: InputMaybe<Scalars['String']['input']>;
  levels?: InputMaybe<Scalars['String']['input']>;
  license?: InputMaybe<Scalars['String']['input']>;
  nodeTypes?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  relevance?: InputMaybe<Scalars['String']['input']>;
  resourceTypes?: InputMaybe<Scalars['String']['input']>;
  resultTypes?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  subjects?: InputMaybe<Scalars['String']['input']>;
  traits?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type GQLQuerySearchWithoutPaginationArgs = {
  contextTypes?: InputMaybe<Scalars['String']['input']>;
  fallback?: InputMaybe<Scalars['String']['input']>;
  ids?: InputMaybe<Array<Scalars['Int']['input']>>;
  language?: InputMaybe<Scalars['String']['input']>;
  languageFilter?: InputMaybe<Scalars['String']['input']>;
  levels?: InputMaybe<Scalars['String']['input']>;
  license?: InputMaybe<Scalars['String']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  relevance?: InputMaybe<Scalars['String']['input']>;
  resourceTypes?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  subjects?: InputMaybe<Scalars['String']['input']>;
};


export type GQLQuerySharedFolderArgs = {
  id: Scalars['String']['input'];
};


export type GQLQuerySubjectArgs = {
  id: Scalars['String']['input'];
};


export type GQLQuerySubjectCollectionArgs = {
  language: Scalars['String']['input'];
};


export type GQLQuerySubjectpageArgs = {
  id: Scalars['Int']['input'];
};


export type GQLQuerySubjectsArgs = {
  filterVisible?: InputMaybe<Scalars['Boolean']['input']>;
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
  metadataFilterKey?: InputMaybe<Scalars['String']['input']>;
  metadataFilterValue?: InputMaybe<Scalars['String']['input']>;
};


export type GQLQueryTopicArgs = {
  id: Scalars['String']['input'];
  subjectId?: InputMaybe<Scalars['String']['input']>;
};


export type GQLQueryTopicsArgs = {
  contentUri: Scalars['String']['input'];
  filterVisible?: InputMaybe<Scalars['Boolean']['input']>;
};

export type GQLReference = {
  __typename?: 'Reference';
  code?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type GQLRelatedContent = {
  __typename?: 'RelatedContent';
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type GQLResource = GQLTaxBase & GQLTaxonomyEntity & GQLWithArticle & {
  __typename?: 'Resource';
  article?: Maybe<GQLArticle>;
  availability?: Maybe<Scalars['String']['output']>;
  breadcrumbs: Array<Scalars['String']['output']>;
  contentUri?: Maybe<Scalars['String']['output']>;
  context?: Maybe<GQLTaxonomyContext>;
  contextId?: Maybe<Scalars['String']['output']>;
  contexts: Array<GQLTaxonomyContext>;
  id: Scalars['String']['output'];
  language?: Maybe<Scalars['String']['output']>;
  learningpath?: Maybe<GQLLearningpath>;
  meta?: Maybe<GQLMeta>;
  metadata: GQLTaxonomyMetadata;
  name: Scalars['String']['output'];
  nodeType: Scalars['String']['output'];
  parents?: Maybe<Array<GQLTopic>>;
  rank?: Maybe<Scalars['Int']['output']>;
  relevanceId?: Maybe<Scalars['String']['output']>;
  resourceTypes?: Maybe<Array<GQLResourceType>>;
  supportedLanguages: Array<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type GQLResourceEmbed = {
  __typename?: 'ResourceEmbed';
  content: Scalars['String']['output'];
  meta: GQLResourceMetaData;
};

export type GQLResourceEmbedInput = {
  conceptType?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type GQLResourceMetaData = {
  __typename?: 'ResourceMetaData';
  audios?: Maybe<Array<GQLAudioLicense>>;
  brightcoves?: Maybe<Array<GQLBrightcoveLicense>>;
  concepts?: Maybe<Array<GQLConceptLicense>>;
  glosses?: Maybe<Array<GQLGlossLicense>>;
  h5ps?: Maybe<Array<GQLH5pLicense>>;
  images?: Maybe<Array<GQLImageLicense>>;
  podcasts?: Maybe<Array<GQLPodcastLicense>>;
};

export type GQLResourceType = {
  __typename?: 'ResourceType';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type GQLResourceTypeDefinition = {
  __typename?: 'ResourceTypeDefinition';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  subtypes?: Maybe<Array<GQLResourceTypeDefinition>>;
};

export type GQLSearch = {
  __typename?: 'Search';
  aggregations: Array<GQLAggregationResult>;
  language: Scalars['String']['output'];
  page?: Maybe<Scalars['Int']['output']>;
  pageSize: Scalars['Int']['output'];
  results: Array<GQLSearchResult>;
  suggestions: Array<GQLSuggestionResult>;
  totalCount: Scalars['Int']['output'];
};

export type GQLSearchContext = {
  __typename?: 'SearchContext';
  breadcrumbs: Array<Scalars['String']['output']>;
  contextId: Scalars['String']['output'];
  contextType: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  isPrimary: Scalars['Boolean']['output'];
  language: Scalars['String']['output'];
  path: Scalars['String']['output'];
  publicId: Scalars['String']['output'];
  relevance: Scalars['String']['output'];
  relevanceId: Scalars['String']['output'];
  resourceTypes: Array<GQLSearchContextResourceTypes>;
  root: Scalars['String']['output'];
  rootId: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type GQLSearchContextResourceTypes = {
  __typename?: 'SearchContextResourceTypes';
  id: Scalars['String']['output'];
  language: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type GQLSearchResult = {
  context?: Maybe<GQLSearchContext>;
  contexts: Array<GQLSearchContext>;
  id: Scalars['String']['output'];
  metaDescription: Scalars['String']['output'];
  supportedLanguages: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type GQLSearchResultUnion = GQLArticleSearchResult | GQLLearningpathSearchResult | GQLNodeSearchResult;

export type GQLSearchSuggestion = {
  __typename?: 'SearchSuggestion';
  length: Scalars['Int']['output'];
  offset: Scalars['Int']['output'];
  options: Array<GQLSuggestOption>;
  text: Scalars['String']['output'];
};

export type GQLSearchWithoutPagination = {
  __typename?: 'SearchWithoutPagination';
  results: Array<GQLSearchResult>;
};

export type GQLSharedFolder = {
  __typename?: 'SharedFolder';
  breadcrumbs: Array<GQLBreadcrumb>;
  created: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  owner?: Maybe<GQLOwner>;
  parentId?: Maybe<Scalars['String']['output']>;
  resources: Array<GQLFolderResource>;
  status: Scalars['String']['output'];
  subfolders: Array<GQLSharedFolder>;
  updated: Scalars['String']['output'];
};

export type GQLSortResult = {
  __typename?: 'SortResult';
  parentId?: Maybe<Scalars['String']['output']>;
  sortedIds: Array<Scalars['String']['output']>;
};

export type GQLSubject = GQLTaxBase & GQLTaxonomyEntity & {
  __typename?: 'Subject';
  allTopics?: Maybe<Array<GQLTopic>>;
  breadcrumbs: Array<Scalars['String']['output']>;
  contentUri?: Maybe<Scalars['String']['output']>;
  context?: Maybe<GQLTaxonomyContext>;
  contextId?: Maybe<Scalars['String']['output']>;
  contexts: Array<GQLTaxonomyContext>;
  grepCodes?: Maybe<Array<Scalars['String']['output']>>;
  id: Scalars['String']['output'];
  language?: Maybe<Scalars['String']['output']>;
  metadata: GQLTaxonomyMetadata;
  name: Scalars['String']['output'];
  nodeType: Scalars['String']['output'];
  relevanceId?: Maybe<Scalars['String']['output']>;
  resourceTypes?: Maybe<Array<GQLResourceType>>;
  subjectpage?: Maybe<GQLSubjectPage>;
  supportedLanguages: Array<Scalars['String']['output']>;
  topics?: Maybe<Array<GQLTopic>>;
  url?: Maybe<Scalars['String']['output']>;
};


export type GQLSubjectTopicsArgs = {
  all?: InputMaybe<Scalars['Boolean']['input']>;
};

export type GQLSubjectLink = {
  __typename?: 'SubjectLink';
  name?: Maybe<Scalars['String']['output']>;
  path?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type GQLSubjectPage = {
  __typename?: 'SubjectPage';
  about?: Maybe<GQLSubjectPageAbout>;
  banner: GQLSubjectPageBanner;
  buildsOn: Array<Maybe<GQLSubjectLink>>;
  connectedTo: Array<Maybe<GQLSubjectLink>>;
  id: Scalars['Int']['output'];
  leadsTo: Array<Maybe<GQLSubjectLink>>;
  metaDescription?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  supportedLanguages: Array<Scalars['String']['output']>;
};

export type GQLSubjectPageAbout = {
  __typename?: 'SubjectPageAbout';
  description: Scalars['String']['output'];
  title: Scalars['String']['output'];
  visualElement: GQLSubjectPageVisualElement;
};

export type GQLSubjectPageBanner = {
  __typename?: 'SubjectPageBanner';
  desktopId: Scalars['String']['output'];
  desktopUrl: Scalars['String']['output'];
  mobileId?: Maybe<Scalars['String']['output']>;
  mobileUrl?: Maybe<Scalars['String']['output']>;
};

export type GQLSubjectPageVisualElement = {
  __typename?: 'SubjectPageVisualElement';
  alt?: Maybe<Scalars['String']['output']>;
  imageLicense?: Maybe<GQLImageLicense>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type GQLSuggestOption = {
  __typename?: 'SuggestOption';
  score: Scalars['Float']['output'];
  text: Scalars['String']['output'];
};

export type GQLSuggestionResult = {
  __typename?: 'SuggestionResult';
  name: Scalars['String']['output'];
  suggestions: Array<GQLSearchSuggestion>;
};

export type GQLTags = {
  __typename?: 'Tags';
  language: Scalars['String']['output'];
  tags: Array<Scalars['String']['output']>;
};

export type GQLTaxBase = {
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  url?: Maybe<Scalars['String']['output']>;
};

export type GQLTaxonomyContext = {
  __typename?: 'TaxonomyContext';
  breadcrumbs: Array<Scalars['String']['output']>;
  contextId: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  parentIds: Array<Scalars['String']['output']>;
  parents?: Maybe<Array<GQLTaxonomyCrumb>>;
  relevance: Scalars['String']['output'];
  root: Scalars['String']['output'];
  rootId: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type GQLTaxonomyCrumb = GQLTaxBase & {
  __typename?: 'TaxonomyCrumb';
  contextId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type GQLTaxonomyEntity = {
  breadcrumbs: Array<Scalars['String']['output']>;
  contentUri?: Maybe<Scalars['String']['output']>;
  context?: Maybe<GQLTaxonomyContext>;
  contextId?: Maybe<Scalars['String']['output']>;
  contexts: Array<GQLTaxonomyContext>;
  id: Scalars['String']['output'];
  language?: Maybe<Scalars['String']['output']>;
  metadata: GQLTaxonomyMetadata;
  name: Scalars['String']['output'];
  nodeType: Scalars['String']['output'];
  relevanceId?: Maybe<Scalars['String']['output']>;
  resourceTypes?: Maybe<Array<GQLResourceType>>;
  supportedLanguages: Array<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type GQLTaxonomyMetadata = {
  __typename?: 'TaxonomyMetadata';
  customFields: Scalars['StringRecord']['output'];
  grepCodes: Array<Scalars['String']['output']>;
  visible: Scalars['Boolean']['output'];
};

export type GQLTextblockLicense = {
  __typename?: 'TextblockLicense';
  copyright: GQLCopyright;
  title?: Maybe<Scalars['String']['output']>;
};

export type GQLTitle = {
  __typename?: 'Title';
  language: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type GQLTopic = GQLTaxBase & GQLTaxonomyEntity & GQLWithArticle & {
  __typename?: 'Topic';
  alternateTopics?: Maybe<Array<GQLTopic>>;
  article?: Maybe<GQLArticle>;
  availability?: Maybe<Scalars['String']['output']>;
  breadcrumbs: Array<Scalars['String']['output']>;
  contentUri?: Maybe<Scalars['String']['output']>;
  context?: Maybe<GQLTaxonomyContext>;
  contextId?: Maybe<Scalars['String']['output']>;
  contexts: Array<GQLTaxonomyContext>;
  coreResources?: Maybe<Array<GQLResource>>;
  id: Scalars['String']['output'];
  isPrimary?: Maybe<Scalars['Boolean']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  meta?: Maybe<GQLMeta>;
  metadata: GQLTaxonomyMetadata;
  name: Scalars['String']['output'];
  nodeType: Scalars['String']['output'];
  parentId?: Maybe<Scalars['String']['output']>;
  relevanceId?: Maybe<Scalars['String']['output']>;
  resourceTypes?: Maybe<Array<GQLResourceType>>;
  subtopics?: Maybe<Array<GQLTopic>>;
  supplementaryResources?: Maybe<Array<GQLResource>>;
  supportedLanguages: Array<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};


export type GQLTopicCoreResourcesArgs = {
  subjectId?: InputMaybe<Scalars['String']['input']>;
};


export type GQLTopicSupplementaryResourcesArgs = {
  subjectId?: InputMaybe<Scalars['String']['input']>;
};

export type GQLTranscription = {
  __typename?: 'Transcription';
  pinyin?: Maybe<Scalars['String']['output']>;
  traditional?: Maybe<Scalars['String']['output']>;
};

export type GQLTransformedArticleContent = {
  __typename?: 'TransformedArticleContent';
  content: Scalars['String']['output'];
  metaData?: Maybe<GQLArticleMetaData>;
  visualElement?: Maybe<GQLVisualElement>;
  visualElementEmbed?: Maybe<GQLResourceEmbed>;
};

export type GQLTransformedArticleContentInput = {
  absoluteUrl?: InputMaybe<Scalars['Boolean']['input']>;
  contextId?: InputMaybe<Scalars['String']['input']>;
  draftConcept?: InputMaybe<Scalars['Boolean']['input']>;
  isOembed?: InputMaybe<Scalars['String']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  prettyUrl?: InputMaybe<Scalars['Boolean']['input']>;
  previewH5p?: InputMaybe<Scalars['Boolean']['input']>;
  showVisualElement?: InputMaybe<Scalars['String']['input']>;
  subjectId?: InputMaybe<Scalars['String']['input']>;
};

export type GQLUpdatedFolder = {
  __typename?: 'UpdatedFolder';
  name?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type GQLUpdatedFolderResource = {
  __typename?: 'UpdatedFolderResource';
  tags?: Maybe<Array<Scalars['String']['output']>>;
};

export type GQLUptimeAlert = {
  __typename?: 'UptimeAlert';
  body?: Maybe<Scalars['String']['output']>;
  closable: Scalars['Boolean']['output'];
  number: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type GQLUserFolder = {
  __typename?: 'UserFolder';
  folders: Array<GQLFolder>;
  sharedFolders: Array<GQLSharedFolder>;
};

export enum GQLUserRole {
  Employee = 'employee',
  Student = 'student'
}

export type GQLVideoFolderResourceMeta = GQLFolderResourceMeta & {
  __typename?: 'VideoFolderResourceMeta';
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  metaImage?: Maybe<GQLMetaImage>;
  resourceTypes: Array<GQLFolderResourceResourceType>;
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type GQLVisualElement = {
  __typename?: 'VisualElement';
  brightcove?: Maybe<GQLBrightcoveElement>;
  copyright?: Maybe<GQLCopyright>;
  embed?: Maybe<Scalars['String']['output']>;
  h5p?: Maybe<GQLH5pElement>;
  image?: Maybe<GQLImageElement>;
  language?: Maybe<Scalars['String']['output']>;
  oembed?: Maybe<GQLVisualElementOembed>;
  resource?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type GQLVisualElementOembed = {
  __typename?: 'VisualElementOembed';
  fullscreen?: Maybe<Scalars['Boolean']['output']>;
  html?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type GQLWithArticle = {
  article?: Maybe<GQLArticle>;
  availability?: Maybe<Scalars['String']['output']>;
  contentUri?: Maybe<Scalars['String']['output']>;
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

/** Mapping of union types */
export type GQLResolversUnionTypes<_RefType extends Record<string, unknown>> = {
  SearchResultUnion: ( GQLArticleSearchResult ) | ( GQLLearningpathSearchResult ) | ( GQLNodeSearchResult );
};

/** Mapping of interface types */
export type GQLResolversInterfaceTypes<_RefType extends Record<string, unknown>> = {
  FolderResourceMeta: ( GQLArticleFolderResourceMeta ) | ( GQLAudioFolderResourceMeta ) | ( GQLConceptFolderResourceMeta ) | ( GQLImageFolderResourceMeta ) | ( GQLLearningpathFolderResourceMeta ) | ( GQLVideoFolderResourceMeta );
  PodcastSeriesBase: ( GQLPodcastSeries ) | ( GQLPodcastSeriesWithEpisodes );
  SearchResult: ( GQLArticleSearchResult ) | ( GQLLearningpathSearchResult ) | ( GQLNodeSearchResult );
  TaxBase: ( GQLNode ) | ( GQLResource ) | ( GQLSubject ) | ( GQLTaxonomyCrumb ) | ( GQLTopic );
  TaxonomyEntity: ( GQLNode ) | ( GQLResource ) | ( GQLSubject ) | ( GQLTopic );
  WithArticle: ( GQLNode ) | ( GQLResource ) | ( GQLTopic );
};

/** Mapping between all available schema types and the resolvers types */
export type GQLResolversTypes = {
  AggregationResult: ResolverTypeWrapper<GQLAggregationResult>;
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
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Breadcrumb: ResolverTypeWrapper<GQLBreadcrumb>;
  BrightcoveCustomFields: ResolverTypeWrapper<GQLBrightcoveCustomFields>;
  BrightcoveElement: ResolverTypeWrapper<GQLBrightcoveElement>;
  BrightcoveIframe: ResolverTypeWrapper<GQLBrightcoveIframe>;
  BrightcoveLicense: ResolverTypeWrapper<GQLBrightcoveLicense>;
  BucketResult: ResolverTypeWrapper<GQLBucketResult>;
  Caption: ResolverTypeWrapper<GQLCaption>;
  Category: ResolverTypeWrapper<GQLCategory>;
  CategoryBreadcrumb: ResolverTypeWrapper<GQLCategoryBreadcrumb>;
  CompetenceGoal: ResolverTypeWrapper<GQLCompetenceGoal>;
  Concept: ResolverTypeWrapper<GQLConcept>;
  ConceptCopyright: ResolverTypeWrapper<GQLConceptCopyright>;
  ConceptFolderResourceMeta: ResolverTypeWrapper<GQLConceptFolderResourceMeta>;
  ConceptLicense: ResolverTypeWrapper<GQLConceptLicense>;
  ConfigMetaBoolean: ResolverTypeWrapper<GQLConfigMetaBoolean>;
  ConfigMetaStringList: ResolverTypeWrapper<GQLConfigMetaStringList>;
  Contributor: ResolverTypeWrapper<GQLContributor>;
  ContributorInput: GQLContributorInput;
  Copyright: ResolverTypeWrapper<GQLCopyright>;
  CoreElement: ResolverTypeWrapper<GQLCoreElement>;
  CoverPhoto: ResolverTypeWrapper<GQLCoverPhoto>;
  CrossSubjectElement: ResolverTypeWrapper<GQLCrossSubjectElement>;
  Description: ResolverTypeWrapper<GQLDescription>;
  EditorNote: ResolverTypeWrapper<GQLEditorNote>;
  Element: ResolverTypeWrapper<GQLElement>;
  EmbedVisualelement: ResolverTypeWrapper<GQLEmbedVisualelement>;
  Examples: ResolverTypeWrapper<GQLExamples>;
  ExternalOpengraph: ResolverTypeWrapper<GQLExternalOpengraph>;
  FilmFrontpage: ResolverTypeWrapper<GQLFilmFrontpage>;
  FilmPageAbout: ResolverTypeWrapper<GQLFilmPageAbout>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Folder: ResolverTypeWrapper<GQLFolder>;
  FolderResource: ResolverTypeWrapper<GQLFolderResource>;
  FolderResourceMeta: ResolverTypeWrapper<GQLResolversInterfaceTypes<GQLResolversTypes>['FolderResourceMeta']>;
  FolderResourceMetaSearchInput: GQLFolderResourceMetaSearchInput;
  FolderResourceResourceType: ResolverTypeWrapper<GQLFolderResourceResourceType>;
  FootNote: ResolverTypeWrapper<GQLFootNote>;
  FrontpageMenu: ResolverTypeWrapper<GQLFrontpageMenu>;
  Gloss: ResolverTypeWrapper<GQLGloss>;
  GlossLicense: ResolverTypeWrapper<GQLGlossLicense>;
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
  ImageMetaInformationV3: ResolverTypeWrapper<GQLImageMetaInformationV3>;
  ImageSearch: ResolverTypeWrapper<GQLImageSearch>;
  ImageV3: ResolverTypeWrapper<GQLImageV3>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Learningpath: ResolverTypeWrapper<GQLLearningpath>;
  LearningpathCopyInput: GQLLearningpathCopyInput;
  LearningpathCopyright: ResolverTypeWrapper<GQLLearningpathCopyright>;
  LearningpathCopyrightInput: GQLLearningpathCopyrightInput;
  LearningpathCoverphoto: ResolverTypeWrapper<GQLLearningpathCoverphoto>;
  LearningpathEmbedInput: GQLLearningpathEmbedInput;
  LearningpathFolderResourceMeta: ResolverTypeWrapper<GQLLearningpathFolderResourceMeta>;
  LearningpathNewInput: GQLLearningpathNewInput;
  LearningpathSearchResult: ResolverTypeWrapper<GQLLearningpathSearchResult>;
  LearningpathSeqNo: ResolverTypeWrapper<GQLLearningpathSeqNo>;
  LearningpathStep: ResolverTypeWrapper<GQLLearningpathStep>;
  LearningpathStepEmbedUrl: ResolverTypeWrapper<GQLLearningpathStepEmbedUrl>;
  LearningpathStepNewInput: GQLLearningpathStepNewInput;
  LearningpathStepOembed: ResolverTypeWrapper<GQLLearningpathStepOembed>;
  LearningpathStepUpdateInput: GQLLearningpathStepUpdateInput;
  LearningpathUpdateInput: GQLLearningpathUpdateInput;
  License: ResolverTypeWrapper<GQLLicense>;
  LicenseInput: GQLLicenseInput;
  Manuscript: ResolverTypeWrapper<GQLManuscript>;
  Meta: ResolverTypeWrapper<GQLMeta>;
  MetaImage: ResolverTypeWrapper<GQLMetaImage>;
  MetaImageWithCopyright: ResolverTypeWrapper<GQLMetaImageWithCopyright>;
  Movie: ResolverTypeWrapper<GQLMovie>;
  MovieMeta: ResolverTypeWrapper<GQLMovieMeta>;
  MovieResourceTypes: ResolverTypeWrapper<GQLMovieResourceTypes>;
  MovieTheme: ResolverTypeWrapper<GQLMovieTheme>;
  Mutation: ResolverTypeWrapper<{}>;
  MyNdlaGroup: ResolverTypeWrapper<GQLMyNdlaGroup>;
  MyNdlaLearningpath: ResolverTypeWrapper<GQLMyNdlaLearningpath>;
  MyNdlaLearningpathStep: ResolverTypeWrapper<GQLMyNdlaLearningpathStep>;
  MyNdlaPersonalData: ResolverTypeWrapper<GQLMyNdlaPersonalData>;
  Name: ResolverTypeWrapper<GQLName>;
  NewFolder: ResolverTypeWrapper<GQLNewFolder>;
  NewFolderResource: ResolverTypeWrapper<GQLNewFolderResource>;
  Node: ResolverTypeWrapper<GQLNode>;
  NodeSearchResult: ResolverTypeWrapper<GQLNodeSearchResult>;
  Owner: ResolverTypeWrapper<GQLOwner>;
  PodcastLicense: ResolverTypeWrapper<GQLPodcastLicense>;
  PodcastMeta: ResolverTypeWrapper<GQLPodcastMeta>;
  PodcastSeries: ResolverTypeWrapper<GQLPodcastSeries>;
  PodcastSeriesBase: ResolverTypeWrapper<GQLResolversInterfaceTypes<GQLResolversTypes>['PodcastSeriesBase']>;
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
  Search: ResolverTypeWrapper<Omit<GQLSearch, 'results'> & { results: Array<GQLResolversTypes['SearchResult']> }>;
  SearchContext: ResolverTypeWrapper<GQLSearchContext>;
  SearchContextResourceTypes: ResolverTypeWrapper<GQLSearchContextResourceTypes>;
  SearchResult: ResolverTypeWrapper<GQLResolversInterfaceTypes<GQLResolversTypes>['SearchResult']>;
  SearchResultUnion: ResolverTypeWrapper<GQLResolversUnionTypes<GQLResolversTypes>['SearchResultUnion']>;
  SearchSuggestion: ResolverTypeWrapper<GQLSearchSuggestion>;
  SearchWithoutPagination: ResolverTypeWrapper<Omit<GQLSearchWithoutPagination, 'results'> & { results: Array<GQLResolversTypes['SearchResult']> }>;
  SharedFolder: ResolverTypeWrapper<GQLSharedFolder>;
  SortResult: ResolverTypeWrapper<GQLSortResult>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  StringRecord: ResolverTypeWrapper<Scalars['StringRecord']['output']>;
  Subject: ResolverTypeWrapper<GQLSubject>;
  SubjectLink: ResolverTypeWrapper<GQLSubjectLink>;
  SubjectPage: ResolverTypeWrapper<GQLSubjectPage>;
  SubjectPageAbout: ResolverTypeWrapper<GQLSubjectPageAbout>;
  SubjectPageBanner: ResolverTypeWrapper<GQLSubjectPageBanner>;
  SubjectPageVisualElement: ResolverTypeWrapper<GQLSubjectPageVisualElement>;
  SuggestOption: ResolverTypeWrapper<GQLSuggestOption>;
  SuggestionResult: ResolverTypeWrapper<GQLSuggestionResult>;
  Tags: ResolverTypeWrapper<GQLTags>;
  TaxBase: ResolverTypeWrapper<GQLResolversInterfaceTypes<GQLResolversTypes>['TaxBase']>;
  TaxonomyContext: ResolverTypeWrapper<GQLTaxonomyContext>;
  TaxonomyCrumb: ResolverTypeWrapper<GQLTaxonomyCrumb>;
  TaxonomyEntity: ResolverTypeWrapper<GQLResolversInterfaceTypes<GQLResolversTypes>['TaxonomyEntity']>;
  TaxonomyMetadata: ResolverTypeWrapper<GQLTaxonomyMetadata>;
  TextblockLicense: ResolverTypeWrapper<GQLTextblockLicense>;
  Title: ResolverTypeWrapper<GQLTitle>;
  Topic: ResolverTypeWrapper<GQLTopic>;
  Transcription: ResolverTypeWrapper<GQLTranscription>;
  TransformedArticleContent: ResolverTypeWrapper<GQLTransformedArticleContent>;
  TransformedArticleContentInput: GQLTransformedArticleContentInput;
  UpdatedFolder: ResolverTypeWrapper<GQLUpdatedFolder>;
  UpdatedFolderResource: ResolverTypeWrapper<GQLUpdatedFolderResource>;
  UptimeAlert: ResolverTypeWrapper<GQLUptimeAlert>;
  UserFolder: ResolverTypeWrapper<GQLUserFolder>;
  UserRole: GQLUserRole;
  VideoFolderResourceMeta: ResolverTypeWrapper<GQLVideoFolderResourceMeta>;
  VisualElement: ResolverTypeWrapper<GQLVisualElement>;
  VisualElementOembed: ResolverTypeWrapper<GQLVisualElementOembed>;
  WithArticle: ResolverTypeWrapper<GQLResolversInterfaceTypes<GQLResolversTypes>['WithArticle']>;
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
  AudioFile: GQLAudioFile;
  AudioFolderResourceMeta: GQLAudioFolderResourceMeta;
  AudioLicense: GQLAudioLicense;
  AudioSearch: GQLAudioSearch;
  AudioSummary: GQLAudioSummary;
  Boolean: Scalars['Boolean']['output'];
  Breadcrumb: GQLBreadcrumb;
  BrightcoveCustomFields: GQLBrightcoveCustomFields;
  BrightcoveElement: GQLBrightcoveElement;
  BrightcoveIframe: GQLBrightcoveIframe;
  BrightcoveLicense: GQLBrightcoveLicense;
  BucketResult: GQLBucketResult;
  Caption: GQLCaption;
  Category: GQLCategory;
  CategoryBreadcrumb: GQLCategoryBreadcrumb;
  CompetenceGoal: GQLCompetenceGoal;
  Concept: GQLConcept;
  ConceptCopyright: GQLConceptCopyright;
  ConceptFolderResourceMeta: GQLConceptFolderResourceMeta;
  ConceptLicense: GQLConceptLicense;
  ConfigMetaBoolean: GQLConfigMetaBoolean;
  ConfigMetaStringList: GQLConfigMetaStringList;
  Contributor: GQLContributor;
  ContributorInput: GQLContributorInput;
  Copyright: GQLCopyright;
  CoreElement: GQLCoreElement;
  CoverPhoto: GQLCoverPhoto;
  CrossSubjectElement: GQLCrossSubjectElement;
  Description: GQLDescription;
  EditorNote: GQLEditorNote;
  Element: GQLElement;
  EmbedVisualelement: GQLEmbedVisualelement;
  Examples: GQLExamples;
  ExternalOpengraph: GQLExternalOpengraph;
  FilmFrontpage: GQLFilmFrontpage;
  FilmPageAbout: GQLFilmPageAbout;
  Float: Scalars['Float']['output'];
  Folder: GQLFolder;
  FolderResource: GQLFolderResource;
  FolderResourceMeta: GQLResolversInterfaceTypes<GQLResolversParentTypes>['FolderResourceMeta'];
  FolderResourceMetaSearchInput: GQLFolderResourceMetaSearchInput;
  FolderResourceResourceType: GQLFolderResourceResourceType;
  FootNote: GQLFootNote;
  FrontpageMenu: GQLFrontpageMenu;
  Gloss: GQLGloss;
  GlossLicense: GQLGlossLicense;
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
  ImageMetaInformationV3: GQLImageMetaInformationV3;
  ImageSearch: GQLImageSearch;
  ImageV3: GQLImageV3;
  Int: Scalars['Int']['output'];
  Learningpath: GQLLearningpath;
  LearningpathCopyInput: GQLLearningpathCopyInput;
  LearningpathCopyright: GQLLearningpathCopyright;
  LearningpathCopyrightInput: GQLLearningpathCopyrightInput;
  LearningpathCoverphoto: GQLLearningpathCoverphoto;
  LearningpathEmbedInput: GQLLearningpathEmbedInput;
  LearningpathFolderResourceMeta: GQLLearningpathFolderResourceMeta;
  LearningpathNewInput: GQLLearningpathNewInput;
  LearningpathSearchResult: GQLLearningpathSearchResult;
  LearningpathSeqNo: GQLLearningpathSeqNo;
  LearningpathStep: GQLLearningpathStep;
  LearningpathStepEmbedUrl: GQLLearningpathStepEmbedUrl;
  LearningpathStepNewInput: GQLLearningpathStepNewInput;
  LearningpathStepOembed: GQLLearningpathStepOembed;
  LearningpathStepUpdateInput: GQLLearningpathStepUpdateInput;
  LearningpathUpdateInput: GQLLearningpathUpdateInput;
  License: GQLLicense;
  LicenseInput: GQLLicenseInput;
  Manuscript: GQLManuscript;
  Meta: GQLMeta;
  MetaImage: GQLMetaImage;
  MetaImageWithCopyright: GQLMetaImageWithCopyright;
  Movie: GQLMovie;
  MovieMeta: GQLMovieMeta;
  MovieResourceTypes: GQLMovieResourceTypes;
  MovieTheme: GQLMovieTheme;
  Mutation: {};
  MyNdlaGroup: GQLMyNdlaGroup;
  MyNdlaLearningpath: GQLMyNdlaLearningpath;
  MyNdlaLearningpathStep: GQLMyNdlaLearningpathStep;
  MyNdlaPersonalData: GQLMyNdlaPersonalData;
  Name: GQLName;
  NewFolder: GQLNewFolder;
  NewFolderResource: GQLNewFolderResource;
  Node: GQLNode;
  NodeSearchResult: GQLNodeSearchResult;
  Owner: GQLOwner;
  PodcastLicense: GQLPodcastLicense;
  PodcastMeta: GQLPodcastMeta;
  PodcastSeries: GQLPodcastSeries;
  PodcastSeriesBase: GQLResolversInterfaceTypes<GQLResolversParentTypes>['PodcastSeriesBase'];
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
  Search: Omit<GQLSearch, 'results'> & { results: Array<GQLResolversParentTypes['SearchResult']> };
  SearchContext: GQLSearchContext;
  SearchContextResourceTypes: GQLSearchContextResourceTypes;
  SearchResult: GQLResolversInterfaceTypes<GQLResolversParentTypes>['SearchResult'];
  SearchResultUnion: GQLResolversUnionTypes<GQLResolversParentTypes>['SearchResultUnion'];
  SearchSuggestion: GQLSearchSuggestion;
  SearchWithoutPagination: Omit<GQLSearchWithoutPagination, 'results'> & { results: Array<GQLResolversParentTypes['SearchResult']> };
  SharedFolder: GQLSharedFolder;
  SortResult: GQLSortResult;
  String: Scalars['String']['output'];
  StringRecord: Scalars['StringRecord']['output'];
  Subject: GQLSubject;
  SubjectLink: GQLSubjectLink;
  SubjectPage: GQLSubjectPage;
  SubjectPageAbout: GQLSubjectPageAbout;
  SubjectPageBanner: GQLSubjectPageBanner;
  SubjectPageVisualElement: GQLSubjectPageVisualElement;
  SuggestOption: GQLSuggestOption;
  SuggestionResult: GQLSuggestionResult;
  Tags: GQLTags;
  TaxBase: GQLResolversInterfaceTypes<GQLResolversParentTypes>['TaxBase'];
  TaxonomyContext: GQLTaxonomyContext;
  TaxonomyCrumb: GQLTaxonomyCrumb;
  TaxonomyEntity: GQLResolversInterfaceTypes<GQLResolversParentTypes>['TaxonomyEntity'];
  TaxonomyMetadata: GQLTaxonomyMetadata;
  TextblockLicense: GQLTextblockLicense;
  Title: GQLTitle;
  Topic: GQLTopic;
  Transcription: GQLTranscription;
  TransformedArticleContent: GQLTransformedArticleContent;
  TransformedArticleContentInput: GQLTransformedArticleContentInput;
  UpdatedFolder: GQLUpdatedFolder;
  UpdatedFolderResource: GQLUpdatedFolderResource;
  UptimeAlert: GQLUptimeAlert;
  UserFolder: GQLUserFolder;
  VideoFolderResourceMeta: GQLVideoFolderResourceMeta;
  VisualElement: GQLVisualElement;
  VisualElementOembed: GQLVisualElementOembed;
  WithArticle: GQLResolversInterfaceTypes<GQLResolversParentTypes>['WithArticle'];
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
  htmlIntroduction?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  htmlTitle?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  introduction?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  language?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  metaDescription?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  metaImage?: Resolver<Maybe<GQLResolversTypes['MetaImageWithCopyright']>, ParentType, ContextType>;
  oembed?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  oldNdlaUrl?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  published?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  relatedContent?: Resolver<Maybe<Array<GQLResolversTypes['RelatedContent']>>, ParentType, ContextType, Partial<GQLArticleRelatedContentArgs>>;
  requiredLibraries?: Resolver<Maybe<Array<GQLResolversTypes['ArticleRequiredLibrary']>>, ParentType, ContextType>;
  revision?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  revisionDate?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  slug?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  supportedLanguages?: Resolver<Maybe<Array<GQLResolversTypes['String']>>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<GQLResolversTypes['String']>>, ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  transformedContent?: Resolver<GQLResolversTypes['TransformedArticleContent'], ParentType, ContextType, Partial<GQLArticleTransformedContentArgs>>;
  transformedDisclaimer?: Resolver<GQLResolversTypes['TransformedArticleContent'], ParentType, ContextType, Partial<GQLArticleTransformedDisclaimerArgs>>;
  updated?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
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
  glosses?: Resolver<Maybe<Array<GQLResolversTypes['GlossLicense']>>, ParentType, ContextType>;
  h5ps?: Resolver<Maybe<Array<GQLResolversTypes['H5pLicense']>>, ParentType, ContextType>;
  images?: Resolver<Maybe<Array<GQLResolversTypes['ImageLicense']>>, ParentType, ContextType>;
  podcasts?: Resolver<Maybe<Array<GQLResolversTypes['PodcastLicense']>>, ParentType, ContextType>;
  textblocks?: Resolver<Maybe<Array<GQLResolversTypes['TextblockLicense']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLArticleRequiredLibraryResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ArticleRequiredLibrary'] = GQLResolversParentTypes['ArticleRequiredLibrary']> = {
  mediaType?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLArticleSearchResultResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ArticleSearchResult'] = GQLResolversParentTypes['ArticleSearchResult']> = {
  context?: Resolver<Maybe<GQLResolversTypes['SearchContext']>, ParentType, ContextType>;
  contexts?: Resolver<Array<GQLResolversTypes['SearchContext']>, ParentType, ContextType>;
  htmlTitle?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
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

export type GQLCategoryBreadcrumbResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['CategoryBreadcrumb'] = GQLResolversParentTypes['CategoryBreadcrumb']> = {
  id?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
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
  src?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
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
  url?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
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

export type GQLExternalOpengraphResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ExternalOpengraph'] = GQLResolversParentTypes['ExternalOpengraph']> = {
  description?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  imageAlt?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLFilmFrontpageResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['FilmFrontpage'] = GQLResolversParentTypes['FilmFrontpage']> = {
  about?: Resolver<Array<GQLResolversTypes['FilmPageAbout']>, ParentType, ContextType>;
  article?: Resolver<Maybe<GQLResolversTypes['Article']>, ParentType, ContextType>;
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
  owner?: Resolver<Maybe<GQLResolversTypes['Owner']>, ParentType, ContextType>;
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

export type GQLFrontpageMenuResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['FrontpageMenu'] = GQLResolversParentTypes['FrontpageMenu']> = {
  article?: Resolver<GQLResolversTypes['Article'], ParentType, ContextType>;
  articleId?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  hideLevel?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>;
  menu?: Resolver<Maybe<Array<Maybe<GQLResolversTypes['FrontpageMenu']>>>, ParentType, ContextType>;
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

export type GQLGlossLicenseResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['GlossLicense'] = GQLResolversParentTypes['GlossLicense']> = {
  content?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  copyright?: Resolver<Maybe<GQLResolversTypes['ConceptCopyright']>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  metaImageUrl?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  src?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLGradeResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Grade'] = GQLResolversParentTypes['Grade']> = {
  categories?: Resolver<Maybe<Array<GQLResolversTypes['Category']>>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['Title'], ParentType, ContextType>;
  url?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
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
  htmlTitle?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  ingress?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  metaImage?: Resolver<Maybe<GQLResolversTypes['MetaImage']>, ParentType, ContextType>;
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  path?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
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

export type GQLImageMetaInformationV3Resolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ImageMetaInformationV3'] = GQLResolversParentTypes['ImageMetaInformationV3']> = {
  alttext?: Resolver<GQLResolversTypes['ImageAltText'], ParentType, ContextType>;
  caption?: Resolver<GQLResolversTypes['Caption'], ParentType, ContextType>;
  copyright?: Resolver<GQLResolversTypes['Copyright'], ParentType, ContextType>;
  created?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  createdBy?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  editorNotes?: Resolver<Maybe<Array<GQLResolversTypes['EditorNote']>>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<GQLResolversTypes['ImageV3'], ParentType, ContextType>;
  metaUrl?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  modelRelease?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  supportedLanguages?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  tags?: Resolver<GQLResolversTypes['Tags'], ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['Title'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLImageSearchResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ImageSearch'] = GQLResolversParentTypes['ImageSearch']> = {
  language?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  page?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  pageSize?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  results?: Resolver<Array<GQLResolversTypes['ImageMetaInformationV3']>, ParentType, ContextType>;
  totalCount?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLImageV3Resolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ImageV3'] = GQLResolversParentTypes['ImageV3']> = {
  contentType?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  dimensions?: Resolver<Maybe<GQLResolversTypes['ImageDimensions']>, ParentType, ContextType>;
  fileName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  imageUrl?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  language?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  size?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLLearningpathResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Learningpath'] = GQLResolversParentTypes['Learningpath']> = {
  canEdit?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
  copyright?: Resolver<GQLResolversTypes['LearningpathCopyright'], ParentType, ContextType>;
  coverphoto?: Resolver<Maybe<GQLResolversTypes['LearningpathCoverphoto']>, ParentType, ContextType>;
  created?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  duration?: Resolver<Maybe<GQLResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  isBasedOn?: Resolver<Maybe<GQLResolversTypes['Int']>, ParentType, ContextType>;
  isMyNDLAOwner?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
  lastUpdated?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  learningstepUrl?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  learningsteps?: Resolver<Array<GQLResolversTypes['LearningpathStep']>, ParentType, ContextType>;
  madeAvailable?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
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
  context?: Resolver<Maybe<GQLResolversTypes['SearchContext']>, ParentType, ContextType>;
  contexts?: Resolver<Array<GQLResolversTypes['SearchContext']>, ParentType, ContextType>;
  htmlTitle?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  metaDescription?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  metaImage?: Resolver<Maybe<GQLResolversTypes['MetaImage']>, ParentType, ContextType>;
  supportedLanguages?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  traits?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLLearningpathSeqNoResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['LearningpathSeqNo'] = GQLResolversParentTypes['LearningpathSeqNo']> = {
  seqNo?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLLearningpathStepResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['LearningpathStep'] = GQLResolversParentTypes['LearningpathStep']> = {
  description?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  embedUrl?: Resolver<Maybe<GQLResolversTypes['LearningpathStepEmbedUrl']>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  introduction?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  license?: Resolver<Maybe<GQLResolversTypes['License']>, ParentType, ContextType>;
  metaUrl?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  oembed?: Resolver<Maybe<GQLResolversTypes['LearningpathStepOembed']>, ParentType, ContextType>;
  opengraph?: Resolver<Maybe<GQLResolversTypes['ExternalOpengraph']>, ParentType, ContextType>;
  resource?: Resolver<Maybe<GQLResolversTypes['Resource']>, ParentType, ContextType, Partial<GQLLearningpathStepResourceArgs>>;
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

export type GQLManuscriptResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Manuscript'] = GQLResolversParentTypes['Manuscript']> = {
  language?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  manuscript?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLMetaResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Meta'] = GQLResolversParentTypes['Meta']> = {
  availability?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  htmlIntroduction?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  htmlTitle?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  introduction?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  language?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
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

export type GQLMetaImageWithCopyrightResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['MetaImageWithCopyright'] = GQLResolversParentTypes['MetaImageWithCopyright']> = {
  alt?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  copyright?: Resolver<GQLResolversTypes['Copyright'], ParentType, ContextType>;
  url?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLMovieResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Movie'] = GQLResolversParentTypes['Movie']> = {
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  metaDescription?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  metaImage?: Resolver<Maybe<GQLResolversTypes['MetaImage']>, ParentType, ContextType>;
  resourceTypes?: Resolver<Array<GQLResolversTypes['ResourceType']>, ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLMovieMetaResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['MovieMeta'] = GQLResolversParentTypes['MovieMeta']> = {
  metaDescription?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  metaImage?: Resolver<Maybe<GQLResolversTypes['MetaImage']>, ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
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
  copyLearningpath?: Resolver<GQLResolversTypes['MyNdlaLearningpath'], ParentType, ContextType, RequireFields<GQLMutationCopyLearningpathArgs, 'learningpathId' | 'params'>>;
  copySharedFolder?: Resolver<GQLResolversTypes['Folder'], ParentType, ContextType, RequireFields<GQLMutationCopySharedFolderArgs, 'folderId'>>;
  deleteFolder?: Resolver<GQLResolversTypes['String'], ParentType, ContextType, RequireFields<GQLMutationDeleteFolderArgs, 'id'>>;
  deleteFolderResource?: Resolver<GQLResolversTypes['String'], ParentType, ContextType, RequireFields<GQLMutationDeleteFolderResourceArgs, 'folderId' | 'resourceId'>>;
  deleteLearningpath?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<GQLMutationDeleteLearningpathArgs, 'id'>>;
  deleteLearningpathStep?: Resolver<Maybe<Array<GQLResolversTypes['String']>>, ParentType, ContextType, RequireFields<GQLMutationDeleteLearningpathStepArgs, 'learningpathId' | 'learningstepId'>>;
  deletePersonalData?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
  favoriteSharedFolder?: Resolver<GQLResolversTypes['String'], ParentType, ContextType, RequireFields<GQLMutationFavoriteSharedFolderArgs, 'folderId'>>;
  newLearningpath?: Resolver<GQLResolversTypes['MyNdlaLearningpath'], ParentType, ContextType, RequireFields<GQLMutationNewLearningpathArgs, 'params'>>;
  newLearningpathStep?: Resolver<GQLResolversTypes['MyNdlaLearningpathStep'], ParentType, ContextType, RequireFields<GQLMutationNewLearningpathStepArgs, 'learningpathId' | 'params'>>;
  sortFolders?: Resolver<GQLResolversTypes['SortResult'], ParentType, ContextType, RequireFields<GQLMutationSortFoldersArgs, 'sortedIds'>>;
  sortResources?: Resolver<GQLResolversTypes['SortResult'], ParentType, ContextType, RequireFields<GQLMutationSortResourcesArgs, 'parentId' | 'sortedIds'>>;
  sortSavedSharedFolders?: Resolver<GQLResolversTypes['SortResult'], ParentType, ContextType, RequireFields<GQLMutationSortSavedSharedFoldersArgs, 'sortedIds'>>;
  transformArticleContent?: Resolver<GQLResolversTypes['String'], ParentType, ContextType, RequireFields<GQLMutationTransformArticleContentArgs, 'content'>>;
  unFavoriteSharedFolder?: Resolver<GQLResolversTypes['String'], ParentType, ContextType, RequireFields<GQLMutationUnFavoriteSharedFolderArgs, 'folderId'>>;
  updateFolder?: Resolver<GQLResolversTypes['Folder'], ParentType, ContextType, RequireFields<GQLMutationUpdateFolderArgs, 'id'>>;
  updateFolderResource?: Resolver<GQLResolversTypes['FolderResource'], ParentType, ContextType, RequireFields<GQLMutationUpdateFolderResourceArgs, 'id'>>;
  updateFolderStatus?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType, RequireFields<GQLMutationUpdateFolderStatusArgs, 'folderId' | 'status'>>;
  updateLearningpath?: Resolver<GQLResolversTypes['MyNdlaLearningpath'], ParentType, ContextType, RequireFields<GQLMutationUpdateLearningpathArgs, 'learningpathId' | 'params'>>;
  updateLearningpathStatus?: Resolver<GQLResolversTypes['MyNdlaLearningpath'], ParentType, ContextType, RequireFields<GQLMutationUpdateLearningpathStatusArgs, 'id' | 'status'>>;
  updateLearningpathStep?: Resolver<GQLResolversTypes['MyNdlaLearningpathStep'], ParentType, ContextType, RequireFields<GQLMutationUpdateLearningpathStepArgs, 'learningpathId' | 'learningstepId' | 'params'>>;
  updateLearningpathStepSeqNo?: Resolver<GQLResolversTypes['LearningpathSeqNo'], ParentType, ContextType, RequireFields<GQLMutationUpdateLearningpathStepSeqNoArgs, 'learningpathId' | 'learningpathStepId' | 'seqNo'>>;
  updatePersonalData?: Resolver<GQLResolversTypes['MyNdlaPersonalData'], ParentType, ContextType, Partial<GQLMutationUpdatePersonalDataArgs>>;
};

export type GQLMyNdlaGroupResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['MyNdlaGroup'] = GQLResolversParentTypes['MyNdlaGroup']> = {
  displayName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  isPrimarySchool?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
  parentId?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLMyNdlaLearningpathResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['MyNdlaLearningpath'] = GQLResolversParentTypes['MyNdlaLearningpath']> = {
  canEdit?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
  copyright?: Resolver<GQLResolversTypes['LearningpathCopyright'], ParentType, ContextType>;
  coverphoto?: Resolver<Maybe<GQLResolversTypes['LearningpathCoverphoto']>, ParentType, ContextType>;
  created?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  duration?: Resolver<Maybe<GQLResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  isBasedOn?: Resolver<Maybe<GQLResolversTypes['Int']>, ParentType, ContextType>;
  isMyNDLAOwner?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
  lastUpdated?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  learningstepUrl?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  learningsteps?: Resolver<Array<GQLResolversTypes['MyNdlaLearningpathStep']>, ParentType, ContextType>;
  madeAvailable?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  metaUrl?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  revision?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  supportedLanguages?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  tags?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  verificationStatus?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLMyNdlaLearningpathStepResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['MyNdlaLearningpathStep'] = GQLResolversParentTypes['MyNdlaLearningpathStep']> = {
  description?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  embedUrl?: Resolver<Maybe<GQLResolversTypes['LearningpathStepEmbedUrl']>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  introduction?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  license?: Resolver<Maybe<GQLResolversTypes['License']>, ParentType, ContextType>;
  metaUrl?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  oembed?: Resolver<Maybe<GQLResolversTypes['LearningpathStepOembed']>, ParentType, ContextType>;
  opengraph?: Resolver<Maybe<GQLResolversTypes['ExternalOpengraph']>, ParentType, ContextType>;
  resource?: Resolver<Maybe<GQLResolversTypes['Resource']>, ParentType, ContextType, Partial<GQLMyNdlaLearningpathStepResourceArgs>>;
  revision?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  seqNo?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  showTitle?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
  status?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  supportedLanguages?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLMyNdlaPersonalDataResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['MyNdlaPersonalData'] = GQLResolversParentTypes['MyNdlaPersonalData']> = {
  arenaAccepted?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
  arenaEnabled?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
  displayName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  favoriteSubjects?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  feideId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  groups?: Resolver<Array<GQLResolversTypes['MyNdlaGroup']>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  organization?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<GQLResolversTypes['UserRole'], ParentType, ContextType>;
  shareNameAccepted?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
  username?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
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

export type GQLNodeResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Node'] = GQLResolversParentTypes['Node']> = {
  alternateNodes?: Resolver<Maybe<Array<GQLResolversTypes['Node']>>, ParentType, ContextType>;
  article?: Resolver<Maybe<GQLResolversTypes['Article']>, ParentType, ContextType>;
  availability?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  breadcrumbs?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  children?: Resolver<Maybe<Array<GQLResolversTypes['Node']>>, ParentType, ContextType, Partial<GQLNodeChildrenArgs>>;
  connectionId?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  contentUri?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  context?: Resolver<Maybe<GQLResolversTypes['TaxonomyContext']>, ParentType, ContextType>;
  contextId?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  contexts?: Resolver<Array<GQLResolversTypes['TaxonomyContext']>, ParentType, ContextType>;
  grepCodes?: Resolver<Maybe<Array<GQLResolversTypes['String']>>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  language?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  learningpath?: Resolver<Maybe<GQLResolversTypes['Learningpath']>, ParentType, ContextType>;
  meta?: Resolver<Maybe<GQLResolversTypes['Meta']>, ParentType, ContextType>;
  metadata?: Resolver<GQLResolversTypes['TaxonomyMetadata'], ParentType, ContextType>;
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  nodeType?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  parentId?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  rank?: Resolver<Maybe<GQLResolversTypes['Int']>, ParentType, ContextType>;
  relevanceId?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  resourceTypes?: Resolver<Maybe<Array<GQLResolversTypes['ResourceType']>>, ParentType, ContextType>;
  subjectpage?: Resolver<Maybe<GQLResolversTypes['SubjectPage']>, ParentType, ContextType>;
  supportedLanguages?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLNodeSearchResultResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['NodeSearchResult'] = GQLResolversParentTypes['NodeSearchResult']> = {
  context?: Resolver<Maybe<GQLResolversTypes['SearchContext']>, ParentType, ContextType>;
  contexts?: Resolver<Array<GQLResolversTypes['SearchContext']>, ParentType, ContextType>;
  htmlTitle?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  metaDescription?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  metaImage?: Resolver<Maybe<GQLResolversTypes['MetaImage']>, ParentType, ContextType>;
  supportedLanguages?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLOwnerResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Owner'] = GQLResolversParentTypes['Owner']> = {
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
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
  contextId?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  desktopImage?: Resolver<Maybe<GQLResolversTypes['MetaImage']>, ParentType, ContextType>;
  grades?: Resolver<Maybe<Array<GQLResolversTypes['Grade']>>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  metaDescription?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  mobileImage?: Resolver<Maybe<GQLResolversTypes['MetaImage']>, ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['Title'], ParentType, ContextType>;
  url?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLQueryResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Query'] = GQLResolversParentTypes['Query']> = {
  aiEnabledOrgs?: Resolver<Maybe<GQLResolversTypes['ConfigMetaStringList']>, ParentType, ContextType>;
  alerts?: Resolver<Maybe<Array<Maybe<GQLResolversTypes['UptimeAlert']>>>, ParentType, ContextType>;
  allFolderResources?: Resolver<Array<GQLResolversTypes['FolderResource']>, ParentType, ContextType, Partial<GQLQueryAllFolderResourcesArgs>>;
  arenaEnabledOrgs?: Resolver<Maybe<GQLResolversTypes['ConfigMetaStringList']>, ParentType, ContextType>;
  article?: Resolver<Maybe<GQLResolversTypes['Article']>, ParentType, ContextType, RequireFields<GQLQueryArticleArgs, 'id'>>;
  articleResource?: Resolver<Maybe<GQLResolversTypes['Resource']>, ParentType, ContextType, Partial<GQLQueryArticleResourceArgs>>;
  audio?: Resolver<Maybe<GQLResolversTypes['Audio']>, ParentType, ContextType, RequireFields<GQLQueryAudioArgs, 'id'>>;
  competenceGoal?: Resolver<Maybe<GQLResolversTypes['CompetenceGoal']>, ParentType, ContextType, RequireFields<GQLQueryCompetenceGoalArgs, 'code'>>;
  competenceGoals?: Resolver<Maybe<Array<GQLResolversTypes['CompetenceGoal']>>, ParentType, ContextType, Partial<GQLQueryCompetenceGoalsArgs>>;
  coreElement?: Resolver<Maybe<GQLResolversTypes['CoreElement']>, ParentType, ContextType, RequireFields<GQLQueryCoreElementArgs, 'code'>>;
  coreElements?: Resolver<Maybe<Array<GQLResolversTypes['CoreElement']>>, ParentType, ContextType, Partial<GQLQueryCoreElementsArgs>>;
  examLockStatus?: Resolver<GQLResolversTypes['ConfigMetaBoolean'], ParentType, ContextType>;
  filmfrontpage?: Resolver<Maybe<GQLResolversTypes['FilmFrontpage']>, ParentType, ContextType>;
  folder?: Resolver<GQLResolversTypes['Folder'], ParentType, ContextType, RequireFields<GQLQueryFolderArgs, 'id'>>;
  folderResourceMeta?: Resolver<Maybe<GQLResolversTypes['FolderResourceMeta']>, ParentType, ContextType, RequireFields<GQLQueryFolderResourceMetaArgs, 'resource'>>;
  folderResourceMetaSearch?: Resolver<Array<GQLResolversTypes['FolderResourceMeta']>, ParentType, ContextType, RequireFields<GQLQueryFolderResourceMetaSearchArgs, 'resources'>>;
  folders?: Resolver<GQLResolversTypes['UserFolder'], ParentType, ContextType, Partial<GQLQueryFoldersArgs>>;
  frontpage?: Resolver<Maybe<GQLResolversTypes['FrontpageMenu']>, ParentType, ContextType>;
  groupSearch?: Resolver<Maybe<Array<GQLResolversTypes['GroupSearch']>>, ParentType, ContextType, Partial<GQLQueryGroupSearchArgs>>;
  image?: Resolver<Maybe<GQLResolversTypes['ImageMetaInformationV2']>, ParentType, ContextType, RequireFields<GQLQueryImageArgs, 'id'>>;
  imageSearch?: Resolver<GQLResolversTypes['ImageSearch'], ParentType, ContextType, Partial<GQLQueryImageSearchArgs>>;
  imageV3?: Resolver<Maybe<GQLResolversTypes['ImageMetaInformationV3']>, ParentType, ContextType, RequireFields<GQLQueryImageV3Args, 'id'>>;
  learningpath?: Resolver<Maybe<GQLResolversTypes['Learningpath']>, ParentType, ContextType, RequireFields<GQLQueryLearningpathArgs, 'pathId'>>;
  learningpathStepOembed?: Resolver<GQLResolversTypes['LearningpathStepOembed'], ParentType, ContextType, RequireFields<GQLQueryLearningpathStepOembedArgs, 'url'>>;
  myLearningpaths?: Resolver<Maybe<Array<GQLResolversTypes['MyNdlaLearningpath']>>, ParentType, ContextType>;
  myNdlaLearningpath?: Resolver<Maybe<GQLResolversTypes['MyNdlaLearningpath']>, ParentType, ContextType, RequireFields<GQLQueryMyNdlaLearningpathArgs, 'pathId'>>;
  node?: Resolver<Maybe<GQLResolversTypes['Node']>, ParentType, ContextType, Partial<GQLQueryNodeArgs>>;
  nodeByArticleId?: Resolver<Maybe<GQLResolversTypes['Node']>, ParentType, ContextType, Partial<GQLQueryNodeByArticleIdArgs>>;
  nodes?: Resolver<Maybe<Array<GQLResolversTypes['Node']>>, ParentType, ContextType, Partial<GQLQueryNodesArgs>>;
  opengraph?: Resolver<Maybe<GQLResolversTypes['ExternalOpengraph']>, ParentType, ContextType, RequireFields<GQLQueryOpengraphArgs, 'url'>>;
  personalData?: Resolver<Maybe<GQLResolversTypes['MyNdlaPersonalData']>, ParentType, ContextType>;
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
  subjectCollection?: Resolver<Maybe<Array<GQLResolversTypes['Subject']>>, ParentType, ContextType, RequireFields<GQLQuerySubjectCollectionArgs, 'language'>>;
  subjectpage?: Resolver<Maybe<GQLResolversTypes['SubjectPage']>, ParentType, ContextType, RequireFields<GQLQuerySubjectpageArgs, 'id'>>;
  subjects?: Resolver<Maybe<Array<GQLResolversTypes['Subject']>>, ParentType, ContextType, Partial<GQLQuerySubjectsArgs>>;
  topic?: Resolver<Maybe<GQLResolversTypes['Topic']>, ParentType, ContextType, RequireFields<GQLQueryTopicArgs, 'id'>>;
  topics?: Resolver<Maybe<Array<GQLResolversTypes['Topic']>>, ParentType, ContextType, RequireFields<GQLQueryTopicsArgs, 'contentUri'>>;
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
  article?: Resolver<Maybe<GQLResolversTypes['Article']>, ParentType, ContextType>;
  availability?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  breadcrumbs?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  contentUri?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  context?: Resolver<Maybe<GQLResolversTypes['TaxonomyContext']>, ParentType, ContextType>;
  contextId?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  contexts?: Resolver<Array<GQLResolversTypes['TaxonomyContext']>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  language?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  learningpath?: Resolver<Maybe<GQLResolversTypes['Learningpath']>, ParentType, ContextType>;
  meta?: Resolver<Maybe<GQLResolversTypes['Meta']>, ParentType, ContextType>;
  metadata?: Resolver<GQLResolversTypes['TaxonomyMetadata'], ParentType, ContextType>;
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  nodeType?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  parents?: Resolver<Maybe<Array<GQLResolversTypes['Topic']>>, ParentType, ContextType>;
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
  glosses?: Resolver<Maybe<Array<GQLResolversTypes['GlossLicense']>>, ParentType, ContextType>;
  h5ps?: Resolver<Maybe<Array<GQLResolversTypes['H5pLicense']>>, ParentType, ContextType>;
  images?: Resolver<Maybe<Array<GQLResolversTypes['ImageLicense']>>, ParentType, ContextType>;
  podcasts?: Resolver<Maybe<Array<GQLResolversTypes['PodcastLicense']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLResourceTypeResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['ResourceType'] = GQLResolversParentTypes['ResourceType']> = {
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
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
  isActive?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
  isPrimary?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
  language?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  path?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  publicId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  relevance?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  relevanceId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  resourceTypes?: Resolver<Array<GQLResolversTypes['SearchContextResourceTypes']>, ParentType, ContextType>;
  root?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  rootId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLSearchContextResourceTypesResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['SearchContextResourceTypes'] = GQLResolversParentTypes['SearchContextResourceTypes']> = {
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  language?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLSearchResultResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['SearchResult'] = GQLResolversParentTypes['SearchResult']> = {
  __resolveType: TypeResolveFn<'ArticleSearchResult' | 'LearningpathSearchResult' | 'NodeSearchResult', ParentType, ContextType>;
  context?: Resolver<Maybe<GQLResolversTypes['SearchContext']>, ParentType, ContextType>;
  contexts?: Resolver<Array<GQLResolversTypes['SearchContext']>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  metaDescription?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  supportedLanguages?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
};

export type GQLSearchResultUnionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['SearchResultUnion'] = GQLResolversParentTypes['SearchResultUnion']> = {
  __resolveType: TypeResolveFn<'ArticleSearchResult' | 'LearningpathSearchResult' | 'NodeSearchResult', ParentType, ContextType>;
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
  owner?: Resolver<Maybe<GQLResolversTypes['Owner']>, ParentType, ContextType>;
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
  context?: Resolver<Maybe<GQLResolversTypes['TaxonomyContext']>, ParentType, ContextType>;
  contextId?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  contexts?: Resolver<Array<GQLResolversTypes['TaxonomyContext']>, ParentType, ContextType>;
  grepCodes?: Resolver<Maybe<Array<GQLResolversTypes['String']>>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  language?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  metadata?: Resolver<GQLResolversTypes['TaxonomyMetadata'], ParentType, ContextType>;
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  nodeType?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
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
  url?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
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
  imageLicense?: Resolver<Maybe<GQLResolversTypes['ImageLicense']>, ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
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

export type GQLTaxBaseResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['TaxBase'] = GQLResolversParentTypes['TaxBase']> = {
  __resolveType: TypeResolveFn<'Node' | 'Resource' | 'Subject' | 'TaxonomyCrumb' | 'Topic', ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
};

export type GQLTaxonomyContextResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['TaxonomyContext'] = GQLResolversParentTypes['TaxonomyContext']> = {
  breadcrumbs?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  contextId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  isActive?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  parentIds?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  parents?: Resolver<Maybe<Array<GQLResolversTypes['TaxonomyCrumb']>>, ParentType, ContextType>;
  relevance?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  root?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  rootId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLTaxonomyCrumbResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['TaxonomyCrumb'] = GQLResolversParentTypes['TaxonomyCrumb']> = {
  contextId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLTaxonomyEntityResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['TaxonomyEntity'] = GQLResolversParentTypes['TaxonomyEntity']> = {
  __resolveType: TypeResolveFn<'Node' | 'Resource' | 'Subject' | 'Topic', ParentType, ContextType>;
  breadcrumbs?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  contentUri?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  context?: Resolver<Maybe<GQLResolversTypes['TaxonomyContext']>, ParentType, ContextType>;
  contextId?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  contexts?: Resolver<Array<GQLResolversTypes['TaxonomyContext']>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  language?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  metadata?: Resolver<GQLResolversTypes['TaxonomyMetadata'], ParentType, ContextType>;
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  nodeType?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
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

export type GQLTextblockLicenseResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['TextblockLicense'] = GQLResolversParentTypes['TextblockLicense']> = {
  copyright?: Resolver<GQLResolversTypes['Copyright'], ParentType, ContextType>;
  title?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLTitleResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Title'] = GQLResolversParentTypes['Title']> = {
  language?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLTopicResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Topic'] = GQLResolversParentTypes['Topic']> = {
  alternateTopics?: Resolver<Maybe<Array<GQLResolversTypes['Topic']>>, ParentType, ContextType>;
  article?: Resolver<Maybe<GQLResolversTypes['Article']>, ParentType, ContextType>;
  availability?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  breadcrumbs?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  contentUri?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  context?: Resolver<Maybe<GQLResolversTypes['TaxonomyContext']>, ParentType, ContextType>;
  contextId?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  contexts?: Resolver<Array<GQLResolversTypes['TaxonomyContext']>, ParentType, ContextType>;
  coreResources?: Resolver<Maybe<Array<GQLResolversTypes['Resource']>>, ParentType, ContextType, Partial<GQLTopicCoreResourcesArgs>>;
  id?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  isPrimary?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>;
  language?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  meta?: Resolver<Maybe<GQLResolversTypes['Meta']>, ParentType, ContextType>;
  metadata?: Resolver<GQLResolversTypes['TaxonomyMetadata'], ParentType, ContextType>;
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  nodeType?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  parentId?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
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

export type GQLTransformedArticleContentResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['TransformedArticleContent'] = GQLResolversParentTypes['TransformedArticleContent']> = {
  content?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  metaData?: Resolver<Maybe<GQLResolversTypes['ArticleMetaData']>, ParentType, ContextType>;
  visualElement?: Resolver<Maybe<GQLResolversTypes['VisualElement']>, ParentType, ContextType>;
  visualElementEmbed?: Resolver<Maybe<GQLResolversTypes['ResourceEmbed']>, ParentType, ContextType>;
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

export type GQLUserFolderResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['UserFolder'] = GQLResolversParentTypes['UserFolder']> = {
  folders?: Resolver<Array<GQLResolversTypes['Folder']>, ParentType, ContextType>;
  sharedFolders?: Resolver<Array<GQLResolversTypes['SharedFolder']>, ParentType, ContextType>;
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
  __resolveType: TypeResolveFn<'Node' | 'Resource' | 'Topic', ParentType, ContextType>;
  article?: Resolver<Maybe<GQLResolversTypes['Article']>, ParentType, ContextType>;
  availability?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  contentUri?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
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
  CategoryBreadcrumb?: GQLCategoryBreadcrumbResolvers<ContextType>;
  CompetenceGoal?: GQLCompetenceGoalResolvers<ContextType>;
  Concept?: GQLConceptResolvers<ContextType>;
  ConceptCopyright?: GQLConceptCopyrightResolvers<ContextType>;
  ConceptFolderResourceMeta?: GQLConceptFolderResourceMetaResolvers<ContextType>;
  ConceptLicense?: GQLConceptLicenseResolvers<ContextType>;
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
  ExternalOpengraph?: GQLExternalOpengraphResolvers<ContextType>;
  FilmFrontpage?: GQLFilmFrontpageResolvers<ContextType>;
  FilmPageAbout?: GQLFilmPageAboutResolvers<ContextType>;
  Folder?: GQLFolderResolvers<ContextType>;
  FolderResource?: GQLFolderResourceResolvers<ContextType>;
  FolderResourceMeta?: GQLFolderResourceMetaResolvers<ContextType>;
  FolderResourceResourceType?: GQLFolderResourceResourceTypeResolvers<ContextType>;
  FootNote?: GQLFootNoteResolvers<ContextType>;
  FrontpageMenu?: GQLFrontpageMenuResolvers<ContextType>;
  Gloss?: GQLGlossResolvers<ContextType>;
  GlossLicense?: GQLGlossLicenseResolvers<ContextType>;
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
  ImageMetaInformationV3?: GQLImageMetaInformationV3Resolvers<ContextType>;
  ImageSearch?: GQLImageSearchResolvers<ContextType>;
  ImageV3?: GQLImageV3Resolvers<ContextType>;
  Learningpath?: GQLLearningpathResolvers<ContextType>;
  LearningpathCopyright?: GQLLearningpathCopyrightResolvers<ContextType>;
  LearningpathCoverphoto?: GQLLearningpathCoverphotoResolvers<ContextType>;
  LearningpathFolderResourceMeta?: GQLLearningpathFolderResourceMetaResolvers<ContextType>;
  LearningpathSearchResult?: GQLLearningpathSearchResultResolvers<ContextType>;
  LearningpathSeqNo?: GQLLearningpathSeqNoResolvers<ContextType>;
  LearningpathStep?: GQLLearningpathStepResolvers<ContextType>;
  LearningpathStepEmbedUrl?: GQLLearningpathStepEmbedUrlResolvers<ContextType>;
  LearningpathStepOembed?: GQLLearningpathStepOembedResolvers<ContextType>;
  License?: GQLLicenseResolvers<ContextType>;
  Manuscript?: GQLManuscriptResolvers<ContextType>;
  Meta?: GQLMetaResolvers<ContextType>;
  MetaImage?: GQLMetaImageResolvers<ContextType>;
  MetaImageWithCopyright?: GQLMetaImageWithCopyrightResolvers<ContextType>;
  Movie?: GQLMovieResolvers<ContextType>;
  MovieMeta?: GQLMovieMetaResolvers<ContextType>;
  MovieResourceTypes?: GQLMovieResourceTypesResolvers<ContextType>;
  MovieTheme?: GQLMovieThemeResolvers<ContextType>;
  Mutation?: GQLMutationResolvers<ContextType>;
  MyNdlaGroup?: GQLMyNdlaGroupResolvers<ContextType>;
  MyNdlaLearningpath?: GQLMyNdlaLearningpathResolvers<ContextType>;
  MyNdlaLearningpathStep?: GQLMyNdlaLearningpathStepResolvers<ContextType>;
  MyNdlaPersonalData?: GQLMyNdlaPersonalDataResolvers<ContextType>;
  Name?: GQLNameResolvers<ContextType>;
  NewFolder?: GQLNewFolderResolvers<ContextType>;
  NewFolderResource?: GQLNewFolderResourceResolvers<ContextType>;
  Node?: GQLNodeResolvers<ContextType>;
  NodeSearchResult?: GQLNodeSearchResultResolvers<ContextType>;
  Owner?: GQLOwnerResolvers<ContextType>;
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
  SearchContextResourceTypes?: GQLSearchContextResourceTypesResolvers<ContextType>;
  SearchResult?: GQLSearchResultResolvers<ContextType>;
  SearchResultUnion?: GQLSearchResultUnionResolvers<ContextType>;
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
  TaxBase?: GQLTaxBaseResolvers<ContextType>;
  TaxonomyContext?: GQLTaxonomyContextResolvers<ContextType>;
  TaxonomyCrumb?: GQLTaxonomyCrumbResolvers<ContextType>;
  TaxonomyEntity?: GQLTaxonomyEntityResolvers<ContextType>;
  TaxonomyMetadata?: GQLTaxonomyMetadataResolvers<ContextType>;
  TextblockLicense?: GQLTextblockLicenseResolvers<ContextType>;
  Title?: GQLTitleResolvers<ContextType>;
  Topic?: GQLTopicResolvers<ContextType>;
  Transcription?: GQLTranscriptionResolvers<ContextType>;
  TransformedArticleContent?: GQLTransformedArticleContentResolvers<ContextType>;
  UpdatedFolder?: GQLUpdatedFolderResolvers<ContextType>;
  UpdatedFolderResource?: GQLUpdatedFolderResourceResolvers<ContextType>;
  UptimeAlert?: GQLUptimeAlertResolvers<ContextType>;
  UserFolder?: GQLUserFolderResolvers<ContextType>;
  VideoFolderResourceMeta?: GQLVideoFolderResourceMetaResolvers<ContextType>;
  VisualElement?: GQLVisualElementResolvers<ContextType>;
  VisualElementOembed?: GQLVisualElementOembedResolvers<ContextType>;
  WithArticle?: GQLWithArticleResolvers<ContextType>;
};

