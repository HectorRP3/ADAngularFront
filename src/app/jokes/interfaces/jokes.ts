export interface JokeInsert {
  text1?: string;
  text2?: string;
  category?: string;
  type?: string;
  language?: string;
  flags?: string[];
}

export interface Joke extends JokeInsert {
  id: number;
}
