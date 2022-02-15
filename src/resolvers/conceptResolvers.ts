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

export const Query = {
  async concepts(
    _: any,
    { ids }: QueryToConceptsArgs,
    context: ContextWithLoaders,
  ): Promise<GQLConcept[]> {
    return fetchConcepts(ids, context);
  },
  async detailedConcept(
    _: any,
    { id }: QueryToDetailedConceptArgs,
    context: ContextWithLoaders,
  ): Promise<GQLDetailedConcept> {
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
  ): Promise<GQLConceptResult> {
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
  },
  DetailedConcept: {
    async subjectNames(
      detailedConcept: GQLDetailedConcept,
      _: any,
      context: ContextWithLoaders,
    ): Promise<string[]> {
      const data = await context.loaders.subjectsLoader.load('all');
      if (detailedConcept.subjectIds?.length > 0) {
        return Promise.all(
          detailedConcept.subjectIds?.map(id => {
            return data.subjects.find(subject => subject.id === id)?.name || '';
          }),
        );
      }
    },
    async articles(
      detailedConcept: GQLDetailedConcept,
      _: any,
      context: ContextWithLoaders,
    ): Promise<GQLMeta[]> {
      if (detailedConcept.articleIds?.length > 0) {
        const articles = await fetchArticles(
          detailedConcept.articleIds,
          context,
        );
        return articles;
      }
    },
  },
};
