// external
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, filter, mergeMap, tap } from 'rxjs/operators';

// constants
import {
  CategoryTableAction,
  CATEGORY_SEARCH_SORT_MENU_OPTIONS,
  DELETE_CATEGORY_DIALOG_CONFIGS_DATA,
  DISPLAYED_COLUMNS,
} from './categories.constants';

// dialogs
import { AddCategoryDialog } from '@dialogs/add-category/add-category.dialog';
import { ConfirmDialog } from '@dialogs/confirm/confirm.dialog';
import { EditCategoryDialog } from '@dialogs/edit-category/edit-category.dialog';

// models
import {
  DisplayedColumn,
  RowAction,
  SelectOption,
} from '@models/component.model';
import { Category } from '@models/deck.model';

// services
import { CategoryService } from '@services/category.service';

// util
import { SubscriptionManager } from '@utilities/subscription-manager.util';
import { CategorySearchPayload } from '@models/payload.model';

const SNACKBAR_DURATION: number = 5000;

@Component({
  selector: 'categories-page',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.less'],
})
export class CategoriesPage {
  public categories: Category[];
  public displayedColumns: DisplayedColumn[] = DISPLAYED_COLUMNS;
  public searchSortSelectOptions: SelectOption[] = CATEGORY_SEARCH_SORT_MENU_OPTIONS;

  public searchForm: FormGroup;

  private _dialogRef: MatDialogRef<any>;

  private _subscriptionManager = new SubscriptionManager();

  constructor(
    public categoryService: CategoryService,
    public dialog: MatDialog,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.searchForm = new FormGroup<CategorySearchPayload>({
      name: new FormControl(),
      sortBy: new FormControl(),
    });

    // Subscriptions
    const searchFormSubscription = this.searchForm.valueChanges
      .pipe(
        debounceTime(500),
        mergeMap(() => {
          return this.categoryService.search(
            this.searchForm.value as CategorySearchPayload
          );
        }),
        tap((searchResults) => {
          this.categories = searchResults;
        })
      )
      .subscribe();

    const categorySubscription = this.categoryService
      .getCategories()
      .pipe(tap((categories) => (this.categories = categories)))
      .subscribe();

    this._subscriptionManager.addSubscription(searchFormSubscription);
    this._subscriptionManager.addSubscription(categorySubscription);
  }

  ngOnDestroy() {
    this._subscriptionManager.unsubscribeAll();
  }

  public onActionMenuClick(rowAction: RowAction) {
    const action = rowAction.value as CategoryTableAction;
    switch (action) {
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

  public onAddCategoryButtonClick() {
    this._dialogRef = this.dialog.open(AddCategoryDialog, {
      disableClose: true,
    });

    const addCategorySubscription = this._dialogRef
      .afterClosed()
      .pipe(
        filter((result) => !!result),
        tap((result) => console.log(`confirming add action: ${result}`)),
        // TODO: Add Category call to backend with name input
        mergeMap((result) => this.categoryService.addCategory(result))
      )
      .subscribe();

    this._subscriptionManager.addSubscription(addCategorySubscription);
  }

  public onPaginate(pageEvent: PageEvent) {
    // some search calls here probably, would need to account for search bar and sort by query here too, thatss ez i think
  }

  private _openEditCategoryDialog(category: Category) {
    this._dialogRef = this.dialog.open(EditCategoryDialog, {
      data: { categoryName: category.categoryName },
      disableClose: true,
    });

    const editCategorySubscription = this._dialogRef
      .afterClosed()
      .pipe(
        filter((result) => !!result),
        tap((result) => console.log(`confirming edit action: ${result}`)),
        // TODO: Edit Category call to backend with id and name change
        mergeMap((result) =>
          this.categoryService.editCategory(result, category.id)
        )
      )
      .subscribe();

    this._subscriptionManager.addSubscription(editCategorySubscription);
  }

  private _openDeleteCategoryDialog(category: Category) {
    this._dialogRef = this.dialog.open(ConfirmDialog, {
      data: DELETE_CATEGORY_DIALOG_CONFIGS_DATA,
      disableClose: true,
    });

    const deleteCategorySubscription = this._dialogRef
      .afterClosed()
      .pipe(
        filter((result) => !!result),
        tap((result) => console.log(`confirming delete action: ${result}`)),
        // TODO: Delete Category call to backend here with category id
        mergeMap(() => this.categoryService.deleteCategory(category.id)),
        tap(() =>
          this._snackbar.open('Category deleted!', 'Dismiss', {
            duration: SNACKBAR_DURATION,
          })
        )
      )
      .subscribe();

    this._subscriptionManager.addSubscription(deleteCategorySubscription);
  }
}
