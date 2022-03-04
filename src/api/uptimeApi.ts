/**
 * Copyright (c) 2022-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Octokit } from '@octokit/rest';
import { uptimeOwner, uptimeRepo } from '../config';

export async function fetchUptimeIssues(): Promise<GQLUptimeAlert[]> {
  const octokit = new Octokit();
  const { data } = await octokit.rest.issues.listForRepo({
    owner: uptimeOwner,
    repo: uptimeRepo,
    state: 'all',
    labels: 'maintenance',
  });
  return data;
}
