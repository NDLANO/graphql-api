/**
 * Copyright (c) 2023-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Cheerio, CheerioAPI } from "cheerio";
import { EmbedData } from "@ndla/types-embed";

export interface CheerioEmbed {
  embed: Cheerio<any>;
  data: EmbedData;
}

export const getEmbedsFromContent = (html: CheerioAPI): CheerioEmbed[] => {
  return html("ndlaembed")
    .toArray()
    .map((embed) => ({
      embed: html(embed),
      data: html(embed).data() as EmbedData,
    }));
};
