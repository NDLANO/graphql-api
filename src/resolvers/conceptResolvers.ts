/**
 * Copyright (c) 2021-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { IArticleV2 } from "@ndla/types-backend/article-api";
import { IConcept, IConceptSearchResult, IConceptSummary } from "@ndla/types-backend/concept-api";
import { searchConcepts, fetchConcept, fetchListingPage, fetchArticles } from "../api";
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
import { articleToMeta } from "../utils/articleHelpers";
import { parseVisualElement } from "../utils/visualelementHelpers";

export const Query = {
  async concept(_: any, { id }: GQLQueryConceptArgs, context: ContextWithLoaders): Promise<IConcept | undefined> {
    return fetchConcept(id, context);
  },
  async listingPage(_: any, args: GQLQueryListingPageArgs, context: ContextWithLoaders): Promise<GQLListingPage> {
    return fetchListingPage(context, args.subjects);
  },
  async conceptSearch(
    _: any,
    searchQuery: GQLQueryConceptSearchArgs,
    context: ContextWithLoaders,
  ): Promise<IConceptSearchResult> {
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
    async visualElement(concept: IConcept, _: any, context: ContextWithLoaders): Promise<GQLVisualElement | null> {
      const visualElement = concept.visualElement?.visualElement;
      if (visualElement) {
        return await parseVisualElement(visualElement, context);
      }
      return null;
    },
    async image(concept: IConcept, _: any, context: ContextWithLoaders) {
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
    async articles(concept: IConcept, _: any, context: ContextWithLoaders): Promise<GQLMeta[]> {
      const articleIds = concept.articleIds;
      if (!articleIds || articleIds.length === 0) {
        return [];
      }
      const fetched = await fetchArticles(
        articleIds.map((id) => `${id}`),
        context,
      );
      return fetched.filter((article): article is IArticleV2 => article !== null).map(articleToMeta);
    },
    title(concept: IConcept, _: any, __: ContextWithLoaders): string {
      return concept.title.title;
    },
    content(concept: IConcept, _: any, __: ContextWithLoaders): string {
      return concept.content?.content ?? "";
    },
    tags: (concept: IConcept, _: any, __: ContextWithLoaders): string[] => {
      return concept.tags?.tags || [];
    },
    subjectIds: (concept: IConcept, _: any, __: ContextWithLoaders): string[] => {
      return concept.subjectIds || [];
    },
  },
  ConceptResult: {
    concepts: (conceptResult: IConceptSearchResult, _: any, __: ContextWithLoaders): IConceptSummary[] => {
      return conceptResult.results;
    },
  },
};
