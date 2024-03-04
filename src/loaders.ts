/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import DataLoader from "dataloader";
import { IFilmFrontPageData, IFrontPage, ISubjectPageData } from "@ndla/types-backend/frontpage-api";
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
  fetchLK20Curriculum,
  fetchSubjectPage,
} from "./api";
import {
  GQLMeta,
  GQLReference,
  GQLResourceTypeDefinition,
  GQLSubject,
  GQLTaxonomyEntity,
  GQLTopic,
} from "./types/schema";
import { nodeToTaxonomyEntity } from "./utils/apiHelpers";

export function articlesLoader(context: Context): DataLoader<string, GQLMeta | null> {
  return new DataLoader(
    async (articleIds) => {
      return fetchArticles(articleIds, context);
    },
    { maxBatchSize: 100 },
  );
}

export function nodeLoader(context: Context): DataLoader<string, GQLTopic | null> {
  return new DataLoader(async (nodeIds) => {
    return Promise.all(
      nodeIds.map(async (nodeId) => {
        const node = await fetchNode({ id: nodeId }, context);
        return nodeToTaxonomyEntity(node, context);
      }),
    );
  });
}

export function learningpathsLoader(context: Context): DataLoader<string, GQLMeta | null> {
  return new DataLoader(async (learningpathIds) => {
    return fetchLearningpaths(learningpathIds, context);
  });
}

interface LK20Curriculum {
  code: string;
  language: string;
}

export function lk20CurriculumLoader(context: Context): DataLoader<LK20Curriculum, GQLReference | undefined> {
  return new DataLoader(async (ids) => {
    const uniqueCurriculumIds = Array.from(new Set(ids));
    const responses = await Promise.all(
      uniqueCurriculumIds.map(async ({ code, language }) => {
        return fetchLK20Curriculum(code, language, context);
      }),
    );
    return uniqueCurriculumIds.map(({ code, language }) => {
      return responses.find((response) => response.code === code);
    });
  });
}

export function frontpageLoader(context: Context): DataLoader<string, IFrontPage> {
  return new DataLoader(async () => {
    const frontpage = await fetchFrontpage(context);
    return [frontpage];
  });
}

export function filmFrontpageLoader(context: Context): DataLoader<string, IFilmFrontPageData> {
  return new DataLoader(async () => {
    const filmFrontpage = await fetchFilmFrontpage(context);
    return [filmFrontpage];
  });
}

export function subjectpageLoader(context: Context): DataLoader<string, ISubjectPageData | null> {
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

export function subjectLoader(context: Context): DataLoader<{ id?: string }, Node> {
  return new DataLoader(
    async (inputs) => {
      return Promise.all(
        inputs.map((input) => {
          if (!input.id) {
            throw Error("Tried to get subject with bad or empty id");
          }
          return fetchNode({ id: input.id }, context);
        }),
      );
    },
    { cacheKeyFn: (key) => JSON.stringify(key) },
  );
}

export function subjectsLoader(
  context: Context,
): DataLoader<
  { metadataFilter?: { key: string; value?: string }; filterVisible: boolean },
  { subjects: GQLSubject[] }
> {
  return new DataLoader(
    async (inputs) => {
      return Promise.all(
        inputs.map(async (input) => {
          const subjects = await fetchSubjects(context, input.metadataFilter, input.filterVisible ? true : undefined);
          return { subjects };
        }),
      );
    },
    { cacheKeyFn: (key) => key },
  );
}

interface IInput {
  subjectId: string;
}

export function subjectTopicsLoader(context: Context): DataLoader<IInput, any> {
  return new DataLoader(
    async (ids) => {
      return ids.map(async ({ subjectId }) => fetchSubjectTopics(subjectId, context));
    },
    {
      cacheKeyFn: (key: IInput) => JSON.stringify(key),
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
