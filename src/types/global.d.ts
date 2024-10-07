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
import { IArticleV2 } from "@ndla/types-backend/article-api";
import { IFrontPage, ISubjectPageData } from "@ndla/types-backend/frontpage-api";
import { Node } from "@ndla/types-taxonomy";
import { GQLReference, GQLSubject } from "./schema";

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

  interface NodesLoaderParams {
    contextId?: string;
    contentURI?: string;
    rootId?: string;
    filterVisible?: boolean;
  }

  interface CurriculumLoaderParams {
    code: string;
    language: string | undefined;
  }

  interface Loaders {
    articlesLoader: DataLoader<string, IArticleV2 | undefined>;
    learningpathsLoader: DataLoader<string, any>;
    subjectTopicsLoader: DataLoader<SubjectTopicsLoaderParams, any>;
    subjectsLoader: DataLoader<SubjectsLoaderParams, { subjects: GQLSubject[] }>;
    nodeLoader: DataLoader<NodeLoaderParams, Node>;
    nodesLoader: DataLoader<NodesLoaderParams, Node[]>;
    resourceTypesLoader: DataLoader<any, any>;
    frontpageLoader: DataLoader<string, IFrontPage>;
    subjectpageLoader: DataLoader<string, ISubjectPageData | null>;
    lk20CurriculumLoader: DataLoader<CurriculumLoaderParams, GQLReference | undefined>;
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
