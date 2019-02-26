/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

// Fetching resources for a topic can include resources from several
// different subjects (if the topic is reused in different subjects).
// If the subjectId arg is provided we fetch the subject filters and
// pass these when fetching resources to make sure only resources
// related to this subject is returned.
export async function findApplicableFilters(
  args: {
    filterIds?: string;
    subjectId?: string;
  },
  context: Context,
): Promise<string> {
  if (args.filterIds) {
    return args.filterIds;
  }

  if (args.subjectId) {
    const allSubjectFilters = await context.loaders.filterLoader.load(
      args.subjectId,
    );
    return allSubjectFilters.map(filter => filter.id).join(',');
  }

  return '';
}
