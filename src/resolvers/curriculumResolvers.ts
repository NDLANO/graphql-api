/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { GQLCompetenceGoal, GQLCoreElement } from "../types/schema";
import { competenceGoals, coreElements } from "../api/searchApi";

export const Query = {
  async competenceGoals(
    _: any,
    { codes, language }: { codes: string[]; language?: string },
    context: ContextWithLoaders,
  ): Promise<GQLCompetenceGoal[]> {
    return competenceGoals(codes, language, context);
  },
  async coreElements(
    _: any,
    { codes, language }: { codes: string[]; language?: string },
    context: ContextWithLoaders,
  ): Promise<GQLCoreElement[]> {
    return coreElements(codes, language, context);
  },
};

export const resolvers = {};
