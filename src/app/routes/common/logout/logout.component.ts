import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from "../../../utils/api.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    localStorage.removeItem('login');
    this.apiService.logout();
    this.router.navigate(['/']);
  }
}
