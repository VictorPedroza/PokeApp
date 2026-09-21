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
  generation: string;
  region: string;
}

export interface PokemonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
  }[];
}

export interface PokemonTypeResponse {
  pokemon: {
    pokemon: {
      name: string;
      url: string;
    };
  }[];
}

export interface PokemonSpeciesResponse {
  generation: {
    name: string;
  };
}

export const regions: Record<string, string> = {
  'generation-i': 'Kanto',
  'generation-ii': 'Johto',
  'generation-iii': 'Hoenn',
  'generation-iv': 'Sinnoh',
  'generation-v': 'Unova',
  'generation-vi': 'Kalos',
  'generation-vii': 'Alola',
  'generation-viii': 'Galar',
  'generation-ix': 'Paldea',
};

export const generations: Record<string, string> = {
  'generation-i': 'Gen I',
  'generation-ii': 'Gen II',
  'generation-iii': 'Gen III',
  'generation-iv': 'Gen IV',
  'generation-v': 'Gen V',
  'generation-vi': 'Gen VI',
  'generation-vii': 'Gen VII',
  'generation-viii': 'Gen VIII',
  'generation-ix': 'Gen IX',
};

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
  | 'fairy';

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
];
