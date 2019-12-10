import { Component, OnInit } from '@angular/core';
import {Booking} from '../models/booking';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../authentication.service';
import {User} from '../models/user';
import {AllBookingsService} from '../all-bookings.service';
import {stringify} from 'querystring';
import {test} from "@angular-devkit/core/src/virtual-fs/host";

@Component({
  selector: 'app-all-bookings',
  templateUrl: './all-bookings.component.html',
  styleUrls: ['./all-bookings.component.scss'],
})
export class AllBookingsComponent implements OnInit {

  Bookings: Booking[];
  user: User;
// for rating service
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

  ratingPossibleIfCustomer(booking: Booking) {
    return this.isCustomer(this.user) && booking.rating == null; /*&& this.pastEvent(booking)*/;
  }
  // Todo only allow rating for past events
  /*pastEvent(booking: Booking){
    let today = new Date();
    return booking.date < today;
  }*/
  rateBooking(booking: Booking) {
    booking.rating = this.hovered;
    console.log(booking.rating);
    this.allBookings.rateBooking(booking).subscribe(res => alert(res), err => console.log(err));
    this.allBookings.updateService(booking);
    console.log(this.allBookings.updateService(booking) ,test);
    this.getBookings();

  }
  showRatingForProvider(booking: Booking) {
    if (booking.rating == null) {
      return false;
    } else {
      return true;
    }
  }
  ngOnInit() {}

  // already rated bookings cannot be rated again
isReadOnly(booking: Booking) {
    console.log(booking.rating);
    if (booking.rating === (1 || 2 || 3 || 4 || 5)) {
      return false;
    } else {
      return true;
    }
}

}
