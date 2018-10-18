import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-change-password',
  templateUrl: './admin-change-password.component.html',
  styleUrls: ['./admin-change-password.component.css']
})
export class AdminChangePasswordComponent implements OnInit {

  old_pwd: string;
  new_pwd1: string;
  new_pwd2: string;
  constructor() { }

  ngOnInit() {
  }
  onClick(){
    if(this.check_oldPwd()){
      this.change_pwd();
    }
    // console.log(this.old_pwd,this.new_pwd1,this.new_pwd2);
  }
  check_oldPwd(): boolean {
    // to check the old pwd
    return true;
  }
  change_pwd() {
    //to change pwd
  }
}
