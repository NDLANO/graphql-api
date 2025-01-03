/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import he from "he";
import { Response } from "node-fetch";
import { GQLCompetenceGoal, GQLCoreElement, GQLElement, GQLReference } from "../types/schema";
import { fetch, resolveJson } from "../utils/apiHelpers";
import { isoLanguageMapping } from "../utils/mapping";

interface Text {
  spraak: string;
  verdi: string;
}

interface GrepElement {
  id: string;
  kode: string;
  tittel: {
    tekst: Text[];
  };
}

interface CompetenceGoal extends GrepElement {
  id: string;
  kode: string;
  tittel: {
    tekst: Text[];
  };
  "tilhoerer-laereplan": Reference;
  "tilhoerer-kompetansemaalsett": Reference;
  "tilknyttede-tverrfaglige-temaer": Element[];
  "tilknyttede-kjerneelementer": Element[];
}

interface CompetenceGoalSet extends GrepElement {
  id: string;
  kode: string;
  tittel: {
    tekst: Text[];
  };
  "tilhoerer-laereplan": Reference;
  kompetansemaal: Reference[];
}

interface Element {
  referanse: Reference;
  forklaring: string[];
}

interface Reference {
  id: string;
  kode: string;
  tittel: string;
}

interface CoreElement extends GrepElement {
  id: string;
  kode: string;
  tittel: {
    tekst: Text[];
  };
  beskrivelse: {
    tekst: Text[];
  };
  "tilhoerer-laereplan": Reference;
}

interface CrossSubjectTopic {
  id: string;
  kode: string;
  tittel: Text[];
  "lenke-til-beskrivelse": string;
}

async function curriculumFetch(path: string, context: Context, options?: RequestOptions): Promise<Response> {
  return fetch(path, context, { timeout: 3000, ...options });
}

function mapReference(reference: Reference) {
  return {
    id: reference.kode,
    code: reference.kode,
    title: reference.tittel,
  };
}

function mapElements(elements: Element[]) {
  return elements.map((element) => ({
    reference: mapReference(element.referanse),
    explanation: element.forklaring,
  }));
}

function htmlToText(html: string) {
  return he.decode(html).replace(/<[^>]*>?/gm, "");
}

function filterTextsForLanguage(texts: Text[], language: string) {
  const isoCode = isoLanguageMapping[language] || "default";
  const text = texts.find((t) => t.spraak === isoCode) || texts.find((t) => t.spraak === "default");
  return text?.verdi ?? "";
}

export async function fetchCompetenceGoals(
  codes: string[],
  language: string,
  context: Context,
): Promise<GQLCompetenceGoal[]> {
  return (codes ? fetchLK20CompetenceGoals(codes, language, context) : Promise.resolve<GQLCompetenceGoal[]>([])).catch(
    (reason) => {
      // This catch block makes fetching competence goals never fail but rather log the error and return an empty array.
      // eslint-disable-next-line no-console
      console.error(
        `Something went wrong when fetching competence goals, with params codes: '${codes}', language: '${language}':\n`,
        reason,
      );
      return Promise.resolve([]);
    },
  );
}

async function fetchLK20CompetenceGoal(code: string, language: string, context: Context): Promise<GQLCompetenceGoal> {
  const lang = language || context.language;
  const response = await curriculumFetch(`/grep/kl06/v201906/kompetansemaal-lk20/${code}`, context);
  // Fallback to empty object in case of timeout or 404
  const json: CompetenceGoal = await resolveJson(response, {});
  return {
    id: json.kode,
    title: `${filterTextsForLanguage(json.tittel?.tekst ?? [], lang)} (${json.kode})`,
    type: "LK20",
    code: json.kode,
    language: lang,
    curriculumCode: json["tilhoerer-laereplan"].kode,
    competenceGoalSetCode: json["tilhoerer-kompetansemaalsett"].kode,
    crossSubjectTopicsCodes: mapElements(json["tilknyttede-tverrfaglige-temaer"]),
    coreElementsCodes: mapElements(json["tilknyttede-kjerneelementer"]),
  };
}

async function fetchLK20CompetenceGoals(
  codes: string[],
  language: string,
  context: Context,
): Promise<GQLCompetenceGoal[]> {
  return Promise.all(
    codes.filter((code) => code.startsWith("KM")).map((code) => fetchLK20CompetenceGoal(code, language, context)),
  );
}

export async function fetchLK20CompetenceGoalSet(code: string, context: Context): Promise<string[]> {
  try {
    const response = await curriculumFetch(`/grep/kl06/v201906/kompetansemaalsett-lk20/${code}`, context);
    const json: CompetenceGoalSet = await resolveJson(response, {});
    return json?.kompetansemaal?.map((km) => km.kode) || [];
  } catch (reason) {
    // eslint-disable-next-line no-console
    console.error(
      `Something went wrong when fetching competence goal set, with params codes: '${code}', language: '${context.language}':\n`,
      reason,
    );
    return [];
  }
}

export async function fetchCoreElement(code: string, language: string, context: Context): Promise<GQLCoreElement> {
  const lang = language || context.language;
  const response = await curriculumFetch(`/grep/kl06/v201906/kjerneelementer-lk20/${code}`, context);
  const json: CoreElement = await resolveJson(response, {});
  return {
    id: json.kode,
    title: `${filterTextsForLanguage(json.tittel?.tekst ?? [], lang)} (${json.kode})`,
    description: htmlToText(filterTextsForLanguage(json.beskrivelse.tekst, lang)),
    language: lang,
    curriculumCode: json["tilhoerer-laereplan"].kode,
  };
}

export async function fetchCoreElements(
  codes: string[],
  language: string,
  context: Context,
): Promise<GQLCoreElement[]> {
  return Promise.all(
    codes.filter((code) => code.startsWith("KE")).map((code) => fetchCoreElement(code, language, context)),
  );
}

async function fetchGrepElement(
  code: string,
  language: string | undefined,
  url: string,
  context: Context,
): Promise<GQLReference> {
  const lang = language || context.language;
  const response = await curriculumFetch(`${url}${code}`, context);
  const json: GrepElement = await resolveJson(response, {});
  const title = filterTextsForLanguage(json.tittel?.tekst ?? [], lang);

  return {
    code: json.kode,
    id: json.kode,
    title,
  };
}

async function fetchCoreElementReference(
  code: string,
  language: string | undefined,
  context: Context,
): Promise<GQLReference> {
  return fetchGrepElement(code, language, "/grep/kl06/v201906/kjerneelementer-lk20/", context);
}

export async function fetchCoreElementReferences(
  codes: GQLElement[],
  language: string | undefined,
  context: Context,
): Promise<GQLElement[]> {
  const fetched = await Promise.all(
    codes.map(async (code) => {
      if (!code.reference.code) return undefined;
      return {
        reference: await fetchCoreElementReference(code.reference.code, language, context),
        explanation: code.explanation,
      };
    }),
  );

  return fetched.filter((f): f is GQLElement => !!f);
}

async function fetchCrossSubjectTopic(
  code: string,
  language: string | undefined,
  context: Context,
): Promise<GQLReference> {
  return fetchGrepElement(code, language, "/grep/kl06/v201906/tverrfaglige-temaer-lk20/", context);
}

export async function fetchCrossSubjectTopicsByCode(
  codes: string[],
  language: string,
  context: Context,
): Promise<GQLReference[]> {
  return Promise.all(
    codes.map(async (code) => {
      const response = await curriculumFetch(`/grep/kl06/v201906/tverrfaglige-temaer-lk20/${code}`, context);
      const json: CrossSubjectTopic = await resolveJson(response, {});

      const title = filterTextsForLanguage(json.tittel ?? [], language);

      return {
        code: json.kode,
        id: json.kode,
        title,
      };
    }),
  );
}

export async function fetchCrossSubjectTopics(
  codes: GQLElement[],
  language: string | undefined,
  context: Context,
): Promise<GQLElement[]> {
  const fetched = await Promise.all(
    codes.map(async (code) => {
      if (!code.reference.code) return undefined;
      return {
        reference: await fetchCrossSubjectTopic(code.reference.code, language, context),
        explanation: code.explanation,
      };
    }),
  );
  return fetched.filter((f): f is GQLElement => !!f);
}

export async function fetchCompetenceSet(
  code: string,
  language: string | undefined,
  context: Context,
): Promise<GQLReference> {
  return fetchGrepElement(code, language, "/grep/kl06/v201906/kompetansemaalsett-lk20/", context);
}

export async function fetchLK20Curriculum(
  code: string,
  language: string | undefined,
  context: Context,
): Promise<GQLReference> {
  return fetchGrepElement(code, language, "/grep/kl06/v201906/laereplaner-lk20/", context);
}
