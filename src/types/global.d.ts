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
import { IArticleV2DTO } from "@ndla/types-backend/article-api";
import { IFrontPageDTO, ISubjectPageDTO } from "@ndla/types-backend/frontpage-api";
import { ILearningPathV2DTO } from "@ndla/types-backend/learningpath-api";
import { Node } from "@ndla/types-taxonomy";
import { GQLSubject } from "./schema";
import { NodeQueryParams } from "../api/taxonomyApi";

declare global {
  interface SubjectTopicsLoaderParams {
    subjectId: string;
  }

  interface SubjectsLoaderParams {
    metadataFilter?: { key: string; value?: string };
    filterVisible?: boolean;
    ids?: string[];
  }

  interface NodeLoaderParams {
    id?: string;
    rootId?: string;
    parentId?: string;
  }

  interface Loaders {
    articlesLoader: DataLoader<string, IArticleV2DTO | undefined>;
    learningpathsLoader: DataLoader<number, ILearningPathV2DTO | undefined>;
    subjectTopicsLoader: DataLoader<SubjectTopicsLoaderParams, any>;
    subjectsLoader: DataLoader<SubjectsLoaderParams, { subjects: GQLSubject[] }>;
    nodeLoader: DataLoader<NodeLoaderParams, Node>;
    nodesLoader: DataLoader<NodeQueryParams, Node[]>;
    resourceTypesLoader: DataLoader<any, any>;
    frontpageLoader: DataLoader<string, IFrontPageDTO>;
    subjectpageLoader: DataLoader<string, ISubjectPageDTO | null>;
    searchNodesLoader: DataLoader<string, Node[]>;
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
    taxonomyUrl: string;
  }

  interface ContextWithLoaders extends Context {
    loaders: Loaders;
  }

  interface RequestOptions extends RequestInit {
    cache?: RequestCache;
    useTaxonomyCache?: boolean;
  }
}
