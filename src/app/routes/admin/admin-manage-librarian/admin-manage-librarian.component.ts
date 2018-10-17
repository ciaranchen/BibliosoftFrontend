import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {User} from "../../../utils/DataStructs/User";
import {ApiService} from "../../../utils/api.service";
import {RouterRedirectService} from "../../../utils/router-redirect.service";

@Component({
  selector: 'app-admin-manage-librarian',
  templateUrl: './admin-manage-librarian.component.html',
  styleUrls: ['./admin-manage-librarian.component.css']
})
export class AdminManageLibrarianComponent implements OnInit {

  data: Array<User>;

  searchText: string;

  addAccount = new User('', '');
  addPassword: string;
  addSuccess: boolean = false;

  constructor(
    private routerRedirect: RouterRedirectService,
    public apiService: ApiService,
    public modalService: NgbModal
  ) { }

  ngOnInit() {
    // this.routerRedirect.only('admin');
  }

  reset_password($event: Event) {
    const tr = $event.srcElement.parentElement.parentNode;
    // console.log(tr);
    const username = tr.childNodes[1].textContent;
    const new_pass = prompt('please input new password', '00010001');
    this.apiService.reset_librarian_password(username, new_pass)
      .catch(err => {
        console.error(err);
      });
  }

  remove_user($event: Event) {
    const tr = $event.srcElement.parentElement.parentNode;
    const username = tr.childNodes[1].textContent;
    const confirm_remove = confirm(`Are you sure to delete "${username}"?`);
    if (confirm_remove) {
      // todo: remove user
    }
  }

  search_librarian() {
    this.apiService.get_librarian(this.searchText)
      .then(res => {
        this.data = res;
      }).catch(err => {
        console.error(err);
      });
  }

  submit_register() {
    console.log(this.addAccount);
    this.apiService.add_librarian(this.addPassword, this.addAccount)
      .then((res) => {
        if (res) {
          alert('successfully register');
          // todo: timer: refresh this page
          this.addSuccess = true;
        } else {
          console.log(res);
          // todo: validate table
          this.addSuccess = false;
        }
      }).catch(err => {
        console.error(err);
      });
  }
}
