/**
 * Copyright (c) 2020-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const nock = require('nock');
import DataLoader from 'dataloader';
import { Query } from '../subjectResolvers';

test('Fetch subject should filter out invisible elements', async () => {
  const subjects = [
    {
      id: 'urn:subject:3',
      contentUri: 'urn:frontpage:1',
      name: 'Samfunnsfag YF Vg2',
      path: '/subject:3',
      metadata: {
        visible: true,
      },
    },
    {
      id: 'urn:subject:6',
      contentUri: 'urn:frontpage:4',
      name: 'Brønnteknikk Vg2',
      path: '/subject:6',
      metadata: {
        visible: false,
      },
    },
  ];
  nock('https://api.test.ndla.no')
    .persist()
    .get('/taxonomy/v1/subjects/?language=nb')
    .reply(200, subjects);

  const loadAll = async () => {
    return [{ subjects }];
  };

  const subjectsLoader = new DataLoader(loadAll);

  const subs = await Query.subjects(1, 1, {
    language: 'nb',
    shouldUseCache: false,
    taxonomyUrl: 'taxonomy',
    loaders: { subjectsLoader },
  });

  expect(subs).toMatchSnapshot();
});

test('Fetch subject filters should filter out invisible elements', async () => {
  nock('https://api.test.ndla.no')
    .persist()
    .get('/taxonomy/v1/filters/?language=nb')
    .reply(200, [
      {
        id: 'urn:filter:1',
        name: 'Filter 1',
        metadata: {
          grepCodes: [],
          visible: true,
        },
      },
      {
        id: 'urn:filter:2',
        name: 'Filter 2',
        metadata: {
          grepCodes: [],
          visible: false,
        },
      },
    ]);

  const subs = await Query.filters(1, 1, {
    language: 'nb',
    shouldUseCache: false,
    taxonomyUrl: 'taxonomy',
  });

  expect(subs).toMatchSnapshot();
});
