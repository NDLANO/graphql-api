import DataLoader from 'dataloader';
import { RequestInit, RequestCache } from 'node-fetch';
import { Request, Response } from 'express';
import { IFrontPage } from '@ndla/types-backend/frontpage-api';
import { Node } from '../api/taxonomyApi';
import { GQLMeta, GQLReference, GQLSubject } from './schema';

declare global {
  interface AuthToken {
    access_token: string;
    expires_in?: number;
    token_type?: string;
  }

  interface Loaders {
    articlesLoader: DataLoader<string, GQLMeta | null>;
    learningpathsLoader: DataLoader<string, any>;
    subjectTopicsLoader: DataLoader<{ subjectId: string }, any>;
    subjectsLoader: DataLoader<
      {
        metadataFilter?: { key: string; value?: string };
        filterVisible: boolean;
      },
      { subjects: GQLSubject[] }
    >;
    subjectLoader: DataLoader<
      {
        id?: string;
      },
      Node
    >;
    resourceTypesLoader: DataLoader<any, any>;
    frontpageLoader: DataLoader<string, IFrontPage>;
    lk20CurriculumLoader: DataLoader<
      { code: string; language: string },
      GQLReference | undefined
    >;
  }

  interface Context {
    req: Request;
    res: Response;
    token?: AuthToken;
    feideAuthorization?: string;
    versionHash?: string;
    language: string;
    shouldUseCache: boolean;
    taxonomyUrl: string;
  }

  interface ContextWithLoaders extends Context {
    loaders: Loaders;
  }

  interface RequestOptions extends RequestInit {
    cache?: RequestCache;
    useTaxonomyCache?: boolean;
  }
}
