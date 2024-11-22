/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { ILearningPathV2 } from "@ndla/types-backend/learningpath-api";
import { fetchImageV3, fetchLearningpath, fetchMyLearningpaths, fetchNode, fetchOembed } from "../api";
import { createLearningpath, deleteLearningpath, updateLearningpathStatus } from "../api/learningpathApi";
import {
  GQLLearningpath,
  GQLLearningpathCoverphoto,
  GQLLearningpathStep,
  GQLLearningpathStepOembed,
  GQLLearningpathStepResourceArgs,
  GQLMutationDeleteLearningpathArgs,
  GQLMutationUpdateStatusLearningpathArgs,
  GQLMutationNewLearningpathArgs,
  GQLMutationResolvers,
  GQLQueryLearningpathArgs,
  GQLResource,
} from "../types/schema";
import { nodeToTaxonomyEntity, toGQLLearningpath } from "../utils/apiHelpers";
import { isNDLAEmbedUrl } from "../utils/articleHelpers";

export const Query = {
  async learningpath(
    _: any,
    { pathId }: GQLQueryLearningpathArgs,
    context: ContextWithLoaders,
  ): Promise<GQLLearningpath> {
    const learningpath = await fetchLearningpath(pathId, context);
    return toGQLLearningpath(learningpath);
  },
  async myLearningpaths(_: any, __: any, context: ContextWithLoaders): Promise<Array<GQLLearningpath>> {
    const learningpaths = await fetchMyLearningpaths(context);
    return learningpaths.map(toGQLLearningpath);
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
  Learningpath: {
    async coverphoto(
      learningpath: GQLLearningpath,
      _: any,
      context: ContextWithLoaders,
    ): Promise<GQLLearningpathCoverphoto | undefined> {
      if (!learningpath.coverphoto) return undefined;
      const imageId = learningpath.coverphoto?.metaUrl?.split("/").pop() ?? "";
      const image = await fetchImageV3(imageId, context);
      return {
        ...learningpath.coverphoto,
        url: image.image?.imageUrl,
      };
    },
  },
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
      { rootId, parentId }: GQLLearningpathStepResourceArgs,
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
        const resource = await fetchNode({ id: `urn:${lastResourceMatch}`, rootId, parentId }, context);
        return nodeToTaxonomyEntity(resource, context);
      }
      return null;
    },
  },
};

export const Mutations: Pick<
  GQLMutationResolvers,
  "updateStatusLearningpath" | "deleteLearningpath" | "newLearningpath"
> = {
  async updateStatusLearningpath(_: any, params: GQLMutationUpdateStatusLearningpathArgs, context: ContextWithLoaders) {
    return await updateLearningpathStatus(params, context);
  },
  async deleteLearningpath(_: any, params: GQLMutationDeleteLearningpathArgs, context: ContextWithLoaders) {
    return await deleteLearningpath(params.id, context);
  },
  async newLearningpath(
    _: any,
    params: GQLMutationNewLearningpathArgs,
    context: ContextWithLoaders,
  ): Promise<GQLLearningpath> {
    const learningpath = await createLearningpath(params, context);
    return toGQLLearningpath(learningpath);
  },
};
