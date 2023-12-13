/**
 * Copyright (c) 2022-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

// @ts-strict-ignore

import groupBy from 'lodash/groupBy';
import { fetchAudio } from './audioApi';
import { searchConcepts } from './conceptApi';
import { fetchImage } from './imageApi';
import { searchWithoutPagination } from './searchApi';
import { fetchVideo } from './videoApi';
import {
  GQLFolderResourceMeta,
  GQLFolderResourceMetaSearchInput,
  GQLFolderResourceResourceType,
  GQLQueryFolderResourceMetaArgs,
  GQLQueryFolderResourceMetaSearchArgs,
  GQLSearchResult,
} from '../types/schema';

const articleResourceTypes = [
  'urn:resourcetype:subjectMaterial',
  'urn:resourcetype:tasksAndActivities',
  'urn:resourcetype:reviewResource',
  'urn:resourcetype:SourceMaterial',
  'urn:resourcetype:externalResource',
];

const learningpathResourceTypes = ['urn:resourcetype:learningPath'];

type MetaType =
  | 'article'
  | 'learningpath'
  | 'multidisciplinary'
  | 'concept'
  | 'image'
  | 'audio'
  | 'video';

const findResourceTypes = (
  result: GQLSearchResult,
): GQLFolderResourceResourceType[] => {
  const context = result.contexts?.[0];
  const resourceTypes = context?.resourceTypes.map(t => ({
    id: t.id,
    name: t.name,
    language: t.language,
  }));
  return resourceTypes ?? [];
};

const fetchAndTransformMultidisciplinaryTopicMeta = async (
  resources: GQLFolderResourceMetaSearchInput[] | undefined,
  context: ContextWithLoaders,
  type: MetaType,
) => {
  if (!resources?.length) return [];
  try {
    const res = await searchWithoutPagination(
      {
        language: context.language,
        fallback: 'true',
        // @ts-ignore ids are not parameterized correctly
        ids: resources.map(r => r.id).join(','),
        subjects: 'urn:subject:d1fe9d0a-a54d-49db-a4c2-fd5463a7c9e7',
      },
      context,
    );
    return res.results.map(r => ({
      id: r.id.toString(),
      title: r.title,
      type,
      description: r.metaDescription,
      metaImage: r.metaImage,
      resourceTypes: findResourceTypes(r),
    }));
  } catch (e) {
    console.error(
      `Failed to fetch multidisciplinary topic metas with parameters ${resources}`,
    );
    return [];
  }
};

const fetchAndTransformArticleMeta = async (
  resources: GQLFolderResourceMetaSearchInput[] | undefined,
  context: ContextWithLoaders,
  type: MetaType,
  resourceTypes: string[],
): Promise<GQLFolderResourceMeta[]> => {
  if (!resources?.length) return [];
  try {
    const res = await searchWithoutPagination(
      {
        language: context.language,
        fallback: 'true',
        // @ts-ignore ids are not parameterized correctly
        ids: resources.map(r => r.id).join(','),
        resourceTypes: resourceTypes.join(','),
      },
      context,
    );

    return res.results.map(r => ({
      id: r.id.toString(),
      title: r.title,
      type,
      description: r.metaDescription,
      metaImage: r.metaImage,
      resourceTypes: findResourceTypes(r),
    }));
  } catch (e) {
    console.error(
      `Failed to fetch article metas with parameters ${resources} and resource types ${resourceTypes}`,
    );
    return [];
  }
};

export const fetchFolderResourceMeta = async (
  { resource }: GQLQueryFolderResourceMetaArgs,
  context: ContextWithLoaders,
): Promise<GQLFolderResourceMeta> => {
  if (resource.resourceType === 'article') {
    const res = await fetchAndTransformArticleMeta(
      [resource],
      context,
      'article',
      articleResourceTypes,
    );
    return res[0];
  } else if (resource.resourceType === 'learningpath') {
    const res = await fetchAndTransformArticleMeta(
      [resource],
      context,
      'learningpath',
      learningpathResourceTypes,
    );
    return res[0];
  } else if (resource.resourceType === 'multidisciplinary') {
    const res = await fetchAndTransformMultidisciplinaryTopicMeta(
      [resource],
      context,
      'multidisciplinary',
    );
    return res[0];
  } else if (resource.resourceType === 'image') {
    const res = await fetchImageMeta([resource], context, 'image');
    return res[0];
  } else if (resource.resourceType === 'audio') {
    const res = await fetchAudios([resource], context, 'audio');
    return res[0];
  } else if (resource.resourceType === 'concept') {
    const res = await fetchConceptsMeta([resource], context, 'concept');
    return res[0];
  } else if (resource.resourceType === 'video') {
    const res = await fetchBrightcoves([resource], context, 'video');
    return res[0];
  }
};

export const fetchImageMeta = async (
  resources: GQLFolderResourceMetaSearchInput[] | undefined,
  context: ContextWithLoaders,
  type: MetaType,
): Promise<GQLFolderResourceMeta[]> => {
  if (!resources?.length) return [];
  const images = await Promise.all(
    resources.map(async r => await fetchImage(r.id, context)),
  );

  return images.map(img => ({
    description: img.caption.caption ?? '',
    id: img.id,
    metaImage: {
      url: img.imageUrl,
      alt: img.alttext.alttext ?? '',
    },
    resourceTypes: [{ id: 'image', name: 'image' }],
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
  const audios = await Promise.all(
    resources.map(r => fetchAudio(context, r.id)),
  );

  return audios.map(audio => ({
    description: audio.podcastMeta?.introduction ?? '',
    id: audio.id.toString(),
    metaImage: audio.podcastMeta
      ? {
          url: audio.podcastMeta.coverPhoto.url,
          alt: audio.podcastMeta.coverPhoto.altText,
        }
      : undefined,
    title: audio.title.title,
    resourceTypes: [{ id: 'audio', name: 'audio' }],
    type,
  }));
};

const fetchBrightcoves = async (
  resources: GQLFolderResourceMetaSearchInput[] | undefined,
  context: ContextWithLoaders,
  type: MetaType,
): Promise<GQLFolderResourceMeta[]> => {
  if (!resources?.length) return [];
  const brightcoves = await Promise.all(
    resources.map(r => fetchVideo(r.id.toString(), undefined, context)),
  );

  return brightcoves.map(video => ({
    description: video.description ?? '',
    id: video.id,
    metaImage: video.images?.poster?.src
      ? {
          url: video.images.poster.src,
          alt: '',
        }
      : undefined,
    resourceTypes: [{ id: 'video', name: 'video' }],
    title: video.name,
    type,
  }));
};

const fetchConceptsMeta = async (
  resources: GQLFolderResourceMetaSearchInput[] | undefined,
  context: ContextWithLoaders,
  type: MetaType,
): Promise<GQLFolderResourceMeta[]> => {
  const ids = resources?.map(r => parseInt(r.id))?.filter(id => !!id);
  if (!ids?.length) return [];

  const { concepts } = await searchConcepts({ ids }, context);

  return concepts.map(c => ({
    id: c.id.toString(),
    description: c.content,
    metaImage: c.metaImage,
    title: c.title,
    resourceTypes: [{ id: 'concept', name: 'concept' }],
    type,
  }));
};

export const fetchFolderResourcesMetaData = async (
  { resources }: GQLQueryFolderResourceMetaSearchArgs,
  context: ContextWithLoaders,
): Promise<GQLFolderResourceMeta[]> => {
  const {
    article,
    learningpath,
    multidisciplinary,
    concept,
    image,
    audio,
    video,
  } = groupBy(resources, r => r.resourceType);
  const articleMeta = fetchAndTransformArticleMeta(
    article,
    context,
    'article',
    articleResourceTypes,
  );
  const learningpathMeta = fetchAndTransformArticleMeta(
    learningpath,
    context,
    'learningpath',
    learningpathResourceTypes,
  );

  const multidisciplinaryMeta = fetchAndTransformMultidisciplinaryTopicMeta(
    multidisciplinary,
    context,
    'multidisciplinary',
  );

  const imageMeta = fetchImageMeta(image, context, 'image');

  const conceptMeta = fetchConceptsMeta(concept, context, 'concept');
  const audioMeta = fetchAudios(audio, context, 'audio');
  const videoMeta = fetchBrightcoves(video, context, 'video');

  const results = await Promise.all([
    articleMeta,
    learningpathMeta,
    multidisciplinaryMeta,
    conceptMeta,
    imageMeta,
    audioMeta,
    videoMeta,
  ]);
  return results.flat();
};
