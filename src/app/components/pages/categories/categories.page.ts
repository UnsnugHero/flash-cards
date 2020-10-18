import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { debounceTime, filter, mergeMap, tap } from 'rxjs/operators';
import { DeleteCategoryDialog } from 'src/app/components/dialogs/delete-category/delete-category.dialog';
import {
  DisplayedColumn,
  MenuOption,
  RowAction,
} from 'src/app/models/component.model';
import { Category } from 'src/app/models/deck.model';
import { CategoryService } from 'src/app/services/category.service';
import { SubscriptionManager } from 'src/app/utilities/subscription-manager/subscription-manager.util';
import { EditCategoryDialog } from '../../dialogs/edit-category/edit-category.dialog';
import {
  CategoryTableAction,
  CATEGORY_SEARCH_SORT_MENU_OPTIONS,
  DISPLAYED_COLUMNS,
} from './categories.constants';

const SNACKBAR_DURATION: number = 5000;

@Component({
  selector: 'categories-page',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.less'],
})
export class CategoriesPage {
  public categories: Category[];
  public displayedColumns: DisplayedColumn[] = DISPLAYED_COLUMNS;
  public searchSortMenuOptions: MenuOption[] = CATEGORY_SEARCH_SORT_MENU_OPTIONS;

  public searchForm: FormGroup;

  private _dialogRef: MatDialogRef<any>;

  private _subscriptionManager = new SubscriptionManager();

  constructor(
    public categoryService: CategoryService,
    public dialog: MatDialog,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.searchForm = new FormGroup({
      name: new FormControl(),
      sortBy: new FormControl(),
    });

    // Subscriptions
    const searchFormSubscription = this.searchForm.controls['name'].valueChanges
      .pipe(
        debounceTime(500),
        mergeMap((searchValue) => {
          const searchPayload = {
            query: searchValue,
            sortBy: this.searchForm.value.sortBy,
          };
          return this.categoryService.search(searchValue);
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

  public onPaginate(pageEvent: PageEvent) {
    // some search calls here probably, would need to account for search bar and sort by query here too, thatss ez i think
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
        mergeMap(() => of('')),
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
