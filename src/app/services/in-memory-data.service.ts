import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { MOCK_DECKS } from '../mocks/deck.mocks';
import { Deck } from '../models/deck.model';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const decks = [
      { id: 1, title: 'Kanji' },
      { id: 2, title: 'Onyomi' },
      { id: 3, title: 'Kunyomi' },
      { id: 4, title: 'Vocabulary' },
      { id: 5, title: 'Adjectives' },
      { id: 6, title: 'Verbs' },
      { id: 7, title: 'Nouns' },
    ];
    return { decks };
  }

  genId(decks: Deck[]): number {
    return decks.length > 0 ? Math.max(...decks.map((deck) => deck.id)) + 1 : 1;
  }
}
