/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { fetchCompetenceGoals, fetchCoreElements } from '../api';

export const Query = {
  async competenceGoals(
    _: any,
    {
      codes,
      nodeId,
      language,
    }: { codes: string[]; nodeId?: string; language?: string },
    context: Context,
  ): Promise<GQLCompetenceGoal[]> {
    return fetchCompetenceGoals(codes, nodeId, language, context);
  },
  async coreElements(
    _: any,
    { codes, language }: { codes: string[]; language?: string },
    context: Context,
  ): Promise<GQLCoreElement[]> {
    if (codes?.length) {
      return fetchCoreElements(codes, language, context);
    }
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
