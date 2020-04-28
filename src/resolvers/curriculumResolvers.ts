/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  fetchCompetenceGoal,
  fetchCompetenceGoals,
  fetchOldCompetenceGoals,
} from '../api';

export const Query = {
  async competenceGoal(
    _: any,
    { code }: { code: string },
    context: Context,
  ): Promise<GQLCompetenceGoal> {
    return fetchCompetenceGoal(code, context);
  },
  async competenceGoals(
    _: any,
    { codes, nodeId }: { codes: string[]; nodeId: string },
    context: Context,
  ): Promise<GQLCompetenceGoal[]> {
    if (codes) {
      return fetchCompetenceGoals(codes, context);
    } else if (nodeId) {
      return fetchOldCompetenceGoals(nodeId, context);
    }
    return [];
  },
};

export const resolvers = {
  CompetenceGoal: {
    async curriculum(
      competenceGoal: GQLCompetenceGoal,
      _: any,
      context: Context,
    ): Promise<GQLReference> {
      if (competenceGoal.curriculumId) {
        return context.loaders.curriculumLoader.load(
          competenceGoal.curriculumId,
        );
      }
      return null;
    },
  },
};
