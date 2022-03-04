/**
 * Copyright (c) 2022-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { fetchUptimeIssues } from '../api';

export const Query = {
  async alerts(
    _: any,
    __: any,
    context: ContextWithLoaders,
  ): Promise<GQLUptimeAlert[]> {
    return fetchUptimeIssues(context);
  },
};

export const resolvers = {};
