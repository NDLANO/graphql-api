/*
 * Copyright (c) 2019-present, NDLA.
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export function isNDLAEmbedUrl(url: string) {
  const urlIsProductionNDLA = /^(http|https):\/\/ndla.no/.test(url);
  const urlIsTestNDLA = /^(http|https):\/\/ndla-frontend.([a-zA-Z]+.)api.ndla.no/.test(
    url,
  );
  return urlIsProductionNDLA || urlIsTestNDLA;
}

export function getArticleIdFromUrn(urn: string): string {
  return urn.replace('urn:article:', '');
}

export function getLearningpathIdFromUrn(urn: string): string {
  return urn.replace('urn:learningpath:', '');
}

export async function filterMissingArticles(
  entities: GQLTaxonomyEntity[],
  context: Context,
): Promise<GQLTaxonomyEntity[]> {
  const entitiesWithContentUri = entities.filter(
    taxonomyEntity => !!taxonomyEntity.contentUri,
  );

  const learningpathResources = entitiesWithContentUri.filter(taxonomyEntity =>
    taxonomyEntity.contentUri.includes('urn:learningpath'),
  );

  const articleResources = entitiesWithContentUri.filter(taxonomyEntity =>
    taxonomyEntity.contentUri.includes('urn:article'),
  );

  const articles = await context.loaders.articlesLoader.loadMany(
    articleResources.map(taxonomyEntity =>
      getArticleIdFromUrn(taxonomyEntity.contentUri),
    ),
  );
  const nonNullArticles = articles.filter(article => !!article);
  return [
    ...learningpathResources,
    ...articleResources.filter(taxonomyEntity =>
      nonNullArticles.find(
        article =>
          getArticleIdFromUrn(taxonomyEntity.contentUri) === `${article.id}`,
      ),
    ),
  ];
}
