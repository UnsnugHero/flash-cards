import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Card, Deck } from '@models/deck.model';
import { handleError } from './services.helpers';
import { MatSnackBar } from '@angular/material/snack-bar';

const SNACKBAR_DURATION: number = 5000;

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  private decksUrl: string = 'api/decks';

  constructor(private http: HttpClient, private snackbar: MatSnackBar) {}

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

  public bulkAddCards(deckId: number, cardsToAdd: Card[]): Observable<string> {
    return of('Cards Successfully Added to Deck!').pipe(
      tap(() => {
        this.snackbar.open('Cards Added to Deck!', 'Dismiss', {
          duration: SNACKBAR_DURATION,
        });
      }),
      catchError((error) => {
        return of('error');
      })
    );
  }

  public deleteCard(deckId: number, cardId: number): Observable<string> {
    return of('Card Deleted!').pipe(
      tap(() =>
        this.snackbar.open('Card Deleted!', 'Dismiss', {
          duration: SNACKBAR_DURATION,
        })
      ),
      catchError((error) => {
        // maybe process error here and then snackbar? idk decide when backend implemented
        return of('error');
      })
    );
  }

  // maybe a deleteCards method for bulk deleting?

  public deleteDeck(deckId: number) {
    return of('Deck Deleted!').pipe(
      tap(() =>
        this.snackbar.open('Deck Deleted!', 'Dismiss', {
          duration: SNACKBAR_DURATION,
        })
      ),
      catchError((error) => {
        return of('error');
      })
    );
  }
}
