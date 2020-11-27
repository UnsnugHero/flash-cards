export interface Category {
  id?: number;
  categoryName: string;
  associatedDecks?: number;
}

export interface Card {
  answer: string;
  id?: number;
  mnemonic?: string;
  prompt: string;
}

export interface Deck {
  id?: number;
  title: string;
  cards: Card[];
  categories?: Category[];
}
