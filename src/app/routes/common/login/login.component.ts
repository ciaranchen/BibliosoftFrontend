import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../utils/api.service';
import {ActivatedRoute } from '@angular/router';
import {StateService} from '../../../utils/state.service';
import {MessageService} from '../../../utils/message.service';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-admin-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../../utils/login.css']
})
export class LoginComponent implements OnInit {
  user: string;
  pass: string;
  role: string;
  otherRole: string;

  email: string;

  constructor(
    public  modalService: NgbModal,
    private messageService: MessageService,
    private stateService: StateService,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) { }

  upper_role() {
    return this.role.charAt(0).toUpperCase() + this.role.substr(1);
  }

  ngOnInit() {
    this.stateService.need_not_login();
    this.activatedRoute.paramMap
      .subscribe(res => {
        const role = res.get('role');
        if (ApiService.reader_and_librarian(role)) {
          this.role = role;
          this.otherRole = role === 'reader' ? 'librarian' : 'reader';
        } else {
          this.stateService.back_home();
        }
      });
  }

  user_login(user?: string, pass?: string) {
    this.apiService.login(user ? user : this.user, pass ? pass : this.pass, this.role === 'reader' ? 3 : 2)
      .then(res => {
        this.stateService.login(this.role, res, this.activatedRoute.snapshot.queryParams['path'])
          .catch(err => {
            // console.error(err);
            this.messageService.push_message(err, 'danger');
          });
      }).catch((err) => {
        this.messageService.push_message(err.error.msg, 'danger');
      });
  }
}
