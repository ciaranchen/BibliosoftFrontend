import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../utils/api.service";
import {ActivatedRoute, Router} from "@angular/router";

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
    private apiService: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const login = localStorage.getItem('login');
    console.log(login);
    if (login) {
      // redirect to other place
      if (login === 'admin') {
        this.router.navigate(['admin/']);
      } else if (login === 'librarian' || login === 'reader') {
        this.router.navigate([login]);
      } else {
        console.error('localStorage failed.');
        this.router.navigate(['/'])
      }
    }
    this.activatedRoute.paramMap
      .subscribe(
        res => {
          const role = res.get('role');
          // console.log(role);
          if (role !== 'librarian' && role !== 'reader') {
            console.log('404');
            this.router.navigate(['/']);
          } else {
            this.role = role.charAt(0).toUpperCase() + role.substr(1);
            console.log(this.role);
            this.otherRole = role === 'reader' ? 'librarian' : 'reader';
          }
        });

  }

  admin_login(user?: string, pass?: string) {
    this.apiService.login(user ? user : this.user, pass ? pass : this.pass, this.role === 'reader'? 3 : 2)
      .then(res => {
        if (res) {
          localStorage.setItem('login', 'admin');
          const path = this.activatedRoute.params['path'];
          const url = path ? path : 'admin/';
          this.router.navigate([url, 1]);
        } else {
          alert('login failed! try it again after refresh.');
          // console.error(res);
        }
      }).catch((err) => {
        console.error(err);
      });
  }
}
