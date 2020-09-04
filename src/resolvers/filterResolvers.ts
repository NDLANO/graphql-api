/**
 * Copyright (c) 2020-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { fetchSubjectPage } from '../api';

export const resolvers = {
  SubjectFilter: {
    async subjectpage(
      filter: GQLSubjectFilter,
      __: any,
      context: Context,
    ): Promise<GQLSubjectPage> {
      if (filter.contentUri?.startsWith('urn:frontpage')) {
        return fetchSubjectPage(
          filter.contentUri.replace('urn:frontpage:', ''),
          context,
        );
      }
    },
  },
};
