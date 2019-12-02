import { Component, OnInit } from '@angular/core';
import {User} from '../models/user';
import {HttpClient} from '@angular/common/http';
import {Service} from '../models/service';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-booking-requests',
  templateUrl: './booking-requests.component.html',
  styleUrls: ['./booking-requests.component.scss'],
})
export class BookingRequestsComponent implements OnInit {
  Requests: Service[];

  constructor(private http: HttpClient, private auth: AuthenticationService) {
    this.getBookingRequests();
  }
// fetches users that need to be validated from backend
  getBookingRequests() {
    this.http.get('http://localhost:3000/service/user/' + this.auth.getCurrentUser().id)
        .subscribe((data: Service[]) => {this.Requests = data; });
  }
// calls function for verification and refreshes users to be verified
  validateUser(user: User) {
    this.sendUserToValidate(user);
    setTimeout(() => { this.getBookingRequests(); }, 50);
  }

  // calls function for deletion and refreshes users to be verified
  deleteUser(user: User) {
    this.sendUserToDelete(user);
    setTimeout(() => { this.getBookingRequests(); }, 50);
  }
// sends user to backend for deletion and tells admin it was deleted
  sendUserToDelete(user: User) {
    this.http.delete('http://localhost:3000/user/' + user.id)
        .subscribe(res => alert('User was deleted'), err => alert(err));
  }
// sends user to backend for validation and tells admin it was validated
  sendUserToValidate(user: User) {
    this.http.put('http://localhost:3000/user/verify/' + user.id, user, {responseType: 'text'})
        .subscribe(res => alert(res), err => console.log(err));
  }
  ngOnInit() {
    this.getBookingRequests();
  }

}
