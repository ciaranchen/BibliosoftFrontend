import { Injectable } from '@angular/core';
import { Book } from './book';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private booksUrl = 'api/books';
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  private log(message: string) {
    this.messageService.add(`BookService: ${message}`);
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getBooks(term: string,type: string): Observable<Book[]> {
    // console.log(`${this.booksUrl}/?${type}=${term}`);
    // const url = `${this.booksUrl}/${type}`;
    // console.log(url)
    // return this.http.get<Book[]>(`${this.booksUrl}/?${type}=${term}`)
    return this.http.get<Book[]>(`${this.booksUrl}/?${type}=${term}`)
      .pipe(
        tap(books => this.log('fetch books')),
        catchError(this.handleError('getBooks', []))
      );
  }

  getBook(ISBN: string): Observable<Book[]> {
    const url = `${this.booksUrl}/${ISBN}`;
    // console.log(url)
    return this.http.get<Book[]>(`${this.booksUrl}/?ISBN=${ISBN}`).pipe(
      tap(_ => this.log(`fetched book ISBN=${ISBN}`)),
      catchError(this.handleError(`getBook ISBN=${ISBN}`,[]))
    );
  }
}
