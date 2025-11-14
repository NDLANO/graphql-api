/**
 * Copyright (c) 2023-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Node } from "@ndla/types-taxonomy";
import { GraphQLError } from "graphql";
import { fetchChildren } from "../api/taxonomyApi";
import {
  GQLCategory,
  GQLGrade,
  GQLMetaImage,
  GQLProgrammePage,
  GQLQueryProgrammeArgs,
  GQLSubject,
} from "../types/schema";
import { getNumberId, nodeToTaxonomyEntity } from "../utils/apiHelpers";

const nodeToProgramme = (node: Node, language: string): GQLProgrammePage => {
  return {
    id: node.id,
    contextId: node.contextId,
    title: {
      title: node.name,
      language: language,
    },
    url: node.url,
    contentUri: node.contentUri,
    supportedLanguages: node.supportedLanguages,
  };
};

export const Query = {
  async programmes(_: any, __: any, context: ContextWithLoaders): Promise<GQLProgrammePage[]> {
    const nodes = await context.loaders.nodesLoader.load({
      nodeType: "PROGRAMME",
      isRoot: true,
      language: context.language,
      isVisible: true,
      filterProgrammes: false,
    });
    return nodes.sort((a, b) => a.name.localeCompare(b.name)).map((node) => nodeToProgramme(node, context.language));
  },
  async programme(
    _: any,
    { path, contextId }: GQLQueryProgrammeArgs,
    context: ContextWithLoaders,
  ): Promise<GQLProgrammePage> {
    if (path && !path.includes("__")) {
      throw new Error("Tried to fetch programme with invalid path");
    }

    const id = path?.split("__")[1] || contextId;

    if (!id) {
      throw new GraphQLError(`No programme found with contextId: ${contextId}`, {
        extensions: { status: 404 },
      });
    }

    const node = await context.loaders.nodesLoader.load({
      contextId: id,
      language: context.language,
      filterProgrammes: false,
      includeContexts: true,
    });
    if (!node[0]) {
      throw new GraphQLError(`No programme found with contextId: ${contextId}`, {
        extensions: { status: 404 },
      });
    }
    return nodeToProgramme(node[0], context.language);
  },
};

export const resolvers = {
  ProgrammePage: {
    async metaDescription(
      programme: GQLProgrammePage,
      __: any,
      context: ContextWithLoaders,
    ): Promise<string | undefined> {
      const subjectPageId = getNumberId(programme.contentUri?.replace("urn:frontpage:", ""));
      if (!subjectPageId) return undefined;
      const subjectpage = await context.loaders.subjectpageLoader.load(subjectPageId);
      return subjectpage?.metaDescription;
    },
    async desktopImage(
      programme: GQLProgrammePage,
      __: any,
      context: ContextWithLoaders,
    ): Promise<GQLMetaImage | undefined> {
      const subjectPageId = getNumberId(programme.contentUri?.replace("urn:frontpage:", ""));
      if (!subjectPageId) return undefined;
      const subjectpage = await context.loaders.subjectpageLoader.load(subjectPageId);
      if (!subjectpage) return undefined;
      return {
        url: subjectpage.banner.desktopUrl,
        alt: "",
      };
    },
    async mobileImage(
      programme: GQLProgrammePage,
      __: any,
      context: ContextWithLoaders,
    ): Promise<GQLMetaImage | undefined> {
      const subjectPageId = getNumberId(programme.contentUri?.replace("urn:frontpage:", ""));
      if (!subjectPageId) return undefined;
      const subjectpage = await context.loaders.subjectpageLoader.load(subjectPageId);
      if (!subjectpage) return undefined;
      return {
        url: subjectpage.banner.mobileUrl || subjectpage.banner.desktopUrl,
        alt: "",
      };
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
          url: child.url,
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
          url: child.url,
          isProgrammeSubject,
        };
      });
    },
  },
  Category: {
    async subjects(category: GQLCategory, __: any, context: ContextWithLoaders): Promise<GQLSubject[]> {
      const children = await fetchChildren({ id: category.id, nodeType: "SUBJECT" }, context);
      const nodes = children.map((child) => {
        // Pick the context that is the subjects own root context to avoid getting paths starting with /programme:
        const context = child.contexts.find((c) => c.rootId === child.id) || child.contexts[0];
        const url = context?.url ?? child.url;
        return { ...child, url };
      });
      return nodes.map((node) => nodeToTaxonomyEntity(node, context));
    },
  },
};
