/**
 * Copyright (c) 2021-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  searchConcepts,
  fetchConcepts,
  fetchDetailedConcept,
  fetchListingPage,
  fetchArticles,
} from '../api';
import { Concept, ConceptResult } from '../api/conceptApi';
import { fetchImage, parseVisualElement } from '../utils/visualelementHelpers';

export const Query = {
  async concepts(
    _: any,
    { ids }: QueryToConceptsArgs,
    context: ContextWithLoaders,
  ): Promise<Concept[]> {
    return fetchConcepts(ids, context);
  },
  async detailedConcept(
    _: any,
    { id }: QueryToDetailedConceptArgs,
    context: ContextWithLoaders,
  ): Promise<Concept | undefined> {
    return fetchDetailedConcept(id, context);
  },
  async listingPage(
    _: any,
    args: QueryToListingPageArgs,
    context: ContextWithLoaders,
  ): Promise<GQLListingPage> {
    return fetchListingPage(context, args.subjects);
  },
  async conceptSearch(
    _: any,
    searchQuery: QueryToConceptSearchArgs,
    context: ContextWithLoaders,
  ): Promise<ConceptResult> {
    return searchConcepts(searchQuery, context);
  },
};

export const resolvers = {
  Concept: {
    async subjectNames(
      concept: GQLConcept,
      params: any,
      context: ContextWithLoaders,
    ): Promise<string[]> {
      const subjectIds = concept.subjectIds;
      if (!subjectIds || subjectIds.length === 0) {
        return [];
      }
      const data = await context.loaders.subjectsLoader.load(params);
      return subjectIds.map(
        id => data.subjects.find(subject => subject.id === id)?.name || '',
      );
    },
    async visualElement(
      concept: Concept,
      _: any,
      context: ContextWithLoaders,
    ): Promise<GQLVisualElement | null> {
      const visualElement = concept.visualElement?.visualElement;
      if (visualElement) {
        return await parseVisualElement(visualElement, context);
      }
      return null;
    },
    async image(concept: Concept, _: any, context: ContextWithLoaders) {
      const metaImageId = concept.metaImage?.url?.split('/').pop();
      if (metaImageId) {
        return await fetchImage(metaImageId, context);
      }
      return undefined;
    },
    async articles(
      concept: Concept,
      _: any,
      context: ContextWithLoaders,
    ): Promise<GQLMeta[]> {
      const articleIds = concept.articleIds;
      if (!articleIds || articleIds.length === 0) {
        return [];
      }
      return await fetchArticles(
        articleIds.map(id => `${id}`),
        context,
      );
    },
  },
};
