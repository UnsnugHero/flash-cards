import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, pluck, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Card, Category, Deck } from '@models/deck.model';
import { handleError } from './services.helpers';

const SNACKBAR_DURATION: number = 5000;

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  private decksUrl: string = 'http://localhost:8080/decks';

  constructor(private http: HttpClient, private snackbar: MatSnackBar) {}

  public addDeck(payload: {
    name: string;
    categories?: Category[];
  }): Observable<any> {
    return this.http
      .post(this.decksUrl, payload)
      .pipe(catchError(handleError('addDeck', null)));
  }

  // Gets a single deck by id
  public getDeck(deckId: string): Observable<Deck> {
    return this.http
      .get<Deck>(`${this.decksUrl}/${deckId}`)
      .pipe(pluck('data'), catchError(handleError('getDeck', null)));
  }

  public getDecks(): Observable<any> {
    return this.http.get<Deck[]>(this.decksUrl).pipe(
      pluck('data'),
      map((decks: any) => {
        return decks.map((deck) => {
          return {
            name: deck.name,
            cards: deck.cards,
            categories: deck.categories,
            id: deck._id,
          };
        });
      }),
      catchError(handleError('getDecks', []))
    );
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
