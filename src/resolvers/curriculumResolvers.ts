/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { fetchCompetenceGoals } from '../data/api';

export const Query = {
  async competenceGoals(
    _: any,
    { nodeId }: { nodeId: string },
    context: Context,
  ): Promise<GQLCompetenceGoal[]> {
    return fetchCompetenceGoals(nodeId, context);
  },
};

export const resolvers = {
  CompetenceGoal: {
    async curriculum(
      competenceGoal: GQLCompetenceGoal,
      _: any,
      context: Context,
    ): Promise<GQLCompetenceCurriculum> {
      if (competenceGoal.curriculumId) {
        return context.loaders.curriculumLoader.load(
          competenceGoal.curriculumId,
        );
      }
      return null;
    },
  },
};
