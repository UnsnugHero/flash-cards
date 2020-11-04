// external
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, mergeMap, tap } from 'rxjs/operators';

// models
import { Deck } from '@models/deck.model';

// services
import { DeckService } from '@services/deck.service';

// util
import { SubscriptionManager } from '@utilities/subscription-manager/subscription-manager.util';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialog } from '@dialogs/confirm/confirm.dialog';
import {
  DELETE_CARD_DIALOG_CONFIG_DATA,
  DELETE_DECK_DIALOG_CONFIG_DATA,
} from './deck-overview.constants';

@Component({
  selector: 'deck-overview-page',
  templateUrl: './deck-overview.page.html',
  styleUrls: ['./deck-overview.page.less'],
})
export class DeckOverviewPage {
  public cards = [1, 2, 3, 4, 5];
  public currentCardIndex: number;
  public deckId: number;
  public deck: Deck;

  public showMnemonics: boolean = false;

  private _dialogRef: MatDialogRef<any>;

  private _subscriptionManager = new SubscriptionManager();

  constructor(
    public activatedRoute: ActivatedRoute,
    public deckService: DeckService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    // maybe with this field, we can set it based on if they've been on this page before?
    // and then we can have a button as part of the action to go back to the first card
    this.currentCardIndex = 1;

    const paramSubscription = this.activatedRoute.params
      .pipe(
        mergeMap((params) => {
          return this.deckService.getDeck(parseInt(params.id));
        }),
        tap((deck: Deck) => (this.deck = deck))
      )
      .subscribe();

    this._subscriptionManager.addSubscription(paramSubscription);
  }

  ngOnDestroy() {
    this._subscriptionManager.unsubscribeAll();
  }

  public onDeleteCardButtonClick(cardId: number) {
    this._dialogRef = this.dialog.open(ConfirmDialog, {
      data: DELETE_CARD_DIALOG_CONFIG_DATA,
      disableClose: true,
    });

    const deleteCardSubscription = this._dialogRef
      .afterClosed()
      .pipe(
        filter((result) => !!result),
        mergeMap(() => this.deckService.deleteCard(this.deckId, cardId)),
        tap((result) => console.log(`delete card backend result: ${result}`))
      )
      .subscribe();

    this._subscriptionManager.addSubscription(deleteCardSubscription);
  }

  public onDeleteDeckButtonClick() {
    this._dialogRef = this.dialog.open(ConfirmDialog, {
      data: DELETE_DECK_DIALOG_CONFIG_DATA,
      disableClose: true,
    });

    const deleteDeckSubscription = this._dialogRef
      .afterClosed()
      .pipe(
        filter((result) => !!result),
        mergeMap(() => this.deckService.deleteDeck(this.deckId)),
        tap((result) => console.log(`delete deck backend result: ${result}`))
      )
      .subscribe();

    this._subscriptionManager.addSubscription(deleteDeckSubscription);
  }
}
