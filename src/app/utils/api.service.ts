import { Injectable } from '@angular/core';
import { backendServer } from "./backendServer";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MetaBook} from "./DataStructs/MetaBook";
import {Book} from "./DataStructs/Book";
import {Fine} from "./DataStructs/Fine";
import {User} from "./DataStructs/User";

const postHeaders = new HttpHeaders()
  .set('Content-Type', 'application/x-www-form-urlencoded')
  .set('Accept', 'application/json');

const postOptions = {
  headers: postHeaders,
  withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  base_url = backendServer.get_url();

  constructor(private http: HttpClient) { }

  login(username: string, password: string, type: number): Promise<boolean> {
    const url = `${this.base_url}/login`;
    const http = this.http;
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    body.set('type', type.toString());

    return new Promise<boolean>(
      function (resolve, reject) {
        http.post(url, body.toString(), postOptions).subscribe(
          value => resolve(true),
          error1 => error1.status === 401? resolve(false): reject(error1));
      }
    );
  }

  register(password: string, role: number, account: User): Promise<boolean> {
    const url = `${this.base_url}/register`;
    const http = this.http;
    const body = new URLSearchParams();
    body.set('password', password);
    body.set('role', role.toString());
    for (const key in account) {
      if (account.hasOwnProperty(key)) {
        body.set(key, account[key]);
      }
    }
    return new Promise<boolean>(
      function (resolve, reject) {
        http.post(url, body.toString(), postOptions).subscribe(
          value => resolve(true),
          error1 => error1.status === 407? resolve(false): reject(error1));
      }
    );
  }

  has_meta_book(isbn: string): Promise<boolean> {
    const url = `${this.base_url}/has_meta_book?isbn=${isbn}`;
    const http = this.http;
    return new Promise<boolean>(
      function (resolve, reject) {
        http.get(url).subscribe(
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
        http.get<MetaBook>(url).subscribe(
          value => resolve(value),
          error1 => reject(error1));
      }
    );
  }

  get_books(isbn: string): Promise<Array<Book>> {
    const url = `${this.base_url}/get_books?isbn=${isbn}`;
    const http = this.http;
    return new Promise<Array<Book>>(
      function (resolve, reject) {
        http.get<Array<Book>>(url).subscribe(
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

  borrow(reader: string, barcode: string): Promise<void> {
    const url = `${this.base_url}/borrow`;
    const http = this.http;
    return new Promise<void>(
      function (resolve, reject) {
        const body = new URLSearchParams();
        body.set('reader', reader);
        body.set('barcode', barcode);
        http.post(url, body.toString(), postOptions).subscribe(
          value => resolve(),
          error1 => reject(error1)
        );
      }
    );
  }

  borrow_fine(borrow_id: number): Promise<Fine> {
    const url = `${this.base_url}/fine?borrow_id=${borrow_id}`;
    const http = this.http;
    return new Promise<Fine>(
      function (resolve, reject) {
        http.get<Fine>(url).subscribe(
          value => resolve(value),
          error1 => reject(error1)
        );
      }
    )
  }

  search_meta_book(param: string): Promise<Array<MetaBook>> {
    const url = `${this.base_url}/search?param=${param}`;
    const http = this.http;
    return new Promise<Array<MetaBook>>(
      function (resolve, reject) {
        http.get<Array<MetaBook>>(url).subscribe(
          value => resolve(value),
          error1 => reject(error1));
      }
    );
  }

  get_librarian(query: string): Promise<Array<User>> {
    const url = `${this.base_url}/librarians?query=${query}`;
    const http = this.http;
    return new Promise<Array<User>>(
      function (resolve, reject) {
        http.get<Array<User>>(url)
          .subscribe(
            value => resolve(value),
            error => reject(error));
      }
    );
  }

  reset_librarian_password(user: string, newpass: string): Promise<void> {
    const url = `${this.base_url}/reset_librarian_password`,
      http = this.http,
      body = new URLSearchParams();
    body.set('username', user);
    body.set('new_password', newpass);
    return new Promise<void> (
      function (resolve, reject) {
        http.post(url, body.toString(), postOptions).subscribe(
          val => resolve(),
          error => reject(error));
      }
    );
  }

  update_librarian(username: string, diff: Object): Promise<void> {
    const url = `${this.base_url}/update_librarian`,
      http = this.http;
    return new Promise<void>(
      function (resolve, reject) {
        const body = new URLSearchParams();
        body.set('username', username);
        for (const key in diff) {
          if (diff.hasOwnProperty(key)) {
            body.set(key, diff[key]);
          }
        }
        http.post(url, body.toString(), postOptions).subscribe(
          value => resolve(),
          error1 => reject(error1));
      }
    );
  }

  get_reader(query: string): Promise<Array<User>> {
    const url = `${this.base_url}/reader?query=${query}`,
      http = this.http;
    return new Promise<Array<User>>(
      function (resolve, reject) {
        http.get<Array<User>>(url)
          .subscribe(
            value => resolve(value),
            error => reject(error));
      }
    );
  }

  reset_reader_password(user: string, newpass: string): Promise<void> {
    const url = `${this.base_url}/reset_reader_password`,
      http = this.http,
      body = new URLSearchParams();
    body.set('username', user);
    body.set('new_password', newpass);
    return new Promise<void> (
      function (resolve, reject) {

        http.post(url, body.toString(), postOptions).subscribe(
          val => resolve(),
          error => reject(error));
      }
    );
  }

  update_reader(username:string, diff: Object): Promise<void> {
    const url = `${this.base_url}/update_reader`;
    const http = this.http;
    const body = new URLSearchParams();
    body.set('username', username);
    for (const key in diff) {
      if (diff.hasOwnProperty(key)) {
        body.set(key, diff[key]);
      }
    }
    return new Promise<void>(
      function (resolve, reject) {
        http.post(url, body.toString(), postOptions).subscribe(
          value => resolve(),
          error1 => reject(error1));
      }
    );
  }
}
