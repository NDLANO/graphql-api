/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  fetchResource,
  fetchResourceTypes,
  fetchArticle,
  fetchLearningpath,
  fetchOembed,
} from '../api';
import {
  getArticleIdFromUrn,
  getLearningpathIdFromUrn,
} from '../utils/articleHelpers';

export const Query = {
  async resource(
    _: any,
    { id, subjectId }: QueryToResourceArgs,
    context: Context,
  ): Promise<GQLResource> {
    return fetchResource({ id, subjectId }, context);
  },
  async resourceTypes(
    _: any,
    __: any,
    context: Context,
  ): Promise<GQLResourceType[]> {
    return fetchResourceTypes(context);
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
    async meta(
      resource: GQLResource,
      _: any,
      context: Context,
    ): Promise<GQLMeta> {
      if (
        resource.contentUri &&
        resource.contentUri.startsWith('urn:learningpath')
      ) {
        return context.loaders.learningpathsLoader.load(
          resource.contentUri.replace('urn:learningpath:', ''),
        );
      } else if (
        resource.contentUri &&
        resource.contentUri.startsWith('urn:article')
      ) {
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
      context: Context,
    ): Promise<GQLLearningpath> {
      if (
        resource.contentUri &&
        resource.contentUri.startsWith('urn:learningpath')
      ) {
        const learningpathId = getLearningpathIdFromUrn(resource.contentUri);
        return fetchLearningpath(learningpathId, context);
      }
      if (
        resource.contentUri &&
        resource.contentUri.startsWith('urn:article')
      ) {
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
      args: { filterIds?: string; subjectId?: string, url?: string },
      context: Context,
    ): Promise<GQLArticle> {
      if (
        resource.contentUri &&
        resource.contentUri.startsWith('urn:article')
      ) {
        const articleId = getArticleIdFromUrn(resource.contentUri);
        return Promise.resolve(fetchArticle(
          {
            articleId,
            filterIds: args.filterIds,
            subjectId: args.subjectId,
          },
          context,
        ).then(article => {
          if (args.url !== undefined)
            return Object.assign({}, article, {oembed: fetchOembed(args.url, context).then(oembed => oembed.html.split('"')[3])})
          }));
      }
      if (
        resource.contentUri &&
        resource.contentUri.startsWith('urn:learningpath')
      ) {
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
