import { Component, OnInit } from '@angular/core';
import {StateService} from "../../../utils/state.service";
import {ApiService} from "../../../utils/api.service";
import {FormControl, Validators} from "@angular/forms";
import {Post} from "../../../utils/DataStructs/Post";
import {MessageService} from "../../../utils/message.service";

@Component({
  selector: 'app-admin-new-post',
  templateUrl: './admin-post.component.html',
  styleUrls: ['./admin-post.component.css']
})
export class AdminPostComponent implements OnInit {
  posts: Array<Post> = [];
  addPost: Post = new Post('', '');

  requiredControl = new FormControl('', [Validators.required]);

  constructor(
    private messageService: MessageService,
    private stateService: StateService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.stateService.only('admin');
    this.apiService.get_post().then(res => this.posts = res);
  }

  add_post() {
    this.apiService.add_post(this.addPost)
      .then(() => {
        this.apiService.get_post().then(res => this.posts = res);
        this.messageService.push_message('add success!', 'success');
      });
  }

  remove_post($event: Event) {
    const el = $event.srcElement.closest('mat-card-actions');
    const id = parseInt(el.childNodes[0].textContent);

    this.apiService.remove_post(id)
      .then(() => {
        const index = this.posts.findIndex(value => value.id.toString() === id.toString());
        this.posts.splice(index, 1);
        this.messageService.push_message('remove success!', 'success');
      });
  }

  get_time(x: string): string {
    return ApiService.get_time(x);
  }
}
