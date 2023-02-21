/**
 * Copyright (c) 2023-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { IConcept, IConceptSummary } from '@ndla/types-concept-api';
import { ConceptVisualElementMeta, EmbedMetaData } from '@ndla/types-embed';
import { IImageMetaInformationV2 } from '@ndla/types-image-api';
import sortBy from 'lodash/sortBy';
import { listingUrl } from '../config';
import {
  GQLArticleMetaData,
  GQLAudioLicense,
  GQLBrightcoveLicense,
  GQLConceptLicense,
  GQLCopyright,
  GQLFootNote,
  GQLH5pLicense,
  GQLImageLicense,
  GQLPodcastLicense,
} from '../types/schema';
import { licenseFixer, roleMapper } from './apiHelpers';

type Success<T extends EmbedMetaData['resource']> = Extract<
  EmbedMetaData,
  { resource: T; status: 'success' }
>;

const footnoteMetaData = (
  { embedData, data }: Success<'footnote'>,
  acc: MetaData,
) => {
  acc['footnotes'] = acc['footnotes'].concat({
    ...embedData,
    ref: data.entryNum,
    authors: data.authors,
    year: data.year,
  });
};

const imageMetaData = (data: IImageMetaInformationV2, acc: MetaData) => {
  acc['images'] = acc['images'].concat({
    title: data.title.title,
    altText: data.alttext.alttext,
    copyright: data.copyright,
    src: data.imageUrl,
  });
};

const audioMetaData = ({ data }: Success<'audio'>, acc: MetaData) => {
  if (data.podcastMeta) {
    acc['podcasts'] = acc['podcasts'].concat({
      title: data.title.title,
      copyright: data.copyright,
      src: data.audioFile.url,
      description: data.podcastMeta?.introduction,
    });
  } else {
    acc['audios'] = acc['audios'].concat({
      title: data.title.title,
      copyright: data.copyright,
      src: data.audioFile.url,
    });
  }

  if (data.imageMeta) {
    imageMetaData(data.imageMeta, acc);
  }
};

const brightcoveMetaData = (
  { data, embedData }: Success<'brightcove'>,
  acc: MetaData,
) => {
  const src = `https://players.brightcove.net/${embedData.account}/${embedData.player}_default/index.html?videoId=${embedData.videoid}`;
  const download = sortBy(
    data.sources.filter(src => src.container === 'MP4' && src.src),
    src => src.size,
  )?.[0]?.src;
  const source = sortBy(
    data.sources.filter(s => s.width && s.height),
    s => s.height,
  )?.[0];
  acc['brightcoves'] = acc['brightcoves'].concat({
    title: data.name ?? '',
    description: data.description ?? data['long_description'] ?? data.name,
    uploadDate: data['published_at'] ?? undefined,
    cover: data.images?.poster?.src,
    src,
    iframe: {
      src,
      height: source?.height ?? 480,
      width: source?.width ?? 640,
    },
    download,
    copyright: data.copyright,
  });
};

const h5pMetaData = ({ data, embedData }: Success<'h5p'>, acc: MetaData) => {
  const h5p = data.h5pLicenseInformation?.h5p;
  const copyright: GQLCopyright | undefined = h5p
    ? {
        license: {
          license: licenseFixer(h5p.license ?? '', h5p.licenseVersion ?? '4.0'),
          url: h5p.source ?? '',
          description: h5p.licenseExtras ?? '',
        },
        creators: [],
        processors: [],
        rightsholders: h5p.authors?.map(author => ({
          type: roleMapper(author.role ?? ''),
          name: author.name,
        })),
        origin: h5p.source ?? '',
      }
    : undefined;
  acc['h5ps'] = acc['h5ps'].concat({
    copyright: copyright,
    title: h5p?.title ?? embedData.title ?? '',
    thumbnail: h5p?.thumbnail ?? h5p?.assets?.[0]?.thumbnail ?? '',
    src: data.h5pUrl,
  });
};

const conceptMetaData = (
  concept: IConcept | IConceptSummary,
  visualElement: ConceptVisualElementMeta | undefined,
  acc: MetaData,
) => {
  acc['concepts'] = acc['concepts'].concat({
    title: concept.title.title,
    copyright: concept.copyright,
    src: `${listingUrl}/concepts/${concept.id}`,
  });
  if (visualElement?.status === 'success') {
    switch (visualElement.resource) {
      case 'brightcove':
        brightcoveMetaData(visualElement, acc);
        break;
      case 'image':
        imageMetaData(visualElement.data, acc);
        break;
      case 'h5p':
        h5pMetaData(visualElement, acc);
        break;
      case 'external': {
        if (visualElement.data.iframeImage) {
          imageMetaData(visualElement.data.iframeImage, acc);
        }
        break;
      }
    }
  }
};

interface MetaData {
  footnotes: GQLFootNote[];
  images: GQLImageLicense[];
  audios: GQLAudioLicense[];
  podcasts: GQLPodcastLicense[];
  brightcoves: GQLBrightcoveLicense[];
  h5ps: GQLH5pLicense[];
  concepts: GQLConceptLicense[];
}

export const toArticleMetaData = (
  embeds: (EmbedMetaData | undefined)[],
): GQLArticleMetaData => {
  return embeds.reduce<MetaData>(
    (acc, curr) => {
      if (!curr || curr.status === 'error') {
        return acc;
      }
      switch (curr.resource) {
        case 'footnote':
          footnoteMetaData(curr, acc);
          break;
        case 'image':
          imageMetaData(curr.data, acc);
          break;
        case 'audio':
          audioMetaData(curr, acc);
          break;
        case 'brightcove':
          brightcoveMetaData(curr, acc);
          break;
        case 'h5p':
          h5pMetaData(curr, acc);
          break;
        case 'concept':
          conceptMetaData(curr.data.concept, curr.data.visualElement, acc);
          break;
        case 'concept-list': {
          curr.data.concepts.forEach(c =>
            conceptMetaData(c.concept, c.visualElement, acc),
          );
          break;
        }
        case 'iframe':
        case 'external': {
          if (curr.data.iframeImage) {
            imageMetaData(curr.data.iframeImage, acc);
          }
          break;
        }
      }
      return acc;
    },
    {
      footnotes: [],
      images: [],
      audios: [],
      podcasts: [],
      brightcoves: [],
      h5ps: [],
      concepts: [],
    },
  );
};