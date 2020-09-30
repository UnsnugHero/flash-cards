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
      { id: 2, title: 'onyomi' },
      { id: 3, title: 'kunyomi' },
      { id: 4, title: 'vocabulary' },
      { id: 5, title: 'adjectives' },
      { id: 6, title: 'verbs' },
      { id: 7, title: 'nouns' },
    ];
    return { decks };
  }

  genId(decks: Deck[]): number {
    return decks.length > 0 ? Math.max(...decks.map((deck) => deck.id)) + 1 : 1;
  }
}
