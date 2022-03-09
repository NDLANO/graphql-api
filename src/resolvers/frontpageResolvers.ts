/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  IFrontPageData,
  ISubjectPageData,
  IFilmFrontPageData,
  ISubjectCollection,
} from '@ndla/types-frontpage-api';
import {
  fetchResource,
  fetchSubjectPage,
  fetchTopic,
  fetchResourcesAndTopics,
  fetchFilmFrontpage,
  fetchMovieMeta,
  queryResourcesOnContentURI,
} from '../api';

interface Id {
  id: number;
}

export const Query = {
  async frontpage(
    _: any,
    __: any,
    context: ContextWithLoaders,
  ): Promise<IFrontPageData> {
    return context.loaders.frontpageLoader.load('frontpage');
  },

  async subjectpage(
    _: any,
    { id }: Id,
    context: ContextWithLoaders,
  ): Promise<ISubjectPageData> {
    return fetchSubjectPage(id, context);
  },

  async filmfrontpage(
    _: any,
    __: any,
    context: ContextWithLoaders,
  ): Promise<IFilmFrontPageData> {
    return fetchFilmFrontpage(context);
  },
};

export const resolvers = {
  Frontpage: {
    async topical(
      frontpage: IFrontPageData,
      _: any,
      context: ContextWithLoaders,
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
      category: ISubjectCollection,
      params: any,
      context: ContextWithLoaders,
    ): Promise<GQLSubject[]> {
      const data = await context.loaders.subjectsLoader.load(params);
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
    async title(
      id: string,
      _: any,
      context: ContextWithLoaders,
    ): Promise<string> {
      const movieMeta = await fetchMovieMeta(id, context);
      return movieMeta?.title || '';
    },
    async metaImage(
      id: string,
      _: any,
      context: ContextWithLoaders,
    ): Promise<GQLMetaImage | undefined> {
      const movieMeta = await fetchMovieMeta(id, context);
      return movieMeta?.metaImage;
    },
    async metaDescription(
      id: string,
      _: any,
      context: ContextWithLoaders,
    ): Promise<string> {
      const movieMeta = await fetchMovieMeta(id, context);
      return movieMeta?.metaDescription || '';
    },
    async path(
      id: string,
      _: any,
      context: ContextWithLoaders,
    ): Promise<string> {
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
      context: ContextWithLoaders,
    ): Promise<GQLResourceType[]> {
      const movieResourceTypes: GQLMovieResourceTypes = await queryResourcesOnContentURI(
        id,
        context,
      );
      return movieResourceTypes.resourceTypes ?? [];
    },
  },

  SubjectPage: {
    async mostRead(
      subjectPage: ISubjectPageData,
      args: { subjectId?: string },
      context: ContextWithLoaders,
    ): Promise<GQLTaxonomyEntity[]> {
      return fetchResourcesAndTopics(
        { ids: subjectPage.mostRead, ...args },
        context,
      );
    },
    async editorsChoices(
      subjectPage: ISubjectPageData,
      args: { subjectId?: string },
      context: ContextWithLoaders,
    ): Promise<GQLTaxonomyEntity[]> {
      return fetchResourcesAndTopics(
        { ids: subjectPage.editorsChoices, ...args },
        context,
      );
    },
    async latestContent(
      subjectPage: ISubjectPageData,
      args: { subjectId?: string },
      context: ContextWithLoaders,
    ): Promise<GQLTaxonomyEntity[]> {
      if (!subjectPage.latestContent) return [];
      return fetchResourcesAndTopics(
        { ids: subjectPage.latestContent, ...args },
        context,
      );
    },
    async topical(
      subjectPage: ISubjectPageData,
      args: { subjectId?: string },
      context: ContextWithLoaders,
    ): Promise<GQLTaxonomyEntity | null> {
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
      subjectPage: ISubjectPageData,
      _: any,
      context: ContextWithLoaders,
    ): Promise<GQLResourceTypeDefinition[]> {
      return Promise.all(
        subjectPage.goTo.map(id =>
          context.loaders.resourceTypesLoader.load(id),
        ),
      );
    },
  },
};
