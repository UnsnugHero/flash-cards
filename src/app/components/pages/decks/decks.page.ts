import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Deck } from 'src/app/models/deck.model';
import { DeckService } from 'src/app/services/deck.service';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.page.html',
  styleUrls: ['./decks.page.less'],
})
export class DecksPageComponent {
  public decks$: Observable<Deck[]>;

  constructor(public deckService: DeckService) {}

  ngOnInit() {
    this.decks$ = this.deckService.getDecks();
  }
}
