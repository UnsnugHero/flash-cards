import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, tap } from 'rxjs/operators';
import { Deck } from 'src/app/models/deck.model';
import { DeckService } from 'src/app/services/deck.service';
import { SubscriptionManager } from 'src/app/utilities/subscription-manager/subscription-manager.util';

@Component({
  selector: 'deck-overview-page',
  templateUrl: './deck-overview.page.html',
  styleUrls: [],
})
export class DeckOverviewPage {
  public deckId: number;
  public deck: Deck;

  private _subscriptionManager = new SubscriptionManager();

  constructor(
    public activatedRoute: ActivatedRoute,
    public deckService: DeckService
  ) {}

  ngOnInit() {
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
