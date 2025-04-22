export interface PrimeraVezJokes {
  id: number;
  programa: string;
  fechaEmision: string;
  telefonoses: string[];
  jokes: number;
}

export interface PrimeraVezJokesInsert {
  programa: string;
  fechaEmision: string;
  telefonoses: string[];
  jokes: number;
}

export interface PrimeraVezJokesUpdate {
  id: number;
  programa: string;
  fechaEmision: string;
  telefonoses: string[];
  jokes: number;
}
