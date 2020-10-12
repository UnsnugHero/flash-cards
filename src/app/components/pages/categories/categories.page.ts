import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { filter, mergeMap, tap } from 'rxjs/operators';
import { DeleteCategoryDialog } from 'src/app/components/dialogs/delete-category/delete-category.dialog';
import { DisplayedColumn, RowAction } from 'src/app/models/component.model';
import { Category, Deck } from 'src/app/models/deck.model';
import { CategoryService } from 'src/app/services/category.service';
import { DeckService } from 'src/app/services/deck.service';
import { SubscriptionManager } from 'src/app/utilities/subscription-manager/subscription-manager.util';
import { CategoryManageDecksDialog } from '../../dialogs/add-decks-to-category/category-manage-decks.dialog';
import { EditCategoryDialog } from '../../dialogs/edit-category/edit-category.dialog';
import { CategoryTableAction, DISPLAYED_COLUMNS } from './categories.constants';

@Component({
  selector: 'categories-page',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.less'],
})
export class CategoriesPage {
  public categories: Category[];
  public decks: Deck[];
  public displayedColumns: DisplayedColumn[] = DISPLAYED_COLUMNS;

  private _dialogRef: MatDialogRef<any>;

  private _subscriptionManager = new SubscriptionManager();

  constructor(
    public categorySerivce: CategoryService,
    public deckService: DeckService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    const categorySubscription = this.categorySerivce
      .getCategories()
      .pipe(tap((categories) => (this.categories = categories)))
      .subscribe();

    const deckSubscription = this.deckService
      .getDecks()
      .pipe(tap((decks) => (this.decks = decks)))
      .subscribe();

    this._subscriptionManager.addSubscription(categorySubscription);
    this._subscriptionManager.addSubscription(deckSubscription);
  }

  ngOnDestroy() {
    this._subscriptionManager.unsubscribeAll();
  }

  public onActionMenuClicked(rowAction: RowAction) {
    const action = rowAction.value as CategoryTableAction;
    switch (action) {
      case 'addDecks':
        this._openAddDecksDialog();
        break;
      case 'editCategory':
        this._openEditCategoryDialog(this.categories[rowAction.rowIndex]);
        break;
      case 'deleteCategory':
        this._openDeleteCategoryDialog(this.categories[rowAction.rowIndex]);
        break;
      default:
        console.warn('Action unsupported. Oh No!!');
        break;
    }
  }

  private _openAddDecksDialog() {
    this._dialogRef = this.dialog.open(CategoryManageDecksDialog, {
      data: { decks: this.decks },
    });

    const addDecksSubscription = this._dialogRef
      .afterClosed()
      .pipe(
        filter((result) => !!result),
        tap((result) => console.log(`confirming add decks action: ${result}`)),
        // TODO: Add Decks to category call to backend with deck ids and category id
        // like a bulk add I guess with array?
        mergeMap(() => of(''))
      )
      .subscribe();

    this._subscriptionManager.addSubscription(addDecksSubscription);
  }

  private _openEditCategoryDialog(category: Category) {
    this._dialogRef = this.dialog.open(EditCategoryDialog, {
      data: { categoryName: category.categoryName },
    });

    const editCategorySubscription = this._dialogRef
      .afterClosed()
      .pipe(
        filter((result) => !!result),
        tap((result) => console.log(`confirming edit action: ${result}`)),
        // TODO: Edit Category call to backend with id and name change
        mergeMap(() => of(''))
      )
      .subscribe();

    this._subscriptionManager.addSubscription(editCategorySubscription);
  }

  private _openDeleteCategoryDialog(category: Category) {
    this._dialogRef = this.dialog.open(DeleteCategoryDialog);

    const deleteCategorySubscription = this._dialogRef
      .afterClosed()
      .pipe(
        filter((result) => !!result),
        tap((result) => console.log(`confirming delete action: ${result}`)),
        // TODO: Delete Category call to backend here with category id
        mergeMap(() => of(''))
      )
      .subscribe();

    this._subscriptionManager.addSubscription(deleteCategorySubscription);
  }
}
