/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { typeDefs } from '../schema';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { addMocksToSchema } from '@graphql-tools/mock';

import { graphql } from 'graphql';

test('can run query on schema', async () => {
  const schema = makeExecutableSchema({
    typeDefs,
    resolverValidationOptions: { requireResolversForResolveType: 'ignore' },
  });

  const schemaWithMocks = addMocksToSchema({ schema });

  const query = `
    query resource {
      resource(id: "6") { id, name }
    }
  `;

  const result = await graphql(schemaWithMocks, query);

  expect(result).toMatchSnapshot();
});
