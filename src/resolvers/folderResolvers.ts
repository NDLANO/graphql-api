/**
 * Copyright (c) 2022-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { IFolderDataDTO, IResourceDTO, IUserFolderDTO } from "@ndla/types-backend/myndla-api";
import { fetchImageV3 } from "../api";
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
  type GQLUserRole,
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
> = {
  async folders(_: any, params: GQLQueryFoldersArgs, context: ContextWithLoaders): Promise<IUserFolderDTO> {
    return fetchFolders(params, context);
  },
  async folder(_: any, params: GQLQueryFolderArgs, context: ContextWithLoaders): Promise<IFolderDataDTO> {
    return fetchFolder(params, context);
  },
  async sharedFolder(_: any, params: GQLQuerySharedFolderArgs, context: ContextWithLoaders): Promise<IFolderDataDTO> {
    return fetchSharedFolder(params, context);
  },
  async allFolderResources(
    _: any,
    params: GQLQueryAllFolderResourcesArgs,
    context: ContextWithLoaders,
  ): Promise<IResourceDTO[]> {
    return fetchAllFolderResources(params, context);
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
    async id(folder: IFolderDataDTO) {
      return folder.id.toString();
    },
  },
  FolderResource: {
    async id(resource: IResourceDTO) {
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
        const image = await fetchImageV3(imageId, context);
        return {
          ...meta.metaImage,
          url: image.image?.imageUrl,
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
  async addFolder(_: any, params: GQLMutationAddFolderArgs, context: ContextWithLoaders): Promise<IFolderDataDTO> {
    return postFolder(params, context);
  },
  async updateFolder(
    _: any,
    params: GQLMutationUpdateFolderArgs,
    context: ContextWithLoaders,
  ): Promise<IFolderDataDTO> {
    return patchFolder(params, context);
  },
  async deleteFolder(_: any, params: GQLMutationDeleteFolderArgs, context: ContextWithLoaders): Promise<string> {
    return deleteFolder(params, context);
  },
  async addFolderResource(
    _: any,
    params: GQLMutationAddFolderResourceArgs,
    context: ContextWithLoaders,
  ): Promise<IResourceDTO> {
    return postFolderResource(params, context);
  },
  async updateFolderResource(
    _: any,
    params: GQLMutationUpdateFolderResourceArgs,
    context: ContextWithLoaders,
  ): Promise<IResourceDTO> {
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
    const personalData = await patchPersonalData(params, context);
    return {
      ...personalData,
      role: personalData.role === "employee" ? GQLUserRole.Employee : GQLUserRole.Student,
    };
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
