import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../utils/api.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  user: string;
  pass: string;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const login = localStorage.getItem('login');
    if (login) {
      // redirect to other place
      if (login == 'admin') {
        this.router.navigate(['admin/', 1]);
      } else {
        this.router.navigate(['login/' + login, 1]);
      }
    }
  }

  admin_login(user?: string, pass?: string) {
    this.apiService.login(user ? user : this.user, pass ? pass : this.pass, 1)
      .then(res => {
        if (res) {
          localStorage.setItem('login', 'admin');
          const path = this.activatedRoute.params['path'];
          const url = path ? path : 'admin/';
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