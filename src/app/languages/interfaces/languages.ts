export interface Language extends LanguageInsert {
  id: number;
}

export interface LanguageInsert {
  code: string;
  language: string;
}
