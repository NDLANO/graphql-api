/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export { fetchCompetenceGoals, fetchCurriculum } from './curriculumApi';
export { fetchFrontpage, fetchSubjectPage } from './frontpageApi';
export { fetchArticle, fetchArticles } from './articleApi';
export { fetchLearningpaths } from './learningpathApi';
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
} from './taxonomyApi';
export { search, groupSearch } from './searchApi';
