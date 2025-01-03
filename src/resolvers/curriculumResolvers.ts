/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { fetchCompetenceGoals, fetchCoreElements, fetchCoreElementReferences, fetchCrossSubjectTopics } from "../api";
import { GQLCompetenceGoal, GQLCoreElement, GQLElement, GQLReference } from "../types/schema";
import { convertedGrepSearch, grepSearch } from "../api/searchApi";
import { unreachable } from "../utils/unreachable";

export const Query = {
  async competenceGoals(
    _: any,
    { codes, language }: { codes: string[]; language?: string },
    context: ContextWithLoaders,
  ): Promise<GQLCompetenceGoal[]> {
    const references = await grepSearch({ language, codes }, context);
    const competenceGoals = references.results.filter((r) => {
      return r.grepType === "kompetansemaal";
    });

    return competenceGoals.map((reference) => {
      const crossSubjectTopicsCodes: GQLElement[] = reference.tverrfagligeTemaer.map((t) => {
        return {
          explanation: [], // TODO: What is this?
          reference: {
            id: t.code,
            code: t.code,
            title: t.title.title,
          },
        };
      });

      const goal: GQLCompetenceGoal = {
        ...reference,
        id: reference.code,
        title: reference.title.title,
        curriculumCode: reference.laereplan.code,
        curriculum: {
          id: reference.laereplan.code,
          code: reference.laereplan.code,
          title: reference.laereplan.title.title,
        },
        competenceGoalSetCode: reference.kompetansemaalSett.code,
        crossSubjectTopicsCodes,
        __typename: "CompetenceGoal",
      };

      return goal;
    });
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
    async competenceGoalSet(
      competenceGoal: GQLCompetenceGoal,
      _: any,
      context: ContextWithLoaders,
    ): Promise<GQLReference | undefined> {
      if (!competenceGoal.competenceGoalSetCode) return undefined;
      const results = await convertedGrepSearch(
        { language: competenceGoal.language, codes: [competenceGoal.competenceGoalSetCode] },
        context,
      );

      return results[0];
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
