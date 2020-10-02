import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { MOCK_CATEGORIES, MOCK_DECKS_JAPANESE } from '../mocks/mock-data';
import { Deck } from '../models/deck.model';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const categories = MOCK_CATEGORIES;
    const decks = MOCK_DECKS_JAPANESE;
    return { categories, decks };
  }

  genId(decks: Deck[]): number {
    return decks.length > 0 ? Math.max(...decks.map((deck) => deck.id)) + 1 : 1;
  }
}
