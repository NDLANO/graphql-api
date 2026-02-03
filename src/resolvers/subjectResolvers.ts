/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { SubjectPageDTO, VisualElementDTO } from "@ndla/types-backend/frontpage-api";
import { Node } from "@ndla/types-taxonomy";
import partition from "lodash/partition";
import { convertToImageLicense } from "../api/imageApi";
import { fetchCompetenceGoalSetCodes } from "../api/searchApi";
import {
  GQLImageLicense,
  GQLQuerySubjectArgs,
  GQLQuerySubjectCollectionArgs,
  GQLSubject,
  GQLSubjectLink,
} from "../types/schema";
import { getNumberId } from "../utils/apiHelpers";

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
  ): Promise<Node[]> {
    return context.loaders.nodesLoader.load({
      language: context.language,
      nodeType: "SUBJECT",
      includeContexts: true,
      filterProgrammes: true,
      key: input?.metadataFilterKey,
      value: input?.metadataFilterValue,
      isVisible: input?.filterVisible,
      ids: input?.ids,
    });
  },
  async subjectCollection(
    _: any,
    { language }: GQLQuerySubjectCollectionArgs,
    context: ContextWithLoaders,
  ): Promise<Node[]> {
    return await context.loaders.nodesLoader
      .load({
        language: context.language,
        key: "language",
        value: language,
        nodeType: "SUBJECT",
        includeContexts: true,
        filterProgrammes: true,
      })
      .then((s) => s.sort((a, b) => (a.name < b.name ? -1 : 1)));
  },
};

export const resolvers = {
  Subject: {
    async subjectpage(subject: GQLSubject, __: any, context: ContextWithLoaders): Promise<SubjectPageDTO | null> {
      const subjectPageId = getNumberId(subject.contentUri?.replace("urn:frontpage:", ""));
      if (!subjectPageId) return null;
      return context.loaders.subjectpageLoader.load(subjectPageId);
    },
    async grepCodes(subject: GQLSubject, __: any, context: ContextWithLoaders): Promise<string[]> {
      if (!subject.metadata?.grepCodes) {
        return [];
      }
      const [sets, rest] = partition(subject.metadata?.grepCodes, (code) => code.startsWith("KV"));
      const result = await Promise.all(sets.map((set) => fetchCompetenceGoalSetCodes(set, context)));
      return rest.concat(result.flat());
    },
  },
  SubjectPage: {
    async connectedTo(subjectpage: SubjectPageDTO, _: any, context: ContextWithLoaders): Promise<GQLSubjectLink[]> {
      return await context.loaders.nodeLoader.loadMany(
        subjectpage.connectedTo.map((id) => {
          return { id };
        }),
      );
    },
    async buildsOn(subjectpage: SubjectPageDTO, _: any, context: ContextWithLoaders): Promise<GQLSubjectLink[]> {
      return await context.loaders.nodeLoader.loadMany(
        subjectpage.buildsOn.map((id) => {
          return { id };
        }),
      );
    },
    async leadsTo(subjectpage: SubjectPageDTO, _: any, context: ContextWithLoaders): Promise<GQLSubjectLink[]> {
      return await context.loaders.nodeLoader.loadMany(
        subjectpage.leadsTo.map((id) => {
          return { id };
        }),
      );
    },
  },
  SubjectPageVisualElement: {
    async imageLicense(
      visualElement: VisualElementDTO,
      _: any,
      context: ContextWithLoaders,
    ): Promise<GQLImageLicense | undefined> {
      const imageId = parseInt(visualElement.url.split("/").pop() ?? "");
      if (isNaN(imageId)) return undefined;
      try {
        const image = await context.loaders.imagesLoader.load(imageId);
        if (!image) return undefined;
        return convertToImageLicense(image);
      } catch (e) {
        return undefined;
      }
    },
    async imageUrl(visualElement: VisualElementDTO, _: any, context: ContextWithLoaders): Promise<string | null> {
      if (visualElement.type === "image") {
        const imageId = parseInt(visualElement.url.split("/").pop() ?? "");
        if (!imageId) return null;
        const image = await context.loaders.imagesLoader.load(imageId);
        return image?.image?.imageUrl ?? null;
      }
      return null;
    },
  },
};
