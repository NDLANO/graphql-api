/**
 * Copyright (c) 2023-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  fetchArenaCategories,
  fetchArenaCategory,
  fetchArenaRecentTopics,
  fetchArenaUser,
  fetchArenaTopic,
  fetchArenaTopicsByUser,
  fetchArenaNotifications,
  fetchCsrfTokenForSession,
  newTopic,
  replyToTopic,
} from '../api/arenaApi';
import {
  GQLArenaCategory,
  GQLArenaUser,
  GQLArenaTopic,
  GQLQueryArenaCategoryArgs,
  GQLQueryArenaUserArgs,
  GQLQueryArenaTopicArgs,
  GQLQueryArenaTopicsByUserArgs,
  GQLQueryResolvers,
  GQLArenaNotification,
  GQLMutationResolvers,
  GQLMutationMarkNotificationAsReadArgs,
  GQLArenaPost,
} from '../types/schema';

export const Query: Pick<
  GQLQueryResolvers,
  | 'arenaUser'
  | 'arenaCategories'
  | 'arenaCategory'
  | 'arenaTopic'
  | 'arenaRecentTopics'
  | 'arenaTopicsByUser'
  | 'arenaNotifications'
> = {
  async arenaUser(
    _: any,
    params: GQLQueryArenaUserArgs,
    context: ContextWithLoaders,
  ): Promise<GQLArenaUser> {
    return fetchArenaUser(params, context);
  },
  async arenaCategories(
    _: any,
    __: any,
    context: ContextWithLoaders,
  ): Promise<GQLArenaCategory[]> {
    return fetchArenaCategories(context);
  },
  async arenaCategory(
    _: any,
    params: GQLQueryArenaCategoryArgs,
    context: ContextWithLoaders,
  ): Promise<GQLArenaCategory> {
    return fetchArenaCategory(params, context);
  },
  async arenaTopic(
    _: any,
    params: GQLQueryArenaTopicArgs,
    context: ContextWithLoaders,
  ): Promise<GQLArenaTopic> {
    return fetchArenaTopic(params, context);
  },
  async arenaRecentTopics(
    _: any,
    __: any,
    context: ContextWithLoaders,
  ): Promise<GQLArenaTopic[]> {
    return fetchArenaRecentTopics(context);
  },
  async arenaTopicsByUser(
    _: any,
    params: GQLQueryArenaTopicsByUserArgs,
    context: ContextWithLoaders,
  ): Promise<GQLArenaTopic[]> {
    return fetchArenaTopicsByUser(params, context);
  },
  async arenaNotifications(
    _: any,
    __: any,
    context: ContextWithLoaders,
  ): Promise<GQLArenaNotification[]> {
    return fetchArenaNotifications(context);
  },
};

export const Mutations: Pick<
  GQLMutationResolvers,
  'newArenaTopic' | 'replyToTopic' | 'markNotificationAsRead'
> = {
  async newArenaTopic(
    _: any,
    params,
    context: ContextWithLoaders,
  ): Promise<GQLArenaTopic> {
    return newTopic(params, context);
  },
  async replyToTopic(
    _: any,
    params,
    context: ContextWithLoaders,
  ): Promise<GQLArenaPost> {
    return replyToTopic(params, context);
  },
  async markNotificationAsRead(
    _: any,
    params: GQLMutationMarkNotificationAsReadArgs,
    context: Context,
  ) {
    await Promise.all(
      params.topicIds.map(topicId => fetchArenaTopic({ topicId }, context)),
    );
    return params.topicIds;
  },
};
