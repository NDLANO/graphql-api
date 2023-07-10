/**
 * Copyright (c) 2023-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { ISubjectPageData } from '@ndla/types-backend/frontpage-api';
import { Node } from '@ndla/types-taxonomy';
import { fetchSubjectPage } from '../api';

import { queryNodes } from '../api/taxonomyApi';
import { GQLProgramme } from '../types/schema';
import { nodeToTaxonomyEntity } from '../utils/apiHelpers';

export const Query = {
  async programmes(
    _: any,
    __: any,
    context: ContextWithLoaders,
  ): Promise<GQLProgramme[]> {
    const nodes = await queryNodes(
      {
        nodeType: 'PROGRAMME',
        isRoot: true,
        language: context.language,
        includeContexts: true,
        isVisible: true,
      },
      context,
    );
    return nodes.map(node => nodeToTaxonomyEntity(node, context));
  },
};

export const resolvers = {
  Programme: {
    async subjectpage(
      node: Node,
      __: any,
      context: ContextWithLoaders,
    ): Promise<ISubjectPageData | undefined> {
      if (node.contentUri?.startsWith('urn:frontpage')) {
        return fetchSubjectPage(
          Number(node.contentUri.replace('urn:frontpage:', '')),
          context,
        );
      }
    },
  },
};
