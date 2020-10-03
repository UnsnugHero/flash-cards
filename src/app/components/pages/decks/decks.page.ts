import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

// Models
import { Category, Deck } from 'src/app/models/deck.model';

// Services
import { CategoryService } from 'src/app/services/category.service';
import { DeckService } from 'src/app/services/deck.service';

// Constants
import { SORT_BY_MENU_OPTIONS } from './decks.constants';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.page.html',
  styleUrls: ['./decks.page.less'],
})
export class DecksPageComponent {
  public sortOptions = SORT_BY_MENU_OPTIONS;

  public categories$: Observable<any>;
  public decks$: Observable<Deck[]>;

  public deckSearchForm: FormGroup;

  constructor(
    public categoryService: CategoryService,
    public deckService: DeckService
  ) {}

  ngOnInit() {
    this.deckSearchForm = new FormGroup({
      category: new FormControl(null),
      name: new FormControl(null),
    });

    this.categories$ = this.categoryService
      .getCategories()
      .pipe(
        map((categories: Category[]) =>
          categories.map((category: Category) => category.name)
        )
      );
    this.decks$ = this.deckService.getDecks();
  }

  public onPrintFormClick() {
    console.log(this.deckSearchForm.value);
  }
}
