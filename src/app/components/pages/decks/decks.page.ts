import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

// Models
import { Category, Deck } from 'src/app/models/deck.model';

// Services
import { CategoryService } from 'src/app/services/category.service';
import { DeckService } from 'src/app/services/deck.service';
import { SubscriptionManager } from 'src/app/utilities/subscription-manager/subscription-manager.util';
import { AddDeckDialog } from '../../dialogs/add-deck/add-deck.dialog';

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

  private _dialogRef: MatDialogRef<any>;
  private _subscriptionManager = new SubscriptionManager();

  constructor(
    public categoryService: CategoryService,
    public deckService: DeckService,
    public router: Router,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
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

  public onAddDeckClick() {
    this._dialogRef = this._dialog.open(AddDeckDialog, { disableClose: true });

    const addDeckSubscription = this._dialogRef
      .afterClosed()
      .pipe(
        filter((result) => !!result),
        tap((res) => console.log(res))
      )
      .subscribe();

    this._subscriptionManager.addSubscription(addDeckSubscription);
  }

  public onCategoryAutocompleteKeyup(query: string) {
    this.categoryService.categorySubject$.next(query);
  }

  public onDeckClick(deckId: number) {
    this.router.navigateByUrl(`/deck/${deckId}`);
  }
}
