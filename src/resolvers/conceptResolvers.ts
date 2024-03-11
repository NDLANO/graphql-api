/**
 * Copyright (c) 2021-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { searchConcepts, fetchConcept, fetchListingPage, fetchArticles } from "../api";
import { Concept, ConceptResult } from "../api/conceptApi";
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
  async concept(_: any, { id }: GQLQueryConceptArgs, context: ContextWithLoaders): Promise<Concept | undefined> {
    return fetchConcept(id, context);
  },
  async listingPage(_: any, args: GQLQueryListingPageArgs, context: ContextWithLoaders): Promise<GQLListingPage> {
    return fetchListingPage(context, args.subjects);
  },
  async conceptSearch(
    _: any,
    searchQuery: GQLQueryConceptSearchArgs,
    context: ContextWithLoaders,
  ): Promise<ConceptResult> {
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
    async visualElement(concept: Concept, _: any, context: ContextWithLoaders): Promise<GQLVisualElement | null> {
      const visualElement = concept.visualElement?.visualElement;
      if (visualElement) {
        return await parseVisualElement(visualElement, context);
      }
      return null;
    },
    async image(concept: Concept, _: any, context: ContextWithLoaders) {
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
    async articles(concept: Concept, _: any, context: ContextWithLoaders): Promise<GQLMeta[]> {
      const articleIds = concept.articleIds;
      if (!articleIds || articleIds.length === 0) {
        return [];
      }
      const fetched = await fetchArticles(
        articleIds.map((id) => `${id}`),
        context,
      );
      return fetched.filter((article): article is GQLMeta => article !== null);
    },
  },
};
