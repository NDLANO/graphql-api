/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { IArticleV2 } from "@ndla/types-backend/article-api";
import { Node } from "@ndla/types-taxonomy";
import { fetchArticle, fetchNode, fetchNodeResources, fetchChildren, queryNodes } from "../api";
import {
  GQLMeta,
  GQLQueryTopicArgs,
  GQLQueryTopicsArgs,
  GQLResource,
  GQLTopic,
  GQLTopicCoreResourcesArgs,
  GQLTopicSupplementaryResourcesArgs,
} from "../types/schema";
import { nodeToTaxonomyEntity } from "../utils/apiHelpers";
import { filterMissingArticles, getArticleIdFromUrn } from "../utils/articleHelpers";

export const Query = {
  async topic(_: any, { id, subjectId }: GQLQueryTopicArgs, context: ContextWithLoaders): Promise<GQLTopic> {
    if (subjectId) {
      const children = await fetchChildren({ id: subjectId, nodeType: "TOPIC", recursive: true }, context);
      const node = children.find((child) => child.id === id);
      if (node) return nodeToTaxonomyEntity(node, context);
    }
    const node = await fetchNode({ id }, context);
    return nodeToTaxonomyEntity(node, context);
  },
  async topics(
    _: any,
    { contentUri, filterVisible }: GQLQueryTopicsArgs,
    context: ContextWithLoaders,
  ): Promise<GQLTopic[]> {
    const nodes = await queryNodes(
      {
        contentURI: contentUri,
        includeContexts: true,
        filterProgrammes: true,
        language: context.language,
      },
      context,
    );
    const filtered = filterVisible ? nodes.filter((node) => node.contexts.find((context) => context.isVisible)) : nodes;

    return filtered.map((node) => {
      return nodeToTaxonomyEntity(node, context);
    });
  },
};

export const resolvers = {
  Topic: {
    async availability(topic: Node, _: any, context: ContextWithLoaders) {
      if (!topic.contentUri) return undefined;
      const article = await context.loaders.articlesLoader.load(getArticleIdFromUrn(topic.contentUri));
      return article?.availability;
    },
    async article(topic: Node, _: any, context: ContextWithLoaders): Promise<IArticleV2> {
      if (topic.contentUri && topic.contentUri.startsWith("urn:article")) {
        const articleId = getArticleIdFromUrn(topic.contentUri);
        return fetchArticle({ articleId }, context);
      }
      throw Object.assign(new Error("Missing article contentUri for topic with id: " + topic.id), { status: 404 });
    },
    async meta(topic: Node, _: any, context: ContextWithLoaders): Promise<GQLMeta | null> {
      if (!topic.contentUri?.startsWith("urn:article")) return null;
      return context.loaders.articlesLoader.load(getArticleIdFromUrn(topic.contentUri));
    },
    async coreResources(
      topic: Node,
      args: GQLTopicCoreResourcesArgs,
      context: ContextWithLoaders,
    ): Promise<GQLResource[]> {
      const topicResources = await fetchNodeResources(
        {
          id: topic.id,
          relevance: "urn:relevance:core",
        },
        context,
      );
      const filtered = await filterMissingArticles(topicResources, context);
      return filtered.map((f) => nodeToTaxonomyEntity(f, context));
    },
    async supplementaryResources(
      topic: Node,
      args: GQLTopicSupplementaryResourcesArgs,
      context: ContextWithLoaders,
    ): Promise<GQLResource[]> {
      const topicResources = await fetchNodeResources(
        {
          id: topic.id,
          relevance: "urn:relevance:supplementary",
        },
        context,
      );
      const filtered = await filterMissingArticles(topicResources, context);
      return filtered.map((f) => nodeToTaxonomyEntity(f, context));
    },
    async subtopics(topic: Node, _: any, context: ContextWithLoaders): Promise<GQLTopic[]> {
      const subtopics = await fetchChildren({ id: topic.id, nodeType: "TOPIC" }, context);
      const filtered = await filterMissingArticles(subtopics, context);
      return filtered.map((f) => nodeToTaxonomyEntity(f, context));
    },
    async alternateTopics(topic: Node, _: any, context: ContextWithLoaders): Promise<GQLTopic[] | undefined> {
      const { contentUri, id, path } = topic;
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
        return theVisibleOthers.map((node) => nodeToTaxonomyEntity(node, context));
      }
      return;
    },
  },
};
