/**
 * Copyright (c) 2023-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  GQLArenaCategory,
  GQLArenaNotification,
  GQLArenaNotificationUser,
  GQLArenaPost,
  GQLArenaTopic,
  GQLArenaUser,
  GQLBaseUser,
  GQLFullArenaUser,
  GQLMutationNewArenaTopicArgs,
  GQLMutationReplyToTopicArgs,
  GQLQueryArenaCategoryArgs,
  GQLQueryArenaTopicArgs,
  GQLQueryArenaTopicsByUserArgs,
  GQLQueryArenaUserArgs,
} from '../types/schema';
import { fetch, resolveJson } from '../utils/apiHelpers';

const toBaseUser = (user: any): Omit<GQLBaseUser, '__typename'> => ({
  id: user.uid,
  displayName: user.displayname,
  username: user.username,
  profilePicture: user.picture,
  slug: user.userslug,
});

const toFullArenaUser = (user: any): GQLFullArenaUser => ({
  ...toBaseUser(user),
  location: user.location,
  groupTitleArray: user.groupTitleArray,
});

const toArenaUser = (user: any): GQLArenaUser => ({
  ...toBaseUser(user),
  groupTitleArray: user.groupTitleArray,
});

const toArenaNotificationUser = (user: any): GQLArenaNotificationUser => ({
  ...toBaseUser(user),
});

const toArenaPost = (post: any, mainPid?: any): GQLArenaPost => ({
  id: post.pid,
  topicId: post.tid,
  content: post.content,
  timestamp: post.timestampISO,
  isMainPost: post.isMainPost ?? post.pid === mainPid,
  user: toArenaUser(post.user),
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
    posts: topic.posts
      ? topic.posts.map((post: any) => toArenaPost(post, topic.mainPid))
      : topic.mainPost
      ? [toArenaPost(topic.mainPost, topic.mainPid)]
      : [],
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

const toNotification = (notification: any): GQLArenaNotification => ({
  bodyShort: notification.bodyShort,
  datetimeISO: notification.datetimeISO,
  from: notification.from,
  importance: notification.importance,
  path: notification.path,
  read: notification.read,
  user: toArenaNotificationUser(notification.user),
  readClass: notification.readClass,
  image: notification.image,
  topicTitle: notification.topicTitle,
  type: notification.type,
  subject: notification.subject,
  topicId: notification.tid,
  postId: notification.pid,
  notificationId: notification.nid,
});
export const fetchCsrfTokenForSession = async (
  context: Context,
): Promise<{ cookie: string; 'x-csrf-token': string }> => {
  const incomingCookie = context.req.headers.cookie;
  const incomingCsrfToken = context.req.headers['x-csrf-token'];
  if (incomingCookie !== undefined && typeof incomingCsrfToken === 'string') {
    return { cookie: incomingCookie, 'x-csrf-token': incomingCsrfToken };
  }

  const response = await fetch('/groups/api/config', context);
  const resolved: any = await resolveJson(response);
  const responseCookie = response.headers.get('set-cookie');

  if (!responseCookie)
    throw new Error(
      'Did not get set-cookie header from /groups/api/config endpoint to use together with csrf token.',
    );

  const token = resolved.csrf_token;
  return {
    'x-csrf-token': token,
    cookie: responseCookie,
  };
};

export const fetchArenaUser = async (
  { username }: GQLQueryArenaUserArgs,
  context: Context,
): Promise<GQLFullArenaUser> => {
  const response = await fetch(
    `/groups/api/user/username/${username}`,
    context,
  );
  const resolved: any = await resolveJson(response);
  return toFullArenaUser(resolved);
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
  const resolved = await resolveJson(response);
  return toCategory(resolved);
};

export const fetchArenaTopic = async (
  { topicId, page }: GQLQueryArenaTopicArgs,
  context: Context,
): Promise<GQLArenaTopic> => {
  const csrfHeaders = await fetchCsrfTokenForSession(context);
  const response = await fetch(
    `/groups/api/topic/${topicId}?page=${page ?? 1}`,
    context,
    { headers: csrfHeaders },
  );
  const resolved = await resolveJson(response);
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

export const fetchArenaNotifications = async (
  context: Context,
): Promise<GQLArenaNotification[]> => {
  const response = await fetch('/groups/api/notifications', context);
  const resolved = await resolveJson(response);
  return resolved.notifications.map(toNotification);
};

export const newTopic = async (
  { title, content, categoryId }: GQLMutationNewArenaTopicArgs,
  context: Context,
): Promise<GQLArenaTopic> => {
  const csrfHeaders = await fetchCsrfTokenForSession(context);
  const response = await fetch(`/groups/api/v3/topics`, context, {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...csrfHeaders },
    body: JSON.stringify({
      cid: categoryId,
      title,
      content,
    }),
  });
  const resolved = await resolveJson(response);
  return toTopic(resolved.response);
};

export const replyToTopic = async (
  { topicId, content }: GQLMutationReplyToTopicArgs,
  context: Context,
) => {
  const csrfHeaders = await fetchCsrfTokenForSession(context);
  const response = await fetch(`/groups/api/v3/topics/${topicId}`, context, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...csrfHeaders,
    },
    body: JSON.stringify({
      content,
    }),
  });
  const resolved = await resolveJson(response);
  return toArenaPost(resolved.response, undefined);
};
