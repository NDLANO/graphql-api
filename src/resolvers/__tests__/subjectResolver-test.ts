/**
 * Copyright (c) 2020-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const nock = require('nock');
import { Query } from '../subjectResolvers';

test('Fetch subject should filter out invisible elements', async () => {
  nock('https://api.test.ndla.no')
    .persist()
    .get('/taxonomy/v1/subjects/?includeMetadata=true&language=nb')
    .reply(200, [
      {
        id: 'urn:subject:3',
        contentUri: 'urn:frontpage:1',
        name: 'Samfunnsfag YF Vg2',
        path: '/subject:3',
        metadata: {
          grepCodes: [],
          visible: true,
        },
      },
      {
        id: 'urn:subject:6',
        contentUri: 'urn:frontpage:4',
        name: 'Brønnteknikk Vg2',
        path: '/subject:6',
        metadata: {
          grepCodes: [],
          visible: false,
        },
      },
    ]);

  const subs = await Query.subjects(1, 1, {
    language: 'nb',
    shouldUseCache: false,
  });

  expect(subs).toMatchSnapshot();
});