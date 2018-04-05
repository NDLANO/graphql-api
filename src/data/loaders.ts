/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import DataLoader from 'dataloader';
import { fetchArticles, fetchSubjectTopics, fetchFilters } from './api';

export function articlesLoader(context: Context): DataLoader<string, any> {
  return new DataLoader(async articleIds => {
    return fetchArticles(articleIds, context);
  });
}

export function filterLoader(context: Context): DataLoader<string, any> {
  return new DataLoader(async subjectIds => {
    const filterList = await fetchFilters(context);
    return subjectIds.map(subjectId =>
      filterList.filter(filter => filter.subjectId === subjectId)
    );
  });
}

export function subjectTopicsLoader(context: Context): DataLoader<string, any> {
  return new DataLoader(async ids => {
    return ids.map(async subjectId => {
      return fetchSubjectTopics(subjectId, context);
    });
  });
}
