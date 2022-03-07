/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { fetch, resolveJson } from '../utils/apiHelpers';
import { findPrimaryPath, getArticleIdFromUrn } from '../utils/articleHelpers';
import qs from 'query-string';

interface Topic {
  id: string;
  path: string;
}
interface FetchTopicResourcesParams {
  topic: Topic;
  relevance: string;
  filters?: string;
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

export interface Subject {
  contentUri: string | null;
  id: string;
  metadata: TaxonomyMetadata;
  name: string;
  path: string;
  paths: string[];
  relevanceId: string | null;
  supportedLanguages: string[];
  translations: TaxonomyTranslation[];
}

export async function fetchResource(
  { id, subjectId, topicId }: QueryToResourceArgs,
  context: ContextWithLoaders,
): Promise<GQLResource> {
  const response = await fetch(
    `/${context.taxonomyUrl}/v1/resources/${id}/full?language=${context.language}`,
    context,
  );
  const resource: GQLResource = await resolveJson(response);
  // TODO: Replace parent-filtering with changes in taxonomy
  const data = await context.loaders.subjectsLoader.load({ visible: true });
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
    const parent = resource.parentTopics.find(topic => topic.id === topicId);
    rank = parent?.rank;
    relevanceId = parent?.relevanceId || 'urn:relevance:core';
  }

  return { ...resource, path, paths, rank, relevanceId };
}

export async function fetchResourceTypes(
  context: Context,
): Promise<GQLResourceTypeDefinition[]> {
  const response = await fetch(
    `/${context.taxonomyUrl}/v1/resource-types?language=${context.language}`,
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
    isVisible,
  });
  const response = await fetch(
    `/${context.taxonomyUrl}/v1/subjects/?${query}`,
    context,
  );
  return resolveJson(response);
}

export async function fetchSubject(
  context: Context,
  id: string,
  metadataFilter?: {
    key: string;
    value?: string;
  },
): Promise<GQLSubject> {
  const query = qs.stringify({
    language: context.language,
    key: metadataFilter?.key,
    value: metadataFilter?.value,
  });

  const response = await fetch(
    `/${context.taxonomyUrl}/v1/subjects/${id}?${query}`,
    context,
  );
  return resolveJson(response);
}

export async function fetchSubjectTyped(
  context: Context,
  id: string,
  isVisible?: boolean,
): Promise<Subject> {
  const query = qs.stringify({
    language: context.language,
    isVisible,
  });
  const response = await fetch(
    `/${context.taxonomyUrl}/v1/subjects/${id}?${query}`,
    context,
  );
  return resolveJson(response);
}

export async function fetchSubjectsTyped(
  context: Context,
  isVisible?: boolean,
): Promise<Subject> {
  const query = qs.stringify({
    language: context.language,
    isVisible,
  });

  const response = await fetch(
    `/${context.taxonomyUrl}/v1/subjects/?${query}`,
    context,
  );
  return resolveJson(response);
}

export async function fetchSubjectTopics(
  subjectId: string,
  context: Context,
): Promise<GQLTopic[]> {
  const response = await fetch(
    `/${context.taxonomyUrl}/v1/subjects/${subjectId}/topics/?recursive=true&language=${context.language}`,
    context,
  );
  return resolveJson(response);
}

export async function fetchTopics(
  args: { contentUri?: string },
  context: Context,
): Promise<GQLTopic[]> {
  const uriParam = args.contentUri ? `&contentURI=${args.contentUri}` : '';
  const response = await fetch(
    `/${context.taxonomyUrl}/v1/topics/?language=${context.language}${uriParam}`,
    context,
  );
  return resolveJson(response);
}

export async function fetchTopic(params: { id: string }, context: Context) {
  const response = await fetch(
    `/${context.taxonomyUrl}/v1/topics/${params.id}?language=${context.language}`,
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
  const response = await fetch(
    `/${context.taxonomyUrl}/v1/topics/${id}/topics?language=${context.language}`,
    context,
  );
  return resolveJson(response);
}

export async function fetchTopicResources(
  params: FetchTopicResourcesParams,
  context: Context,
): Promise<GQLResource[]> {
  const { subjectId, relevance, topic } = params;
  const subjectParam = subjectId ? `&subject=${subjectId}` : '';
  const relevanceParam = relevance ? `&relevance=${relevance}` : '';

  const response = await fetch(
    `/${context.taxonomyUrl}/v1/topics/${topic.id}/resources?language=${context.language}${subjectParam}${relevanceParam}`,
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
    `/${context.taxonomyUrl}/v1/topics?contentURI=${id}`,
    context,
  );
  const json = await resolveJson(response);

  const taxonomy = json.find((item: { contentUri: string }) => {
    return item.contentUri === id;
  });
  return taxonomy;
}

export async function queryResourcesOnContentURI(
  id: string,
  context: Context,
): Promise<GQLResource> {
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
