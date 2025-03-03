/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Query as ArticleQuery, resolvers as articleResolvers } from "./articleResolvers";
import { Query as ConceptQuery, resolvers as conceptResolvers } from "./conceptResolvers";
import { Query as CurriculumQuery, resolvers as curriculumResolvers } from "./curriculumResolvers";
import { Query as ExternalQuery } from "./externalResolvers";
import {
  Query as FolderResolvers,
  Mutations as FolderMutations,
  resolvers as folderResolvers,
} from "./folderResolvers";
import { Query as FrontpageQuery, resolvers as frontpageResolvers } from "./frontpageResolvers";
import { Query as ImageQuery, resolvers as ImageResolvers } from "./imageResolvers";
import {
  Query as LearningpathQuery,
  resolvers as learningpathResolvers,
  Mutations as LearningpathMutations,
} from "./learningpathResolvers";
import { Query as MyNDLAQuery, resolvers as MyNDLAResolvers } from "./myndlaResolvers";
import { Query as PodcastQuery, resolvers as podcastResolvers } from "./podcastResolvers";
import { Query as ProgrammeQuery, resolvers as ProgrammeResolvers } from "./programmeResolvers";
import { Query as ResourceQuery, resolvers as resourceResolvers } from "./resourceResolvers";
import { Query as SearchQuery, resolvers as searchResolvers } from "./searchResolvers";
import { Query as SubjectQuery, resolvers as subjectResolvers } from "./subjectResolvers";
import { Query as TaxonomyQuery, resolvers as taxonomyResolvers } from "./taxonomyResolvers";
import { Query as TopicQuery, resolvers as topicResolvers } from "./topicResolvers";
import { Query as TransformQuery, Mutations as TransformArticleMutations } from "./transformResolvers";
import { Query as UptimeQuery, resolvers as uptimeResolvers } from "./uptimeResolvers";

export const resolvers = {
  Query: {
    ...TopicQuery,
    ...SubjectQuery,
    ...FrontpageQuery,
    ...ResourceQuery,
    ...TaxonomyQuery,
    ...ArticleQuery,
    ...SearchQuery,
    ...CurriculumQuery,
    ...LearningpathQuery,
    ...MyNDLAQuery,
    ...PodcastQuery,
    ...ConceptQuery,
    ...UptimeQuery,
    ...FolderResolvers,
    ...ImageQuery,
    ...TransformQuery,
    ...ProgrammeQuery,
    ...ExternalQuery,
  },
  Mutation: {
    ...FolderMutations,
    ...TransformArticleMutations,
    ...LearningpathMutations,
  },
  ...folderResolvers,
  ...articleResolvers,
  ...subjectResolvers,
  ...topicResolvers,
  ...frontpageResolvers,
  ...resourceResolvers,
  ...taxonomyResolvers,
  ...searchResolvers,
  ...learningpathResolvers,
  ...MyNDLAResolvers,
  ...curriculumResolvers,
  ...podcastResolvers,
  ...conceptResolvers,
  ...uptimeResolvers,
  ...ImageResolvers,
  ...ProgrammeResolvers,
  TaxonomyEntity: {
    // Resolves TaxonomyEntity interface
    __resolveType(entity: any) {
      if (entity.id.startsWith("urn:subject")) {
        return "Subject";
      }
      if (entity.id.startsWith("urn:topic")) {
        return "Topic";
      }
      if (entity.id.startsWith("urn:programme")) {
        return "Programme";
      }

      return "Resource";
    },
  },
  SearchResult: {
    // Resolves SearchResult interface
    __resolveType(searchResult: any) {
      if (searchResult.learningResourceType === "learningpath") {
        return "LearningpathSearchResult";
      }
      return "ArticleSearchResult";
    },
  },
  FolderResourceMeta: {
    // Resolves FolderResourceMeta interface
    __resolveType(folderResourceMeta: any) {
      if (folderResourceMeta.type === "learningpath") {
        return "LearningpathFolderResourceMeta";
      }
      return "ArticleFolderResourceMeta";
    },
  },
};
