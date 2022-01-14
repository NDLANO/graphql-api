/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { GraphQLJSON } from 'graphql-scalars';
import {
  Query as TopicQuery,
  resolvers as topicResolvers,
} from './topicResolvers';
import {
  Query as SubjectQuery,
  resolvers as subjectResolvers,
} from './subjectResolvers';
import {
  Query as FrontpageQuery,
  resolvers as frontpageResolvers,
} from './frontpageResolvers';
import {
  Query as ResourceQuery,
  resolvers as resourceResolvers,
} from './resourceResolvers';
import {
  Query as ArticleQuery,
  resolvers as articleResolvers,
} from './articleResolvers';
import {
  Query as SearchQuery,
  resolvers as searchResolvers,
} from './searchResolvers';
import {
  Query as CurriculumQuery,
  resolvers as curriculumResolvers,
} from './curriculumResolvers';
import {
  Query as LearningpathQuery,
  resolvers as learningpathResolvers,
} from './learningpathResolvers';
import {
  Query as PodcastQuery,
  resolvers as podcastResolvers,
} from './podcastResolvers';
import {
  Query as ConceptQuery,
  resolvers as conceptResolvers,
} from './conceptResolvers';

export const resolvers: GQLResolver = {
  Query: {
    ...TopicQuery,
    ...SubjectQuery,
    ...FrontpageQuery,
    ...ResourceQuery,
    ...ArticleQuery,
    ...SearchQuery,
    ...CurriculumQuery,
    ...LearningpathQuery,
    ...PodcastQuery,
    ...ConceptQuery,
  },
  ...articleResolvers,
  ...subjectResolvers,
  ...topicResolvers,
  ...frontpageResolvers,
  ...resourceResolvers,
  ...searchResolvers,
  ...learningpathResolvers,
  ...curriculumResolvers,
  ...podcastResolvers,
  ...conceptResolvers,
  JSON: GraphQLJSON,
  TaxonomyEntity: {
    // Resolves TaxonomyEntity interface
    __resolveType(entity: any): GQLPossibleTaxonomyEntityTypeNames {
      if (entity.id.startsWith('urn:subject')) {
        return 'Subject';
      }
      if (entity.id.startsWith('urn:topic')) {
        return 'Topic';
      }

      return 'Resource';
    },
  },
  SearchResult: {
    // Resolves SearchResult interface
    __resolveType(searchResult: any): GQLPossibleSearchResultTypeNames {
      if (searchResult.learningResourceType === 'learningpath') {
        return 'LearningpathSearchResult';
      }
      return 'ArticleSearchResult';
    },
  },
};
