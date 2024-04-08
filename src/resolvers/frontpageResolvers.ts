/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { IArticleV2 } from "@ndla/types-backend/article-api";
import {
  IFrontPage,
  ISubjectPageData,
  IFilmFrontPageData,
  IMovieTheme,
  IMenu,
} from "@ndla/types-backend/frontpage-api";
import { TaxonomyContext } from "@ndla/types-taxonomy";
import { fetchArticle, fetchFilmFrontpage, fetchMovieMeta, queryContexts, queryNodes } from "../api";
import { GQLMeta, GQLMetaImage, GQLResourceType } from "../types/schema";
import { getArticleIdFromUrn } from "../utils/articleHelpers";

interface Id {
  id: number;
}

export const Query = {
  async frontpage(_: any, __: any, context: ContextWithLoaders): Promise<IFrontPage> {
    return context.loaders.frontpageLoader.load("frontpage");
  },

  async subjectpage(_: any, { id }: Id, context: ContextWithLoaders): Promise<ISubjectPageData | null> {
    return context.loaders.subjectpageLoader.load(`${id}`);
  },

  async filmfrontpage(_: any, __: any, context: ContextWithLoaders): Promise<IFilmFrontPageData> {
    return fetchFilmFrontpage(context);
  },
};

export const resolvers = {
  FrontpageMenu: {
    async article(menu: IFrontPage, _: any, context: ContextWithLoaders): Promise<IArticleV2> {
      return fetchArticle({ articleId: `${menu.articleId}` }, context);
    },
    async hideLevel(menu: IFrontPage | IMenu, _: any, context: ContextWithLoaders): Promise<boolean> {
      return "hideLevel" in menu ? menu.hideLevel ?? false : false;
    },
  },

  MovieTheme: {
    async movies(theme: IMovieTheme, _: any, context: ContextWithLoaders): Promise<string[]> {
      const articles = await context.loaders.articlesLoader.loadMany(
        theme.movies.map((movie) => getArticleIdFromUrn(movie)),
      );
      const nonNullArticles = articles.filter((article): article is GQLMeta => !!article);
      return theme.movies.filter((movie) =>
        nonNullArticles.find((article) => `${article.id}` === getArticleIdFromUrn(movie)),
      );
    },
  },

  Movie: {
    async id(id: string) {
      return id;
    },
    async title(id: string, _: any, context: ContextWithLoaders): Promise<string> {
      const movieMeta = await fetchMovieMeta(id, context);
      return movieMeta?.title || "";
    },
    async metaImage(id: string, _: any, context: ContextWithLoaders): Promise<GQLMetaImage | undefined> {
      const movieMeta = await fetchMovieMeta(id, context);
      return movieMeta?.metaImage;
    },
    async metaDescription(id: string, _: any, context: ContextWithLoaders): Promise<string> {
      const movieMeta = await fetchMovieMeta(id, context);
      return movieMeta?.metaDescription || "";
    },
    async path(id: string, _: any, context: ContextWithLoaders): Promise<string> {
      const contexts: TaxonomyContext[] = await queryContexts(id, context);
      return contexts?.find((ctx) => ctx.rootId === "urn:subject:20")?.path || "";
    },
    async resourceTypes(id: string, _: any, context: ContextWithLoaders): Promise<GQLResourceType[]> {
      const nodes = await queryNodes({ contentURI: id, language: context.language }, context);
      return nodes[0]?.resourceTypes ?? [];
    },
  },

  FilmFrontpage: {
    async article(frontpage: IFilmFrontPageData, _: any, context: ContextWithLoaders): Promise<IArticleV2 | undefined> {
      if (frontpage.article) {
        return fetchArticle(
          {
            articleId: `${getArticleIdFromUrn(frontpage.article)}`,
          },
          context,
        );
      }
      return undefined;
    },
  },
};
