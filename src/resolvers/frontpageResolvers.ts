/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { ArticleV2DTO } from "@ndla/types-backend/article-api";
import {
  FrontPageDTO,
  SubjectPageDTO,
  FilmFrontPageDTO,
  MovieThemeDTO,
  MenuDTO,
} from "@ndla/types-backend/frontpage-api";
import { fetchFilmFrontpage } from "../api";
import { GQLMetaImage, GQLResourceType } from "../types/schema";
import { getArticleIdFromUrn } from "../utils/articleHelpers";

interface Id {
  id: number;
}

export const Query = {
  async frontpage(_: any, __: any, context: ContextWithLoaders): Promise<FrontPageDTO> {
    return context.loaders.frontpageLoader.load("frontpage");
  },

  async subjectpage(_: any, { id }: Id, context: ContextWithLoaders): Promise<SubjectPageDTO | null> {
    return context.loaders.subjectpageLoader.load(id);
  },

  async filmfrontpage(_: any, __: any, context: ContextWithLoaders): Promise<FilmFrontPageDTO> {
    return fetchFilmFrontpage(context);
  },
};

export const resolvers = {
  FrontpageMenu: {
    async article(menu: FrontPageDTO, _: any, context: ContextWithLoaders): Promise<ArticleV2DTO | undefined> {
      return context.loaders.articlesLoader.load(`${menu.articleId}`);
    },
    async hideLevel(menu: FrontPageDTO | MenuDTO): Promise<boolean> {
      return "hideLevel" in menu ? (menu.hideLevel ?? false) : false;
    },
  },

  MovieTheme: {
    async movies(theme: MovieThemeDTO, _: any, context: ContextWithLoaders): Promise<string[]> {
      const articles = await context.loaders.articlesLoader.loadMany(
        theme.movies.map((movie) => getArticleIdFromUrn(movie)),
      );
      const nonNullArticles = articles.filter((article): article is ArticleV2DTO => !!article);
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
    async url(id: string, _: any, context: ContextWithLoaders): Promise<string> {
      const nodes = await context.loaders.searchNodesLoader.load(id);
      const correctContext = nodes[0]?.contexts.find((c) => c.rootId === "urn:subject:20");
      return correctContext?.url ?? "";
    },
    async resourceTypes(id: string, _: any, context: ContextWithLoaders): Promise<GQLResourceType[]> {
      const nodes = await context.loaders.searchNodesLoader.load(id);
      return nodes[0]?.resourceTypes || [];
    },
  },

  FilmFrontpage: {
    async article(frontpage: FilmFrontPageDTO, _: any, context: ContextWithLoaders): Promise<ArticleV2DTO | undefined> {
      if (frontpage.article) {
        return context.loaders.articlesLoader.load(getArticleIdFromUrn(frontpage.article));
      }
      return undefined;
    },
  },
};
