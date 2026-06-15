/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { competenceGoals, coreElements } from "../api/searchApi";
import { GQLCompetenceGoal, GQLCoreElement } from "../types/schema";

export const Query = {
  async competenceGoals(
    _: any,
    { codes }: { codes: string[] },
    context: ContextWithLoaders,
  ): Promise<GQLCompetenceGoal[]> {
    return competenceGoals(codes, context);
  },
  async coreElements(_: any, { codes }: { codes: string[] }, context: ContextWithLoaders): Promise<GQLCoreElement[]> {
    return coreElements(codes, context);
  },
};

export const resolvers = {};
