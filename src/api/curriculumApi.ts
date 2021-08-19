/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import he from 'he';
import { reject } from 'lodash';
import { Response } from 'node-fetch';
import { fetch, resolveJson } from '../utils/apiHelpers';
import {
  isoLanguageMapping,
  curriculumLanguageMapping,
} from '../utils/mapping';

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
  'tilhoerer-laereplan': Reference;
  'tilhoerer-kompetansemaalsett': Reference;
  'tilknyttede-tverrfaglige-temaer': Element[];
  'tilknyttede-kjerneelementer': Element[];
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

interface Name {
  scopes: string[];
  name: string;
  isLanguageNeutral: boolean;
}

interface CompetenceAim {
  id: string;
  links: { parents: string[] };
  names: Name[];
}

interface CurriculumRelation {
  curriculumId: string;
  competenceAim: CompetenceAim;
}

interface Resource {
  resource: {
    relations: CurriculumRelation[];
  };
}

interface Curriculum {
  curriculum: {
    id: string;
    names: Name[];
  };
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
  'tilhoerer-laereplan': Reference;
}

interface CrossSubjectTopic {
  id: string;
  kode: string;
  tittel: Text[];
  'lenke-til-beskrivelse': string;
}

async function curriculumFetch(
  path: string,
  context: Context,
  options?: RequestOptions,
): Promise<Response> {
  throw Error('GREP is disabled');
  // return fetch(path, context, { timeout: 1, ...options });
}

function mapReference(reference: Reference) {
  return {
    id: reference.kode,
    code: reference.kode,
    title: reference.tittel,
  };
}

function mapElements(elements: Element[]) {
  return elements.map(element => ({
    reference: mapReference(element.referanse),
    explanation: element.forklaring,
  }));
}

function htmlToText(html: string) {
  return he.decode(html).replace(/<[^>]*>?/gm, '');
}

function filterTextsForLanguage(texts: Text[], language: string) {
  const isoCode = isoLanguageMapping[language] || 'default';
  const text =
    texts.find(t => t.spraak === isoCode) ||
    texts.find(t => t.spraak === 'default');
  return text.verdi;
}

function findNameForAcceptLanguage(names: Name[], language: string) {
  // find fallback name language
  const { name: fallbackName } = names.find(
    nameObj => nameObj.isLanguageNeutral === true,
  );

  // Try to find competenceAim name for language
  const competenceAimI18N = names.find(
    nameObj => nameObj.scopes[0] === curriculumLanguageMapping[language],
  );

  const name = competenceAimI18N ? competenceAimI18N.name : fallbackName;
  return name;
}

export async function fetchCompetenceGoals(
  codes: string[],
  nodeId: string,
  language: string,
  context: Context,
): Promise<GQLCompetenceGoal[]> {
  return [
    ...(codes ? await fetchLK20CompetenceGoals(codes, language, context) : []),
    ...(nodeId ? await fetchLK06CompetenceGoals(nodeId, context) : []),
  ];
}

export async function fetchLK20CompetenceGoal(
  code: string,
  language: string,
  context: Context,
): Promise<GQLCompetenceGoal> {
  const lang = language || context.language;
  const response = await curriculumFetch(
    `/grep/kl06/v201906/kompetansemaal-lk20/${code}`,
    context,
  );
  const json: CompetenceGoal = await resolveJson(response);
  return {
    id: json.kode,
    title: `${filterTextsForLanguage(json.tittel.tekst, lang)} (${json.kode})`,
    type: 'LK20',
    code: json.kode,
    language: lang,
    curriculumCode: json['tilhoerer-laereplan'].kode,
    competenceGoalSetCode: json['tilhoerer-kompetansemaalsett'].kode,
    crossSubjectTopicsCodes: mapElements(
      json['tilknyttede-tverrfaglige-temaer'],
    ),
    coreElementsCodes: mapElements(json['tilknyttede-kjerneelementer']),
  };
}

export async function fetchLK20CompetenceGoals(
  codes: string[],
  language: string,
  context: Context,
): Promise<GQLCompetenceGoal[]> {
  return Promise.all(
    codes
      .filter(code => code.startsWith('KM'))
      .map(code => fetchLK20CompetenceGoal(code, language, context)),
  );
}

export async function fetchCoreElement(
  code: string,
  language: string,
  context: Context,
): Promise<GQLCoreElement> {
  const lang = language || context.language;
  const response = await curriculumFetch(
    `/grep/kl06/v201906/kjerneelementer-lk20/${code}`,
    context,
  );
  const json: CoreElement = await resolveJson(response);
  return {
    id: json.kode,
    title: `${filterTextsForLanguage(json.tittel.tekst, lang)} (${json.kode})`,
    description: htmlToText(
      filterTextsForLanguage(json.beskrivelse.tekst, lang),
    ),
    language: lang,
    curriculumCode: json['tilhoerer-laereplan'].kode,
  };
}

export async function fetchCoreElements(
  codes: string[],
  language: string,
  context: Context,
): Promise<GQLCoreElement[]> {
  return Promise.all(
    codes
      .filter(code => code.startsWith('KE'))
      .map(code => fetchCoreElement(code, language, context)),
  );
}

export async function fetchGrepElement(
  code: string,
  language: string,
  url: string,
  context: Context,
): Promise<GQLReference> {
  const lang = language || context.language;
  const response = await curriculumFetch(`${url}${code}`, context);
  const json: GrepElement = await resolveJson(response);

  const title = filterTextsForLanguage(json.tittel.tekst, lang);

  return {
    code: json.kode,
    id: json.kode,
    title,
  };
}

async function fetchCoreElementReference(
  code: string,
  language: string,
  context: Context,
): Promise<GQLReference> {
  return fetchGrepElement(
    code,
    language,
    '/grep/kl06/v201906/kjerneelementer-lk20/',
    context,
  );
}

export async function fetchCoreElementReferences(
  codes: GQLElement[],
  language: string,
  context: Context,
): Promise<GQLElement[]> {
  return Promise.all(
    codes.map(async code => {
      return {
        reference: await fetchCoreElementReference(
          code.reference.code,
          language,
          context,
        ),
        explanation: code.explanation,
      };
    }),
  );
}

async function fetchCrossSubjectTopic(
  code: string,
  language: string,
  context: Context,
): Promise<GQLReference> {
  return fetchGrepElement(
    code,
    language,
    '/grep/kl06/v201906/tverrfaglige-temaer-lk20/',
    context,
  );
}

export async function fetchCrossSubjectTopicsByCode(
  codes: string[],
  language: string,
  context: Context,
): Promise<GQLReference[]> {
  return Promise.all(
    codes.map(async code => {
      const response = await curriculumFetch(
        `/grep/kl06/v201906/tverrfaglige-temaer-lk20/${code}`,
        context,
      );
      const json: CrossSubjectTopic = await resolveJson(response);

      const title = filterTextsForLanguage(json.tittel, language);

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
  language: string,
  context: Context,
): Promise<GQLElement[]> {
  return Promise.all(
    codes.map(async code => {
      return {
        reference: await fetchCrossSubjectTopic(
          code.reference.code,
          language,
          context,
        ),
        explanation: code.explanation,
      };
    }),
  );
}

export async function fetchCompetenceSet(
  code: string,
  language: string,
  context: Context,
): Promise<GQLReference> {
  return fetchGrepElement(
    code,
    language,
    '/grep/kl06/v201906/kompetansemaalsett-lk20/',
    context,
  );
}

export async function fetchLK20Curriculum(
  code: string,
  language: string,
  context: Context,
): Promise<GQLReference> {
  return fetchGrepElement(
    code,
    language,
    '/grep/kl06/v201906/laereplaner-lk20/',
    context,
  );
}

export async function fetchLK06CompetenceGoals(
  nodeId: string,
  context: Context,
): Promise<GQLCompetenceGoal[]> {
  const response = await fetch(
    `http://mycurriculum.ndla.no/v1/users/ndla/resources?psi=http://ndla.no/node/${nodeId}`,
    context,
  );
  const json: Resource = await resolveJson(response);
  const competenceGoals = json.resource.relations.map(relation => ({
    id: relation.competenceAim.id,
    title: `${findNameForAcceptLanguage(
      relation.competenceAim.names,
      context.language,
    )} (${relation.competenceAim.id})`,
    type: 'LK06',
    curriculumId: relation.curriculumId,
    parentLinks: relation.competenceAim.links.parents,
  }));
  return competenceGoals;
}

export async function fetchLK06Curriculum(
  curriculumId: string,
  context: Context,
): Promise<GQLReference> {
  const response = await fetch(
    `https://mycurriculum.ndla.no/v1/users/ndla/curriculums/${curriculumId}`,
    context,
  );
  const json: Curriculum = await resolveJson(response);
  const curriculum = json.curriculum;

  const title = findNameForAcceptLanguage(curriculum.names, context.language);

  return {
    id: curriculum.id,
    title,
  };
}
