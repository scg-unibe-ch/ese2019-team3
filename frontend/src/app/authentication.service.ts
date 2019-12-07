import { tap } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { Router } from '@angular/router';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loggedInUser: User;
  private email: string;
  private emailtoken: string;

  private passwordforgottenUrl = 'http://localhost:3000/user/forgotPassword';

  private rootUrl = 'http://localhost:3000/user/';

  private registerUrl = 'http://localhost:3000/user/register';
  private loginUrl = 'http://localhost:3000/user/login';
  private verificationUrl = 'http://localhost:3000/user/verifyToken';
  private addServiceUrl = 'http://localhost:3000/user/addService';

  private newPasswordUrl = 'http://localhost:3000/user/setNewPassword';

  private checkPasswordUrl = 'http://localhost:3000/user/checkPassword';

  constructor(private http: HttpClient, private router: Router) {}

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
      err => {
        console.log(err);
        alert(err.error);
      }
    );
  }

  // getEmail(): string {
  //   //usage

  //   const token = localStorage.getItem("token");
  //   this.emailtoken = this.getDecodedAccessToken(token).email;

  //   this.loggedInUser = this.getDecodedAccessToken(token);
  //   //localStorage.getItem("token")
  //   return this.emailtoken;
  // }
  getCurrentUser(): any {
    const token = localStorage.getItem('token');
    return this.getDecodedAccessToken(token);
  }
  // loginUer(user) {
  //   return this.http.post<any>(this.loginUrl, user).pipe(
  //     //getting token parameter, doesn't modify stream only saves the one into the for
  //     tap(token => {
  //       this.loggedInUser = user;
  //     })
  //   );
  // }
  logOutUser() {
    localStorage.removeItem('token');
  }
  getToken() {
    return localStorage.getItem('token');
  }
  loggedIn() {
    return localStorage.getItem('token') != null;
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

  /**
   *
   * @param email of User to identify him
   * @param User saves values into current User
   */
  getUser(email: string): Observable<any> {
    return this.http.get<any>(this.rootUrl + email);
  }

  updateUser(email: string, user: any): Observable<any> {
    return this.http.put<any>(this.rootUrl + email, user);
  }

  // id is int, but the url is a string, so change it to string
  updatePassword(user: any): Observable<any> {
    return this.http.put<any>(this.newPasswordUrl, user);
  }
  /**
   * @param token of loggedIn User
   * returns decoded token
   */
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
  addservice(addService: object) {
    return this.http.post<any>(this.addServiceUrl, addService);
  }

  checkPassword(checkUser: Object) /*: Observable<boolean> */ {
    return this.http.post<any>(this.checkPasswordUrl, checkUser);
  }

  deleteProfile(id: any ){
    return this.http.delete<any>(this.rootUrl + id);
  }
}
