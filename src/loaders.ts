/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { IFilmFrontPageData, IFrontPageData } from '@ndla/types-frontpage-api';
import DataLoader from 'dataloader';
import {
  fetchArticles,
  fetchSubjectTopics,
  fetchLearningpaths,
  fetchResourceTypes,
  fetchSubjects,
  fetchFrontpage,
  fetchFilmFrontpage,
  fetchLK06Curriculum,
  fetchLK20Curriculum,
} from './api';
import { fetchSubjectTyped, Subject } from './api/taxonomyApi';

export function articlesLoader(context: Context): DataLoader<string, GQLMeta> {
  return new DataLoader(
    async articleIds => {
      return fetchArticles(articleIds, context);
    },
    { maxBatchSize: 100 },
  );
}

export function learningpathsLoader(
  context: Context,
): DataLoader<string, GQLMeta | null> {
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

export function frontpageLoader(
  context: Context,
): DataLoader<string, IFrontPageData> {
  return new DataLoader(async () => {
    const frontpage = await fetchFrontpage(context);
    return [frontpage];
  });
}

export function filmFrontpageLoader(
  context: Context,
): DataLoader<string, IFilmFrontPageData> {
  return new DataLoader(async () => {
    const filmFrontpage = await fetchFilmFrontpage(context);
    return [filmFrontpage];
  });
}

export function subjectLoader(
  context: Context,
): DataLoader<{ id?: string }, Subject> {
  return new DataLoader(
    async inputs => {
      return Promise.all(
        inputs.map(input => {
          if (input.id) {
            return fetchSubjectTyped(context, input.id);
          }
        }),
      );
    },
    { cacheKeyFn: key => JSON.stringify(key) },
  );
}

export function subjectsLoader(
  context: Context,
): DataLoader<
  { metadataFilter?: { key: string; value?: string }; filterVisible: boolean },
  { subjects: GQLSubject[] }
> {
  return new DataLoader(
    async inputs => {
      return Promise.all(
        inputs.map(async input => {
          const subjects = await fetchSubjects(
            context,
            input.metadataFilter,
            input.filterVisible ? true : undefined,
          );
          return { subjects };
        }),
      );
    },
    { cacheKeyFn: key => key },
  );
}

interface IInput {
  subjectId: string;
}

export function subjectTopicsLoader(context: Context): DataLoader<IInput, any> {
  return new DataLoader(
    async ids => {
      return ids.map(async ({ subjectId }) =>
        fetchSubjectTopics(subjectId, context),
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
