import { Component, OnInit } from '@angular/core';
import { MessageService} from '../../../utils/message.service';
import { StateService } from '../../../utils/state.service';
import {ApiService} from '../../../utils/api.service';
import {MetaBook} from '../../../utils/DataStructs/MetaBook';
import {Post} from '../../../utils/DataStructs/Post';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  books: Array<MetaBook> = [];

  posts: Array<Post> = [];

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    // get sth from backend;
    this.apiService.trends_book(3)
      .then(res => this.books = res);
    this.apiService.get_post()
      .then(res => {
        this.posts = res.slice(-3).reverse();
        // console.log(this.posts);
      });
  }

  get_time(x: string): string {
    return ApiService.get_time(x);
  }
}
