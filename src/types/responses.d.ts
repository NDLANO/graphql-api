/**
 * Contains types for api responses. Useful when responses diverge from
 * schema.d.ts types.
 */
export {};

declare global {
  interface RSubjectCategory {
    id: String;
    filters: Array<String>;
  }

  interface RCategory {
    name: String;
    subjects: Array<RSubjectCategory>;
  }
  interface FrontpageResponse {
    topical: Array<String>;
    categories: Array<RCategory>;
  }
}

/* Curriculum/Competence types */
interface CompetenceAimName {
  scopes: string[];
  name: string;
  isLanguageNeutral: boolean;
}

interface CompetenceAim {
  id: string;
  links: { parents: string[] };
  names: CompetenceAimName[];
}

interface CurriculumRelation {
  curriculumId: string;
  competenceAim: CompetenceAim;
}

export interface CurriculumResource {
  resource: {
    relations: CurriculumRelation[];
  };
}
