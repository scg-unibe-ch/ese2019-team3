import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Booking} from './models/booking';
@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookServiceUrl = 'http://localhost:3000/booking/register';
  constructor(private http: HttpClient) {
    // for the alert after the Dialog
    this.booked = false;
  }
  booked: boolean;
  setBooking() {
    this.booked = true;
  }
  addService(bookingservice: Booking): Observable<any> {
    return this.http.post<any>(this.bookServiceUrl, bookingservice);
  }
}
