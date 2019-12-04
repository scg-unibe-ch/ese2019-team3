import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../authentication.service';
import {Booking} from '../models/booking';
import {BookingRequestService} from '../booking-request.service';

@Component({
  selector: 'app-booking-requests',
  templateUrl: './booking-requests.component.html',
  styleUrls: ['./booking-requests.component.scss'],
})
export class BookingRequestsComponent implements OnInit {
  Requests: Booking[];

  constructor(private http: HttpClient, private auth: AuthenticationService, private bookingReq: BookingRequestService) {
    this.getBookingRequests();
  }
// fetches booking requests from backend
  getBookingRequests() {
    this.bookingReq.getBookingRequests(this.auth.getCurrentUser())
        .subscribe((data: Booking[]) => {this.Requests = data; });
  }
// calls function for accepting booking and refreshes booking requests
  acceptBooking(booking: Booking) {
    this.bookingReq.acceptBooking(booking)
        .subscribe(res => alert('Booking was accepted!'), err => alert(err.err));
    setTimeout(() => { this.getBookingRequests(); }, 50);
  }

// calls function for denying booking and refreshes booking requests
  denyBooking(booking: Booking) {
    this.bookingReq.denyBooking(booking)
        .subscribe(res => alert('Booking was denied!'), err => alert(err));
    setTimeout(() => { this.getBookingRequests(); }, 50);
  }

  ngOnInit() {
    this.getBookingRequests();
  }

}
