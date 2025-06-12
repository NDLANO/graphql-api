/**
 * Copyright (c) 2022-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { expect, test } from "vitest";
import { isoLanguageMapping } from "../mapping";

test("isoLanguageMapping should work", () => {
  expect(isoLanguageMapping["nn"]).toBe("nno");
  expect(isoLanguageMapping["nb"]).toBe("nob");
  expect(isoLanguageMapping["no"]).toBe("nob");
});
