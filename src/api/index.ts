/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export { fetchArticle, fetchArticles } from "./articleApi";
export { searchConcepts, fetchConcept, fetchListingPage } from "./conceptApi";
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
export { fetchImage, fetchImageV3 } from "./imageApi";
export { fetchFrontpage, fetchSubjectPage, fetchFilmFrontpage, fetchMovieMeta } from "./frontpageApi";
export { fetchLearningpaths, fetchLearningpath } from "./learningpathApi";
export { fetchOembed } from "./oembedApi";
export { search, groupSearch, searchWithoutPagination } from "./searchApi";
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
export { fetchUptimeIssues } from "./uptimeApi";
