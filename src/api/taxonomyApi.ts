/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { fetch, resolveJson } from '../utils/apiHelpers';

interface FetchTopicResourcesParams {
  topicId: string;
  relevance: string;
  filters?: string;
  subjectId?: string;
}

function removeUrn(str: string): string {
  return str.replace('urn:', '');
}

function findPrimaryPath(
  paths: string[],
  subjectId: string,
): string | undefined {
  return paths.find(path => path.split('/')[1] === removeUrn(subjectId));
}

export async function fetchResource(
  { id, subjectId }: QueryToResourceArgs,
  context: Context,
): Promise<GQLResource> {
  const response = await fetch(
    `/taxonomy/v1/resources/${id}/full?language=${context.language}`,
    context,
  );
  const resource: GQLTaxonomyEntity = await resolveJson(response);

  if (subjectId) {
    const primaryPath = findPrimaryPath(resource.paths, subjectId);
    const path = primaryPath ? primaryPath : resource.path;
    return { ...resource, path };
  }
  return resource;
}

export async function fetchFilters(
  context: Context,
): Promise<GQLSubjectFilter[]> {
  const response = await fetch(
    `/taxonomy/v1/filters/?language=${context.language}`,
    context,
  );
  return resolveJson(response);
}

export async function fetchResourceTypes(
  context: Context,
): Promise<GQLResourceTypeDefinition[]> {
  const response = await fetch(
    `/taxonomy/v1/resource-types?language=${context.language}`,
    context,
  );
  return resolveJson(response);
}

export async function fetchSubjects(context: Context): Promise<GQLSubject[]> {
  const response = await fetch(
    `/taxonomy/v1/subjects/?includeMetadata=true&language=${context.language}`,
    context,
  );
  return resolveJson(response);
}

export async function fetchSubjectTopics(
  subjectId: string,
  filterIds: string,
  context: Context,
) {
  const filterParam = filterIds ? `&filter=${filterIds}` : '';
  const response = await fetch(
    `/taxonomy/v1/subjects/${subjectId}/topics/?includeMetadata=true&recursive=true&language=${context.language}${filterParam}`,
    context,
  );
  let topics: GQLTaxonomyEntity[] = await resolveJson(response);
  const filters = filterIds?.split(',') || [];
  if (filterIds) {
    topics = topics.filter(topic =>
      topic.filters.find(filter => filters.includes(filter.id)),
    );
  }
  return topics;
}

export async function fetchTopics(context: Context): Promise<GQLTopic[]> {
  const response = await fetch(
    `/taxonomy/v1/topics/?includeMetadata=true&language=${context.language}`,
    context,
  );
  return resolveJson(response);
}

export async function fetchTopic(
  params: { id: string; subjectId?: string },
  context: Context,
) {
  const response = await fetch(
    `/taxonomy/v1/topics/${params.id}?includeMetadata=true&language=${context.language}`,
    context,
  );
  const topic: GQLTaxonomyEntity = await resolveJson(response);

  if (params.subjectId) {
    const primaryPath = findPrimaryPath(topic.paths, params.subjectId);
    const path = primaryPath ? primaryPath : topic.path;
    return { ...topic, path };
  }
  return topic;
}

export async function fetchSubtopics(
  params: { id: string; filterIds?: string },
  context: Context,
): Promise<GQLTopic[]> {
  const { id, filterIds } = params;
  const filterParam = filterIds ? `&filter=${filterIds}` : '';
  const response = await fetch(
    `/taxonomy/v1/topics/${id}/topics?language=${context.language}${filterParam}`,
    context,
  );
  return resolveJson(response);
}

export async function fetchTopicFilters(
  topicId: string,
  context: Context,
): Promise<GQLFilter[]> {
  const response = await fetch(
    `/taxonomy/v1/topics/${topicId}/filters`,
    context,
  );
  return resolveJson(response);
}

export async function fetchTopicResources(
  params: FetchTopicResourcesParams,
  context: Context,
): Promise<GQLResource[]> {
  const { filters, subjectId, relevance, topicId } = params;

  const filterParam = filters && filters.length > 0 ? `&filter=${filters}` : '';
  const subjectParam = subjectId ? `&subject=${subjectId}` : '';

  const response = await fetch(
    `/taxonomy/v1/topics/${topicId}/resources?includeMetadata=true&relevance=${relevance}&language=${context.language}${filterParam}${subjectParam}`,
    context,
  );
  const resources: GQLTaxonomyEntity[] = await resolveJson(response);

  resources.forEach(resource => {
    if (subjectId) {
      const primaryPath = findPrimaryPath(resource.paths, subjectId);
      const path = primaryPath ? primaryPath : resource.path;
      resource.path = path;
    }
  });
  return resources;
}

export async function fetchResourcesAndTopics(
  params: { ids: [string]; subjectId?: string },
  context: Context,
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
  const response = await fetch(`/taxonomy/v1/topics?contentURI=${id}`, context);
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
    `/taxonomy/v1/resources?contentURI=${id}`,
    context,
  );
  const json = await resolveJson(response);

  const taxonomy = json.find((item: { contentUri: string }) => {
    return item.contentUri === id;
  });
  return taxonomy;
}
