/**
 * Copyright (c) 2022-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { fetchUptimeIssues } from '../api';
import { fetchVersion } from '../api/taxonomyApi';

const localizedVersionHashTitle = (name: string, language: string) => {
  switch (language) {
    case 'nb':
      return `Du ser på en forhåndsvisning av versjonen ${name}`;
    case 'nn':
      return `Du ser på ein forhåndsvisning av versjonen ${name}`;
    default:
      return `You are viewing a preview of the version ${name}`;
  }
};

export const Query = {
  async alerts(
    _: any,
    __: any,
    context: ContextWithLoaders,
  ): Promise<GQLUptimeAlert[]> {
    if (context.versionHash && context.versionHash !== 'default') {
      const [versionType, uptimeIssues] = await Promise.all([
        fetchVersion(context.versionHash, context),
        fetchUptimeIssues(context),
      ]);

      if (versionType) {
        const versionTypeAlert: GQLUptimeAlert = {
          number: -1,
          closable: false,
          title: localizedVersionHashTitle(versionType.name, context.language),
        };
        return uptimeIssues.concat(versionTypeAlert);
      }
    } else return await fetchUptimeIssues(context);
  },
};

export const resolvers = {};
