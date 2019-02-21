/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { fetch, resolveJson } from '../utils/apiHelpers';
export const removeUrn = (str: string) => str.replace('urn:', '');

interface FetchTopicResourcesParams {
  topicId: string;
  relevance: string;
  filters?: string;
}

interface FetchResourceParams {
  resourceId: string;
  subjectId?: string;
}

interface Resource {
  id: string;
  name: string;
  contentUri?: string;
  path?: string;
  paths?: string[];
}

function findPrimaryPath(paths: string[], subjectId: string) {
  const found = paths.find(path => path.indexOf(subjectId) > -1);
  return found;
}

export async function fetchResource(
  { resourceId, subjectId }: FetchResourceParams,
  context: Context,
): Promise<GQLResource> {
  const response = await fetch(
    `/taxonomy/v1/resources/${resourceId}/full?language=${context.language}`,
    context,
  );
  const resource: Resource = await resolveJson(response);

  if (subjectId) {
    return { ...resource, path: findPrimaryPath(resource.paths, subjectId) };
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
    `/taxonomy/v1/subjects/?language=${context.language}`,
    context,
  );
  return resolveJson(response);
}

export async function fetchSubjectTopics(
  subjectId: string,
  filterIds: string,
  context: Context,
) {
  const response = await fetch(
    `/taxonomy/v1/subjects/${subjectId}/topics?recursive=true&language=${
      context.language
    }${filterIds ? `&filter=${filterIds}` : ''}`,
    context,
  );
  return resolveJson(response);
}

export async function fetchTopics(context: Context): Promise<GQLTopic[]> {
  const response = await fetch(
    `/taxonomy/v1/topics/?language=${context.language}`,
    context,
  );
  return resolveJson(response);
}

export async function fetchTopic(id: string, context: Context) {
  const response = await fetch(
    `/taxonomy/v1/topics/${id}?language=${context.language}`,
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
  const { filters, relevance, topicId } = params;

  const filterParam = filters && filters.length > 0 ? `&filter=${filters}` : '';

  const response = await fetch(
    `/taxonomy/v1/topics/${topicId}/resources?relevance=${relevance}&language=${
      context.language
    }${filterParam}`,
    context,
  );
  const json: Resource[] = await resolveJson(response);

  return json;
}
