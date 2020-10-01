import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  public deckSearchForm: FormGroup;

  constructor(public deckService: DeckService) {}

  ngOnInit() {
    this.deckSearchForm = new FormGroup({
      name: new FormControl(null),
      category: new FormControl(null),
    });

    this.decks$ = this.deckService.getDecks();
  }

  public onPrintFormClick() {
    console.log(this.deckSearchForm.value);
  }
}
