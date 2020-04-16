/**
 * Copyright (c) 2019-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { fetch, resolveJson } from '../utils/apiHelpers';
import { curriculumLanguageMapping, isoLanguageMapping } from '../utils/mapping';

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

interface Title {
  spraak: string;
  verdi: string;
}

interface CompetenceGoal {
  id: string;
  kode: string;
  tittel: {
    tekst: Title[];
  }
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

function filterTitleForLanguage(titles: Title[], language: string) {
  const isoCode = isoLanguageMapping[language.substring(0,2)] || 'default';
  let title = titles.find(title => title.spraak === isoCode);
  if (!title) {
    title = titles.find(title => title.spraak === 'default');
  }
  return title.verdi;
}

export async function fetchCurriculum(
  curriculumId: string,
  context: Context,
): Promise<GQLCompetenceCurriculum> {
  const response = await fetch(
    `https://mycurriculum.ndla.no/v1/users/ndla/curriculums/${curriculumId}`,
    context,
  );
  const json: Curriculum = await resolveJson(response);
  const curriculum = json.curriculum;

  const name = findNameForAcceptLanguage(curriculum.names, context.language);

  return {
    id: curriculum.id,
    name,
  };
}

export async function fetchCompetenceGoals(
  nodeId: string,
  context: Context,
): Promise<GQLCompetenceGoal[]> {
  const response = await fetch(
    `http://mycurriculum.ndla.no/v1/users/ndla/resources?psi=http://ndla.no/node/${nodeId}`,
    context,
  );
  const json: Resource = await resolveJson(response);

  const competenceGoals = json.resource.relations.map(relation => {
    const name = findNameForAcceptLanguage(
      relation.competenceAim.names,
      context.language,
    );

    return {
      id: relation.competenceAim.id,
      curriculumId: relation.curriculumId,
      name,
      parentLinks: relation.competenceAim.links.parents,
    };
  });

  return competenceGoals;
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
    curriculumId: json.kode,
    name: filterTitleForLanguage(json.tittel.tekst, context.language)
  }
}
