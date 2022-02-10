/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { fetchLK20CompetenceGoalSet, fetchSubjectPage } from '../api';

import { RSubjectCategory } from '../api/frontpageApi';
import { filterMissingArticles } from '../utils/articleHelpers';

export const Query = {
  async subject(
    _: any,
    { id }: QueryToSubjectArgs,
    context: Context,
  ): Promise<GQLSubject> {
    const data = await context.loaders.subjectsLoader.load('all');
    return data.subjects
      .filter(s => (s.metadata ? s.metadata.visible : true))
      .find(subject => subject.id === id);
  },
  async subjects(_: any, __: any, context: Context): Promise<GQLSubject[]> {
    const data = await context.loaders.subjectsLoader.load('all');
    return data.subjects.filter(s => (s.metadata ? s.metadata.visible : true));
  },
};

export const resolvers = {
  Subject: {
    async topics(
      subject: GQLSubject,
      args: { all: boolean },
      context: Context,
    ): Promise<GQLTopic[]> {
      const topics = await context.loaders.subjectTopicsLoader.load({
        subjectId: subject.id,
      });
      if (args.all) {
        return filterMissingArticles(topics, context);
      }
      return filterMissingArticles(
        topics.filter((topic: GQLTopic) => topic.parent === subject.id),
        context,
      );
    },
    async subjectpage(
      subject: GQLSubject,
      __: any,
      context: Context,
    ): Promise<GQLSubjectPage> {
      if (subject.contentUri?.startsWith('urn:frontpage')) {
        return fetchSubjectPage(
          Number(subject.contentUri.replace('urn:frontpage:', '')),
          context,
        );
      }
    },
    async grepCodes(
      subject: GQLSubject,
      __: any,
      context: Context,
    ): Promise<string[]> {
      if (subject.metadata?.grepCodes) {
        const code = subject.metadata?.grepCodes?.find(c => c.startsWith('KV'));
        return code ? fetchLK20CompetenceGoalSet(code, context) : [];
      }
    },
  },
};
