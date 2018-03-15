/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const express = require('express');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { port } = require('./config');

const schema = require('./schema');

const GRAPHQL_PORT = port;

const graphQLServer = express();

graphQLServer.use(
  '/graphql',
  cors(),
  bodyParser.json(),
  graphqlExpress(() => ({
    schema,
  }))
);
graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

graphQLServer.listen(GRAPHQL_PORT, () =>
  console.log(
    `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
  )
);
