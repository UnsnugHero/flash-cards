import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Deck } from '@models/deck.model';
import { handleError } from './services.helpers';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  private decksUrl: string = 'api/decks';

  constructor(private http: HttpClient) {}

  // Gets a single deck by id
  public getDeck(deckId: number): Observable<Deck> {
    return this.http
      .get<Deck>(`${this.decksUrl}/${deckId}`)
      .pipe(catchError(handleError('getDeck', null)));
  }

  public getDecks(): Observable<Deck[]> {
    return this.http
      .get<Deck[]>(this.decksUrl)
      .pipe(catchError(handleError('getDecks', [])));
  }
}
