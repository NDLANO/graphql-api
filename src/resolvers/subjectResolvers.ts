// @ts-strict-ignore
/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { ISubjectPageData } from '@ndla/types-frontpage-api';
import { fetchLK20CompetenceGoalSet, fetchSubjectPage } from '../api';

import { filterMissingArticles } from '../utils/articleHelpers';
import { Subject } from '../api/taxonomyApi';

export const Query = {
  async subject(
    _: any,
    { id }: QueryToSubjectArgs,
    context: ContextWithLoaders,
  ): Promise<Subject> {
    return await context.loaders.subjectLoader.load({ id });
  },
  async subjects(
    _: any,
    input:
      | {
          metadataFilterKey?: string;
          metadataFilterValue?: string;
          filterVisible?: boolean;
        }
      | undefined,
    context: ContextWithLoaders,
  ): Promise<GQLSubject[]> {
    const metaDataFilter = input?.metadataFilterKey
      ? {
          metadataFilter: {
            key: input.metadataFilterKey,
            value: input.metadataFilterValue,
          },
        }
      : {};

    const loaderParams = {
      ...metaDataFilter,
      filterVisible: input.filterVisible,
    };

    return context.loaders.subjectsLoader
      .load(loaderParams)
      .then(s => s.subjects);
  },
};

export const resolvers = {
  Subject: {
    async topics(
      subject: GQLSubject,
      args: { all: boolean },
      context: ContextWithLoaders,
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
    async allTopics(subject: GQLSubject, _: any, context: ContextWithLoaders) {
      const topics = await context.loaders.subjectTopicsLoader.load({
        subjectId: subject.id,
      });
      return filterMissingArticles(topics, context);
    },
    async subjectpage(
      subject: GQLSubject,
      __: any,
      context: ContextWithLoaders,
    ): Promise<ISubjectPageData | undefined> {
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
      context: ContextWithLoaders,
    ): Promise<string[]> {
      if (subject.metadata?.grepCodes) {
        const code = subject.metadata?.grepCodes?.find(c => c.startsWith('KV'));
        return code ? fetchLK20CompetenceGoalSet(code, context) : [];
      }
      return [];
    },
  },
};
