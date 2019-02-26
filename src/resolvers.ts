/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { search, groupSearch, fetchCompetenceGoals } from './data/api';

import {
  Query as TopicQuery,
  resolvers as topicResolvers,
} from './resolvers/topicResolvers';
import {
  Query as SubjectQuery,
  resolvers as subjectResolvers,
} from './resolvers/subjectResolvers';
import {
  Query as FrontpageQuery,
  resolvers as frontpageResolvers,
} from './resolvers/frontpageResolvers';
import {
  Query as ResourceQuery,
  resolvers as resourceResolvers,
} from './resolvers/resourceResolvers';

export const resolvers = {
  Query: {
    ...TopicQuery,
    ...SubjectQuery,
    ...FrontpageQuery,
    ...ResourceQuery,
    async search(
      _: any,
      searchQuery: QueryToSearchArgs,
      context: Context,
    ): Promise<GQLSearch> {
      return search(searchQuery, context);
    },
    async groupSearch(
      _: any,
      searchQuery: QueryToSearchArgs,
      context: Context,
    ): Promise<GQLSearch> {
      return groupSearch(searchQuery, context);
    },
    async competenceGoals(
      _: any,
      { nodeId }: { nodeId: string },
      context: Context,
    ): Promise<GQLCompetenceGoal[]> {
      return fetchCompetenceGoals(nodeId, context);
    },
  },
  ...subjectResolvers,
  ...topicResolvers,
  ...frontpageResolvers,
  ...resourceResolvers,
  CompetenceGoal: {
    async curriculum(
      competenceGoal: GQLCompetenceGoal,
      _: any,
      context: Context,
    ): Promise<GQLCompetenceCurriculum> {
      if (competenceGoal.curriculumId) {
        return context.loaders.curriculumLoader.load(
          competenceGoal.curriculumId,
        );
      }
      return null;
    },
  },
  TaxonomyEntity: {
    __resolveType(entity: any): GQLPossibleTaxonomyEntityTypeNames {
      if (entity.id.startsWith('urn:topic')) {
        return 'Topic';
      }

      return 'Resource';
    },
  },
};
