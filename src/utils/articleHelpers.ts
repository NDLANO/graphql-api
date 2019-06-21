/*
 * Copyright (c) 2019-present, NDLA.
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export function getArticleIdFromUrn(urn: string): string {
  return urn.replace('urn:article:', '');
}
export async function filterMissingArticles(
  entities: GQLTaxonomyEntity[],
  context: Context,
): Promise<GQLTaxonomyEntity[]> {
  const entitiesWithContentUri = entities.filter(
    taxonomyEntity => !!taxonomyEntity.contentUri,
  );
  const articles = await context.loaders.articlesLoader.loadMany(
    entitiesWithContentUri.map(taxonomyEntity =>
      getArticleIdFromUrn(taxonomyEntity.contentUri),
    ),
  );
  const nonNullArticles = articles.filter(article => !!article);
  return entitiesWithContentUri.filter(taxonomyEntity =>
    nonNullArticles.find(
      article =>
        getArticleIdFromUrn(taxonomyEntity.contentUri) === `${article.id}`,
    ),
  );
}
