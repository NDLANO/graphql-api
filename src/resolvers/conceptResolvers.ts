/**
 * Copyright (c) 2021-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  searchConcepts,
  fetchConcepts,
  fetchDetailedConcept,
  fetchListingPage,
} from '../api';

export const Query = {
  async concepts(
    _: any,
    { ids }: QueryToConceptsArgs,
    context: Context,
  ): Promise<GQLConcept[]> {
    return fetchConcepts(ids, context);
  },
  async detailedConcept(
    _: any,
    { id }: QueryToDetailedConceptArgs,
    context: Context,
  ): Promise<GQLDetailedConcept> {
    return fetchDetailedConcept(id, context);
  },
  async listingPage(
    _: any,
    __: any,
    context: Context,
  ): Promise<GQLListingPage> {
    return fetchListingPage(context);
  },
  async conceptSearch(
    _: any,
    searchQuery: QueryToConceptSearchArgs,
    context: Context,
  ): Promise<GQLConceptResult> {
    return searchConcepts(searchQuery, context);
  },
};

export const resolvers = {};
