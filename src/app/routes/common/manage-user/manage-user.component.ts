import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../utils/api.service";
import {RouterRedirectService} from "../../../utils/router-redirect.service";
import {User} from "../../../utils/DataStructs/User";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute} from "@angular/router";
import {Message, MessageService} from "../../../utils/message.service";

const waitTime = 5000;

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {
  role: string;
  managedRole: string;

  data: Array<User>;

  searchText: string;

  addAccount = new User('', '');
  addPassword: string;
  addSuccess: boolean = false;

  constructor(
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private routerRedirect: RouterRedirectService,
    public apiService: ApiService,
    public modalService: NgbModal
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap
      .subscribe(
        res => {
          const role = res.get('role');
          if (ApiService.reader_and_librarian(role)) {
            this.managedRole = role;
            this.role = role === 'reader' ? 'librarian' : 'admin';
          }
        });
    // this.routerRedirect.only(this.role);
  }

  reset_password($event: Event) {
    const tr = $event.srcElement.parentElement.parentNode;
    console.log(tr);
    const username = tr.childNodes[2].textContent;
    console.log(username);
    const new_pass = prompt(`please input new password for "${username}"`, this.managedRole === 'reader'? '12345678': '00010001');
    this.apiService.reset_password(this.managedRole, username, new_pass)
      .then(() => {
        messageService.messages.push(new Message('fail to reset password', username, 'danger'));
      }).catch(err => {
        console.error(err);
      });
  }

  remove_user($event: Event) {
    const tr = $event.srcElement.parentElement.parentNode;
    const username = tr.childNodes[2].textContent;
    const confirm_remove = confirm(`Are you sure to delete "${username}"?`);
    if (confirm_remove) {
      // todo: remove user
    }
  }

  search_user() {
    this.apiService.get_account(this.managedRole, this.searchText)
      .then(res => {
        this.data = res;
      }).catch(err => {
      console.error(err);
    });
  }

  submit_register() {
    console.log(this.addAccount);
    this.apiService.add_account(this.managedRole, this.addPassword, this.addAccount)
      .then((res) => {
        if (res) {
          this.messageService.messages.push(new Message('register account success!', 'Success ', 'success'));
          setTimeout(location.reload, waitTime);
        } else {
          this.messageService.messages.push(new Message('this username may be used by other user', 'Fail: ', 'danger'));
        }
      }).catch(err => {
        console.error(err);
      });
  }
}
