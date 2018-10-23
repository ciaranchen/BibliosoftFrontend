import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from "../../../utils/api.service";
import {RouterRedirectService} from "../../../utils/router-redirect.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private routerRedirect: RouterRedirectService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    localStorage.removeItem('login');
    this.apiService.logout();
    this.routerRedirect.back_home();
  }
}
