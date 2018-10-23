import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../utils/api.service';
import {ActivatedRoute } from '@angular/router';
import {StateService} from "../../../utils/state.service";

@Component({
  selector: 'app-admin-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../../login.css']
})
export class LoginComponent implements OnInit {
  user: string;
  pass: string;
  role: string;
  otherRole: string;

  constructor(
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
      .subscribe(
        res => {
          const role = res.get('role');
          // console.log(role);
          if (role !== 'librarian' && role !== 'reader') {
            console.log('404');
            this.stateService.back_home();
          } else {
            this.role = role;
            this.otherRole = role === 'reader' ? 'librarian' : 'reader';
          }
        });

  }

  admin_login(user?: string, pass?: string) {
    this.apiService.login(user ? user : this.user, pass ? pass : this.pass, this.role === 'reader' ? 3 : 2)
      .then(res => {
        if (res) {
          this.stateService.login(this.role, res);
          const path = this.activatedRoute.params['path'];
          const url = path ? path : this.role;
          this.stateService.back_home();
        } else {
          alert('login failed! try it again after refresh.');
          // console.error(res);
        }
      }).catch((err) => {
        console.error(err);
      });
  }
}
