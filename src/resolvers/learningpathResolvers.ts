/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { OEmbedDTO } from "@ndla/types-backend/oembed-proxy";
import { LearningStepV2DTO } from "@ndla/types-backend/learningpath-api";
import { fetchLearningpath, fetchMyLearningpaths, fetchNode, fetchOembed } from "../api";
import { fetchOpengraph } from "../api/externalApi";
import {
  copyLearningpath,
  createLearningpath,
  createLearningstep,
  deleteLearningpath,
  deleteLearningstep,
  fetchMyLearningpath,
  updateLearningpath,
  updateLearningpathStatus,
  updateLearningpathStepSeqNo,
  updateLearningstep,
} from "../api/learningpathApi";
import {
  GQLLearningpath,
  GQLLearningpathCoverphoto,
  GQLLearningpathStep,
  GQLLearningpathStepOembed,
  GQLLearningpathStepResourceArgs,
  GQLMutationDeleteLearningpathArgs,
  GQLMutationNewLearningpathArgs,
  GQLMutationResolvers,
  GQLQueryLearningpathArgs,
  GQLResource,
  GQLMutationUpdateLearningpathArgs,
  GQLMutationNewLearningpathStepArgs,
  GQLMutationUpdateLearningpathStepArgs,
  GQLMutationDeleteLearningpathStepArgs,
  GQLMutationUpdateLearningpathStatusArgs,
  GQLMyNdlaLearningpath,
  GQLMyNdlaLearningpathStep,
  GQLExternalOpengraph,
  GQLMutationCopyLearningpathArgs,
  GQLLearningpathSeqNo,
  GQLMutationUpdateLearningpathStepSeqNoArgs,
  GQLLicense,
} from "../types/schema";
import { getNumberId, nodeToTaxonomyEntity, toGQLLearningpath, toGQLLearningstep } from "../utils/apiHelpers";
import { isNDLAEmbedUrl } from "../utils/articleHelpers";
import { transformArticle } from "../api/transformArticleApi";
import { searchNodes } from "../api/taxonomyApi";

export const Query = {
  async learningpath(
    _: any,
    { pathId }: GQLQueryLearningpathArgs,
    context: ContextWithLoaders,
  ): Promise<GQLLearningpath> {
    const learningpath = await fetchLearningpath(pathId, context);
    return toGQLLearningpath(learningpath);
  },
  async myNdlaLearningpath(
    _: any,
    { pathId }: GQLQueryLearningpathArgs,
    context: ContextWithLoaders,
  ): Promise<GQLMyNdlaLearningpath> {
    const learningpath = await fetchMyLearningpath(pathId, context);
    return toGQLLearningpath(learningpath);
  },
  async myLearningpaths(_: any, __: any, context: ContextWithLoaders): Promise<Array<GQLMyNdlaLearningpath>> {
    const learningpaths = await fetchMyLearningpaths(context);
    return learningpaths.map<GQLMyNdlaLearningpath>(toGQLLearningpath);
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

const getOembed = async (
  learningpathStep: GQLLearningpathStep,
  _: any,
  context: ContextWithLoaders,
): Promise<OEmbedDTO | null> => {
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
    return fetchOembed(learningpathStep.embedUrl.url, context);
  }
  return null;
};

const getResource = async (
  learningpathStep: LearningStepV2DTO,
  { rootId, parentId }: GQLLearningpathStepResourceArgs,
  context: ContextWithLoaders,
): Promise<GQLResource | null> => {
  if (learningpathStep.articleId) {
    const nodes = await searchNodes({ contentUris: [`urn:article:${learningpathStep.articleId}`] }, context);
    const node = nodes.results[0];
    if (node) {
      return nodeToTaxonomyEntity(node, context);
    }
  }
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
};

const getOpengraph = async (learningpathStep: GQLLearningpathStep): Promise<GQLExternalOpengraph | null> => {
  if (learningpathStep.embedUrl?.embedType !== "external") {
    return null;
  }

  return fetchOpengraph(learningpathStep.embedUrl.url);
};

const getCoverphoto = async (
  learningpath: GQLLearningpath,
  _: any,
  context: ContextWithLoaders,
): Promise<GQLLearningpathCoverphoto | undefined> => {
  let url: string | undefined;
  const imageId = getNumberId(learningpath.coverphoto?.metaUrl?.split("/").pop());
  if (imageId) {
    const image = await context.loaders.imagesLoader.load(imageId);
    url = image?.image?.imageUrl;
  } else {
    const learningStepWithArticle = learningpath.learningsteps.find((ls) => ls.articleId);
    const article = learningStepWithArticle?.articleId
      ? await context.loaders.articlesLoader.load(learningStepWithArticle.articleId.toString())
      : undefined;
    const imageId = getNumberId(article?.metaImage?.url.split("/").pop());
    const image = imageId ? await context.loaders.imagesLoader.load(imageId) : undefined;
    url = image?.image.imageUrl;
  }

  return url
    ? {
        metaUrl: learningpath.coverphoto?.metaUrl ?? "",
        url,
      }
    : undefined;
};

const getBasedOn = async (
  learningpath: GQLLearningpath,
  _: any,
  context: ContextWithLoaders,
): Promise<string | undefined> => {
  const originalId = learningpath.isBasedOn;
  if (!originalId) return undefined;
  const node = await context.loaders.searchNodesLoader.load(`urn:learningpath:${originalId}`);
  if (node.length === 0) {
    return `/learningpaths/${originalId}`;
  }
  return node[0]?.url;
};

const transformDescription = async (
  step: GQLLearningpathStep | GQLMyNdlaLearningpathStep,
  context: ContextWithLoaders,
): Promise<string | null> => {
  if (!step.description) return null;
  const res = await transformArticle(step.description, context, undefined, {});
  return res.content;
};

const transformIntroduction = async (
  step: GQLLearningpathStep | GQLMyNdlaLearningpathStep,
  context: ContextWithLoaders,
): Promise<string | null> => {
  if (!step.introduction) return null;
  const res = await transformArticle(step.introduction, context, undefined, {});
  return res.content;
};

const getLicense = async (learningstep: GQLLearningpathStep): Promise<GQLLicense | undefined> => {
  return learningstep.copyright?.license ?? undefined;
};

export const resolvers = {
  Learningpath: {
    coverphoto: getCoverphoto,
    basedOn: getBasedOn,
    introduction: transformIntroduction,
  },
  MyNdlaLearningpath: {
    coverphoto: getCoverphoto,
    basedOn: getBasedOn,
    introduction: transformIntroduction,
  },
  LearningpathStep: {
    oembed: getOembed,
    resource: getResource,
    opengraph: getOpengraph,
    description: transformDescription,
    license: getLicense,
  },
  MyNdlaLearningpathStep: {
    oembed: getOembed,
    resource: getResource,
    opengraph: getOpengraph,
    description: transformDescription,
    license: getLicense,
  },
};

export const Mutations: Pick<
  GQLMutationResolvers,
  | "updateLearningpathStatus"
  | "deleteLearningpath"
  | "newLearningpath"
  | "updateLearningpath"
  | "newLearningpathStep"
  | "updateLearningpathStep"
  | "deleteLearningpathStep"
  | "copyLearningpath"
  | "updateLearningpathStepSeqNo"
> = {
  async updateLearningpathStatus(_: any, params: GQLMutationUpdateLearningpathStatusArgs, context: ContextWithLoaders) {
    const learningpath = await updateLearningpathStatus(params, context);
    return toGQLLearningpath(learningpath);
  },
  async deleteLearningpath(_: any, params: GQLMutationDeleteLearningpathArgs, context: ContextWithLoaders) {
    return await deleteLearningpath(params.id, context);
  },
  async newLearningpath(
    _: any,
    params: GQLMutationNewLearningpathArgs,
    context: ContextWithLoaders,
  ): Promise<GQLMyNdlaLearningpath> {
    const learningpath = await createLearningpath(params, context);
    return toGQLLearningpath(learningpath);
  },
  async updateLearningpath(
    _: any,
    params: GQLMutationUpdateLearningpathArgs,
    context: ContextWithLoaders,
  ): Promise<GQLMyNdlaLearningpath> {
    const learningpath = await updateLearningpath(params, context);
    return toGQLLearningpath(learningpath);
  },
  async newLearningpathStep(
    _: any,
    params: GQLMutationNewLearningpathStepArgs,
    context: ContextWithLoaders,
  ): Promise<GQLMyNdlaLearningpathStep> {
    const learningstep = await createLearningstep(params, context);
    return toGQLLearningstep(learningstep);
  },
  async updateLearningpathStep(
    _: any,
    params: GQLMutationUpdateLearningpathStepArgs,
    context: ContextWithLoaders,
  ): Promise<GQLMyNdlaLearningpathStep> {
    const learningstep = await updateLearningstep(params, context);
    return toGQLLearningstep(learningstep);
  },
  async deleteLearningpathStep(_: any, params: GQLMutationDeleteLearningpathStepArgs, context: ContextWithLoaders) {
    return await deleteLearningstep(params, context);
  },
  async copyLearningpath(
    _: any,
    params: GQLMutationCopyLearningpathArgs,
    context: ContextWithLoaders,
  ): Promise<GQLMyNdlaLearningpath> {
    const learningpath = await copyLearningpath(params, context);
    return toGQLLearningpath(learningpath);
  },
  async updateLearningpathStepSeqNo(
    _: any,
    params: GQLMutationUpdateLearningpathStepSeqNoArgs,
    context: ContextWithLoaders,
  ): Promise<GQLLearningpathSeqNo> {
    return await updateLearningpathStepSeqNo(params, context);
  },
};
