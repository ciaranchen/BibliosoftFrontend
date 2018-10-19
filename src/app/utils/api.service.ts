import { Injectable } from '@angular/core';
import { backendServer } from "./backendServer";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MetaBook} from "./DataStructs/MetaBook";
import {Book} from "./DataStructs/Book";
import {Fine} from "./DataStructs/Fine";
import {User} from "./DataStructs/User";
import {Borrow} from "./DataStructs/Borrow";

const postHeaders = new HttpHeaders()
  .set('Content-Type', 'application/x-www-form-urlencoded')
  .set('Accept', 'application/json');

const postOptions = {
  headers: postHeaders,
  withCredentials: true
};

const withCookie = {
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  base_url = backendServer.get_url();

  constructor(private http: HttpClient) { }

  static reader_and_librarian(role: string): boolean {
    return role === 'reader' || role === 'librarian';
  }

  static body_object(body: URLSearchParams, object: Object): void {
    for (let key in object) {
      if (object.hasOwnProperty(key) && object[key]) {
        body.set(key, object[key]);
      }
    }
  }

  login(username: string, password: string, type: number): Promise<User> {
    const url = `${this.base_url}/login`;
    const http = this.http;
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    body.set('type', type.toString());

    return new Promise<User>(
      function (resolve, reject) {
        http.post<User>(url, body.toString(), postOptions).subscribe(
          value => resolve(value),
          error1 => reject(error1));
      }
    );
  }

  logout(): Promise<void> {
    const url = `${this.base_url}/logout`,
      http = this.http;
    return new Promise<void>(
      function (resolve, reject) {
        http.post(url, postOptions).subscribe(
          value => resolve(),
          error1 => reject(error1)
        );
      }
    );
  }

  reset_admin_password(oldPass: string, newPass: string): Promise<boolean> {
    const url = `${this.base_url}/change_password`,
      http = this.http;
    const body = new URLSearchParams();
    body.set('old_password', oldPass);
    body.set('new_password', newPass);
    return new Promise<boolean>(
      function (resolve, reject) {
        http.post(url, body.toString(), postOptions).subscribe(
          value => resolve(true),
          error1 => error1.status === 403 ? resolve(false) : reject(error1)
        );
      }
    );
  }

  has_meta_book(isbn: string): Promise<boolean> {
    const url = `${this.base_url}/has_meta_book?isbn=${isbn}`;
    const http = this.http;
    return new Promise<boolean>(
      function (resolve, reject) {
        http.get(url, withCookie).subscribe(
          val => resolve(true),
          error1 => error1.status === 404? resolve(false) : reject(error1));
      }
    );
  }

  add_book(isbn: string, count: number, location: string, metaBook?: MetaBook): Promise<Array<Book>> {
    const url = `${this.base_url}/add_book`;
    const http = this.http;
    const body = new URLSearchParams();
    body.set('isbn', isbn);
    body.set('count', count.toString());
    body.set('location', location);

    if (metaBook) {
      // todo: check metaBook isbn is equal with this isbn;
      for (const key in metaBook) {
        if (metaBook.hasOwnProperty(key)) {
          body.set(key, metaBook[key]);
        }
      }
    }
    return new Promise<Array<Book>>(
      function (resolve, reject) {
        console.log(body.toString());
        http.put<Array<Book>>(url, body.toString(), postOptions)
          .subscribe(
            value => resolve(value),
            error1 => reject(error1)
          );
      }
    );
  }

  get_meta_book(isbn: string): Promise<MetaBook> {
    const url = `${this.base_url}/get_meta_book?isbn=${isbn}`;
    const http = this.http;
    return new Promise<MetaBook>(
      function (resolve, reject) {
        http.get<MetaBook>(url, withCookie).subscribe(
          value => resolve(value),
          error1 => reject(error1));
      }
    );
  }

  get_book(barcode: string): Promise<Book> {
    const url = `${this.base_url}/get_book?barcode=${barcode}`,
      http = this.http;
    return new Promise<Book>(
      function (resolve, reject) {
        http.get<Book>(url, withCookie).subscribe(
          value => resolve(value),
          error1 => reject(error1)
        );
      }
    );
  }

  get_books(isbn: string): Promise<Array<Book>> {
    const url = `${this.base_url}/get_books?isbn=${isbn}`;
    const http = this.http;
    return new Promise<Array<Book>>(
      function (resolve, reject) {
        http.get<Array<Book>>(url, withCookie).subscribe(
          value => resolve(value),
          error1 => reject(error1));
      }
    );
  }

  update_book(book: Book): Promise<void> {
    const url = `${this.base_url}/update_book`;
    const http = this.http;
    const body = new URLSearchParams();
    for (const key in book) {
      if (book.hasOwnProperty(key)) {
        body.set(key, book[key]);
      }
    }
    return new Promise<void>(
      function (resolve, reject) {
        http.post(url, body.toString(), postOptions).subscribe(
          value => resolve(),
          error => reject(error));
      }
    );
  }

  update_meta_book(metaBook: MetaBook): Promise<void> {
    const url = `${this.base_url}/update_meta_book`;
    const http = this.http;
    const body = new URLSearchParams();
    for (const key in metaBook) {
      if (metaBook.hasOwnProperty(key)) {
        body.set(key, metaBook[key]);
      }
    }
    return new Promise<void> (
      function (resolve, reject) {
        http.post(url, body.toString(), postOptions).subscribe(
          value => resolve(),
          error1 => reject(error1));
      }
    );
  }

  delete_book(barcode: string): Promise<void> {
    const url = `${this.base_url}/remove_book?barcode=${barcode}`;
    const http = this.http;
    return new Promise<void>(
      function (resolve, reject) {
        http.delete(url).subscribe(
          value => resolve(),
          error1 => reject(error1));
      }
    );
  }

  delete_meta_book(isbn: string): Promise<void> {
    const url = `${this.base_url}/remove_meta_book?isbn=${isbn}`;
    const http = this.http;
    return new Promise<void>(
      function (resolve, reject) {
        http.delete(url).subscribe(
          value => resolve(),
          error1 => reject(error1));
      }
    );
  }

  borrow(reader: string, barcode: string): Promise<boolean> {
    const url = `${this.base_url}/borrow`;
    const http = this.http;
    const body = new URLSearchParams();
    body.set('reader', reader);
    body.set('barcode', barcode);
    return new Promise<boolean>(
      function (resolve, reject) {
        http.post(url, body.toString(), postOptions).subscribe(
          value => resolve(true),
          error1 => error1.status === 400? resolve(false): reject(error1)
        );
      }
    );
  }

  borrow_records(reader_id: string, returned?: boolean): Promise<Array<Borrow>> {
    const url = `${this.base_url}/borrows?reader_id=${reader_id}`,
      http = this.http;
    return new Promise<Array<Borrow>> (
      function (resolve, reject) {
        http.get<Array<Borrow>>(url, withCookie).subscribe(
          value => resolve(value),
          error1 => reject(error1)
        );
      }
    );
  }

  return_book(borrowId: string): Promise<Fine> {
    const url = `${this.base_url}/return_book`,
      http = this.http;
    return new Promise<Fine>(
      function (resolve, reject) {
        http.post<Fine>(url, `borrow_id=${borrowId}`, postOptions).subscribe(
          value => resolve(value),
          error1 => reject(error1)
        );
      }
    )
  }

  borrow_fine(borrowId: number): Promise<Fine> {
    const url = `${this.base_url}/fine?borrow_id=${borrowId}`;
    const http = this.http;
    return new Promise<Fine>(
      function (resolve, reject) {
        http.get<Fine>(url, withCookie).subscribe(
          value => resolve(value),
          error1 => reject(error1)
        );
      }
    );
  }

  // todo: add type support
  get_fines(readerId: string, unpaid?: boolean) {
    const url = `${this.base_url}/fines?reader_id=${readerId}${ unpaid ? '&unpaid_only=' + unpaid.toString() : '' }`,
      http = this.http;
    return new Promise<any>(
      function (resolve, reject) {
        http.get(url, withCookie).subscribe(
          value => resolve(value),
          error1 => reject(error1)
        );
      }
    );
  }

  pay_fine(borrowId: number): Promise<void> {
    const url = `${this.base_url}/pay_fine`,
      http = this.http;
    return new Promise<void>(
      function (resolve, reject) {
        http.post(url, `borrow_id=${borrowId}`, postOptions).subscribe(
          value => resolve(),
          error1 => reject(error1)
        );
      }
    );
  }

  search_meta_book(param: string): Promise<Array<MetaBook>> {
    const url = `${this.base_url}/search?param=${param}`;
    const http = this.http;
    return new Promise<Array<MetaBook>>(
      function (resolve, reject) {
        http.get<Array<MetaBook>>(url, withCookie).subscribe(
          value => resolve(value),
          error1 => reject(error1));
      }
    );
  }

  // todo: check user type
  add_account(role: string, password: string, user: User): Promise<boolean> {
    const url = `${this.base_url}/add_${role}`;
    const http = this.http;
    const body = new URLSearchParams();
    body.set('password', password);
    ApiService.body_object(body, user);
    return ApiService.reader_and_librarian(role) ? new Promise<boolean>(
      function (resolve, reject) {
        http.post(url, body.toString(), postOptions).subscribe(
          val => resolve(true),
          err => err.status === 407 ? resolve(false) : reject(err)
        );
      }
    ) : undefined;
  }

  get_account(role: string, query: string): Promise<Array<User>> {
    const url = `${this.base_url}/${role}s?query=${query}`;
    const http = this.http;
    return new Promise<Array<User>>(
      function (resolve, reject) {
        http.get<Array<User>>(url, withCookie)
          .subscribe(
            value => resolve(value),
            error => reject(error));
      }
    );
  }

  reset_password(role: string, username: string, newPass: string): Promise<void> {
    const url = `${this.base_url}/reset_${role}_password`,
      http = this.http,
      body = new URLSearchParams();
    body.set('username', username);
    body.set('new_password', newPass);
    return ApiService.reader_and_librarian(role) ? new Promise<void> (
      function (resolve, reject) {
        http.post(url, body.toString(), postOptions).subscribe(
          val => resolve(),
          error => reject(error));
      }
    ) : undefined;
  }

  update_account(role: string, username: string, diff: Object): Promise<void> {
    const url = `${this.base_url}/update_${role}`,
      http = this.http;
    const body = new URLSearchParams();
    body.set('username', username);
    ApiService.body_object(body, diff);
    return ApiService.reader_and_librarian(role) ? new Promise<void>(
      function (resolve, reject) {
        http.post(url, body.toString(), postOptions).subscribe(
          value => resolve(),
          error1 => reject(error1));
      }
    ) : undefined;
  }
}
