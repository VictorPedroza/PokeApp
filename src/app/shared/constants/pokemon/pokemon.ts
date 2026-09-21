export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  types: {
    type: { name: string };
  }[];
}

export interface PokemonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
  }[];
}

// Interface para mapear o retorno do endpoint /type/{name}
export interface PokemonTypeResponse {
  pokemon: {
    pokemon: {
      name: string;
      url: string;
    };
  }[];
}

export type PokemonType =
  | 'normal'
  | 'fighting'
  | 'flying'
  | 'poison'
  | 'ground'
  | 'rock'
  | 'bug'
  | 'ghost'
  | 'steel'
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'psychic'
  | 'ice'
  | 'dragon'
  | 'dark'
  | 'fairy'
  | 'stellar'
  | 'unknown';

export const PokemonTypes: PokemonType[] = [
  'normal',
  'fighting',
  'flying',
  'poison',
  'ground',
  'rock',
  'bug',
  'ghost',
  'steel',
  'fire',
  'water',
  'grass',
  'electric',
  'psychic',
  'ice',
  'dragon',
  'dark',
  'fairy',
  'stellar',
  'unknown',
];
