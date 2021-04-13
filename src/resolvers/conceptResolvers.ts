/**
 * Copyright (c) 2021-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { fetchConcepts } from '../api';

export const Query = {
  async concepts(
    _: any,
    { ids }: QueryToConceptsArgs,
    context: Context,
  ): Promise<GQLConcept[]> {
    return fetchConcepts(ids, context);
  },
};

export const resolvers = {};
