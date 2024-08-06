/**
 * Copyright (c) 2024-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { IArticleV2 } from "@ndla/types-backend/article-api";
import { ISubjectPageData } from "@ndla/types-backend/frontpage-api";
import { Node, TaxonomyContext } from "@ndla/types-taxonomy";
import {
  fetchArticle,
  fetchChildren,
  fetchLK20CompetenceGoalSet,
  fetchLearningpath,
  fetchNode,
  fetchNodeByContentUri,
  fetchNodeResources,
  queryNodes,
} from "../api";
import {
  GQLLearningpath,
  GQLNode,
  GQLNodeChildrenArgs,
  GQLNodeCoreResourcesArgs,
  GQLNodeSupplementaryResourcesArgs,
  GQLQueryArticleNodeArgs,
  GQLQueryNodeArgs,
  GQLQueryNodeCollectionArgs,
  GQLQueryNodeResourceArgs,
  GQLQueryNodesArgs,
  GQLTaxonomyContext,
  GQLTaxonomyCrumb,
  GQLTaxonomyEntity,
  GQLWithArticle,
} from "../types/schema";
import { nodeToTaxonomyEntity } from "../utils/apiHelpers";
import { filterMissingArticles, getArticleIdFromUrn, getLearningpathIdFromUrn } from "../utils/articleHelpers";

export const Query = {
  async node(
    _: any,
    { id, rootId, contextId }: GQLQueryNodeArgs,
    context: ContextWithLoaders,
  ): Promise<GQLNode | undefined> {
    if (rootId) {
      const children = await fetchChildren({ id: rootId, recursive: true }, context);
      const node = children.find((child) => child.id === id);
      if (node) return nodeToTaxonomyEntity(node, context.language);
    }
    if (id) {
      const node = await context.loaders.nodeLoader.load({ id });
      return nodeToTaxonomyEntity(node, context.language);
    }
    const nodes = await queryNodes({ contextId, includeContexts: true, filterProgrammes: false }, context);
    if (nodes.length === 0) {
      throw new Error(`No node found with contextId: ${contextId}`);
    }
    const entities = nodes.map((node) => nodeToTaxonomyEntity(node, context.language, contextId));
    return entities.find((e) => e.contextId === contextId);
  },
  async nodes(
    _: any,
    { contentUri, filterVisible, metadataFilterKey, metadataFilterValue, ids }: GQLQueryNodesArgs,
    context: ContextWithLoaders,
  ): Promise<GQLNode[]> {
    const nodes = await queryNodes(
      {
        contentURI: contentUri,
        key: metadataFilterKey,
        value: metadataFilterValue,
        ids: ids,
        includeContexts: true,
        filterProgrammes: true,
        language: context.language,
      },
      context,
    );
    const filtered = filterVisible ? nodes.filter((node) => node.contexts.find((context) => context.isVisible)) : nodes;
    return filtered.map((node) => {
      return nodeToTaxonomyEntity(node, context.language);
    });
  },
  async nodeResource(
    _: any,
    { id, rootId, parentId }: GQLQueryNodeResourceArgs,
    context: ContextWithLoaders,
  ): Promise<GQLNode> {
    const resource = await fetchNode({ id }, context);
    const visibleCtx = resource.contexts
      .filter((c) => c.isVisible)
      .filter((c) => !c.rootId.startsWith("urn:programme"));
    const subjectCtx = rootId ? visibleCtx.filter((c) => c.rootId === rootId) : visibleCtx;
    const topicCtx = parentId ? subjectCtx.filter((c) => c.parentIds.includes(parentId)) : subjectCtx;

    const path = topicCtx?.[0]?.path || resource.path;
    const rank = topicCtx?.[0]?.rank;
    const contextId = topicCtx?.[0]?.contextId;
    const relevanceId = topicCtx?.[0]?.relevanceId || "urn:relevance:core";
    const entity = nodeToTaxonomyEntity({ ...resource, contexts: visibleCtx }, context.language, contextId);
    return { ...entity, contextId, path, rank, relevanceId };
  },
  async nodeCollection(
    _: any,
    { language }: GQLQueryNodeCollectionArgs,
    context: ContextWithLoaders,
  ): Promise<GQLNode[]> {
    const nodes = await context.loaders.nodesLoader.load({ metadataFilter: { key: "language", value: language } });
    return nodes.map((node) => nodeToTaxonomyEntity(node, context.language));
  },
  async articleNode(
    _: any,
    { articleId, nodeId }: GQLQueryArticleNodeArgs,
    context: ContextWithLoaders,
  ): Promise<GQLNode | null> {
    const node = articleId
      ? await fetchNodeByContentUri(`urn:article:${articleId}`, context)
      : nodeId
        ? await fetchNode({ id: nodeId }, context)
        : null;
    if (!node) return null;

    const visibleCtx = node.contexts.filter((c) => c.isVisible);
    const entity = nodeToTaxonomyEntity({ ...node, contexts: visibleCtx }, context.language);
    return {
      ...entity,
      contextId: visibleCtx?.[0]?.contextId,
      rank: visibleCtx?.[0]?.rank,
      relevanceId: visibleCtx?.[0]?.relevanceId || "urn:relevance:core",
    };
  },
};

export const resolvers = {
  TaxonomyContext: {
    async crumbs(taxonomyContext: TaxonomyContext, _: any, context: ContextWithLoaders): Promise<GQLTaxonomyCrumb[]> {
      const parentNodes = await context.loaders.nodesLoader.loadMany(
        taxonomyContext.parentContextIds.map((contextId) => ({ contextId })),
      );
      const crumbs = parentNodes
        .filter((nodes) => nodes.length > 0)
        .map((nodes) => {
          const parent = nodes[0]!;
          const entity = nodeToTaxonomyEntity(parent, context.language);
          return {
            id: entity.id,
            contextId: entity.contextId ?? "",
            name: entity.name,
            path: entity.path,
            url: entity.url || entity.path,
          } as GQLTaxonomyCrumb;
        });
      return crumbs;
    },
  },
  Node: {
    async article(node: GQLTaxonomyEntity, _: any, context: ContextWithLoaders): Promise<IArticleV2 | null> {
      if (node.contentUri?.startsWith("urn:article")) {
        const articleId = getArticleIdFromUrn(node.contentUri);
        return fetchArticle({ articleId }, context);
      }
      if (node.contentUri?.startsWith("urn:learningpath")) {
        return null;
      }
      throw Object.assign(new Error("Not a valid contentUri: " + node.contentUri), {
        status: 404,
      });
    },
    async availability(node: GQLTaxonomyEntity, _: any, context: ContextWithLoaders) {
      if (!node.contentUri) return undefined;
      const article = await context.loaders.articlesLoader.load(getArticleIdFromUrn(node.contentUri));
      return article?.availability;
    },
    async learningpath(node: GQLTaxonomyEntity, _: any, context: ContextWithLoaders): Promise<GQLLearningpath | null> {
      if (node.contentUri?.startsWith("urn:learningpath")) {
        const learningpathId = getLearningpathIdFromUrn(node.contentUri);
        return fetchLearningpath(learningpathId, context);
      }
      if (node.contentUri?.startsWith("urn:article")) {
        return null;
      }
      throw Object.assign(new Error("Not a valid contentUri: " + node.contentUri), {
        status: 404,
      });
    },
    async children(
      node: GQLTaxonomyEntity,
      args: GQLNodeChildrenArgs,
      context: ContextWithLoaders,
    ): Promise<GQLNode[]> {
      const children = await fetchChildren(
        { id: node.id, recursive: args.recursive, nodeType: args.nodeType },
        context,
      );
      const entities = children.map((node) => nodeToTaxonomyEntity(node, context.language));
      return filterMissingArticles(entities, context);
    },
    async subjectpage(node: GQLTaxonomyEntity, __: any, context: ContextWithLoaders): Promise<ISubjectPageData | null> {
      if (!node.contentUri?.startsWith("urn:frontpage")) return null;
      return context.loaders.subjectpageLoader.load(node.contentUri.replace("urn:frontpage:", ""));
    },
    async grepCodes(node: GQLTaxonomyEntity, __: any, context: ContextWithLoaders): Promise<string[]> {
      if (node.metadata?.grepCodes) {
        const code = node.metadata?.grepCodes?.find((c) => c.startsWith("KV"));
        return code ? fetchLK20CompetenceGoalSet(code, context) : [];
      }
      return [];
    },
    async coreResources(
      node: GQLTaxonomyEntity,
      args: GQLNodeCoreResourcesArgs,
      context: ContextWithLoaders,
    ): Promise<GQLNode[]> {
      const topicResources = await fetchNodeResources(
        {
          id: node.id,
          relevance: "urn:relevance:core",
        },
        context,
      );
      const filtered = await filterMissingArticles(topicResources, context);
      return filtered.map((f) => nodeToTaxonomyEntity(f, context.language));
    },
    async supplementaryResources(
      topic: GQLTaxonomyEntity,
      args: GQLNodeSupplementaryResourcesArgs,
      context: ContextWithLoaders,
    ): Promise<GQLNode[]> {
      const topicResources = await fetchNodeResources(
        {
          id: topic.id,
          relevance: "urn:relevance:supplementary",
        },
        context,
      );
      const filtered = await filterMissingArticles(topicResources, context);
      return filtered.map((f) => nodeToTaxonomyEntity(f, context.language));
    },
    async alternateNodes(node: GQLTaxonomyEntity, _: any, context: ContextWithLoaders): Promise<GQLNode[] | undefined> {
      const { contentUri, id, path } = node;
      if (!path) {
        const nodes = await queryNodes(
          {
            contentURI: contentUri,
            includeContexts: true,
            language: context.language,
          },
          context,
        );
        const theVisibleOthers = nodes
          .filter((node) => node.id !== id)
          .filter((node) => node.contexts.find((context) => context.isVisible));
        return theVisibleOthers.map((node) => nodeToTaxonomyEntity(node, context.language));
      }
      return;
    },
  },
};
