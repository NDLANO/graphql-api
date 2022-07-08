/**
 * Copyright (c) 2022-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { groupBy } from 'lodash';
import { searchWithoutPagination } from './searchApi';

const articleResourceTypes = [
  'urn:resourcetype:subjectMaterial',
  'urn:resourcetype:tasksAndActivities',
  'urn:resourcetype:reviewResource',
  'urn:resourcetype:SourceMaterial',
  'urn:resourcetype:externalResource',
];

const learningpathResourceTypes = ['urn:resourcetype:learningPath'];

const findResourceTypes = (
  result: GQLSearchResult,
  resources: GQLFolderResourceMetaSearchInput[],
): GQLFolderResourceResourceType[] => {
  const resource = resources.find(r => result.id === r.id);
  const context = result.contexts.find(cx => cx.path === resource.path);
  return context?.resourceTypes ?? [];
};

const fetchAndTransformArticleMeta = async (
  resources: GQLFolderResourceMetaSearchInput[] | undefined,
  context: ContextWithLoaders,
  type: 'article' | 'learningpath',
  resourceTypes: string[],
): Promise<GQLFolderResourceMeta[]> => {
  if (!resources?.length) return [];
  const res = await searchWithoutPagination(
    {
      //@ts-ignore ids are not parameterized correctly
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
};

export const fetchFolderResourceMeta = async (
  { resource }: QueryToFolderResourceMetaArgs,
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
  } else {
    const res = await fetchAndTransformArticleMeta(
      [resource],
      context,
      'learningpath',
      learningpathResourceTypes,
    );
    return res[0];
  }
};

export const fetchFolderResourcesMetaData = async (
  { resources }: QueryToFolderResourceMetaSearchArgs,
  context: ContextWithLoaders,
): Promise<GQLFolderResourceMeta[]> => {
  const { article, learningpath } = groupBy(resources, r => r.resourceType);
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

  const results = await Promise.all([articleMeta, learningpathMeta]);
  return results.flat();
};
