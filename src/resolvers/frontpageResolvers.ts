/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { IArticleV2DTO } from "@ndla/types-backend/article-api";
import {
  IFrontPageDTO,
  ISubjectPageDataDTO,
  IFilmFrontPageDataDTO,
  IMovieThemeDTO,
  IMenuDTO,
} from "@ndla/types-backend/frontpage-api";
import { fetchFilmFrontpage } from "../api";
import { GQLMetaImage, GQLResourceType } from "../types/schema";
import { getArticleIdFromUrn } from "../utils/articleHelpers";

interface Id {
  id: number;
}

export const Query = {
  async frontpage(_: any, __: any, context: ContextWithLoaders): Promise<IFrontPageDTO> {
    return context.loaders.frontpageLoader.load("frontpage");
  },

  async subjectpage(_: any, { id }: Id, context: ContextWithLoaders): Promise<ISubjectPageDataDTO | null> {
    return context.loaders.subjectpageLoader.load(`${id}`);
  },

  async filmfrontpage(_: any, __: any, context: ContextWithLoaders): Promise<IFilmFrontPageDataDTO> {
    return fetchFilmFrontpage(context);
  },
};

export const resolvers = {
  FrontpageMenu: {
    async article(menu: IFrontPageDTO, _: any, context: ContextWithLoaders): Promise<IArticleV2DTO | undefined> {
      return context.loaders.articlesLoader.load(`${menu.articleId}`);
    },
    async hideLevel(menu: IFrontPageDTO | IMenuDTO): Promise<boolean> {
      return "hideLevel" in menu ? menu.hideLevel ?? false : false;
    },
  },

  MovieTheme: {
    async movies(theme: IMovieThemeDTO, _: any, context: ContextWithLoaders): Promise<string[]> {
      const articles = await context.loaders.articlesLoader.loadMany(
        theme.movies.map((movie) => getArticleIdFromUrn(movie)),
      );
      const nonNullArticles = articles.filter((article): article is IArticleV2DTO => !!article);
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
      const article = await context.loaders.articlesLoader.load(getArticleIdFromUrn(id));
      return article?.title.title || "";
    },
    async metaImage(id: string, _: any, context: ContextWithLoaders): Promise<GQLMetaImage | undefined> {
      const article = await context.loaders.articlesLoader.load(getArticleIdFromUrn(id));
      return article?.metaImage;
    },
    async metaDescription(id: string, _: any, context: ContextWithLoaders): Promise<string> {
      const article = await context.loaders.articlesLoader.load(getArticleIdFromUrn(id));
      return article?.metaDescription.metaDescription || "";
    },
    async path(id: string, _: any, context: ContextWithLoaders): Promise<string> {
      const nodes = await context.loaders.nodesLoader.load({ contentURI: id, rootId: "urn:subject:20" });
      return nodes[0]?.path || "";
    },
    async url(id: string, _: any, context: ContextWithLoaders): Promise<string> {
      const nodes = await context.loaders.nodesLoader.load({ contentURI: id, rootId: "urn:subject:20" });
      return nodes[0]?.url || "";
    },
    async resourceTypes(id: string, _: any, context: ContextWithLoaders): Promise<GQLResourceType[]> {
      const nodes = await context.loaders.nodesLoader.load({ contentURI: id, rootId: "urn:subject:20" });
      return nodes[0]?.resourceTypes ?? [];
    },
  },

  FilmFrontpage: {
    async article(
      frontpage: IFilmFrontPageDataDTO,
      _: any,
      context: ContextWithLoaders,
    ): Promise<IArticleV2DTO | undefined> {
      if (frontpage.article) {
        return context.loaders.articlesLoader.load(getArticleIdFromUrn(frontpage.article));
      }
      return undefined;
    },
  },
};
