import DataLoader from 'dataloader';
import { RequestInit, RequestCache } from 'node-fetch';

declare global {
  interface AuthToken {
    access_token: string;
    expires_in?: number;
    token_type?: string;
  }

  interface Context {
    token: AuthToken;
    language: string;
    loaders?: {
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
    };
  }

  interface RequestOptions extends RequestInit {
    cache?: RequestCache;
  }
}
