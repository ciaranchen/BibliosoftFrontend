import { Component, OnInit } from '@angular/core';
import {User} from "../../../utils/DataStructs/User";

@Component({
  selector: 'app-admin-manage-librarian',
  templateUrl: './admin-manage-librarian.component.html',
  styleUrls: ['./admin-manage-librarian.component.css']
})
export class AdminManageLibrarianComponent implements OnInit {

  data: Array<User>;

  searchText: string;

  constructor() {
    // todo: load librarian
  }

  ngOnInit() {
    // todo: check login status
    // todo: get librarian list
  }

  reset_password($event: Event) {
    const tr = $event.srcElement.parentElement.parentNode;
    // console.log(tr);
    const username = tr.childNodes[1].textContent;
    const new_pass = prompt('please input new password', '00010001');
    // todo: update password
  }

  remove_user($event: Event) {
    const tr = $event.srcElement.parentElement.parentNode;
    //
    const username = tr.childNodes[1].textContent;
    const confirm_remove = confirm(`Are you sure to delete "${username}"?`);
    if (confirm_remove) {
      // todo: remove user
    }
  }

  search_librarian() {
    // todo: search
  }
}
