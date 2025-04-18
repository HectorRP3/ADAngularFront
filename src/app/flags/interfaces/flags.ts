import { JokeResourceInsert } from '../../jokes/interfaces/jokes';

export interface flagInsert {
  flag: string;
  jokeses?: number[];
}
export interface Flag extends flagInsert {
  id: number;
}

export interface FlagResource {
  id: number;
  flag: string;
}

export interface flagInsert2 {
  id: number;
  flag: string;
  jokeses?: JokeResourceInsert[];
}
