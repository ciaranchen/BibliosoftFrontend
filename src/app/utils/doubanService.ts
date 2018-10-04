import { Injectable } from '@angular/core';
import {Md5} from 'md5-typescript';
import { cleanSession } from 'selenium-webdriver/safari';

const remove_timeout = 20000;

@Injectable()
export class DoubanService {
    private apiRoot = 'https://api.douban.com/v2/book';

    constructor() {}

    searchISBN(isbn: string) {

        return new Promise((resolve, reject) => {
            let timeId;
            const hash_str = Md5.init(isbn);
            const callbackName =  `jsonp_${hash_str}`;
            const url = `${this.apiRoot}/isbn/${isbn}?callback=${callbackName}`;
            const scriptElem = window.document.createElement('script');
            // clear all
            const clearFunction = () => {
                window.document.body.removeChild(scriptElem);
                delete window[callbackName];
            };
            // sucess
            window[callbackName] = res => {
                resolve(res);
                timeId = setTimeout(clearFunction, remove_timeout);
            };
            // fail
            scriptElem.onerror = () => {
                reject(new Error(`failed to get ${url}!`));
                clearFunction();
                if (timeId) { clearTimeout(timeId); }
            };
            scriptElem.id = callbackName;
            scriptElem.src = url;
            scriptElem.type = 'text/javascript';
            window.document.body.appendChild(scriptElem);
        });
    }
}

