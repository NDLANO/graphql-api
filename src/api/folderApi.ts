/**
 * Copyright (c) 2022-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import qs from 'query-string';
import { IFolder, IFolderData, IResource } from '@ndla/types-learningpath-api';
import { fetch, resolveJson } from '../utils/apiHelpers';

type QueryParamsType = { [key: string]: any };

export const queryString = (params: QueryParamsType) => {
  const stringified = qs.stringify(params);
  return stringified.length ? `?${stringified}` : '';
};

export async function fetchFolders(
  { includeResources, includeSubfolders }: QueryToFoldersArgs,
  context: Context,
): Promise<IFolderData[]> {
  const params = queryString({ includeResources, includeSubfolders });
  const response = await fetch(`/learningpath-api/v1/folders${params}`, {
    ...context,
    shouldUseCache: false,
  });
  return await resolveJson(response);
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
  const response = await fetch(`/learningpath-api/v1/resources${params}`, {
    ...context,
    shouldUseCache: false,
  });
  return await resolveJson(response);
}

export async function postFolder(
  { name, parentId, status }: MutationToAddFolderArgs,
  context: Context,
): Promise<IFolder> {
  const response = await fetch(`/learningpath-api/v1/folders`, context, {
    method: 'POST',
    body: JSON.stringify({ name, parentId, status }),
  });
  return await resolveJson(response);
}

export async function patchFolder(
  { id, name, status }: MutationToUpdateFolderArgs,
  context: Context,
): Promise<IFolder> {
  const response = await fetch(`/learningpath-api/v1/folders/${id}`, context, {
    method: 'PATCH',
    body: JSON.stringify({ name, status }),
  });
  return await resolveJson(response);
}

export async function deleteFolder(
  { id }: MutationToDeleteFolderArgs,
  context: Context,
): Promise<string> {
  const response = await fetch(`/learningpath-api/v1/folders/${id}`, context, {
    method: 'DELETE',
  });
  return id;
}

export async function postFolderResource(
  { folderId, resourceType, path, tags }: MutationToAddFolderResourceArgs,
  context: Context,
): Promise<IResource> {
  const response = await fetch(
    `/learningpath-api/v1/folders/${folderId}`,
    context,
    {
      method: 'POST',
      body: JSON.stringify({ resourceType, path, tags }),
    },
  );

  return await resolveJson(response);
}

export async function patchFolderResource(
  { id, tags }: MutationToUpdateFolderResourceArgs,
  context: Context,
): Promise<IResource> {
  const response = await fetch(`/learningpath-api/v1/folders/${id}`, context, {
    method: 'PATCH',
    body: JSON.stringify({ tags }),
  });

  return await resolveJson(response);
}

export async function deleteFolderResource(
  { id }: MutationToDeleteFolderResourceArgs,
  context: Context,
): Promise<IResource> {
  const response = await fetch(`/learningpath-api/v1/folders/${id}`, context, {
    method: 'DELETE',
  });
  return await resolveJson(response);
}
