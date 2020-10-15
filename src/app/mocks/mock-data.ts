import { Category, Deck } from '../models/deck.model';

export const MOCK_CATEGORIES: Category[] = [
  { id: 1, categoryName: 'Japanese', associatedDecks: 20 },
  { id: 2, categoryName: 'French', associatedDecks: 5 },
  { id: 4, categoryName: 'German', associatedDecks: 3 },
  { id: 5, categoryName: 'Korean', associatedDecks: 8 },
  { id: 6, categoryName: 'Asian Language', associatedDecks: 6 },
  { id: 7, categoryName: 'Mathematics', associatedDecks: 12 },
  { id: 8, categoryName: 'Marine Biology', associatedDecks: 8 },
  { id: 9, categoryName: 'Computer Science', associatedDecks: 0 },
  { id: 10, categoryName: 'Swahili', associatedDecks: 3 },
  { id: 11, categoryName: 'English/Writing', associatedDecks: 15 },
  { id: 12, categoryName: 'History', associatedDecks: 32 },
  { id: 13, categoryName: 'Chemistry', associatedDecks: 8 },
  { id: 14, categoryName: 'European Language', associatedDecks: 5 },
  { id: 15, categoryName: 'Topology', associatedDecks: 11 },
  { id: 16, categoryName: 'Linear Algebra', associatedDecks: 9 },
  { id: 17, categoryName: 'Computer Architecture', associatedDecks: 3 },
];

export const MOCK_DECKS_JAPANESE: Deck[] = [
  { id: 1, title: 'Kanji' },
  { id: 2, title: 'Onyomi' },
  { id: 3, title: 'Kunyomi' },
  { id: 4, title: 'Vocabulary' },
  { id: 5, title: 'Adjectives' },
  { id: 6, title: 'Verbs' },
  { id: 7, title: 'Nouns' },
];
