/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import DataLoader from 'dataloader';
import cors from 'cors';
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

async function getContext(): Promise<Context> {
  const token = await getToken();
  return {
    token,
    loaders: {
      articlesLoader: articlesLoader({ token }),
      filterLoader: filterLoader({ token }),
      subjectTopicsLoader: subjectTopicsLoader({ token }),
    },
  };
}

async function getOptions() {
  return {
    context: await getContext(),
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
