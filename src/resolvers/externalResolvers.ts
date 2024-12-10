/**
 * Copyright (c) 2024-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { fetchOembedUrl } from "../api/externalApi";
import { GQLQueryLearningpathStepOembedArgs } from "../types/schema";

export const Query = {
  async learningpathStepOembed(_: any, { url }: GQLQueryLearningpathStepOembedArgs, context: ContextWithLoaders) {
    return await fetchOembedUrl(url, context);
  },
};