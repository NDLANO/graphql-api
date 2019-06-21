import DataLoader from 'dataloader';
import { RequestInit, RequestCache } from 'node-fetch';
import { FrontpageResponse } from '../api/frontpageApi';

declare global {
  interface AuthToken {
    access_token: string;
    expires_in?: number;
    token_type?: string;
  }

  interface Loaders {
    articlesLoader: DataLoader<string, any>;
    learningpathsLoader: DataLoader<string, any>;
    filterLoader: DataLoader<string, GQLSubjectFilter[]>;
    subjectTopicsLoader: DataLoader<
      { subjectId: string; filterIds: string },
      any
    >;
    subjectsLoader: DataLoader<string, { subjects: GQLSubject[] }>;
    resourceTypesLoader: DataLoader<any, any>;
    frontpageLoader: DataLoader<string, FrontpageResponse>;
    curriculumLoader: DataLoader<string, GQLCompetenceCurriculum>;
    [loaderName: string]: DataLoader<any, any>;
  }

  interface Context {
    token?: AuthToken;
    language: string;
    getLoader?(loaderName: string): DataLoader<any, any>;
    loaders?: Loaders;
  }

  interface RequestOptions extends RequestInit {
    cache?: RequestCache;
  }
}
