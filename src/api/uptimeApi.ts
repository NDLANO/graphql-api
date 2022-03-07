/**
 * Copyright (c) 2022-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import he from 'he';
import { fetch, resolveJson } from '../utils/apiHelpers';
import { uptimeOwner, uptimeRepo } from '../config';

const baseUrl = 'https://api.github.com';

export async function fetchUptimeIssues(
  context: ContextWithLoaders,
): Promise<GQLUptimeAlert[]> {
  const path = `${baseUrl}/repos/${uptimeOwner}/${uptimeRepo}/issues?state=open&labels=maintenance`;
  const response = await fetch(path, context, { timeout: 3000 });
  const issues: GQLUptimeAlert[] = await resolveJson(response);

  return issues.map(issue => {
    return {
      title: issue.title,
      body: he.decode(issue.body).replace(/<[^>]*>?/gm, ''),
    };
  });
}
