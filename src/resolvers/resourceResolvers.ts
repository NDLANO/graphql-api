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
  fetchResource,
  fetchResourceTypes,
  fetchArticle,
  fetchLearningpath,
  fetchOembed,
  fetchSubject,
  fetchTopic,
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
  GQLVisualElementOembed,
} from '../types/schema';

export const Query = {
  async resource(
    _: any,
    { id, subjectId, topicId }: GQLQueryResourceArgs,
    context: ContextWithLoaders,
  ): Promise<GQLResource> {
    return fetchResource({ id, subjectId, topicId }, context);
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
    async breadcrumbs(
      resource: GQLResource,
      _: any,
      context: ContextWithLoaders,
    ): Promise<string[][]> {
      return Promise.all(
        resource.paths?.map(async path => {
          return Promise.all(
            path
              .split('/')
              .slice(1, -1)
              .map(async id => {
                if (id.includes('subject:')) {
                  return (await fetchSubject(context, `urn:${id}`)).name;
                } else if (id.includes('topic:')) {
                  return (await fetchTopic({ id: `urn:${id}` }, context)).name;
                }
              }),
          );
        }),
      );
    },
  },
};
