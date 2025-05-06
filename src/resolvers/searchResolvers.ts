/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { search, searchWithoutPagination } from "../api";
import {
  GQLQuerySearchArgs,
  GQLQuerySearchWithoutPaginationArgs,
  GQLSearch,
  GQLSearchWithoutPagination,
} from "../types/schema";

export const Query = {
  async search(_: any, searchQuery: GQLQuerySearchArgs, context: ContextWithLoaders): Promise<GQLSearch> {
    return search(searchQuery, context);
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
