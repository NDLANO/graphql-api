/**
 * Copyright (c) 2023-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { toUnicode } from "punycode/";
import { load } from "cheerio";
import he from "he";
import { FrontPageDTO, MenuDataDTO, MenuDTO } from "@ndla/types-backend/frontpage-api";
import { IImageMetaInformationV3DTO } from "@ndla/types-backend/image-api";
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
  FileMetaData,
  PitchMetaData,
  ContactBlockMetaData,
  KeyFigureMetaData,
  EmbedData,
  ConceptVisualElementMeta,
  CampaignBlockMetaData,
  ConceptData,
} from "@ndla/types-embed";
import { fetchSimpleArticle } from "./articleApi";
import { fetchAudioV2 } from "./audioApi";
import { fetchEmbedConcept } from "./conceptApi";
import { fetchExternalOembed } from "./externalApi";
import { checkIfFileExists } from "./fileApi";
import { fetchH5pLicenseInformation, fetchH5pOembed, fetchH5pInfo } from "./h5pApi";
import { fetchImageV3 } from "./imageApi";
import { fetchVideo, fetchVideoSources } from "./videoApi";
import { ndlaUrl } from "../config";
import { getBrightcoveCopyright } from "../utils/brightcoveUtils";
import { CheerioEmbed, getEmbedsFromContent } from "../utils/getEmbedsFromContent";
import highlightCode from "../utils/highlightCode";
import parseMarkdown from "../utils/parseMarkdown";

const URL_DOMAIN_REGEX = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n]+)/im;

type Fetch<T extends EmbedMetaData, ExtraData = {}> = (
  params: {
    embedData: T["embedData"];
    context: ContextWithLoaders;
    index: number;
    opts: TransformOptions;
  } & ExtraData,
) => Promise<Extract<EmbedMetaData, { resource: T["resource"]; status: "success" }>["data"]>;

// Some embeds depend on fetching image information, but can function just fine without.
// This function simply suppresses the error. Do not use it for fetching the actual imageMeta.
const fetchImageWrapper = async (id: string, context: Context): Promise<IImageMetaInformationV3DTO> => {
  const image = await fetchImageV3(id, context);
  if (image === null) {
    throw Error("Failed to fetch image");
  }
  return {
    ...image,
    caption: {
      ...image.caption,
      caption: parseCaption(image.caption.caption),
    },
  };
};

const imageMeta: Fetch<ImageMetaData> = async ({ embedData, context }) => {
  const res = await fetchImageV3(embedData.resourceId, context);
  return {
    ...res,
    caption: {
      ...res.caption,
      caption: parseCaption(res.caption.caption, embedData.hideByline === "true"),
    },
  };
};

const audioMeta: Fetch<AudioMetaData> = async ({ embedData, context }) => {
  const audio = await fetchAudioV2(context, embedData.resourceId);
  const coverPhotoId = audio.podcastMeta?.coverPhoto?.id;
  let imageMeta: IImageMetaInformationV3DTO | undefined;
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
    copyright: getBrightcoveCopyright(video.custom_fields, context.language, video.link?.url),
    sources,
  };
};

function traverse(articleIds: string[], obj: MenuDataDTO | MenuDTO) {
  articleIds.push(`${obj.articleId}`);
  if (obj.menu) {
    obj.menu.map((m) => traverse(articleIds, m));
  }
}

const extractArticleIds = (data: FrontPageDTO): string[] => {
  const articleIds: string[] = [];

  if (data.menu) {
    data.menu.map((m) => traverse(articleIds, m));
  }
  return articleIds;
};

const contentLinkMeta: Fetch<ContentLinkMetaData> = async ({ embedData, context, opts }) => {
  const contentURI = `urn:${embedData.contentType ?? "article"}:${embedData.contentId}`;
  const contentType = embedData.contentType === "learningpath" ? "learningpaths" : "article";
  const host = opts.absoluteUrl ? ndlaUrl : "";
  const baseUrl = `${host}/${context.language}`;
  const nodes = await context.loaders.nodesLoader.load({
    contentURI,
    language: context.language,
    includeContexts: true,
    filterProgrammes: true,
    isVisible: true,
  });

  if (nodes.length === 0 && contentType === "article") {
    const menuids = extractArticleIds(await context.loaders.frontpageLoader.load(context.language));
    const pathelement = menuids.includes(embedData.contentId) ? "/om" : "/article";
    const article = await context.loaders.articlesLoader.load(embedData.contentId);
    return { path: `${baseUrl}${pathelement}/${article?.slug ?? embedData.contentId}` };
  }

  const node = nodes.find((n) => !!n.context);
  const ctx = opts.subject ? node?.contexts?.find((c) => c.rootId === opts.subject) : node?.context;
  let url = `${baseUrl}/${contentType}/${embedData.contentId}`;

  if (!ctx?.isVisible) {
    return { path: url };
  }

  const nodeUrl = ctx?.url ?? node?.url;
  if (nodeUrl) {
    url = `${baseUrl}${nodeUrl}`;
  }

  return { path: url };
};

const relatedContentMeta: Fetch<RelatedContentMetaData> = async ({ embedData, context, opts }) => {
  const articleId = embedData.articleId;
  if (typeof articleId === "string" || typeof articleId === "number") {
    const [article, resources] = await Promise.all([
      fetchSimpleArticle(`urn:article:${articleId}`, context),
      context.loaders.nodesLoader.load({
        contentURI: `urn:article:${articleId}`,
        language: context.language,
        filterProgrammes: true,
        includeContexts: true,
        isVisible: true,
        rootId: opts.subject,
      }),
    ]);
    const resource = resources?.[0];
    return { article, resource };
  } else {
    return undefined;
  }
};

const fetchConceptVisualElement = async (
  visualElement: string | undefined,
  context: ContextWithLoaders,
  index: number,
  opts: TransformOptions,
): Promise<ConceptVisualElementMeta | undefined> => {
  if (!visualElement) return undefined;
  const html = load(visualElement, null, false);
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

const fileListMeta: Fetch<FileMetaData> = async ({ embedData, context }) => {
  const response = await checkIfFileExists(embedData.url, context);
  return { exists: response };
};

const pitchMeta: Fetch<PitchMetaData> = async ({ embedData, context }) => {
  const metaImage = await fetchImageV3(embedData.imageId, context);
  return { metaImage };
};

const contactBlockMeta: Fetch<ContactBlockMetaData> = async ({ embedData, context }) => {
  const image = await fetchImageV3(embedData.imageId, context);
  return { image };
};

const keyFigureMeta: Fetch<KeyFigureMetaData> = async ({ embedData, context }) => {
  if (!embedData.imageId) return {};
  const metaImage = await fetchImageV3(embedData.imageId, context);
  return { metaImage };
};

const campaignBlockMeta: Fetch<CampaignBlockMetaData> = async ({ embedData, context }) => {
  const image = embedData.imageId
    ? await fetchImageV3(embedData.imageId, context)
    : await Promise.resolve<undefined>(undefined);

  return { image };
};

const endsWithPunctuationRegex = /[.!?]$/;
export const parseCaption = (caption: string, skipPunctuation: boolean = false): string => {
  const htmlCaption = parseMarkdown({ markdown: caption, inline: true });

  if (skipPunctuation) return htmlCaption;

  const parsedCaption = load(htmlCaption, null, false);

  const lastTextNode = parsedCaption.root().contents().last();

  const lastText = lastTextNode.text();
  if (endsWithPunctuationRegex.test(parsedCaption.text().trimEnd())) return htmlCaption;
  const newText = `${lastText.trimEnd()}.`;

  if (lastTextNode?.[0]?.type === "text") lastTextNode.replaceWith(newText);
  else lastTextNode.text(newText);

  return parsedCaption.html();
};

export const transformEmbed = async (
  embed: CheerioEmbed,
  context: ContextWithLoaders,
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
        embedData.caption = parseCaption(embedData.caption, embedData.hideByline === "true");
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
      if (embedData.caption) {
        embedData.caption = parseCaption(embedData.caption);
      }
    } else if (embedData.resource === "content-link") {
      meta = await contentLinkMeta({ embedData, context, index, opts });
    } else if (embedData.resource === "related-content") {
      meta = await relatedContentMeta({ embedData, context, index, opts });
      const match = embedData.url?.match(URL_DOMAIN_REGEX)?.[1] || embedData.url;
      if (match) {
        embedData.urlDomain = toUnicode(match);
      }
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
    } else if (embedData.resource === "file") {
      meta = await fileListMeta({ embedData, context, index, opts });
    } else if (embedData.resource === "pitch") {
      meta = await pitchMeta({ embedData, context, index, opts });
    } else if (embedData.resource === "contact-block") {
      meta = await contactBlockMeta({ embedData, context, index, opts });
    } else if (embedData.resource === "key-figure") {
      meta = await keyFigureMeta({ embedData, context, index, opts });
    } else if (embedData.resource === "campaign-block") {
      meta = await campaignBlockMeta({ embedData, context, index, opts });
    } else if (embedData.resource === "link-block") {
      meta = undefined;
    } else if (embedData.resource === "copyright") {
      meta = undefined;
    } else if (embedData.resource === "symbol") {
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
