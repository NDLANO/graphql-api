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
  fetchSubjectPage,
} from './api';

export function articlesLoader(context: Context): DataLoader<string, any> {
  return new DataLoader(async articleIds => {
    return fetchArticles(articleIds, context);
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
