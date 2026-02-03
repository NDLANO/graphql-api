/**
 * Copyright (c) 2023-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { EmbedData } from "@ndla/types-embed";
import { Cheerio, CheerioAPI } from "cheerio";

export interface CheerioEmbed {
  embed: Cheerio<any>;
  data: EmbedData;
}

export const getEmbedsFromContent = (html: CheerioAPI): CheerioEmbed[] => {
  return html("ndlaembed")
    .toArray()
    .map((embed) => ({
      embed: html(embed),
      // Cheerio automatically converts number-like strings to numbers, which in turn can break html-react-parser.
      // Seeing as article-converter expects to only receive strings for embed data, we need to convert all numbers to strings (again).
      data: Object.entries(html(embed).data()).reduce((acc, [key, value]) => {
        //@ts-expect-error - this is hard to type
        acc[key] = typeof value === "number" || typeof value === "boolean" ? `${value}` : value;
        return acc;
      }, {}) as EmbedData,
    }));
};
