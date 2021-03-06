/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export {
  fetchCompetenceGoals,
  fetchCompetenceSet,
  fetchCoreElement,
  fetchCoreElements,
  fetchCoreElementReferences,
  fetchCrossSubjectTopicsByCode,
  fetchCrossSubjectTopics,
  fetchLK06Curriculum,
  fetchLK20Curriculum,
} from './curriculumApi';
export {
  fetchFrontpage,
  fetchSubjectPage,
  fetchFilmFrontpage,
} from './frontpageApi';
export { fetchArticle, fetchArticles, fetchMovieMeta } from './articleApi';
export {
  fetchLearningpaths,
  fetchLearningpath,
  fetchLearningpathStep,
} from './learningpathApi';
export {
  fetchFilters,
  fetchResource,
  fetchResourceTypes,
  fetchSubjectTopics,
  fetchSubjects,
  fetchSubject,
  fetchTopic,
  fetchTopicFilters,
  fetchTopicResources,
  fetchTopics,
  fetchResourcesAndTopics,
  fetchSubtopics,
  queryTopicsOnContentURI,
  queryResourcesOnContentURI,
} from './taxonomyApi';
export {
  search,
  groupSearch,
  frontpageSearch,
  searchWithoutPagination,
} from './searchApi';
export { fetchOembed } from './oembedApi';
export {
  searchConcepts,
  fetchConcepts,
  fetchDetailedConcept,
  fetchListingPage,
} from './conceptApi';
