import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // title = 'Bibliosoft';

  role: string;

  ngOnInit() {
    const login = localStorage.getItem('login');
    if (login) {
      this.role = login;
      console.log(this.role);
    }
  }
}
