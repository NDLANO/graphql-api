/**
 * Copyright (c) 2023-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { GQLBrightcoveElement, GQLQueryBrightcoveVideoArgs } from 'schema';
import { fetchBrightcoveVideo } from '../api/videoApi';

export const Query = {
  async brightcoveVideo(
    _: any,
    { id }: GQLQueryBrightcoveVideoArgs,
    context: Context,
  ): Promise<GQLBrightcoveElement | null> {
    return fetchBrightcoveVideo(id, context);
  },
};
