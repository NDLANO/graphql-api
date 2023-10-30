/**
 * Copyright (c) 2023-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  GQLArenaCategory,
  GQLArenaPost,
  GQLArenaTopic,
  GQLArenaUser,
  GQLQueryArenaCategoryArgs,
  GQLQueryArenaTopicArgs,
  GQLQueryArenaTopicsByUserArgs,
  GQLQueryArenaUserArgs,
} from '../types/schema';
import { fetch, resolveJson } from '../utils/apiHelpers';

const toUser = (user: any): GQLArenaUser => ({
  id: user.uid,
  displayName: user.displayname,
  username: user.username,
  profilePicture: user.picture,
  slug: user.userslug,
});

const toArenaPost = (post: any): GQLArenaPost => ({
  id: post.pid,
  topicId: post.tid,
  content: post.content,
  timestamp: post.timestampISO,
  isMainPost: post.isMainPost,
  user: toUser(post.user),
});

const toTopic = (topic: any): GQLArenaTopic => {
  const crumbs = [
    { type: 'category', id: topic.cid, name: topic.category.name },
    { type: 'topic', id: topic.tid, name: topic.title },
  ];
  return {
    id: topic.tid,
    categoryId: topic.cid,
    title: topic.title,
    slug: topic.slug,
    postCount: topic.postcount,
    timestamp: topic.timestampISO,
    locked: topic.locked === 1,
    posts: topic.posts ? topic.posts.map(toArenaPost) : [],
    breadcrumbs: crumbs,
  };
};

const toCategory = (category: any): GQLArenaCategory => {
  return {
    id: category.cid,
    description: category.description,
    htmlDescription: category.descriptionParsed,
    name: category.name,
    slug: category.slug,
    topicCount: category.topic_count,
    postCount: category.post_count,
    disabled: category.disabled === 1,
    topics: category.topics?.map(toTopic),
  };
};

export const fetchArenaUser = async (
  { username }: GQLQueryArenaUserArgs,
  context: Context,
): Promise<GQLArenaUser> => {
  const response = await fetch(
    `/groups/api/user/username/${username}`,
    context,
  );
  const resolved: any = await resolveJson(response);
  return toUser(resolved);
};

export const fetchArenaCategories = async (
  context: Context,
): Promise<GQLArenaCategory[]> => {
  const response = await fetch('/groups/api/categories', context);
  const resolved: any = await resolveJson(response);
  return resolved.categories.map(toCategory);
};

export const fetchArenaCategory = async (
  { categoryId, page }: GQLQueryArenaCategoryArgs,
  context: Context,
): Promise<GQLArenaCategory> => {
  const response = await fetch(
    `/groups/api/category/${categoryId}?page=${page}`,
    context,
  );
  const resolved: any = await resolveJson(response);
  return toCategory(resolved.category);
};

export const fetchArenaTopic = async (
  { topicId, page }: GQLQueryArenaTopicArgs,
  context: Context,
): Promise<GQLArenaTopic> => {
  const response = await fetch(
    `/groups/api/topic/${topicId}?page=${page}`,
    context,
  );
  const resolved: any = await resolveJson(response);
  return toTopic(resolved);
};

export const fetchArenaRecentTopics = async (
  context: Context,
): Promise<GQLArenaTopic[]> => {
  const response = await fetch('/groups/api/recent', context);
  const resolved = await resolveJson(response);
  return resolved.topics.map(toTopic);
};

export const fetchArenaTopicsByUser = async (
  { userSlug }: GQLQueryArenaTopicsByUserArgs,
  context: Context,
): Promise<GQLArenaTopic[]> => {
  const response = await fetch(`/groups/api/user/${userSlug}/topics`, context);
  const resolved = await resolveJson(response);
  return resolved.topics.map(toTopic);
};
