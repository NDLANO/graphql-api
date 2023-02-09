/**
 *
 * Copyright (c) 2023-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { load } from 'cheerio';
import { getEmbedsFromContent } from '../utils/getEmbedsFromContent';
import { toArticleMetaData } from '../utils/toArticleMetaData';
import { transformEmbed } from './embedsApi';

interface TransformArticleOptions {
  subject?: string;
  previewH5p?: boolean;
  showVisualElement?: boolean;
  draftConcept?: boolean;
  absoluteUrl?: boolean;
}

export const transformArticle = async (
  content: string,
  context: Context,
  visualElement: string | undefined,
  {
    subject,
    previewH5p,
    showVisualElement,
    draftConcept,
    absoluteUrl,
  }: TransformArticleOptions,
) => {
  const html = load(content, {
    xmlMode: false,
    decodeEntities: false,
  });
  html('math').each((_, el) => {
    html(el)
      .attr('data-math', html(el).html() ?? '')
      .children()
      .replaceWith('');
  });
  if (showVisualElement && visualElement) {
    html('body').prepend(`<section>${visualElement}</section>`);
  }
  const embeds = getEmbedsFromContent(html);
  const embedPromises = await Promise.all(
    embeds.map((embed, index) =>
      transformEmbed(embed, context, index, {
        subject,
        previewH5p,
        draftConcept,
        absoluteUrl,
      }),
    ),
  );
  const metaData = toArticleMetaData(embedPromises);
  const transformedContent = html('body').html();

  return {
    metaData,
    content: transformedContent,
  };
};
