/**
 * Copyright (c) 2023-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  AudioEmbedData,
  BrightcoveEmbedData,
  ConceptEmbedData,
  EmbedData,
  H5pEmbedData,
  ImageEmbedData,
} from "@ndla/types-embed";
import { load } from "cheerio";
import { getEnvironmentVariabel, h5pHostUrl } from "../config";
import {
  GQLQueryResourceEmbedArgs,
  GQLQueryResourceEmbedsArgs,
  GQLResourceEmbed,
  GQLResourceEmbedInput,
} from "../types/schema";
import { getEmbedsFromContent } from "../utils/getEmbedsFromContent";
import { toArticleMetaData } from "../utils/toArticleMetaData";
import { transformEmbed } from "./embedsApi";

const accountId = getEnvironmentVariabel("BRIGHTCOVE_ACCOUNT_ID", "123456789");
const playerId = getEnvironmentVariabel("BRIGHTCOVE_PLAYER_ID", "default");

const toEmbed = ({
  type,
  id,
  conceptType,
}: GQLResourceEmbedInput):
  | BrightcoveEmbedData
  | ImageEmbedData
  | AudioEmbedData
  | ConceptEmbedData
  | H5pEmbedData
  | null => {
  if (type === "video") {
    return {
      resource: "brightcove",
      videoid: id,
      account: accountId,
      title: "",
      caption: "",
      player: playerId,
    };
  } else if (type === "image") {
    return {
      resource: "image",
      resourceId: id,
      alt: "",
    };
  } else if (type === "audio") {
    return {
      resource: "audio",
      resourceId: id,
      type: "audio",
      url: "",
    };
  } else if (type === "h5p") {
    return {
      resource: "h5p",
      path: `/resource/${id}`,
      url: `${h5pHostUrl()}/resource/${id}`,
    };
  } else if (type === "concept") {
    return {
      resource: "concept",
      contentId: id,
      type: (conceptType ?? "notion") as "block" | "inline" | "notion",
    };
  } else {
    return null;
  }
};

const attributeRegex = /[A-Z]/g;

export const toEmbedHtml = (data: EmbedData): string => {
  const entries = Object.entries(data ?? {});
  const dataSet = entries.reduce<string>((acc, [key, value]) => {
    const newKey = key.replace(attributeRegex, (m) => `-${m.toLowerCase()}`);
    return acc.concat(`data-${newKey}="${value.toString()}" `);
  }, "");

  return `<ndlaembed ${dataSet}></ndlaembed>`;
};

export const toHtml = (embedString: string): string => {
  return `<html><body>${embedString}</body></html>`;
};

export const fetchResourceEmbed = async (
  params: GQLQueryResourceEmbedArgs,
  context: ContextWithLoaders,
): Promise<GQLResourceEmbed> => {
  const embed = toEmbed(params);
  if (!embed) {
    throw new Error("Unsupported embed");
  }

  const embedHtml = toEmbedHtml(embed);

  const content = toHtml(embedHtml);
  const html = load(content, null, false);
  const embeds = getEmbedsFromContent(html)[0];
  if (!embeds) {
    throw new Error("No embeds found");
  }
  const embedPromise = await transformEmbed(embeds, context, 0, 0, {
    shortCircuitOnError: true,
    standalone: true,
  });

  const metadata = toArticleMetaData([embedPromise]);

  return {
    meta: metadata,
    content: html.html() ?? "",
  };
};

export const fetchResourceEmbeds = async ({ resources }: GQLQueryResourceEmbedsArgs, context: ContextWithLoaders) => {
  const embeds = resources.map((params) => toEmbed(params)).filter((embed) => !!embed);
  const content = embeds.map((embed) => toEmbedHtml(embed!)).join("");
  const bodyString = toHtml(content);
  const html = load(bodyString, null, false);
  const embedsFromContent = getEmbedsFromContent(html);

  const embedPromises = await Promise.all(
    embedsFromContent.map((embed, index) =>
      transformEmbed(embed, context, index, 0, {
        shortCircuitOnError: true,
        standalone: true,
      }),
    ),
  );

  const metadata = toArticleMetaData(embedPromises);

  return {
    meta: metadata,
    content: html.html() ?? "",
  };
};
