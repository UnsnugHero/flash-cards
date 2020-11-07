// external
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    public dialog: MatDialog,
    public router: Router
  ) {}

  ngOnInit() {
    this.currentCardIndex = 1;

    const paramSubscription = this.activatedRoute.params
      .pipe(
        mergeMap((params) => {
          this.deckId = params.id;
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

  // Deck Action Handlers

  public onAddCardsActionClick() {
    // route to a card making page that has same layout as this page but the card is a form with a card prompty and answer input and a textarea input for
    // a mnemonic if they choose to make one. Below the card on the right hand side are two buttons, one says 'finish' which finishes the adding card session
    // and takes user back to the deck they were making cards for. The other button says 'Add Card' and will submit the form to the backend to add the card to
    // the deck they were on when they hit 'Add Cards'. The button will also reset the form so the user can continue making cards without navigating back and
    // forth between views/dialogs.
    // on the left side there will be actions where the user can see how many cards they have made so far that will show up somehow... Maybe a dialog table?
    // or just some simple list? showing the prompt and answer... no need to show the mnemonic. Maybe theres another mat component to make this easy.
    this.router.navigateByUrl(`deck/add-cards/${this.deckId}`);
  }

  public onDeleteDeckActionClick() {
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

  // Card button handlers

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

  public onEditCardButtonClick(cardId: number) {
    // dialog or use the form card? ill lean towards the form card...
  }

  public onShowMnemonicsButtonClick() {
    this.showMnemonics = !this.showMnemonics;
  }
}
