import { Component, OnInit } from '@angular/core';
import { MessageService} from '../../../utils/message.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(
    private messageService: MessageService
  ) { }

  ngOnInit() {}
}
