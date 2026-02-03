/**
 * Copyright (c) 2022-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { ArticleV2DTO } from "@ndla/types-backend/article-api";
import { AudioMetaInformationDTO } from "@ndla/types-backend/audio-api";
import { ImageMetaInformationV3DTO } from "@ndla/types-backend/image-api";
import { LearningPathV2DTO } from "@ndla/types-backend/learningpath-api";
import { ResourceType } from "@ndla/types-backend/myndla-api";
import { Node } from "@ndla/types-taxonomy";
import groupBy from "lodash/groupBy";
import { defaultLanguage } from "../config";
import {
  GQLFolderResourceMeta,
  GQLFolderResourceMetaSearchInput,
  GQLFolderResourceResourceType,
  GQLMeta,
  GQLQueryFolderResourceMetaArgs,
  GQLQueryFolderResourceMetaSearchArgs,
} from "../types/schema";
import { articleToMeta, learningpathToMeta } from "../utils/apiHelpers";
import getLogger from "../utils/logger";
import { fetchAudio } from "./audioApi";
import { searchConcepts } from "./conceptApi";
import { fetchImageV3 } from "./imageApi";
import { fetchVideo } from "./videoApi";

const findResourceTypes = (result: Node | null, context: ContextWithLoaders): GQLFolderResourceResourceType[] => {
  const ctx = result?.contexts?.[0];
  const resourceTypes = ctx?.resourceTypes.map((t) => ({
    id: t.id,
    name: t.name[context.language] || t.name[defaultLanguage] || "",
    language: context.language,
  }));
  return resourceTypes ?? [];
};

const fetchResourceMeta = async (
  type: "article" | "learningpath",
  ids: string[],
  context: ContextWithLoaders,
): Promise<Array<GQLMeta | undefined>> => {
  if (type === "learningpath") {
    const numberIds = ids.map((id) => parseInt(id)).filter((id) => !!id);
    const learningpaths = await context.loaders.learningpathsLoader.loadMany(numberIds);
    return learningpaths
      .filter((learningpath): learningpath is LearningPathV2DTO => !!learningpath)
      .map(learningpathToMeta);
  } else {
    const articles = await context.loaders.articlesLoader.loadMany(ids);
    return articles.filter((article): article is ArticleV2DTO => !!article).map(articleToMeta);
  }
};

const fetchAndTransformResourceMeta = async (
  resources: GQLFolderResourceMetaSearchInput[] | undefined,
  context: ContextWithLoaders,
  type: "article" | "multidisciplinary" | "learningpath" | "topic",
): Promise<GQLFolderResourceMeta[]> => {
  if (!resources?.length) return [];
  try {
    const nodeType = type === "learningpath" ? type : "article";
    const ids = resources.map((r) => r.id);
    const [nodes, elements] = await Promise.all([
      context.loaders.searchNodesLoader.loadMany(ids.map((r) => `urn:${nodeType}:${r}`)),
      fetchResourceMeta(nodeType, ids, context),
    ]);
    return ids
      .map((id) => {
        const node = nodes.flatMap((x) => x).find((n) => !!n && n.contentUri === `urn:${nodeType}:${id}`);
        const element = elements.find((e) => e?.id === Number(id));
        return element
          ? {
              id,
              title: element.title,
              type,
              description: element.metaDescription ?? "",
              metaImage: element.metaImage,
              resourceTypes: findResourceTypes(node ?? null, context),
              traits: element.traits,
            }
          : undefined;
      })
      .filter((meta) => !!meta);
  } catch (e) {
    getLogger().error(`Failed to fetch article metas with parameters: ${JSON.stringify(resources)}`, resources);
    return [];
  }
};

export const fetchFolderResourceMeta = async (
  { resource }: GQLQueryFolderResourceMetaArgs,
  context: ContextWithLoaders,
): Promise<GQLFolderResourceMeta | null> => {
  if (resource.resourceType === "article") {
    const res = await fetchAndTransformResourceMeta([resource], context, "article");
    return res[0] ?? null;
  } else if (resource.resourceType === "learningpath") {
    const res = await fetchAndTransformResourceMeta([resource], context, "learningpath");
    return res[0] ?? null;
  } else if (resource.resourceType === "multidisciplinary") {
    const res = await fetchAndTransformResourceMeta([resource], context, "multidisciplinary");
    return res[0] ?? null;
  } else if (resource.resourceType === "topic") {
    const res = await fetchAndTransformResourceMeta([resource], context, "topic");
    return res[0] ?? null;
  } else if (resource.resourceType === "image") {
    const res = await fetchImageMeta([resource], context, "image");
    return res[0] ?? null;
  } else if (resource.resourceType === "audio") {
    const res = await fetchAudios([resource], context, "audio");
    return res[0] ?? null;
  } else if (resource.resourceType === "concept") {
    const res = await fetchConceptsMeta([resource], context, "concept");
    return res[0] ?? null;
  } else if (resource.resourceType === "video") {
    const res = await fetchBrightcoves([resource], context, "video");
    return res[0] ?? null;
  }
  throw Error(`Resource type '${resource.resourceType}' not supported`);
};

export const fetchImageMeta = async (
  resources: GQLFolderResourceMetaSearchInput[] | undefined,
  context: ContextWithLoaders,
  type: ResourceType,
): Promise<GQLFolderResourceMeta[]> => {
  if (!resources?.length) return [];
  const images = await Promise.all(resources.map(async (r) => await fetchImageV3(r.id, context).catch(() => null)));
  const imagesFiltered = images.filter((i): i is ImageMetaInformationV3DTO => !!i);

  return imagesFiltered.map((img) => ({
    description: img.caption.caption ?? "",
    id: img.id,
    metaImage: {
      url: img.image.imageUrl,
      alt: img.alttext.alttext ?? "",
    },
    resourceTypes: [],
    title: img.title.title,
    type,
  }));
};

const fetchAudios = async (
  resources: GQLFolderResourceMetaSearchInput[] | undefined,
  context: ContextWithLoaders,
  type: ResourceType,
): Promise<GQLFolderResourceMeta[]> => {
  if (!resources?.length) return [];
  const audios = await Promise.all(resources.map((r) => fetchAudio(context, r.id)));
  const audiosFiltered = audios.filter((a): a is AudioMetaInformationDTO => !!a);

  return audiosFiltered.map((audio) => ({
    description: audio.podcastMeta?.introduction ?? "",
    id: audio.id.toString(),
    metaImage: audio.podcastMeta
      ? {
          url: audio.podcastMeta.coverPhoto.url,
          alt: audio.podcastMeta.coverPhoto.altText,
        }
      : undefined,
    title: audio.title.title,
    resourceTypes: [],
    type,
  }));
};

const fetchBrightcoves = async (
  resources: GQLFolderResourceMetaSearchInput[] | undefined,
  context: ContextWithLoaders,
  type: ResourceType,
): Promise<GQLFolderResourceMeta[]> => {
  if (!resources?.length) return [];
  const brightcoves = await Promise.all(resources.map((r) => fetchVideo(r.id.toString(), undefined, context)));

  return brightcoves.map((video) => ({
    description: video.description ?? "",
    id: video.id,
    metaImage: video.images?.poster?.src
      ? {
          url: video.images.poster.src,
          alt: "",
        }
      : undefined,
    resourceTypes: [],
    title: video.name ?? "",
    type,
  }));
};

const fetchConceptsMeta = async (
  resources: GQLFolderResourceMetaSearchInput[] | undefined,
  context: ContextWithLoaders,
  type: ResourceType,
): Promise<GQLFolderResourceMeta[]> => {
  const ids = resources?.map((r) => parseInt(r.id))?.filter((id) => !!id);
  if (!ids?.length) return [];

  const { results } = await searchConcepts({ ids }, context);

  return results.map((c) => ({
    id: c.id.toString(),
    description: c.content.content,
    title: c.title.title,
    resourceTypes: [],
    type,
  }));
};

export const fetchFolderResourcesMetaData = async (
  { resources }: GQLQueryFolderResourceMetaSearchArgs,
  context: ContextWithLoaders,
): Promise<GQLFolderResourceMeta[]> => {
  const { article, learningpath, topic, multidisciplinary, concept, image, audio, video } = groupBy(
    resources,
    (r) => r.resourceType,
  );
  const articleMeta = fetchAndTransformResourceMeta(article, context, "article");
  const learningpathMeta = fetchAndTransformResourceMeta(learningpath, context, "learningpath");
  const topicMeta = fetchAndTransformResourceMeta(topic, context, "topic");
  const multidisciplinaryMeta = fetchAndTransformResourceMeta(multidisciplinary, context, "multidisciplinary");

  const imageMeta = fetchImageMeta(image, context, "image");

  const conceptMeta = fetchConceptsMeta(concept, context, "concept");
  const audioMeta = fetchAudios(audio, context, "audio");
  const videoMeta = fetchBrightcoves(video, context, "video");

  const results = await Promise.all([
    articleMeta,
    learningpathMeta,
    topicMeta,
    multidisciplinaryMeta,
    conceptMeta,
    imageMeta,
    audioMeta,
    videoMeta,
  ]);
  return results.flat();
};
