import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Deck } from '@models/deck.model';
import { DeckService } from '@services/deck.service';
import { SubscriptionManager } from '@utilities/subscription-manager/subscription-manager.util';
import { mergeMap, tap } from 'rxjs/operators';

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

interface mmooddeell {
  prompt: string;
  answer: string;
  mnemonic: string;
}

@Component({
  selector: 'add-card-page',
  templateUrl: './add-cards.page.html',
  styleUrls: ['./add-cards.page.less'],
})
export class AddCardsPage {
  public deckId: number;
  public deck: Deck;

  public addCardFormGroup: FormGroup;

  private _subscriptionManager = new SubscriptionManager();

  constructor(
    public activatedRoute: ActivatedRoute,
    public deckService: DeckService
  ) {}

  ngOnInit() {
    // this.addCardFormGroup = new FormGroup<mmooddeell>({

    // })

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

  public onAddCardClick() {}

  public onCancelClick() {}

  public onFinishClick() {}
}
