import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {User} from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  private registerUrl = 'http://localhost:3000/user/register';
  private loginUrl = 'http://localhost:3000/user/login';
  private verificationUrl = 'http://localhost:3000/user/verifyToken/';
  private passwordforgottenUrl = 'http://localhost:3000/user/forgotPassword';

  constructor(private http: HttpClient, private router: Router) {
  }

  // accepts userObject and returns response of backend, backend responses either with error or registered user
  registerUser(user) {
    return this.http.post<any>(this.registerUrl, user);
  }

  loginUser(user) {
    this.http.post<any>(this.loginUrl, user).subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', res.token);
          this.router.navigate(['']);
        },
        err => {console.log(err);
                alert(err.error); }
                );
  }

  logOutUser() {
      localStorage.removeItem('token');
  }
  getToken() {
      return localStorage.getItem('token');
  }
  loggedIn() {
      return localStorage.getItem('token') != null;
  }
  public isUser(): boolean {
    return;
  }
   /*
   *Initiate the passwordforgotten
   * sends put request to the backend
   * to replace old password
   * @param email email of the user
   */
  passwordForgotten(email: object) {
    return this.http.put<any>(this.passwordforgottenUrl, email);
  }
}
