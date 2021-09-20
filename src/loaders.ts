/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import DataLoader from 'dataloader';
import {
  fetchArticles,
  fetchSubjectTopics,
  fetchFilters,
  fetchLearningpaths,
  fetchResourceTypes,
  fetchSubjects,
  fetchFrontpage,
  fetchFilmFrontpage,
  fetchLK06Curriculum,
  fetchLK20Curriculum,
} from './api';
import { FrontpageResponse } from './api/frontpageApi';

export function articlesLoader(context: Context): DataLoader<string, GQLMeta> {
  return new DataLoader(
    async articleIds => {
      return fetchArticles(articleIds, context);
    },
    { maxBatchSize: 100 },
  );
}

export function learningpathsLoader(context: Context): DataLoader<string, any> {
  return new DataLoader(async learningpathIds => {
    return fetchLearningpaths(learningpathIds, context);
  });
}

interface LK20Curriculum {
  code: string;
  language: string;
}

export function lk20CurriculumLoader(
  context: Context,
): DataLoader<LK20Curriculum, GQLReference> {
  return new DataLoader(async ids => {
    const uniqueCurriculumIds = Array.from(new Set(ids));
    const responses = await Promise.all(
      uniqueCurriculumIds.map(async ({ code, language }) => {
        return fetchLK20Curriculum(code, language, context);
      }),
    );
    return uniqueCurriculumIds.map(({ code, language }) => {
      return responses.find(response => response.code === code);
    });
  });
}

export function lk06CurriculumLoader(
  context: Context,
): DataLoader<string, GQLReference> {
  return new DataLoader(async curriculumIds => {
    const uniqueCurriculumIds = Array.from(new Set(curriculumIds));
    const responses = await Promise.all(
      uniqueCurriculumIds.map(async id => {
        return fetchLK06Curriculum(id, context);
      }),
    );
    return uniqueCurriculumIds.map(id => {
      return responses.find(response => response.id === id);
    });
  });
}

export function filterLoader(
  context: Context,
): DataLoader<string, GQLSubjectFilter[]> {
  return new DataLoader(async subjectIds => {
    const filterList = await fetchFilters(context);
    return subjectIds.map(subjectId =>
      filterList
        .filter(filter => filter.subjectId === subjectId)
        .filter(filter => (filter.metadata ? filter.metadata.visible : true)),
    );
  });
}

export function frontpageLoader(
  context: Context,
): DataLoader<string, FrontpageResponse> {
  return new DataLoader(async () => {
    const frontpage = await fetchFrontpage(context);
    return [frontpage];
  });
}

export function filmFrontpageLoader(
  context: Context,
): DataLoader<string, GQLFilmFrontpage> {
  return new DataLoader(async () => {
    const filmFrontpage = await fetchFilmFrontpage(context);
    return [filmFrontpage];
  });
}

export function subjectsLoader(
  context: Context,
): DataLoader<string, { subjects: GQLSubject[] }> {
  return new DataLoader(async () => {
    const subjects = await fetchSubjects(context);
    return [{ subjects }];
  });
}

interface IInput {
  subjectId: string;
  filterIds: string;
}

export function subjectTopicsLoader(context: Context): DataLoader<IInput, any> {
  return new DataLoader(
    async ids => {
      return ids.map(async ({ subjectId, filterIds }) =>
        fetchSubjectTopics(subjectId, filterIds, context),
      );
    },
    {
      cacheKeyFn: (key: IInput) => JSON.stringify(key),
    },
  );
}

export function resourceTypesLoader(context: Context): DataLoader<string, any> {
  return new DataLoader(async resourceTypeIds => {
    const resourceTypes = await fetchResourceTypes(context);

    const allResourceTypes = resourceTypes.reduce((acc, resourceType) => {
      const subtypes = resourceType.subtypes || [];
      return [...acc, resourceType, ...subtypes];
    }, []);

    return resourceTypeIds.map(resourceTypeId => {
      return allResourceTypes.find(
        resourceType => resourceType.id === resourceTypeId,
      );
    });
  });
}
