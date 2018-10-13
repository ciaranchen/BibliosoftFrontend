import { Component } from '@angular/core';
import {ApiService} from "../../../utils/api.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  user: string;
  pass: string;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  admin_login(user?: string, pass?: string) {
    this.apiService.login(user ? user : this.user, pass ? pass : this.pass)
      .then(res => {
        if (res) {
          localStorage.setItem('login', String(3));
          localStorage.setItem('role', 'admin');
          const path = this.activatedRoute.params['path'];
          const url = path ? path : 'admin/login';
          this.router.navigate([url, 1]);
        } else {
          // todo: show error;
          console.log('login failed');
          console.error(res);
        }
      }).catch((err) => {
        console.error(err);
      });
  }
}
