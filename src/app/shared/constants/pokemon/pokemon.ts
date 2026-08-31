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
}

export interface PokemonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
  }[];
}
