import { Injectable } from '@angular/core';
import { backendServer } from './backendServer';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MetaBook} from './DataStructs/MetaBook';
import {Book} from './DataStructs/Book';
import {User} from './DataStructs/User';
import {DayIncome} from './DataStructs/DayIncome';
import {Borrow} from './DataStructs/Borrow';
import {TotalIncome} from './DataStructs/TotalIncome';
import {Rule} from './DataStructs/Rule';
import {BookLocation} from './DataStructs/BookLocation';
import * as JsBarcode from 'jsbarcode';
import {Post} from './DataStructs/Post';
import { Category } from './DataStructs/Category';
import {Reserve} from "./DataStructs/Reserve";

const postHeaders = new HttpHeaders()
  .set('Content-Type', 'application/x-www-form-urlencoded')
  .set('Accept', 'application/json');

const updateHeaders = new HttpHeaders()
.set('Content-Type', 'application/json')
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

  // static get_diff(source: object, dist: object): object {
  //   const diff = {};
  //   for (const key in source) {
  //     if (source.hasOwnProperty(key) && source[key] !== dist[key]) {
  //       diff[key] = dist[key];
  //     }
  //   }
  //   return diff;
  // }

  static get_time(x: string): string {
    return (new Date(x)).toLocaleString();
  }

  static download_barcode (barcode: string) {
    const canvasElem = window.document.createElement('canvas');
    JsBarcode(canvasElem, barcode);
    const a = window.document.createElement('a');
    a.href = canvasElem.toDataURL('image/png');  // 将画布内的信息导出为png图片数据
    a.download = `code_${barcode}`;
    a.click();
  }

  static reader_and_librarian(role: string): boolean {
    return role === 'reader' || role === 'librarian';
  }

  static body_object(body: URLSearchParams, obj: object, empty: boolean=false): void {
    for (let key in obj) {
      if (obj.hasOwnProperty(key) && (empty || obj[key])) {
        body.set(key, obj[key].toString());
      }
    }
  }

  static query2json(query: string): object {
    const pairs = query.slice(1).split('&');
    let res = {};
    pairs.forEach(val => {
      let p = val.split('=');
      res[p[0]] = decodeURIComponent(p[1] || '');
    });
    return JSON.parse(JSON.stringify(res));
  }

  static json2query(obj: object): string {
    const body = new URLSearchParams();
    this.body_object(body, obj, false);
    return body.toString();
  }

  static date2string(date: Date): string {
    const options = {year: 'numeric', month: '2-digit', day: '2-digit'};
    return date.toLocaleDateString('iso', options).replace(/\//g, '-');
  }

  login(username: string, password: string, type: number): Promise<User> {
    const url = `${this.base_url}/login`;
    const body = ApiService.json2query({
      username: username,
      password: password,
      role: type.toString()
    });
    return this.http.post<User>(url, body, postOptions).toPromise();
  }

  logout(): Promise<void> {
    return this.http.post<void>(`${this.base_url}/logout`, postOptions).toPromise();
  }

  reset_password_nologin1(username): Promise<void> {
    const url = `${this.base_url}/reset_password`;
    return this.http.post<void>(url, `username=${username}`, postOptions).toPromise();
  }

  reset_password_nologin2(username, token, new_password): Promise<void> {
    const url = `${this.base_url}/reset_password`;
    const body = ApiService.json2query({
      username: username,
      token: token,
      new_password: new_password
    });
    return this.http.post<void>(url, body, postOptions).toPromise();
  }

  reset_self_password(oldPass: string, newPass: string): Promise<boolean> {
    const url = `${this.base_url}/change_password`,
      http = this.http;
    const body = new URLSearchParams();
    body.set('old_password', oldPass);
    body.set('new_password', newPass);
    return new Promise<boolean>((resolve, reject) => {
      http.post(url, body.toString(), postOptions).subscribe(
        () => resolve(true),
        error1 => error1.status === 403 ? resolve(false) : reject(error1)
      );
    });
  }

  has_meta_book(isbn: string): Promise<boolean> {
    const url = `${this.base_url}/has_meta_book?isbn=${isbn}`;
    const http = this.http;
    return new Promise<boolean>(
      function (resolve, reject) {
        http.get(url, withCookie).subscribe(
          () => resolve(true),
          error1 => error1.status === 404? resolve(false) : reject(error1));
      }
    );
  }

  add_book(isbn: string, count: number, location: BookLocation, metaBook?: MetaBook): Promise<Array<Book>> {
    const url = `${this.base_url}/add_book`;
    const http = this.http;
    const body = new URLSearchParams();
    body.set('isbn', isbn);
    body.set('count', count.toString());
    body.set('location', location.toString());

    if (metaBook) {
      delete metaBook.isbn;
      ApiService.body_object(body, metaBook);
    }
    return http.put<Array<Book>>(url, body.toString(), postOptions).toPromise();
  }

  get_meta_book(isbn: string): Promise<MetaBook> {
    const url = `${this.base_url}/get_meta_book?isbn=${isbn}`;
    return this.http.get<MetaBook>(url, withCookie).toPromise();
  }

  get_book(barcode: string): Promise<Book> {
    const url = `${this.base_url}/get_book?barcode=${barcode}`;
    return this.http.get<Book>(url, withCookie).toPromise();
  }

  get_books(isbn: string): Promise<Array<Book>> {
    const url = `${this.base_url}/get_books?isbn=${isbn}`;
    return this.http.get<Array<Book>>(url, withCookie).toPromise();
  }

  trends_book(count?: number): Promise<Array<MetaBook>> {
    const url = `${this.base_url}/trends?${ApiService.json2query({count: count || 10})}`;
    return this.http.get<Array<MetaBook>>(url, withCookie).toPromise();
  }

  update_book(book: Book): Promise<void> {
    const url = `${this.base_url}/update_book`;
    // const body = new URLSearchParams();
    // ApiService.body_object(body, book);
    return this.http.post<void>(url, book, {
      headers: updateHeaders,
      withCredentials: true
    }).toPromise();
  }

  update_meta_book(metaBook: MetaBook): Promise<void> {
    const url = `${this.base_url}/update_meta_book`;
    // const body = new URLSearchParams();
    // ApiService.body_object(body, metaBook);
    return this.http.post<void>(url, metaBook, {
      headers: updateHeaders,
      withCredentials: true
    }).toPromise();
  }

  delete_book(barcode: string): Promise<void> {
    const url = `${this.base_url}/remove_book?barcode=${barcode}`;
    return this.http.delete<void>(url, withCookie).toPromise();
  }

  delete_meta_book(isbn: string): Promise<void> {
    const url = `${this.base_url}/remove_meta_book?isbn=${isbn}`;
    return this.http.delete<void>(url, withCookie).toPromise();
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
          () => resolve(true),
          error1 => error1.status === 400? resolve(false): reject(error1)
        );
      }
    );
  }

  reserve_book(readerId: string, barcode: string): Promise<Reserve> {
    const url = `${this.base_url}/reserve`;
    return this.http.post<Reserve>(url, ApiService.json2query({reader: readerId, barcode: barcode}), postOptions).toPromise();
  }

  get_borrow(borrowId: string): Promise<Borrow> {
    const url = `${this.base_url}/borrow?borrow_id=${borrowId}`;
    return this.http.get<Borrow>(url, withCookie).toPromise();
  }

  borrow_records(reader_id: string): Promise<Array<Borrow>> {
    const url = `${this.base_url}/borrows?reader_id=${reader_id}`;
    return this.http.get<Array<Borrow>>(url, withCookie).toPromise();
  }

  return_book(borrowId: string): Promise<boolean> {
    const url = `${this.base_url}/return_book`,
      http = this.http;
    const body = new URLSearchParams();
    body.set('borrow_id', borrowId);
    return new Promise<boolean>(function (resolve, reject) {
      return http.post<void>(url, body.toString(), postOptions).subscribe(
        () => resolve(true),
        error => error.status === 402 ? resolve(false) : reject(error)
      );
    });
  }

  borrow_fine(borrowId: string): Promise<Borrow> {
    const url = `${this.base_url}/fine?borrow_id=${borrowId}`;
    return this.http.get<Borrow>(url, withCookie).toPromise();
  }

  get_fines(readerId: string, unpaid?: boolean): Promise<Array<Borrow>> {
    const url = `${this.base_url}/fines?${ApiService.json2query({reader_id: readerId, unpaid_only: unpaid})}`;
    return this.http.get<Array<Borrow>>(url, withCookie).toPromise();
  }

  pay_fine(borrowId: string): Promise<void> {
    const url = `${this.base_url}/return_with_pay_fine`;
    const body = new URLSearchParams();
    body.set('borrow_id', borrowId);
    return this.http.post<void>(url, body.toString(), postOptions).toPromise();
  }

  search_meta_book(param: string): Promise<Array<MetaBook>> {
    const url = `${this.base_url}/search?param=${param ? param : ''}`;
    return this.http.get<Array<MetaBook>>(url, withCookie).toPromise();
  }

  add_account(role: string, password: string, user: User): Promise<boolean> {
    const url = `${this.base_url}/add_${role}`;
    const http = this.http;
    const body = new URLSearchParams();
    body.set('password', password);
    ApiService.body_object(body, user);
    return ApiService.reader_and_librarian(role) ? new Promise<boolean>(
      function (resolve, reject) {
        http.post(url, body.toString(), postOptions).subscribe(
          () => resolve(true),
          err => err.status === 407 ? resolve(false) : reject(err)
        );
      }
    ) : undefined;
  }

  get_account(role: string, query: string): Promise<Array<User>> {
    const url = `${this.base_url}/${role}s?${ ApiService.json2query({query: query}) }`;
    return this.http.get<Array<User>>(url, withCookie).toPromise();
  }

  reset_password(role: string, username: string, newPass: string): Promise<void> {
    const url = `${this.base_url}/reset_${role}_password`,
      body = new URLSearchParams();
    body.set('username', username);
    body.set('new_password', newPass);
    return ApiService.reader_and_librarian(role) ?
      this.http.post<void>(url, body.toString(), postOptions).toPromise() : undefined;
  }

  update_account(role: string, user: User): Promise<void> {
    const url = `${this.base_url}/update_${role}`,
      body = ApiService.json2query(user);
    return ApiService.reader_and_librarian(role) ?
      this.http.post<void>(url, body.toString(), postOptions).toPromise() : undefined;
  }

  remove_account(role: string, username: string): any {
    const url = `${this.base_url}/remove_${role}?${role}=${username}`;
    return this.http.delete(url, withCookie).toPromise();
  }

  total_income(): Promise<TotalIncome> {
    const url = `${this.base_url}/brief_income`;
    return this.http.get<TotalIncome>(url, withCookie).toPromise();
  }

  get_incomes(start: Date, end: Date): Promise<Array<DayIncome>> {
    const url = `${this.base_url}/income?${ApiService.json2query({
      start: ApiService.date2string(start),
      end: ApiService.date2string(end)})}`;
    return this.http.get<Array<DayIncome>>(url, withCookie).toPromise();
  }

  library_config(): Promise<Rule> {
    const url = `${this.base_url}/library_config`;
    return this.http.get<Rule>(url, withCookie).toPromise();
  }

  update_config(rule: Rule): Promise<void> {
    const url = `${this.base_url}/update_config`;
    return this.http.post<void>(url, rule, {
      headers: updateHeaders,
      withCredentials: true
    }).toPromise();
  }

  get_post(): Promise<Array<Post>> {
    const url = `${this.base_url}/posts`;
    return this.http.get<Array<Post>>(url, withCookie).toPromise();
  }

  add_post(post: Post): Promise<void> {
    const url = `${this.base_url}/add_post`;
    return this.http.post<void>(url, ApiService.json2query(post), postOptions).toPromise();
  }

  remove_post(id: number): Promise<void> {
    const url = `${this.base_url}/remove_post?id=${ id.toString() }`;
    return this.http.delete<void>(url, withCookie).toPromise();
  }

  add_category(category: Category): Promise<void> {
    const url = `${this.base_url}/add_category`;
    return this.http.post<void>(url, ApiService.json2query({category: category.msg}), postOptions).toPromise();
  }

  remove_category(category: Category): Promise<void> {
    const url = `${this.base_url}/remove_category?category=${category.msg}`;
    return this.http.delete<void>(url, withCookie).toPromise();
  }

  get_all_category(): Promise<Category[]> {
    const url = `${this.base_url}/categories`;
    return this.http.get<string[]>(url, withCookie).toPromise()
      .then(res => res.map(val => new Category(val)));
  }

  get_category(category: Category): Promise<MetaBook[]> {
    const url = `${this.base_url}/category/${category.msg}`;
    return this.http.get<MetaBook[]>(url, withCookie).toPromise();
  }

  cancel_reserve(reserve_id: string): Promise<void> {
    const url = `${this.base_url}/cancel_reserve`;
    return this.http.post<void>(url, ApiService.json2query({reserve_id: reserve_id}), postOptions).toPromise();
  }

  get_reserves(): Promise<Reserve[]> {
    const url = `${this.base_url}/reserves`;
    return this.http.get<Reserve[]>(url, withCookie).toPromise();
  }
}
