import { Component, OnInit } from '@angular/core';
import {User} from '../models/user';
import {HttpClient} from '@angular/common/http';
import {Service} from '../models/service';
import {AuthenticationService} from '../authentication.service';
import {Booking} from '../models/booking';

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
// fetches booking requests from backend
  getBookingRequests() {
    this.http.get('http://localhost:3000/booking/provider/requests/' + this.auth.getCurrentUser().id)
        .subscribe((data: Service[]) => {this.Requests = data; });
  }
// calls function for accepting booking and refreshes booking requests
  acceptBooking(booking: Booking) {
    this.sendBookingToAccept(booking);
    setTimeout(() => { this.getBookingRequests(); }, 50);
  }

// calls function for denying booking and refreshes booking requests
  deleteUser(user: User) {
    // this.sendUserToDelete(user);
    setTimeout(() => { this.getBookingRequests(); }, 50);
  }

  /*sendUserToDelete(user: User) {
    this.http.delete('http://localhost:3000/user/' + user.id)
        .subscribe(res => alert('User was deleted'), err => alert(err));
  }*/

  sendBookingToAccept(booking: Booking) {
    this.http.put('http://localhost:3000/booking/accept/', booking.serviceId)
        .subscribe(res => alert(res), err => console.log(err));
  }

  ngOnInit() {
    this.getBookingRequests();
  }

}
