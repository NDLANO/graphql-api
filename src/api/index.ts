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
  fetchLK20Curriculum,
  fetchLK20CompetenceGoalSet,
} from "./curriculumApi";
export { fetchFrontpage, fetchSubjectPage, fetchFilmFrontpage, fetchMovieMeta } from "./frontpageApi";
export { fetchArticle, fetchArticles } from "./articleApi";
export { fetchLearningpaths, fetchLearningpath } from "./learningpathApi";
export {
  fetchResourceTypes,
  fetchSubjectTopics,
  fetchSubjects,
  fetchSubject,
  fetchNode,
  fetchNodeResources,
  fetchTopics,
  fetchChildren,
  queryContexts,
  queryNodes,
} from "./taxonomyApi";
export { search, groupSearch, frontpageSearch, searchWithoutPagination } from "./searchApi";
export { fetchOembed } from "./oembedApi";
export { searchConcepts, fetchConcept, fetchListingPage } from "./conceptApi";
export { fetchUptimeIssues } from "./uptimeApi";
