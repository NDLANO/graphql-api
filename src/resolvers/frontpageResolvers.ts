/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  IFrontPage,
  ISubjectPageData,
  IFilmFrontPageData,
  IMovieTheme,
  IMenu,
} from '@ndla/types-backend/frontpage-api';
import { TaxonomyContext } from '@ndla/types-taxonomy';
import {
  fetchArticle,
  fetchSubjectPage,
  fetchFilmFrontpage,
  fetchMovieMeta,
  nodesFromContentURI,
  queryContexts,
} from '../api';
import { getArticleIdFromUrn } from '../utils/articleHelpers';
import {
  GQLArticle,
  GQLMeta,
  GQLMetaImage,
  GQLMovieResourceTypes,
  GQLResourceType,
} from '../types/schema';

interface Id {
  id: number;
}

export const Query = {
  async frontpage(
    _: any,
    __: any,
    context: ContextWithLoaders,
  ): Promise<IFrontPage> {
    return context.loaders.frontpageLoader.load('frontpage');
  },

  async subjectpage(
    _: any,
    { id }: Id,
    context: ContextWithLoaders,
  ): Promise<ISubjectPageData> {
    return fetchSubjectPage(id, context);
  },

  async filmfrontpage(
    _: any,
    __: any,
    context: ContextWithLoaders,
  ): Promise<IFilmFrontPageData> {
    return fetchFilmFrontpage(context);
  },
};

export const resolvers = {
  Frontpage: {
    async article(
      frontpage: IFrontPage,
      _: any,
      context: ContextWithLoaders,
    ): Promise<GQLArticle> {
      return fetchArticle(
        {
          articleId: `${frontpage.articleId}`,
          convertEmbeds: true,
        },
        context,
      );
    },
  },

  Menu: {
    async title(
      menu: IMenu,
      _: any,
      context: ContextWithLoaders,
    ): Promise<string> {
      const article = await fetchArticle(
        {
          articleId: `${menu.articleId}`,
          convertEmbeds: true,
        },
        context,
      );
      return article.title;
    },
    async slug(
      menu: IMenu,
      _: any,
      context: ContextWithLoaders,
    ): Promise<string> {
      const article = await fetchArticle(
        {
          articleId: `${menu.articleId}`,
          convertEmbeds: true,
        },
        context,
      );
      return article.slug || '';
    },
  },

  MovieTheme: {
    async movies(
      theme: IMovieTheme,
      _: any,
      context: ContextWithLoaders,
    ): Promise<string[]> {
      const articles = await context.loaders.articlesLoader.loadMany(
        theme.movies.map(movie => getArticleIdFromUrn(movie)),
      );
      const nonNullArticles = articles.filter(
        (article): article is GQLMeta => !!article,
      );
      return theme.movies.filter(movie =>
        nonNullArticles.find(
          article => `${article.id}` === getArticleIdFromUrn(movie),
        ),
      );
    },
  },

  Movie: {
    async id(id: string) {
      return id;
    },
    async title(
      id: string,
      _: any,
      context: ContextWithLoaders,
    ): Promise<string> {
      const movieMeta = await fetchMovieMeta(id, context);
      return movieMeta?.title || '';
    },
    async metaImage(
      id: string,
      _: any,
      context: ContextWithLoaders,
    ): Promise<GQLMetaImage | undefined> {
      const movieMeta = await fetchMovieMeta(id, context);
      return movieMeta?.metaImage;
    },
    async metaDescription(
      id: string,
      _: any,
      context: ContextWithLoaders,
    ): Promise<string> {
      const movieMeta = await fetchMovieMeta(id, context);
      return movieMeta?.metaDescription || '';
    },
    async path(
      id: string,
      _: any,
      context: ContextWithLoaders,
    ): Promise<string> {
      const contexts: TaxonomyContext[] = await queryContexts(id, context);
      return (
        contexts?.find(ctx => ctx.path.startsWith('/subject:20/'))?.path || ''
      );
    },
    async resourceTypes(
      id: string,
      _: any,
      context: ContextWithLoaders,
    ): Promise<GQLResourceType[]> {
      const movieResourceTypes: GQLMovieResourceTypes = await nodesFromContentURI(
        id,
        context,
      );
      return movieResourceTypes.resourceTypes ?? [];
    },
  },
};
