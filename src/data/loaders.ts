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
  fetchResource,
  fetchLearningpaths,
  fetchResourceTypes,
  fetchTopic,
  fetchSubjects,
} from './api';

export function articlesLoader(context: Context): DataLoader<string, any> {
  return new DataLoader(async articleIds => {
    return fetchArticles(articleIds, context);
  });
}

export function learningpathsLoader(context: Context): DataLoader<string, any> {
  return new DataLoader(async learningpathIds => {
    return fetchLearningpaths(learningpathIds, context);
  });
}

export function filterLoader(context: Context): DataLoader<string, any> {
  return new DataLoader(async subjectIds => {
    const filterList = await fetchFilters(context);
    return subjectIds.map(subjectId =>
      filterList.filter(filter => filter.subjectId === subjectId),
    );
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

type Input = {
  subjectId: string;
  filterIds: string;
};

export function subjectTopicsLoader(context: Context): DataLoader<Input, any> {
  return new DataLoader(
    async ids => {
      return ids.map(async ({ subjectId, filterIds }) => {
        return fetchSubjectTopics(subjectId, filterIds, context);
      });
    },
    {
      cacheKeyFn: (key: Input) => JSON.stringify(key),
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
