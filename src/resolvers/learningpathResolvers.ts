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
};

const buildOembedFromIframeUrl = (url: string): GQLLearningpathStepOembed => {
  return {
    type: 'rich',
    version: '1.0',
    height: 800,
    width: 800,
    html: `<iframe src="${url}" frameborder="0" allowFullscreen="" />`,
  };
};

export const resolvers = {
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
        learningpathStep.embedUrl &&
        learningpathStep.embedUrl.embedType === 'iframe'
      ) {
        return buildOembedFromIframeUrl(learningpathStep.embedUrl.url);
      }
      if (
        learningpathStep.embedUrl &&
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
        (learningpathStep.embedUrl.embedType !== 'oembed' &&
          learningpathStep.embedUrl.embedType !== 'iframe') ||
        !isNDLAEmbedUrl(learningpathStep.embedUrl.url)
      ) {
        return null;
      }

      const lastResourceMatch = learningpathStep.embedUrl.url
        .match(/resource(:\d+)?(:\d+)/g)
        ?.pop();

      if (lastResourceMatch !== undefined) {
        return fetchResource({ id: `urn:${lastResourceMatch}` }, context);
      }
      return null;
    },
  },
};
