/**
 * Copyright (c) 2022-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

// @ts-strict-ignore

import DataLoader from "dataloader";
import { IFilmFrontPageData, IFrontPage, ISubjectPageData } from "@ndla/types-backend/frontpage-api";
import { Node } from "@ndla/types-taxonomy";
import { GQLMeta, GQLReference, GQLResourceTypeDefinition, GQLSubject, GQLTopic } from "../../types/schema";

const mockFn = async <T>(mockData: T) => mockData;

export const mockArticlesLoader = (mockData: GQLMeta[] = []) => {
  return new DataLoader<string, GQLMeta>(() => mockFn(mockData));
};

export const mockLearningpathsLoader = (mockData: GQLMeta[] = []) => {
  return new DataLoader<string, GQLMeta>(() => mockFn(mockData));
};

export const mockLk20CurriculumLoader = (mockData: GQLReference[] = []) => {
  return new DataLoader<{ code: string; language: string }, GQLReference>(() => mockFn(mockData));
};

export const mockFrontpageLoader = (mockData: IFrontPage[] = [mockFrontpageDefaultResponse]) => {
  return new DataLoader<string, IFrontPage>(() => mockFn(mockData));
};

export const mockFilmFrontpageLoader = (mockData: IFilmFrontPageData[] = [mockFilmFrontPageDefaultResponse]) => {
  return new DataLoader<string, IFilmFrontPageData>(() => mockFn(mockData));
};

export const mockSubjectsLoader = (mockData: GQLSubject[] = []) => {
  return new DataLoader<
    {
      metadataFilter?: { key: string; value?: string };
      filterVisible: boolean;
    },
    { subjects: GQLSubject[] }
  >(async () => {
    return [{ subjects: await mockFn(mockData) }];
  });
};

export const mockSubjectLoader = (mockData: Node[] | null = null) => {
  return new DataLoader<
    {
      id?: string;
      visible?: boolean;
    },
    Node
  >(async () => {
    return await mockFn(mockData);
  });
};

export const mockSubjectpageLoader = (mockData: ISubjectPageData[] | null = null) => {
  return new DataLoader<string, ISubjectPageData>(() => mockFn(mockData));
};

export const mockSubjectTopicsLoader = (mockData: GQLTopic[] = []) => {
  return new DataLoader<{ subjectId: string }, GQLTopic>(() => mockFn(mockData));
};

export const mockResourceTypesLoader = (mockData: GQLResourceTypeDefinition[] = []) => {
  return new DataLoader<string, GQLResourceTypeDefinition>(() => mockFn(mockData));
};

export const mockFrontpageDefaultResponse: IFrontPage = {
  articleId: undefined,
  menu: [],
};

export const mockFilmFrontPageDefaultResponse: IFilmFrontPageData = {
  name: "",
  about: [],
  movieThemes: [],
  slideShow: [],
};

export const mockLoaders = {
  articlesLoader: mockArticlesLoader(),
  learningpathsLoader: mockLearningpathsLoader(),
  lk20CurriculumLoader: mockLk20CurriculumLoader(),
  frontpageLoader: mockFrontpageLoader(),
  filmFrontpageLoader: mockFilmFrontpageLoader(),
  subjectsLoader: mockSubjectTopicsLoader(),
  subjectLoader: mockSubjectLoader(),
  subjectPageLoader: mockSubjectpageLoader(),
  subjectTopicsLoader: mockSubjectTopicsLoader(),
  resourceTypesLoader: mockResourceTypesLoader(),
};
