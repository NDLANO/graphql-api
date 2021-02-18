/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { reject } from 'lodash';
import { fetch, resolveJson } from '../utils/apiHelpers';

export async function fetchLearningpaths(
  learningpathIds: string[],
  context: Context,
): Promise<GQLMeta[]> {
  const response = await fetch(
    `/learningpath-api/v2/learningpaths/?language=${
      context.language
    }&fallback=true&ids=${learningpathIds.join(',')}`,
    context,
  );
  const json = await resolveJson(response);

  // The api does not always return the exact number of results as ids provided.
  // So always map over ids so that dataLoader gets the right amount of results in correct order.
  return learningpathIds.map(id => {
    const learningpath = json.results.find((item: { id: number }) => {
      return item.id.toString() === id;
    });

    if (learningpath) {
      return {
        id: learningpath.id,
        title: learningpath.title.title,
        introduction: learningpath.introduction?.introduction,
        metaDescription: learningpath.description?.description,
        lastUpdated: learningpath.lastUpdated,
        metaImage: {
          url: learningpath.coverPhoto.url,
          alt: learningpath.introduction?.introduction,
        },
      };
    }
    return null;
  });
}

interface ApiLearningStep
  extends Omit<GQLLearningpathStep, 'title' | 'description'> {
  title: {
    title: string;
    language: string;
  };
  description: {
    description: string;
    language: string;
  };
}

export async function fetchLearningpath(
  id: string,
  context: Context,
): Promise<GQLLearningpath> {
  const response = await fetch(
    `/learningpath-api/v2/learningpaths/${id}?language=${context.language}&fallback=true`,
    context,
  );
  const learningpath = await resolveJson(response);
  const learningsteps = learningpath.learningsteps?.map(
    (step: ApiLearningStep) => ({
      ...step,
      title: step.title?.title || '',
      description: step.description?.description,
    }),
  );

  return {
    ...learningpath,
    title: learningpath.title.title,
    description: learningpath.description?.description,
    lastUpdated: learningpath.lastUpdated,
    coverphoto: {
      url: learningpath.coverPhoto.url,
      alt: learningpath.introduction?.introduction || '',
    },
    tags: learningpath.tags?.tags || [],
    learningsteps,
  };
}

export async function fetchLearningpathStep(
  pathId: string,
  stepId: string,
  context: Context,
): Promise<GQLLearningpathStep> {
  const response = await fetch(
    `/learningpath-api/v2/learningpaths/${pathId}/learningsteps/${stepId}?language=${context.language}&fallback=true`,
    context,
  );
  const learningpathStep = await resolveJson(response);
  return {
    ...learningpathStep,
    title: learningpathStep.title?.title || '',
    description: learningpathStep.description?.description,
  };
}
