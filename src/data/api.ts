/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { fetch } from '../utils/apiHelpers';

export async function fetchResource(
  resourceId: string,
  context: Context
): Promise<GQLResource> {
  const response = await fetch(
    `/taxonomy/v1/resources/${resourceId}/`,
    context
  );
  return response.json();
}

export async function fetchFilters(context: Context): Promise<GQLFilter[]> {
  const response = await fetch(`/taxonomy/v1/filters/`, context);
  return response.json();
}

export async function fetchResourceResourceTypes(
  resourceId: string,
  context: Context
): Promise<GQLResourceType[]> {
  const response = await fetch(
    `/taxonomy/v1/resources/${resourceId}/resource-types`,
    context
  );
  return response.json();
}

export async function fetchResourceTypes(
  context: Context
): Promise<GQLResourceType[]> {
  const response = await fetch(`/taxonomy/v1/resource-types`, context);
  return response.json();
}

export async function fetchSubjects(context: Context): Promise<GQLSubject[]> {
  const response = await fetch(`/taxonomy/v1/subjects/`, context);
  return response.json();
}

export async function fetchSubjectTopics(subjectId: string, context: Context) {
  const response = await fetch(
    `/taxonomy/v1/subjects/${subjectId}/topics?recursive=true`,
    context
  );
  return response.json();
}

export async function fetchTopics(context: Context): Promise<GQLTopic[]> {
  const response = await fetch(`/taxonomy/v1/topics/`, context);
  return response.json();
}

export async function fetchArticle(
  articleId: string,
  context: Context
): Promise<GQLArticle> {
  const response = await fetch(
    `/article-converter/json/nb/${articleId}`,
    context
  );
  return response.json();
}

export async function fetchTopicResources(
  topicId: string,
  relevance: string = 'urn:relevance:core',
  context: Context
): Promise<GQLResource[]> {
  const response = await fetch(
    `/taxonomy/v1/topics/${topicId}/resources?relevance=${relevance}`,
    context
  );
  const json = await response.json();
  return json;
}

export async function fetchArticles(
  articleIds: string[],
  context: Context
): Promise<GQLArticleSubset[]> {
  const response = await fetch(
    `/article-api/v2/articles/?ids=${articleIds.join(',')}`,
    context
  );
  const json = await response.json();
  return json.results.map((article: any) => {
    return {
      id: article.id,
      title: article.title.title,
      introduction: article.introduction
        ? article.introduction.introduction
        : undefined,
      metaDescription: article.metaDescription
        ? article.metaDescription.metaDescription
        : undefined,
    };
  });
}
