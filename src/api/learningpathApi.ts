/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

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
        introduction: learningpath.introduction
          ? learningpath.introduction.introduction
          : undefined,
        metaDescription: learningpath.description
          ? learningpath.description.description
          : undefined,
        lastUpdated: learningpath.lastUpdated,
        metaImage: {
          url: learningpath.coverPhotoUrl,
          alt: learningpath.introduction
            ? learningpath.introduction.introduction
            : '',
        },
      };
    }
    return null;
  });
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
  return {
    ...learningpath,
    title: learningpath.title.title,
    description: learningpath.description
      ? learningpath.description.description
      : undefined,
    lastUpdated: learningpath.lastUpdated,
    coverphoto: {
      url: learningpath.coverPhotoUrl,
      alt: learningpath.introduction
        ? learningpath.introduction.introduction
        : '',
    },
    tags: learningpath.tags ? learningpath.tags.tags : [],
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
    title: learningpathStep.title ? learningpathStep.title.title : '',
    description: learningpathStep.description
      ? learningpathStep.description.description
      : undefined,
  };
}
