import { Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DisplayedColumn } from 'src/app/models/component.model';
import { Category } from 'src/app/models/deck.model';
import { CategoryService } from 'src/app/services/category.service';

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
  ];

  constructor(public categorySerivce: CategoryService) {}

  ngOnInit() {
    this.categories$ = this.categorySerivce.getCategories();
  }
}
