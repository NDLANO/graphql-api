/**
 * Copyright (c) 2021-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { IConceptSummaryDTO } from "@ndla/types-backend/concept-api";
import { GQLVisualElement } from "../types/schema";
import { parseVisualElement } from "../utils/visualelementHelpers";

export const Query = {};

export const resolvers = {
  Concept: {
    async visualElement(
      concept: IConceptSummaryDTO,
      _: any,
      context: ContextWithLoaders,
    ): Promise<GQLVisualElement | null> {
      const visualElement = concept.visualElement?.visualElement;
      if (visualElement) {
        return await parseVisualElement(visualElement, context);
      }
      return null;
    },
    title(concept: IConceptSummaryDTO, _: any, __: ContextWithLoaders): string {
      return concept.title.title;
    },
    htmlTitle(concept: IConceptSummaryDTO, _: any, __: ContextWithLoaders): string {
      return concept.title.htmlTitle;
    },
    content(concept: IConceptSummaryDTO, _: any, __: ContextWithLoaders): string {
      return concept.content?.content ?? "";
    },
    tags: (concept: IConceptSummaryDTO, _: any, __: ContextWithLoaders): string[] => {
      return concept.tags?.tags || [];
    },
  },
};
