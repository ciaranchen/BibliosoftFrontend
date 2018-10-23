import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../utils/api.service";
import {StateService} from "../../../utils/state.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private loginService: StateService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.apiService.logout()
      .then(() => {
        this.loginService.logout();
        this.loginService.back_home();
      });
  }
}
