/**
 * Copyright (c) 2023-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { load } from "cheerio";
import sortBy from "lodash/sortBy";
import { EmbedMetaData } from "@ndla/types-embed";
import { transformEmbed } from "./embedsApi";
import { GQLVisualElement } from "../types/schema";
import { getEmbedsFromContent } from "../utils/getEmbedsFromContent";
import { toArticleMetaData } from "../utils/toArticleMetaData";

interface TransformArticleOptions {
  subject?: string;
  previewH5p?: boolean;
  showVisualElement?: boolean;
  draftConcept?: boolean;
  absoluteUrl?: boolean;
}

export const toVisualElement = (meta: Extract<EmbedMetaData, { status: "success" }>): GQLVisualElement | undefined => {
  switch (meta.resource) {
    case "brightcove": {
      const { embedData, data } = meta;
      const src = `https://players.brightcove.net/${embedData.account}/${embedData.player}_default/index.html?videoId=${embedData.videoid}`;
      const download = sortBy(
        data.sources.filter((src) => src.container === "MP4" && src.src),
        (src) => src.size,
      )?.[0]?.src;
      const source = sortBy(
        data.sources.filter((s) => s.width && s.height),
        (s) => s.height,
      )?.[0];
      return {
        resource: "brightcove",
        copyright: data.copyright,
        url: src,
        title: data.name ?? "",
        brightcove: {
          caption: embedData.caption,
          src,
          cover: data.images?.poster?.src,
          description: data.description ?? data["long_description"] ?? data.name,
          uploadDate: data["published_at"] ?? undefined,
          iframe: {
            src,
            height: source?.height ?? 480,
            width: source?.width ?? 640,
          },
          download,
        },
      };
    }
    case "h5p":
      return {
        resource: "h5p",
        url: meta.data.h5pUrl,
        h5p: {
          src: meta.data.h5pUrl,
        },
      };
    case "external":
      return {
        url: meta.embedData.url,
        resource: "oembed",
        oembed: meta.data.oembed,
      };

    case "image": {
      const src = `/image/${meta.data.id}`;
      return {
        resource: "image",
        url: src,
        title: meta.data.title.title,
        copyright: meta.data.copyright,
        image: {
          caption: meta.embedData.caption ?? meta.data.caption.caption,
          alt: meta.embedData.alt,
          altText: meta.data.alttext.alttext,
          src: meta.data.image.imageUrl,
          focalX: Number(meta.embedData.focalX) || undefined,
          focalY: Number(meta.embedData.focalY) || undefined,
          lowerRightX: Number(meta.embedData.lowerRightX) || undefined,
          lowerRightY: Number(meta.embedData.lowerRightY) || undefined,
        },
      };
    }
    default:
      return undefined;
  }
};

export const transformArticle = async (
  content: string,
  context: Context,
  visualElement: string | undefined,
  { subject, previewH5p, showVisualElement, draftConcept, absoluteUrl }: TransformArticleOptions,
) => {
  const html = load(content, {
    xmlMode: false,
    decodeEntities: false,
  });
  html("math").each((_, el) => {
    html(el)
      .attr("data-math", html(el).html() ?? "")
      .children()
      .replaceWith("");
  });
  html("h2").each((_, el) => {
    html(el).attr("data-text", html(el).text());
  });
  html("details").each((_, el) => {
    if (!el.children.some((c) => c.type === "tag" && c.name === "summary")) {
      html(el).prepend("<summary></summary>");
    }
  });
  if (showVisualElement && visualElement) {
    html("body").prepend(`<section>${visualElement}</section>`);
  }

  const visEl =
    visualElement && !showVisualElement
      ? load(`${visualElement}`, {
          xmlMode: false,
          decodeEntities: false,
        })
      : undefined;

  const embeds = visEl ? getEmbedsFromContent(visEl).concat(getEmbedsFromContent(html)) : getEmbedsFromContent(html);

  let footnoteCount = 0;
  const embedPromises = await Promise.all(
    embeds.map(async (embed, index) => {
      if (embed.data.resource === "footnote") {
        footnoteCount += 1;
      }
      if (embed.data.resource === "uu-disclaimer") {
        try {
          const transformedContent = await transformArticle(embed.data.disclaimer, context, undefined, {});
          const uuDisclaimerEmbedData = {
            resource: embed.data.resource,
            data: { transformedContent: transformedContent.content },
            status: "success",
            embedData: embed.data,
          } as EmbedMetaData;
          embed.embed.attr("data-json", JSON.stringify(uuDisclaimerEmbedData));
          return uuDisclaimerEmbedData;
        } catch (e) {
          const uuDisclaimerEmbedData = {
            resource: embed.data.resource,
            embedData: embed.data,
            status: "error",
            message: `Failed to fetch data for embed of type ${embed.data.resource} with index ${index}`,
          } as EmbedMetaData;
          embed.embed.attr("data-json", JSON.stringify(uuDisclaimerEmbedData));
          return uuDisclaimerEmbedData;
        }
      }
      return transformEmbed(embed, context, index, footnoteCount, {
        subject,
        previewH5p,
        draftConcept,
        absoluteUrl,
      });
    }),
  );
  const metaData = toArticleMetaData(embedPromises);
  const visualElementCheerio = visEl?.("body") ?? embeds[0]?.embed;
  const transformedVisEl = visualElementCheerio?.html();
  const transformedContent = html("body").html();
  const visualElementMeta = visEl || (visualElement && showVisualElement) ? embedPromises[0] : undefined;
  const transformedVisualElement =
    visualElementMeta?.status === "success" ? toVisualElement(visualElementMeta) : undefined;

  return {
    metaData,
    content: transformedContent,
    visualElement: transformedVisualElement,
    visualElementEmbed:
      !!transformedVisEl && !!visualElementMeta
        ? {
            content: transformedVisEl,
            meta: toArticleMetaData([visualElementMeta]),
          }
        : undefined,
  };
};
