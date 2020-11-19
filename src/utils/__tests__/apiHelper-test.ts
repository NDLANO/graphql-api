/**
 * Copyright (c) 2020-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { licenseFixer } from '../apiHelpers';

test('license C converts to COPYRIGHTED', async () => {
  expect(licenseFixer('C', '4.0')).toBe('COPYRIGHTED');
});

test('license PD converts to PD', async () => {
  expect(licenseFixer('PD', '4.0')).toBe('PD');
});

test('license CC BY converts to CC-BY-4.0', async () => {
  expect(licenseFixer('CC BY', '4.0')).toBe('CC-BY-4.0');
});
