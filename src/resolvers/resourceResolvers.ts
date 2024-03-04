/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

// @ts-strict-ignore

import cheerio from "cheerio";
import { Node } from "@ndla/types-taxonomy";
import { fetchNode, fetchResourceTypes, fetchArticle, fetchLearningpath, fetchOembed, queryNodes } from "../api";
import { fetchNodeByContentUri } from "../api/taxonomyApi";
import { ndlaUrl } from "../config";
import {
  GQLArticle,
  GQLLearningpath,
  GQLMeta,
  GQLQueryArticleResourceArgs,
  GQLQueryResourceArgs,
  GQLQueryResourceByPathArgs,
  GQLResource,
  GQLResourceType,
  GQLResourceTypeDefinition,
  GQLSubject,
  GQLTaxonomyContext,
  GQLTopic,
  GQLVisualElementOembed,
} from "../types/schema";
import { getArticleIdFromUrn, getLearningpathIdFromUrn } from "../utils/articleHelpers";

export const Query = {
  async articleResource(
    _: any,
    { articleId, taxonomyId }: GQLQueryArticleResourceArgs,
    context: ContextWithLoaders,
  ): Promise<GQLResource | null> {
    const resource = articleId
      ? await fetchNodeByContentUri(`urn:article:${articleId}`, context)
      : taxonomyId
        ? await fetchNode({ id: taxonomyId }, context)
        : null;
    if (!resource) return null;

    const visibleCtx = resource.contexts.filter((c) => c.isVisible);

    return {
      ...resource,
      path: resource.path,
      rank: visibleCtx?.[0]?.rank,
      relevanceId: visibleCtx?.[0]?.relevanceId || "urn:relevance:core",
      contexts: visibleCtx.map((ctx) => {
        const breadcrumbs = ctx.breadcrumbs[context.language] || ctx.breadcrumbs["nb"] || [];
        return {
          path: ctx.path,
          parentIds: ctx.parentIds,
          breadcrumbs,
        };
      }),
    };
  },
  async resource(
    _: any,
    { id, subjectId, topicId }: GQLQueryResourceArgs,
    context: ContextWithLoaders,
  ): Promise<GQLResource> {
    const resource = await fetchNode({ id }, context);
    const visibleCtx = resource.contexts
      .filter((c) => c.isVisible)
      .filter((c) => !c.rootId.startsWith("urn:programme"));
    const subjectCtx = subjectId ? visibleCtx.filter((c) => c.rootId === subjectId) : visibleCtx;
    const topicCtx = topicId ? subjectCtx.filter((c) => c.parentIds.includes(topicId)) : subjectCtx;

    const path = topicCtx?.[0]?.path || resource.path;
    const rank = topicCtx?.[0]?.rank;
    const relevanceId = topicCtx?.[0]?.relevanceId || "urn:relevance:core";
    const contexts: GQLTaxonomyContext[] = visibleCtx.map((c) => {
      const breadcrumbs = c.breadcrumbs[context.language] || c.breadcrumbs["nb"] || [];
      return {
        path: c.path,
        parentIds: c.parentIds,
        breadcrumbs,
      };
    });
    return { ...resource, contexts, path, rank, relevanceId, parents: [] };
  },
  async resourceTypes(_: any, __: any, context: ContextWithLoaders): Promise<GQLResourceType[]> {
    return fetchResourceTypes<GQLResourceType>(context);
  },
  async resourceByPath(
    _: any,
    { path }: GQLQueryResourceByPathArgs,
    context: ContextWithLoaders,
  ): Promise<GQLResource> {
    if (!path || !path.includes("__")) {
      throw Error("Tried to fetch resource with invalid path");
    }

    const contextId = path.split("__")[1];
    const node = await queryNodes({ contextId, language: context.language, includeContexts: true }, context);
    const resource = node[0];
    const matchingContext = resource.contexts.find(
      (c) => c.contextId === contextId && c.isVisible && !c.rootId.startsWith("urn:programme"),
    );

    if (!matchingContext) {
      throw Error("No matching context found for resource with path: " + path);
    }

    const contextPath = matchingContext?.path || resource.path;
    const rank = matchingContext?.rank;
    const relevanceId = matchingContext?.relevanceId || "urn:relevance:core";
    const breadcrumbs = matchingContext.breadcrumbs[context.language] || matchingContext.breadcrumbs["nb"] || [];
    const contexts: GQLTaxonomyContext[] = [
      {
        path: matchingContext.path,
        parentIds: matchingContext.parentIds,
        breadcrumbs,
      },
    ];

    return { ...resource, contexts, path: contextPath, rank, relevanceId, parents: [] };
  },
};

export const resolvers = {
  ResourceTypeDefinition: {
    async subtypes(resourceType: GQLResourceTypeDefinition): Promise<GQLResourceTypeDefinition[]> {
      return resourceType.subtypes;
    },
  },
  Resource: {
    async parentTopics(
      resource: GQLResource,
      args: { onlyDirectParent: boolean },
      context: ContextWithLoaders,
    ): Promise<GQLTopic[]> {
      const allParentIds = resource.contexts?.[0].parentIds;
      const ids = (args.onlyDirectParent ? allParentIds.slice(-1) : allParentIds).filter(
        (id) => !!id && id.startsWith("urn:topic"),
      );

      return (
        await Promise.all(
          ids.map(async (parentId) => {
            return context.loaders.nodeLoader.load(parentId);
          }),
        )
      ).filter((x) => !!x);
    },
    async subject(resource: GQLResource, _: any, context: ContextWithLoaders): Promise<Node | null> {
      const subjectId = resource.contexts?.[0]?.parentIds?.find((id) => id.startsWith("urn:subject:"));
      return context.loaders.subjectLoader.load({ id: subjectId });
    },
    async availability(resource: GQLResource, _: any, context: ContextWithLoaders) {
      const defaultAvailability = "everyone";
      if (resource.contentUri?.startsWith("urn:article")) {
        const article = await context.loaders.articlesLoader.load(getArticleIdFromUrn(resource.contentUri));
        return article?.availability ?? defaultAvailability;
      }
      return defaultAvailability;
    },
    async meta(resource: GQLResource, _: any, context: ContextWithLoaders): Promise<GQLMeta> {
      if (resource.contentUri?.startsWith("urn:learningpath")) {
        return context.loaders.learningpathsLoader.load(resource.contentUri.replace("urn:learningpath:", ""));
      } else if (resource.contentUri?.startsWith("urn:article")) {
        return context.loaders.articlesLoader.load(getArticleIdFromUrn(resource.contentUri));
      }
      throw Object.assign(new Error("Missing contentUri for resource with id: " + resource.id), { status: 404 });
    },
    async learningpath(resource: GQLResource, _: any, context: ContextWithLoaders): Promise<GQLLearningpath> {
      if (resource.contentUri?.startsWith("urn:learningpath")) {
        const learningpathId = getLearningpathIdFromUrn(resource.contentUri);
        return fetchLearningpath(learningpathId, context);
      }
      if (resource.contentUri?.startsWith("urn:article")) {
        return null;
      }
      throw Object.assign(new Error("Missing learningpath contentUri for resource with id: " + resource.id), {
        status: 404,
      });
    },
    async article(
      resource: GQLResource,
      args: {
        subjectId?: string;
        isOembed?: string;
        convertEmbeds?: boolean;
      },
      context: ContextWithLoaders,
    ): Promise<GQLArticle> {
      if (resource.contentUri?.startsWith("urn:article")) {
        const articleId = getArticleIdFromUrn(resource.contentUri);
        return Promise.resolve(
          fetchArticle(
            {
              articleId,
              subjectId: args.subjectId,
              isOembed: args.isOembed,
              path: resource.path,
              convertEmbeds: args.convertEmbeds,
            },
            context,
          ).then((article) => {
            return Object.assign({}, article, {
              oembed: fetchOembed<GQLVisualElementOembed>(`${ndlaUrl}${resource.path}`, context).then((oembed) => {
                const parsed = cheerio.load(oembed.html);
                return parsed("iframe").attr("src");
              }),
            });
          }),
        );
      }
      if (resource.contentUri?.startsWith("urn:learningpath")) {
        return null;
      }
      throw Object.assign(new Error("Missing article contentUri for resource with id: " + resource.id), {
        status: 404,
      });
    },
  },
};
