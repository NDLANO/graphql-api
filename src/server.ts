/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import express, { Request, Response } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { GraphQLOptions } from 'apollo-server-core';
import { isString } from 'lodash';
import cors from 'cors';
import bodyParser from 'body-parser';

import { getFromCacheIfAny, storeInCache, createLRUCache } from './middleware';
import { port } from './config';
import logger from './utils/logger';
import { typeDefs } from './schema';
import { getToken } from './auth';
import {
  filterLoader,
  articlesLoader,
  subjectTopicsLoader,
  resourcesLoader,
  resourceTypesLoader,
  learningpathsLoader,
} from './data/loaders';
import { resolvers } from './resolvers';

const GRAPHQL_PORT = port;

const app = express();

function getAcceptLanguage(request: Request): string {
  const language = request.headers['accept-language'];

  if (isString(language)) {
    return language;
  }
  return 'nb';
}

async function getContext({ req }: { req: Request }): Promise<Context> {
  const token = await getToken(req);
  const language = getAcceptLanguage(req);
  const defaultContext = { token, language };

  return {
    ...defaultContext,
    req,
    loaders: {
      articlesLoader: articlesLoader(defaultContext),
      filterLoader: filterLoader(defaultContext),
      subjectTopicsLoader: subjectTopicsLoader(defaultContext),
      resourcesLoader: resourcesLoader(defaultContext),
      learningpathsLoader: learningpathsLoader(defaultContext),
      resourceTypesLoader: resourceTypesLoader(defaultContext),
    },
  };
}

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 200, text: 'Health check ok' });
});

const storeCache = createLRUCache();

// Apollo server 2 includes cors and bodyparser middlware, but we need to run it before getFromCacheIfAny
app.use(cors(), bodyParser.json(), getFromCacheIfAny(storeCache));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  debug: false, // log errors in formatError
  tracing: true,
  cacheControl: true,
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
  formatResponse(gqlResponse: any, options: GraphQLOptions<Context>) {
    storeInCache(storeCache)(options.context.req, gqlResponse);
    return gqlResponse;
  },
  context: getContext,
});

server.applyMiddleware({ app: app, path: '/graphql-api/graphql' });

app.listen(GRAPHQL_PORT, () =>
  console.log(
    `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphql-api/graphiql`,
  ),
);
