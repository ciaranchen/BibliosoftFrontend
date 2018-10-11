import { Injectable } from '@angular/core';
import { backendServer } from "./backendServer";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MetaBook} from "./DataStructs/MetaBook";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  base_url = backendServer.get_url();

  constructor(private http: HttpClient) { }

  has_meta_book(isbn: string): Promise<boolean|Error> {
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

  add_book(isbn: string, count: number, location: string, metaBook?: MetaBook) {
    const url = `${this.base_url}/has_meta_book?isbn=${isbn}`;
    const http_client = this.http;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return new Promise<object>(
      function (resolve, reject) {
        const params = new URLSearchParams();
        params.append('isbn', isbn);
        params.append('count', count.toString());
        params.append('location', location);
        if (metaBook) {
          // todo: check metaBook isbn is equal with this isbn;
          for (const key in metaBook) {
            if (metaBook.hasOwnProperty(key)) {
              params.append(key, metaBook[key]);
            }
          }
        }
        http_client.put(url, params, { headers: headers })
          .subscribe(
            value => resolve(value),
            error1 => reject(error1)
          );
      }
    );
  }


}
