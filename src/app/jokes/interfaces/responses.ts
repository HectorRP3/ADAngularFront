import { Joke } from './jokes';

export interface SingleJokeResponse {
  joke: Joke;
}

export interface JokesResponse {
  jokes: Joke[];
}
