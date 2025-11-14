/**
 * Copyright (c) 2020-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { describe, expect, test } from "vitest";
import { getNumberId, licenseFixer } from "../apiHelpers";

test("license C converts to COPYRIGHTED", async () => {
  expect(licenseFixer("C", "4.0")).toBe("COPYRIGHTED");
});

test("license PD converts to PD", async () => {
  expect(licenseFixer("PD", "4.0")).toBe("PD");
});

test("license CC BY converts to CC-BY-4.0", async () => {
  expect(licenseFixer("CC BY", "4.0")).toBe("CC-BY-4.0");
});

describe("getNumberId", () => {
  test("returns number when given number", () => {
    expect(getNumberId(42)).toBe(42);
  });
  test("returns undefined when given undefined", () => {
    expect(getNumberId(undefined)).toBeUndefined();
  });
  test("returns undefined when given null", () => {
    expect(getNumberId(null)).toBeUndefined();
  });
  test("returns undefined when given empty string", () => {
    expect(getNumberId("")).toBeUndefined();
  });
  test("returns number when given numeric string", () => {
    expect(getNumberId("42")).toBe(42);
  });
  test("returns undefined when given non-numeric string", () => {
    expect(getNumberId("abc")).toBeUndefined();
  });
  test("returns undefined when given string that starts with a number but doesn't end with one", () => {
    expect(getNumberId("42abc")).toBeUndefined();
  });
  test("returns undefined when given string that ends with a number but doesn't start with one", () => {
    expect(getNumberId("abc42")).toBeUndefined();
  });
  test("returns undefined when given float string", () => {
    expect(getNumberId("42.5")).toBeUndefined();
  });
});
