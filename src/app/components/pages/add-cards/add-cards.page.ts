// external
import { Component } from '@angular/core';
import { AbstractControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, mergeMap, tap } from 'rxjs/operators';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';

// services
import { DeckService } from '@services/deck.service';

// models
import { Card, Deck } from '@models/deck.model';

// helpers/constants
import { getValueOfFormGroup } from '@utilities/helpers.util';
import { SubscriptionManager } from '@utilities/subscription-manager.util';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialog } from '@dialogs/confirm/confirm.dialog';
import {
  CANCEL_ADD_CARDS_DIALOG_CONFIGS,
  FINISH_ADD_CARDS_DIALOG_CONFIGS,
} from './add-cards.constants';
import { ListItem } from '@models/component.model';

@Component({
  selector: 'add-card-page',
  templateUrl: './add-cards.page.html',
  styleUrls: ['./add-cards.page.less'],
})
export class AddCardsPage {
  public isEditingCard: boolean = false;
  // the index in cards to add array of currently editing card, -1 when not editing
  public editCardIndex: number = -1;
  public cardsToAdd: Card[] = [];

  public deckId: number;
  public deck: Deck;

  public addCardFormGroup: FormGroup;

  private _dialogref: MatDialogRef<any>;
  private _subscriptionManager = new SubscriptionManager();

  constructor(
    public activatedRoute: ActivatedRoute,
    public deckService: DeckService,
    public dialog: MatDialog,
    public router: Router
  ) {}

  ngOnInit() {
    this.addCardFormGroup = new FormGroup<Card>({
      prompt: new FormControl<string>('', Validators.required),
      answer: new FormControl<string>('', Validators.required),
      mnemonic: new FormControl<string>(''),
    });

    const paramSubscription = this.activatedRoute.params
      .pipe(
        mergeMap((params) => {
          this.deckId = params.id;
          return this.deckService.getDeck(params.id);
        }),
        tap((deck: Deck) => (this.deck = deck))
      )
      .subscribe();

    this._subscriptionManager.addSubscription(paramSubscription);
  }

  ngOnDestroy() {
    this._subscriptionManager.unsubscribeAll();
  }

  // TODO: this method should also check if the card prompt already exists in the deck of
  // to be added cards or in the deck of cards itself and show a proper error message
  public onAddCardClick() {
    if (this.addCardFormGroup.invalid) {
      // TODO: a general utility function for this? in case any more forms come along?
      this.addCardFormGroup.markAllAsTouched();
      this.addCardFormGroup.markAllAsDirty();
    } else {
      const newCard: Card = getValueOfFormGroup(this.addCardFormGroup);
      this.addCardFormGroup.reset();

      this.cardsToAdd.push(newCard);
    }
  }

  public onCancelClick() {
    if (this.cardsToAdd.length >= 1) {
      this._dialogref = this.dialog.open(ConfirmDialog, {
        data: CANCEL_ADD_CARDS_DIALOG_CONFIGS,
        disableClose: true,
      });

      const cancelSubscription = this._dialogref
        .afterClosed()
        .pipe(
          filter((result) => !!result),
          tap(() => this.router.navigateByUrl(`deck/${this.deckId}`))
        )
        .subscribe();

      this._subscriptionManager.addSubscription(cancelSubscription);
    } else {
      this.router.navigateByUrl(`deck/${this.deckId}`);
    }
  }

  public onFinishClick() {
    this._dialogref = this.dialog.open(ConfirmDialog, {
      data: FINISH_ADD_CARDS_DIALOG_CONFIGS,
      disableClose: true,
    });

    const finishSubscription = this._dialogref
      .afterClosed()
      .pipe(
        filter((result) => !!result),
        mergeMap(() =>
          this.deckService.bulkAddCards(this.deckId, this.cardsToAdd)
        ),
        tap(() => this.router.navigateByUrl(`deck/${this.deckId}`))
      )
      .subscribe();

    this._subscriptionManager.addSubscription(finishSubscription);
  }

  /** Edit Card Button Handlers */
  public onCancelEditClick() {
    this._resetEdit();
  }

  public onEditCardClick() {
    if (this.addCardFormGroup.valid) {
      this.cardsToAdd[this.editCardIndex] = getValueOfFormGroup(
        this.addCardFormGroup
      );

      this._resetEdit();
    }
  }

  /** List Component Output Bindings */
  public onDeleteListItemClick() {
    this._resetEdit();
  }

  public onListItemClick(listItemObj: ListItem) {
    this.isEditingCard = true;

    this.addCardFormGroup.setValue({
      prompt: listItemObj.listItem.prompt,
      answer: listItemObj.listItem.answer,
      mnemonic: listItemObj.listItem.mnemonic,
    });

    this.editCardIndex = listItemObj.listItemIndex;
  }

  /** private methods */
  // just reset the form and cancel edit if list is altered, easier this way
  private _resetEdit() {
    this.isEditingCard = false;
    this.editCardIndex = -1;
    this.addCardFormGroup.reset();
  }
}
