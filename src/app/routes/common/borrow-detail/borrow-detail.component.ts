import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../utils/api.service';
import { Borrow } from 'src/app/utils/DataStructs/Borrow';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-borrow-detail',
  templateUrl: './borrow-detail.component.html',
  styleUrls: ['./borrow-detail.component.css']
})
export class BorrowDetailComponent implements OnInit {
  borrow: Borrow = {
    id: 'null',
    barcode: 'null',
    fine: 0,
    librarian_id: 'null',
    reader_id: 'null',
    borrow_time: 0,
    return_time: 0,
    fine_update_date: 0
  }

  // borrow: Borrow;
  borrow_id: string;

  constructor(
    private apiService: ApiService,
    private activateRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.borrow_id = this.activateRoute.snapshot.paramMap.get('borrow');
    console.log(this.borrow_id);
    this.apiService.get_borrow(this.borrow_id).then(
      res => {
        this.borrow = res;
      }
    );
  }
  

}
