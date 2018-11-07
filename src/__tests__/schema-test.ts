/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { typeDefs } from '../schema';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { graphql } from 'graphql';

test('can run query on schema', async () => {
  // Not sure why this fails. Should test if we can remove it next time we bump apollo/graphql dependencies
  // @ts-ignore
  const schema = makeExecutableSchema({ typeDefs: typeDefs });
  addMockFunctionsToSchema({ schema });
  const query = `
    query resource {
      resource(id: "6") { id, name }
    }
  `;

  const result = await graphql(schema, query);

  expect(result).toMatchSnapshot();
});
