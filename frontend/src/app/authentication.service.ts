import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  private registerUrl = "http://localhost:3000/api/register"
  private loginUrl = "http://localhost:3000/api/login"
  private verificationUrl = "http://localhost:3000/api/verifyToken"


  constructor(private http: HttpClient) {

  }

  //accepts userObject and returns response of backend, backend responses either with error or registered user
  registerUser(user){
    return this.http.post<any>(this.registerUrl, user)
  }

  loginUser(user){
    return this.http.post<any>(this.loginUrl, user)
  }

  public isAuthenticated(): Observable<any> {    const token = localStorage.getItem('token');
  // Checks whether the token is expired or not
    return this.http.post<any>(this.verificationUrl, token)
  }

  public get loggedIn () : boolean {
    return
  }
  public isUser() : boolean {
    return
  }
}
