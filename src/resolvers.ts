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
  fetchSubjects,
  fetchFilters,
  fetchTopics,
  fetchTopicFilters,
  fetchTopicResources,
  fetchResourceTypes,
  fetchSubjectPage,
  fetchTopic,
  search,
  groupSearch,
  fetchCompetenceGoals,
} from './data/api';

interface Id {
  id: string;
}

interface IdWithFilter {
  id: string;
  filterIds?: string;
}

// Fetching resources for a topic can include resources from several
// different subjects (if the topic is reused in different subjects).
// If the subjectId arg is provided we fetch the subject filters and
// pass these when fetching resources to make sure only resources
// related to this subject is returned.
async function findApplicableFilters(
  args: {
    filterIds?: string;
    subjectId?: string;
  },
  context: Context,
): Promise<string> {
  if (args.filterIds) {
    return args.filterIds;
  }

  if (args.subjectId) {
    const allSubjectFilters = await context.loaders.filterLoader.load(
      args.subjectId,
    );
    return allSubjectFilters.map(filter => filter.id).join(',');
  }

  return '';
}

export const resolvers = {
  Query: {
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
    async subject(_: any, { id }: Id, context: Context): Promise<GQLSubject> {
      const list = await fetchSubjects(context);
      return list.find(subject => subject.id === id);
    },
    async subjects(_: any, __: any, context: Context): Promise<GQLSubject[]> {
      return fetchSubjects(context);
    },
    async topic(_: any, { id }: Id, context: Context): Promise<GQLTopic> {
      const list = await fetchTopics(context);
      return list.find(topic => topic.id === id);
    },
    async topics(_: any, __: any, context: Context): Promise<GQLTopic[]> {
      return fetchTopics(context);
    },
    async filters(
      _: any,
      __: any,
      context: Context,
    ): Promise<GQLSubjectFilter[]> {
      return fetchFilters(context);
    },
    async resourceTypes(
      _: any,
      __: any,
      context: Context,
    ): Promise<GQLResourceType[]> {
      return fetchResourceTypes(context);
    },
    async frontpage(
      _: any,
      __: any,
      context: Context,
    ): Promise<FrontpageResponse> {
      return context.loaders.frontpageLoader.load('frontpage');
    },

    async competenceGoals(
      _: any,
      { nodeId }: { nodeId: string },
      context: Context,
    ): Promise<GQLCompetenceGoal[]> {
      return fetchCompetenceGoals(nodeId, context);
    },
  },
  Frontpage: {
    async topical(
      frontpage: { topical: [string] },
      _: any,
      context: Context,
    ): Promise<GQLResource[]> {
      return Promise.all(
        frontpage.topical.map(id => {
          if (id.startsWith('urn:topic')) {
            return fetchTopic(id, context);
          }

          return fetchResource({ resourceId: id }, context);
        }),
      );
    },
  },
  Category: {
    async subjects(
      category: RCategory,
      _: any,
      context: Context,
    ): Promise<GQLSubject[]> {
      const data = await context.loaders.subjectsLoader.load('all');
      return data.subjects.filter(subject =>
        category.subjects.find(categorySubject => {
          return categorySubject.id === subject.id;
        }),
      );
    },
  },
  Topic: {
    async article(
      topic: GQLTopic,
      args: { filterIds?: string; subjectId?: string },
      context: Context,
    ): Promise<GQLArticle> {
      if (topic.contentUri && topic.contentUri.startsWith('urn:article')) {
        const filters = await findApplicableFilters(args, context);
        return fetchArticle(
          topic.contentUri.replace('urn:article:', ''),
          filters,
          context,
        );
      }
      throw Object.assign(
        new Error('Missing article contentUri for topic with id: ' + topic.id),
        { status: 404 },
      );
    },
    async filters(
      topic: GQLTopic,
      _: any,
      context: Context,
    ): Promise<GQLFilter[]> {
      return fetchTopicFilters(topic.id, context);
    },
    async meta(topic: GQLTopic, _: any, context: Context): Promise<GQLMeta> {
      if (topic.contentUri && topic.contentUri.startsWith('urn:article')) {
        return context.loaders.articlesLoader.load(
          topic.contentUri.replace('urn:article:', ''),
        );
      }
    },
    async coreResources(
      topic: GQLTopic,
      args: { filterIds?: string; subjectId?: string },
      context: Context,
    ): Promise<GQLResource[]> {
      const filters = await findApplicableFilters(args, context);

      return fetchTopicResources(
        {
          topicId: topic.id,
          relevance: 'urn:relevance:core',
          filters,
        },
        context,
      );
    },
    async supplementaryResources(
      topic: GQLTopic,
      args: { filterIds?: string; subjectId?: string },
      context: Context,
    ): Promise<GQLResource[]> {
      const filters = await findApplicableFilters(args, context);

      return fetchTopicResources(
        {
          topicId: topic.id,
          relevance: 'urn:relevance:supplementary',
          filters,
        },
        context,
      );
    },
    async subtopics(
      topic: GQLTopic,
      args: { filterIds: string },
      context: Context,
    ): Promise<GQLTopic[]> {
      const subjectId = 'urn:' + topic.path.split('/')[1];
      const topics = await context.loaders.subjectTopicsLoader.load({
        subjectId,
        filterIds: args.filterIds,
      });
      return topics.filter((t: GQLTopic) => t.parent === topic.id);
    },
  },
  SubjectPageArticles: {
    async resources(
      subjectPageArticles: [string],
      _: any,
      context: Context,
    ): Promise<GQLResource[]> {
      return Promise.all(
        subjectPageArticles.map(id => {
          if (id.startsWith('urn:topic')) {
            return fetchTopic(id, context);
          }
          return fetchResource({ resourceId: id }, context);
        }),
      );
    },
  },
  SubjectPageTopical: {
    async resource(id: string, _: any, context: Context): Promise<GQLResource> {
      if (id.startsWith('urn:topic')) {
        return fetchTopic(id, context);
      }
      return fetchResource({ resourceId: id }, context);
    },
  },
  SubjectPageGoTo: {
    async resourceTypes(
      resourceTypeIds: [string],
      _: any,
      context: Context,
    ): Promise<GQLResourceTypeDefinition[]> {
      return Promise.all(
        resourceTypeIds.map(id => context.loaders.resourceTypesLoader.load(id)),
      );
    },
  },
  Subject: {
    async topics(
      subject: GQLSubject,
      args: { all: boolean; filterIds: string },
      context: Context,
    ): Promise<GQLTopic[]> {
      const topics = await context.loaders.subjectTopicsLoader.load({
        subjectId: subject.id,
        filterIds: args.filterIds,
      });
      if (args.all) {
        return topics;
      }
      return topics.filter((topic: GQLTopic) => topic.parent === subject.id);
    },
    async filters(
      subject: GQLSubject,
      __: any,
      context: Context,
    ): Promise<GQLFilter[]> {
      return context.loaders.filterLoader.load(subject.id);
    },
    async frontpageFilters(
      subject: GQLSubject,
      __: any,
      context: Context,
    ): Promise<GQLFilter[]> {
      const frontpage = await context.loaders.frontpageLoader.load('frontpage');

      const allCategorySubjects = frontpage.categories.reduce(
        (acc, category) => [...acc, ...category.subjects],
        [],
      ) as RSubjectCategory[];

      const categorySubject = allCategorySubjects.find(
        cs => cs.id === subject.id,
      );

      const frontpageFilterIds = categorySubject ? categorySubject.filters : [];

      const allSubjectFilters = await context.loaders.filterLoader.load(
        subject.id,
      );

      // Only return filters specified in frontpage
      return allSubjectFilters.filter(filter =>
        frontpageFilterIds.includes(filter.id),
      );
    },
    async subjectpage(
      subject: GQLSubject,
      __: any,
      context: Context,
    ): Promise<GQLSubjectPage> {
      if (
        subject.contentUri &&
        subject.contentUri.startsWith('urn:frontpage')
      ) {
        return fetchSubjectPage(
          subject.contentUri.replace('urn:frontpage:', ''),
          context,
        );
      }
      throw Object.assign(
        new Error(
          'Missing subjectpage contentUri for subject with id: ' + subject.id,
        ),
        { status: 404 },
      );
    },
  },
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
};
