import { Component, OnInit } from '@angular/core';
import { StateService } from "../../utils/state.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(
    public loginService: StateService
  ) { }

  ngOnInit() {
  }
}
