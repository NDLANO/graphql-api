/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { fetch, resolveJson } from '../utils/apiHelpers';
import { localConverter } from '../config';
import { isString } from 'lodash';

export async function fetchArticle(
  articleId: string,
  filterIds: string,
  context: Context,
): Promise<GQLArticle> {
  const host = localConverter ? 'http://localhost:3100' : '';
  const response = await fetch(
    `${host}/article-converter/json/${context.language}/${articleId}${
      filterIds ? `?filters=${filterIds}` : ''
    }`,
    context,
  );
  return resolveJson(response);
}

export async function fetchArticles(
  articleIds: string[],
  context: Context,
): Promise<GQLMeta[]> {
  const response = await fetch(
    `/article-api/v2/articles/?ids=${articleIds.join(',')}&language=${
      context.language
    }&fallback=true`,
    context,
  );
  const json = await resolveJson(response);

  // The api does not always return the exact number of results as ids provided.
  // So always map over ids so that dataLoader gets the right amount of results in correct order.
  return articleIds.map(id => {
    const article = json.results.find((item: { id: number }) => {
      return item.id.toString() === id;
    });

    if (article) {
      return {
        id: article.id,
        title: article.title.title,
        introduction: article.introduction
          ? article.introduction.introduction
          : undefined,
        metaDescription: article.metaDescription
          ? article.metaDescription.metaDescription
          : undefined,
        lastUpdated: article.lastUpdated || undefined,
        metaImage: article.metaImage
          ? { url: article.metaImage.url, alt: article.metaImage.alt }
          : undefined,
      };
    }
    return null;
  });
}

export async function fetchLearningpaths(
  learningpathIds: string[],
  context: Context,
): Promise<GQLMeta[]> {
  const response = await fetch(
    `/learningpath-api/v2/learningpaths/?language=${
      context.language
    }&fallback=true&ids=${learningpathIds.join(',')}`,
    context,
  );
  const json = await resolveJson(response);

  // The api does not always return the exact number of results as ids provided.
  // So always map over ids so that dataLoader gets the right amount of results in correct order.
  return learningpathIds.map(id => {
    const learningpath = json.results.find((item: { id: number }) => {
      return item.id.toString() === id;
    });

    if (learningpath) {
      return {
        id: learningpath.id,
        title: learningpath.title.title,
        introduction: learningpath.introduction
          ? learningpath.introduction.introduction
          : undefined,
        metaDescription: learningpath.description
          ? learningpath.description.description
          : undefined,
        lastUpdated: learningpath.lastUpdated,
        metaImage: {
          url: learningpath.coverPhotoUrl,
          alt: learningpath.introduction
            ? learningpath.introduction.introduction
            : '',
        },
      };
    }
    return null;
  });
}

export async function fetchFrontpage(
  context: Context,
): Promise<FrontpageResponse> {
  const response = await fetch(`/frontpage-api/v1/frontpage/`, context);

  const frontpage: any = await resolveJson(response);

  // TODO: remove transform fallback when frontpage-api is updated in all environments
  const transformedCategories = frontpage.categories.map((category: any) => {
    const subjects = category.subjects.map((subject: any) => {
      // Handle old/deprecated frontpage-api response
      if (isString(subject)) {
        return { id: subject };
      }
      return subject;
    });

    return {
      ...category,
      subjects,
    };
  });

  return {
    ...frontpage,
    categories: transformedCategories,
  };
}

export async function fetchSubjectPage(
  subjectPageId: string,
  context: Context,
): Promise<GQLSubjectPage> {
  const response = await fetch(
    `/frontpage-api/v1/subjectpage/${subjectPageId}?language=${
      context.language
    }`,
    context,
  );
  const subjectPage: GQLSubjectPage = await resolveJson(response);
  return subjectPage;
}

export { fetchCompetenceGoals, fetchCurriculum } from './curriculumApi';
export {
  fetchFilters,
  fetchResource,
  fetchResourceTypes,
  fetchSubjectTopics,
  fetchSubjects,
  fetchTopic,
  fetchTopicFilters,
  fetchTopicResources,
  fetchTopics,
} from './taxonomyApi';
export { search, groupSearch } from './searchApi';
