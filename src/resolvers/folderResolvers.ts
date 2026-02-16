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
  deletePersonalData,
  fetchFolder,
  fetchFolders,
  fetchSharedFolder,
  getPersonalData,
  patchFolder,
  updateFolderStatus,
  patchPersonalData,
  postFolder,
  sortFolders,
  sortResources,
  copySharedFolder,
  favoriteSharedFolder,
  unFavoriteSharedFolder,
  sortSavedSharedFolders,
  fetchRecentlyFavoritedResources,
  fetchAllMyNdlaResources,
  postMyNdlaResource,
  patchMyNdlaResource,
  deleteMyNdlaResource,
} from "../api/folderApi";
import { fetchMyNdlaResourceMeta, fetchMyNdlaResourcesMeta } from "../api/myNdlaResourceMetaApi";
import {
  GQLMutationAddFolderArgs,
  GQLMutationDeleteFolderArgs,
  GQLMutationResolvers,
  GQLMutationSortFoldersArgs,
  GQLMutationSortResourcesArgs,
  GQLMutationUpdateFolderArgs,
  GQLMutationUpdateFolderStatusArgs,
  GQLMutationUpdatePersonalDataArgs,
  GQLMyNdlaPersonalData,
  GQLQueryFolderArgs,
  GQLQueryFoldersArgs,
  GQLQueryResolvers,
  GQLQuerySharedFolderArgs,
  GQLMutationCopySharedFolderArgs,
  GQLMutationFavoriteSharedFolderArgs,
  GQLMutationUnFavoriteSharedFolderArgs,
  GQLMutationSortSavedSharedFoldersArgs,
  GQLQueryRecentlyFavoritedResourcesArgs,
  GQLQueryAllMyNdlaResourcesArgs,
  GQLQueryMyNdlaResourceMetaSearchArgs,
  GQLMyNdlaResourceMeta,
  GQLQueryMyNdlaResourceMetaArgs,
  GQLMutationAddMyNdlaResourceArgs,
  GQLMutationUpdateMyNdlaResourceArgs,
  GQLMutationDeleteMyNdlaResourceArgs,
} from "../types/schema";

export const Query: Pick<
  GQLQueryResolvers,
  | "folders"
  | "folder"
  | "sharedFolder"
  | "allMyNdlaResources"
  | "myNdlaResourceMetaSearch"
  | "myNdlaResourceMeta"
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
  async allMyNdlaResources(
    _: any,
    params: GQLQueryAllMyNdlaResourcesArgs,
    context: ContextWithLoaders,
  ): Promise<ResourceDTO[]> {
    return fetchAllMyNdlaResources(params, context);
  },
  async recentlyFavoritedResources(
    _: any,
    params: GQLQueryRecentlyFavoritedResourcesArgs,
    context: ContextWithLoaders,
  ): Promise<ResourceDTO[]> {
    return fetchRecentlyFavoritedResources(params, context);
  },
  async myNdlaResourceMetaSearch(
    _: any,
    params: GQLQueryMyNdlaResourceMetaSearchArgs,
    context: ContextWithLoaders,
  ): Promise<GQLMyNdlaResourceMeta[]> {
    return fetchMyNdlaResourcesMeta(params, context);
  },
  async myNdlaResourceMeta(
    _: any,
    params: GQLQueryMyNdlaResourceMetaArgs,
    context: ContextWithLoaders,
  ): Promise<GQLMyNdlaResourceMeta> {
    //@ts-expect-error This refuses to acknowledge that null is a valid return value. It is.
    return await fetchMyNdlaResourceMeta(params, context);
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
  MyNdlaResource: {
    async id(resource: ResourceDTO) {
      return resource.id.toString();
    },
  },
  MyNdlaResourceMeta: {
    async id(meta: GQLMyNdlaResourceMeta) {
      return meta.id.toString();
    },
  },
  MyNdlaArticleResourceMeta: {
    async metaImage(meta: GQLMyNdlaResourceMeta, _: any, context: ContextWithLoaders) {
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
  | "addMyNdlaResource"
  | "updateMyNdlaResource"
  | "deleteMyNdlaResource"
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
  async addMyNdlaResource(
    _: any,
    params: GQLMutationAddMyNdlaResourceArgs,
    context: ContextWithLoaders,
  ): Promise<ResourceDTO> {
    return postMyNdlaResource(params, context);
  },
  async updateMyNdlaResource(
    _: any,
    params: GQLMutationUpdateMyNdlaResourceArgs,
    context: ContextWithLoaders,
  ): Promise<ResourceDTO> {
    return patchMyNdlaResource(params, context);
  },
  async deleteMyNdlaResource(
    _: any,
    params: GQLMutationDeleteMyNdlaResourceArgs,
    context: ContextWithLoaders,
  ): Promise<string> {
    return deleteMyNdlaResource(params, context);
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
