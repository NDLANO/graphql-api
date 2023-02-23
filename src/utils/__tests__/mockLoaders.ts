// @ts-strict-ignore
import { IFilmFrontPageData, IFrontPageData } from '@ndla/types-frontpage-api';
import DataLoader from 'dataloader';
import { Node } from '../../api/taxonomyApi';
import {
  GQLMeta,
  GQLReference,
  GQLResourceTypeDefinition,
  GQLSubject,
  GQLTopic,
} from '../../types/schema';

const mockFn = async <T>(mockData: T) => mockData;

export const mockArticlesLoader = (mockData: GQLMeta[] = []) => {
  return new DataLoader<string, GQLMeta>(() => mockFn(mockData));
};

export const mockLearningpathsLoader = (mockData: GQLMeta[] = []) => {
  return new DataLoader<string, GQLMeta>(() => mockFn(mockData));
};

export const mockLk20CurriculumLoader = (mockData: GQLReference[] = []) => {
  return new DataLoader<{ code: string; language: string }, GQLReference>(() =>
    mockFn(mockData),
  );
};

export const mockFrontpageLoader = (
  mockData: IFrontPageData[] = [mockFrontpageDefaultResponse],
) => {
  return new DataLoader<string, IFrontPageData>(() => mockFn(mockData));
};

export const mockFilmFrontpageLoader = (
  mockData: IFilmFrontPageData[] = [mockFilmFrontPageDefaultResponse],
) => {
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

export const mockSubjectTopicsLoader = (mockData: GQLTopic[] = []) => {
  return new DataLoader<{ subjectId: string }, GQLTopic>(() =>
    mockFn(mockData),
  );
};

export const mockResourceTypesLoader = (
  mockData: GQLResourceTypeDefinition[] = [],
) => {
  return new DataLoader<string, GQLResourceTypeDefinition>(() =>
    mockFn(mockData),
  );
};

export const mockFrontpageDefaultResponse: IFrontPageData = {
  topical: [],
  categories: [],
};

export const mockFilmFrontPageDefaultResponse: IFilmFrontPageData = {
  name: '',
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
  subjectTopicsLoader: mockSubjectTopicsLoader(),
  resourceTypesLoader: mockResourceTypesLoader(),
};
