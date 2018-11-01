import {Component, OnInit} from '@angular/core';
import {StateService} from "../../../utils/state.service";
import {ApiService} from "../../../utils/api.service";
import {User} from "../../../utils/DataStructs/User";
import {Message, MessageService} from "../../../utils/message.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-librarian-profile',
  templateUrl: './librarian-profile.component.html',
  styleUrls: ['./librarian-profile.component.css']
})
export class LibrarianProfileComponent implements OnInit {
  librarian: User;
  showLibrarian: User = new User('', '');
  samePerson: boolean = true;

  constructor(
    private messageService: MessageService,
    private stateService: StateService,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.stateService.only('librarian');
    if (location.pathname.startsWith('/librarian/others')) {
      console.log('no same person');
      this.samePerson = false;
      const librarianId = this.activatedRoute.snapshot.paramMap.get('reader');
      this.apiService.get_account('librarian', librarianId)
        .then(res => {
          if (res[0].username !== librarianId) {
            this.stateService.back_home()
              .then(() => this.messageService.messages.push(new Message('no such a user', 'danger')));
          }
          this.librarian = res[0];
        });
    } else {
      console.log('same');
      this.samePerson = true;
      this.librarian = this.stateService.user;
    }
    console.log(this.stateService.user);
    Object.assign(this.showLibrarian, this.librarian);
  }

  submit() {
    // never update username;
    delete this.showLibrarian['username'];
    this.apiService.update_account('librarian', this.librarian.username, this.showLibrarian)
      .then(res => {
        this.showLibrarian.username = this.librarian.username;
        this.librarian = this.showLibrarian;
        if (this.samePerson) {
          this.stateService.update_profile(this.librarian);
        }
        this.messageService.messages.push(new Message('update success', 'success'));
      });
  }
}
