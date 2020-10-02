import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { MOCK_CATEGORIES, MOCK_DECKS_JAPANESE } from '../mocks/mock-data';
import { Category, Deck } from '../models/deck.model';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const categories = MOCK_CATEGORIES;
    const decks = MOCK_DECKS_JAPANESE;
    return { categories, decks };
  }

  genId<T extends Deck | Category>(collection: T[]): number {
    return collection.length > 0
      ? Math.max(...collection.map((t) => t.id)) + 1
      : 11;
  }
}
