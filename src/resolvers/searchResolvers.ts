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
  conceptSearch,
  frontpageSearch,
  searchWithoutPagination,
} from '../api';

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
  async conceptSearch(
    _: any,
    searchQuery: QueryToSearchArgs,
    context: Context,
  ): Promise<GQLConceptResult> {
    return conceptSearch(searchQuery, context);
  },
  async frontpageSearch(
    _: any,
    searchQuery: QueryToSearchArgs,
    context: Context,
  ): Promise<GQLFrontpageSearch> {
    return frontpageSearch(searchQuery, context);
  },
  async searchWithoutPagination(
    _: any,
    searchQuery: QueryToSearchWithoutPaginationArgs,
    context: Context,
  ): Promise<GQLSearch> {
    return searchWithoutPagination(searchQuery, context);
  },
};

export const resolvers = {};
