/**
 * Copyright (c) 2023-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import queryString from "query-string";
import {
  IConfigMetaRestrictedDTO,
  ICategoryDTO,
  IPaginatedTopicsDTO,
  ICategoryWithTopicsDTO,
  ITopicWithPostsDTO,
  INewTopicDTO,
  ITopicDTO,
  INewCategoryDTO,
  INewPostDTO,
  INewFlagDTO,
  IPaginatedPostsDTO,
  IPaginatedNewPostNotificationsDTO,
  IArenaUserDTO,
  IPostDTO,
  IFlagDTO,
  IPaginatedArenaUsersDTO,
  IMyNDLAUserDTO,
  IUpdatedMyNDLAUserDTO,
  ArenaGroup,
} from "@ndla/types-backend/myndla-api";
import { GQLArenaUserV2Input } from "../types/schema";
import { fetch, resolveJson } from "../utils/apiHelpers";

const arenaBaseUrl = `/myndla-api/v1/arena`;

export const fetchConfig = async (configKey: string, context: Context): Promise<IConfigMetaRestrictedDTO> => {
  const response = await fetch(`/myndla-api/v1/config/${configKey}`, context);
  const config: IConfigMetaRestrictedDTO = await resolveJson(response);
  return config;
};

export const fetchExamLockStatus = async (context: Context): Promise<IConfigMetaRestrictedDTO> =>
  fetchConfig("MY_NDLA_WRITE_RESTRICTED", context);

export const fetchCategories = async (filterFollowed: boolean, context: Context): Promise<ICategoryDTO[]> => {
  const response = await fetch(`${arenaBaseUrl}/categories?followed=${filterFollowed}`, context);
  return await resolveJson(response);
};

export const fetchSingleCategory = async (
  categoryId: number,
  page: number | undefined,
  pageSize: number | undefined,
  context: Context,
): Promise<ICategoryWithTopicsDTO> => {
  const q = queryString.stringify({ page, "page-size": pageSize });
  const response = await fetch(`${arenaBaseUrl}/categories/${categoryId}?${q}`, context);
  return await resolveJson(response);
};

export const fetchTopics = async (categoryId: number, context: Context): Promise<IPaginatedTopicsDTO> => {
  const response = await fetch(`${arenaBaseUrl}/categories/${categoryId}/topics`, context);
  return await resolveJson(response);
};

export const fetchSingleTopic = async (
  topicId: number,
  page: number | undefined,
  pageSize: number | undefined,
  context: Context,
): Promise<ITopicWithPostsDTO> => {
  const q = queryString.stringify({ page, "page-size": pageSize });
  const response = await fetch(`${arenaBaseUrl}/topics/${topicId}?${q}`, context);
  return await resolveJson(response);
};

export const fetchRecentTopics = async (
  page: number | undefined,
  pageSize: number | undefined,
  userId: number | undefined,
  context: Context,
): Promise<IPaginatedTopicsDTO> => {
  const query = queryString.stringify({
    page,
    "page-size": pageSize,
    "user-id": userId,
  });
  const response = await fetch(`${arenaBaseUrl}/topics/recent?${query}`, context);
  return await resolveJson(response);
};

export const followCategory = async (categoryId: number, context: Context): Promise<ICategoryWithTopicsDTO> => {
  const response = await fetch(`${arenaBaseUrl}/categories/${categoryId}/follow`, context, { method: "POST" });
  return await resolveJson(response);
};
export const unfollowCategory = async (categoryId: number, context: Context): Promise<ICategoryWithTopicsDTO> => {
  const response = await fetch(`${arenaBaseUrl}/categories/${categoryId}/unfollow`, context, { method: "POST" });
  return await resolveJson(response);
};

export const followTopic = async (topicId: number, context: Context): Promise<ITopicWithPostsDTO> => {
  const response = await fetch(`${arenaBaseUrl}/topics/${topicId}/follow`, context, { method: "POST" });
  return await resolveJson(response);
};

export const unfollowTopic = async (topicId: number, context: Context): Promise<ITopicWithPostsDTO> => {
  const response = await fetch(`${arenaBaseUrl}/topics/${topicId}/unfollow`, context, { method: "POST" });
  return await resolveJson(response);
};

export const addPostUpvote = async (postId: number, context: Context): Promise<IPostDTO> => {
  const response = await fetch(`${arenaBaseUrl}/posts/${postId}/upvote`, context, { method: "PUT" });
  return await resolveJson(response);
};

export const removePostUpvote = async (postId: number, context: Context): Promise<IPostDTO> => {
  const response = await fetch(`${arenaBaseUrl}/posts/${postId}/upvote`, context, { method: "DELETE" });
  return await resolveJson(response);
};

export const newCategory = async (
  title: string,
  description: string,
  visible: boolean,
  parentCategoryId: number | undefined,
  context: Context,
): Promise<ICategoryDTO> => {
  const body: INewCategoryDTO = { title, description, visible, parentCategoryId };
  const response = await fetch(`${arenaBaseUrl}/categories`, context, {
    method: "POST",
    body: JSON.stringify(body),
  });

  return await resolveJson(response);
};

export const updateCategory = async (
  categoryId: number,
  title: string,
  description: string,
  visible: boolean,
  parentCategoryId: number | undefined,
  context: Context,
): Promise<ICategoryDTO> => {
  const body: INewCategoryDTO = { title, description, visible, parentCategoryId };
  const response = await fetch(`${arenaBaseUrl}/categories/${categoryId}`, context, {
    method: "PUT",
    body: JSON.stringify(body),
  });

  return await resolveJson(response);
};

export const editTopic = async (
  topicId: number,
  title: string,
  content: string,
  isPinned: boolean | undefined,
  isLocked: boolean | undefined,
  context: Context,
): Promise<ITopicDTO> => {
  const body: INewTopicDTO = {
    title,
    initialPost: { content },
    isPinned: isPinned ?? false,
    isLocked: isLocked ?? false,
  };
  const response = await fetch(`${arenaBaseUrl}/topics/${topicId}`, context, {
    method: "PUT",
    body: JSON.stringify(body),
  });
  return await resolveJson(response);
};

export const editPost = async (postId: number, content: string, context: Context): Promise<IPostDTO> => {
  const body: INewPostDTO = { content };
  const response = await fetch(`${arenaBaseUrl}/posts/${postId}`, context, {
    method: "PUT",
    body: JSON.stringify(body),
  });
  return await resolveJson(response);
};

export const deleteCategory = async (categoryId: number, context: Context): Promise<void> => {
  await fetch(`${arenaBaseUrl}/categories/${categoryId}`, context, {
    method: "DELETE",
  });
  return;
};

export const deleteTopic = async (topicId: number, context: Context): Promise<void> => {
  await fetch(`${arenaBaseUrl}/topics/${topicId}`, context, {
    method: "DELETE",
  });
  return;
};

export const deletePost = async (postId: number, context: Context): Promise<void> => {
  await fetch(`${arenaBaseUrl}/posts/${postId}`, context, {
    method: "DELETE",
  });
  return;
};

export const createNewTopic = async (
  categoryId: number,
  title: string,
  content: string,
  isPinned: boolean | undefined,
  isLocked: boolean | undefined,
  context: Context,
): Promise<ITopicDTO> => {
  const body: INewTopicDTO = {
    title,
    initialPost: { content },
    isPinned: isPinned ?? false,
    isLocked: isLocked ?? false,
  };

  const response = await fetch(`${arenaBaseUrl}/categories/${categoryId}/topics`, context, {
    method: "POST",
    body: JSON.stringify(body),
  });

  return await resolveJson(response);
};

export const newPost = async (
  topicId: number,
  content: string,
  context: Context,
  toPostId?: number,
): Promise<IPostDTO> => {
  const body: INewPostDTO = { content, toPostId };
  const response = await fetch(`${arenaBaseUrl}/topics/${topicId}/posts`, context, {
    method: "POST",
    body: JSON.stringify(body),
  });

  return await resolveJson(response);
};

export const flagPost = async (postId: number, reason: string, context: Context): Promise<void> => {
  const body: INewFlagDTO = { reason };
  await fetch(`${arenaBaseUrl}/posts/${postId}/flag`, context, {
    method: "POST",
    body: JSON.stringify(body),
  });
  return;
};

export const resolveFlag = async (flagId: number, context: Context): Promise<IFlagDTO> => {
  const response = await fetch(`${arenaBaseUrl}/flags/${flagId}`, context, {
    method: "PUT",
  });
  return await resolveJson(response);
};

export const getFlags = async (
  page: number | undefined,
  pageSize: number | undefined,
  context: Context,
): Promise<IPaginatedPostsDTO> => {
  const query = queryString.stringify({
    page,
    "page-size": pageSize,
  });

  const response = await fetch(`${arenaBaseUrl}/flags?${query}`, context);
  return await resolveJson(response);
};

export const getNotifications = async (
  page: number | undefined,
  pageSize: number | undefined,
  context: Context,
): Promise<IPaginatedNewPostNotificationsDTO> => {
  const query = queryString.stringify({
    page,
    "page-size": pageSize,
  });
  const response = await fetch(`${arenaBaseUrl}/notifications?${query}`, context);
  return await resolveJson(response);
};

export const markSingleNotificationAsRead = async (notificationId: number, context: Context): Promise<void> => {
  const response = await fetch(`${arenaBaseUrl}/notifications/${notificationId}`, context, { method: "POST" });
  return await resolveJson(response);
};

export const markAllNotificationAsRead = async (context: Context): Promise<void> => {
  await fetch(`${arenaBaseUrl}/notifications`, context, {
    method: "POST",
  });
};

export const deleteSingleNotification = async (notificationId: number, context: Context): Promise<void> => {
  const response = await fetch(`${arenaBaseUrl}/notifications/${notificationId}`, context, { method: "DELETE" });
  return await resolveJson(response);
};

export const deleteAllNotifications = async (context: Context): Promise<void> => {
  const response = await fetch(`${arenaBaseUrl}/notifications`, context, {
    method: "DELETE",
  });
  return await resolveJson(response);
};

export const getPostInContext = async (
  postId: number,
  pageSize: number | undefined,
  context: Context,
): Promise<ITopicWithPostsDTO> => {
  const query = queryString.stringify({ "page-size": pageSize });
  const response = await fetch(`${arenaBaseUrl}/posts/${postId}/topic?${query}`, context);
  return await resolveJson(response);
};

export const fetchArenaUser = async (username: string, context: Context): Promise<IArenaUserDTO> => {
  const response = await fetch(`${arenaBaseUrl}/user/${username}`, context);
  return await resolveJson(response);
};

export const fetchArenaUsers = async (
  page: number | undefined,
  pageSize: number | undefined,
  searchQuery: string | undefined,
  filterTeachers: boolean | undefined,
  context: Context,
): Promise<IPaginatedArenaUsersDTO> => {
  const query = queryString.stringify({
    query: searchQuery,
    "filter-teachers": filterTeachers,
    "page-size": pageSize,
    page,
  });
  const response = await fetch(`${arenaBaseUrl}/users?${query}`, context);
  return await resolveJson(response);
};

const VALID_ARENA_GROUPS: ArenaGroup[] = ["ADMIN"];

export const updateOtherUser = async (
  userId: number,
  data: GQLArenaUserV2Input,
  context: Context,
): Promise<IMyNDLAUserDTO> => {
  const arenaGroups = data.arenaGroups?.map((maybeGroup) => {
    if (VALID_ARENA_GROUPS.includes(maybeGroup as ArenaGroup)) return maybeGroup as ArenaGroup;
    throw new Error(`${maybeGroup} is not a valid arena group. Must be one of ${VALID_ARENA_GROUPS}`);
  });

  const body: IUpdatedMyNDLAUserDTO = {
    arenaEnabled: data.arenaEnabled,
    favoriteSubjects: data.favoriteSubjects,
    arenaGroups,
  };

  const response = await fetch(`${arenaBaseUrl}/users/${userId}`, context, {
    method: "PATCH",
    body: JSON.stringify(body),
  });

  return await resolveJson(response);
};

export const sortCategories = async (
  parentId: number | undefined,
  sortedIds: number[],
  context: Context,
): Promise<ICategoryDTO[]> => {
  const query = queryString.stringify({ "category-parent-id": parentId });
  const response = await fetch(`${arenaBaseUrl}/categories/sort?${query}`, context, {
    method: "PUT",
    body: JSON.stringify(sortedIds),
  });
  return await resolveJson(response);
};
