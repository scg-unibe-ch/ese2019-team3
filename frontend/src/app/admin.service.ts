import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }
  getRegistrationRequests() {
    return this.http.get('http://localhost:3000/user/verify');
  }
  deleteUser(user: User) {
    return this.http.delete('http://localhost:3000/user/' + user.id);
  }
  validateUser(user: User) {
    return this.http.put('http://localhost:3000/user/verify/' + user.id, user, {responseType: 'text'});
  }
}
