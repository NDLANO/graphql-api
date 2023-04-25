/**
 * Copyright (c) 2022-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import qs from 'query-string';
import {
  IMyNDLAUser,
  IFolder,
  IFolderData,
  IResource,
} from '@ndla/types-backend/learningpath-api';
import {
  fetch,
  resolveJson,
  resolveNothingFromStatus,
} from '../utils/apiHelpers';
import {
  GQLMutationAddFolderArgs,
  GQLMutationAddFolderResourceArgs,
  GQLMutationDeleteFolderArgs,
  GQLMutationDeleteFolderResourceArgs,
  GQLMutationSortFoldersArgs,
  GQLMutationSortResourcesArgs,
  GQLMutationUpdateFolderArgs,
  GQLMutationUpdateFolderResourceArgs,
  GQLMutationUpdateFolderStatusArgs,
  GQLMutationUpdatePersonalDataArgs,
  GQLQueryAllFolderResourcesArgs,
  GQLQueryFolderArgs,
  GQLQueryFoldersArgs,
  GQLSortResult,
} from '../types/schema';

interface QueryParamsType {
  [key: string]: any;
}

export const queryString = (params: QueryParamsType) => {
  const stringified = qs.stringify(params);
  return stringified.length ? `?${stringified}` : '';
};

export async function fetchFolders(
  { includeResources, includeSubfolders }: GQLQueryFoldersArgs,
  context: Context,
): Promise<IFolder[]> {
  const params = queryString({
    'include-resources': includeResources,
    'include-subfolders': includeSubfolders,
  });
  const response = await fetch(`/learningpath-api/v1/folders${params}`, {
    ...context,
    shouldUseCache: false,
  });
  const resolved: IFolder[] = await resolveJson(response);
  return resolved;
}

export async function fetchFolder(
  { id, includeResources, includeSubfolders }: GQLQueryFolderArgs,
  context: Context,
): Promise<IFolderData> {
  const params = queryString({ includeResources, includeSubfolders });
  const response = await fetch(`/learningpath-api/v1/folders/${id}${params}`, {
    ...context,
    shouldUseCache: false,
  });
  return await resolveJson(response);
}

export async function fetchSharedFolder(
  { id, includeResources, includeSubfolders }: GQLQueryFolderArgs,
  context: Context,
): Promise<IFolderData> {
  const params = queryString({ includeResources, includeSubfolders });
  const response = await fetch(
    `/learningpath-api/v1/folders/shared/${id}${params}`,
    {
      ...context,
      shouldUseCache: false,
    },
  );
  return await resolveJson(response);
}

export async function fetchAllFolderResources(
  { size }: GQLQueryAllFolderResourcesArgs,
  context: Context,
): Promise<IResource[]> {
  const params = queryString({ size });
  const response = await fetch(
    `/learningpath-api/v1/folders/resources/${params}`,
    {
      ...context,
      shouldUseCache: false,
    },
  );
  const resolved = await resolveJson(response);
  return resolved;
}

export async function postFolder(
  { name, parentId, status, description }: GQLMutationAddFolderArgs,
  context: Context,
): Promise<IFolder> {
  const response = await fetch(`/learningpath-api/v1/folders`, context, {
    method: 'POST',
    body: JSON.stringify({ name, parentId, status, description }),
  });
  const folder = await resolveJson(response);
  return folder;
}

export async function patchFolder(
  { id, name, status, description }: GQLMutationUpdateFolderArgs,
  context: Context,
): Promise<IFolder> {
  const response = await fetch(`/learningpath-api/v1/folders/${id}`, context, {
    method: 'PATCH',
    body: JSON.stringify({ name, status, description }),
  });
  const folder = await resolveJson(response);
  return folder;
}

export async function deleteFolder(
  { id }: GQLMutationDeleteFolderArgs,
  context: Context,
): Promise<string> {
  await fetch(`/learningpath-api/v1/folders/${id}`, context, {
    method: 'DELETE',
  });
  return id;
}

export async function postFolderResource(
  {
    folderId,
    resourceType,
    path,
    tags,
    resourceId,
  }: GQLMutationAddFolderResourceArgs,
  context: Context,
): Promise<IResource> {
  const response = await fetch(
    `/learningpath-api/v1/folders/${folderId}/resources/`,
    context,
    {
      method: 'POST',
      body: JSON.stringify({ resourceType, path, tags, resourceId }),
    },
  );

  return await resolveJson(response);
}

export async function patchFolderResource(
  { id, tags }: GQLMutationUpdateFolderResourceArgs,
  context: Context,
): Promise<IResource> {
  const response = await fetch(
    `/learningpath-api/v1/folders/resources/${id}`,
    context,
    {
      method: 'PATCH',
      body: JSON.stringify({ tags }),
    },
  );

  return await resolveJson(response);
}

export async function deleteFolderResource(
  { folderId, resourceId }: GQLMutationDeleteFolderResourceArgs,
  context: Context,
): Promise<string> {
  await fetch(
    `/learningpath-api/v1/folders/${folderId}/resources/${resourceId}`,
    context,
    {
      method: 'DELETE',
    },
  );
  return resourceId;
}

export async function deletePersonalData(context: Context): Promise<boolean> {
  try {
    await fetch('/learningpath-api/v1/users/delete-personal-data/', context, {
      method: 'DELETE',
    });
    return true;
  } catch (e) {
    return false;
  }
}

export async function getPersonalData(context: Context): Promise<IMyNDLAUser> {
  const response = await fetch(`/learningpath-api/v1/users/`, {
    ...context,
    shouldUseCache: false,
  });
  return await resolveJson(response);
}

export async function patchPersonalData(
  userData: GQLMutationUpdatePersonalDataArgs,
  context: Context,
): Promise<IMyNDLAUser> {
  const response = await fetch(`/learningpath-api/v1/users/`, context, {
    method: 'PATCH',
    body: JSON.stringify(userData),
  });
  return await resolveJson(response);
}

export async function sortFolders(
  { parentId, sortedIds }: GQLMutationSortFoldersArgs,
  context: Context,
): Promise<GQLSortResult> {
  const query = queryString({
    'folder-id': parentId,
  });

  const response = await fetch(
    `/learningpath-api/v1/folders/sort-subfolders${query}`,
    context,
    {
      method: 'PUT',
      body: JSON.stringify({ sortedIds }),
    },
  );
  await resolveNothingFromStatus(response);
  return { parentId, sortedIds };
}

export async function sortResources(
  { parentId, sortedIds }: GQLMutationSortResourcesArgs,
  context: Context,
): Promise<GQLSortResult> {
  const response = await fetch(
    `/learningpath-api/v1/folders/sort-resources/${parentId}`,
    context,
    {
      method: 'PUT',
      body: JSON.stringify({ sortedIds }),
    },
  );
  await resolveNothingFromStatus(response);
  return { parentId, sortedIds };
}

export async function updateFolderStatus(
  { folderId, status }: GQLMutationUpdateFolderStatusArgs,
  context: Context,
): Promise<string[]> {
  const params = queryString({ 'folder-status': status });
  const response = await fetch(
    `/learningpath-api/v1/folders/shared/${folderId}${params}`,
    context,
    {
      method: 'PATCH',
    },
  );

  return await resolveJson(response);
}
