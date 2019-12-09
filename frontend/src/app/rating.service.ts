import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Booking} from './models/booking';
import {User} from './models/user';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient) { }
  getRateableBookings(user: User) {
    return this.http.get('http://localhost:3000/booking/client/rate/' + user.id);
  }
rateBooking(booking: Booking) {
    return this.http.put('http://localhost:3000/booking/rate', booking);
}
}
