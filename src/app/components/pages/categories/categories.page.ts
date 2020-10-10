import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { filter, mergeMap, tap } from 'rxjs/operators';
import { DeleteCategoryDialog } from 'src/app/components/dialogs/delete-category/delete-category.dialog';
import { DisplayedColumn, RowAction } from 'src/app/models/component.model';
import { Category } from 'src/app/models/deck.model';
import { CategoryService } from 'src/app/services/category.service';
import { SubscriptionManager } from 'src/app/utilities/subscription-manager/subscription-manager.util';
import { EditCategoryDialog } from '../../dialogs/edit-category/edit-category.dialog';
import { categoryTableAction, DISPLAYED_COLUMNS } from './categories.constants';

@Component({
  selector: 'categories-page',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.less'],
})
export class CategoriesPage {
  public categories: Category[];
  public displayedColumns: DisplayedColumn[] = DISPLAYED_COLUMNS;

  private _dialogRef: MatDialogRef<any>;

  private _subscriptionManager = new SubscriptionManager();

  constructor(
    public dialog: MatDialog,
    public categorySerivce: CategoryService
  ) {}

  ngOnInit() {
    const categorySubscription = this.categorySerivce
      .getCategories()
      .subscribe((categories) => {
        console.log(categories);
        this.categories = categories;
      });

    this._subscriptionManager.addSubscription(categorySubscription);
  }

  ngOnDestroy() {
    this._subscriptionManager.unsubscribeAll();
  }

  public onActionMenuClicked(rowAction: RowAction) {
    const action = rowAction.value as categoryTableAction;
    switch (action) {
      case 'editCategory':
        this._openEditCategoryDialog(this.categories[rowAction.rowIndex]);
        break;
      case 'deleteCategory':
        this._openDeleteCategoryDialog();
        break;
      default:
        console.warn('Action unsupported. Oh No!!');
        break;
    }
  }

  private _openEditCategoryDialog(category: Category) {
    this._dialogRef = this.dialog.open(EditCategoryDialog, {
      data: { categoryName: category.category },
    });

    const editCategorySubscription = this._dialogRef
      .afterClosed()
      .pipe(
        filter((result) => !!result),
        tap((result) => console.log(`confirming edit action: ${result}`)),
        mergeMap(() => of('TODO: Edit Category call to backend here'))
      )
      .subscribe();

    this._subscriptionManager.addSubscription(editCategorySubscription);
  }

  private _openDeleteCategoryDialog() {
    this._dialogRef = this.dialog.open(DeleteCategoryDialog);

    const deleteCategorySubscription = this._dialogRef
      .afterClosed()
      .pipe(
        filter((result) => !!result),
        tap((result) => console.log(`confirming delete action: ${result}`)),
        mergeMap(() => of('TODO: Delete Category call to backend here'))
      )
      .subscribe();

    this._subscriptionManager.addSubscription(deleteCategorySubscription);
  }
}
