/**
 * Copyright (c) 2026-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { describe, expect, it } from "vitest";
import parseMarkdown from "../parseMarkdown";

describe("markdown parsing", () => {
  it("only parses inline markdown if specified", () => {
    const markdown = `
# My heading
This is a **bold** text with a [link](https://example.com).
      
- List item 1
- List item 2
    `;
    const expected = `# My heading<br />This is a <strong>bold</strong> text with a <a href="https://example.com">link</a>.<br /><br />- List item 1<br />- List item 2`;
    const res = parseMarkdown({ markdown, inline: true });
    expect(res).toBe(expected);
  });
  it("correctly parses block markdown", () => {
    const markdown = `
# My heading
This is a **bold** text with a [link](https://example.com).
      
- List item 1
- List item 2
    `;
    const expected = `<h1>My heading</h1>
<p>This is a <strong>bold</strong> text with a <a href="https://example.com">link</a>.</p>
<ul>
<li>List item 1</li>
<li>List item 2</li>
</ul>
`;
    const res = parseMarkdown({ markdown, inline: false });
    expect(res).toBe(expected);
  });
  it("automatically trims whitespace around block markdown", () => {
    const markdown = " # My heading ";
    const expected = "<h1>My heading</h1>\n";
    const res = parseMarkdown({ markdown });
    expect(res).toBe(expected);
  });
  it("automatically trims whitespace around inline markdown", () => {
    const markdown = " *Pay attention* ";
    const expected = "<em>Pay attention</em>";
    const res = parseMarkdown({ markdown, inline: true });
    expect(res).toBe(expected);
  });
  //
  it("supports subscript and superscript", () => {
    const markdown = "This is superscript ^text^ and this is subscript ~text~.";
    const expected = "This is superscript <sup>text</sup> and this is subscript <sub>text</sub>.";
    const res = parseMarkdown({ markdown, inline: true });
    expect(res).toBe(expected);
  });
});
