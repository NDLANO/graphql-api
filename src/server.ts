/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import express, { Request } from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import DataLoader from 'dataloader';
import cors from 'cors';
import { isString } from 'lodash';
import { port } from './config';

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
  return {
    context: await getContext(request),
    schema,
  };
}

graphQLServer.use(
  '/graphql',
  cors(),
  bodyParser.json(),
  graphqlExpress(getOptions),
);

graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

graphQLServer.listen(GRAPHQL_PORT, () =>
  console.log(
    `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`,
  ),
);
