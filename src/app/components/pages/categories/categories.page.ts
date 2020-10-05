import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DisplayedColumn } from 'src/app/models/component.model';
import { Category } from 'src/app/models/deck.model';
import { CategoryService } from 'src/app/services/category.service';
import { DISPLAYED_COLUMNS } from './categories.constants';

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
}
