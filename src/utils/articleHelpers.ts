/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { IArticleV2DTO } from "@ndla/types-backend/article-api";
import { NodeChild } from "@ndla/types-taxonomy";
import { GQLTaxonomyEntity } from "../types/schema";

export function isNDLAEmbedUrl(url: string) {
  try {
    const urlObject = new URL(url);
    if (urlObject.hostname === "ndla.no" || urlObject.hostname.endsWith(".ndla.no")) return true;
    return urlObject.hostname === "localhost";
  } catch {
    return false;
  }
}

export function getArticleIdFromUrn(urn: string): string {
  return urn.replace("urn:article:", "");
}

export function getLearningpathIdFromUrn(urn: string): string {
  return urn.replace("urn:learningpath:", "");
}

export function stripUrn(str: string): string {
  return str.replace("urn:", "");
}

export async function filterMissingArticles<T extends GQLTaxonomyEntity | NodeChild>(
  entities: T[],
  context: ContextWithLoaders,
): Promise<T[]> {
  const visibleEntities = entities.filter((taxonomyEntity) =>
    taxonomyEntity.metadata ? taxonomyEntity.metadata.visible : true,
  );

  const entitiesWithContentUri = visibleEntities.filter((taxonomyEntity) => !!taxonomyEntity.contentUri);

  const learningpathResources = entitiesWithContentUri.filter(
    (taxonomyEntity) => taxonomyEntity.contentUri?.includes("urn:learningpath"),
  );

  const articleResources = entitiesWithContentUri.filter(
    (taxonomyEntity) => taxonomyEntity.contentUri?.includes("urn:article"),
  );

  const articles = await context.loaders.articlesLoader.loadMany(
    articleResources.map((taxonomyEntity) => getArticleIdFromUrn(taxonomyEntity.contentUri ?? "")),
  );
  const nonNullArticles = articles.filter((article): article is IArticleV2DTO => !!article);

  const activeResources = articleResources.filter((taxonomyEntity) =>
    nonNullArticles.find((article) => getArticleIdFromUrn(taxonomyEntity.contentUri ?? "") === `${article.id}`),
  );

  const withAvailabilityAndLanguage = activeResources.map((taxonomyEntity) => {
    const article = nonNullArticles.find((a) => getArticleIdFromUrn(taxonomyEntity.contentUri ?? "") === `${a.id}`);
    return {
      ...taxonomyEntity,
      availability: article?.availability,
      language: article?.content.language ?? taxonomyEntity.language,
    };
  });

  return [...learningpathResources, ...withAvailabilityAndLanguage];
}
