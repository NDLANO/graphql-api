/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  fetchCompetenceGoals,
  fetchCompetenceSet,
  fetchCoreElements,
  fetchCoreElementReferences,
  fetchCrossSubjectTopics,
} from "../api";
import { GQLCompetenceGoal, GQLCoreElement, GQLElement, GQLReference } from "../types/schema";

export const Query = {
  async competenceGoals(
    _: any,
    { codes, language }: { codes: string[]; language?: string },
    context: ContextWithLoaders,
  ): Promise<GQLCompetenceGoal[]> {
    return fetchCompetenceGoals(codes, language ?? context.language, context);
  },
  async coreElements(
    _: any,
    { codes, language }: { codes: string[]; language?: string },
    context: ContextWithLoaders,
  ): Promise<GQLCoreElement[]> {
    if (codes?.length) {
      return fetchCoreElements(codes, language ?? context.language, context);
    }
    return [];
  },
};

export const resolvers = {
  CompetenceGoal: {
    async curriculum(
      competenceGoal: GQLCompetenceGoal,
      _: any,
      context: ContextWithLoaders,
    ): Promise<GQLReference | undefined> {
      if (!competenceGoal.curriculumCode) return undefined;
      return context.loaders.lk20CurriculumLoader.load({
        code: competenceGoal.curriculumCode,
        language: competenceGoal.language,
      });
    },
    async competenceGoalSet(
      competenceGoal: GQLCompetenceGoal,
      _: any,
      context: ContextWithLoaders,
    ): Promise<GQLReference | undefined> {
      if (!competenceGoal.competenceGoalSetCode) return undefined;
      return fetchCompetenceSet(competenceGoal.competenceGoalSetCode, competenceGoal.language, context);
    },
    async crossSubjectTopics(
      competenceGoal: GQLCompetenceGoal,
      _: any,
      context: ContextWithLoaders,
    ): Promise<GQLElement[] | undefined> {
      if (!competenceGoal.crossSubjectTopicsCodes) return undefined;
      return fetchCrossSubjectTopics(competenceGoal.crossSubjectTopicsCodes, competenceGoal.language, context);
    },
    async coreElements(
      competenceGoal: GQLCompetenceGoal,
      _: any,
      context: ContextWithLoaders,
    ): Promise<GQLElement[] | undefined> {
      if (!competenceGoal.coreElementsCodes) return undefined;
      return fetchCoreElementReferences(competenceGoal.coreElementsCodes, competenceGoal.language, context);
    },
  },
  CoreElement: {
    async curriculum(
      coreElement: GQLCoreElement,
      _: any,
      context: ContextWithLoaders,
    ): Promise<GQLReference | undefined> {
      if (!coreElement.curriculumCode) return undefined;
      return context.loaders.lk20CurriculumLoader.load({
        code: coreElement.curriculumCode,
        language: coreElement.language,
      });
    },
  },
};
