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
