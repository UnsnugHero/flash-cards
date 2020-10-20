import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
export class DecksPage {
  public sortOptions = SORT_BY_MENU_OPTIONS;

  public categories$: Observable<any>;
  public decks$: Observable<Deck[]>;

  public deckSearchForm: FormGroup;

  public shmenu = [
    { text: 'Edit', value: '' },
    { text: 'Delete', value: '' },
  ];

  constructor(
    public categoryService: CategoryService,
    public deckService: DeckService,
    public router: Router
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
          categories.map((category: Category) => category.categoryName)
        )
      );
    this.decks$ = this.deckService.getDecks();
  }

  public onPrintFormClick() {
    console.log(this.deckSearchForm.value);
  }

  public onDeckClick(deckId: number) {
    this.router.navigateByUrl(`/deck/${deckId}`);
  }
}
