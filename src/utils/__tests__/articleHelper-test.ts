/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { expect, test } from "vitest";
import { isNDLAEmbedUrl, getArticleIdFromUrn, getLearningpathIdFromUrn } from "../articleHelpers";

const testNdlaFrontendUrl =
  "https://ndla-frontend.test.api.ndla.no/nb/subject:bfe6d0b2-fa5d-4962-84d7-796dedb099ff/topic:1:185608/resource:1:123925";
const stagingNdlaFrontendUrl =
  "https://ndla-frontend.staging.api.ndla.no/nb/subject:bfe6d0b2-fa5d-4962-84d7-796dedb099ff/topic:1:185608/resource:1:123925";

const stagingNdlanEnvUrl =
  "https://staging.ndla.no/nb/subject:bfe6d0b2-fa5d-4962-84d7-796dedb099ff/topic:1:185608/resource:1:123925";
const testNdlanEnvUrl =
  "https://test.ndla.no/nb/subject:bfe6d0b2-fa5d-4962-84d7-796dedb099ff/topic:1:185608/resource:1:123925";

const prodUrl = "https://ndla.no/nb/subject:bfe6d0b2-fa5d-4962-84d7-796dedb099ff/topic:1:185608/resource:1:123925";

const testWWWUrl =
  "https://www.test.api.ndla.no/nb/subject:bfe6d0b2-fa5d-4962-84d7-796dedb099ff/topic:1:185608/resource:1:123925";
const stagingWWWUrl =
  "https://www.staging.api.ndla.no/nb/subject:bfe6d0b2-fa5d-4962-84d7-796dedb099ff/topic:1:185608/resource:1:123925";
const prodWWWUrl =
  "https://www.ndla.no/nb/subject:bfe6d0b2-fa5d-4962-84d7-796dedb099ff/topic:1:185608/resource:1:123925";

test("NDLA Urls should be true in isNDLAEmbedUrl function", async () => {
  expect(isNDLAEmbedUrl(testNdlaFrontendUrl)).toBe(true);
  expect(isNDLAEmbedUrl(testWWWUrl)).toBe(true);
  expect(isNDLAEmbedUrl(testNdlanEnvUrl)).toBe(true);
  expect(isNDLAEmbedUrl(stagingNdlaFrontendUrl)).toBe(true);
  expect(isNDLAEmbedUrl(stagingWWWUrl)).toBe(true);
  expect(isNDLAEmbedUrl(stagingNdlanEnvUrl)).toBe(true);
  expect(isNDLAEmbedUrl(prodUrl)).toBe(true);
  expect(isNDLAEmbedUrl(prodWWWUrl)).toBe(true);
});

test("Random Urls should be false in isNDLAEmbedUrl function", async () => {
  expect(isNDLAEmbedUrl("https://www.youtube.com/watch?v=fwwefwfw")).toBe(false);
  expect(isNDLAEmbedUrl("https://norge.no")).toBe(false);
  expect(isNDLAEmbedUrl("https://www.norge.no")).toBe(false);
  expect(isNDLAEmbedUrl("https://www")).toBe(false);
  expect(isNDLAEmbedUrl("https://")).toBe(false);
  expect(isNDLAEmbedUrl("")).toBe(false);
  expect(isNDLAEmbedUrl("this is a random string containing https://ndla.no")).toBe(false);
});

test("getArticleIdFromUrn urn:article:1 is 1", async () => {
  expect(getArticleIdFromUrn("urn:article:1")).toBe("1");
});

test("getLearningpathIdFromUrn urn:learningpath:1 is 1", async () => {
  expect(getLearningpathIdFromUrn("urn:learningpath:1")).toBe("1");
});
