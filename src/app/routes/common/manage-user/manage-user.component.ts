///<reference path="../../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../../utils/api.service';
import {User} from '../../../utils/DataStructs/User';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute} from '@angular/router';
import {MessageService} from '../../../utils/message.service';
import {StateService} from '../../../utils/state.service';
import {FormControl, Validators} from '@angular/forms';
import {Matcher} from '../../../utils/matcher';
import {MatPaginator, MatTableDataSource} from "@angular/material";


@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {
  role: string;
  managedRole: string;

  displayedColumns = ['email', 'username', 'nickname', 'address', 'operation'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  data: Array<User> = [];

  deposit: number;
  remove_msg: string;
  searchText: string;
  private cacheSearch: string;

  addAccount = new User();
  addPassword: string;

  usernameFormControl = new FormControl('', [
    Validators.required
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);
  emailFormControl = new FormControl('', [
    Validators.email,
    Validators.required
  ]);
  matcher = new Matcher();

  constructor(
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private stateService: StateService,
    public apiService: ApiService,
    public modalService: NgbModal,
  ) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap
      .subscribe(res => {
        const role = res.get('role');
        if (role === 'admin' || role === 'librarian') {
          this.role = role;
          this.managedRole = role === 'admin' ? 'librarian' : 'reader';
        } else {
          console.error('404');
          this.stateService.back_home();
        }
      });
    this.stateService.only(this.role);
  }

  reset_password(user: User) {
    const username = user.username;

    const new_pass = prompt(`please input new password for "${username}"`, this.managedRole === 'reader' ? '12345678' : '00010001');
    if (new_pass) {
      this.apiService.reset_password(this.managedRole, username, new_pass)
        .then(() => {
          this.messageService.push_message(`${username} Success to reset password`, 'success');
        }).catch(err => {
        this.messageService.push_message(`${username} fail to reset password`, 'danger');
        console.error(err);
      });
    }
    // else do nothing but return.
  }

  remove_user(user: User, removeModal) {
    const username = user.username;
    const confirm_remove = confirm(`Are you sure to delete "${username}"?`);
    if (confirm_remove) {
      this.apiService.remove_account(this.managedRole, username)
        .then(res => {
          if (this.managedRole === 'reader') {
            this.remove_msg = res.msg;
            this.modalService.open(removeModal)
          } else {
            this.messageService.push_message('remove librarian success', 'success');
          }

          setTimeout(() => {
            this.fetch_search(this.cacheSearch);
          }, 1000);
        });
    }
  }

  private fetch_search(text: string) {
    this.apiService.get_account(this.managedRole, text)
      .then(res => {
        this.data = res;
        this.dataSource.data = this.data;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 1000);
      }).catch(err => {
      console.error(err);
    });
  }

  search_user() {
    this.cacheSearch = this.searchText;
    this.fetch_search(this.searchText);
  }

  submit_register(depositModal) {
    // console.log(this.addAccount);
    if (this.managedRole === 'reader') {
      this.apiService.library_config().then(res => this.deposit = res.membership_deposit);
    }
    this.apiService.add_account(this.managedRole, this.addPassword, this.addAccount)
      .then((res) => {
        if (res) {
          this.messageService.push_message(`register ${ this.managedRole } success!`, 'success');
          this.modalService.dismissAll();
          setTimeout(() => {
            this.fetch_search(this.cacheSearch);
            this.modalService.open(depositModal);
          }, 1000);
        } else {
          this.messageService.push_message('this username may be used by other user', 'danger');
        }
      }).catch(err => {
        console.error(err);
      });
  }
}
