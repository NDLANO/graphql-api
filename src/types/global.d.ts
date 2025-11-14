/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import DataLoader from "dataloader";
import { Request, Response } from "express";
import { RequestInit, RequestCache } from "node-fetch";
import { ArticleV2DTO } from "@ndla/types-backend/article-api";
import { FrontPageDTO, SubjectPageDTO } from "@ndla/types-backend/frontpage-api";
import { LearningPathV2DTO } from "@ndla/types-backend/learningpath-api";
import { Node } from "@ndla/types-taxonomy";
import { ImageMetaInformationV3DTO } from "@ndla/types-backend/image-api";
import { NodeQueryParams } from "../api/taxonomyApi";

declare global {
  interface NodeLoaderParams {
    id?: string;
    rootId?: string;
    parentId?: string;
  }

  interface Loaders {
    articlesLoader: DataLoader<string, ArticleV2DTO | undefined>;
    learningpathsLoader: DataLoader<number, LearningPathV2DTO | undefined>;
    nodeLoader: DataLoader<NodeLoaderParams, Node>;
    nodesLoader: DataLoader<NodeQueryParams, Node[]>;
    frontpageLoader: DataLoader<string, FrontPageDTO>;
    subjectpageLoader: DataLoader<string, SubjectPageDTO | null>;
    searchNodesLoader: DataLoader<string, Node[]>;
    imagesLoader: DataLoader<number, ImageMetaInformationV3DTO | null>;
  }

  interface AuthToken {
    access_token: string;
    expires_in?: number;
    token_type?: string;
  }

  interface Context {
    req: Request;
    res: Response;
    token?: AuthToken;
    feideAuthorization?: string;
    versionHash?: string;
    language: string;
    shouldUseCache: boolean;
  }

  interface ContextWithLoaders extends Context {
    loaders: Loaders;
  }

  interface RequestOptions extends RequestInit {
    cache?: RequestCache;
    useTaxonomyCache?: boolean;
  }
}
