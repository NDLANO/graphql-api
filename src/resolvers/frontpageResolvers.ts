/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  fetchResource,
  fetchSubjectPage,
  fetchTopic,
  fetchResourcesAndTopics,
  fetchFilmFrontpage,
  fetchMovieMeta,
  queryResourcesOnContentURI,
} from '../api';

import { RCategory, FrontpageResponse } from '../api/frontpageApi';

interface Id {
  id: string;
}

export const Query = {
  async frontpage(
    _: any,
    __: any,
    context: Context,
  ): Promise<FrontpageResponse> {
    return context.loaders.frontpageLoader.load('frontpage');
  },

  async subjectpage(
    _: any,
    { id }: Id,
    context: Context,
  ): Promise<GQLSubjectPage> {
    return fetchSubjectPage(id, context);
  },

  async filmfrontpage(
    _: any,
    __: any,
    context: Context,
  ): Promise<GQLFilmFrontpage> {
    return fetchFilmFrontpage(context);
  },
};

export const resolvers = {
  Frontpage: {
    async topical(
      frontpage: { topical: [string] },
      _: any,
      context: Context,
    ): Promise<GQLResource[]> {
      return Promise.all(
        frontpage.topical.map(id => {
          if (id.startsWith('urn:topic')) {
            return fetchTopic({ id }, context);
          }

          return fetchResource({ id }, context);
        }),
      );
    },
  },
  Category: {
    async subjects(
      category: RCategory,
      _: any,
      context: Context,
    ): Promise<GQLSubject[]> {
      const data = await context.loaders.subjectsLoader.load('all');
      return data.subjects.filter(subject =>
        category.subjects.find(categorySubject => {
          return categorySubject.id === subject.id;
        }),
      );
    },
  },

  Movie: {
    async id(id: string) {
      return id;
    },
    async title(id: string, _: any, context: Context): Promise<string> {
      const movieMeta = await fetchMovieMeta(id, context);
      return movieMeta?.title || '';
    },
    async metaImage(
      id: string,
      _: any,
      context: Context,
    ): Promise<GQLMetaImage> {
      const movieMeta = await fetchMovieMeta(id, context);
      return movieMeta?.metaImage || {};
    },
    async metaDescription(
      id: string,
      _: any,
      context: Context,
    ): Promise<string> {
      const movieMeta = await fetchMovieMeta(id, context);
      return movieMeta?.metaDescription || '';
    },
    async path(id: string, _: any, context: Context): Promise<string> {
      const moviePath: GQLMoviePath = await queryResourcesOnContentURI(
        id,
        context,
      );
      return (
        moviePath?.paths?.find(p => p.startsWith('/subject:20/')) ||
        moviePath?.path ||
        ''
      );
    },
    async resourceTypes(
      id: string,
      _: any,
      context: Context,
    ): Promise<GQLResourceType[]> {
      const movieResourceTypes: GQLMovieResourceTypes = await queryResourcesOnContentURI(
        id,
        context,
      );
      return movieResourceTypes ? movieResourceTypes.resourceTypes : [];
    },
  },

  SubjectPage: {
    async mostRead(
      subjectPage: { mostRead: [string] },
      args: { subjectId?: string },
      context: Context,
    ): Promise<GQLTaxonomyEntity[]> {
      return fetchResourcesAndTopics(
        { ids: subjectPage.mostRead, ...args },
        context,
      );
    },
    async editorsChoices(
      subjectPage: { editorsChoices: [string] },
      args: { subjectId?: string },
      context: Context,
    ): Promise<GQLTaxonomyEntity[]> {
      return fetchResourcesAndTopics(
        { ids: subjectPage.editorsChoices, ...args },
        context,
      );
    },
    async latestContent(
      subjectPage: { latestContent: [string] },
      args: { subjectId?: string },
      context: Context,
    ): Promise<GQLTaxonomyEntity[]> {
      return fetchResourcesAndTopics(
        { ids: subjectPage.latestContent, ...args },
        context,
      );
    },
    async topical(
      subjectPage: { topical?: string },
      args: { subjectId?: string },
      context: Context,
    ): Promise<GQLTaxonomyEntity> {
      if (!subjectPage.topical) {
        return null;
      }

      const items: GQLTaxonomyEntity[] = await fetchResourcesAndTopics(
        { ids: [subjectPage.topical], ...args },
        context,
      );
      return items[0];
    },
    async goTo(
      subjectPage: { goTo: string[] },
      _: any,
      context: Context,
    ): Promise<GQLResourceTypeDefinition[]> {
      return Promise.all(
        subjectPage.goTo.map(id =>
          context.loaders.resourceTypesLoader.load(id),
        ),
      );
    },
  },
};
