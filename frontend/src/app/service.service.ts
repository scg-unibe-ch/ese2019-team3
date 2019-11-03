import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private addserviceurl = "http://localhost:3000/user/addservice"
  private verificationUrl = "http://localhost:3000/user/verifyToken"
  constructor(private http: HttpClient) { }

  //accepts serviceObject and returns response of backend, backend responses with registered service
  addService(service: Object): Observable <any> {
    return this.http.post<any>(this.addserviceurl, service)
  }

  // Checks whether the token is expired or not
  //public isAuthenticated(): Observable<any> {    const token = localStorage.getItem('token');
    //return this.http.post<any>(this.verificationUrl, token)
 // }

}
