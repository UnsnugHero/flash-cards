import { Component } from '@angular/core';
import { Observable } from 'rxjs';
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
  categories$: Observable<Category[]>;
  displayedColumns: DisplayedColumn[] = DISPLAYED_COLUMNS;

  constructor(public categorySerivce: CategoryService) {}

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
        console.log(rowAction);
        break;
      default:
        console.warn('Action unsupported. Oh No!!');
        break;
    }
  }
}
