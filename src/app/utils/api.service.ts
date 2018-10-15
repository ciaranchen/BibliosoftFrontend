import { Injectable } from '@angular/core';
import { backendServer } from "./backendServer";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MetaBook} from "./DataStructs/MetaBook";
import {User} from "./DataStructs/User";
import {Book} from "./DataStructs/Book";

const postHeaders = new HttpHeaders()
  .set('Content-Type', 'application/x-www-form-urlencoded')
  .set('Accept', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  base_url = backendServer.get_url();

  constructor(private http: HttpClient) { }

  login(username: string, password: string, type: number): Promise<boolean> {
    const url = `${this.base_url}/login`;
    const http = this.http;
    return new Promise<boolean>(
      function (resolve, reject) {
        const body = new URLSearchParams();
        body.set('username', username);
        body.set('password', password);
        body.set('type', type.toString());
        http.post(url, body.toString(), {
          withCredentials: true,
          headers: postHeaders
        }).subscribe(
          value => resolve(true),
          error1 => {
            if (error1.status == 401) {
              resolve(false);
            } else {
              reject(error1);
            }
          }
        );
      }
    );
  }

  register(user: User): Promise<boolean> {
    const url = `${this.base_url}/register`;
    const http_client = this.http;
    return new Promise<boolean>(
      function (resolve, reject) {
        const body = new URLSearchParams();
        for (const key in user) {
          if (user.hasOwnProperty(key)) {
            body.set(key, user[key]);
          }
        }
        http_client.post(url, body.toString(), {headers: postHeaders})
          .subscribe(
            value => resolve(true),
            error1 => {
              if (error1.status == 401) {
                resolve(false);
              } else {
                reject(error1);
              }
            }
          );
      }
    );
  }

  has_meta_book(isbn: string): Promise<boolean> {
    const url = `${this.base_url}/has_meta_book?isbn=${isbn}`;
    const http_client = this.http;
    return new Promise<boolean>(
      function (resolve, reject) {
        http_client.get(url).subscribe(
          val => {
            resolve(true);
          },
          error1 => {
            if (error1.status === 404) {
              resolve(false);
            } else {
              console.error(error1);
              reject(error1);
            }
          }
        );
      }
    );
  }

  add_book(isbn: string, count: number, location: string, metaBook?: MetaBook): Promise<Array<Book>> {
    const url = `${this.base_url}/add_book`;
    const http_client = this.http;
    return new Promise<Array<Book>>(
      function (resolve, reject) {
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
        console.log(body.toString());
        // todo: return type;
        http_client.put<Array<Book>>(url, body.toString(), { headers: postHeaders })
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
        http.get<MetaBook>(url)
          .subscribe(
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
        http.get<Array<Book>>(url)
          .subscribe(
            value => resolve(value),
            error1 => reject(error1)
          );
      }
    );
  }

  update_book(book: Book): Promise<boolean> {
    const url = `${this.base_url}/update_book`;
    const http = this.http;
    return new Promise<boolean>(
      function (resolve, reject) {
        const body = new URLSearchParams();
        for (const key in book) {
          if (book.hasOwnProperty(key)) {
            body.set(key, book[key]);
          }
        }
        http.post(url, body.toString(), {headers: postHeaders})
          .subscribe(
            value => resolve(true),
            error => resolve(false)
          )
      }
    )
  }

  update_meta_book(metaBook: MetaBook): Promise<boolean> {
    const url = `${this.base_url}/update_meta_book`;
    const http = this.http;
    return new Promise<boolean> (
      function (resolve, reject) {
        const body = new URLSearchParams();
        for (const key in metaBook) {
          if (metaBook.hasOwnProperty(key)) {
            body.set(key, metaBook[key]);
          }
        }
        http.post(url, body.toString(), {headers: postHeaders})
          .subscribe(
            value => resolve(true),
            error1 => reject(false)
          );
      }
    );
  }

  delete_book(barcode: string): Promise<boolean> {
    const url = `${this.base_url}/remove_book?barcode=${barcode}`;
    const http = this.http;
    return new Promise<boolean>(
      function (resolve, reject) {
        http.delete(url)
          .subscribe(
            value => resolve(true),
            error1 => {
              if (error1 == 400) {
                resolve(false);
              } else {
                reject(error1);
              }
            }
          );
      }
    );
  }

  delete_meta_book(isbn: string): Promise<boolean> {
    const url = `${this.base_url}/remove_meta_book?isbn=${isbn}`;
    const http = this.http;
    return new Promise<boolean>(
      function (resolve, reject) {
        http.delete(url)
          .subscribe(
            value => resolve(true),
            error1 => {
              if (error1 == 404) {
                // isbn not exits
                resolve(false);
              } else {
                reject(error1);
              }
            }
          );
      }
    );
  }

  search_meta_book(param: string): Promise<Array<MetaBook>> {
    const url = `${this.base_url}/search?param=${param}`;
    const http_client = this.http;
    return new Promise<Array<MetaBook>>(
      function (resolve, reject) {
        http_client.get<Array<MetaBook>>(url).subscribe(
          value => {
            resolve(value);
          },
          error1 => reject(error1)
        );
      }
    );
  }
}
