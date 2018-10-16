import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RouterRedirectService {

  constructor(
    private router: Router
  ) { }

  only2(role1: string, role2: string, toLogin: boolean = false) {
    const role = localStorage.getItem('login');
    if (toLogin && !role) {
      this.to_login('reader');
    }
    if (!role || role !== role1 || role !== role2) {
      this.back_home();
    }
  }

  only(role: string, toLogin: boolean = false) {
    const login = localStorage.getItem('login');
    if (toLogin && !role) {
      this.to_login('reader');
    }
    if (!login || login !== role) {
      this.back_home();
    }
  }

  back_home() {
    const role = localStorage.getItem('login');
    if (role === 'admin') {
      this.router.navigate(['admin/']);
    } else if (role === 'librarian') {
      this.router.navigate(['librarian/']);
    } else if (role === 'reader') {
      this.router.navigate(['reader/']);
    } else {
      this.router.navigate(['']);
    }
  }

  to_login(role: string) {
    if (role === 'admin') {
      this.router.navigate(['admin/login']);
    } else {
      this.router.navigate(['login/' + role]);
    }
  }
}
