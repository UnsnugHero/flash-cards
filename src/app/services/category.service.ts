import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs/operators';
import { Category } from '@models/deck.model';
import { CategorySearchPayload } from '@models/payload.model';
import { handleError } from './services.helpers';

const DEBOUNCE_TIME = 300;

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  public categorySubject$ = new BehaviorSubject<string>('');

  private categoriesUrl: string = 'api/categories';

  constructor(private http: HttpClient) {}

  public addCategory(payload): Observable<any> {
    return of('');
  }

  public deleteCategory(id): Observable<any> {
    return of('');
  }

  public editCategory(payload, id): Observable<any> {
    return of('');
  }

  // used for getting categories based on the value of the categorySubject$
  public getCategories(): Observable<Category[]> {
    return this.categorySubject$.pipe(
      debounceTime(DEBOUNCE_TIME),
      map((query) => query.trim()),
      distinctUntilChanged(),
      switchMap((query) => this.search({ name: query }))
    );
  }

  //TODO: payloads for service functions?
  // this payload will be { name: ???, sortBy?: { ??? }, page?: ???, pageSize?: ??? }
  public search(payload: CategorySearchPayload): Observable<Category[]> {
    // wont need this later, also this method should send a post request?
    if (payload.name === '') {
      return this.http
        .get<Category[]>(this.categoriesUrl)
        .pipe(catchError(handleError('getCategories', [])));
    }
    const mockCategories: Category[] = [
      { id: 1, categoryName: 'mockCategory1', associatedDecks: 0 },
      { id: 2, categoryName: 'mockCategory2', associatedDecks: 1 },
    ];
    return of(mockCategories);
  }
}
