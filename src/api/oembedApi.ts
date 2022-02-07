/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { fetch, resolveJson } from '../utils/apiHelpers';

export async function fetchOembed(
  url: string,
  context: Context,
): Promise<GQLLearningpathStepOembed> {
  return await fetch(`/oembed-proxy/v1/oembed?url=${url}`, context)
    .then(r => resolveJson(r))
    .catch(e => null);
}
