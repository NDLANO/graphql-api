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
  ImageEmbedData,
} from '@ndla/types-embed';
import { load } from 'cheerio';
import { getEnvironmentVariabel } from '../config';
import { GQLQueryResourceEmbedArgs, GQLResourceEmbed } from '../types/schema';
import { getEmbedsFromContent } from '../utils/getEmbedsFromContent';
import { toArticleMetaData } from '../utils/toArticleMetaData';
import { transformEmbed } from './embedsApi';

const accountId = getEnvironmentVariabel('BRIGHTCOVE_ACCOUNT_ID', '123456789');

const toEmbed = (
  id: string,
  type: string,
):
  | BrightcoveEmbedData
  | ImageEmbedData
  | AudioEmbedData
  | ConceptEmbedData
  | null => {
  if (type === 'video') {
    return {
      resource: 'brightcove',
      videoid: id,
      account: accountId,
      title: '',
      caption: '',
      player: 'default',
    };
  } else if (type === 'image') {
    return {
      resource: 'image',
      resourceId: id,
      alt: '',
    };
  } else if (type === 'audio') {
    return {
      resource: 'audio',
      resourceId: id,
      type: 'audio',
      url: '',
    };
  } else if (type === 'concept') {
    return {
      resource: 'concept',
      contentId: id,
      type: 'block',
      linkText: '',
    };
  } else {
    return null;
  }
};

const attributeRegex = /[A-Z]/g;

export const toHtml = (data: EmbedData): string => {
  const entries = Object.entries(data ?? {});
  const dataSet = entries.reduce<string>((acc, [key, value]) => {
    const newKey = key.replace(attributeRegex, m => `-${m.toLowerCase()}`);
    return acc.concat(`data-${newKey}="${value.toString()}" `);
  }, '');

  return `<html><body><ndlaembed ${dataSet}></ndlaembed></body></html>`;
};

export const fetchResourceEmbed = async (
  params: GQLQueryResourceEmbedArgs,
  context: ContextWithLoaders,
): Promise<GQLResourceEmbed> => {
  const embed = toEmbed(params.id, params.type);
  if (!embed) {
    throw new Error('Unsupported embed');
  }

  const content = toHtml(embed);
  const html = load(content, {
    xmlMode: false,
    decodeEntities: false,
  });
  const embeds = getEmbedsFromContent(html)[0];
  const embedPromise = await transformEmbed(embeds, context, 0, 0, {
    shortCircuitOnError: true,
  });

  const metadata = toArticleMetaData([embedPromise]);

  return {
    meta: metadata,
    content: html('body').html() ?? '',
  };
};
