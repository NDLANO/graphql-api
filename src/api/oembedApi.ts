/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  GQLH5pElement,
  GQLLearningpathStepOembed,
  GQLVisualElementOembed,
} from '../types/schema';
import { fetch, resolveJson } from '../utils/apiHelpers';

export async function fetchOembed<
  T extends GQLLearningpathStepOembed | GQLH5pElement | GQLVisualElementOembed
>(url: string, context: Context): Promise<T> {
  return await fetch(`/oembed-proxy/v1/oembed?url=${url}`, context)
    .then(r => resolveJson(r))
    .catch(e => {
      if (e.status === 404) {
        return null;
      } else throw e;
    });
}
