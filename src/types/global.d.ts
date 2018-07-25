import DataLoader from 'dataloader';
import { Request } from 'express';

declare global {
  interface AuthToken {
    access_token: string;
    expires_in?: number;
    token_type?: string;
  }

  interface Context {
    token: AuthToken;
    language: string;
    req?: Request;
    loaders?: {
      articlesLoader: DataLoader<string, any>;
      learningpathsLoader: DataLoader<string, any>;
      filterLoader: DataLoader<string, any>;
      subjectTopicsLoader: DataLoader<
        { subjectId: string; filterIds: string },
        any
      >;
      resourceTypesLoader: DataLoader<string, any>;
      resourcesLoader: DataLoader<string, any>;
    };
  }
}
