import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { MOCK_DECKS } from '../mocks/deck.mocks';
import { Deck } from '../models/deck.model';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  constructor() {}

  public getDecks(): Observable<Deck[]> {
    return of(MOCK_DECKS);
  }
}
