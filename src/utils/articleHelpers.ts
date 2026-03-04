/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { ArticleV2DTO } from "@ndla/types-backend/article-api";
import { LearningPathV2DTO } from "@ndla/types-backend/learningpath-api";
import { NodeChild } from "@ndla/types-taxonomy";
import keyBy from "lodash/keyBy";
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

interface Partitioned<T> {
  articleResources: T[];
  learningpathResources: T[];
}

export async function filterMissingResources<T extends GQLTaxonomyEntity | NodeChild>(
  entities: T[],
  context: ContextWithLoaders,
): Promise<T[]> {
  const visibleEntities = entities.filter((taxonomyEntity) =>
    taxonomyEntity.metadata ? taxonomyEntity.metadata.visible : true,
  );

  const entitiesWithContentUri = visibleEntities.filter((taxonomyEntity) => !!taxonomyEntity.contentUri);

  const { articleResources, learningpathResources } = entitiesWithContentUri.reduce<Partitioned<T>>(
    (acc, taxonomyEntity) => {
      if (taxonomyEntity.contentUri?.includes("urn:learningpath")) {
        acc.learningpathResources.push(taxonomyEntity);
      } else if (taxonomyEntity.contentUri?.includes("urn:article")) {
        acc.articleResources.push(taxonomyEntity);
      }
      return acc;
    },
    { articleResources: [], learningpathResources: [] },
  );

  const articlesPromise = context.loaders.articlesLoader.loadMany(
    articleResources.map((node) => getArticleIdFromUrn(node.contentUri ?? "")),
  );

  const learningpathsPromise = context.loaders.learningpathsLoader.loadMany(
    learningpathResources.map((node) => Number(getLearningpathIdFromUrn(node.contentUri ?? ""))),
  );

  const [articles, learningpaths] = await Promise.all([articlesPromise, learningpathsPromise]);

  const keyedArticles = keyBy<ArticleV2DTO | undefined>(articles, (article) => article?.id ?? "never");
  const keyedLearningpaths = keyBy<LearningPathV2DTO | undefined>(
    learningpaths,
    (learningpath) => learningpath?.id ?? "never",
  );

  const activeArticles = articleResources.reduce<T[]>((acc, node) => {
    const article = keyedArticles[getArticleIdFromUrn(node.contentUri ?? "")];
    if (article) {
      acc.push({
        ...node,
        article: article,
        availability: article.availability,
        language: article.content.language ?? node.language,
      });
    }
    return acc;
  }, []);

  const activeLearningpaths = learningpathResources.reduce<T[]>((acc, node) => {
    const lp = keyedLearningpaths[Number(getLearningpathIdFromUrn(node.contentUri ?? ""))];
    if (lp) {
      acc.push({ ...node, learningpath: lp });
    }
    return acc;
  }, []);

  return activeLearningpaths.concat(activeArticles);
}
