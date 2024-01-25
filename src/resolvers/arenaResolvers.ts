/**
 * Copyright (c) 2023-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  deletePost,
  deleteTopic,
  fetchArenaCategories,
  fetchArenaCategory,
  fetchArenaNotifications,
  fetchArenaRecentTopics,
  fetchArenaTopic,
  fetchArenaTopicsByUser,
  fetchArenaUser,
  markNotificationRead,
  newFlag,
  newTopic,
  replyToTopic,
  subscribeToTopic,
  unsubscribeFromTopic,
  updatePost,
} from "../api/arenaApi";
import * as myndla from "../api/myndlaApi";
import {
  GQLArenaCategory,
  GQLArenaCategoryV2,
  GQLArenaFlag,
  GQLArenaNotification,
  GQLArenaUserV2,
  GQLArenaPost,
  GQLArenaPostV2,
  GQLArenaTopic,
  GQLArenaTopicV2,
  GQLArenaUser,
  GQLMutationDeletePostArgs,
  GQLMutationDeletePostV2Args,
  GQLMutationDeleteTopicArgs,
  GQLMutationDeleteTopicV2Args,
  GQLMutationFollowCategoryArgs,
  GQLMutationFollowTopicArgs,
  GQLMutationMarkNotificationAsReadArgs,
  GQLMutationMarkNotificationsAsReadV2Args,
  GQLMutationNewArenaCategoryArgs,
  GQLMutationNewArenaTopicArgs,
  GQLMutationNewArenaTopicV2Args,
  GQLMutationNewFlagV2Args,
  GQLMutationReplyToTopicArgs,
  GQLMutationReplyToTopicV2Args,
  GQLMutationResolveFlagArgs,
  GQLMutationResolvers,
  GQLMutationUnfollowCategoryArgs,
  GQLMutationUnfollowTopicArgs,
  GQLMutationUpdateArenaCategoryArgs,
  GQLMutationUpdatePostArgs,
  GQLMutationUpdatePostV2Args,
  GQLMutationUpdateTopicV2Args,
  GQLPaginatedArenaNewPostNotificationV2,
  GQLPaginatedPosts,
  GQLPaginatedTopics,
  GQLQueryArenaAllFlagsArgs,
  GQLQueryArenaCategoriesV2Args,
  GQLQueryArenaCategoryArgs,
  GQLQueryArenaCategoryV2Args,
  GQLQueryArenaNotificationsV2Args,
  GQLQueryArenaPostInContextArgs,
  GQLQueryArenaRecentTopicsV2Args,
  GQLQueryArenaTopicArgs,
  GQLQueryArenaTopicsByUserArgs,
  GQLQueryArenaTopicsByUserV2Args,
  GQLQueryArenaTopicV2Args,
  GQLQueryArenaUserArgs,
  GQLQueryArenaUserV2Args,
  GQLQueryResolvers,
  GQLQueryListArenaUserV2Args,
  GQLPaginatedArenaUsers,
  GQLMyNdlaPersonalData,
  GQLMutationDeleteCategoryArgs,
  GQLMutationSortArenaCategoriesArgs,
} from "../types/schema";

import parseMarkdown from "../utils/parseMarkdown";

export const Query: Pick<
  GQLQueryResolvers,
  | "arenaUser"
  | "arenaCategories"
  | "arenaCategory"
  | "arenaTopic"
  | "arenaRecentTopics"
  | "arenaTopicsByUser"
  | "arenaNotifications"
  | "arenaCategoriesV2"
  | "arenaCategoryV2"
  | "arenaTopicV2"
  | "arenaTopicsByUserV2"
  | "arenaNotificationsV2"
  | "arenaUserV2"
  | "arenaRecentTopicsV2"
  | "arenaAllFlags"
  | "arenaPostInContext"
  | "listArenaUserV2"
> = {
  async arenaUser(_: any, params: GQLQueryArenaUserArgs, context: ContextWithLoaders): Promise<GQLArenaUser> {
    return fetchArenaUser(params, context);
  },
  async arenaUserV2(_: any, params: GQLQueryArenaUserV2Args, context: ContextWithLoaders): Promise<GQLArenaUserV2> {
    return await myndla.fetchArenaUser(params.username, context);
  },
  async arenaCategories(_: any, __: any, context: ContextWithLoaders): Promise<GQLArenaCategory[]> {
    return fetchArenaCategories(context);
  },
  async arenaCategoriesV2(
    _: any,
    params: GQLQueryArenaCategoriesV2Args,
    context: ContextWithLoaders,
  ): Promise<GQLArenaCategoryV2[]> {
    return myndla.fetchCategories(params.filterFollowed ?? false, context);
  },
  async arenaCategoryV2(
    _: any,
    params: GQLQueryArenaCategoryV2Args,
    context: ContextWithLoaders,
  ): Promise<GQLArenaCategoryV2> {
    return myndla.fetchSingleCategory(params.categoryId, params.page, params.pageSize, context);
  },
  async arenaTopicV2(_: any, params: GQLQueryArenaTopicV2Args, context: ContextWithLoaders): Promise<GQLArenaTopicV2> {
    return myndla.fetchSingleTopic(params.topicId, params.page, params.pageSize, context);
  },
  async arenaTopicsByUserV2(
    _: any,
    params: GQLQueryArenaTopicsByUserV2Args,
    context: ContextWithLoaders,
  ): Promise<GQLPaginatedTopics> {
    return myndla.fetchRecentTopics(params.page, params.pageSize, params.userId, context);
  },
  async arenaRecentTopicsV2(
    _: any,
    params: GQLQueryArenaRecentTopicsV2Args,
    context: ContextWithLoaders,
  ): Promise<GQLPaginatedTopics> {
    return myndla.fetchRecentTopics(params.page, params.pageSize, undefined, context);
  },
  async arenaNotificationsV2(
    _: any,
    params: GQLQueryArenaNotificationsV2Args,
    context: ContextWithLoaders,
  ): Promise<GQLPaginatedArenaNewPostNotificationV2> {
    return myndla.getNotifications(params.page, params.pageSize, context);
  },
  async arenaCategory(
    _: any,
    params: GQLQueryArenaCategoryArgs,
    context: ContextWithLoaders,
  ): Promise<GQLArenaCategory> {
    return fetchArenaCategory(params, context);
  },
  async arenaTopic(_: any, params: GQLQueryArenaTopicArgs, context: ContextWithLoaders): Promise<GQLArenaTopic> {
    return fetchArenaTopic(params, context);
  },
  async arenaRecentTopics(_: any, __: any, context: ContextWithLoaders): Promise<GQLArenaTopic[]> {
    return fetchArenaRecentTopics(context);
  },
  async arenaTopicsByUser(
    _: any,
    params: GQLQueryArenaTopicsByUserArgs,
    context: ContextWithLoaders,
  ): Promise<GQLArenaTopic[]> {
    return fetchArenaTopicsByUser(params, context);
  },
  async arenaNotifications(_: any, __: any, context: ContextWithLoaders): Promise<GQLArenaNotification[]> {
    return fetchArenaNotifications(context);
  },
  async arenaAllFlags(
    _: any,
    params: GQLQueryArenaAllFlagsArgs,
    context: ContextWithLoaders,
  ): Promise<GQLPaginatedPosts> {
    return myndla.getFlags(params.page, params.pageSize, context);
  },
  async arenaPostInContext(
    _: any,
    params: GQLQueryArenaPostInContextArgs,
    context: ContextWithLoaders,
  ): Promise<GQLArenaTopicV2> {
    return myndla.getPostInContext(params.postId, params.pageSize, context);
  },
  async listArenaUserV2(
    _: any,
    params: GQLQueryListArenaUserV2Args,
    context: ContextWithLoaders,
  ): Promise<GQLPaginatedArenaUsers> {
    return myndla.fetchArenaUsers(params.page, params.pageSize, context);
  },
};

export const Mutations: Pick<
  GQLMutationResolvers,
  | "newArenaTopic"
  | "replyToTopic"
  | "markNotificationAsRead"
  | "deletePost"
  | "deleteTopic"
  | "updatePost"
  | "newFlag"
  | "subscribeToTopic"
  | "unsubscribeFromTopic"
  | "newArenaCategory"
  | "updateArenaCategory"
  | "newArenaTopicV2"
  | "replyToTopicV2"
  | "updateTopicV2"
  | "updatePostV2"
  | "deletePostV2"
  | "deleteTopicV2"
  | "newFlagV2"
  | "resolveFlag"
  | "followTopic"
  | "followCategory"
  | "unfollowTopic"
  | "unfollowCategory"
  | "markNotificationsAsReadV2"
  | "markAllNotificationsAsRead"
  | "updateOtherArenaUser"
  | "deleteCategory"
  | "sortArenaCategories"
> = {
  async newArenaCategory(
    _: any,
    params: GQLMutationNewArenaCategoryArgs,
    context: ContextWithLoaders,
  ): Promise<GQLArenaCategoryV2> {
    return await myndla.newCategory(params.title, params.description, params.visible, context);
  },
  async newArenaTopicV2(
    _: any,
    params: GQLMutationNewArenaTopicV2Args,
    context: ContextWithLoaders,
  ): Promise<GQLArenaTopicV2> {
    return await myndla.createNewTopic(params.categoryId, params.title, params.content, context);
  },
  async replyToTopicV2(
    _: any,
    params: GQLMutationReplyToTopicV2Args,
    context: ContextWithLoaders,
  ): Promise<GQLArenaPostV2> {
    return await myndla.newPost(params.topicId, params.content, context);
  },
  async updateArenaCategory(
    _: any,
    params: GQLMutationUpdateArenaCategoryArgs,
    context: ContextWithLoaders,
  ): Promise<GQLArenaCategoryV2> {
    return await myndla.updateCategory(params.categoryId, params.title, params.description, params.visible, context);
  },
  async updatePostV2(
    _: any,
    params: GQLMutationUpdatePostV2Args,
    context: ContextWithLoaders,
  ): Promise<GQLArenaPostV2> {
    return await myndla.editPost(params.postId, params.content, context);
  },
  async updateTopicV2(
    _: any,
    params: GQLMutationUpdateTopicV2Args,
    context: ContextWithLoaders,
  ): Promise<GQLArenaTopicV2> {
    return await myndla.editTopic(params.topicId, params.title, params.content, context);
  },
  async deletePostV2(_: any, params: GQLMutationDeletePostV2Args, context: ContextWithLoaders): Promise<number> {
    await myndla.deletePost(params.postId, context);
    return params.postId;
  },
  async deleteTopicV2(_: any, params: GQLMutationDeleteTopicV2Args, context: ContextWithLoaders): Promise<number> {
    await myndla.deleteTopic(params.topicId, context);
    return params.topicId;
  },
  async newFlagV2(_: any, params: GQLMutationNewFlagV2Args, context: ContextWithLoaders): Promise<number> {
    await myndla.flagPost(params.postId, params.reason, context);
    return params.postId;
  },
  async resolveFlag(_: any, params: GQLMutationResolveFlagArgs, context: ContextWithLoaders): Promise<GQLArenaFlag> {
    return myndla.resolveFlag(params.flagId, context);
  },
  async markNotificationsAsReadV2(
    _: any,
    params: GQLMutationMarkNotificationsAsReadV2Args,
    context: ContextWithLoaders,
  ): Promise<number[]> {
    await Promise.all(params.notificationIds.map((id) => myndla.markSingleNotificationAsRead(id, context)));
    return params.notificationIds;
  },
  async markAllNotificationsAsRead(_: any, __: any, context: ContextWithLoaders): Promise<boolean> {
    await myndla.markAllNotificationAsRead(context);
    return true;
  },
  async followTopic(_: any, params: GQLMutationFollowTopicArgs, context: ContextWithLoaders): Promise<GQLArenaTopicV2> {
    return myndla.followTopic(params.topicId, context);
  },
  async followCategory(
    _: any,
    params: GQLMutationFollowCategoryArgs,
    context: ContextWithLoaders,
  ): Promise<GQLArenaCategoryV2> {
    return myndla.followCategory(params.categoryId, context);
  },
  async unfollowTopic(
    _: any,
    params: GQLMutationUnfollowTopicArgs,
    context: ContextWithLoaders,
  ): Promise<GQLArenaTopicV2> {
    return myndla.unfollowTopic(params.topicId, context);
  },
  async unfollowCategory(
    _: any,
    params: GQLMutationUnfollowCategoryArgs,
    context: ContextWithLoaders,
  ): Promise<GQLArenaCategoryV2> {
    return myndla.unfollowCategory(params.categoryId, context);
  },

  // nodebb ->
  async newArenaTopic(
    _: any,
    params: GQLMutationNewArenaTopicArgs,
    context: ContextWithLoaders,
  ): Promise<GQLArenaTopic> {
    return await newTopic(params, context);
  },
  async replyToTopic(_: any, params: GQLMutationReplyToTopicArgs, context: ContextWithLoaders): Promise<GQLArenaPost> {
    return await replyToTopic(params, context);
  },
  async markNotificationAsRead(_: any, params: GQLMutationMarkNotificationAsReadArgs, context: Context) {
    await Promise.all(params?.topicIds?.map((topicId) => markNotificationRead(topicId, context)));
    return params.topicIds;
  },
  async deletePost(_: any, params: GQLMutationDeletePostArgs, context: Context) {
    return await deletePost(params, context);
  },
  async deleteTopic(_: any, params: GQLMutationDeleteTopicArgs, context: Context) {
    return await deleteTopic(params, context);
  },
  async updatePost(_: any, params: GQLMutationUpdatePostArgs, context: Context) {
    return await updatePost(params, context);
  },
  async newFlag(_: any, params, context: ContextWithLoaders): Promise<number> {
    return newFlag(params, context);
  },
  async subscribeToTopic(_: any, params, context: ContextWithLoaders): Promise<number> {
    return subscribeToTopic(params, context);
  },
  async unsubscribeFromTopic(_: any, params, context: ContextWithLoaders): Promise<number> {
    return unsubscribeFromTopic(params, context);
  },
  async updateOtherArenaUser(_: any, params, context: ContextWithLoaders): Promise<GQLMyNdlaPersonalData> {
    return myndla.updateOtherUser(params.userId, params.data, context);
  },
  async deleteCategory(_: any, params: GQLMutationDeleteCategoryArgs, context: ContextWithLoaders): Promise<number> {
    await myndla.deleteCategory(params.categoryId, context);
    return params.categoryId;
  },
  async sortArenaCategories(
    _: any,
    params: GQLMutationSortArenaCategoriesArgs,
    context: ContextWithLoaders,
  ): Promise<GQLArenaCategoryV2[]> {
    return myndla.sortCategories(params.sortedIds, context);
  },
};

export const resolvers = {
  ArenaPostV2: {
    async contentAsHTML(post: GQLArenaPostV2, _: any, context: ContextWithLoaders): Promise<string> {
      return parseMarkdown({ markdown: post.content });
    },
  },
  ArenaPost: {
    async user(post: GQLArenaPost, _: any, context: ContextWithLoaders): Promise<GQLArenaUser> {
      return fetchArenaUser({ username: post.user.username }, context);
    },
  },
};
