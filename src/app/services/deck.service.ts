import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MOCK_DECKS } from '../mocks/deck.mocks';
import { Deck } from '../models/deck.model';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  private decksUrl = 'api/decks';

  constructor(private http: HttpClient) {}

  public getDecks(): Observable<Deck[]> {
    return this.http
      .get<Deck[]>(this.decksUrl)
      .pipe(catchError(this._handleError('getDecks', [])));
  }

  // http error handler
  // TODO: might want to make this available to all services later...
  private _handleError<T>(operation, result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      // user facing error message?

      return of(result as T);
    };
  }
}
