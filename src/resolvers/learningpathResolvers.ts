/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { fetchLearningpath, fetchNode, fetchOembed } from "../api";
import { fetchConfig, fetchExamLockStatus } from "../api/learningpathApi";
import {
  GQLConfigMetaBoolean,
  GQLConfigMetaStringList,
  GQLLearningpath,
  GQLLearningpathStep,
  GQLLearningpathStepOembed,
  GQLQueryLearningpathArgs,
  GQLResource,
} from "../types/schema";
import { nodeToTaxonomyEntity } from "../utils/apiHelpers";
import { isNDLAEmbedUrl } from "../utils/articleHelpers";

export const Query = {
  async learningpath(
    _: any,
    { pathId }: GQLQueryLearningpathArgs,
    context: ContextWithLoaders,
  ): Promise<GQLLearningpath> {
    return fetchLearningpath(pathId, context);
  },
  async examLockStatus(_: any, __: any, context: ContextWithLoaders): Promise<GQLConfigMetaBoolean> {
    const config = await fetchExamLockStatus(context);
    if (typeof config.value !== "boolean") {
      throw new Error("Invalid exam lock status");
    }

    return { key: config.key, value: config.value };
  },
  async aiEnabledOrgs(_: any, __: any, context: ContextWithLoaders): Promise<GQLConfigMetaStringList> {
    const config = await fetchConfig("AI_ENABLED_ORGS", context);
    if (typeof config.value === "boolean") throw new Error("Invalid ai enabled orgs");
    return { key: config.key, value: config.value };
  },
  async arenaEnabledOrgs(_: any, __: any, context: ContextWithLoaders): Promise<GQLConfigMetaStringList> {
    const config = await fetchConfig("ARENA_ENABLED_ORGS", context);
    if (typeof config.value === "boolean") throw new Error("Invalid arena enabled orgs");
    return { key: config.key, value: config.value };
  },
};

const buildOembedFromIframeUrl = (url: string): GQLLearningpathStepOembed => {
  return {
    type: "rich",
    version: "1.0",
    height: 800,
    width: 800,
    html: `<iframe src="${url}" frameborder="0" allowFullscreen="" />`,
  };
};

export const resolvers = {
  LearningpathStep: {
    async oembed(
      learningpathStep: GQLLearningpathStep,
      _: any,
      context: ContextWithLoaders,
    ): Promise<GQLLearningpathStepOembed | null> {
      if (!learningpathStep.embedUrl || !learningpathStep.embedUrl.url) {
        return null;
      }
      if (learningpathStep.embedUrl && learningpathStep.embedUrl.embedType === "iframe") {
        return buildOembedFromIframeUrl(learningpathStep.embedUrl.url);
      }
      if (
        learningpathStep.embedUrl &&
        learningpathStep.embedUrl.embedType === "oembed" &&
        learningpathStep.embedUrl.url !== "https://ndla.no"
      ) {
        return fetchOembed<GQLLearningpathStepOembed>(learningpathStep.embedUrl.url, context);
      }
      return null;
    },
    async resource(
      learningpathStep: GQLLearningpathStep,
      _: any,
      context: ContextWithLoaders,
    ): Promise<GQLResource | null> {
      if (
        !learningpathStep.embedUrl ||
        !learningpathStep.embedUrl.url ||
        (learningpathStep.embedUrl.embedType !== "oembed" && learningpathStep.embedUrl.embedType !== "iframe") ||
        !isNDLAEmbedUrl(learningpathStep.embedUrl.url)
      ) {
        return null;
      }

      const lastResourceMatch = learningpathStep.embedUrl.url.match(/(resource:[:\da-fA-F-]+)/g)?.pop();

      if (lastResourceMatch !== undefined) {
        const resource = await fetchNode({ id: `urn:${lastResourceMatch}` }, context);
        return nodeToTaxonomyEntity(resource, context);
      }
      return null;
    },
  },
};
