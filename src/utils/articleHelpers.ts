/*
 * Copyright (c) 2019-present, NDLA.
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export async function filterMissingArticles(
  entities: GQLTaxonomyEntity[],
  context: Context,
): Promise<GQLTaxonomyEntity[]> {
  const articles = await context.loaders.articlesLoader.loadMany(
    entities
      .filter(taxonomyEntity => !!taxonomyEntity.contentUri)
      .map(taxonomyEntity =>
        taxonomyEntity.contentUri.replace('urn:article:', ''),
      ),
  );
  const nonNullArticles = articles.filter(article => !!article);
  return entities
    .filter(taxonomyEntity => !!taxonomyEntity.contentUri)
    .filter(taxonomyEntity =>
      nonNullArticles.find(
        article =>
          taxonomyEntity.contentUri.replace('urn:article:', '') ===
          `${article.id}`,
      ),
    );
}
