/**
 * Copyright (c) 2020-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const nock = require('nock');
import { Request, Response } from 'express';
import { Query } from '../subjectResolvers';
import {
  mockLoaders,
  mockSubjectsLoader,
} from '../../utils/__tests__/mockLoaders';

const mockRequest = {} as Request;
const mockResponse = {
  getHeader: (name: string, value: string): string | null => {
    return null;
  },
} as Response;

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

  const subs = await Query.subjects(1, 1, {
    req: mockRequest,
    res: mockResponse,
    language: 'nb',
    shouldUseCache: false,
    taxonomyUrl: 'taxonomy',
    loaders: {
      ...mockLoaders,
      subjectsLoader: mockSubjectsLoader(subjects),
    },
  });

  expect(subs).toMatchSnapshot();
});
