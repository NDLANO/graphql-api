/**
 * Copyright (c) 2021-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { fetchConcepts, fetchConceptPage } from '../api';

export const Query = {
  async concepts(
    _: any,
    { ids }: QueryToConceptsArgs,
    context: Context,
  ): Promise<GQLConcept[]> {
    return fetchConcepts(ids, context);
  },
  async conceptPage(_: any, context: Context): Promise<GQLConceptPage> {
    return fetchConceptPage(context);
  },
};

export const resolvers = {};
