import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
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

  private _subscriptionManager = new SubscriptionManager();

  constructor(
    public activatedRoute: ActivatedRoute,
    public deckService: DeckService
  ) {}

  ngOnInit() {
    const paramSubscription = this.activatedRoute.params
      .pipe(
        tap((params: any) => {
          this.deckId = params.id;
        })
      )
      .subscribe();

    this._subscriptionManager.addSubscription(paramSubscription);
  }
}
