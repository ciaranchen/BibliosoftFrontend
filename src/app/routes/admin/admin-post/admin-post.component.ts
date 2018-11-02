import { Component, OnInit } from '@angular/core';
import {StateService} from "../../../utils/state.service";
import {ApiService} from "../../../utils/api.service";
import {Matcher} from "../../../utils/matcher";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-admin-new-post',
  templateUrl: './admin-post.component.html',
  styleUrls: ['./admin-post.component.css']
})
export class AdminPostComponent implements OnInit {

  post = {
    title: 'temp title',
    content: 'temp content'
  };

  requiredControl = new FormControl('', [Validators.required]);

  constructor(
    private stateService: StateService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    // this.stateService.only('admin');
    // todo: get post
    // this.apiService.get_post()
  }

  change_post() {
    // todo: send post
    // this.apiService.change_post()
  }
}
