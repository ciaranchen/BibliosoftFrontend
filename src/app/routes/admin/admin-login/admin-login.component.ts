import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../utils/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RouterRedirectService} from "../../../utils/router-redirect.service";
import {Message, MessageService} from "../../../utils/message.service";

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css', '../../../login.css']
})
export class AdminLoginComponent implements OnInit {
  user: string;
  pass: string;

  constructor(
    private routerRedirect: RouterRedirectService,
    private messageService: MessageService,
    private apiService: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.routerRedirect.need_not_login();
  }

  admin_login(user?: string, pass?: string) {
    this.apiService.login(user ? user : this.user, pass ? pass : this.pass, 1)
      .then(res => {
        if (res) {
          localStorage.setItem('login', 'admin');
          const path = this.activatedRoute.params['path'];
          // const url = path ? path : 'admin/';
          // this.router.navigate([url]);
          this.routerRedirect.back_home();
        } else {
          this.messageService.messages.push(new Message(
            'login failed',
            '', 'danger'
          ));
          console.error(res);
        }
      }).catch((err) => {
        console.error(err);
      });
  }
}
