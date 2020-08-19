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
    { codes }: { codes: string[] },
    context: Context,
  ): Promise<GQLCompetenceGoal[]> {
    return codes.length ? fetchCompetenceGoals(codes, context) : [];
  },
  async oldCompetenceGoals(
    _: any,
    { nodeId }: { nodeId: string },
    context: Context,
  ): Promise<GQLCompetenceGoal[]> {
    return nodeId ? fetchOldCompetenceGoals(nodeId, context) : [];
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
      return competenceGoal.curriculum;
    },
  },
};
