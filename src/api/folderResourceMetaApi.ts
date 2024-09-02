/**
 * Copyright (c) 2022-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import groupBy from "lodash/groupBy";
import { IArticleV2 } from "@ndla/types-backend/article-api";
import { IAudioMetaInformation } from "@ndla/types-backend/audio-api";
import { IImageMetaInformationV2 } from "@ndla/types-backend/image-api";
import { Node } from "@ndla/types-taxonomy";
import { fetchArticles } from "./articleApi";
import { fetchAudio } from "./audioApi";
import { searchConcepts } from "./conceptApi";
import { fetchFolder } from "./folderApi";
import { fetchImage } from "./imageApi";
import { fetchLearningpaths } from "./learningpathApi";
import { searchNodes } from "./taxonomyApi";
import { fetchVideo } from "./videoApi";
import { defaultLanguage } from "../config";
import {
  GQLFolderResourceMeta,
  GQLFolderResourceMetaSearchInput,
  GQLFolderResourceResourceType,
  GQLMeta,
  GQLQueryFolderResourceMetaArgs,
  GQLQueryFolderResourceMetaSearchArgs,
  GQLSearchResult,
} from "../types/schema";
import { articleToMeta } from "../utils/articleHelpers";

type MetaType = "article" | "learningpath" | "multidisciplinary" | "concept" | "image" | "audio" | "video" | "folder";

const findResourceTypes = (result: Node | undefined, context: ContextWithLoaders): GQLFolderResourceResourceType[] => {
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
    return await fetchLearningpaths(ids, context);
  } else {
    const articles = await fetchArticles(ids, context);
    return articles.filter((article): article is IArticleV2 => !!article).map(articleToMeta);
  }
};

const fetchAndTransformResourceMeta = async (
  resources: GQLFolderResourceMetaSearchInput[] | undefined,
  context: ContextWithLoaders,
  type: "article" | "multidisciplinary" | "learningpath",
): Promise<GQLFolderResourceMeta[]> => {
  if (!resources?.length) return [];
  try {
    const nodeType = type === "learningpath" ? type : "article";
    const ids = resources.map((r) => r.id);
    const [nodes, elements] = await Promise.all([
      searchNodes({ contentUris: ids.map((r) => `urn:${nodeType}:${r}`) }, context),
      fetchResourceMeta(nodeType, ids, context),
    ]);
    return ids.map((id) => {
      const node = nodes.results.find((n) => n.contentUri === `urn:${nodeType}:${id}`);
      const element = elements.find((e) => e?.id === Number(id));
      return {
        id,
        title: element?.title ?? "",
        type,
        description: element?.metaDescription ?? "",
        metaImage: element?.metaImage,
        resourceTypes: findResourceTypes(node, context),
      };
    });
  } catch (e) {
    console.error(`Failed to fetch article metas with parameters ${resources}`);
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
  } else if (resource.resourceType === "folder") {
    const res = await fetchFolderMeta([resource], context, "folder");
    return res[0] ?? null;
  }
  throw Error(`Resource type '${resource.resourceType}' not supported`);
};

export const fetchFolderMeta = async (
  resources: GQLFolderResourceMetaSearchInput[] | undefined,
  context: ContextWithLoaders,
  type: MetaType,
): Promise<GQLFolderResourceMeta[]> => {
  if (!resources?.length) return [];
  const folders = await Promise.all(resources.map(async (r) => await fetchFolder({ id: r.id }, context)));

  return folders.map((f) => ({
    description: f.description ?? "",
    id: f.id,
    resourceTypes: [{ id: "folder", name: "folder" }],
    title: f.name,
    type,
  }));
};

export const fetchImageMeta = async (
  resources: GQLFolderResourceMetaSearchInput[] | undefined,
  context: ContextWithLoaders,
  type: MetaType,
): Promise<GQLFolderResourceMeta[]> => {
  if (!resources?.length) return [];
  const images = await Promise.all(resources.map(async (r) => await fetchImage(r.id, context)));
  const imagesFiltered = images.filter((i): i is IImageMetaInformationV2 => !!i);

  return imagesFiltered.map((img) => ({
    description: img.caption.caption ?? "",
    id: img.id,
    metaImage: {
      url: img.imageUrl,
      alt: img.alttext.alttext ?? "",
    },
    resourceTypes: [{ id: "image", name: "image" }],
    title: img.title.title,
    type,
  }));
};

const fetchAudios = async (
  resources: GQLFolderResourceMetaSearchInput[] | undefined,
  context: ContextWithLoaders,
  type: MetaType,
): Promise<GQLFolderResourceMeta[]> => {
  if (!resources?.length) return [];
  const audios = await Promise.all(resources.map((r) => fetchAudio(context, r.id)));
  const audiosFiltered = audios.filter((a): a is IAudioMetaInformation => !!a);

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
    resourceTypes: [{ id: "audio", name: "audio" }],
    type,
  }));
};

const fetchBrightcoves = async (
  resources: GQLFolderResourceMetaSearchInput[] | undefined,
  context: ContextWithLoaders,
  type: MetaType,
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
    resourceTypes: [{ id: "video", name: "video" }],
    title: video.name ?? "",
    type,
  }));
};

const fetchConceptsMeta = async (
  resources: GQLFolderResourceMetaSearchInput[] | undefined,
  context: ContextWithLoaders,
  type: MetaType,
): Promise<GQLFolderResourceMeta[]> => {
  const ids = resources?.map((r) => parseInt(r.id))?.filter((id) => !!id);
  if (!ids?.length) return [];

  const { results } = await searchConcepts({ ids }, context);

  return results.map((c) => ({
    id: c.id.toString(),
    description: c.content.content,
    metaImage: c.metaImage,
    title: c.title.title,
    resourceTypes: [{ id: "concept", name: "concept" }],
    type,
  }));
};

export const fetchFolderResourcesMetaData = async (
  { resources }: GQLQueryFolderResourceMetaSearchArgs,
  context: ContextWithLoaders,
): Promise<GQLFolderResourceMeta[]> => {
  const { article, learningpath, multidisciplinary, concept, image, audio, video, folder } = groupBy(
    resources,
    (r) => r.resourceType,
  );
  const articleMeta = fetchAndTransformResourceMeta(article, context, "article");
  const learningpathMeta = fetchAndTransformResourceMeta(learningpath, context, "learningpath");

  const multidisciplinaryMeta = fetchAndTransformResourceMeta(multidisciplinary, context, "multidisciplinary");

  const imageMeta = fetchImageMeta(image, context, "image");

  const conceptMeta = fetchConceptsMeta(concept, context, "concept");
  const audioMeta = fetchAudios(audio, context, "audio");
  const videoMeta = fetchBrightcoves(video, context, "video");
  const folderMeta = fetchFolderMeta(folder, context, "folder");

  const results = await Promise.all([
    articleMeta,
    learningpathMeta,
    multidisciplinaryMeta,
    conceptMeta,
    imageMeta,
    audioMeta,
    videoMeta,
    folderMeta,
  ]);
  return results.flat();
};
