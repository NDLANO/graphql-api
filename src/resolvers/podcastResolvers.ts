/**
 * Copyright (c) 2021-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { fetchPodcast } from '../api/podcastApi';

export const Query = {
  async podcast(
    _: any,
    { id }: QueryToPodcastArgs,
    context: Context,
  ): Promise<GQLAudio> {
    return fetchPodcast(id, context);
  },
};

export const resolvers = {};
