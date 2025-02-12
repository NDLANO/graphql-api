/**
 * Copyright (c) 2021-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { IArticleV2DTO } from "@ndla/types-backend/article-api";
import { IConceptDTO } from "@ndla/types-backend/concept-api";
import { convertToSimpleImage, fetchImage } from "../api/imageApi";
import { GQLConcept, GQLMeta, GQLVisualElement } from "../types/schema";
import { articleToMeta } from "../utils/apiHelpers";
import { parseVisualElement } from "../utils/visualelementHelpers";

export const Query = {};

export const resolvers = {
  Concept: {
    async subjectNames(concept: GQLConcept, params: any, context: ContextWithLoaders): Promise<string[]> {
      const subjectIds = concept.subjectIds;
      if (!subjectIds || subjectIds.length === 0) {
        return [];
      }
      const data = await context.loaders.subjectsLoader.load(params);
      return subjectIds.map((id) => data.subjects.find((subject) => subject.id === id)?.name || "");
    },
    async visualElement(concept: IConceptDTO, _: any, context: ContextWithLoaders): Promise<GQLVisualElement | null> {
      const visualElement = concept.visualElement?.visualElement;
      if (visualElement) {
        return await parseVisualElement(visualElement, context);
      }
      return null;
    },
    async image(concept: IConceptDTO, _: any, context: ContextWithLoaders) {
      const metaImageId = concept.metaImage?.url?.split("/").pop();
      if (metaImageId) {
        const image = await fetchImage(metaImageId, context);
        if (!image) {
          return undefined;
        }
        return convertToSimpleImage(image);
      }
      return undefined;
    },
    async articles(concept: IConceptDTO, _: any, context: ContextWithLoaders): Promise<GQLMeta[]> {
      const articleIds = concept.articleIds;
      if (!articleIds || articleIds.length === 0) {
        return [];
      }
      const fetched = await context.loaders.articlesLoader.loadMany(articleIds.map((id) => `${id}`));
      return fetched.filter((article): article is IArticleV2DTO => !!article).map(articleToMeta);
    },
    title(concept: IConceptDTO, _: any, __: ContextWithLoaders): string {
      return concept.title.title;
    },
    content(concept: IConceptDTO, _: any, __: ContextWithLoaders): string {
      return concept.content?.content ?? "";
    },
    tags: (concept: IConceptDTO, _: any, __: ContextWithLoaders): string[] => {
      return concept.tags?.tags || [];
    },
    subjectIds: (concept: IConceptDTO, _: any, __: ContextWithLoaders): string[] => {
      return concept.subjectIds || [];
    },
  },
};
