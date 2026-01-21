/**
 * Copyright (c) 2026-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { describe, expect, it } from "vitest";
import { withCustomContext } from "../context/contextStore";
import { getCacheKey } from "../../cache";

describe("Cache", () => {
  it("should include version hash in cache key when provided in taxonomy calls", () => {
    const url = "https://api.test.ndla.no/taxonomy/v1/resourceTypes?language=nb&versionHash=a24";
    const res = withCustomContext({ versionHash: "a24" }, (ctx) => getCacheKey(url, ctx, true));
    expect(res).toEqual(`${url}_a24`);
  });

  it("can be called to ignore version hash by wrapping in withCustomContext", () => {
    const url = "https://api.test.ndla.no/taxonomy/v1/resourceTypes?language=nb";
    const res = withCustomContext({ versionHash: "a24" }, (ctx) => {
      return withCustomContext({ ...ctx, versionHash: undefined }, (innerCtx) => getCacheKey(url, innerCtx, true));
    });

    expect(res).toEqual(url);
  });
});
