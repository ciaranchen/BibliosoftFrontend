import { Component, OnInit } from '@angular/core';
import {StateService} from "../../../utils/state.service";
import {ApiService} from "../../../utils/api.service";
import {Matcher} from "../../../utils/matcher";
import {FormControl, Validators} from "@angular/forms";
import {Post} from "../../../utils/DataStructs/Post";
import {Message, MessageService} from "../../../utils/message.service";

@Component({
  selector: 'app-admin-new-post',
  templateUrl: './admin-post.component.html',
  styleUrls: ['./admin-post.component.css']
})
export class AdminPostComponent implements OnInit {
  // posts: Array<Post> = [];
  addPost: Post = new Post('', '');

  requiredControl = new FormControl('', [Validators.required]);

  constructor(
    private messageService: MessageService,
    private stateService: StateService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.stateService.only('admin');
    // this.apiService.get_post()
    //   .then(res => {
    //     this.posts = res.splice(0, 3);
    //   });
  }

  add_post() {
    this.apiService.add_post(this.addPost)
      .then(() => {
        this.messageService.messages.push(new Message('add success!', 'success'))
      });
  }

  change_post() {
    // this.apiService.change_post()
  }
}
