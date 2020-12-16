export interface Category {
  id?: number;
  name: string;
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
  name: string;
  cards: Card[];
  categories?: Category[];
}
