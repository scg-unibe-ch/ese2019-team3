import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../models/user';
import {AdminService} from '../admin.service';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})


export class AdminComponent implements OnInit {
   Users: User[];

  constructor(private http: HttpClient, private adminService: AdminService) {
    this.getRegistrationRequests();
  }
// fetches users that need to be validated from backend
  getRegistrationRequests() {
    this.adminService.getRegistrationRequests().subscribe((data: User[]) => {this.Users = data; });
  }
// calls function for verification and refreshes users to be verified
  validateUser(user: User) {
    this.sendUserToValidate(user);
    setTimeout(() => { this.getRegistrationRequests(); }, 50);
  }

  // calls function for deletion and refreshes users to be verified
  deleteUser(user: User) {
    this.sendUserToDelete(user);
    setTimeout(() => { this.getRegistrationRequests(); }, 50);
  }
// sends user to backend for deletion and tells admin it was deleted
sendUserToDelete(user: User) {
  this.adminService.deleteUser(user)
      .subscribe(res => alert('User was deleted'), err => alert(err));
}
// sends user to backend for validation and tells admin it was validated
sendUserToValidate(user: User) {
    this.adminService.validateUser(user)
        .subscribe(res => alert(res), err => console.log(err));
}
  ngOnInit() {
    this.getRegistrationRequests();
  }


}


