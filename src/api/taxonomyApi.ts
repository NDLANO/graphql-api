/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { fetch, resolveJson } from '../utils/apiHelpers';

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

function removeUrn(str: string): string {
  return str.replace('urn:', '');
}

function findPrimaryPath(
  paths: string[],
  subjectId: string,
): string | undefined {
  return paths?.find(path => path.split('/')[1] === removeUrn(subjectId));
}

export async function fetchResource(
  { id, subjectId }: QueryToResourceArgs,
  context: Context,
): Promise<GQLResource> {
  const response = await fetch(
    `/${context.taxonomyUrl}/v1/resources/${id}/full?language=${context.language}`,
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
    `/${context.taxonomyUrl}/v1/filters/?language=${context.language}`,
    context,
  );
  return resolveJson(response);
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

export async function fetchSubjects(context: Context): Promise<GQLSubject[]> {
  const response = await fetch(
    `/${context.taxonomyUrl}/v1/subjects/?language=${context.language}`,
    context,
  );
  return resolveJson(response);
}

export async function fetchSubject(
  id: string,
  context: Context,
): Promise<GQLSubject> {
  const response = await fetch(
    `/${context.taxonomyUrl}/v1/subjects/${id}?language=${context.language}`,
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
    `/${context.taxonomyUrl}/v1/subjects/${subjectId}/topics/?recursive=true&language=${context.language}${filterParam}`,
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

export async function fetchTopic(
  params: { id: string; subjectId?: string },
  context: Context,
) {
  const response = await fetch(
    `/${context.taxonomyUrl}/v1/topics/${params.id}?language=${context.language}`,
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
    `/${context.taxonomyUrl}/v1/topics/${id}/topics?language=${context.language}${filterParam}`,
    context,
  );
  return resolveJson(response);
}

export async function fetchTopicFilters(
  topicId: string,
  context: Context,
): Promise<GQLFilter[]> {
  const response = await fetch(
    `/${context.taxonomyUrl}/v1/topics/${topicId}/filters`,
    context,
  );
  return resolveJson(response);
}

export async function fetchTopicResources(
  params: FetchTopicResourcesParams,
  context: Context,
): Promise<GQLResource[]> {
  const { filters, subjectId, relevance, topic } = params;
  const filterParam = filters && filters.length > 0 ? `&filter=${filters}` : '';
  const subjectParam = subjectId ? `&subject=${subjectId}` : '';

  const response = await fetch(
    `/${context.taxonomyUrl}/v1/topics/${topic.id}/resources?language=${context.language}${filterParam}${subjectParam}`,
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

  const suplResources = resources.filter(resource => {
    return resource.relevanceId === 'urn:relevance:supplementary';
  });
  const coreResources = resources.filter(
    resource => !suplResources.includes(resource),
  );
  if (relevance === 'urn:relevance:core') {
    return coreResources;
  } else if (relevance === 'urn:relevance:supplementary') {
    return suplResources;
  }

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
