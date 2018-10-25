import { Injectable } from '@angular/core';
import {User} from "./DataStructs/User";
import {Router} from "@angular/router";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class StateService {
  role: string;
  user: User;

  constructor(
    private router: Router
  ) {}

  login(role: string, user: User, path?: string): Promise<boolean> {
    this.role = role;
    this.user = user;
    if (path) {
      return this.router.navigate([path]);
    } else {
      return this.back_home();
    }
  }

  logout(): void {
    delete this.user;
    delete this.role;
  }

  need_login(): void {
    if (!(this.role)) {
      // noinspection JSIgnoredPromiseFromCall
      this.to_login();
    }
  }

  need_not_login(): void {
    if (this.role) {
      // noinspection JSIgnoredPromiseFromCall
      this.back_home();
    }
  }

  only2(role1: string, role2: string): void {
    this.need_login();
    const role = (this.role);
    if (role !== role1 && role !== role2) {
      // noinspection JSIgnoredPromiseFromCall
      this.back_home();
    }
  }

  only(role: string): void {
    this.need_login();
    if (this.role !== role) {
      // noinspection JSIgnoredPromiseFromCall
      this.back_home();
    }
  }

  only_rl(): void {
    this.only2('reader', 'librarian');
  }

  back_home(): Promise<boolean> {
    return this.router.navigate(this.role ? [`/${this.role}`] : ['/']);
  }

  to_login(): Promise<boolean> {
    const pathname = location.pathname;
    console.log(pathname);
    const role = pathname.split('/')[1];
    const search = ApiService.query2json(location.search);
    if (role === 'admin' || role === 'reader' || role === 'librarian') {
      return this._to_login(role, pathname, search);
    }
    return this._to_login('reader', pathname, search);
  }

  private _to_login(role: string, path?: string, search?: object): Promise<boolean> {
    let params = search ? search : {};
    if (path && !(params['path'])) {
      params['path'] = path;
    }
    // console.log(params);
    return this.router.navigate(
      role === 'admin' ? ['/admin/login'] : ['/login/' + role],
      {queryParams: params});
  }
}
