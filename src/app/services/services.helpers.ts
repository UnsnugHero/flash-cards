import { Observable, of } from 'rxjs';

export function handleError<T>(operation, result?: T) {
  return (error: any): Observable<T> => {
    console.error(error);

    // user facing error message?

    return of(result as T);
  };
}
