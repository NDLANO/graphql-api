/**
 * Copyright (c) 2024-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import partition from "lodash/partition";
import sortBy from "lodash/sortBy";
import { ArticleV2DTO } from "@ndla/types-backend/article-api";
import { SubjectPageDTO } from "@ndla/types-backend/frontpage-api";
import { GraphQLError } from "graphql";
import { Node } from "@ndla/types-taxonomy";
import { fetchChildren, fetchLearningpath, fetchNode } from "../api";
import {
  GQLLearningpath,
  GQLMeta,
  GQLNode,
  GQLNodeChildrenArgs,
  GQLQueryNodeArgs,
  GQLQueryNodeByArticleIdArgs,
  GQLQueryNodesArgs,
  GQLTaxonomyEntity,
} from "../types/schema";
import { articleToMeta, getNumberId, nodeToTaxonomyEntity, toGQLLearningpath } from "../utils/apiHelpers";
import { filterMissingArticles, getArticleIdFromUrn, getLearningpathIdFromUrn } from "../utils/articleHelpers";
import { fetchCompetenceGoalSetCodes } from "../api/searchApi";

export const Query = {
  async node(
    _: any,
    { id, rootId, parentId, contextId }: GQLQueryNodeArgs,
    context: ContextWithLoaders,
  ): Promise<GQLNode | undefined> {
    if (id) {
      const node = await context.loaders.nodeLoader.load({ id, rootId, parentId });
      return nodeToTaxonomyEntity(node, context);
    }
    if (contextId) {
      const nodes = await context.loaders.nodesLoader.load({
        contextId,
        includeContexts: true,
        filterProgrammes: true,
      });
      if (nodes.length === 0) {
        throw new GraphQLError(`No node found with contextId: ${contextId}`, {
          extensions: { status: 404 },
        });
      }
      const node = nodes[0];
      return node ? nodeToTaxonomyEntity(node, context) : undefined;
    }
    throw new GraphQLError(`Missing id or contextId`, {
      extensions: { status: 400 },
    });
  },
  async nodes(
    _: any,
    { nodeType, contentUri, filterVisible, metadataFilterKey, metadataFilterValue, ids }: GQLQueryNodesArgs,
    context: ContextWithLoaders,
  ): Promise<GQLNode[]> {
    const params = {
      ids: ids,
      key: metadataFilterKey,
      value: metadataFilterValue,
      isVisible: filterVisible,
      includeContexts: true,
      filterProgrammes: true,
      language: context.language,
    };
    let nodes: Node[] = [];
    if (contentUri) {
      nodes = await context.loaders.nodesLoader.load({ contentURI: contentUri, ...params });
    } else if (nodeType) {
      nodes = await context.loaders.nodesLoader.load({ nodeType: nodeType, ...params });
    }
    if (ids) {
      // return in same order as ids
      nodes = sortBy(nodes, (n) => ids.indexOf(n.id));
    }
    return nodes.map((node) => {
      return nodeToTaxonomyEntity(node, context);
    });
  },
  async nodeByArticleId(
    _: any,
    { articleId, nodeId }: GQLQueryNodeByArticleIdArgs,
    context: ContextWithLoaders,
  ): Promise<GQLNode | null> {
    let node = null;
    if (articleId) {
      const res = await context.loaders.nodesLoader.load({
        contentURI: `urn:article:${articleId}`,
        language: context.language,
        includeContexts: true,
        filterProgrammes: true,
        isVisible: true,
      });
      node = res[0];
    } else if (nodeId) {
      node = await fetchNode({ id: nodeId }, context);
    }
    if (!node) return null;
    return nodeToTaxonomyEntity(node, context);
  },
};

export const resolvers = {
  Node: {
    async article(node: GQLTaxonomyEntity, _: any, context: ContextWithLoaders): Promise<ArticleV2DTO | undefined> {
      if (node.contentUri?.startsWith("urn:article")) {
        return context.loaders.articlesLoader.load(getArticleIdFromUrn(node.contentUri));
      }
      return undefined;
    },
    async availability(node: GQLTaxonomyEntity, _: any, context: ContextWithLoaders) {
      if (!node.contentUri) return undefined;
      const article = await context.loaders.articlesLoader.load(getArticleIdFromUrn(node.contentUri));
      return article?.availability;
    },
    async learningpath(node: GQLTaxonomyEntity, _: any, context: ContextWithLoaders): Promise<GQLLearningpath | null> {
      if (node.contentUri?.startsWith("urn:learningpath")) {
        const learningpathId = getLearningpathIdFromUrn(node.contentUri);
        const learningpath = await fetchLearningpath(learningpathId, context);
        return toGQLLearningpath(learningpath);
      }
      return null;
    },
    async meta(node: Node, _: any, context: ContextWithLoaders): Promise<GQLMeta | null> {
      if (!node.contentUri?.startsWith("urn:article")) return null;
      const article = await context.loaders.articlesLoader.load(getArticleIdFromUrn(node.contentUri));
      return article ? articleToMeta(article) : null;
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
      const entities = children.map((node) => nodeToTaxonomyEntity(node, context));
      return filterMissingArticles(entities, context);
    },
    async subjectpage(node: GQLTaxonomyEntity, __: any, context: ContextWithLoaders): Promise<SubjectPageDTO | null> {
      const subjectPageId = getNumberId(node.contentUri?.replace("urn:frontpage:", ""));
      if (!subjectPageId) return null;
      return context.loaders.subjectpageLoader.load(subjectPageId);
    },
    async grepCodes(node: GQLTaxonomyEntity, __: any, context: ContextWithLoaders): Promise<string[]> {
      if (!node.metadata?.grepCodes) {
        return [];
      }
      const [sets, rest] = partition(node.metadata?.grepCodes, (code) => code.startsWith("KV"));
      const result = await Promise.all(sets.map((set) => fetchCompetenceGoalSetCodes(set, context)));
      return rest.concat(result.flat());
    },
    async alternateNodes(node: GQLTaxonomyEntity, _: any, context: ContextWithLoaders): Promise<GQLNode[] | undefined> {
      const { contentUri, url } = node;
      if (!url && contentUri) {
        const nodes = await context.loaders.nodesLoader.load({
          contentURI: contentUri,
          includeContexts: true,
          filterProgrammes: true,
          isVisible: true,
          language: context.language,
        });
        return nodes.map((node) => nodeToTaxonomyEntity(node, context));
      }
      return;
    },
    async links(node: GQLTaxonomyEntity, _: any, context: ContextWithLoaders): Promise<GQLNode[]> {
      const links = await fetchChildren({ id: node.id, connectionTypes: "LINK" }, context);
      const entities = links.map((node) => nodeToTaxonomyEntity(node, context));
      return filterMissingArticles(entities, context);
    },
  },
};
