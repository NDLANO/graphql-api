/**
 * Copyright (c) 2023-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { GraphQLError } from "graphql";
import he from "he";
import {
  GQLArenaCategory,
  GQLArenaNotification,
  GQLArenaPost,
  GQLArenaTopic,
  GQLArenaUser,
  GQLCategoryBreadcrumb,
  GQLMutationAddPostUpvoteArgs,
  GQLMutationDeletePostArgs,
  GQLMutationDeleteTopicArgs,
  GQLMutationNewArenaTopicArgs,
  GQLMutationNewFlagArgs,
  GQLMutationRemovePostUpvoteArgs,
  GQLMutationReplyToTopicArgs,
  GQLMutationSubscribeToTopicArgs,
  GQLMutationUnsubscribeFromTopicArgs,
  GQLMutationUpdatePostArgs,
  GQLQueryArenaCategoryArgs,
  GQLQueryArenaTopicArgs,
  GQLQueryArenaTopicsByUserArgs,
  GQLQueryArenaUserArgs,
} from "../types/schema";
import { fetch, resolveJson } from "../utils/apiHelpers";

const toArenaUser = (user: any): GQLArenaUser => ({
  id: user.uid,
  displayName: user.displayname,
  username: user.username,
  profilePicture: user.picture,
  slug: user.userslug,
  location: user.location,
  groupTitleArray: user.groupTitleArray,
});

const toArenaPost = (post: any, mainPid?: any): GQLArenaPost => ({
  id: post.pid,
  topicId: post.tid,
  content: post.content,
  timestamp: post.timestampISO,
  isMainPost: post.isMainPost ?? post.pid === mainPid,
  user: toArenaUser(post.user),
  deleted: post.deleted,
  flagId: post.flagId,
  toPid: post.toPid,
  replies: [],
  upvotes: post.upvotes,
  upvoted: post.upvoted ?? false,
});

const createPostTree = (posts: GQLArenaPost[]): GQLArenaPost[] => {
  const allPostsMap: Record<number, GQLArenaPost> = {};
  const rootPostsMap: Record<number, Omit<GQLArenaPost, "toPid">> = {};

  // Create a map of posts using their IDs as keys
  posts.forEach((post) => {
    allPostsMap[post.id] = post;
    if (!post.toPid) {
      rootPostsMap[post.id] = post;
    }
  });
  const findParentPost = (post: GQLArenaPost): GQLArenaPost => {
    if (post.toPid && allPostsMap[post.toPid]) {
      return findParentPost(allPostsMap[post.toPid]!);
    } else {
      return post;
    }
  };
  // Append posts into their parent post
  posts.forEach((post) => {
    const rootPost = findParentPost(post);
    if (post.id !== rootPost.id) {
      rootPostsMap[rootPost.id]!.replies.push(post);
    }
  });
  return Object.values(rootPostsMap);
};

const toTopic = (topic: any): GQLArenaTopic => {
  const crumbs = [
    { type: "category", id: topic.cid, name: he.decode(topic.category.name) },
    { type: "topic", id: topic.tid, name: he.decode(topic.title) },
  ];
  return {
    id: topic.tid,
    categoryId: topic.cid,
    title: he.decode(topic.title),
    slug: topic.slug,
    postCount: topic.postcount,
    timestamp: topic.timestampISO,
    locked: topic.locked === 1,
    pinned: topic.pinned === 1,
    posts: topic.posts
      ? createPostTree(topic.posts.map((post: any) => toArenaPost(post, topic.mainPid)))
      : topic.mainPost
        ? [toArenaPost(topic.mainPost, topic.mainPid)]
        : [],
    breadcrumbs: crumbs,
    deleted: topic.deleted,
    isFollowing: topic.isFollowing,
  };
};

const toCategoryBreadcrumbs = (category: any, parentBreadcrumbs?: GQLCategoryBreadcrumb[]): GQLCategoryBreadcrumb[] => {
  if (parentBreadcrumbs !== undefined) {
    return [...parentBreadcrumbs, { id: category.cid, title: he.decode(category.name) }];
  }

  const categoryCrumbs = category.breadcrumbs?.filter((breadcrumb: any) => !!breadcrumb.cid);
  return categoryCrumbs?.map((bc: any) => ({ id: bc.cid, title: he.decode(bc.text) })) ?? [];
};

const toCategory = (category: any, parentBreadcrumbs?: GQLCategoryBreadcrumb[]): GQLArenaCategory => {
  const breadcrumbs = toCategoryBreadcrumbs(category, parentBreadcrumbs);
  return {
    id: category.cid,
    description: category.description,
    htmlDescription: category.descriptionParsed,
    name: he.decode(category.name),
    slug: category.slug,
    topicCount: category.topic_count,
    postCount: category.post_count,
    disabled: category.disabled === 1,
    topics: category.topics?.map(toTopic),
    breadcrumbs,
    parentCategoryId: category?.parent?.cid,
    children: category.children?.map((child: any) => toCategory(child, breadcrumbs)),
  };
};

const toNotification = (notification: any): GQLArenaNotification => ({
  bodyShort: notification.bodyShort,
  datetimeISO: notification.datetimeISO,
  from: notification.from,
  importance: notification.importance,
  path: notification.path,
  read: notification.read,
  user: toArenaUser(notification.user),
  readClass: notification.readClass,
  image: notification.image,
  topicTitle: he.decode(notification.topicTitle),
  type: notification.type,
  subject: notification.subject,
  topicId: notification.tid,
  postId: notification.pid,
  notificationId: notification.nid,
});

export const fetchCsrfTokenForSession = async (
  context: Context,
): Promise<{ cookie: string; "x-csrf-token": string }> => {
  const incomingCookie = context.req.headers.cookie;
  const incomingCsrfToken = context.req.headers["x-csrf-token"];
  if (incomingCookie !== undefined && typeof incomingCsrfToken === "string") {
    return { cookie: incomingCookie, "x-csrf-token": incomingCsrfToken };
  }

  const response = await fetch("/groups/api/config", context);
  const resolved: any = await resolveJson(response);
  const responseCookie = response.headers.get("set-cookie");

  if (!responseCookie)
    throw new Error("Did not get set-cookie header from /groups/api/config endpoint to use together with csrf token.");

  const token = resolved.csrf_token;
  return {
    "x-csrf-token": token,
    cookie: responseCookie,
  };
};

export const fetchArenaUser = async ({ username }: GQLQueryArenaUserArgs, context: Context): Promise<GQLArenaUser> => {
  const csrfHeaders = await fetchCsrfTokenForSession(context);
  const response = await fetch(
    `/groups/api/user/username/${username}`,
    { ...context, shouldUseCache: false },
    { headers: csrfHeaders },
  );
  const resolved: any = await resolveJson(response);
  return toArenaUser(resolved);
};

export const fetchArenaCategories = async (context: Context): Promise<GQLArenaCategory[]> => {
  const csrfHeaders = await fetchCsrfTokenForSession(context);
  const response = await fetch(
    "/groups/api/categories",
    { ...context, shouldUseCache: false },
    { headers: csrfHeaders },
  );
  const resolved: any = await resolveJson(response);
  return resolved.categories.map((c: any) => toCategory(c));
};

export const fetchArenaCategory = async (
  { categoryId, page }: GQLQueryArenaCategoryArgs,
  context: Context,
): Promise<GQLArenaCategory> => {
  const csrfHeaders = await fetchCsrfTokenForSession(context);
  const response = await fetch(
    `/groups/api/category/${categoryId}?page=${page}`,
    { ...context, shouldUseCache: false },
    { headers: csrfHeaders },
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
    { ...context, shouldUseCache: false },
    { headers: csrfHeaders },
  );

  const resolved = await resolveJson(response);

  if (response.ok) {
    return toTopic(resolved);
  } else {
    throw new GraphQLError(resolved.status.message, {
      extensions: { status: response.status },
    });
  }
};

export const markNotificationRead = async (tid: number, context: Context) => {
  const csrfHeaders = await fetchCsrfTokenForSession(context);
  await fetch(
    `/groups/api/v3/topics/${tid}/read`,
    { ...context, shouldUseCache: false },
    { headers: csrfHeaders, method: "PUT" },
  );
};

export const fetchArenaRecentTopics = async (context: Context): Promise<GQLArenaTopic[]> => {
  const csrfHeaders = await fetchCsrfTokenForSession(context);
  const response = await fetch("/groups/api/recent", { ...context, shouldUseCache: false }, { headers: csrfHeaders });
  const resolved = await resolveJson(response);
  return resolved.topics.map(toTopic);
};

export const fetchArenaTopicsByUser = async (
  { userSlug }: GQLQueryArenaTopicsByUserArgs,
  context: Context,
): Promise<GQLArenaTopic[]> => {
  const csrfHeaders = await fetchCsrfTokenForSession(context);
  const response = await fetch(
    `/groups/api/user/${userSlug}/topics`,
    { ...context, shouldUseCache: false },
    { headers: csrfHeaders },
  );
  const resolved = await resolveJson(response);
  return resolved.topics.map(toTopic);
};

export const fetchArenaNotifications = async (context: Context): Promise<GQLArenaNotification[]> => {
  const csrfHeaders = await fetchCsrfTokenForSession(context);
  const response = await fetch(
    "/groups/api/notifications",
    { ...context, shouldUseCache: false },
    { headers: csrfHeaders },
  );
  const resolved = await resolveJson(response);
  return resolved.notifications.filter(({ type }: any) => type === "new-reply").map(toNotification);
};

export const newTopic = async (
  { title, content, categoryId }: GQLMutationNewArenaTopicArgs,
  context: Context,
): Promise<GQLArenaTopic> => {
  const csrfHeaders = await fetchCsrfTokenForSession(context);
  const response = await fetch(
    `/groups/api/v3/topics`,
    { ...context, shouldUseCache: false },
    {
      method: "POST",
      headers: { "content-type": "application/json", ...csrfHeaders },
      body: JSON.stringify({
        cid: categoryId,
        title,
        content,
      }),
    },
  );
  const resolved = await resolveJson(response);
  return toTopic(resolved.response);
};

export const replyToTopic = async ({ topicId, content, postId }: GQLMutationReplyToTopicArgs, context: Context) => {
  const csrfHeaders = await fetchCsrfTokenForSession(context);
  const response = await fetch(
    `/groups/api/v3/topics/${topicId}`,
    { ...context, shouldUseCache: false },
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...csrfHeaders,
      },
      body: JSON.stringify({
        content,
        toPid: postId,
      }),
    },
  );
  const resolved = await resolveJson(response);
  return toArenaPost(resolved.response, undefined);
};

export const addPostUpvote = async ({ postId }: GQLMutationAddPostUpvoteArgs, context: Context) => {
  const csrfHeaders = await fetchCsrfTokenForSession(context);
  await fetch(
    `/groups/api/v3/posts/${postId}/vote`,
    { ...context, shouldUseCache: false },
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        ...csrfHeaders,
      },
      body: JSON.stringify({ delta: 1 }),
    },
  );
  return postId;
};

export const removePostUpvote = async ({ postId }: GQLMutationRemovePostUpvoteArgs, context: Context) => {
  const csrfHeaders = await fetchCsrfTokenForSession(context);
  await fetch(
    `/groups/api/v3/posts/${postId}/vote`,
    { ...context, shouldUseCache: false },
    {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        ...csrfHeaders,
      },
    },
  );
  return postId;
};

export const deletePost = async ({ postId }: GQLMutationDeletePostArgs, context: Context) => {
  const csrfHeaders = await fetchCsrfTokenForSession(context);
  await fetch(
    `/groups/api/v3/posts/${postId}/state`,
    { ...context, shouldUseCache: false },
    {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        ...csrfHeaders,
      },
    },
  );
  return postId;
};

export const deleteTopic = async ({ topicId }: GQLMutationDeleteTopicArgs, context: Context) => {
  const csrfHeaders = await fetchCsrfTokenForSession(context);
  await fetch(
    `/groups/api/v3/topics/${topicId}/state`,
    { ...context, shouldUseCache: false },
    {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        ...csrfHeaders,
      },
    },
  );
  return topicId;
};

export const updatePost = async ({ postId, content, title }: GQLMutationUpdatePostArgs, context: Context) => {
  const csrfHeaders = await fetchCsrfTokenForSession(context);
  const response = await fetch(
    `/groups/api/v3/posts/${postId}`,
    { ...context, shouldUseCache: false },
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        ...csrfHeaders,
      },
      body: JSON.stringify({
        content,
        title,
      }),
    },
  );
  const resolved = await resolveJson(response);
  return toArenaPost(resolved.response);
};

export const newFlag = async ({ type, id, reason }: GQLMutationNewFlagArgs, context: Context): Promise<number> => {
  const csrfHeaders = await fetchCsrfTokenForSession(context);
  const response = await fetch(
    `/groups/api/v3/flags`,
    { ...context, shouldUseCache: false },
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...csrfHeaders,
      },
      body: JSON.stringify({
        id: id,
        type: type,
        reason: reason,
      }),
    },
  );
  const { status, ok } = response;
  const jsonResponse = await response.json();

  if (ok) return id;
  throw new GraphQLError(jsonResponse.status.message, {
    extensions: { status },
  });
};

export const subscribeToTopic = async (
  { topicId }: GQLMutationSubscribeToTopicArgs,
  context: Context,
): Promise<number> => {
  const csrfHeaders = await fetchCsrfTokenForSession(context);
  const response = await fetch(
    `/groups/api/v3/topics/${topicId}/follow`,
    { ...context, shouldUseCache: false },
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        ...csrfHeaders,
      },
    },
  );

  if (response.ok) {
    return topicId;
  }

  const resolved = await resolveJson(response);
  throw new GraphQLError(resolved.status.message, {
    extensions: { status: response.status },
  });
};

export const unsubscribeFromTopic = async (
  { topicId }: GQLMutationUnsubscribeFromTopicArgs,
  context: Context,
): Promise<number> => {
  const csrfHeaders = await fetchCsrfTokenForSession(context);
  const response = await fetch(
    `/groups/api/v3/topics/${topicId}/follow`,
    { ...context, shouldUseCache: false },
    {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        ...csrfHeaders,
      },
    },
  );

  if (response.ok) {
    return topicId;
  }

  const resolved = await resolveJson(response);
  throw new GraphQLError(resolved.status.message, {
    extensions: { status: response.status },
  });
};
