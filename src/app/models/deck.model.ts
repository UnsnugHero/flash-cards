export interface Category {
  id: number;
  categoryName: string;
  associatedDecks: number;
}

export interface Deck {
  id: number;
  title: string;
}
