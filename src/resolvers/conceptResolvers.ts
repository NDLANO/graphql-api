/**
 * Copyright (c) 2021-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { IConceptDTO, IConceptSearchResultDTO, IConceptSummaryDTO } from "@ndla/types-backend/concept-api";
import { searchConcepts, fetchConcept, fetchListingPage } from "../api";
import { convertToSimpleImage, fetchImage } from "../api/imageApi";
import {
  GQLConcept,
  GQLListingPage,
  GQLMeta,
  GQLQueryConceptArgs,
  GQLQueryConceptSearchArgs,
  GQLQueryListingPageArgs,
  GQLVisualElement,
} from "../types/schema";
import { parseVisualElement } from "../utils/visualelementHelpers";

export const Query = {
  async concept(_: any, { id }: GQLQueryConceptArgs, context: ContextWithLoaders): Promise<IConceptDTO | undefined> {
    return fetchConcept(id, context);
  },
  async listingPage(_: any, __: GQLQueryListingPageArgs, context: ContextWithLoaders): Promise<GQLListingPage> {
    return fetchListingPage(context);
  },
  async conceptSearch(
    _: any,
    searchQuery: GQLQueryConceptSearchArgs,
    context: ContextWithLoaders,
  ): Promise<IConceptSearchResultDTO> {
    return searchConcepts(searchQuery, context);
  },
};

export const resolvers = {
  Concept: {
    async subjectNames(concept: GQLConcept, params: any, context: ContextWithLoaders): Promise<string[]> {
      const subjectIds = concept.subjectIds;
      if (!subjectIds || subjectIds.length === 0) {
        return [];
      }
      const data = await context.loaders.subjectsLoader.load(params);
      return subjectIds.map((id) => data.subjects.find((subject) => subject.id === id)?.name || "");
    },
    async visualElement(concept: IConceptDTO, _: any, context: ContextWithLoaders): Promise<GQLVisualElement | null> {
      const visualElement = concept.visualElement?.visualElement;
      if (visualElement) {
        return await parseVisualElement(visualElement, context);
      }
      return null;
    },
    async image(concept: IConceptDTO, _: any, context: ContextWithLoaders) {
      const metaImageId = concept.metaImage?.url?.split("/").pop();
      if (metaImageId) {
        const image = await fetchImage(metaImageId, context);
        if (!image) {
          return undefined;
        }
        return convertToSimpleImage(image);
      }
      return undefined;
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
  ConceptResult: {
    concepts: (conceptResult: IConceptSearchResultDTO, _: any, __: ContextWithLoaders): IConceptSummaryDTO[] => {
      return conceptResult.results;
    },
  },
};
