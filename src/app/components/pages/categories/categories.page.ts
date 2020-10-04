import { Component, ViewEncapsulation } from '@angular/core';
import { CategoryDisplay } from 'src/app/models/deck.model';

const CATEGORIES: CategoryDisplay[] = [
  { name: 'Japanese', associatedDecks: 3 },
  { name: 'French', associatedDecks: 2 },
  { name: 'Mathematics', associatedDecks: 12 },
  { name: 'Marine Biology', associatedDecks: 8 },
  { name: 'Computer Science', associatedDecks: 0 },
];

@Component({
  selector: 'categories-page',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.less'],
})
export class CategoriesPage {
  dataSource: CategoryDisplay[] = CATEGORIES;
  displayedColumns: string[] = ['category', 'associatedDecks'];

  constructor() {}

  ngOnInit() {}
}
