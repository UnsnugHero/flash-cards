export interface Category {
  id: number;
  name: string;
}

export interface CategoryDisplay {
  name: string;
  associatedDecks: number;
}

export interface Deck {
  id: number;
  title: string;
}
