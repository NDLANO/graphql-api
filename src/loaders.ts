/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import DataLoader from "dataloader";
import { IArticleV2DTO } from "@ndla/types-backend/article-api";
import { IFilmFrontPageDataDTO, IFrontPageDTO, ISubjectPageDataDTO } from "@ndla/types-backend/frontpage-api";
import { ILearningPathSummaryV2DTO } from "@ndla/types-backend/learningpath-api";
import { Node } from "@ndla/types-taxonomy";
import {
  fetchArticles,
  fetchSubjectTopics,
  fetchLearningpaths,
  fetchResourceTypes,
  fetchSubjects,
  fetchNode,
  fetchFrontpage,
  fetchFilmFrontpage,
  fetchSubjectPage,
  queryNodes,
} from "./api";
import { GQLReference, GQLResourceTypeDefinition, GQLSubject } from "./types/schema";
import { convertedGrepSearch, grepSearch } from "./api/searchApi";

export function articlesLoader(context: Context): DataLoader<string, IArticleV2DTO | undefined> {
  return new DataLoader(
    async (articleIds) => {
      return fetchArticles(articleIds, context);
    },
    { maxBatchSize: 100 },
  );
}

export function learningpathsLoader(context: Context): DataLoader<string, ILearningPathSummaryV2DTO | undefined> {
  return new DataLoader(async (learningpathIds) => {
    return fetchLearningpaths(learningpathIds, context);
  });
}

export function lk20CurriculumLoader(context: Context): DataLoader<CurriculumLoaderParams, GQLReference | undefined> {
  return new DataLoader(async (ids) => {
    const languages = new Set(ids.map(({ language }) => language));
    if (languages.size !== 1) {
      // TODO: Maybe disallow passing in multiple languages altogether
      throw new Error("Non-1 number of languages passed to curriculum loader");
    }

    const uniqueCurriculumIds = Array.from(new Set(ids.map(({ code }) => code)));
    const language = Array.from(languages)[0]!;
    console.log("heii", { uniqueCurriculumIds });
    const result = await grepSearch({ codes: uniqueCurriculumIds, language, pageSize: 100 }, context);
    console.log("hooo");
    return ids.map((id) => {
      return { code: "APEKAT", id: "APEKAT", title: "aepeek" };
      const found = result.results.find(({ code }) => code === id.code);
      if (!found) return undefined;
      const ref: GQLReference = {
        ...found,
        code: found.code,
        id: found.code,
        title: found.title.title,
      };
      console.log({ ref });
      return ref;
    });
  });
}

export function frontpageLoader(context: Context): DataLoader<string, IFrontPageDTO> {
  return new DataLoader(async () => {
    const frontpage = await fetchFrontpage(context);
    return [frontpage];
  });
}

export function filmFrontpageLoader(context: Context): DataLoader<string, IFilmFrontPageDataDTO> {
  return new DataLoader(async () => {
    const filmFrontpage = await fetchFilmFrontpage(context);
    return [filmFrontpage];
  });
}

export function subjectpageLoader(context: Context): DataLoader<string, ISubjectPageDataDTO | null> {
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

export function nodesLoader(context: Context): DataLoader<NodesLoaderParams, Node[]> {
  return new DataLoader(
    async (inputs) => {
      return Promise.all(
        inputs.map((input) => {
          if (!input) {
            throw Error("Tried to get node with no params");
          }
          const params = {
            isVisible: input.filterVisible,
            rootId: input.rootId,
            includeContexts: true,
            filterProgrammes: true,
          };
          if (input.contextId) {
            return queryNodes({ ...params, contextId: input.contextId }, context);
          } else if (input.contentURI) {
            return queryNodes({ ...params, contentURI: input.contentURI }, context);
          }
          throw Error("Tried to get node with insufficient params");
        }),
      );
    },
    { cacheKeyFn: (key) => JSON.stringify(key) },
  );
}

export function subjectsLoader(context: Context): DataLoader<SubjectsLoaderParams, { subjects: GQLSubject[] }> {
  return new DataLoader(
    async (inputs) => {
      return Promise.all(
        inputs.map(async (input) => {
          const subjects = await fetchSubjects(
            { metadataFilter: input.metadataFilter, isVisible: input.filterVisible, ids: input.ids },
            context,
          );
          return { subjects };
        }),
      );
    },
    { cacheKeyFn: (key) => key },
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
