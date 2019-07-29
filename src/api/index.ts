/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export { fetchCompetenceGoals, fetchCurriculum } from './curriculumApi';
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
  fetchTopic,
  fetchTopicFilters,
  fetchTopicResources,
  fetchTopics,
  fetchResourcesAndTopics,
  fetchSubtopics,
  fetchMoviePath,
  fetchMovieResourceTypes,
} from './taxonomyApi';
export { search, groupSearch } from './searchApi';
