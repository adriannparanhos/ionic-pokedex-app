export interface PokemonListResponse {
  count: number;
  next: string;
  previous: null | string;
  results: PokemonListItem[];
}

export interface PokemonListItem {
  name: string;
  url: string;
  id: number;
  image: string;
}

export interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      }
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
    };
    is_hidden: boolean;
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}