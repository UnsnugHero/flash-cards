import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { MOCK_DECKS } from '../mocks/deck.mocks';
import { Deck } from '../models/deck.model';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  private decksUrl = 'api/decks';

  constructor(private http: HttpClient) {}

  public getDecks(): Observable<Deck[]> {
    return this.http.get<Deck[]>(this.decksUrl);
  }
}
