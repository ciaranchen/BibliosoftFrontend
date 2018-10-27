import { Component, OnInit } from '@angular/core';
import {StateService} from "../../../utils/state.service";

@Component({
  selector: 'app-librarian-home',
  templateUrl: './librarian-home.component.html',
  styleUrls: ['./librarian-home.component.css']
})
export class LibrarianHomeComponent implements OnInit {

  constructor(
    private stateService: StateService
  ) { }

  ngOnInit() {
    this.stateService.only('librarian');
    // todo: get library fine record
  }

}
