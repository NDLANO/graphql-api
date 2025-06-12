/**
 * Copyright (c) 2024-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { beforeAll, expect, test, vi } from "vitest";
import { parseCaption } from "../embedsApi";

beforeAll(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
});

test("that punctuation is added to captions when missing", async () => {
  const result = parseCaption("Dette er en sterk apekatt");
  expect(result).toBe("Dette er en sterk apekatt.");
});

test("that punctuation is added to captions when missing with html", async () => {
  const result = parseCaption("Dette er en sterk <strong>apekatt</strong>");
  expect(result).toBe("Dette er en sterk <strong>apekatt.</strong>");
});

test("that punctuation is added to captions when missing with html in the middle", async () => {
  const result = parseCaption("Dette er en sterk <strong>apekatt</strong> din luring");
  expect(result).toBe("Dette er en sterk <strong>apekatt</strong> din luring.");
});

test("that punctuation is added to captions when space at the end", async () => {
  const result = parseCaption("Dette er en sterk <strong>apekatt</strong> din luring ");
  expect(result).toBe("Dette er en sterk <strong>apekatt</strong> din luring.");

  const result2 = parseCaption("Dette er en sterk <strong>apekatt </strong> ");
  expect(result2).toBe("Dette er en sterk <strong>apekatt.</strong>");
});

test("that punctuation is not added to captions when missing", async () => {
  const result1 = parseCaption("Dette er en sterk <strong>apekatt.</strong>");
  expect(result1).toBe("Dette er en sterk <strong>apekatt.</strong>");

  const result2 = parseCaption("Dette er en sterk <strong>apekatt</strong>?");
  expect(result2).toBe("Dette er en sterk <strong>apekatt</strong>?");

  const result3 = parseCaption("Dette er en sterk <strong>apekatt</strong>!");
  expect(result3).toBe("Dette er en sterk <strong>apekatt</strong>!");

  const result4 = parseCaption("Dette er en sterk <strong>apekatt!</strong>");
  expect(result4).toBe("Dette er en sterk <strong>apekatt!</strong>");
});
