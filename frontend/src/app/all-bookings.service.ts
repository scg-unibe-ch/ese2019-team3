import { Injectable } from '@angular/core';
import {User} from './models/user';
import {HttpClient} from '@angular/common/http';
import {stringify} from 'querystring';
import {Booking} from './models/booking';

@Injectable({
  providedIn: 'root'
})
export class AllBookingsService {

  constructor(private http: HttpClient) { }
  getProviderBookings(user: User) {
    return this.http.get('http://localhost:3000/booking/provider/' + user.id);
  }
  getCustomerBookings(user: User) {
    return this.http.get('http://localhost:3000/booking/client/' + user.id);
  }
  rateBooking(booking: Booking) {
    const data = {
      rating: booking.rating,
      bookingId: booking.id,
      providerId: booking.providerId,
    };
    return this.http.put('http://localhost:3000/booking/rate/', data);
  }

}
