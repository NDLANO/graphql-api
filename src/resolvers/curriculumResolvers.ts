/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { fetchCompetenceGoal } from '../api';

export const Query = {
  async competenceGoal(
    _: any,
    { code }: { code: string },
    context: Context,
  ): Promise<GQLCompetenceGoal> {
    return fetchCompetenceGoal(code, context);
  },
};

export const resolvers = {
  CompetenceGoal: {
    async curriculum(
      competenceGoal: GQLCompetenceGoal,
      _: any,
      context: Context,
    ): Promise<GQLCompetenceCurriculum> {
      return competenceGoal;
    },
  },
};
