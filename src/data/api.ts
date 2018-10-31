/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import queryString from 'query-string';
import { fetch, resolveJson } from '../utils/apiHelpers';
import { localConverter } from '../config';
import { isString } from 'lodash';

export async function fetchResource(
  resourceId: string,
  context: Context,
): Promise<GQLResource> {
  const response = await fetch(
    `/taxonomy/v1/resources/${resourceId}/full?language=${context.language}`,
    context,
  );
  return resolveJson(response);
}

export async function fetchFilters(
  context: Context,
): Promise<GQLSubjectFilter[]> {
  const response = await fetch(
    `/taxonomy/v1/filters/?language=${context.language}`,
    context,
  );
  return resolveJson(response);
}

export async function fetchResourceTypes(
  context: Context,
): Promise<GQLResourceTypeDefinition[]> {
  const response = await fetch(
    `/taxonomy/v1/resource-types?language=${context.language}`,
    context,
  );
  return resolveJson(response);
}

export async function fetchSubjects(context: Context): Promise<GQLSubject[]> {
  const response = await fetch(
    `/taxonomy/v1/subjects/?language=${context.language}`,
    context,
  );
  return resolveJson(response);
}

export async function fetchSubjectTopics(
  subjectId: string,
  filterIds: string,
  context: Context,
) {
  const response = await fetch(
    `/taxonomy/v1/subjects/${subjectId}/topics?recursive=true&language=${
      context.language
    }${filterIds ? `&filter=${filterIds}` : ''}`,
    context,
  );
  return resolveJson(response);
}

export async function fetchTopics(context: Context): Promise<GQLTopic[]> {
  const response = await fetch(
    `/taxonomy/v1/topics/?language=${context.language}`,
    context,
  );
  return resolveJson(response);
}

export async function fetchTopic(id: string, context: Context) {
  const response = await fetch(
    `/taxonomy/v1/topics/${id}?language=${context.language}`,
    context,
  );
  return resolveJson(response);
}

export async function fetchTopicFilters(
  topicId: string,
  context: Context,
): Promise<GQLFilter[]> {
  const response = await fetch(
    `/taxonomy/v1/topics/${topicId}/filters`,
    context,
  );
  return resolveJson(response);
}

export async function fetchArticle(
  articleId: string,
  context: Context,
): Promise<GQLArticle> {
  const host = localConverter ? 'http://localhost:3100' : '';
  const response = await fetch(
    `${host}/article-converter/json/${context.language}/${articleId}`,
    context,
  );
  return resolveJson(response);
}

export async function fetchTopicResources(
  topicId: string,
  relevance: string = 'urn:relevance:core',
  filterIds: string,
  context: Context,
): Promise<GQLResource[]> {
  const filterParam =
    filterIds && filterIds.length > 0 ? `&filter=${filterIds}` : '';

  const response = await fetch(
    `/taxonomy/v1/topics/${topicId}/resources?relevance=${relevance}&language=${
      context.language
    }${filterParam}`,
    context,
  );
  const json = await resolveJson(response);
  return json;
}

export async function fetchArticles(
  articleIds: string[],
  context: Context,
): Promise<GQLMeta[]> {
  const response = await fetch(
    `/article-api/v2/articles/?ids=${articleIds.join(',')}`,
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
    `/learningpath-api/v2/learningpaths/?ids=${learningpathIds.join(',')}`,
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

  // TODO: remove deprecated displayInTwoColumns when frontpage-api is updated in all environments
  if (subjectPage.layout) {
    return {
      ...subjectPage,
      displayInTwoColumns: subjectPage.layout === 'double',
    };
  }

  return {
    ...subjectPage,
    layout: subjectPage.displayInTwoColumns ? 'double' : 'single',
  };
}

type SearchQuery = {
  query: string;
  pageSize: string;
  page: string;
  contextTypes: string;
  language: string;
  ids: string;
  resourceTypes: string;
  levels: string;
  sort: string;
  fallback: boolean;
  subjects: string;
  languageFilter: [string];
};

export async function search(
  searchQuery: SearchQuery,
  context: Context,
): Promise<GQLSearch> {
  const query = {
    ...searchQuery,
    pageSize: undefined,
    contextTypes: undefined,
    resourceTypes: undefined,
    languageFilter: undefined,
    'page-size': searchQuery.pageSize,
    'context-types': searchQuery.contextTypes,
    'resource-types': searchQuery.resourceTypes,
    'language-filter': searchQuery.languageFilter,
  };
  const response = await fetch(
    `/search-api/v1/search/?${queryString.stringify(searchQuery)}`,
    context,
  );
  const json = await resolveJson(response);

  return {
    ...json,
    results: json.results.map(result => ({
      ...result,
      id: result.id,
      title: result.title.title,
      metaDescription: result.metaDescription
        ? result.metaDescription.metaDescription
        : undefined,
      metaImage: result.metaImage
        ? { url: result.metaImage.url, alt: result.metaImage.alt }
        : undefined,
    })),
  };
}
