import { Joke } from './jokes';

export interface SingleJokeResponse {
  joke: Joke;
}

export interface JokesResponse {
  jokes: Joke[];
}

export interface LanguagesResponse {
  languages: languages[];
}

export interface languages {
  id: number;
  code: string;
  language: string;
}
export interface types {
  id: number;
  type: string;
}
export interface TypesResponse {
  types: types[];
}
export interface CategoriesResponse {
  categories: Categories[];
}
export interface Categories {
  id: number;
  category: string;
}
