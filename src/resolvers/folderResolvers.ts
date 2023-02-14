/**
 * Copyright (c) 2022-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { IFolderData, IResource } from '@ndla/types-learningpath-api';
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
  patchFolderResource,
  patchPersonalData,
  postFolder,
  postFolderResource,
  sortFolders,
  sortResources,
} from '../api/folderApi';
import {
  fetchFolderResourceMeta,
  fetchFolderResourcesMetaData,
} from '../api/folderResourceMetaApi';
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
  GQLMutationUpdatePersonalDataArgs,
  GQLMyNdlaPersonalData,
  GQLQueryAllFolderResourcesArgs,
  GQLQueryFolderArgs,
  GQLQueryFolderResourceMetaArgs,
  GQLQueryFolderResourceMetaSearchArgs,
  GQLQueryFoldersArgs,
  GQLQueryResolvers,
  GQLQuerySharedFolderArgs,
} from '../types/schema';

export const Query: Pick<
  GQLQueryResolvers,
  | 'folders'
  | 'folder'
  | 'sharedFolder'
  | 'allFolderResources'
  | 'folderResourceMetaSearch'
  | 'folderResourceMeta'
  | 'personalData'
> = {
  async folders(
    _: any,
    params: GQLQueryFoldersArgs,
    context: ContextWithLoaders,
  ): Promise<IFolderData[]> {
    return fetchFolders(params, context);
  },
  async folder(
    _: any,
    params: GQLQueryFolderArgs,
    context: ContextWithLoaders,
  ): Promise<IFolderData> {
    return fetchFolder(params, context);
  },
  async sharedFolder(
    _: any,
    params: GQLQuerySharedFolderArgs,
    context: ContextWithLoaders,
  ): Promise<IFolderData> {
    return fetchSharedFolder(params, context);
  },
  async allFolderResources(
    _: any,
    params: GQLQueryAllFolderResourcesArgs,
    context: ContextWithLoaders,
  ): Promise<IResource[]> {
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
    return fetchFolderResourceMeta(params, context);
  },
  async personalData(
    _: any,
    __: any,
    context: ContextWithLoaders,
  ): Promise<GQLMyNdlaPersonalData> {
    return getPersonalData(context);
  },
};
export const Mutations: Pick<
  GQLMutationResolvers,
  | 'addFolder'
  | 'updateFolder'
  | 'deleteFolder'
  | 'addFolderResource'
  | 'updateFolderResource'
  | 'deleteFolderResource'
  | 'deletePersonalData'
  | 'sortFolders'
  | 'sortResources'
  | 'updatePersonalData'
> = {
  async addFolder(
    _: any,
    params: GQLMutationAddFolderArgs,
    context: ContextWithLoaders,
  ): Promise<IFolderData> {
    return postFolder(params, context);
  },
  async updateFolder(
    _: any,
    params: GQLMutationUpdateFolderArgs,
    context: ContextWithLoaders,
  ): Promise<IFolderData> {
    return patchFolder(params, context);
  },
  async deleteFolder(
    _: any,
    params: GQLMutationDeleteFolderArgs,
    context: ContextWithLoaders,
  ): Promise<string> {
    return deleteFolder(params, context);
  },
  async addFolderResource(
    _: any,
    params: GQLMutationAddFolderResourceArgs,
    context: ContextWithLoaders,
  ): Promise<IResource> {
    return postFolderResource(params, context);
  },
  async updateFolderResource(
    _: any,
    params: GQLMutationUpdateFolderResourceArgs,
    context: ContextWithLoaders,
  ): Promise<IResource> {
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
  async updatePersonalData(
    _: any,
    params: GQLMutationUpdatePersonalDataArgs,
    context: ContextWithLoaders,
  ) {
    return patchPersonalData(params, context);
  },
  async sortFolders(
    _: any,
    params: GQLMutationSortFoldersArgs,
    context: ContextWithLoaders,
  ) {
    return sortFolders(params, context);
  },
  async sortResources(
    _: any,
    params: GQLMutationSortResourcesArgs,
    context: ContextWithLoaders,
  ) {
    return sortResources(params, context);
  },
};
