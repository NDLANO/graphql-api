/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import DataLoader from "dataloader";
import { ArticleV2DTO } from "@ndla/types-backend/article-api";
import { FilmFrontPageDTO, FrontPageDTO, SubjectPageDTO } from "@ndla/types-backend/frontpage-api";
import { LearningPathV2DTO } from "@ndla/types-backend/learningpath-api";
import { Node } from "@ndla/types-taxonomy";
import {
  fetchArticles,
  fetchSubjectTopics,
  fetchLearningpaths,
  fetchResourceTypes,
  fetchNode,
  fetchFrontpage,
  fetchFilmFrontpage,
  fetchSubjectPage,
  queryNodes,
} from "./api";
import { GQLResourceTypeDefinition } from "./types/schema";
import { NodeQueryParams, searchNodes } from "./api/taxonomyApi";

export function articlesLoader(context: Context): DataLoader<string, ArticleV2DTO | undefined> {
  return new DataLoader(
    async (articleIds) => {
      return fetchArticles(articleIds, context);
    },
    { maxBatchSize: 100 },
  );
}

export function learningpathsLoader(context: Context): DataLoader<number, LearningPathV2DTO | undefined> {
  return new DataLoader(async (learningpathIds) => {
    return fetchLearningpaths(learningpathIds, context);
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

export function subjectpageLoader(context: Context): DataLoader<string, SubjectPageDTO | null> {
  return new DataLoader(async (subjectPageIds) => {
    return Promise.all(
      subjectPageIds.map((subjectPageId) => {
        if (!subjectPageId && !(typeof subjectPageId === "number")) {
          throw Error("Tried to get subjectpage with bad or empty id");
        }
        return fetchSubjectPage(Number(subjectPageId), context);
      }),
    );
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

export function subjectTopicsLoader(context: Context): DataLoader<SubjectTopicsLoaderParams, any> {
  return new DataLoader(
    async (ids) => {
      return ids.map(async ({ subjectId }) => fetchSubjectTopics(subjectId, context));
    },
    {
      cacheKeyFn: (key: SubjectTopicsLoaderParams) => JSON.stringify(key),
    },
  );
}

export function resourceTypesLoader(context: Context): DataLoader<string, any> {
  return new DataLoader(async (resourceTypeIds) => {
    const resourceTypes = await fetchResourceTypes<GQLResourceTypeDefinition>(context);

    const allResourceTypes = resourceTypes.reduce((acc: any[], resourceType) => {
      const subtypes = resourceType.subtypes || [];
      return [...acc, resourceType, ...subtypes];
    }, []);

    return resourceTypeIds.map((resourceTypeId) => {
      return allResourceTypes.find((resourceType) => resourceType.id === resourceTypeId);
    });
  });
}

export function searchNodesLoader(context: Context): DataLoader<string, Node[]> {
  return new DataLoader(
    async (contentUris) => {
      const searchResult = await searchNodes({ contentUris }, context);
      return contentUris.map((uri) => searchResult.results.filter((n) => n.contentUri === uri));
    },
    { maxBatchSize: 100 },
  );
}
