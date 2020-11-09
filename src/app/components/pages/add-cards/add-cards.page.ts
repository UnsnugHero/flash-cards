// external
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, mergeMap, tap } from 'rxjs/operators';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';

// services
import { DeckService } from '@services/deck.service';

// models
import { Card } from '@models/card.model';
import { Deck } from '@models/deck.model';

// helpers
import { getValueOfFormGroup } from '@utilities/helpers.util';
import { SubscriptionManager } from '@utilities/subscription-manager.util';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialog } from '@dialogs/confirm/confirm.dialog';
import { FINISH_ADD_CARDS_DIALOG_CONFIGS } from './add-cards.constants';

/**
 * this is a card making page that has same layout as the deck overview page but the card is a form with a card prompty and answer input and a textarea input for
 * a mnemonic if they choose to make one. Below the card on the right hand side are two buttons, one says 'finish' which finishes the adding card session
 * and takes user back to the deck they were making cards for. The other button says 'Add Card' and will submit the form to the backend to add the card to
 * the deck they were on when they hit 'Add Cards'. The button will also reset the form so the user can continue making cards without navigating back and
 * forth between views/dialogs.
 * on the left side there will be actions where the user can see how many cards they have made so far that will show up somehow... Maybe a dialog table?
 * or just some simple list? showing the prompt and answer... no need to show the mnemonic. Maybe theres another mat component to make this easy.
 *
 * or maybe on the left side there will be stats. maybe just one that says how many cards
 * the user has added for that session. below the cards is a list that show what cards the user
 * has added so far and they have the option to remove them from the list of cards to be added.
 * or should we add them when the user presses the button? or when they press finish? for the
 * case of the bulk adding cards, need a cancel button. thinking bulk is better...
 *
 *
 */

@Component({
  selector: 'add-card-page',
  templateUrl: './add-cards.page.html',
  styleUrls: ['./add-cards.page.less'],
})
export class AddCardsPage {
  // TODO: show these in an (expandable?) list at the bottom of the page
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
          return this.deckService.getDeck(parseInt(params.id));
        }),
        tap((deck: Deck) => (this.deck = deck))
      )
      .subscribe();

    this._subscriptionManager.addSubscription(paramSubscription);
  }

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

  public onCancelClick() {}

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

  public showCards() {
    console.log(this.cardsToAdd);
  }
}
