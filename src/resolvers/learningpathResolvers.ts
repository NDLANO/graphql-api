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
  fetchOembed,
} from '../api';
import { isNDLAEmbedUrl } from '../utils/articleHelpers';

export const Query = {
  async learningpath(
    _: any,
    { pathId }: QueryToLearningpathArgs,
    context: Context,
  ): Promise<GQLLearningpath> {
    return fetchLearningpath(pathId, context);
  },
  async learningpathStep(
    _: any,
    { pathId, stepId }: QueryToLearningpathStepArgs,
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
    async oembed(
      learningpathStep: GQLLearningpathStep,
      _: any,
      context: Context,
    ): Promise<GQLLearningpathStepOembed> {
      if (!learningpathStep.embedUrl || !learningpathStep.embedUrl.url) {
        return null;
      }
      if (
        learningpathStep.embedUrl.embedType === 'oembed' &&
        learningpathStep.embedUrl.url !== 'https://ndla.no'
      ) {
        return fetchOembed(learningpathStep.embedUrl.url, context);
      }
      return null;
    },
    async resource(
      learningpathStep: GQLLearningpathStep,
      _: any,
      context: Context,
    ): Promise<GQLResource> {
      if (
        !learningpathStep.embedUrl ||
        !learningpathStep.embedUrl.url ||
        learningpathStep.embedUrl.embedType !== 'oembed' ||
        !isNDLAEmbedUrl(learningpathStep.embedUrl.url)
      ) {
        return null;
      }

      const lastPartOfUrl = learningpathStep.embedUrl.url.split('/').pop();
      if (lastPartOfUrl.includes('resource')) {
        return fetchResource({ resourceId: `urn:${lastPartOfUrl}` }, context);
      }
      return null;
    },
  },
};
