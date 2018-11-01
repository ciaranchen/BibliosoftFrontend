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
    this.save_user_to_localStorage(role, user);
    if (path) {
      return this.router.navigate([path]);
    } else {
      return this.back_home();
    }
  }

  logout(): void {
    this.delete_user_from_localStorage();
    delete this.user;
    delete this.role;
  }

  need_login(role1?: string, role2?: string): void {
    // try load from localStorage
    const user = this.load_user_from_localStorage(role1) || this.load_user_from_localStorage(role2);
    if (user) {
      this.role = localStorage.getItem('login');
      this.user = user;
      console.log('cover from localStorage');
      return;
    }

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
    this.need_login(role1, role2);
    const role = (this.role);
    if (role !== role1 && role !== role2) {
      // noinspection JSIgnoredPromiseFromCall
      this.back_home();
    }
  }

  only(role: string): void {
    this.need_login(role);
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

  private save_user_to_localStorage(role: string, obj: User) {
    console.log('save to localStorage');
    localStorage.setItem('login', role);
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && obj[key]) {
        localStorage.setItem(key, obj[key]);
      }
    }
  }

  private load_user_from_localStorage(role: string): User {
    if (localStorage.getItem('login') !== role) {
      return null;
    }
    const user = new User('', '', '', '', '');
    for (const key in user) {
      if (user.hasOwnProperty(key)) {
        user[key] = localStorage.getItem(key);
      }
    }
    return user;
  }

  private delete_user_from_localStorage() {
    localStorage.clear();
  }

  update_profile(user: User) {
    this.user = user;
    this.save_user_to_localStorage(this.role, user);
  }
}
