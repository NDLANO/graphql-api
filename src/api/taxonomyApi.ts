/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  Node,
  NodeChild,
  Version,
  SearchResult,
  openapi,
  ResourceType,
  NodeType,
  NodeConnectionType,
} from "@ndla/types-taxonomy";
import { createAuthClient, resolveJsonOATS } from "../utils/openapi-fetch/utils";
import { withCustomContext } from "../utils/context/contextStore";
import { apiUrl } from "../config";

const client = createAuthClient<openapi.paths>({ baseUrl: `${apiUrl}/taxonomy`, useTaxonomyCache: true });

export async function fetchResourceTypes(context: Context): Promise<ResourceType[]> {
  return client.GET("/v1/resource-types", { params: { query: { language: context.language } } }).then(resolveJsonOATS);
}

export async function fetchSubjectTopics(subjectId: string, context: Context): Promise<Node[]> {
  return client
    .GET("/v1/nodes/{id}/nodes", {
      params: {
        path: { id: subjectId },
        query: {
          recursive: true,
          nodeType: ["TOPIC"],
          language: context.language,
          includeContexts: true,
          filterProgrammes: true,
        },
      },
    })
    .then(resolveJsonOATS);
}

export async function fetchNode(
  params: { id: string; rootId?: string; parentId?: string },
  context: Context,
): Promise<Node> {
  const { id, rootId, parentId } = params;

  return client
    .GET(`/v1/nodes/{id}`, {
      params: {
        path: { id },
        query: {
          language: context.language,
          isVisible: true,
          includeContexts: true,
          filterProgrammes: true,
          rootId,
          parentId,
        },
      },
    })
    .then(resolveJsonOATS);
}

export async function searchNodes(params: { contentUris: string[] }, context: Context): Promise<SearchResult> {
  return client
    .POST("/v1/nodes/search", {
      body: {
        language: context.language,
        contentUris: params.contentUris,
        // TODO: This doesn't exist?
        // isVisible: true,
        includeContexts: true,
        filterProgrammes: true,
        page: 1,
        pageSize: 100,
      },
    })
    .then(resolveJsonOATS);
}

export async function fetchChildren(
  params: {
    id: string;
    nodeType?: string;
    recursive?: boolean;
    connectionTypes?: string;
  },
  context: Context,
): Promise<NodeChild[]> {
  return client
    .GET("/v1/nodes/{id}/nodes", {
      params: {
        path: { id: params.id },
        query: {
          nodeType: params.nodeType ? [params.nodeType as NodeType] : undefined,
          recursive: params.recursive,
          connectionTypes: params.connectionTypes ? [params.connectionTypes as NodeConnectionType] : undefined,
          isVisible: true,
          includeContexts: true,
          filterProgrammes: true,
          language: context.language,
        },
      },
    })
    .then(resolveJsonOATS);
}

interface FetchNodeResourcesParams {
  id: string;
  relevance?: string;
}
export async function fetchNodeResources(params: FetchNodeResourcesParams, context: Context): Promise<NodeChild[]> {
  return client
    .GET("/v1/nodes/{id}/resources", {
      params: {
        path: { id: params.id },
        query: {
          language: context.language,
          relevance: params.relevance,
          isVisible: true,
          includeContexts: true,
          filterProgrammes: true,
        },
      },
    })
    .then(resolveJsonOATS);
}

export async function fetchVersion(hash: string, context: ContextWithLoaders): Promise<Version | undefined> {
  const result = await withCustomContext({ ...context, versionHash: "default" }, () =>
    client.GET("/v1/versions", {
      params: {
        query: {
          hash,
        },
      },
    }),
  );
  if (result.response.status === 404) {
    return {
      id: "",
      versionType: "BETA",
      name: "Draft",
      hash: "default",
      locked: false,
      created: "",
    };
  }

  const json = await resolveJsonOATS(result);
  return json?.[0];
}

interface NodeQueryParamsBase {
  language?: string;
  isRoot?: boolean;
  isContext?: boolean;
  key?: string;
  value?: string;
  ids?: string[];
  rootId?: string;
  parentId?: string;
  isVisible?: boolean;
  includeContexts?: boolean;
  filterProgrammes?: boolean;
}

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  { [K in Keys]-?: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, undefined>> }[Keys];

export type NodeQueryParams = NodeQueryParamsBase &
  RequireAtLeastOne<{ contextId?: string; contentURI?: string; nodeType?: string }>;

export const queryNodes = async (params: NodeQueryParams, context: Context): Promise<Node[]> => {
  return client
    .GET("/v1/nodes", {
      params: {
        query: {
          language: context.language,
          isRoot: params.isRoot,
          isContext: params.isContext,
          key: params.key,
          value: params.value,
          ids: params.ids,
          rootId: params.rootId,
          parentId: params.parentId,
          isVisible: params.isVisible,
          includeContexts: params.includeContexts,
          filterProgrammes: params.filterProgrammes,
          contextId: params.contextId,
          contentURI: params.contentURI,
          nodeType: params.nodeType ? [params.nodeType as NodeType] : undefined,
        },
      },
    })
    .then(resolveJsonOATS);
};
