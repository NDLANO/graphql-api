/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  fetchArticle,
  fetchTopics,
  fetchTopic,
  fetchTopicFilters,
  fetchTopicResources,
  fetchSubtopics,
} from '../api';

interface TopicResponse {
  id: string;
  name: string;
  contentUri?: string;
  path?: string;
}

async function filterMissingArticles(
  entities: GQLTaxonomyEntity[],
  context: Context,
): Promise<GQLTaxonomyEntity[]> {
  const articles = await context.loaders.articlesLoader.loadMany(
    entities.map(taxonomyEntity =>
      taxonomyEntity.contentUri.replace('urn:article:', ''),
    ),
  );
  const nonNullArticles = articles.filter(article => !!article);
  return entities.filter(taxonomyEnity =>
    nonNullArticles.find(article => taxonomyEnity.article.id === article.id),
  );
}

export const Query = {
  async topic(
    _: any,
    { id, subjectId }: QueryToTopicArgs,
    context: Context,
  ): Promise<GQLTopic> {
    return fetchTopic({ id, subjectId }, context);
  },
  async topics(_: any, __: any, context: Context): Promise<GQLTopic[]> {
    return fetchTopics(context);
  },
};

export const resolvers: { Topic: GQLTopicTypeResolver<TopicResponse> } = {
  Topic: {
    async article(
      topic: TopicResponse,
      args: TopicToArticleArgs,
      context: Context,
    ): Promise<GQLArticle> {
      if (topic.contentUri && topic.contentUri.startsWith('urn:article')) {
        const articleId = topic.contentUri.replace('urn:article:', '');
        return fetchArticle(
          {
            articleId,
            filterIds: args.filterIds,
            subjectId: args.subjectId,
          },
          context,
        );
      }
      throw Object.assign(
        new Error('Missing article contentUri for topic with id: ' + topic.id),
        { status: 404 },
      );
    },
    async filters(
      topic: TopicResponse,
      _: any,
      context: Context,
    ): Promise<GQLFilter[]> {
      return fetchTopicFilters(topic.id, context);
    },
    async meta(
      topic: TopicResponse,
      _: any,
      context: Context,
    ): Promise<GQLMeta> {
      if (topic.contentUri && topic.contentUri.startsWith('urn:article')) {
        return context.loaders.articlesLoader.load(
          topic.contentUri.replace('urn:article:', ''),
        );
      }
    },
    async coreResources(
      topic: TopicResponse,
      args: TopicToCoreResourcesArgs,
      context: Context,
    ): Promise<GQLResource[]> {
      const topicResources = await fetchTopicResources(
        {
          topicId: topic.id,
          subjectId: args.subjectId,
          relevance: 'urn:relevance:core',
          filters: args.filterIds,
        },
        context,
      );
      return filterMissingArticles(topicResources, context);
    },
    async supplementaryResources(
      topic: TopicResponse,
      args: TopicToSupplementaryResourcesArgs,
      context: Context,
    ): Promise<GQLResource[]> {
      const topicResources = await fetchTopicResources(
        {
          topicId: topic.id,
          subjectId: args.subjectId,
          relevance: 'urn:relevance:supplementary',
          filters: args.filterIds,
        },
        context,
      );
      return filterMissingArticles(topicResources, context);
    },
    async subtopics(
      topic: TopicResponse,
      args: TopicToSubtopicsArgs,
      context: Context,
    ): Promise<GQLTopic[]> {
      const subTopics = await fetchSubtopics(
        { id: topic.id, filterIds: args.filterIds },
        context,
      );
      return filterMissingArticles(subTopics, context);
    },
  },
};
