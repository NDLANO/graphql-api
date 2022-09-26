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
  patchFolder,
  patchFolderResource,
  postFolder,
  postFolderResource,
  sortFolders,
  sortResources,
} from '../api/folderApi';
import {
  fetchFolderResourceMeta,
  fetchFolderResourcesMetaData,
} from '../api/folderResourceMetaApi';

export const Query: Pick<
  GQLQueryTypeResolver,
  | 'folders'
  | 'folder'
  | 'allFolderResources'
  | 'folderResourceMetaSearch'
  | 'folderResourceMeta'
> = {
  async folders(
    _: any,
    params: QueryToFoldersArgs,
    context: ContextWithLoaders,
  ): Promise<IFolderData[]> {
    return fetchFolders(params, context);
  },
  async folder(
    _: any,
    params: QueryToFolderArgs,
    context: ContextWithLoaders,
  ): Promise<IFolderData> {
    return fetchFolder(params, context);
  },
  async allFolderResources(
    _: any,
    params: QueryToAllFolderResourcesArgs,
    context: ContextWithLoaders,
  ): Promise<IResource[]> {
    return fetchAllFolderResources(params, context);
  },
  async folderResourceMetaSearch(
    _: any,
    params: QueryToFolderResourceMetaSearchArgs,
    context: ContextWithLoaders,
  ): Promise<GQLFolderResourceMeta[]> {
    return fetchFolderResourcesMetaData(params, context);
  },
  async folderResourceMeta(
    _: any,
    params: QueryToFolderResourceMetaArgs,
    context: ContextWithLoaders,
  ): Promise<GQLFolderResourceMeta> {
    return fetchFolderResourceMeta(params, context);
  },
};
export const Mutations: Pick<
  GQLMutationTypeResolver,
  | 'addFolder'
  | 'updateFolder'
  | 'deleteFolder'
  | 'addFolderResource'
  | 'updateFolderResource'
  | 'deleteFolderResource'
  | 'deletePersonalData'
  | 'sortFolders'
  | 'sortResources'
> = {
  async addFolder(
    _: any,
    params: MutationToAddFolderArgs,
    context: ContextWithLoaders,
  ): Promise<IFolderData> {
    return postFolder(params, context);
  },
  async updateFolder(
    _: any,
    params: MutationToUpdateFolderArgs,
    context: ContextWithLoaders,
  ): Promise<IFolderData> {
    return patchFolder(params, context);
  },
  async deleteFolder(
    _: any,
    params: MutationToDeleteFolderArgs,
    context: ContextWithLoaders,
  ): Promise<string> {
    return deleteFolder(params, context);
  },
  async addFolderResource(
    _: any,
    params: MutationToAddFolderResourceArgs,
    context: ContextWithLoaders,
  ): Promise<IResource> {
    return postFolderResource(params, context);
  },
  async updateFolderResource(
    _: any,
    params: MutationToUpdateFolderResourceArgs,
    context: ContextWithLoaders,
  ): Promise<IResource> {
    return patchFolderResource(params, context);
  },
  async deleteFolderResource(
    _: any,
    params: MutationToDeleteFolderResourceArgs,
    context: ContextWithLoaders,
  ): Promise<string> {
    return deleteFolderResource(params, context);
  },
  async deletePersonalData(_: any, __: unknown, context: ContextWithLoaders) {
    return deletePersonalData(context);
  },
  async sortFolders(
    _: any,
    params: MutationToSortFoldersArgs,
    context: ContextWithLoaders,
  ) {
    return sortFolders(params, context);
  },
  async sortResources(
    _: any,
    params: MutationToSortResourcesArgs,
    context: ContextWithLoaders,
  ) {
    return sortResources(params, context);
  },
};
