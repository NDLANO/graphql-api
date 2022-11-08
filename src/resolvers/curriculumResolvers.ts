// @ts-strict-ignore
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
} from '../api';
import { fetchLK06CompetenceGoalSet } from '../api/curriculumApi';
import {
  GQLCompetenceGoal,
  GQLCoreElement,
  GQLElement,
  GQLReference,
} from '../types/schema';

export const Query = {
  async competenceGoals(
    _: any,
    {
      codes,
      nodeId,
      language,
    }: { codes: string[]; nodeId?: string; language?: string },
    context: ContextWithLoaders,
  ): Promise<GQLCompetenceGoal[]> {
    return fetchCompetenceGoals(codes, nodeId, language, context);
  },
  async coreElements(
    _: any,
    { codes, language }: { codes: string[]; language?: string },
    context: ContextWithLoaders,
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
      context: ContextWithLoaders,
    ): Promise<GQLReference> {
      if (competenceGoal.curriculumId) {
        return context.loaders.lk06CurriculumLoader.load(
          competenceGoal.curriculumId,
        );
      }
      return context.loaders.lk20CurriculumLoader.load({
        code: competenceGoal.curriculumCode,
        language: competenceGoal.language,
      });
    },
    async competenceGoalSet(
      competenceGoal: GQLCompetenceGoal,
      _: any,
      context: ContextWithLoaders,
    ): Promise<GQLReference> {
      if (competenceGoal.competenceAimSetId) {
        return fetchLK06CompetenceGoalSet(
          competenceGoal.competenceAimSetId,
          context,
        );
      }

      if (competenceGoal.competenceGoalSetCode) {
        return fetchCompetenceSet(
          competenceGoal.competenceGoalSetCode,
          competenceGoal.language,
          context,
        );
      }
      return undefined;
    },
    async crossSubjectTopics(
      competenceGoal: GQLCompetenceGoal,
      _: any,
      context: ContextWithLoaders,
    ): Promise<GQLElement[]> {
      if (competenceGoal.crossSubjectTopicsCodes) {
        return fetchCrossSubjectTopics(
          competenceGoal.crossSubjectTopicsCodes,
          competenceGoal.language,
          context,
        );
      }
      return undefined;
    },
    async coreElements(
      competenceGoal: GQLCompetenceGoal,
      _: any,
      context: ContextWithLoaders,
    ): Promise<GQLElement[]> {
      if (competenceGoal.coreElementsCodes) {
        return fetchCoreElementReferences(
          competenceGoal.coreElementsCodes,
          competenceGoal.language,
          context,
        );
      }
      return undefined;
    },
  },
  CoreElement: {
    async curriculum(
      coreElement: GQLCoreElement,
      _: any,
      context: ContextWithLoaders,
    ): Promise<GQLReference> {
      if (coreElement.curriculumCode) {
        return context.loaders.lk20CurriculumLoader.load({
          code: coreElement.curriculumCode,
          language: coreElement.language,
        });
      }
      return undefined;
    },
  },
};
