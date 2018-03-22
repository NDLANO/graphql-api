/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const { fetch } = require('../utils/apiHelpers');

async function resource(resourceId, context) {
  const response = await fetch(`/taxonomy/v1/resources/${resourceId}/`, {
    headers: { Authorization: `Bearer ${context.token.access_token}` },
  });
  const json = await response.json();
  return json;
}

async function resourceResourceTypes(resourceId, context) {
  const response = await fetch(
    `/taxonomy/v1/resources/${resourceId}/resource-types`,
    {
      headers: { Authorization: `Bearer ${context.token.access_token}` },
    }
  );
  const json = await response.json();
  return json;
}

async function resourceTypes(context) {
  const response = await fetch(`/taxonomy/v1/resource-types`, {
    headers: { Authorization: `Bearer ${context.token.access_token}` },
  });
  const json = await response.json();
  return json;
}
async function subjects(context) {
  const response = await fetch(`/taxonomy/v1/subjects/`, {
    headers: { Authorization: `Bearer ${context.token.access_token}` },
  });
  const json = await response.json();
  return json;
}

async function subjectTopics(subjectId, context) {
  const response = await fetch(
    `/taxonomy/v1/subjects/${subjectId}/topics?recursive=true`,
    {
      headers: { Authorization: `Bearer ${context.token.access_token}` },
    }
  );
  const json = await response.json();
  return json;
}

async function topics(context) {
  const response = await fetch(`/taxonomy/v1/topics/`, {
    headers: { Authorization: `Bearer ${context.token.access_token}` },
  });
  const json = await response.json();
  return json;
}

async function article(articleId, context) {
  const response = await fetch(`/article-converter/json/nb/${articleId}`, {
    headers: { Authorization: `Bearer ${context.token.access_token}` },
  });
  const json = await response.json();
  return json;
}

async function articles(articleIds, context) {
  const response = await fetch(
    `/article-api/v2/articles/?ids=${articleIds.join(',')}`,
    {
      headers: { Authorization: `Bearer ${context.token.access_token}` },
    }
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
  resource,
  article,
  articles,
  topics,
  subjects,
  subjectTopics,
  resourceTypes,
  resourceResourceTypes,
};
