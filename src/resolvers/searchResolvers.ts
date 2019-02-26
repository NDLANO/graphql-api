/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { search, groupSearch } from '../api';

export const Query = {
  async search(
    _: any,
    searchQuery: QueryToSearchArgs,
    context: Context,
  ): Promise<GQLSearch> {
    return search(searchQuery, context);
  },
  async groupSearch(
    _: any,
    searchQuery: QueryToSearchArgs,
    context: Context,
  ): Promise<GQLSearch> {
    return groupSearch(searchQuery, context);
  },
};

export const resolvers = {};
