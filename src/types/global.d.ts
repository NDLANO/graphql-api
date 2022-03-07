import DataLoader from 'dataloader';
import { RequestInit, RequestCache } from 'node-fetch';
import { Request, Response } from 'express';
import { IFrontPageData } from '@ndla/types-frontpage-api';
import { Subject } from '../api/taxonomyApi';

declare global {
  interface AuthToken {
    access_token: string;
    expires_in?: number;
    token_type?: string;
  }

  interface Loaders {
    articlesLoader: DataLoader<string, GQLMeta>;
    learningpathsLoader: DataLoader<string, any>;
    subjectTopicsLoader: DataLoader<{ subjectId: string }, any>;
    subjectsLoader: DataLoader<
      { metadataFilter?: { key: string; value?: string }; visible: boolean },
      { subjects: GQLSubject[] }
    >;
    subjectLoader: DataLoader<
      {
        id?: string;
        visible?: boolean;
      },
      Subject
    >;
    resourceTypesLoader: DataLoader<any, any>;
    frontpageLoader: DataLoader<string, IFrontPageData>;
    lk06CurriculumLoader: DataLoader<string, GQLReference>;
    lk20CurriculumLoader: DataLoader<
      { code: string; language: string },
      GQLReference
    >;
  }

  interface Context {
    req: Request;
    res: Response;
    token?: AuthToken;
    feideAuthorization?: string;
    language: string;
    shouldUseCache: boolean;
    taxonomyUrl: string;
  }

  interface ContextWithLoaders extends Context {
    loaders: Loaders;
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
    tags?: {
      tags: string[];
    };
  }
}
