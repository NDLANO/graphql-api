/**
 * Copyright (c) 2023-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { fetch } from '../utils/apiHelpers';

export const checkIfFileExists = async (
  fileUrl: string,
  context: Context,
): Promise<boolean> => {
  const response = await fetch(fileUrl, context, { method: 'HEAD' });
  return response.status === 200;
};
