/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Response } from "node-fetch";
import qs from "query-string";
import { Node, NodeChild, NodeType, TaxonomyContext, Version, SearchResult } from "@ndla/types-taxonomy";
import { GQLResourceType, GQLResourceTypeDefinition, GQLSubject, GQLTopic } from "../types/schema";
import { fetch, resolveJson } from "../utils/apiHelpers";

async function taxonomyFetch(path: string, context: Context, options?: RequestOptions): Promise<Response> {
  return fetch(path, context, { ...options, useTaxonomyCache: true });
}

export async function fetchResourceTypes<T extends GQLResourceType | GQLResourceTypeDefinition>(
  context: Context,
): Promise<T[]> {
  const query = qs.stringify({
    language: context.language,
  });
  const response = await taxonomyFetch(`/${context.taxonomyUrl}/v1/resource-types?${query}`, context);
  return resolveJson(response);
}

interface GetSubjectsParams {
  metadataFilter?: {
    key?: string;
    value?: string;
  };
  isVisible?: boolean;
  ids?: string[];
}

export async function fetchSubjects(
  { metadataFilter, isVisible, ids }: GetSubjectsParams,
  context: Context,
): Promise<GQLSubject[]> {
  const query = qs.stringify({
    language: context.language,
    key: metadataFilter?.key,
    value: metadataFilter?.value,
    nodeType: "SUBJECT",
    includeContexts: true,
    filterProgrammes: true,
    isVisible,
    ids: ids?.join(","),
  });
  const response = await taxonomyFetch(`/${context.taxonomyUrl}/v1/nodes?${query}`, context);
  return resolveJson(response);
}

export async function fetchSubject(context: Context, id: string): Promise<GQLSubject> {
  const query = qs.stringify({ language: context.language });
  const response = await taxonomyFetch(`/${context.taxonomyUrl}/v1/nodes/${id}?${query}`, context);
  return resolveJson(response);
}

export async function fetchSubjectTopics(subjectId: string, context: Context): Promise<GQLTopic[]> {
  const query = qs.stringify({
    recursive: true,
    nodeType: "TOPIC",
    language: context.language,
    includeContexts: true,
    filterProgrammes: true,
  });
  const response = await taxonomyFetch(`/${context.taxonomyUrl}/v1/nodes/${subjectId}/nodes?${query}`, context);
  return resolveJson(response);
}

export async function fetchTopics(args: { contentUri?: string }, context: Context): Promise<GQLTopic[]> {
  const query = qs.stringify({
    contentURI: args.contentUri ?? "",
    nodeType: "TOPIC",
    language: context.language,
    includeContexts: true,
    filterProgrammes: true,
  });
  const response = await taxonomyFetch(`/${context.taxonomyUrl}/v1/nodes?${query}`, context);
  return resolveJson(response);
}

export async function fetchNodeByContentUri(contentUri: string, context: Context): Promise<Node | undefined> {
  const query = qs.stringify({
    contentURI: contentUri,
    language: context.language,
    includeContexts: true,
    filterProgrammes: true,
    isVisible: true,
  });
  const response = await taxonomyFetch(`/${context.taxonomyUrl}/v1/nodes?${query}`, context);
  const resolved: Node[] = await resolveJson(response);
  return resolved[0];
}

export async function fetchNode(
  params: { id: string; rootId?: string; parentId?: string },
  context: Context,
): Promise<Node> {
  const { id, rootId, parentId } = params;
  const query = qs.stringify({
    language: context.language,
    isVisible: true,
    inludeContexts: true,
    filterProgrammes: true,
    rootId,
    parentId,
  });
  const response = await taxonomyFetch(`/${context.taxonomyUrl}/v1/nodes/${id}?${query}`, context);
  return await resolveJson(response);
}

export async function searchNodes(params: { contentUris: string[] }, context: Context): Promise<SearchResult<Node>> {
  const { contentUris } = params;
  const query = qs.stringify({
    language: context.language,
    contentUris: contentUris.join(","),
    isVisible: true,
    includeContexts: true,
    filterProgrammes: true,
  });
  const response = await taxonomyFetch(`/${context.taxonomyUrl}/v1/nodes/search?${query}`, context);
  return await resolveJson(response);
}

export async function fetchChildren(
  params: {
    id: string;
    nodeType?: string;
    recursive?: boolean;
  },
  context: Context,
): Promise<NodeChild[]> {
  const { id, nodeType, recursive } = params;
  const query = qs.stringify({
    nodeType,
    recursive,
    isVisible: true,
    includeContexts: true,
    filterProgrammes: true,
    language: context.language,
  });
  const response = await taxonomyFetch(`/${context.taxonomyUrl}/v1/nodes/${id}/nodes?${query}`, context);
  return resolveJson(response);
}

interface FetchNodeResourcesParams {
  id: string;
  relevance?: string;
}
export async function fetchNodeResources(params: FetchNodeResourcesParams, context: Context): Promise<NodeChild[]> {
  const { id, relevance } = params;
  const query = qs.stringify({
    language: context.language,
    relevance: relevance,
    isVisible: true,
    includeContexts: true,
    filterProgrammes: true,
  });
  const response = await taxonomyFetch(`/${context.taxonomyUrl}/v1/nodes/${id}/resources?${query}`, context);
  return await resolveJson(response);
}

export async function queryContexts(contentURI: string, context: Context): Promise<TaxonomyContext[]> {
  const response = await fetch(`/${context.taxonomyUrl}/v1/queries/${contentURI}`, context);
  return await resolveJson(response);
}

export async function fetchVersion(hash: string, context: Context): Promise<Version | undefined> {
  const response = await fetch(`/${context.taxonomyUrl}/v1/versions?hash=${hash}`, {
    ...context,
    versionHash: "default",
  });
  if (response.status === 404) {
    return {
      id: "",
      versionType: "BETA",
      name: "Draft",
      hash: "default",
      locked: false,
      created: "",
    };
  }
  const json = await resolveJson(response);
  return json?.[0];
}

interface NodeQueryParamsBase {
  language?: string;
  isRoot?: boolean;
  isContext?: boolean;
  key?: string;
  value?: string;
  ids?: string[];
  isVisible?: boolean;
  includeContexts?: boolean;
  filterProgrammes?: boolean;
}

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  { [K in Keys]-?: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, undefined>> }[Keys];

type NodeQueryParams = NodeQueryParamsBase &
  RequireAtLeastOne<{ contextId?: string; contentURI?: string; nodeType?: string }>;

export const queryNodes = async (params: NodeQueryParams, context: Context): Promise<Node[]> => {
  const res = await fetch(`/${context.taxonomyUrl}/v1/nodes?${qs.stringify(params)}`, context);
  return await resolveJson(res);
};
