import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Deck } from '../models/deck.model';
import { handleError } from './services.helpers';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  private deckUrl: string = 'api/decks';

  constructor(private http: HttpClient) {}

  public getDecks(): Observable<Deck[]> {
    return this.http
      .get<Deck[]>(this.deckUrl)
      .pipe(catchError(handleError('getDecks', [])));
  }
}
