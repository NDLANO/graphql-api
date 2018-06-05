/**
 * This file is auto-generated by graphql-schema-typescript
 * Please note that any changes in this file may be overwritten
 */
export {};

declare global {
  /*******************************
   *                             *
   *          TYPE DEFS          *
   *                             *
   *******************************/
  export interface GQLQuery {
    resource?: GQLResource;
    article?: GQLArticle;
    subject?: GQLSubject;
    subjects?: (GQLSubject | null)[];
    topic?: GQLTopic;
    topics?: (GQLTopic | null)[];
    frontpage?: GQLFrontpage;
    filters?: (GQLFilter | null)[];
    resourceTypes?: (GQLResourceTypeDefinition | null)[];
  }

  export interface GQLResource {
    id: string;
    name: string;
    contentUri?: string;
    path?: string;
    resourceTypes?: (GQLResourceType | null)[];
    meta?: GQLMeta;
    article?: GQLArticle;
  }

  export interface GQLResourceType {
    id: string;
    name: string;
    resources?: (GQLResource | null)[];
  }

  export interface GQLMeta {
    id: number;
    title: string;
    introduction?: string;
    metaDescription?: string;
    metaImage?: string;
    lastUpdated?: string;
  }

  export interface GQLArticle {
    id: number;
    revision: number;
    title: string;
    introduction?: string;
    content: string;
    created: string;
    updated: string;
    visualElement?: string;
    metaImage?: string;
    metaDescription: string;
    articleType: string;
    oldNdlaUrl?: string;
    requiredLibraries?: (GQLArticleRequiredLibrary | null)[];
    metaData?: GQLArticleMetaData;
    supportedLanguages?: (string | null)[];
    copyright: GQLCopyright;
  }

  export interface GQLArticleRequiredLibrary {
    name: string;
    url: string;
    mediaType: string;
  }

  export interface GQLArticleMetaData {
    footnotes?: (GQLFootNote | null)[];
    images?: (GQLImageLicense | null)[];
    audios?: (GQLAudioLicense | null)[];
    brightcoves?: (GQLBrightcoveLicense | null)[];
  }

  export interface GQLFootNote {
    ref: number;
    title: string;
    year: string;
    authors: (string | null)[];
    edition?: string;
    publisher?: string;
    url?: string;
  }

  export interface GQLImageLicense {
    title: string;
    src: string;
    altText: string;
    copyright: GQLCopyright;
  }

  export interface GQLCopyright {
    license?: GQLLicense;
    creators?: (GQLContributor | null)[];
    processors?: (GQLContributor | null)[];
    rightsholders?: (GQLContributor | null)[];
  }

  export interface GQLLicense {
    license: string;
    url?: string;
    description?: string;
  }

  export interface GQLContributor {
    type: string;
    name: string;
  }

  export interface GQLAudioLicense {
    title: string;
    src: string;
    copyright: GQLCopyright;
  }

  export interface GQLBrightcoveLicense {
    title: string;
    cover?: string;
    src?: string;
    iframe?: GQLBrightcoveIframe;
    copyright: GQLCopyright;
  }

  export interface GQLBrightcoveIframe {
    src: string;
    height: number;
    width: number;
  }

  export interface GQLSubject {
    id: string;
    contentUri?: string;
    name: string;
    path: string;
    filters?: (GQLFilter | null)[];
    subjectpage?: GQLSubjectPage;
    topics?: (GQLTopic | null)[];
  }

  export interface GQLFilter {
    id: string;
    name: string;
    subjectId: string;
  }

  export interface GQLSubjectPage {
    topical?: GQLSubjectPageTopical;
    mostRead?: GQLSubjectPageArticles;
    banner?: string;
    id: number;
    facebook?: string;
    editorsChoices?: GQLSubjectPageArticles;
    latestContent?: GQLSubjectPageArticles;
    subjectListLocation?: string;
    twitter?: string;
  }

  export interface GQLSubjectPageTopical {
    location?: string;
    resource?: GQLResource;
  }

  export interface GQLSubjectPageArticles {
    location?: string;
    resources?: (GQLResource | null)[];
  }

  export interface GQLTopic {
    id: string;
    contentUri?: string;
    name: string;
    path: string;
    parent?: string;
    article?: GQLArticle;
    meta?: GQLMeta;
    subtopics?: (GQLTopic | null)[];
    filters?: (GQLFilter | null)[];
    coreResources?: (GQLResource | null)[];
    supplementaryResources?: (GQLResource | null)[];
  }

  export interface GQLFrontpage {
    topical?: (GQLResource | null)[];
    categories?: (GQLFrontpageSubjects | null)[];
  }

  export interface GQLFrontpageSubjects {
    name?: string;
    subjects?: (GQLSubject | null)[];
  }

  export interface GQLResourceTypeDefinition {
    id: string;
    name: string;
    subtypes?: (GQLResourceTypeDefinition | null)[];
  }

  /*********************************
   *                               *
   *         TYPE RESOLVERS        *
   *                               *
   *********************************/
}
