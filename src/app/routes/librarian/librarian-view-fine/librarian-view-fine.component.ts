import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-librarian-view-fine',
  templateUrl: './librarian-view-fine.component.html',
  styleUrls: ['./librarian-view-fine.component.css']
})
export class LibrarianViewFineComponent implements OnInit {

  userId: string;
  userName: string = 'None';
  userFine: string = '0.00';

  constructor() { }

  ngOnInit() {
  }

  getFine() {
    //get this.name and this.fine by this id
    console.log(this.userId, this.userName, this.userFine);
  }

}
