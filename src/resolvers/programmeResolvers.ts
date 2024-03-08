/**
 * Copyright (c) 2023-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Node } from "@ndla/types-taxonomy";
import { fetchChildren, queryNodes } from "../api/taxonomyApi";
import { GQLCategory, GQLGrade, GQLProgrammePage, GQLQueryProgrammeArgs, GQLSubject } from "../types/schema";
import { nodeToTaxonomyEntity } from "../utils/apiHelpers";

const nodeToProgramme = (node: Node, language: string): GQLProgrammePage => {
  return {
    id: node.id,
    title: {
      title: node.name,
      language: language,
    },
    url: node.url || node.path,
    contentUri: node.contentUri,
  };
};

export const Query = {
  async programmes(_: any, __: any, context: ContextWithLoaders): Promise<GQLProgrammePage[]> {
    const nodes = await queryNodes(
      {
        nodeType: "PROGRAMME",
        isRoot: true,
        language: context.language,
        includeContexts: false,
        isVisible: true,
      },
      context,
    );
    return nodes.sort((a, b) => a.name.localeCompare(b.name)).map((node) => nodeToProgramme(node, context.language));
  },
  async programme(_: any, { path }: GQLQueryProgrammeArgs, context: ContextWithLoaders): Promise<GQLProgrammePage> {
    if (!path || !path.includes("__")) {
      throw Error("Tried to fetch programme with invalid path");
    }
    const contextId = path.split("__")[1];
    const node = await queryNodes({ contextId, language: context.language }, context);
    return nodeToProgramme(node[0], context.language);
  },
};

export const resolvers = {
  ProgrammePage: {
    async metaDescription(
      programme: GQLProgrammePage,
      __: any,
      context: ContextWithLoaders,
    ): Promise<String | undefined> {
      if (programme.contentUri?.startsWith("urn:frontpage")) {
        const subjectpage = await context.loaders.subjectpageLoader.load(
          programme.contentUri.replace("urn:frontpage:", ""),
        );
        return subjectpage?.metaDescription;
      }
    },
    async desktopImage(programme: GQLProgrammePage, __: any, context: ContextWithLoaders): Promise<string | undefined> {
      if (programme.contentUri?.startsWith("urn:frontpage")) {
        const subjectpage = await context.loaders.subjectpageLoader.load(
          programme.contentUri.replace("urn:frontpage:", ""),
        );
        if (subjectpage) {
          return subjectpage.banner.desktopUrl;
        }
      }
    },
    async mobileImage(programme: GQLProgrammePage, __: any, context: ContextWithLoaders): Promise<string | undefined> {
      if (programme.contentUri?.startsWith("urn:frontpage")) {
        const subjectpage = await context.loaders.subjectpageLoader.load(
          programme.contentUri.replace("urn:frontpage:", ""),
        );
        if (subjectpage) {
          return subjectpage.banner.mobileUrl || subjectpage.banner.desktopUrl;
        }
      }
    },
    async grades(programme: GQLProgrammePage, __: any, context: ContextWithLoaders): Promise<GQLGrade[]> {
      const children = await fetchChildren({ id: programme.id, nodeType: "PROGRAMME" }, context);
      return children.map((child) => {
        return {
          id: child.id,
          title: {
            title: child.name,
            language: context.language,
          },
          url: child.url || child.path,
        };
      });
    },
  },
  Grade: {
    async categories(grade: GQLGrade, __: any, context: ContextWithLoaders): Promise<GQLCategory[]> {
      const children = await fetchChildren({ id: grade.id, nodeType: "PROGRAMME" }, context);
      return children.map((child) => {
        const isProgrammeSubject = child.metadata.customFields["programfag"] === "true";
        return {
          id: child.id,
          title: {
            title: child.name,
            language: context.language,
          },
          url: child.url || child.path,
          isProgrammeSubject,
        };
      });
    },
  },
  Category: {
    async subjects(category: GQLCategory, __: any, context: ContextWithLoaders): Promise<GQLSubject[]> {
      const children = await fetchChildren({ id: category.id, nodeType: "SUBJECT" }, context);
      const nodes = children.map((child) => {
        const context = child.contexts.find((c) => c.path.startsWith("/subject")) || child.contexts[0];
        const path = context.path;
        return { ...child, path };
      });
      return nodes.map((node) => nodeToTaxonomyEntity(node, context));
    },
  },
};
