// @ts-strict-ignore
/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import cheerio from 'cheerio';
import {
  fetchNode,
  fetchNodeResources,
  fetchResourceTypes,
  fetchArticle,
  fetchLearningpath,
  fetchOembed,
} from '../api';
import {
  getArticleIdFromUrn,
  getLearningpathIdFromUrn,
} from '../utils/articleHelpers';
import { ndlaUrl } from '../config';
import {
  GQLArticle,
  GQLLearningpath,
  GQLMeta,
  GQLQueryResourceArgs,
  GQLResource,
  GQLResourceType,
  GQLResourceTypeDefinition,
  GQLTaxonomyContext,
  GQLVisualElementOembed,
} from '../types/schema';
import { nodeToTaxonomyEntity } from '../utils/apiHelpers';

export const Query = {
  async resource(
    _: any,
    { id, subjectId, topicId }: GQLQueryResourceArgs,
    context: ContextWithLoaders,
  ): Promise<GQLResource> {
    if (topicId) {
      const resources = await fetchNodeResources({ id: topicId }, context);
      const resource = resources.find(res => res.id === id);
      return nodeToTaxonomyEntity(resource, context);
    }

    const resource = await fetchNode({ id }, context);
    const visibleCtx = resource.contexts.filter(c => c.isVisible);
    const subjectCtx = subjectId
      ? visibleCtx.filter(c => c.rootId === subjectId)
      : visibleCtx;

    const path = subjectCtx?.[0]?.path || resource.path;
    const rank = subjectCtx?.[0]?.rank;
    const relevanceId = subjectCtx?.[0]?.relevanceId || 'urn:relevance:core';
    const contexts: GQLTaxonomyContext[] = subjectCtx.map(c => {
      const breadcrumbs = c.breadcrumbs[context.language];
      return {
        path: c.path,
        parentIds: c.parentIds,
        breadcrumbs,
      };
    });
    return { ...resource, contexts, path, rank, relevanceId, parents: [] };
  },
  async resourceTypes(
    _: any,
    __: any,
    context: ContextWithLoaders,
  ): Promise<GQLResourceType[]> {
    return fetchResourceTypes<GQLResourceType>(context);
  },
};

export const resolvers = {
  ResourceTypeDefinition: {
    async subtypes(
      resourceType: GQLResourceTypeDefinition,
    ): Promise<GQLResourceTypeDefinition[]> {
      return resourceType.subtypes;
    },
  },
  Resource: {
    async availability(
      resource: GQLResource,
      _: any,
      context: ContextWithLoaders,
    ) {
      const defaultAvailability = 'everyone';
      if (resource.contentUri?.startsWith('urn:article')) {
        const article = await context.loaders.articlesLoader.load(
          getArticleIdFromUrn(resource.contentUri),
        );
        return article?.availability ?? defaultAvailability;
      }
      return defaultAvailability;
    },
    async meta(
      resource: GQLResource,
      _: any,
      context: ContextWithLoaders,
    ): Promise<GQLMeta> {
      if (resource.contentUri?.startsWith('urn:learningpath')) {
        return context.loaders.learningpathsLoader.load(
          resource.contentUri.replace('urn:learningpath:', ''),
        );
      } else if (resource.contentUri?.startsWith('urn:article')) {
        return context.loaders.articlesLoader.load(
          getArticleIdFromUrn(resource.contentUri),
        );
      }
      throw Object.assign(
        new Error('Missing contentUri for resource with id: ' + resource.id),
        { status: 404 },
      );
    },
    async learningpath(
      resource: GQLResource,
      _: any,
      context: ContextWithLoaders,
    ): Promise<GQLLearningpath> {
      if (resource.contentUri?.startsWith('urn:learningpath')) {
        const learningpathId = getLearningpathIdFromUrn(resource.contentUri);
        return fetchLearningpath(learningpathId, context);
      }
      if (resource.contentUri?.startsWith('urn:article')) {
        return null;
      }
      throw Object.assign(
        new Error(
          'Missing learningpath contentUri for resource with id: ' +
            resource.id,
        ),
        { status: 404 },
      );
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
      if (resource.contentUri?.startsWith('urn:article')) {
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
          ).then(article => {
            return Object.assign({}, article, {
              oembed: fetchOembed<GQLVisualElementOembed>(
                `${ndlaUrl}${resource.path}`,
                context,
              ).then(oembed => {
                const parsed = cheerio.load(oembed.html);
                return parsed('iframe').attr('src');
              }),
            });
          }),
        );
      }
      if (resource.contentUri?.startsWith('urn:learningpath')) {
        return null;
      }
      throw Object.assign(
        new Error(
          'Missing article contentUri for resource with id: ' + resource.id,
        ),
        { status: 404 },
      );
    },
  },
};
