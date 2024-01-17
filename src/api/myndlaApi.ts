/**
 * Copyright (c) 2023-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { IConfigMetaRestricted } from '@ndla/types-backend/myndla-api';
import { fetch, resolveJson } from '../utils/apiHelpers';

export const fetchConfig = async (
  configKey: string,
  context: Context,
): Promise<IConfigMetaRestricted> => {
  const response = await fetch(`/myndla-api/v1/config/${configKey}`, context);
  const config: IConfigMetaRestricted = await resolveJson(response);
  return config;
};

export const fetchExamLockStatus = async (
  context: Context,
): Promise<IConfigMetaRestricted> =>
  fetchConfig('MY_NDLA_WRITE_RESTRICTED', context);
