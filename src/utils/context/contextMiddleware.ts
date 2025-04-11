/**
 * Copyright (c) 2025-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { getToken } from "../../auth";
import {
  articlesLoader,
  subjectTopicsLoader,
  resourceTypesLoader,
  learningpathsLoader,
  subjectsLoader,
  frontpageLoader,
  subjectpageLoader,
  nodeLoader,
  nodesLoader,
  searchNodesLoader,
} from "../../loaders";
import isString from "lodash/isString";
import { defaultLanguage } from "../../config";
import { NextFunction, Request, Response } from "express";
import { getAsyncContextStorage } from "./contextStore";

function getShouldUseCache(request: Request): boolean {
  const cacheControl = request.headers["cache-control"]?.toLowerCase();
  const feideAuthHeader = getFeideAuthorization(request);
  const disableCacheHeaders = ["no-cache", "no-store"];

  const cacheControlDisable = disableCacheHeaders.includes(cacheControl ?? "");
  const feideHeaderPresent = !!feideAuthHeader;

  return !cacheControlDisable && !feideHeaderPresent;
}

const getTaxonomyUrl = (request: Request): string => {
  const taxonomyUrl = request.headers["use-taxonomy2"];
  return taxonomyUrl === "true" ? "taxonomy2" : "taxonomy";
};

function getVersionHash(request: Request): string | undefined {
  return getHeaderString(request, "versionhash");
}

function getAcceptLanguage(request: Request): string {
  const language = request.headers["accept-language"];

  if (isString(language)) {
    return language.split("-")[0] ?? defaultLanguage;
  }
  return defaultLanguage;
}

function getHeaderString(request: Request, name: string): string | undefined {
  const header = request.headers[name];

  if (isString(header)) {
    return header;
  }
  return undefined;
}

function getFeideAuthorization(request: Request): string | undefined {
  return getHeaderString(request, "feideauthorization");
}

export function contextExpressMiddleware(req: Request, res: Response, next: NextFunction): void {
  const token = getToken(req);
  const feideAuthorization = getFeideAuthorization(req);
  const versionHash = getVersionHash(req);

  const language = getAcceptLanguage(req);
  const shouldUseCache = getShouldUseCache(req);
  const taxonomyUrl = getTaxonomyUrl(req);
  const defaultContext = {
    language,
    token,
    feideAuthorization,
    versionHash,
    shouldUseCache,
    taxonomyUrl,
    req,
    res,
  };

  const contextObject = {
    ...defaultContext,
    loaders: {
      articlesLoader: articlesLoader(defaultContext),
      subjectTopicsLoader: subjectTopicsLoader(defaultContext),
      learningpathsLoader: learningpathsLoader(defaultContext),
      resourceTypesLoader: resourceTypesLoader(defaultContext),
      nodeLoader: nodeLoader(defaultContext),
      nodesLoader: nodesLoader(defaultContext),
      subjectsLoader: subjectsLoader(defaultContext),
      frontpageLoader: frontpageLoader(defaultContext),
      subjectpageLoader: subjectpageLoader(defaultContext),
      searchNodesLoader: searchNodesLoader(defaultContext),
    },
  };

  getAsyncContextStorage().run(contextObject, () => {
    next();
  });
}
