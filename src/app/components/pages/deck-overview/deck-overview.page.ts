import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, tap } from 'rxjs/operators';
import { Deck } from 'src/app/models/deck.model';
import { DeckService } from 'src/app/services/deck.service';
import { SubscriptionManager } from 'src/app/utilities/subscription-manager/subscription-manager.util';

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

  private _subscriptionManager = new SubscriptionManager();

  constructor(
    public activatedRoute: ActivatedRoute,
    public deckService: DeckService
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
}
