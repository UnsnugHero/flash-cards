import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DisplayedColumn } from 'src/app/models/component.model';
import { Category } from 'src/app/models/deck.model';
import { CategoryService } from 'src/app/services/category.service';
import { TABLE_MENU_OPTIONS } from './categories.constants';

@Component({
  selector: 'categories-page',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.less'],
})
export class CategoriesPage {
  categories$: Observable<Category[]>;
  displayedColumns: DisplayedColumn[] = [
    { key: 'category', columnHeader: 'Category' },
    { key: 'associatedDecks', columnHeader: 'Associated Decks' },
    { key: 'menuAction', columnHeader: '', menuOptions: TABLE_MENU_OPTIONS },
  ];

  constructor(public categorySerivce: CategoryService) {}

  ngOnInit() {
    this.categories$ = this.categorySerivce.getCategories();
  }
}
