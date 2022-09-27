/**
 * Copyright (c) 2022-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import qs from 'query-string';
import { IFolder, IFolderData, IResource } from '@ndla/types-learningpath-api';
import {
  fetch,
  resolveJson,
  resolveNothingFromStatus,
} from '../utils/apiHelpers';

interface QueryParamsType {
  [key: string]: any;
}

export const queryString = (params: QueryParamsType) => {
  const stringified = qs.stringify(params);
  return stringified.length ? `?${stringified}` : '';
};

export async function fetchFolders(
  { includeResources, includeSubfolders }: QueryToFoldersArgs,
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
  { id, includeResources, includeSubfolders }: QueryToFolderArgs,
  context: Context,
): Promise<IFolderData> {
  const params = queryString({ includeResources, includeSubfolders });
  const response = await fetch(`/learningpath-api/v1/folders/${id}${params}`, {
    ...context,
    shouldUseCache: false,
  });
  return await resolveJson(response);
}

export async function fetchAllFolderResources(
  { size }: QueryToAllFolderResourcesArgs,
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
  { name, parentId, status }: MutationToAddFolderArgs,
  context: Context,
): Promise<IFolder> {
  const response = await fetch(`/learningpath-api/v1/folders`, context, {
    method: 'POST',
    body: JSON.stringify({ name, parentId, status }),
  });
  const folder = await resolveJson(response);
  return folder;
}

export async function patchFolder(
  { id, name, status }: MutationToUpdateFolderArgs,
  context: Context,
): Promise<IFolder> {
  const response = await fetch(`/learningpath-api/v1/folders/${id}`, context, {
    method: 'PATCH',
    body: JSON.stringify({ name, status }),
  });
  const folder = await resolveJson(response);
  return folder;
}

export async function deleteFolder(
  { id }: MutationToDeleteFolderArgs,
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
  }: MutationToAddFolderResourceArgs,
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
  { id, tags }: MutationToUpdateFolderResourceArgs,
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
  { folderId, resourceId }: MutationToDeleteFolderResourceArgs,
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

export async function sortFolders(
  { parentId, sortedIds }: MutationToSortFoldersArgs,
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
  { parentId, sortedIds }: MutationToSortResourcesArgs,
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
