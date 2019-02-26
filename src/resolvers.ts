/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  fetchArticle,
  fetchResource,
  fetchResourceTypes,
  search,
  groupSearch,
  fetchCompetenceGoals,
} from './data/api';

import {
  Query as TopicQuery,
  resolvers as topicResolvers,
} from './resolvers/Topic';
import {
  Query as SubjectQuery,
  resolvers as subjectResolvers,
} from './resolvers/Subject';
import {
  Query as FrontpageQuery,
  resolvers as frontpageResolvers,
} from './resolvers/Frontpage';
import { findApplicableFilters } from './resolvers/findApplicableFilters';

interface Id {
  id: string;
}

interface IdWithFilter {
  id: string;
  filterIds?: string;
}

export const resolvers = {
  Query: {
    ...TopicQuery,
    ...SubjectQuery,
    ...FrontpageQuery,
    async resource(_: any, { id }: Id, context: Context): Promise<GQLResource> {
      return fetchResource({ resourceId: id }, context);
    },
    async article(
      _: any,
      { id, filterIds }: IdWithFilter,
      context: Context,
    ): Promise<GQLArticle> {
      return fetchArticle(id, filterIds, context);
    },
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
    async resourceTypes(
      _: any,
      __: any,
      context: Context,
    ): Promise<GQLResourceType[]> {
      return fetchResourceTypes(context);
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
  ResourceTypeDefinition: {
    async subtypes(
      resourceType: GQLResourceTypeDefinition,
    ): Promise<GQLResourceTypeDefinition[]> {
      return resourceType.subtypes;
    },
  },
  Resource: {
    async meta(
      resource: GQLResource,
      _: any,
      context: Context,
    ): Promise<GQLMeta> {
      if (
        resource.contentUri &&
        resource.contentUri.startsWith('urn:learningpath')
      ) {
        return context.loaders.learningpathsLoader.load(
          resource.contentUri.replace('urn:learningpath:', ''),
        );
      } else if (
        resource.contentUri &&
        resource.contentUri.startsWith('urn:article')
      ) {
        return context.loaders.articlesLoader.load(
          resource.contentUri.replace('urn:article:', ''),
        );
      }
      throw Object.assign(
        new Error('Missing contentUri for resource with id: ' + resource.id),
        { status: 404 },
      );
    },
    async article(
      resource: GQLResource,
      args: { filterIds?: string; subjectId?: string },
      context: Context,
    ): Promise<GQLArticle> {
      if (
        resource.contentUri &&
        resource.contentUri.startsWith('urn:article')
      ) {
        const filters = await findApplicableFilters(args, context);
        return fetchArticle(
          resource.contentUri.replace('urn:article:', ''),
          filters,
          context,
        );
      }
      throw Object.assign(
        new Error(
          'Missing article contentUri for resource with id: ' + resource.id,
        ),
        { status: 404 },
      );
    },
  },
  Article: {
    async competenceGoals(
      article: GQLArticle,
      _: any,
      context: Context,
    ): Promise<GQLCompetenceGoal[]> {
      if (article.oldNdlaUrl) {
        const nodeId = article.oldNdlaUrl.split('/').pop();
        return fetchCompetenceGoals(nodeId, context);
      }
      return null;
    },
  },
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
    __resolveType(
      entity: any,
      context: Context,
      _: any,
    ): GQLPossibleTaxonomyEntityTypeNames {
      if (entity.id.startsWith('urn:topic')) {
        return 'Topic';
      }

      return 'Resource';
    },
  },
};
