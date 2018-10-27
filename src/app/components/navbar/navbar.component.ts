import { Component, OnInit } from '@angular/core';
import { StateService } from "../../utils/state.service";
import { Location } from "@angular/common";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(
    public loginService: StateService,
    public location: Location
  ) { }

  ngOnInit() {}

  debug_nav() {
    console.log(this.loginService.user);
    console.log(this.loginService.role);
  }
}
