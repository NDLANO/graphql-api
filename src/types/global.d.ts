import DataLoader from 'dataloader';
import { RequestInit, RequestCache } from 'node-fetch';
import { FrontpageResponse } from '../api/frontpageApi';

declare global {
  interface AuthToken {
    access_token: string;
    expires_in?: number;
    token_type?: string;
  }

  interface Context {
    token?: AuthToken;
    language: string;
    shouldUseCache: boolean;
    taxonomyUrl: string;
    loaders?: {
      articlesLoader?: DataLoader<string, GQLMeta>;
      learningpathsLoader?: DataLoader<string, any>;
      filterLoader?: DataLoader<string, GQLSubjectFilter[]>;
      subjectTopicsLoader?: DataLoader<
        { subjectId: string; filterIds: string },
        any
      >;
      subjectsLoader?: DataLoader<string, { subjects: GQLSubject[] }>;
      resourceTypesLoader?: DataLoader<any, any>;
      frontpageLoader?: DataLoader<string, FrontpageResponse>;
      lk06CurriculumLoader?: DataLoader<string, GQLReference>;
      lk20CurriculumLoader?: DataLoader<
        { code: string; language: string },
        GQLReference
      >;
    };
  }

  interface RequestOptions extends RequestInit {
    cache?: RequestCache;
  }

  interface SearchResultJson {
    id: number;
    title: {
      title: string;
    };
    content?: {
      content: string;
    };
    metaDescription?: {
      metaDescription: string;
    };
    metaImage?: { url: string; alt: string };
    contexts?: Array<{
      id: string;
      path: string;
      subject: string;
      resourceTypes: Array<{ name: string }>;
    }>;
  }
}
