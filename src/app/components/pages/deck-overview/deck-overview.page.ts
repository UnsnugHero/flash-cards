// external
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, mergeMap, tap } from 'rxjs/operators';

// models
import { Deck } from '@models/deck.model';

// services
import { DeckService } from '@services/deck.service';

// util
import { SubscriptionManager } from '@utilities/subscription-manager.util';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialog } from '@dialogs/confirm/confirm.dialog';
import {
  DELETE_CARD_DIALOG_CONFIG_DATA,
  DELETE_DECK_DIALOG_CONFIG_DATA,
  DELETE_MENU_OPTIONS,
} from './deck-overview.constants';
import { MenuOption } from '@models/component.model';

@Component({
  selector: 'deck-overview-page',
  templateUrl: './deck-overview.page.html',
  styleUrls: ['./deck-overview.page.less'],
})
export class DeckOverviewPage {
  public currentCardIndex: number;
  public deckId: number;
  public deck: Deck;

  public showMnemonics: boolean = false;

  public deleteButtonMenuOptions: MenuOption[] = DELETE_MENU_OPTIONS;

  private _dialogRef: MatDialogRef<any>;

  private _subscriptionManager = new SubscriptionManager();

  constructor(
    public activatedRoute: ActivatedRoute,
    public deckService: DeckService,
    public dialog: MatDialog,
    public router: Router
  ) {}

  ngOnInit() {
    this.currentCardIndex = 0;

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

  // paginate button handlers
  public onPaginateLeft() {
    if (this.currentCardIndex === 0) {
      return;
    }
    this.currentCardIndex--;
  }

  public onPaginateRight() {
    if (this.currentCardIndex === this.deck.cards.length - 1) {
      return;
    }
    this.currentCardIndex++;
    console.log(this.currentCardIndex);
  }

  // Card button handlers

  public onActionClicked(action: string) {
    switch (action) {
      case 'deleteCurrentCard':
        // TODO: get the id of the currently shown card
        this._openDeleteCurrentCardDialog(1);
        break;
      case 'deleteDeck':
        this._openDeleteDeckDialog();
        break;
      default:
        console.warn('Action unsupported. Oh No!!');
        break;
    }
  }

  public onAddCardsButtonClick() {
    this.router.navigateByUrl(`deck/add-cards/${this.deckId}`);
  }

  public onEditCardButtonClick(cardId: number) {
    // dialog or use the form card? ill lean towards the form card...
  }

  public onShowMnemonicsButtonClick() {
    this.showMnemonics = !this.showMnemonics;
  }

  private _openDeleteDeckDialog() {
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

  private _openDeleteCurrentCardDialog(cardId: number) {
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
}
