import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DeleteCategoryDialog } from 'src/app/dialogs/delete-category/delete-category.dialog';
import { DisplayedColumn, RowAction } from 'src/app/models/component.model';
import { Category } from 'src/app/models/deck.model';
import { CategoryService } from 'src/app/services/category.service';
import { categoryTableAction, DISPLAYED_COLUMNS } from './categories.constants';

@Component({
  selector: 'categories-page',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.less'],
})
export class CategoriesPage {
  public categories$: Observable<Category[]>;
  public displayedColumns: DisplayedColumn[] = DISPLAYED_COLUMNS;

  private _dialogRef: MatDialogRef<any>;

  constructor(
    public dialog: MatDialog,
    public categorySerivce: CategoryService
  ) {}

  ngOnInit() {
    this.categories$ = this.categorySerivce.getCategories();
  }

  public onActionMenuClicked(rowAction: RowAction) {
    const action = rowAction.value as categoryTableAction;
    switch (action) {
      case 'editCategory':
        console.log(rowAction);
        break;
      case 'deleteCategory':
        this._openDeleteCategoryDialog();
        break;
      default:
        console.warn('Action unsupported. Oh No!!');
        break;
    }
  }

  private _openDeleteCategoryDialog() {
    this._dialogRef = this.dialog.open(DeleteCategoryDialog);
  }
}
