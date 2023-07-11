/**
 * Copyright (c) 2023-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { queryNodes } from '../api/taxonomyApi';
import { GQLMetaImage, GQLProgrammePage } from '../types/schema';

export const Query = {
  async programmes(
    _: any,
    __: any,
    context: ContextWithLoaders,
  ): Promise<GQLProgrammePage[]> {
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
    return nodes.map(node => {
      return {
        id: node.id,
        title: {
          title: node.name,
          language: context.language,
        },
        url: node.url || node.path,
        contentUri: node.contentUri,
      };
    });
  },
};

export const resolvers = {
  ProgrammePage: {
    async metaDescription(
      programme: GQLProgrammePage,
      __: any,
      context: ContextWithLoaders,
    ): Promise<String | undefined> {
      if (programme.contentUri?.startsWith('urn:frontpage')) {
        const subjectpage = await context.loaders.subjectpageLoader.load(
          programme.contentUri.replace('urn:frontpage:', ''),
        );
        return subjectpage?.metaDescription;
      }
    },
    async desktopImage(
      programme: GQLProgrammePage,
      __: any,
      context: ContextWithLoaders,
    ): Promise<GQLMetaImage | undefined> {
      if (programme.contentUri?.startsWith('urn:frontpage')) {
        if (programme.contentUri?.startsWith('urn:frontpage')) {
          const subjectpage = await context.loaders.subjectpageLoader.load(
            programme.contentUri.replace('urn:frontpage:', ''),
          );
          if (subjectpage) {
            return {
              url: subjectpage.banner.desktopUrl,
              alt: '',
            };
          }
        }
      }
    },
    async mobileImage(
      programme: GQLProgrammePage,
      __: any,
      context: ContextWithLoaders,
    ): Promise<GQLMetaImage | undefined> {
      if (programme.contentUri?.startsWith('urn:frontpage')) {
        if (programme.contentUri?.startsWith('urn:frontpage')) {
          const subjectpage = await context.loaders.subjectpageLoader.load(
            programme.contentUri.replace('urn:frontpage:', ''),
          );
          if (subjectpage) {
            return {
              url:
                subjectpage.banner.mobileUrl || subjectpage.banner.desktopUrl,
              alt: '',
            };
          }
        }
      }
    },
  },
};
