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
  GQLQueryNodeArgs,
  GQLQueryNodeByArticleIdArgs,
  GQLQueryNodesArgs,
  GQLTaxonomyContext,
  GQLTaxonomyCrumb,
  GQLTaxonomyEntity,
  GQLWithArticle,
} from "../types/schema";
import { nodeToTaxonomyEntity } from "../utils/apiHelpers";
import { filterMissingArticles, getArticleIdFromUrn, getLearningpathIdFromUrn } from "../utils/articleHelpers";

const pickContextValues = (node: Node, language: string, rootId?: string, parentId?: string) => {
  const visibleContexts = node.contexts.filter((c) => c.isVisible && !c.rootId.startsWith("urn:programme"));
  // A resource can have several context in one subject. rootId and parentId helps picking the right one.
  const rootContexts = rootId ? visibleContexts.filter((c) => c.rootId === rootId) : visibleContexts;
  const parentContexts = parentId ? rootContexts.filter((c) => c.parentIds.includes(parentId)) : rootContexts;

  const selectedCtx = parentContexts?.[0];
  const path = selectedCtx?.path || node.path;
  const rank = selectedCtx?.rank;
  const contextId = selectedCtx?.contextId;
  const relevanceId = selectedCtx?.relevanceId;
  const entity = nodeToTaxonomyEntity({ ...node, contexts: visibleContexts }, language);
  return { ...entity, contextId, path, rank, relevanceId };
};

export const Query = {
  async node(
    _: any,
    { id, rootId, parentId, contextId }: GQLQueryNodeArgs,
    context: ContextWithLoaders,
  ): Promise<GQLNode | undefined> {
    if (id) {
      const node = await context.loaders.nodeLoader.load({ id, rootId, parentId });
      return pickContextValues(node, context.language, rootId, parentId);
    }
    if (contextId) {
      const nodes = await queryNodes({ contextId, includeContexts: true, filterProgrammes: true }, context);
      if (nodes.length === 0) {
        throw new Error(`No node found with contextId: ${contextId}`);
      }
      const node = nodes[0];
      return node ? nodeToTaxonomyEntity(node, context.language, contextId) : undefined;
    }
    throw new Error("Missing id or contextId");
  },
  async nodes(
    _: any,
    { nodeType, contentUri, filterVisible, metadataFilterKey, metadataFilterValue, ids }: GQLQueryNodesArgs,
    context: ContextWithLoaders,
  ): Promise<GQLNode[]> {
    const params = {
      ids: ids,
      includeContexts: true,
      key: metadataFilterKey,
      value: metadataFilterValue,
      filterProgrammes: true,
      language: context.language,
    };
    const nodes: Node[] = [];
    if (contentUri) {
      nodes.concat(await queryNodes({ contentURI: contentUri, ...params }, context));
    } else if (nodeType) {
      nodes.concat(await queryNodes({ nodeType: nodeType, ...params }, context));
    }
    const filtered = filterVisible ? nodes.filter((node) => node.contexts.find((context) => context.isVisible)) : nodes;
    return filtered.map((node) => {
      return nodeToTaxonomyEntity(node, context.language);
    });
  },
  async nodeByArticleId(
    _: any,
    { articleId, nodeId }: GQLQueryNodeByArticleIdArgs,
    context: ContextWithLoaders,
  ): Promise<GQLNode | null> {
    let node = null;
    if (articleId) {
      node = await fetchNodeByContentUri(`urn:article:${articleId}`, context);
    } else if (nodeId) {
      node = await fetchNode({ id: nodeId }, context);
    }
    if (!node) return null;
    return pickContextValues(node, context.language);
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
        return context.loaders.articlesLoader.load(getArticleIdFromUrn(node.contentUri));
      }
      return null;
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
      return null;
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
    async alternateNodes(node: GQLTaxonomyEntity, _: any, context: ContextWithLoaders): Promise<GQLNode[] | undefined> {
      const { contentUri, id, path } = node;
      if (!path && contentUri) {
        const nodes = await queryNodes(
          {
            contentURI: contentUri,
            includeContexts: true,
            language: context.language,
          },
          context,
        );
        const theVisibleOthers = nodes.filter(
          (node) => node.id !== id && node.contexts.find((context) => context.isVisible),
        );
        return theVisibleOthers.map((node) => nodeToTaxonomyEntity(node, context.language));
      }
      return;
    },
  },
};
