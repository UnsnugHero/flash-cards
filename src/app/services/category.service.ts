import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
