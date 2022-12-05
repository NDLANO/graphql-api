// @ts-strict-ignore
/**
 * Copyright (c) 2022-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { groupBy } from 'lodash';
import {
  GQLFolderResourceMeta,
  GQLFolderResourceMetaSearchInput,
  GQLFolderResourceResourceType,
  GQLQueryFolderResourceMetaArgs,
  GQLQueryFolderResourceMetaSearchArgs,
  GQLSearchResult,
} from '../types/schema';
import { searchWithoutPagination } from './searchApi';

const articleResourceTypes = [
  'urn:resourcetype:subjectMaterial',
  'urn:resourcetype:tasksAndActivities',
  'urn:resourcetype:reviewResource',
  'urn:resourcetype:SourceMaterial',
  'urn:resourcetype:externalResource',
];

const learningpathResourceTypes = ['urn:resourcetype:learningPath'];

type MetaType = 'article' | 'learningpath' | 'multidisciplinary';

const findResourceTypes = (
  result: GQLSearchResult,
  resources: GQLFolderResourceMetaSearchInput[],
): GQLFolderResourceResourceType[] => {
  const resource = resources.find(r => result.id === r.id);
  const context = result.contexts?.find(cx => cx.path === resource.path);
  const resourceTypes = context?.resourceTypes?.map(t => ({
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
      id: r.id,
      title: r.title,
      type,
      description: r.metaDescription,
      metaImage: r.metaImage,
      resourceTypes: findResourceTypes(r, resources),
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
      id: r.id,
      title: r.title,
      type,
      description: r.metaDescription,
      metaImage: r.metaImage,
      resourceTypes: findResourceTypes(r, resources),
    }));
  } catch (e) {
    console.error(`Failed to fetch article metas with parameters ${resources}`);
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
  } else {
    const res = await fetchAndTransformMultidisciplinaryTopicMeta(
      [resource],
      context,
      'multidisciplinary',
    );
    return res[0];
  }
};

export const fetchFolderResourcesMetaData = async (
  { resources }: GQLQueryFolderResourceMetaSearchArgs,
  context: ContextWithLoaders,
): Promise<GQLFolderResourceMeta[]> => {
  const { article, learningpath, multidisciplinary } = groupBy(
    resources,
    r => r.resourceType,
  );
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

  const results = await Promise.all([
    articleMeta,
    learningpathMeta,
    multidisciplinaryMeta,
  ]);
  return results.flat();
};
