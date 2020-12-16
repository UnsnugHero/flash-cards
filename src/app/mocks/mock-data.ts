import { Category, Deck } from '../models/deck.model';

export const MOCK_CATEGORIES: Category[] = [
  { id: 1, name: 'Japanese', associatedDecks: 20 },
  { id: 2, name: 'French', associatedDecks: 5 },
  { id: 4, name: 'German', associatedDecks: 3 },
  { id: 5, name: 'Korean', associatedDecks: 8 },
  { id: 6, name: 'Asian Language', associatedDecks: 6 },
  { id: 7, name: 'Mathematics', associatedDecks: 12 },
  { id: 8, name: 'Marine Biology', associatedDecks: 8 },
  { id: 9, name: 'Computer Science', associatedDecks: 0 },
  { id: 10, name: 'Swahili', associatedDecks: 3 },
  { id: 11, name: 'English/Writing', associatedDecks: 15 },
  { id: 12, name: 'History', associatedDecks: 32 },
  { id: 13, name: 'Chemistry', associatedDecks: 8 },
  { id: 14, name: 'European Language', associatedDecks: 5 },
  { id: 15, name: 'Topology', associatedDecks: 11 },
  { id: 16, name: 'Linear Algebra', associatedDecks: 9 },
  { id: 17, name: 'Computer Architecture', associatedDecks: 3 },
];

export const MOCK_DECKS_JAPANESE: Deck[] = [
  {
    id: 1,
    name: 'Kanji',
    cards: [
      { prompt: 'no?', answer: 'yes', mnemonic: 'forget this' },
      { prompt: 'yes?', answer: 'no', mnemonic: "don't forget this" },
    ],
  },
  {
    id: 2,
    name: 'Onyomi',
    cards: [
      { prompt: 'no?', answer: 'no', mnemonic: 'remember this plz' },
      { prompt: 'wow?', answer: 'wow', mnemonic: '' },
    ],
  },
  { id: 3, name: 'Kunyomi', cards: [] },
  { id: 4, name: 'Vocabulary', cards: [] },
  { id: 5, name: 'Adjectives', cards: [] },
  { id: 6, name: 'Verbs', cards: [] },
  {
    id: 7,
    name: 'Nouns',
    cards: [{ prompt: 'noun', answer: 'yes', mnemonic: 'remember this' }],
  },
];
