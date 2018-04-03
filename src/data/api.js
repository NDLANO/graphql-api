/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const { fetch } = require('../utils/apiHelpers');

async function fetchResource(resourceId, context) {
  const response = await fetch(
    `/taxonomy/v1/resources/${resourceId}/`,
    context
  );
  return response.json();
}

async function fetchFilters(context) {
  const response = await fetch(`/taxonomy/v1/filters/`, context);
  return response.json();
}

async function fetchResourceResourceTypes(resourceId, context) {
  const response = await fetch(
    `/taxonomy/v1/resources/${resourceId}/resource-types`,
    context
  );
  return response.json();
}

async function fetchResourceTypes(context) {
  const response = await fetch(`/taxonomy/v1/resource-types`, context);
  return response.json();
}
async function fetchSubjects(context) {
  const response = await fetch(`/taxonomy/v1/subjects/`, context);
  return response.json();
}

async function fetchSubjectTopics(subjectId, context) {
  const response = await fetch(
    `/taxonomy/v1/subjects/${subjectId}/topics?recursive=true`,
    context
  );
  return response.json();
}

async function fetchTopics(context) {
  const response = await fetch(`/taxonomy/v1/topics/`, context);
  return response.json();
}

async function fetchArticle(articleId, context) {
  const response = await fetch(
    `/article-converter/json/nb/${articleId}`,
    context
  );
  return response.json();
}

async function fetchTopicResources(
  topicId,
  relevance = 'urn:relevance:core',
  context
) {
  const response = await fetch(
    `/taxonomy/v1/topics/${topicId}/resources?relevance=${relevance}`,
    context
  );
  return response.json();
}

async function fetchArticles(articleIds, context) {
  const response = await fetch(
    `/article-api/v2/articles/?ids=${articleIds.join(',')}`,
    context
  );
  const json = await response.json();
  return json.results.map(article => {
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

module.exports = {
  fetchFilters,
  fetchResource,
  fetchArticle,
  fetchArticles,
  fetchTopics,
  fetchSubjects,
  fetchSubjectTopics,
  fetchResourceTypes,
  fetchResourceResourceTypes,
  fetchTopicResources,
};
