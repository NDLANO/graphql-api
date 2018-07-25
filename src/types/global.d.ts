import DataLoader from 'dataloader';

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
