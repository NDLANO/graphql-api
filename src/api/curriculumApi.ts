/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import he from 'he';
import { fetch, resolveJson } from '../utils/apiHelpers';
import {
  isoLanguageMapping,
  curriculumLanguageMapping,
} from '../utils/mapping';

interface Text {
  spraak: string;
  verdi: string;
}

interface CompetenceGoal {
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

interface CoreElement {
  id: string;
  kode: string;
  tittel: {
    tekst: Text[];
  };
  beskrivelse: {
    tekst: Text[];
  };
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
  const isoCode = isoLanguageMapping[language.substring(0, 2)] || 'default';
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
  context: Context,
): Promise<GQLCompetenceGoal[]> {
  return [
    ...(codes ? await fetchLK20CompetenceGoals(codes, context) : []),
    ...(nodeId ? await fetchLK06CompetenceGoals(nodeId, context) : []),
  ];
}

export async function fetchLK20CompetenceGoal(
  code: string,
  context: Context,
): Promise<GQLCompetenceGoal> {
  const response = await fetch(
    `https://data.udir.no/kl06/v201906/kompetansemaal-lk20/${code}`,
    context,
  );
  const json: CompetenceGoal = await resolveJson(response);
  return {
    id: json.kode,
    title: `${filterTextsForLanguage(json.tittel.tekst, context.language)} (${
      json.kode
    })`,
    type: 'LK20',
    code: json.kode,
    curriculum: mapReference(json['tilhoerer-laereplan']),
    competenceGoalSet: mapReference(json['tilhoerer-kompetansemaalsett']),
    crossSubjectTopics: mapElements(json['tilknyttede-tverrfaglige-temaer']),
    coreElements: mapElements(json['tilknyttede-tverrfaglige-temaer']),
  };
}

export async function fetchLK20CompetenceGoals(
  codes: string[],
  context: Context,
): Promise<GQLCompetenceGoal[]> {
  return Promise.all(
    codes
      .filter(code => code.startsWith('KM'))
      .map(code => fetchLK20CompetenceGoal(code, context)),
  );
}

export async function fetchCoreElement(
  code: string,
  context: Context,
): Promise<GQLCoreElement> {
  const response = await fetch(
    `https://data.udir.no/kl06/v201906/kjerneelementer-lk20/${code}`,
    context,
  );
  const json: CoreElement = await resolveJson(response);
  return {
    id: json.kode,
    title: `${filterTextsForLanguage(json.tittel.tekst, context.language)} (${
      json.kode
    })`,
    description: htmlToText(
      filterTextsForLanguage(json.beskrivelse.tekst, context.language),
    ),
  };
}

export async function fetchCoreElements(
  codes: string[],
  context: Context,
): Promise<GQLCoreElement[]> {
  return Promise.all(
    codes
      .filter(code => code.startsWith('KE'))
      .map(code => fetchCoreElement(code, context)),
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

export async function fetchCurriculum(
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
