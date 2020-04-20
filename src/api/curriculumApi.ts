/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { fetch, resolveJson } from '../utils/apiHelpers';
import { isoLanguageMapping } from '../utils/mapping';

interface Title {
  spraak: string;
  verdi: string;
}

interface CompetenceGoal {
  id: string;
  kode: string;
  tittel: {
    tekst: Title[];
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

function mapReference(reference: Reference) {
  return {
    id: reference.id,
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

function filterTitleForLanguage(titles: Title[], language: string) {
  const isoCode = isoLanguageMapping[language.substring(0, 2)] || 'default';
  let title = titles.find(title => title.spraak === isoCode);
  if (!title) {
    title = titles.find(title => title.spraak === 'default');
  }
  return title.verdi;
}

export async function fetchCompetenceGoal(
  code: string,
  context: Context,
): Promise<GQLCompetenceGoal> {
  const response = await fetch(
    `https://data.udir.no/kl06/v201906/kompetansemaal-lk20/${code}`,
    context,
  );
  const json: CompetenceGoal = await resolveJson(response);
  return {
    id: json.id,
    code: json.kode,
    title: filterTitleForLanguage(json.tittel.tekst, context.language),
    curriculum: mapReference(json['tilhoerer-laereplan']),
    competenceGoalSet: mapReference(json['tilhoerer-kompetansemaalsett']),
    crossSubjectTopics: mapElements(json['tilknyttede-tverrfaglige-temaer']),
    coreElements: mapElements(json['tilknyttede-tverrfaglige-temaer']),
  };
}

export async function fetchCompetenceGoals(
  codes: string[],
  context: Context,
): Promise<GQLCompetenceGoal[]> {
  return Promise.all(codes.filter(code => code.startsWith('KM')).map(code => fetchCompetenceGoal(code, context)));
}
