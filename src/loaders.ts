/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import DataLoader from "dataloader";
import keyBy from "lodash/keyBy";
import { ArticleV2DTO } from "@ndla/types-backend/article-api";
import { FilmFrontPageDTO, FrontPageDTO, SubjectPageDTO } from "@ndla/types-backend/frontpage-api";
import { LearningPathV2DTO } from "@ndla/types-backend/learningpath-api";
import { Node } from "@ndla/types-taxonomy";
import { IImageMetaInformationV3DTO } from "@ndla/types-backend/image-api";
import { fetchArticles, fetchLearningpaths, fetchNode, fetchFrontpage, fetchFilmFrontpage, queryNodes } from "./api";
import { fetchSubjectPages } from "./api/frontpageApi";
import { NodeQueryParams, searchNodes } from "./api/taxonomyApi";
import { fetchImages } from "./api/imageApi";

export function articlesLoader(context: Context): DataLoader<string, ArticleV2DTO | null> {
  return new DataLoader(
    async (articleIds) => {
      const articles = await fetchArticles(articleIds, context);
      const keyed = keyBy(articles, (article) => article?.id?.toString() ?? "never");
      return articleIds.map((id) => keyed[id] ?? null);
    },
    { maxBatchSize: 100 },
  );
}

export function learningpathsLoader(context: Context): DataLoader<number, LearningPathV2DTO | null> {
  return new DataLoader(async (learningpathIds) => {
    const learningpaths = await fetchLearningpaths(learningpathIds, context);
    const keyed = keyBy(learningpaths, (lp) => lp?.id ?? "never");
    return learningpathIds.map((id) => keyed[id] ?? null);
  });
}

export function frontpageLoader(context: Context): DataLoader<string, FrontPageDTO> {
  return new DataLoader(async () => {
    const frontpage = await fetchFrontpage(context);
    return [frontpage];
  });
}

export function filmFrontpageLoader(context: Context): DataLoader<string, FilmFrontPageDTO> {
  return new DataLoader(async () => {
    const filmFrontpage = await fetchFilmFrontpage(context);
    return [filmFrontpage];
  });
}

export function subjectpageLoader(context: Context): DataLoader<number, SubjectPageDTO | null> {
  return new DataLoader(async (subjectPageIds) => {
    const res = await fetchSubjectPages(subjectPageIds, context);
    const keyed = keyBy(res, (sp) => sp.id);
    return subjectPageIds.map((id) => keyed[id] ?? null);
  });
}

export function nodeLoader(context: Context): DataLoader<NodeLoaderParams, Node> {
  return new DataLoader(
    async (inputs) => {
      return Promise.all(
        inputs.map((input) => {
          if (!input.id) {
            throw Error("Tried to get node with bad or empty id");
          }
          return fetchNode({ id: input.id, rootId: input.rootId, parentId: input.parentId }, context);
        }),
      );
    },
    { cacheKeyFn: (key) => JSON.stringify(key) },
  );
}

export function nodesLoader(context: Context): DataLoader<NodeQueryParams, Node[]> {
  return new DataLoader(
    async (inputs) => {
      return Promise.all(
        inputs.map((input) => {
          if (!input) {
            throw Error("Tried to get node with no params");
          }
          return queryNodes(
            {
              includeContexts: true,
              filterProgrammes: true,
              ...input,
            },
            context,
          );
        }),
      );
    },
    { cacheKeyFn: (key) => JSON.stringify(key) },
  );
}

export function searchNodesLoader(context: Context): DataLoader<string, Node | null> {
  return new DataLoader(
    async (contentUris) => {
      const searchResult = await searchNodes({ contentUris }, context);
      const keyed = keyBy(searchResult.results, (res) => res.contentUri ?? "never");
      return contentUris.map((uri) => keyed[uri] ?? null);
    },
    { maxBatchSize: 100 },
  );
}

export function imagesLoader(context: Context): DataLoader<number, IImageMetaInformationV3DTO | null> {
  return new DataLoader(
    async (imageIds) => {
      const res = await fetchImages(imageIds, context);
      const keyed = keyBy(res, (img) => img.id);
      return imageIds.map((id) => keyed[id] ?? null);
    },
    { maxBatchSize: 50 },
  );
}
