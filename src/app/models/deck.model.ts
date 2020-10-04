export interface Category {
  id: number;
  category: string;
  associatedDecks: number;
}

export interface Deck {
  id: number;
  title: string;
}
