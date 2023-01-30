/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Response } from 'node-fetch';
import qs from 'query-string';
import {
  GQLMoviePath,
  GQLMovieResourceTypes,
  GQLQueryResourceArgs,
  GQLResource,
  GQLResourceType,
  GQLResourceTypeDefinition,
  GQLSubject,
  GQLTaxonomyEntity,
  GQLTopic,
} from '../types/schema';
import { fetch, resolveJson } from '../utils/apiHelpers';
import { findPrimaryPath } from '../utils/articleHelpers';

interface FetchNodeResourcesParams {
  topic: Node;
  relevance: string;
  subjectId?: string;
}
interface TaxonomyTranslation {
  name: string;
  language: string;
}

interface TaxonomyMetadata {
  customFields: Record<string, string>;
  grepCodes: string[];
  visible: boolean;
}

export interface Node {
  contentUri?: string;
  id: string;
  metadata: TaxonomyMetadata;
  name: string;
  path: string;
  paths: string[];
  relevanceId?: string;
  supportedLanguages: string[];
  translations: TaxonomyTranslation[];
}

async function taxonomyFetch(
  path: string,
  context: Context,
  options?: RequestOptions,
): Promise<Response> {
  return fetch(path, context, { ...options, useTaxonomyCache: true });
}

export async function fetchResource(
  { id, subjectId, topicId }: GQLQueryResourceArgs,
  context: ContextWithLoaders,
): Promise<GQLResource> {
  const query = qs.stringify({
    language: context.language,
  });
  const response = await taxonomyFetch(
    `/${context.taxonomyUrl}/v1/resources/${id}/full?${query}`,
    context,
  );
  const resource: GQLResource = await resolveJson(response);
  // TODO: Replace parent-filtering with changes in taxonomy
  const data = await context.loaders.subjectsLoader.load({
    filterVisible: true,
  });
  const paths = resource.paths?.filter(p => {
    const sId = p.split('/')[1];
    const parentSubject = data.subjects.find(
      subject => subject.id === `urn:${sId}`,
    );
    return parentSubject?.metadata.visible === true;
  });
  let path = paths[0];

  if (subjectId) {
    const primaryPath = findPrimaryPath(paths, subjectId, topicId);
    path = primaryPath ? primaryPath : path;
  }

  let rank;
  let relevanceId;
  if (topicId) {
    const parent = resource.parents?.find(topic => topic.id === topicId);
    rank = parent?.rank;
    relevanceId = parent?.relevanceId || 'urn:relevance:core';
  }

  return { ...resource, path, paths, rank, relevanceId };
}

export async function fetchResourceTypes<
  T extends GQLResourceType | GQLResourceTypeDefinition
>(context: Context): Promise<T[]> {
  const query = qs.stringify({
    language: context.language,
  });
  const response = await taxonomyFetch(
    `/${context.taxonomyUrl}/v1/resource-types?${query}`,
    context,
  );
  return resolveJson(response);
}

export async function fetchSubjects(
  context: Context,
  metadataFilter?: {
    key: string;
    value?: string;
  },
  isVisible?: boolean,
): Promise<GQLSubject[]> {
  const query = qs.stringify({
    language: context.language,
    key: metadataFilter?.key,
    value: metadataFilter?.value,
    nodeType: 'SUBJECT',
    isVisible,
  });
  const response = await taxonomyFetch(
    `/${context.taxonomyUrl}/v1/nodes/?${query}`,
    context,
  );
  return resolveJson(response);
}

export async function fetchSubject(
  context: Context,
  id: string,
): Promise<GQLSubject> {
  const query = qs.stringify({ language: context.language });
  const response = await taxonomyFetch(
    `/${context.taxonomyUrl}/v1/nodes/${id}?${query}`,
    context,
  );
  return resolveJson(response);
}

export async function fetchSubjectTyped(
  context: Context,
  id: string,
): Promise<Node> {
  const query = qs.stringify({ language: context.language });
  const response = await taxonomyFetch(
    `/${context.taxonomyUrl}/v1/nodes/${id}?${query}`,
    context,
  );
  return resolveJson(response);
}

export async function fetchSubjectsTyped(
  context: Context,
  isVisible?: boolean,
): Promise<Node> {
  const query = qs.stringify({
    language: context.language,
    nodeType: 'SUBJECT',
    isVisible,
  });

  const response = await taxonomyFetch(
    `/${context.taxonomyUrl}/v1/nodes/?${query}`,
    context,
  );
  return resolveJson(response);
}

export async function fetchSubjectTopics(
  subjectId: string,
  context: Context,
): Promise<GQLTopic[]> {
  const query = qs.stringify({
    recursive: true,
    nodeType: 'TOPIC',
    language: context.language,
  });
  const response = await taxonomyFetch(
    `/${context.taxonomyUrl}/v1/nodes/${subjectId}/nodes?${query}`,
    context,
  );
  return resolveJson(response);
}

export async function fetchTopics(
  args: { contentUri?: string },
  context: Context,
): Promise<GQLTopic[]> {
  const query = qs.stringify({
    contentURI: args.contentUri ?? '',
    nodeType: 'TOPIC',
    language: context.language,
  });
  const response = await taxonomyFetch(
    `/${context.taxonomyUrl}/v1/nodes/?${query}`,
    context,
  );
  return resolveJson(response);
}

export async function fetchTopic(params: { id: string }, context: Context) {
  const { id } = params;
  const query = qs.stringify({
    language: context.language,
  });
  const response = await taxonomyFetch(
    `/${context.taxonomyUrl}/v1/nodes/${id}?${query}`,
    context,
  );
  const topic: GQLTopic = await resolveJson(response);
  return topic;
}

export async function fetchSubtopics(
  params: { id: string },
  context: Context,
): Promise<GQLTopic[]> {
  const { id } = params;
  const query = qs.stringify({
    nodeType: 'TOPIC',
    language: context.language,
  });
  const response = await taxonomyFetch(
    `/${context.taxonomyUrl}/v1/nodes/${id}/nodes/?${query}`,
    context,
  );
  return resolveJson(response);
}

export async function fetchTopicResources(
  params: FetchNodeResourcesParams,
  context: Context,
): Promise<GQLResource[]> {
  const { subjectId, relevance, topic } = params;
  const query = qs.stringify({
    language: context.language,
    relevance: relevance ?? '',
  });
  const response = await taxonomyFetch(
    `/${context.taxonomyUrl}/v1/nodes/${topic.id}/resources/?${query}`,
    context,
  );
  const resources: GQLTaxonomyEntity[] = await resolveJson(response);
  resources.forEach(resource => {
    if (subjectId) {
      const primaryPath = findPrimaryPath(resource.paths, subjectId, topic.id);
      const path = primaryPath ? primaryPath : resource.path;
      resource.path = path;
    }
  });
  return resources;
}

export async function fetchResourcesAndTopics(
  params: { ids: string[]; subjectId?: string },
  context: ContextWithLoaders,
): Promise<GQLTaxonomyEntity[]> {
  const { ids, ...args } = params;
  return Promise.all(
    ids.map(id => {
      if (id.startsWith('urn:topic')) {
        return fetchTopic({ id, ...args }, context);
      }
      return fetchResource({ id, ...args }, context);
    }),
  );
}

export async function queryTopicsOnContentURI(
  id: string,
  context: Context,
): Promise<GQLTopic> {
  const response = await fetch(
    `/${context.taxonomyUrl}/v1/nodes?contentURI=${id}`,
    context,
  );
  const json = await resolveJson(response);

  const taxonomy = json.find((item: { contentUri: string }) => {
    return item.contentUri === id;
  });
  return taxonomy;
}

export async function queryResourcesOnContentURI<
  T extends GQLMoviePath | GQLMovieResourceTypes | GQLResource
>(id: string, context: Context): Promise<T> {
  const response = await fetch(
    `/${context.taxonomyUrl}/v1/resources?contentURI=${id}`,
    context,
  );
  const json = await resolveJson(response);

  const taxonomy = json.find((item: { contentUri: string }) => {
    return item.contentUri === id;
  });
  return taxonomy;
}

interface VersionType {
  id: string;
  versionType: 'BETA' | 'ARCHIVED' | 'PUBLISHED';
  name: string;
  hash: string;
  locked: boolean;
  published?: string;
  archived?: string;
}

export async function fetchVersion(
  hash: string,
  context: Context,
): Promise<VersionType | undefined> {
  const response = await fetch(
    `/${context.taxonomyUrl}/v1/versions?hash=${hash}`,
    { ...context, versionHash: 'default' },
  );
  if (response.status === 404) {
    return {
      id: '',
      versionType: 'BETA',
      name: 'Draft',
      hash: 'default',
      locked: false,
    };
  }
  const json = await resolveJson(response);
  return json?.[0];
}
