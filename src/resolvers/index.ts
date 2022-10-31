// @ts-strict-ignore
/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

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
import {
  Query as UptimeQuery,
  resolvers as uptimeResolvers,
} from './uptimeResolvers';
import {
  Query as FolderResolvers,
  Mutations as FolderMutations,
} from './folderResolvers';

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
    ...UptimeQuery,
    ...FolderResolvers,
  },
  Mutation: {
    ...FolderMutations,
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
  ...uptimeResolvers,
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
  FolderResourceMeta: {
    // Resolves FolderResourceMeta interface
    __resolveType(
      folderResourceMeta: any,
    ): GQLPossibleFolderResourceMetaTypeNames {
      if (folderResourceMeta.type === 'learningpath') {
        return 'LearningpathFolderResourceMeta';
      }
      return 'ArticleFolderResourceMeta';
    },
  },
};
