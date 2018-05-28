/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { fetch, resolveJson } from '../utils/apiHelpers';

export async function fetchResource(
  resourceId: string,
  context: Context,
): Promise<GQLResource> {
  const response = await fetch(
    `/taxonomy/v1/resources/${resourceId}/?language=${context.language}`,
    context,
  );
  return resolveJson(response);
}

export async function fetchFilters(context: Context): Promise<GQLFilter[]> {
  const response = await fetch(
    `/taxonomy/v1/filters/?language=${context.language}`,
    context,
  );
  return resolveJson(response);
}

export async function fetchResourceResourceTypes(
  resourceId: string,
  context: Context,
): Promise<GQLResourceType[]> {
  const response = await fetch(
    `/taxonomy/v1/resources/${resourceId}/resource-types?language=${
      context.language
    }`,
    context,
  );
  return resolveJson(response);
}

export async function fetchResourceTypes(
  context: Context,
): Promise<GQLResourceType[]> {
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
  const response = await fetch(
    `/article-converter/json/${context.language}/${articleId}`,
    context,
  );
  return resolveJson(response);
}

export async function fetchTopicResources(
  topicId: string,
  relevance: string = 'urn:relevance:core',
  context: Context,
): Promise<GQLResource[]> {
  const response = await fetch(
    `/taxonomy/v1/topics/${topicId}/resources?relevance=${relevance}&language=${
      context.language
    }`,
    context,
  );
  const json = await resolveJson(response);
  return json;
}

export async function fetchArticles(
  articleIds: string[],
  context: Context,
): Promise<GQLArticleSubset[]> {
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
      };
    }
    return null;
  });
}

export async function fetchLearningpathMeta(
  learningPathId: string,
  context: Context,
): Promise<GQLResourceMeta> {
  const response = await fetch(
    `/learningpath-api/v2/learningpaths/${learningPathId}`,
    context,
  );
  const learningPath = await resolveJson(response);
  return {
    id: learningPath.id,
    title: learningPath.title.title,
    introduction: learningPath.introduction
      ? learningPath.introduction.introduction
      : undefined,
    metaDescription: learningPath.description
      ? learningPath.description.description
      : undefined,
    metaImage: learningPath.coverPhoto
      ? learningPath.coverPhoto.url
      : undefined,
    lastUpdated: learningPath.lastUpdated,
  };
}

export async function fetchArticleMeta(
  articleId: string,
  context: Context,
): Promise<GQLResourceMeta> {
  const response = await fetch(
    `/article-converter/json/${context.language}/${articleId}`,
    context,
  );
  const article = await resolveJson(response);
  return {
    id: article.id,
    title: article.title,
    introduction: article.introduction,
    metaDescription: article.metaDescription,
    metaImage: article.metaImage ? article.metaImage.url : undefined,
    lastUpdated: article.updated,
  };
}

export async function fetchFrontpage(context: Context): Promise<GQLFrontpage> {
  const response = await fetch(`/frontpage-api/v1/frontpage/`, context);
  return resolveJson(response);
}

export async function fetchSubjectPage(
  subjectPageId: string,
  context: Context,
): Promise<GQLSubjectPage> {
  const response = await fetch(
    `/frontpage-api/v1/subjectpage/${subjectPageId}`,
    context,
  );
  return resolveJson(response);
}
