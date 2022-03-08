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
  ): Promise<Concept> {
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
      _: any,
      context: ContextWithLoaders,
    ): Promise<string[]> {
      const data = await context.loaders.subjectsLoader.load('all');
      if (concept.subjectIds?.length > 0) {
        return Promise.all(
          concept.subjectIds?.map(id => {
            return data.subjects.find(subject => subject.id === id)?.name || '';
          }),
        );
      }
    },
    async visualElement(
      concept: Concept,
      _: any,
      context: ContextWithLoaders,
    ): Promise<GQLVisualElement> {
      const visualElement = concept.visualElement?.visualElement;
      console.log(visualElement);
      if (visualElement) {
        return await parseVisualElement(visualElement, context);
      }
      return undefined;
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
      if (concept.articleIds?.length > 0) {
        const articles = await fetchArticles(
          concept.articleIds.map(id => `${id}`),
          context,
        );
        return articles;
      }
    },
  },
};
