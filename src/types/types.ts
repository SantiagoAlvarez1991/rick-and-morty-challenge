export interface Character {
    id: string;
    name: string;
    status: string;
    image: string;
    species: string;
    origin: {
      name: string
    }
  }

export interface Information {
    count: number;
    pages: number;
    next: number | null;
    prev: number | null
  }
