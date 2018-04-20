/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import express, { Request, Response } from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import DataLoader from 'dataloader';
import cors from 'cors';
import { isString } from 'lodash';

import { port } from './config';
import logger from './utils/logger';
import schema from './schema';
import { getToken } from './auth';
import {
  filterLoader,
  articlesLoader,
  subjectTopicsLoader,
} from './data/loaders';

const GRAPHQL_PORT = port;

const graphQLServer = express();

function getAcceptLanguage(request: Request): string {
  const language = request.headers['accept-language'];

  if (isString(language)) {
    return language;
  }
  return 'nb';
}

async function getContext(request: Request): Promise<Context> {
  const token = await getToken(request);
  const language = getAcceptLanguage(request);
  const defaultContext = { token, language };

  return {
    ...defaultContext,
    loaders: {
      articlesLoader: articlesLoader(defaultContext),
      filterLoader: filterLoader(defaultContext),
      subjectTopicsLoader: subjectTopicsLoader(defaultContext),
    },
  };
}

async function getOptions(request: Request) {
  let context;
  try {
    context = await getContext(request);
  } catch (error) {
    logger.error(error);
  }
  return {
    context,
    schema,
    debug: false, // log errors in formatError
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
  };
}

graphQLServer.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 200, text: 'Health check ok' });
});

graphQLServer.use(
  '/graphql-api/graphql',
  cors(),
  bodyParser.json(),
  graphqlExpress(getOptions),
);

graphQLServer.use('/graphql-api/graphiql', graphiqlExpress({ endpointURL: '/graphql-api/graphql' }));

graphQLServer.listen(GRAPHQL_PORT, () =>
  console.log(
    `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`,
  ),
);
