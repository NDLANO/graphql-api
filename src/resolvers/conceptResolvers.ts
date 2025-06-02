/**
 * Copyright (c) 2021-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { IConceptDTO } from "@ndla/types-backend/concept-api";
import { GQLConcept, GQLMeta, GQLVisualElement } from "../types/schema";
import { parseVisualElement } from "../utils/visualelementHelpers";

export const Query = {};

export const resolvers = {
  Concept: {
    async subjectNames(concept: GQLConcept, _: any, context: ContextWithLoaders): Promise<string[]> {
      const subjectIds = concept.subjectIds;
      if (!subjectIds || subjectIds.length === 0) {
        return [];
      }
      // TODO: This is crazy deprecated. Should we consider removing it?
      const data = await context.loaders.nodesLoader.load({
        language: context.language,
        nodeType: "SUBJECT",
        includeContexts: true,
        filterProgrammes: true,
        ids: subjectIds,
      });
      return subjectIds.map((id) => data.find((subject) => subject.id === id)?.name || "");
    },
    async visualElement(concept: IConceptDTO, _: any, context: ContextWithLoaders): Promise<GQLVisualElement | null> {
      const visualElement = concept.visualElement?.visualElement;
      if (visualElement) {
        return await parseVisualElement(visualElement, context);
      }
      return null;
    },
    async articles(_: IConceptDTO, __: any, ___: ContextWithLoaders): Promise<GQLMeta[]> {
      return [];
    },
    title(concept: IConceptDTO, _: any, __: ContextWithLoaders): string {
      return concept.title.title;
    },
    content(concept: IConceptDTO, _: any, __: ContextWithLoaders): string {
      return concept.content?.content ?? "";
    },
    tags: (concept: IConceptDTO, _: any, __: ContextWithLoaders): string[] => {
      return concept.tags?.tags || [];
    },
    subjectIds: (_: any, __: any, ___: ContextWithLoaders): string[] => {
      return [];
    },
  },
};
