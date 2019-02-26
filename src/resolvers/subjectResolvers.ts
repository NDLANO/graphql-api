/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { fetchSubjects, fetchSubjectPage, fetchFilters } from '../api';

import { RSubjectCategory } from '../api/frontpageApi';

interface Id {
  id: string;
}

export const Query = {
  async subject(_: any, { id }: Id, context: Context): Promise<GQLSubject> {
    const list = await fetchSubjects(context);
    return list.find(subject => subject.id === id);
  },
  async subjects(_: any, __: any, context: Context): Promise<GQLSubject[]> {
    return fetchSubjects(context);
  },
  async filters(
    _: any,
    __: any,
    context: Context,
  ): Promise<GQLSubjectFilter[]> {
    return fetchFilters(context);
  },
};

export const resolvers = {
  Subject: {
    async topics(
      subject: GQLSubject,
      args: { all: boolean; filterIds: string },
      context: Context,
    ): Promise<GQLTopic[]> {
      const topics = await context.loaders.subjectTopicsLoader.load({
        subjectId: subject.id,
        filterIds: args.filterIds,
      });
      if (args.all) {
        return topics;
      }
      return topics.filter((topic: GQLTopic) => topic.parent === subject.id);
    },
    async filters(
      subject: GQLSubject,
      __: any,
      context: Context,
    ): Promise<GQLFilter[]> {
      return context.loaders.filterLoader.load(subject.id);
    },
    async frontpageFilters(
      subject: GQLSubject,
      __: any,
      context: Context,
    ): Promise<GQLFilter[]> {
      const frontpage = await context.loaders.frontpageLoader.load('frontpage');

      const allCategorySubjects = frontpage.categories.reduce(
        (acc, category) => [...acc, ...category.subjects],
        [],
      ) as RSubjectCategory[];

      const categorySubject = allCategorySubjects.find(
        cs => cs.id === subject.id,
      );

      const frontpageFilterIds = categorySubject ? categorySubject.filters : [];

      const allSubjectFilters = await context.loaders.filterLoader.load(
        subject.id,
      );

      // Only return filters specified in frontpage
      return allSubjectFilters.filter(filter =>
        frontpageFilterIds.includes(filter.id),
      );
    },
    async subjectpage(
      subject: GQLSubject,
      __: any,
      context: Context,
    ): Promise<GQLSubjectPage> {
      if (
        subject.contentUri &&
        subject.contentUri.startsWith('urn:frontpage')
      ) {
        return fetchSubjectPage(
          subject.contentUri.replace('urn:frontpage:', ''),
          context,
        );
      }
      throw Object.assign(
        new Error(
          'Missing subjectpage contentUri for subject with id: ' + subject.id,
        ),
        { status: 404 },
      );
    },
  },
};
