/**
 * Copyright (c) 2022-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { FolderDataDTO, ResourceDTO, UserFolderDTO } from "@ndla/types-backend/myndla-api";
import {
  deleteFolder,
  deleteFolderResource,
  deletePersonalData,
  fetchAllFolderResources,
  fetchFolder,
  fetchFolders,
  fetchSharedFolder,
  getPersonalData,
  patchFolder,
  updateFolderStatus,
  patchPersonalData,
  postFolder,
  postFolderResource,
  sortFolders,
  sortResources,
  patchFolderResource,
  copySharedFolder,
  favoriteSharedFolder,
  unFavoriteSharedFolder,
  sortSavedSharedFolders,
  fetchRecentlyFavoritedResources,
} from "../api/folderApi";
import { fetchFolderResourceMeta, fetchFolderResourcesMetaData } from "../api/folderResourceMetaApi";
import {
  GQLFolderResourceMeta,
  GQLMutationAddFolderArgs,
  GQLMutationAddFolderResourceArgs,
  GQLMutationDeleteFolderArgs,
  GQLMutationDeleteFolderResourceArgs,
  GQLMutationResolvers,
  GQLMutationSortFoldersArgs,
  GQLMutationSortResourcesArgs,
  GQLMutationUpdateFolderArgs,
  GQLMutationUpdateFolderResourceArgs,
  GQLMutationUpdateFolderStatusArgs,
  GQLMutationUpdatePersonalDataArgs,
  GQLMyNdlaPersonalData,
  GQLQueryAllFolderResourcesArgs,
  GQLQueryFolderArgs,
  GQLQueryFolderResourceMetaArgs,
  GQLQueryFolderResourceMetaSearchArgs,
  GQLQueryFoldersArgs,
  GQLQueryResolvers,
  GQLQuerySharedFolderArgs,
  GQLMutationCopySharedFolderArgs,
  GQLMutationFavoriteSharedFolderArgs,
  GQLMutationUnFavoriteSharedFolderArgs,
  GQLMutationSortSavedSharedFoldersArgs,
  GQLQueryRecentlyFavoritedResourcesArgs,
} from "../types/schema";

export const Query: Pick<
  GQLQueryResolvers,
  | "folders"
  | "folder"
  | "sharedFolder"
  | "allFolderResources"
  | "folderResourceMetaSearch"
  | "folderResourceMeta"
  | "personalData"
  | "recentlyFavoritedResources"
> = {
  async folders(_: any, params: GQLQueryFoldersArgs, context: ContextWithLoaders): Promise<UserFolderDTO> {
    return fetchFolders(params, context);
  },
  async folder(_: any, params: GQLQueryFolderArgs, context: ContextWithLoaders): Promise<FolderDataDTO> {
    return fetchFolder(params, context);
  },
  async sharedFolder(_: any, params: GQLQuerySharedFolderArgs, context: ContextWithLoaders): Promise<FolderDataDTO> {
    return fetchSharedFolder(params, context);
  },
  async allFolderResources(
    _: any,
    params: GQLQueryAllFolderResourcesArgs,
    context: ContextWithLoaders,
  ): Promise<ResourceDTO[]> {
    return fetchAllFolderResources(params, context);
  },
  async recentlyFavoritedResources(
    _: any,
    params: GQLQueryRecentlyFavoritedResourcesArgs,
    context: ContextWithLoaders,
  ): Promise<ResourceDTO[]> {
    return fetchRecentlyFavoritedResources(params, context);
  },
  async folderResourceMetaSearch(
    _: any,
    params: GQLQueryFolderResourceMetaSearchArgs,
    context: ContextWithLoaders,
  ): Promise<GQLFolderResourceMeta[]> {
    return fetchFolderResourcesMetaData(params, context);
  },
  async folderResourceMeta(
    _: any,
    params: GQLQueryFolderResourceMetaArgs,
    context: ContextWithLoaders,
  ): Promise<GQLFolderResourceMeta> {
    //@ts-expect-error This refuses to acknowledge that null is a valid return value. It is.
    return await fetchFolderResourceMeta(params, context);
  },
  async personalData(_: any, __: any, context: ContextWithLoaders): Promise<GQLMyNdlaPersonalData> {
    return getPersonalData(context) as unknown as GQLMyNdlaPersonalData;
  },
};

export const resolvers = {
  Folder: {
    async id(folder: FolderDataDTO) {
      return folder.id.toString();
    },
  },
  FolderResource: {
    async id(resource: ResourceDTO) {
      return resource.id.toString();
    },
  },
  FolderResourceMeta: {
    async id(meta: GQLFolderResourceMeta) {
      return meta.id.toString();
    },
  },
  ArticleFolderResourceMeta: {
    async metaImage(meta: GQLFolderResourceMeta, _: any, context: ContextWithLoaders) {
      if (!meta.metaImage?.url) {
        return undefined;
      }
      const imageId = parseInt(meta.metaImage.url.split("/").pop() ?? "");
      if (isNaN(imageId)) return undefined;
      try {
        const image = await context.loaders.imagesLoader.load(imageId);
        return {
          ...meta.metaImage,
          url: image?.image?.imageUrl,
        };
      } catch (e) {
        return meta.metaImage;
      }
    },
  },
};

export const Mutations: Pick<
  GQLMutationResolvers,
  | "addFolder"
  | "updateFolder"
  | "deleteFolder"
  | "addFolderResource"
  | "updateFolderResource"
  | "deleteFolderResource"
  | "deletePersonalData"
  | "sortFolders"
  | "sortResources"
  | "sortSavedSharedFolders"
  | "updatePersonalData"
  | "updateFolderStatus"
  | "copySharedFolder"
  | "favoriteSharedFolder"
  | "unFavoriteSharedFolder"
> = {
  async addFolder(_: any, params: GQLMutationAddFolderArgs, context: ContextWithLoaders): Promise<FolderDataDTO> {
    return postFolder(params, context);
  },
  async updateFolder(_: any, params: GQLMutationUpdateFolderArgs, context: ContextWithLoaders): Promise<FolderDataDTO> {
    return patchFolder(params, context);
  },
  async deleteFolder(_: any, params: GQLMutationDeleteFolderArgs, context: ContextWithLoaders): Promise<string> {
    return deleteFolder(params, context);
  },
  async addFolderResource(
    _: any,
    params: GQLMutationAddFolderResourceArgs,
    context: ContextWithLoaders,
  ): Promise<ResourceDTO> {
    return postFolderResource(params, context);
  },
  async updateFolderResource(
    _: any,
    params: GQLMutationUpdateFolderResourceArgs,
    context: ContextWithLoaders,
  ): Promise<ResourceDTO> {
    return patchFolderResource(params, context);
  },
  async deleteFolderResource(
    _: any,
    params: GQLMutationDeleteFolderResourceArgs,
    context: ContextWithLoaders,
  ): Promise<string> {
    return deleteFolderResource(params, context);
  },
  async deletePersonalData(_: any, __: any, context: ContextWithLoaders) {
    return deletePersonalData(context);
  },
  async updatePersonalData(_: any, params: GQLMutationUpdatePersonalDataArgs, context: ContextWithLoaders) {
    return patchPersonalData(params, context);
  },
  async sortFolders(_: any, params: GQLMutationSortFoldersArgs, context: ContextWithLoaders) {
    return sortFolders(params, context);
  },
  async sortResources(_: any, params: GQLMutationSortResourcesArgs, context: ContextWithLoaders) {
    return sortResources(params, context);
  },
  async sortSavedSharedFolders(_: any, params: GQLMutationSortSavedSharedFoldersArgs, context: ContextWithLoaders) {
    return sortSavedSharedFolders(params, context);
  },
  async updateFolderStatus(_: any, params: GQLMutationUpdateFolderStatusArgs, context: ContextWithLoaders) {
    return updateFolderStatus(params, context);
  },
  async copySharedFolder(_: any, params: GQLMutationCopySharedFolderArgs, context: ContextWithLoaders) {
    return copySharedFolder(params, context);
  },
  async favoriteSharedFolder(_: any, params: GQLMutationFavoriteSharedFolderArgs, context: ContextWithLoaders) {
    return favoriteSharedFolder(params, context);
  },
  async unFavoriteSharedFolder(_: any, params: GQLMutationUnFavoriteSharedFolderArgs, context: ContextWithLoaders) {
    return unFavoriteSharedFolder(params, context);
  },
};
