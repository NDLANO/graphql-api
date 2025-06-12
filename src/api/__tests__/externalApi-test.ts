/**
 * Copyright (c) 2025-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { expect, test } from "vitest";
import { getYoutubeVideoId } from "../externalApi";

test("getYoutubeVideoId handles different urls", () => {
  expect(getYoutubeVideoId("https://www.youtube.com/watch?v=ly36kn0ug4k")).toBe("ly36kn0ug4k");
  expect(getYoutubeVideoId("https://youtu.be/ly36kn0ug4k?si=_fLP-gs9GmqXMtGQ")).toBe("ly36kn0ug4k");

  expect(getYoutubeVideoId("https://ndla.no/minndla")).toBe("");
  expect(getYoutubeVideoId("some random string")).toBe("");
  expect(getYoutubeVideoId("")).toBe("");
});
