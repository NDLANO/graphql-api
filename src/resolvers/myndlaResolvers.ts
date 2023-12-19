/**
 * Copyright (c) 2023-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { fetchConfig, fetchExamLockStatus } from '../api/myndlaApi';
import { GQLConfigMetaBoolean, GQLConfigMetaStringList } from '../types/schema';

export const Query = {
  async examLockStatus(
    _: any,
    __: any,
    context: ContextWithLoaders,
  ): Promise<GQLConfigMetaBoolean> {
    const config = await fetchExamLockStatus(context);
    if (typeof config.value !== 'boolean') {
      throw new Error('Invalid exam lock status');
    }

    return { key: config.key, value: config.value };
  },
  async aiEnabledOrgs(
    _: any,
    __: any,
    context: ContextWithLoaders,
  ): Promise<GQLConfigMetaStringList> {
    const config = await fetchConfig('AI_ENABLED_ORGS', context);
    if (typeof config.value === 'boolean')
      throw new Error('Invalid ai enabled orgs');
    return { key: config.key, value: config.value };
  },
  async arenaEnabledOrgs(
    _: any,
    __: any,
    context: ContextWithLoaders,
  ): Promise<GQLConfigMetaStringList> {
    const config = await fetchConfig('ARENA_ENABLED_ORGS', context);
    if (typeof config.value === 'boolean')
      throw new Error('Invalid arena enabled orgs');
    return { key: config.key, value: config.value };
  },
};

export const resolvers = {};
