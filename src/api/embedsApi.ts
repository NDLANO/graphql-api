/**
 * Copyright (c) 2023-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { load } from "cheerio";
import he from "he";
import { IImageMetaInformationV3 } from "@ndla/types-backend/image-api";
import {
  AudioMetaData,
  ImageMetaData,
  EmbedMetaData,
  H5pMetaData,
  OembedMetaData,
  IframeMetaData,
  CodeMetaData,
  ContentLinkMetaData,
  FootnoteMetaData,
  BrightcoveMetaData,
  RelatedContentMetaData,
  ConceptMetaData,
  ConceptListMetaData,
  FileMetaData,
  BlogPostMetaData,
  ContactBlockMetaData,
  KeyFigureMetaData,
  EmbedData,
  ConceptVisualElementMeta,
  CampaignBlockMetaData,
  ConceptData,
  UuDisclaimerMetaData,
} from "@ndla/types-embed";
import { fetchSimpleArticle } from "./articleApi";
import { fetchAudioV2 } from "./audioApi";
import { fetchEmbedConcept, fetchEmbedConcepts } from "./conceptApi";
import { fetchExternalOembed } from "./externalApi";
import { checkIfFileExists } from "./fileApi";
import { fetchH5pLicenseInformation, fetchH5pOembed, fetchH5pInfo } from "./h5pApi";
import { fetchImageV3 } from "./imageApi";
import { queryNodes } from "./taxonomyApi";
import { fetchVideo, fetchVideoSources } from "./videoApi";
import { ndlaUrl } from "../config";
import { getBrightcoveCopyright } from "../utils/brightcoveUtils";
import { CheerioEmbed, getEmbedsFromContent } from "../utils/getEmbedsFromContent";
import highlightCode from "../utils/highlightCode";
import parseMarkdown from "../utils/parseMarkdown";

type Fetch<T extends EmbedMetaData, ExtraData = {}> = (
  params: {
    embedData: T["embedData"];
    context: Context;
    index: number;
    opts: TransformOptions;
  } & ExtraData,
) => Promise<Extract<EmbedMetaData, { resource: T["resource"]; status: "success" }>["data"]>;

// Some embeds depend on fetching image information, but can function just fine without.
// This function simply suppresses the error. Do not use it for fetching the actual imageMeta.
const fetchImageWrapper = async (id: string, context: Context): Promise<IImageMetaInformationV3> => {
  const image = await fetchImageV3(id, context);
  if (image === null) {
    throw Error("Failed to fetch image");
  }
  return {
    ...image,
    caption: {
      ...image.caption,
      caption: parseMarkdown({ markdown: image.caption.caption, inline: true }),
    },
  };
};

const imageMeta: Fetch<ImageMetaData> = async ({ embedData, context }) => {
  const res = await fetchImageV3(embedData.resourceId, context);
  return {
    ...res,
    caption: {
      ...res.caption,
      caption: parseMarkdown({ markdown: res.caption.caption, inline: true }),
    },
  };
};

const audioMeta: Fetch<AudioMetaData> = async ({ embedData, context }) => {
  const audio = await fetchAudioV2(context, embedData.resourceId);
  const coverPhotoId = audio.podcastMeta?.coverPhoto?.id;
  let imageMeta: IImageMetaInformationV3 | undefined;
  if (audio.manuscript) {
    audio.manuscript.manuscript = parseMarkdown({
      markdown: audio.manuscript.manuscript,
    });
  }
  if (coverPhotoId) {
    imageMeta = await fetchImageWrapper(coverPhotoId, context);
  }
  return { ...audio, imageMeta };
};

const externalMeta: Fetch<OembedMetaData> = async ({ embedData, context }) => {
  const [oembed, iframeImage] = await Promise.all([
    fetchExternalOembed(embedData, context),
    embedData.imageid ? fetchImageWrapper(embedData.imageid, context) : Promise.resolve<undefined>(undefined),
  ]);

  return { oembed, iframeImage };
};

// This function will never end up in an error state. Image fetching
// is already caught inside fetchImage, and the embed will still work
// without the image. As such, we ignore it.
const iframeMeta: Fetch<IframeMetaData> = async ({ embedData, context }) => {
  const iframeImage = embedData.imageid
    ? await fetchImageWrapper(embedData.imageid, context)
    : await Promise.resolve<undefined>(undefined);

  return { iframeImage };
};

const h5pMeta: Fetch<H5pMetaData> = async ({ embedData, context, opts }) => {
  const pathArr = embedData.path?.split("/") || [];
  const h5pId = pathArr[pathArr.length - 1];
  const [oembedData, h5pLicenseInformation, h5pInfo] = await Promise.all([
    fetchH5pOembed(embedData, context, !!opts.previewH5p),
    fetchH5pLicenseInformation(h5pId, context),
    fetchH5pInfo(h5pId, context),
  ]);

  return {
    h5pLicenseInformation: {
      h5p: {
        ...h5pLicenseInformation?.h5p,
        authors: h5pLicenseInformation?.h5p.authors ?? [],
        title: h5pInfo?.title ?? "",
      },
    },
    h5pUrl: embedData.url,
    oembed: oembedData,
  };
};

const codeMeta: Fetch<CodeMetaData> = async ({ embedData }) => {
  const decodedContent = he.decode(embedData.codeContent);
  const highlighted = highlightCode(decodedContent, embedData.codeFormat);
  return { decodedContent, highlightedCode: highlighted };
};

export interface TransformOptions {
  draftConcept?: boolean;
  previewH5p?: boolean;
  absoluteUrl?: boolean;
  subject?: string;
  shortCircuitOnError?: boolean;
  standalone?: boolean;
}

const footnoteMeta: Fetch<FootnoteMetaData, { footnoteCount: number }> = async ({ embedData, footnoteCount }) => {
  const authors = embedData.authors.split(";");
  const year = embedData.year.toString();
  return { authors, year, entryNum: footnoteCount };
};

const brightcoveMeta: Fetch<BrightcoveMetaData> = async ({ embedData, context }) => {
  const { videoid, account } = embedData;
  const [video, sources] = await Promise.all([
    fetchVideo(videoid, account, context),
    fetchVideoSources(videoid, account, context),
  ]);

  if (video.description) {
    video.description = parseMarkdown({
      markdown: video.description,
      inline: true,
    });
  }

  return {
    ...video,
    copyright: getBrightcoveCopyright(video.custom_fields, context.language),
    sources,
  };
};

const contentLinkMeta: Fetch<ContentLinkMetaData> = async ({ embedData, context, opts }) => {
  const contentURI = `urn:${embedData.contentType ?? "article"}:${embedData.contentId}`;
  const host = opts.absoluteUrl ? ndlaUrl : "";

  const contentType = embedData.contentType === "learningpath" ? "learningpaths" : "article";
  let path = `${host}/${context.language}/${contentType}/${embedData.contentId}`;
  const nodes = await queryNodes({ contentURI }, context);
  const node = nodes.find((n) => !!n.path);
  const nodePath = node?.paths?.find((p) => p.split("/")[1] === opts.subject?.replace("urn:", "")) ?? node?.path;

  if (nodePath) {
    path = `${host}/${context.language}${nodePath}`;
  }

  return { path };
};

const relatedContentMeta: Fetch<RelatedContentMetaData> = async ({ embedData, context }) => {
  const articleId = embedData.articleId;
  if (typeof articleId === "string" || typeof articleId === "number") {
    const [article, resources] = await Promise.all([
      fetchSimpleArticle(`urn:article:${articleId}`, context),
      queryNodes({ contentURI: `urn:article:${articleId}`, language: context.language }, context),
    ]);
    const resource = resources?.[0];
    return { article, resource };
  } else {
    return undefined;
  }
};

const fetchConceptVisualElement = async (
  visualElement: string | undefined,
  context: Context,
  index: number,
  opts: TransformOptions,
): Promise<ConceptVisualElementMeta | undefined> => {
  if (!visualElement) return undefined;
  const html = load(visualElement, {
    xmlMode: false,
    decodeEntities: false,
  });
  const embed = getEmbedsFromContent(html)[0];
  if (!embed) return undefined;
  const res = await transformEmbed(embed, context, index + 0.1, 0, {
    ...opts,
    shortCircuitOnError: false,
  });
  return res as ConceptVisualElementMeta;
};

const conceptMeta: Fetch<ConceptMetaData> = async ({ embedData, index, context, opts }) => {
  const concept = await fetchEmbedConcept(embedData.contentId, context, !!opts.draftConcept);
  const visualElement = await fetchConceptVisualElement(concept.visualElement?.visualElement, context, index, opts);
  return {
    concept,
    visualElement,
  };
};

const conceptListMeta: Fetch<ConceptListMetaData> = async ({ embedData, index, context, opts }) => {
  const conceptList = await fetchEmbedConcepts(embedData.tag, embedData.subjectId, context, !!opts.draftConcept);

  const concepts = await Promise.all(
    conceptList.map(async (concept) => {
      const visualElement = await fetchConceptVisualElement(concept.visualElement?.visualElement, context, index, opts);
      return {
        concept: {
          ...concept,
          content: {
            ...concept.content,
            content: parseMarkdown({ markdown: concept.content.content }),
          },
        },
        visualElement,
      };
    }),
  );
  return { concepts };
};

const fileListMeta: Fetch<FileMetaData> = async ({ embedData, context }) => {
  const response = await checkIfFileExists(embedData.url, context);
  return { exists: response };
};

const blogPostMeta: Fetch<BlogPostMetaData> = async ({ embedData, context }) => {
  const metaImage = await fetchImageV3(embedData.imageId, context);
  return { metaImage };
};

const contactBlockMeta: Fetch<ContactBlockMetaData> = async ({ embedData, context }) => {
  const image = await fetchImageV3(embedData.imageId, context);
  return { image };
};

const keyFigureMeta: Fetch<KeyFigureMetaData> = async ({ embedData, context }) => {
  const metaImage = await fetchImageV3(embedData.imageId, context);
  return { metaImage };
};

const campaignBlockMeta: Fetch<CampaignBlockMetaData> = async ({ embedData, context }) => {
  const image = embedData.imageId
    ? await fetchImageV3(embedData.imageId, context)
    : await Promise.resolve<undefined>(undefined);

  return { image };
};

const uuDisclaimerMeta: Fetch<UuDisclaimerMetaData> = async ({ embedData, context }) => {
  const article = embedData.articleId
    ? await fetchSimpleArticle(`urn:article:${embedData.articleId}`, context)
    : undefined;
  return article ? { disclaimerLink: { text: article.title.title, href: `/article/${article.id}` } } : {};
};

export const transformEmbed = async (
  embed: CheerioEmbed,
  context: Context,
  index: number,
  footnoteCount: number,
  opts: TransformOptions,
): Promise<EmbedMetaData | undefined> => {
  if (embed.data.resource === "nrk" || (embed.data.resource === "comment" && embed.data.type === "block")) {
    embed.embed.replaceWith("");
    return;
  }
  if (embed.data.resource === "comment" && embed.data.type === "inline") {
    embed.embed.replaceWith(embed.embed.html() ?? "");
    return;
  }

  let meta: Extract<EmbedMetaData, { status: "success" }>["data"];
  const embedData: EmbedData = embed.data;

  try {
    if (embedData.resource === "image") {
      meta = await imageMeta({ embedData, context, index, opts });
      if (embedData.caption) {
        embedData.caption = parseMarkdown({
          markdown: embedData.caption,
          inline: true,
        });
      }
      embedData.pageUrl = `/${embedData.resource}/${embedData.resourceId}`;
    } else if (embedData.resource === "audio") {
      meta = await audioMeta({ embedData, context, index, opts });
      embedData.pageUrl = `/${embedData.resource}/${embedData.resourceId}`;
    } else if (embedData.resource === "external") {
      meta = await externalMeta({ embedData, context, index, opts });
    } else if (embedData.resource === "iframe") {
      meta = await iframeMeta({ embedData, context, index, opts });
    } else if (embedData.resource === "h5p") {
      const lang = context.language === "en" ? "en-gb" : context.language === "nn" ? "nn-no" : "nb-no";
      const cssUrl = `${ndlaUrl}/static/h5p-custom-css.css`;
      embedData.url = `${embedData.url}?locale=${lang}&cssUrl=${cssUrl}`;
      meta = await h5pMeta({ embedData, context, index, opts });
      embedData.pageUrl = `/${embedData.resource}${embedData.path}`;
    } else if (embedData.resource === "code-block") {
      meta = await codeMeta({ embedData, context, index, opts });
    } else if (embedData.resource === "footnote") {
      meta = await footnoteMeta({
        embedData,
        context,
        index,
        opts,
        footnoteCount,
      });
    } else if (embedData.resource === "brightcove") {
      meta = await brightcoveMeta({ embedData, context, index, opts });
      embedData.pageUrl = `/video/${embedData.videoid}`;
      if (embedData.caption?.length) {
        embedData.caption = parseMarkdown({
          markdown: embedData.caption,
          inline: true,
        });
      }
    } else if (embedData.resource === "content-link") {
      embedData.linkText = embed.embed.text() ?? embedData.linkText;
      meta = await contentLinkMeta({ embedData, context, index, opts });
    } else if (embedData.resource === "related-content") {
      meta = await relatedContentMeta({ embedData, context, index, opts });
    } else if (embedData.resource === "concept") {
      const response: ConceptData | undefined = await conceptMeta({
        embedData,
        context,
        index,
        opts,
      }).catch((_) => undefined);
      // If the concept does not exist and we are not requesting a standalone concept, remove it from the article.
      // This does not apply to inline concepts, as the underlying would should still be shown.
      if (!opts.standalone && embedData.type !== "inline" && !response) {
        embed.embed.replaceWith("");
        return;
      }
      embedData.pageUrl = `/${embedData.resource}/${embedData.contentId}`;
      // Throw a new error if the concept is inline. The embed will be converted to an error embed.
      if (!response && embedData.type === "inline") {
        throw new Error("Failed to fetch concept");
      }
      meta = response;
    } else if (embedData.resource === "concept-list") {
      meta = await conceptListMeta({ embedData, context, index, opts });
    } else if (embedData.resource === "file") {
      meta = await fileListMeta({ embedData, context, index, opts });
    } else if (embedData.resource === "blog-post") {
      meta = await blogPostMeta({ embedData, context, index, opts });
    } else if (embedData.resource === "contact-block") {
      meta = await contactBlockMeta({ embedData, context, index, opts });
    } else if (embedData.resource === "key-figure") {
      meta = await keyFigureMeta({ embedData, context, index, opts });
    } else if (embedData.resource === "campaign-block") {
      meta = await campaignBlockMeta({ embedData, context, index, opts });
    } else if (embedData.resource === "link-block") {
      meta = undefined;
    } else if (embedData.resource === "uu-disclaimer") {
      meta = await uuDisclaimerMeta({ embedData, context, index, opts });
    } else if (embedData.resource === "copyright") {
      meta = undefined;
    } else {
      return;
    }

    const embedMeta = {
      resource: embedData.resource,
      embedData: embedData,
      status: "success",
      data: meta,
    } as EmbedMetaData;

    embed.embed.attr("data-json", JSON.stringify(embedMeta));
    return embedMeta;
  } catch (e) {
    if (opts.shortCircuitOnError) {
      throw e;
    }
    const embedMeta = {
      resource: embedData.resource,
      embedData: embedData,
      status: "error",
      message: `Failed to fetch data for embed of type ${embedData.resource} with index ${index}`,
    } as EmbedMetaData;

    embed.embed.attr("data-json", JSON.stringify(embedMeta));
    return embedMeta;
  }
};
