/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { storeInCache, lookup, getFromCacheIfAny } from '../middleware';

import { createCache } from '../cache';

const gqlResponse = () => ({
  data: {
    subjects: [{ name: 'Testfag' }, { name: 'Kinesisk' }],
  },
  extensions: { cacheControl: { hints: [{ maxAge: 300 }] } },
});

const cache = createCache({ size: 5000 });

test('can store gql response in cache', async () => {
  const storeInCacheFn = storeInCache(cache);
  const query = `
    query subjects {
      subjects {
        name
      }
    }
  `;

  const response = await storeInCacheFn(query, gqlResponse());
  // should delete extensions
  expect(response.extensions).toBe(undefined);

  const cachedValue = await lookup(cache, {
    query,
    operationName: 'querySubjects',
  });

  expect(cachedValue).toBeDefined();
});

test('should not store mutations in cache', async () => {
  const storeInCacheFn = storeInCache(cache);
  const mutation = `
    mutation createSubjects {
    }
  `;

  const response = await storeInCacheFn(mutation, gqlResponse());

  // should delete extensions
  expect(response.extensions).toBe(undefined);

  const cachedValue = await lookup(cache, {
    query: mutation,
    operationName: 'createSubject',
  });

  expect(cachedValue).toBe(undefined);
});

test('should not store responses with errors', async () => {
  const storeInCacheFn = storeInCache(cache);
  const query = `
    query subject {
      subject(id: "1") {
        name
      }
    }
  `;

  const response = await storeInCacheFn(query, {
    ...gqlResponse,
    errors: [{}],
  });
  // should delete extensions
  expect(response.extensions).toBe(undefined);

  const cachedValue = await lookup(cache, {
    query,
    operationName: 'querySubjects',
  });

  expect(cachedValue).toBe(undefined);
});

test('can get response from cache', async () => {
  const storeInCacheFn = storeInCache(cache);
  const getFromCacheIfAnyFn = getFromCacheIfAny(cache);
  const query = `
    query article {
      article(id: "1337") {
        title
      }
    }
  `;

  await storeInCacheFn(query, gqlResponse());

  const req = {
    method: 'POST',
    body: { query, operationName: 'test' },
  };
  const res = {
    setHeader: jest.fn(),
    write: jest.fn(),
    end: jest.fn(),
  };
  const next = jest.fn();
  // @ts-ignore
  await getFromCacheIfAnyFn(req, res, next);

  expect(res.write).toBeCalled();
  expect(res.end).toBeCalled();
});
