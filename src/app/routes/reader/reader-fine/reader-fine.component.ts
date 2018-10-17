import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../utils/api.service';

@Component({
  selector: 'app-reader-fine',
  templateUrl: './reader-fine.component.html',
  styleUrls: ['./reader-fine.component.css']
})
export class ReaderFineComponent implements OnInit {

  // fine: Fine;

  constructor(
    // private routerRedirect: RouterRedirectService,
    private apiService: ApiService
  ) {  }

  ngOnInit() {
    // routerRedirect.only2('reader', 'librarian');
    // todo: finish it;
    // this.apiService.fine()
    //   .then(res => {
    //     console.log(res);
    //     // this.fine = res;
    //   }).catch(err => {
    //     console.error(err);
    //   });
  }

  // onClick(): void {
  //   // to get payment
  //   this.pay = '0';
  //   console.log(this.payments[0].book.title);
  // }

}
