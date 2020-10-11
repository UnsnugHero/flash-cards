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
