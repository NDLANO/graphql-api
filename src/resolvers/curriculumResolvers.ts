/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { fetchCompetenceGoal, fetchCompetenceGoals } from '../api';

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
    return fetchCompetenceGoals(codes, context);
  },
};
