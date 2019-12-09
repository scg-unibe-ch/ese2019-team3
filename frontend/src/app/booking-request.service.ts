import { Injectable } from '@angular/core';
import {Booking} from './models/booking';
import {HttpClient} from '@angular/common/http';
import {User} from './models/user';

@Injectable({
  providedIn: 'root'
})
export class BookingRequestService {
  private getBookingRequestsUrl = 'http://localhost:3000/booking/provider/requests/';
  private acceptBookingRequestsUrl = 'http://localhost:3000/booking/accept/';
  private denyBookingRequestsUrl = 'http://localhost:3000/booking/decline/';

  constructor(private http: HttpClient) { }
  denyBooking(booking: Booking) {
    return this.http.delete(this.denyBookingRequestsUrl + booking.id);
  }

  acceptBooking(booking: Booking) {
    return this.http.put(this.acceptBookingRequestsUrl +  booking.id, booking);
  }

  getBookingRequests(user: User) {
    return  this.http.get(this.getBookingRequestsUrl + user.id);
  }
}
