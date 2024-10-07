/**
 * Copyright (c) 2023-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import nock from "nock";
import { getMockReq, getMockRes } from "@jest-mock/express";
import { fetchCompetenceGoals, fetchLK20CompetenceGoalSet } from "../curriculumApi";

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

const mockContext = () => {
  const { res } = getMockRes();
  return {
    shouldUseCache: false,
    language: "nb",
    taxonomyUrl: "http://ndla-api",
    req: getMockReq() as any,
    res: res as any,
  };
};

test("404 when fetching comptence goal should be handled", async () => {
  nock("https://api.test.ndla.no")
    .get(`/grep/kl06/v201906/kompetansemaal-lk20/KM123`)
    .reply(404, '<string xmlns="http://schemas.microsoft.com/2003/10/Serialization/">KM123 ble ikke funnet</string>');

  const response = await fetchCompetenceGoals(["KM123"], "nb", mockContext());

  expect(response).toStrictEqual([]);
});

test("200 with no json when fetching comptence goal should be handled", async () => {
  nock("https://api.test.ndla.no").get(`/grep/kl06/v201906/kompetansemaal-lk20/KM123`).reply(200, "<html>");

  const response = await fetchCompetenceGoals(["KM123"], "nb", mockContext());

  expect(response).toStrictEqual([]);
});

test("404 when fetching comptence goal set should be handled", async () => {
  nock("https://api.test.ndla.no")
    .get(`/grep/kl06/v201906/kompetansemaalsett-lk20/KV123`)
    .reply(404, '<string xmlns="http://schemas.microsoft.com/2003/10/Serialization/">KV123 ble ikke funnet</string>');

  const response = await fetchLK20CompetenceGoalSet("KV123", mockContext());

  expect(response).toStrictEqual([]);
});

test("200 with no json when fetching comptence goal set should be handled", async () => {
  nock("https://api.test.ndla.no").get(`/grep/kl06/v201906/kompetansemaalsett-lk20/KV123`).reply(200, "<html>");

  const response = await fetchLK20CompetenceGoalSet("KV123", mockContext());

  expect(response).toStrictEqual([]);
});

afterAll(() => {
  jest.restoreAllMocks();
});
