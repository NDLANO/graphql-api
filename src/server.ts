/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import compression from 'compression';
import cors from 'cors';
import express, { json, Request, Response } from 'express';

import isString from 'lodash/isString';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { getToken } from './auth';
import { port } from './config';
import {
  articlesLoader,
  subjectTopicsLoader,
  resourceTypesLoader,
  learningpathsLoader,
  subjectsLoader,
  frontpageLoader,
  lk20CurriculumLoader,
  subjectLoader,
  subjectpageLoader,
} from './loaders';
import { resolvers } from './resolvers';
import { typeDefs } from './schema';
import correlationIdMiddleware from './utils/correlationIdMiddleware';
import getLogger from './utils/logger';
import loggerMiddleware from './utils/loggerMiddleware';

const GRAPHQL_PORT = port;

const app = express();

// compress all responses
app.use(compression());
app.use(express.json({ limit: '1mb' }));

function getAcceptLanguage(request: Request): string {
  const language = request.headers['accept-language'];

  if (isString(language)) {
    return language.split('-')[0];
  }
  return 'nb';
}

function getHeaderString(request: Request, name: string): string | undefined {
  const header = request.headers[name];

  if (isString(header)) {
    return header;
  }
  return undefined;
}

function getFeideAuthorization(request: Request): string | undefined {
  return getHeaderString(request, 'feideauthorization');
}

function getVersionHash(request: Request): string | undefined {
  return getHeaderString(request, 'versionhash');
}

function getShouldUseCache(request: Request): boolean {
  const cacheControl = request.headers['cache-control']?.toLowerCase();
  const feideAuthHeader = getFeideAuthorization(request);
  const disableCacheHeaders = ['no-cache', 'no-store'];

  const cacheControlDisable = disableCacheHeaders.includes(cacheControl ?? '');
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
}): Promise<ContextWithLoaders> {
  const token = await getToken(req);
  const feideAuthorization = getFeideAuthorization(req);
  const versionHash = getVersionHash(req);

  const language = getAcceptLanguage(req);
  const shouldUseCache = getShouldUseCache(req);
  const taxonomyUrl = getTaxonomyUrl(req);
  const defaultContext = {
    language,
    token,
    feideAuthorization,
    versionHash,
    shouldUseCache,
    taxonomyUrl,
    req,
    res,
  };

  return {
    ...defaultContext,
    loaders: {
      articlesLoader: articlesLoader(defaultContext),
      subjectTopicsLoader: subjectTopicsLoader(defaultContext),
      learningpathsLoader: learningpathsLoader(defaultContext),
      resourceTypesLoader: resourceTypesLoader(defaultContext),
      subjectsLoader: subjectsLoader(defaultContext),
      subjectLoader: subjectLoader(defaultContext),
      frontpageLoader: frontpageLoader(defaultContext),
      subjectpageLoader: subjectpageLoader(defaultContext),
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
    resolvers,
    introspection: true,
    allowBatchedHttpRequests: true,
    formatError(err: any) {
      getLogger().error(err);
      return {
        message: err.message,
        locations: err.locations,
        path: err.path,
        extensions: err?.extensions,
      };
    },
  });
  await server.start();
  app.use(
    '/graphql-api/graphql',
    cors(),
    json(),
    correlationIdMiddleware,
    loggerMiddleware,
    expressMiddleware(server, { context: getContext }),
  );
}

startApolloServer();

app.listen(GRAPHQL_PORT, () =>
  // eslint-disable-next-line no-console
  console.log(
    `GraphQL Playground is now running on http://localhost:${GRAPHQL_PORT}/graphql-api/graphql`,
  ),
);
