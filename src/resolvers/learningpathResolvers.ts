/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  fetchLearningpath,
  fetchLearningpathStep,
  fetchResource,
  fetchArticle,
} from '../api';

interface LearningpathArgument {
  pathId: string;
}

interface LearningpathStepArgument {
  pathId: string;
  stepId: string;
}

export const Query = {
  async learningpath(
    _: any,
    { pathId }: LearningpathArgument,
    context: Context,
  ): Promise<GQLLearningpath> {
    return fetchLearningpath(pathId, context);
  },
  async learningpathStep(
    _: any,
    { pathId, stepId }: LearningpathStepArgument,
    context: Context,
  ): Promise<GQLLearningpath> {
    return fetchLearningpathStep(pathId, stepId, context);
  },
};

export const resolvers = {
  Learningpath: {
    async learningsteps(
      learningpath: GQLLearningpath,
      _: any,
      context: Context,
    ): Promise<GQLLearningpathStep[]> {
      return Promise.all(
        learningpath.learningsteps.map(step =>
          fetchLearningpathStep(
            learningpath.id.toString(),
            step.id.toString(),
            context,
          ),
        ),
      );
    },
  },
  LearningpathStep: {
    async article(
      learningpathStep: GQLLearningpathStep,
      _: any,
      context: Context,
    ): Promise<GQLArticle> {
      if (!learningpathStep.embedUrl || !learningpathStep.embedUrl.url) {
        return null;
      }

      const lastPartOfUrl = learningpathStep.embedUrl.url.split('/').pop();
      if (lastPartOfUrl.includes('resource')) {
        const resource = await fetchResource(
          { resourceId: `urn:${lastPartOfUrl}` },
          context,
        );
        if (!resource.contentUri) {
          return null;
        }
        return fetchArticle(
          { articleId: resource.contentUri.replace('urn:article:', '') },
          context,
        );
      }

      if (isNaN(parseInt(lastPartOfUrl, 10))) {
        return fetchArticle({ articleId: lastPartOfUrl }, context);
      }
      return null;
    },
  },
};
