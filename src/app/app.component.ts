import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // title = 'Bibliosoft';

  private login: string;

  ngOnInit() {
    this.login = localStorage.getItem('login');
    if (this.login) {

    }
  }
}
