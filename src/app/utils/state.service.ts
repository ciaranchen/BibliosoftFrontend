import { Injectable } from '@angular/core';
import {User} from "./DataStructs/User";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class StateService {
  role: string;
  user: User;

  constructor(
    private router: Router
  ) {}

  login(role: string, user: User) {
    this.role = role;
    this.user = user;
  }

  logout() {
    delete this.user;
    delete this.role;
  }

  need_login() {
    if (!(this.role)) {
      this.to_login();
    }
  }

  need_not_login() {
    if ((this.role)) {
      this.back_home();
    }
  }

  only2(role1: string, role2: string, toLogin: boolean = false) {
    const role = (this.role);
    if (toLogin && !role) {
      this.to_login();
    }
    if (!role || (role !== role1 && role !== role2)) {
      this.back_home();
    }
  }

  only(role: string, toLogin: boolean = false) {
    const login = (this.role);
    if (toLogin && !role) {
      return this.to_login();
    }
    if (!login || login !== role) {
      this.back_home();
    }
  }

  back_home() {
    const role = (this.role);
    if (role) {
      this.router.navigate([`/${role}/`])
    } else {
      this.router.navigate(['/']);
    }
  }

  to_login() {
    const pathname = location.pathname;
    console.log(pathname);
    // todo: define where it should go
    return this._to_login('reader', pathname, location.search);
  }

  _to_login(role: string, path?: string, search?: string) {
    if (role === 'admin') {
      this.router.navigate(['admin/login']);
    } else {
      this.router.navigate(['login/' + role]);
    }
  }

  only_rl() {
    this.only2('reader', 'librarian');
  }
}
