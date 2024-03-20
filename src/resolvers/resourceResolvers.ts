/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

// @ts-strict-ignore

import { IArticleV2 } from "@ndla/types-backend/article-api";
import { fetchNode, fetchResourceTypes, fetchArticle, fetchLearningpath } from "../api";
import { fetchNodeByContentUri } from "../api/taxonomyApi";
import {
  GQLLearningpath,
  GQLMeta,
  GQLQueryArticleResourceArgs,
  GQLQueryResourceArgs,
  GQLResource,
  GQLResourceType,
  GQLResourceTypeDefinition,
  GQLTaxonomyContext,
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
};

export const resolvers = {
  ResourceTypeDefinition: {
    async subtypes(resourceType: GQLResourceTypeDefinition): Promise<GQLResourceTypeDefinition[]> {
      return resourceType.subtypes;
    },
  },
  Resource: {
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
    async article(resource: GQLResource, _: any, context: ContextWithLoaders): Promise<IArticleV2> {
      if (resource.contentUri?.startsWith("urn:article")) {
        const articleId = getArticleIdFromUrn(resource.contentUri);
        return fetchArticle({ articleId }, context);
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
