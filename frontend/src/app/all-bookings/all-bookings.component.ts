import { Component, OnInit } from '@angular/core';
import {Booking} from '../models/booking';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../authentication.service';
import {User} from '../models/user';
import {AllBookingsService} from '../all-bookings.service';
import {stringify} from 'querystring';

@Component({
  selector: 'app-all-bookings',
  templateUrl: './all-bookings.component.html',
  styleUrls: ['./all-bookings.component.scss'],
})
export class AllBookingsComponent implements OnInit {

  Bookings: Booking[];
  user: User;
// for rating service
  selected = 0;
  hovered = 0;
  readonly = false;

  constructor(private http: HttpClient, private auth: AuthenticationService, private allBookings: AllBookingsService) {
    this.user = this.auth.getCurrentUser();
    this.getBookings();
  }
// fetches booking requests from backend
  getBookings() {
    if (this.isProvider(this.user)) {
      this.allBookings.getProviderBookings(this.user)
          .subscribe((data: Booking[]) => {
            this.Bookings = data;
          });
    }
    if (this.isCustomer(this.user)) {
      this.allBookings.getCustomerBookings(this.user)
          .subscribe((data: Booking[]) => {
            this.Bookings = data;
          });
    }
  }
  isProvider(user: User) {
    return user.userGroup === 'serviceProvider';
  }
  isCustomer(user: User) {
    return user.userGroup === 'customer';
  }
  /*bookingName(booking: Booking){
    this.allBookings.getBookingName(booking);
  }

  getCustomerName(booking: Booking) {
    booking.clientId;
  }
*/
  ratingPossibleIfCustomer(booking: Booking) {
    return this.isCustomer(this.user) /*&& this.pastEvent(booking)*/;
  }
  // Todo only allow rating for past events
  /*pastEvent(booking: Booking){
    let today = new Date();
    return booking.date < today;
  }*/
  rateBooking(rating: number, booking: Booking) {
    booking.rating = rating;
    this.allBookings.rateBooking(booking);
  }
  showRatingForProvider(booking: Booking) {
    if (stringify(booking.rating) === '') {
      return 'Service wurde nicht bewertet';
    } else {
      return booking.rating;
    }
  }
  ngOnInit() {}


}
