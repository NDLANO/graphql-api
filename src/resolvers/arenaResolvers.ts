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
  newTopic,
  replyToTopic,
  deletePost,
  deleteTopic,
  updatePost,
  newFlag,
} from '../api/arenaApi';
import {
  GQLArenaCategory,
  GQLArenaTopic,
  GQLQueryArenaCategoryArgs,
  GQLQueryArenaUserArgs,
  GQLQueryArenaTopicArgs,
  GQLQueryArenaTopicsByUserArgs,
  GQLQueryResolvers,
  GQLArenaNotification,
  GQLMutationResolvers,
  GQLMutationMarkNotificationAsReadArgs,
  GQLMutationNewArenaTopicArgs,
  GQLArenaPost,
  GQLMutationReplyToTopicArgs,
  GQLArenaUser,
  GQLMutationDeletePostArgs,
  GQLMutationDeleteTopicArgs,
  GQLMutationUpdatePostArgs,
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
  | 'newArenaTopic'
  | 'replyToTopic'
  | 'markNotificationAsRead'
  | 'deletePost'
  | 'deleteTopic'
  | 'updatePost'
  | 'newFlag'
> = {
  async newArenaTopic(
    _: any,
    params: GQLMutationNewArenaTopicArgs,
    context: ContextWithLoaders,
  ): Promise<GQLArenaTopic> {
    return await newTopic(params, context);
  },
  async replyToTopic(
    _: any,
    params: GQLMutationReplyToTopicArgs,
    context: ContextWithLoaders,
  ): Promise<GQLArenaPost> {
    return await replyToTopic(params, context);
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
  async deletePost(
    _: any,
    params: GQLMutationDeletePostArgs,
    context: Context,
  ) {
    return await deletePost(params, context);
  },
  async deleteTopic(
    _: any,
    params: GQLMutationDeleteTopicArgs,
    context: Context,
  ) {
    return await deleteTopic(params, context);
  },
  async updatePost(
    _: any,
    params: GQLMutationUpdatePostArgs,
    context: Context,
  ) {
    return await updatePost(params, context);
  },
  async newFlag(_: any, params, context: ContextWithLoaders): Promise<number> {
    return newFlag(params, context);
  },
};
