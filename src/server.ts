/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import express, { Request, Response } from 'express';
import compression from 'compression';
import { ApolloServer } from 'apollo-server-express';
import { isString } from 'lodash';
import { port } from './config';
import logger from './utils/logger';
import { typeDefs } from './schema';
import { getToken } from './auth';
import {
  filterLoader,
  articlesLoader,
  subjectTopicsLoader,
  resourceTypesLoader,
  learningpathsLoader,
  subjectsLoader,
  frontpageLoader,
  lk06CurriculumLoader,
  lk20CurriculumLoader,
} from './loaders';
import { resolvers } from './resolvers';

const GRAPHQL_PORT = port;

const app = express();

// compress all responses
app.use(compression());

function getAcceptLanguage(request: Request): string {
  const language = request.headers['accept-language'];

  if (isString(language)) {
    return language.split('-')[0];
  }
  return 'nb';
}

function getFeideAuthorization(request: Request): string | null {
  // tslint:disable-next-line:no-string-literal
  const authorization = request.headers['feideauthorization'];

  if (isString(authorization)) {
    return authorization;
  }
  return null;
}

function getShouldUseCache(request: Request): boolean {
  const cacheControl = request.headers['cache-control']?.toLowerCase();
  const feideAuthHeader = getFeideAuthorization(request);
  const disableCacheHeaders = ['no-cache', 'no-store'];

  const cacheControlDisable = disableCacheHeaders.includes(cacheControl);
  const feideHeaderPresent = !!feideAuthHeader;

  return !cacheControlDisable && !feideHeaderPresent;
}

const getTaxonomyUrl = (request: Request): string => {
  const taxonomyUrl = request.headers['use-taxonomy2'];
  return taxonomyUrl === 'true' ? 'taxonomy2' : 'taxonomy';
};

async function getContext({
  req,
  res,
}: {
  req: Request;
  res: Response;
}): Promise<Context> {
  const token = await getToken(req);
  const feideAuthorization = getFeideAuthorization(req);

  const language = getAcceptLanguage(req);
  const shouldUseCache = getShouldUseCache(req);
  const taxonomyUrl = getTaxonomyUrl(req);
  const defaultContext = {
    language,
    token,
    feideAuthorization,
    shouldUseCache,
    taxonomyUrl,
    req,
    res,
  };

  return {
    ...defaultContext,
    loaders: {
      articlesLoader: articlesLoader(defaultContext),
      filterLoader: filterLoader(defaultContext),
      subjectTopicsLoader: subjectTopicsLoader(defaultContext),
      learningpathsLoader: learningpathsLoader(defaultContext),
      resourceTypesLoader: resourceTypesLoader(defaultContext),
      subjectsLoader: subjectsLoader(defaultContext),
      frontpageLoader: frontpageLoader(defaultContext),
      lk06CurriculumLoader: lk06CurriculumLoader(defaultContext),
      lk20CurriculumLoader: lk20CurriculumLoader(defaultContext),
    },
  };
}

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 200, text: 'Health check ok' });
});
async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    // @ts-ignore
    resolvers,
    debug: false, // log errors in formatError
    introspection: true,
    formatError(err: any) {
      logger.error(err);
      return {
        message: err.message,
        locations: err.locations,
        path: err.path,
        status: err.originalError && err.originalError.status,
        json: err.originalError && err.originalError.json,
      };
    },
    context: getContext,
  });
  await server.start();
  server.applyMiddleware({ app, path: '/graphql-api/graphql' });
}

startApolloServer();

app.listen(GRAPHQL_PORT, () =>
  // tslint:disable-next-line
  console.log(
    `GraphQL Playground is now running on http://localhost:${GRAPHQL_PORT}/graphql-api/graphql`,
  ),
);
