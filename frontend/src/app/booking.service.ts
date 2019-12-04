import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private bookServiceUrl = 'http://localhost:3000/booking/register'
  constructor( private http: HttpClient) { }

  addService(bookingservice: Object): Observable <any> {
    return this.http.post<any>(this.bookServiceUrl, bookingservice);
  }
}
