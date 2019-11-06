import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, pipe } from "rxjs";
import { tap } from "rxjs/operators";
import { User } from "./user";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  private rootUrl = "http://localhost:3000/user/";

  private registerUrl = "http://localhost:3000/user/register";
  private loginUrl = "http://localhost:3000/user/login";
  private verificationUrl = "http://localhost:3000/user/verifyToken";

  private loggedInUser: User;

  private passwordforgottenUrl = "http://localhost:3000/user/forgotPassword";

  getEmail(): string {
    return this.loggedInUser.email;
  }

  public logOut() {
    this.loggedInUser = null;
    localStorage.removeItem("token");
  }

  constructor(private http: HttpClient, private router: Router) {}

  // accepts userObject and returns response of backend, backend responses either with error or registered user
  registerUser(user) {
    return this.http.post<any>(this.registerUrl, user);
  }

  loginUser(user) {
    this.http.post<any>(this.loginUrl, user)
      .pipe(
        //getting token parameter, doesn't modify stream only saves the one into the for
        tap(() => {
          this.loggedInUser = user;
        })
      )
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem("token", res.token);
          this.router.navigate([""]);
        },
        err => {
          console.log(err);
          alert(err.error);
        }
      );
  }

  // loginUer(user) {
  //   return this.http.post<any>(this.loginUrl, user).pipe(
  //     //getting token parameter, doesn't modify stream only saves the one into the for
  //     tap(token => {
  //       this.loggedInUser = user;
  //     })
  //   );
  // }

  public isAuthenticated(): Observable<any> {
    const token = localStorage.getItem("token");
    // Checks whether the token is expired or not
    return this.http.post<any>(this.verificationUrl, token);
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

  passwordForgotten(email: Object) {
    return this.http.put<any>(this.passwordforgottenUrl, email);
  }

  /**
   *
   * @param email of User to identify him
   * @param User saves values into current User
   */
  getUser(email: string): Observable<User> {
    return this.http.get<any>(this.rootUrl + email);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<any>(this.rootUrl + user.email, user);
  }
}
