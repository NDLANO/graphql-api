/**
 * Copyright (c) 2022-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  IMyNDLAUserDTO,
  IFolderDTO,
  IFolderDataDTO,
  IResourceDTO,
  IUserFolderDTO,
  ResourceType,
  openapi,
  FolderStatus,
} from "@ndla/types-backend/myndla-api";
import {
  GQLMutationAddFolderArgs,
  GQLMutationAddFolderResourceArgs,
  GQLMutationCopySharedFolderArgs,
  GQLMutationDeleteFolderArgs,
  GQLMutationDeleteFolderResourceArgs,
  GQLMutationFavoriteSharedFolderArgs,
  GQLMutationSortFoldersArgs,
  GQLMutationSortResourcesArgs,
  GQLMutationSortSavedSharedFoldersArgs,
  GQLMutationUnFavoriteSharedFolderArgs,
  GQLMutationUpdateFolderArgs,
  GQLMutationUpdateFolderResourceArgs,
  GQLMutationUpdateFolderStatusArgs,
  GQLMutationUpdatePersonalDataArgs,
  GQLQueryAllFolderResourcesArgs,
  GQLQueryFolderArgs,
  GQLQueryFoldersArgs,
  GQLSortResult,
} from "../types/schema";
import { createAuthClient, resolveJsonOATS, resolveOATS } from "../utils/openapi-fetch/utils";

const client = createAuthClient<openapi.paths>({ disableCache: true });

export async function fetchFolders(
  { includeResources, includeSubfolders }: GQLQueryFoldersArgs,
  _context: Context,
): Promise<IUserFolderDTO> {
  return client
    .GET("/myndla-api/v1/folders", {
      params: {
        query: {
          "include-resources": includeResources,
          "include-subfolders": includeSubfolders,
        },
      },
    })
    .then(resolveJsonOATS);
}

export async function fetchFolder(
  { id, includeResources, includeSubfolders }: GQLQueryFolderArgs,
  _context: Context,
): Promise<IFolderDataDTO> {
  return client
    .GET("/myndla-api/v1/folders/{folder-id}", {
      params: {
        path: {
          "folder-id": id,
        },
        query: {
          "include-resources": includeResources,
          "include-subfolders": includeSubfolders,
        },
      },
    })
    .then(resolveJsonOATS);
}

export async function fetchSharedFolder({ id }: GQLQueryFolderArgs, _context: Context): Promise<IFolderDataDTO> {
  return client
    .GET("/myndla-api/v1/folders/shared/{folder-id}", {
      params: { path: { "folder-id": id } },
    })
    .then(resolveJsonOATS);
}

export async function fetchAllFolderResources(
  { size }: GQLQueryAllFolderResourcesArgs,
  _context: Context,
): Promise<IResourceDTO[]> {
  return client.GET("/myndla-api/v1/folders/resources", { params: { query: { size } } }).then(resolveJsonOATS);
}

export async function postFolder(
  { name, parentId, status, description }: GQLMutationAddFolderArgs,
  _context: Context,
): Promise<IFolderDTO> {
  const body = {
    name,
    parentId,
    status,
    description,
  };

  return client.POST("/myndla-api/v1/folders", { body }).then(resolveJsonOATS);
}

export async function patchFolder(
  { id, name, status, description }: GQLMutationUpdateFolderArgs,
  _context: Context,
): Promise<IFolderDTO> {
  return client
    .PATCH("/myndla-api/v1/folders/{folder-id}", {
      params: { path: { "folder-id": id } },
      body: { name, status, description },
    })
    .then(resolveJsonOATS);
}

export async function deleteFolder({ id }: GQLMutationDeleteFolderArgs, _context: Context): Promise<string> {
  await client
    .DELETE("/myndla-api/v1/folders/{folder-id}", { params: { path: { "folder-id": id } } })
    .then(resolveOATS);
  return id;
}

export async function postFolderResource(
  { folderId, resourceType, path, tags, resourceId }: GQLMutationAddFolderResourceArgs,
  _context: Context,
): Promise<IResourceDTO> {
  return client
    .POST("/myndla-api/v1/folders/{folder-id}/resources", {
      params: { path: { "folder-id": folderId } },
      body: {
        resourceType: resourceType as ResourceType,
        path,
        tags,
        resourceId,
      },
    })
    .then(resolveJsonOATS);
}

export async function patchFolderResource(
  { id, tags }: GQLMutationUpdateFolderResourceArgs,
  _context: Context,
): Promise<IResourceDTO> {
  return client
    .PATCH("/myndla-api/v1/folders/resources/{resource-id}", {
      params: { path: { "resource-id": id } },
      body: { tags },
    })
    .then(resolveJsonOATS);
}

export async function deleteFolderResource(
  { folderId, resourceId }: GQLMutationDeleteFolderResourceArgs,
  _context: Context,
): Promise<string> {
  return client
    .DELETE("/myndla-api/v1/folders/{folder-id}/resources/{resource-id}", {
      params: {
        path: {
          "folder-id": folderId,
          "resource-id": resourceId,
        },
      },
    })
    .then(resolveJsonOATS);
}

export async function deletePersonalData(_context: Context): Promise<boolean> {
  try {
    await client.DELETE("/myndla-api/v1/users/delete-personal-data", {});
    return true;
  } catch (e) {
    return false;
  }
}

export async function getPersonalData(_context: Context): Promise<IMyNDLAUserDTO | undefined> {
  try {
    return client.GET("/myndla-api/v1/users", {}).then(resolveJsonOATS);
  } catch (e) {
    return undefined;
  }
}

export async function patchPersonalData(
  userData: GQLMutationUpdatePersonalDataArgs,
  _context: Context,
): Promise<IMyNDLAUserDTO> {
  return client
    .PATCH("/myndla-api/v1/users", {
      body: userData,
    })
    .then(resolveJsonOATS);
}

export async function sortFolders(
  { parentId, sortedIds }: GQLMutationSortFoldersArgs,
  _context: Context,
): Promise<GQLSortResult> {
  await client
    .PUT("/myndla-api/v1/folders/sort-subfolders", {
      params: {
        query: {
          "folder-id": parentId,
        },
      },
      body: { sortedIds },
    })
    .then(resolveOATS);

  return { parentId, sortedIds };
}

export async function sortResources(
  { parentId, sortedIds }: GQLMutationSortResourcesArgs,
  _context: Context,
): Promise<GQLSortResult> {
  await client
    .PUT("/myndla-api/v1/folders/sort-resources/{folder-id}", {
      params: { path: { "folder-id": parentId } },
      body: { sortedIds },
    })
    .then(resolveOATS);
  return { parentId, sortedIds };
}

export async function sortSavedSharedFolders(
  { sortedIds }: GQLMutationSortSavedSharedFoldersArgs,
  _context: Context,
): Promise<GQLSortResult> {
  await client
    .PUT("/myndla-api/v1/folders/sort-saved", {
      body: { sortedIds },
    })
    .then(resolveOATS);

  return { sortedIds };
}

export async function updateFolderStatus(
  { folderId, status }: GQLMutationUpdateFolderStatusArgs,
  _context: Context,
): Promise<string[]> {
  return client
    .PATCH("/myndla-api/v1/folders/shared/{folder-id}", {
      params: {
        path: {
          "folder-id": folderId,
        },
        query: {
          "folder-status": status as FolderStatus,
        },
      },
    })
    .then(resolveJsonOATS);
}

export async function copySharedFolder(
  { folderId, destinationFolderId }: GQLMutationCopySharedFolderArgs,
  _context: Context,
) {
  return client
    .POST("/myndla-api/v1/folders/clone/{source-folder-id}", {
      params: {
        path: {
          "source-folder-id": folderId,
        },
        query: {
          "destination-folder-id": destinationFolderId,
        },
      },
    })
    .then(resolveJsonOATS);
}

export async function favoriteSharedFolder(
  { folderId }: GQLMutationFavoriteSharedFolderArgs,
  _context: Context,
): Promise<string> {
  await client
    .POST("/myndla-api/v1/folders/shared/{folder-id}/save", {
      params: {
        path: {
          "folder-id": folderId,
        },
      },
    })
    .then(resolveOATS);

  return folderId;
}

export async function unFavoriteSharedFolder(
  { folderId }: GQLMutationUnFavoriteSharedFolderArgs,
  _context: Context,
): Promise<string> {
  await client
    .DELETE("/myndla-api/v1/folders/shared/{folder-id}/save", {
      params: { path: { "folder-id": folderId } },
    })
    .then(resolveOATS);
  return folderId;
}
