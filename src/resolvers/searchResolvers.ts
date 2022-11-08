/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  search,
  groupSearch,
  frontpageSearch,
  searchWithoutPagination,
} from '../api';
import {
  GQLFrontpageSearch,
  GQLGroupSearch,
  GQLQuerySearchArgs,
  GQLQuerySearchWithoutPaginationArgs,
  GQLSearch,
  GQLSearchWithoutPagination,
} from '../types/schema';

export const Query = {
  async search(
    _: any,
    searchQuery: GQLQuerySearchArgs,
    context: ContextWithLoaders,
  ): Promise<GQLSearch> {
    return search(searchQuery, context);
  },
  async groupSearch(
    _: any,
    searchQuery: GQLQuerySearchArgs,
    context: ContextWithLoaders,
  ): Promise<GQLGroupSearch> {
    return groupSearch(searchQuery, context);
  },
  async frontpageSearch(
    _: any,
    searchQuery: GQLQuerySearchArgs,
    context: ContextWithLoaders,
  ): Promise<GQLFrontpageSearch> {
    return frontpageSearch(searchQuery, context);
  },
  async searchWithoutPagination(
    _: any,
    searchQuery: GQLQuerySearchWithoutPaginationArgs,
    context: ContextWithLoaders,
  ): Promise<GQLSearchWithoutPagination> {
    return searchWithoutPagination(searchQuery, context);
  },
};

export const resolvers = {};
