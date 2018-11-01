import {Component, OnInit} from '@angular/core';
import {StateService} from "../../../utils/state.service";
import {ApiService} from "../../../utils/api.service";
import {User} from "../../../utils/DataStructs/User";
import {Message, MessageService} from "../../../utils/message.service";

@Component({
  selector: 'app-librarian-profile',
  templateUrl: './librarian-profile.component.html',
  styleUrls: ['./librarian-profile.component.css']
})
export class LibrarianProfileComponent implements OnInit {
  librarian: User;
  showLibrarian: User = new User('', '');

  constructor(
    private messageService: MessageService,
    private stateService: StateService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.stateService.only('librarian');
    // todo: fix it to make other can see but can not change.
    if (location.pathname.startsWith('/librarian/others')) {
      // this.apiService.get_account('librarian', readerId);
    } else {
      this.librarian = this.stateService.user;
      Object.assign(this.showLibrarian, this.librarian);
    }

  }

  submit() {
    const diff = ApiService.get_diff(this.librarian, this.showLibrarian);
    // never update username;
    delete diff['username'];
    this.apiService.update_account('librarian', this.librarian.username, diff)
      .then(res => {
        this.librarian = this.showLibrarian;
        this.messageService.messages.push(new Message('update success', 'success'));
      });
  }
}
