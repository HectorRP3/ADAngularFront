import { FlagResource } from '../../flags/interfaces/flags';
import { Categories } from '../../shared/interfaces/categories';
import { Language } from '../../shared/interfaces/language';
import { Types } from '../../shared/interfaces/types';

export interface JokeInsert {
  text1?: string;
  text2?: string;
  categories?: Categories;
  types?: Types;
  language?: Language;
  flagses?: FlagResource[];
}

export interface Joke extends JokeInsert {
  id: number;
}

export interface JokeResource {
  id: number;
  text1?: string;
  text2?: string;
  category: string;
  type: string;
  language: string;
  flags: string[];
}
