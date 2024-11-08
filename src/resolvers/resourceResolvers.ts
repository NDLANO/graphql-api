/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { IArticleV2 } from "@ndla/types-backend/article-api";
import { fetchLearningpath, fetchNode, fetchNodeByContentUri, fetchResourceTypes } from "../api";
import {
  GQLLearningpath,
  GQLMeta,
  GQLQueryArticleResourceArgs,
  GQLQueryResourceArgs,
  GQLResource,
  GQLResourceType,
  GQLResourceTypeDefinition,
} from "../types/schema";
import { articleToMeta, learningpathToMeta, nodeToTaxonomyEntity } from "../utils/apiHelpers";
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

    return nodeToTaxonomyEntity(resource, context);
  },
  async resource(
    _: any,
    { id, subjectId, topicId }: GQLQueryResourceArgs,
    context: ContextWithLoaders,
  ): Promise<GQLResource> {
    const resource = await fetchNode({ id, rootId: subjectId, parentId: topicId }, context);

    return nodeToTaxonomyEntity(resource, context);
  },
  async resourceTypes(_: any, __: any, context: ContextWithLoaders): Promise<GQLResourceType[]> {
    return fetchResourceTypes<GQLResourceType>(context);
  },
};

export const resolvers = {
  ResourceTypeDefinition: {
    async subtypes(resourceType: GQLResourceTypeDefinition): Promise<GQLResourceTypeDefinition[] | undefined> {
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
    async htmlTitle(node: GQLResource, _: any, context: ContextWithLoaders): Promise<String | null> {
      if (node.contentUri?.startsWith("urn:article")) {
        const article = await context.loaders.articlesLoader.load(getArticleIdFromUrn(node.contentUri));
        return article ? article.title.htmlTitle : null;
      }
      return node.name;
    },
    async meta(resource: GQLResource, _: any, context: ContextWithLoaders): Promise<GQLMeta | null> {
      if (resource.contentUri?.startsWith("urn:learningpath")) {
        const learningpath = await context.loaders.learningpathsLoader.load(
          resource.contentUri.replace("urn:learningpath:", ""),
        );
        return learningpath ? learningpathToMeta(learningpath) : null;
      } else if (resource.contentUri?.startsWith("urn:article")) {
        const article = await context.loaders.articlesLoader.load(getArticleIdFromUrn(resource.contentUri));
        return article ? articleToMeta(article) : null;
      }
      throw Object.assign(new Error("Missing contentUri for resource with id: " + resource.id), { status: 404 });
    },
    async learningpath(resource: GQLResource, _: any, context: ContextWithLoaders): Promise<GQLLearningpath | null> {
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
    async article(resource: GQLResource, _: any, context: ContextWithLoaders): Promise<IArticleV2 | undefined> {
      if (resource.contentUri?.startsWith("urn:article")) {
        return context.loaders.articlesLoader.load(getArticleIdFromUrn(resource.contentUri));
      }
      if (resource.contentUri?.startsWith("urn:learningpath")) {
        return undefined;
      }
      throw Object.assign(new Error("Missing article contentUri for resource with id: " + resource.id), {
        status: 404,
      });
    },
  },
};
