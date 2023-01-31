/**
 * Copyright (c) 2023-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import he from 'he';
import {
  AudioMetaData,
  ImageMetaData,
  EmbedMetaData,
  H5pMetaData,
  OembedMetaData,
  IframeMetaData,
  CodeMetaData,
  ContentLinkMetaData,
  FootnoteEmbedData,
  FootnoteMetaData,
  BrightcoveMetaData,
  RelatedContentMetaData,
  ConceptMetaData,
  ConceptData,
  ConceptListMetaData,
  FileMetaData,
} from '@ndla/types-embed';
import { Cheerio, load } from 'cheerio';
import { fetchImage } from './imageApi';
import {
  CheerioEmbed,
  getEmbedsFromContent,
} from '../utils/getEmbedsFromContent';
import { fetchAudio } from './audioApi';
import { ndlaUrl } from '../config';
import { fetchH5pLicenseInformation, fetchH5pOembed } from './h5pApi';
import { fetchExternalOembed } from './externalApi';
import { fetchVideo, fetchVideoSources } from './videoApi';
import { fetchNodeByArticleId, queryNodes } from './taxonomyApi';
import { fetchSimpleArticle } from './articleApi';
import { fetchEmbedConcept, fetchEmbedConcepts } from './conceptApi';
import { checkIfFileExists } from './fileApi';

type Fetch<T extends EmbedMetaData> = (params: {
  embedData: T['embedData'];
  context: Context;
  index: number;
  cheerio: Cheerio;
  opts: TransformOptions;
}) => Promise<T>;

const imageMeta: Fetch<ImageMetaData> = async ({
  embedData,
  context,
  index,
}) => {
  try {
    const image = await fetchImage(embedData.resourceId, context);
    return {
      resource: 'image',
      embedData,
      data: image,
      status: 'success',
      seq: index,
    };
  } catch (e) {
    return { resource: 'image', embedData, status: 'error', seq: index };
  }
};

const audioMeta: Fetch<AudioMetaData> = async ({
  embedData,
  context,
  index,
}) => {
  try {
    const audio = await fetchAudio(context, embedData.resourceId);
    const coverPhotoId = audio.podcastMeta?.coverPhoto?.id;
    if (coverPhotoId) {
      const imageMeta = await fetchImage(coverPhotoId, context);
      return {
        resource: 'audio',
        status: 'success',
        embedData,
        seq: index,
        data: { ...audio, imageMeta },
      };
    }
    return {
      resource: 'audio',
      status: 'success',
      data: audio,
      embedData,
      seq: index,
    };
  } catch (e) {
    return {
      resource: 'audio',
      embedData,
      status: 'error',
      seq: index,
      message: 'Failed to fetch',
    };
  }
};

const externalMeta: Fetch<OembedMetaData> = async ({
  embedData,
  context,
  index,
}) => {
  try {
    const [oembed, iframeImage] = await Promise.all([
      fetchExternalOembed(embedData, context),
      embedData.imageid
        ? fetchImage(embedData.imageid, context)
        : Promise.resolve<undefined>(undefined),
    ]);

    return {
      resource: 'external',
      status: 'success',
      seq: index,
      embedData,
      data: { oembed, iframeImage },
    };
  } catch (e) {
    return {
      resource: 'external',
      status: 'error',
      seq: index,
      embedData,
      message: 'Failed to fetch',
    };
  }
};

// This function will never end up in an error state. Image fetching
// is already caught inside fetchImage, and the embed will still work
// without the image. As such, we ignore it.
const iframeMeta: Fetch<IframeMetaData> = async ({
  embedData,
  context,
  index,
}) => {
  const iframeImage = embedData.imageid
    ? await fetchImage(embedData.imageid, context)
    : await Promise.resolve<undefined>(undefined);

  return {
    resource: 'iframe',
    status: 'success',
    seq: index,
    embedData,
    data: { iframeImage },
  };
};

const h5pMeta: Fetch<H5pMetaData> = async ({
  embedData,
  context,
  index,
  opts,
}) => {
  try {
    const lang =
      context.language === 'en'
        ? 'en-gb'
        : context.language === 'nn'
        ? 'nn-no'
        : 'nb-no';
    const cssUrl = `${ndlaUrl}/static/h5p-custom-css.css`;
    embedData.url = `${embedData.url}?locale=${lang}&cssUrl=${cssUrl}`;
    const pathArr = embedData.path?.split('/') || [];
    const h5pId = pathArr[pathArr.length - 1];
    const [oembedData, h5pLicenseInformation] = await Promise.all([
      fetchH5pOembed(embedData, context, opts.previewH5p),
      fetchH5pLicenseInformation(h5pId, context),
    ]);

    return {
      resource: 'h5p',
      status: 'success',
      seq: index,
      embedData,
      data: {
        h5pLicenseInformation,
        h5pUrl: embedData.url,
        oembed: oembedData,
      },
    };
  } catch {
    return {
      resource: 'h5p',
      status: 'error',
      embedData,
      seq: index,
      message: 'Failed to fetch',
    };
  }
};

const codeMeta: Fetch<CodeMetaData> = async ({ embedData, index }) => {
  const decodedContent = he.decode(embedData.codeContent);
  return {
    resource: 'code-block',
    status: 'success',
    seq: index,
    embedData,
    data: { decodedContent },
  };
};

export interface TransformOptions {
  draftConcept?: boolean;
  previewH5p?: boolean;
  previewAlt?: boolean;
  absoluteUrl?: boolean;
  subject?: string;
}

const footnoteMeta = async (
  embedData: FootnoteEmbedData,
  _: Context,
  index: number,
  entryNum: number,
): Promise<FootnoteMetaData> => {
  const authors = embedData.authors.split(';');
  const year = embedData.year.toString();

  return {
    resource: 'footnote',
    status: 'success',
    seq: index,
    embedData,
    data: {
      authors,
      year,
      entryNum,
    },
  };
};

const brightcoveMeta: Fetch<BrightcoveMetaData> = async ({
  embedData,
  context,
  index,
}) => {
  try {
    const { videoid, account } = embedData;
    const [video, sources] = await Promise.all([
      fetchVideo(videoid, account, context),
      fetchVideoSources(videoid, account, context),
    ]);

    return {
      resource: 'brightcove',
      status: 'success',
      seq: index,
      embedData,
      data: {
        ...video,
        sources,
      },
    };
  } catch (e) {
    return {
      resource: 'brightcove',
      status: 'error',
      seq: index,
      embedData,
      message: 'Failed to fetch',
    };
  }
};

const contentLinkMeta: Fetch<ContentLinkMetaData> = async ({
  embedData,
  context,
  index,
  cheerio,
  opts,
}) => {
  try {
    const embedContent = cheerio.html();
    const linkText = embedContent ?? embedData.linkText;
    const contentURI = `urn:${embedData.contentType ?? 'article'}:${
      embedData.contentId
    }`;
    const host = opts.absoluteUrl ? ndlaUrl : '';

    const contentType =
      embedData.contentType === 'learningpath' ? 'learningpaths' : 'article';
    let path = `${host}/${context.language}/${contentType}/${embedData.contentId}`;
    const nodes = await queryNodes({ contentURI }, context);
    const node = nodes.find(n => !!n.path);
    const nodePath =
      node.paths?.find(
        p => p.split('/')[1] === opts.subject?.replace('urn:', ''),
      ) ?? node.path;

    if (nodePath) {
      path = `${host}/${context.language}${nodePath}`;
    }

    return {
      resource: 'content-link',
      status: 'success',
      embedData: { ...embedData, linkText },
      data: { path },
      seq: index,
    };
  } catch (e) {
    return {
      resource: 'content-link',
      status: 'error',
      embedData,
      seq: index,
      message: 'Failed to fetch',
    };
  }
};

const relatedContentMeta: Fetch<RelatedContentMetaData> = async ({
  embedData,
  context,
  index,
}) => {
  const articleId = embedData.articleId;
  if (typeof articleId === 'string' || typeof articleId === 'number') {
    try {
      const [article, resource] = await Promise.all([
        fetchSimpleArticle(`urn:article:${articleId}`, context),
        fetchNodeByArticleId(articleId, context),
      ]);

      return {
        resource: 'related-content',
        status: 'success',
        data: { article, resource },
        seq: index,
        embedData,
      };
    } catch (e) {
      return {
        resource: 'related-content',
        status: 'error',
        seq: index,
        embedData,
      };
    }
  }
  return {
    resource: 'related-content',
    status: 'success',
    data: undefined,
    seq: index,
    embedData,
  };
};

const fetchConceptVisualElement = async (
  visualElement: string | undefined,
  context: Context,
  index: number,
  opts: TransformOptions,
): Promise<ConceptData['visualElement']> => {
  if (!visualElement) return undefined;
  const html = load(visualElement, {
    xmlMode: false,
    decodeEntities: false,
  });
  const embed = getEmbedsFromContent(html)[0];
  return await transformFuncs[embed.data.resource]?.({
    embedData: embed.data,
    cheerio: embed.embed,
    context,
    index,
    opts,
  });
};

const conceptMeta: Fetch<ConceptMetaData> = async ({
  embedData,
  index,
  context,
  opts,
}) => {
  try {
    const concept = await fetchEmbedConcept(
      embedData.contentId,
      context,
      opts.draftConcept,
    );
    const visualElement = await fetchConceptVisualElement(
      concept.visualElement?.visualElement,
      context,
      index,
      opts,
    );
    return {
      resource: 'concept',
      status: 'success',
      embedData,
      data: {
        concept,
        visualElement,
      },
      seq: index,
    };
  } catch (e) {
    return {
      resource: 'concept',
      status: 'error',
      embedData,
      seq: index,
      message: 'Failed to fetch concept',
    };
  }
};

const conceptListMeta: Fetch<ConceptListMetaData> = async ({
  embedData,
  index,
  context,
  opts,
}) => {
  try {
    const conceptList = await fetchEmbedConcepts(
      embedData.tag,
      embedData.subjectId,
      context,
      opts.draftConcept,
    );
    const concepts = await Promise.all(
      conceptList.map(async concept => {
        const visualElement = await fetchConceptVisualElement(
          concept.visualElement?.visualElement,
          context,
          index,
          opts,
        );
        return { concept, visualElement };
      }),
    );

    return {
      resource: 'concept-list',
      status: 'success',
      embedData,
      seq: index,
      data: { concepts },
    };
  } catch (e) {
    return {
      resource: 'concept-list',
      status: 'error',
      embedData,
      seq: index,
    };
  }
};

const fileListMeta: Fetch<FileMetaData> = async ({
  embedData,
  index,
  context,
}) => {
  try {
    const response = await checkIfFileExists(embedData.path, context);
    return {
      resource: 'file',
      status: 'success',
      embedData,
      seq: index,
      data: { exists: response },
    };
  } catch (e) {
    return {
      resource: 'file',
      status: 'error',
      embedData,
      seq: index,
      message: 'Failed to check if file existed',
    };
  }
};

type FetchFunctions = {
  [K in EmbedMetaData['embedData']['resource']]:
    | Fetch<Extract<EmbedMetaData, { embedData: { resource: K } }>>
    | undefined;
};

const transformFuncs: Partial<FetchFunctions> = {
  image: imageMeta,
  audio: audioMeta,
  h5p: h5pMeta,
  external: externalMeta,
  iframe: iframeMeta,
  'code-block': codeMeta,
  brightcove: brightcoveMeta,
  'related-content': relatedContentMeta,
  concept: conceptMeta,
  'content-link': contentLinkMeta,
  'concept-list': conceptListMeta,
  file: fileListMeta,
};

export const transformEmbed = async (
  embed: CheerioEmbed,
  context: Context,
  index: number,
  opts: TransformOptions,
): Promise<void> => {
  let footnoteCount = 1;
  if (embed.data.resource === 'nrk') {
    embed.embed.replaceWith('');
    return;
  }
  const func = transformFuncs[embed.data.resource];
  if (func) {
    const meta = await func({
      // @ts-ignore
      embedData: embed.data as Parameters<typeof func>[0]['embedData'],
      cheerio: embed.embed,
      context,
      index,
      opts,
    });
    embed.embed.attr('data-json', JSON.stringify(meta));
    return;
  } else if (embed.data.resource === 'footnote') {
    const meta = await footnoteMeta(embed.data, context, index, footnoteCount);
    embed.embed.attr('data-json', JSON.stringify(meta));
    footnoteCount += 1;
    return;
  }
};
