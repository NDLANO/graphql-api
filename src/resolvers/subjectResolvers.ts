/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { ISubjectPageDTO, IVisualElementDTO } from "@ndla/types-backend/frontpage-api";
import { Node } from "@ndla/types-taxonomy";
import {
  GQLImageLicense,
  GQLQuerySubjectArgs,
  GQLQuerySubjectCollectionArgs,
  GQLSubject,
  GQLSubjectLink,
  GQLTopic,
} from "../types/schema";
import { filterMissingArticles } from "../utils/articleHelpers";
import { fetchCompetenceGoalSetCodes } from "../api/searchApi";
import { fetchImageV3 } from "../api";
import { convertToImageLicense } from "../api/imageApi";

export const Query = {
  async subject(_: any, { id }: GQLQuerySubjectArgs, context: ContextWithLoaders): Promise<Node> {
    return await context.loaders.nodeLoader.load({ id });
  },
  async subjects(
    _: any,
    input:
      | {
          metadataFilterKey?: string;
          metadataFilterValue?: string;
          filterVisible?: boolean;
          ids?: string[];
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
      filterVisible: input?.filterVisible,
      ids: input?.ids,
    };

    return context.loaders.subjectsLoader.load(loaderParams).then((s) => s.subjects);
  },
  async subjectCollection(
    _: any,
    { language }: GQLQuerySubjectCollectionArgs,
    context: ContextWithLoaders,
  ): Promise<GQLSubject[]> {
    return await context.loaders.subjectsLoader
      .load({ metadataFilter: { key: "language", value: language } })
      .then((s) => s.subjects.sort((a, b) => (a.name < b.name ? -1 : 1)));
  },
};

export const resolvers = {
  Subject: {
    async topics(subject: GQLSubject, args: { all: boolean }, context: ContextWithLoaders): Promise<GQLTopic[]> {
      const topics = await context.loaders.subjectTopicsLoader.load({
        subjectId: subject.id,
      });
      if (args.all) {
        return filterMissingArticles(topics, context);
      }
      return filterMissingArticles(
        topics.filter((topic: GQLTopic) => topic.parentId === subject.id),
        context,
      );
    },
    async allTopics(subject: GQLSubject, _: any, context: ContextWithLoaders) {
      const topics = await context.loaders.subjectTopicsLoader.load({
        subjectId: subject.id,
      });
      return filterMissingArticles(topics, context);
    },
    async subjectpage(subject: GQLSubject, __: any, context: ContextWithLoaders): Promise<ISubjectPageDTO | null> {
      if (!subject.contentUri?.startsWith("urn:frontpage")) return null;
      return context.loaders.subjectpageLoader.load(subject.contentUri.replace("urn:frontpage:", ""));
    },
    async grepCodes(subject: GQLSubject, __: any, context: ContextWithLoaders): Promise<string[]> {
      if (subject.metadata?.grepCodes) {
        const code = subject.metadata?.grepCodes?.find((c) => c.startsWith("KV"));
        return code ? fetchCompetenceGoalSetCodes(code, context) : [];
      }
      return [];
    },
  },
  SubjectPage: {
    async connectedTo(subjectpage: ISubjectPageDTO, _: any, context: ContextWithLoaders): Promise<GQLSubjectLink[]> {
      return await context.loaders.nodeLoader.loadMany(
        subjectpage.connectedTo.map((id) => {
          return { id };
        }),
      );
    },
    async buildsOn(subjectpage: ISubjectPageDTO, _: any, context: ContextWithLoaders): Promise<GQLSubjectLink[]> {
      return await context.loaders.nodeLoader.loadMany(
        subjectpage.buildsOn.map((id) => {
          return { id };
        }),
      );
    },
    async leadsTo(subjectpage: ISubjectPageDTO, _: any, context: ContextWithLoaders): Promise<GQLSubjectLink[]> {
      return await context.loaders.nodeLoader.loadMany(
        subjectpage.leadsTo.map((id) => {
          return { id };
        }),
      );
    },
  },
  SubjectPageVisualElement: {
    async imageLicense(
      visualElement: IVisualElementDTO,
      _: any,
      context: ContextWithLoaders,
    ): Promise<GQLImageLicense | undefined> {
      const imageId = parseInt(visualElement.url.split("/").pop() ?? "");
      if (isNaN(imageId)) return undefined;
      const image = await fetchImageV3(imageId, context);
      return convertToImageLicense(image);
    },
  },
};
