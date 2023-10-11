/**
 * Copyright (c) 2023-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Marked, TokenizerAndRendererExtension } from 'marked';
import sanitizeHtml from 'sanitize-html';

// https://github.com/markedjs/marked/issues/2709
const superscriptPlugin: TokenizerAndRendererExtension = {
  name: 'superscript',
  level: 'inline',
  start(src: string) {
    return src.indexOf('^');
  },
  tokenizer(src) {
    const match = src.match(/^\^(\w+)\^/);

    if (!match) {
      return;
    }

    return {
      type: 'superscript',
      raw: match[0],
      text: match[1],
    };
  },
  renderer(token) {
    return `<sup>${token.text}</sup>`;
  },
};

const subscriptPlugin: TokenizerAndRendererExtension = {
  name: 'subscript',
  level: 'inline',
  start(src) {
    return src.indexOf('~');
  },
  tokenizer(src) {
    const match = src.match(/^~(\w+)~/);

    if (!match) {
      return;
    }

    return {
      type: 'subscript',
      raw: match[0],
      text: match[1],
    };
  },
  renderer(token) {
    return `<sub>${token.text}</sub>`;
  },
};

const marked = new Marked({
  async: false,
  extensions: [subscriptPlugin, superscriptPlugin],
});

interface ParseOptions {
  inline?: boolean;
  markdown: string;
}

const parseMarkdown = ({ markdown, inline }: ParseOptions) => {
  const html = (inline
    ? marked.parseInline(markdown)
    : marked.parse(markdown)) as string;
  const sanitizedHtml = sanitizeHtml(html);
  return sanitizedHtml;
};

export default parseMarkdown;
