import { Injectable } from '@angular/core';
import {Booking} from './models/booking';
import {HttpClient} from '@angular/common/http';
import {User} from './models/user';

@Injectable({
  providedIn: 'root'
})
export class BookingRequestService {

  constructor(private http: HttpClient) { }
  denyBooking(booking: Booking) {
    return this.http.delete('http://localhost:3000/booking/decline/' + booking.serviceId);
  }

  acceptBooking(booking: Booking) {
    return this.http.put('http://localhost:3000/booking/accept/', booking.serviceId);
  }

  getBookingRequests(user: User) {
    return  this.http.get('http://localhost:3000/booking/provider/requests/' + user.id)
  }
}
