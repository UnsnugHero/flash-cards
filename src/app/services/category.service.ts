import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category } from '../models/deck.model';
import { handleError } from './services.helpers';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoriesUrl: string = 'api/categories';

  constructor(private http: HttpClient) {}

  public getCategories(): Observable<Category[]> {
    return this.http
      .get<Category[]>(this.categoriesUrl)
      .pipe(catchError(handleError('getCategories', [])));
  }

  //TODO: payloads for service functions?
  public search(payload): Observable<Category[]> {
    if (payload === '') {
      return this.getCategories();
    }
    const mockCategories: Category[] = [
      { id: 1, categoryName: 'mockCategory1', associatedDecks: 0 },
      { id: 2, categoryName: 'mockCategory2', associatedDecks: 1 },
    ];
    return of(mockCategories);
  }
}
