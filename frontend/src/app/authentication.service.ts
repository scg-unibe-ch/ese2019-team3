import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, pipe } from "rxjs";
import { tap } from "rxjs/operators";
import { User } from "./user";
import { Router } from "@angular/router";
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  private loggedInUser: User;
  private email: string;
  private emailtoken: string;

  private passwordforgottenUrl = "http://localhost:3000/user/forgotPassword";

  private rootUrl = "http://localhost:3000/user/";

  private registerUrl = "http://localhost:3000/user/register";
  private loginUrl = "http://localhost:3000/user/login";
  private verificationUrl = "http://localhost:3000/user/verifyToken";
  private addServiceUrl = "http://localhost:3000/user/addService";

  constructor(private http: HttpClient, private router: Router) {}

  // accepts userObject and returns response of backend, backend responses either with error or registered user
  registerUser(user) {
    return this.http.post<any>(this.registerUrl, user);
  }

  loginUser(user: User) {
    this.http
      .post<any>(this.loginUrl, user)
      // .pipe(
      //   //getting token parameter, doesn't modify stream only saves the one into the for
      //   tap(() => {
      //     console.log("Empty User: " + user.email);
      //     // this.loggedInUser = this.getDecodedAccessToken("token");
      //     // console.log("Logged in User: " + user.email);

      //   })
      // )
      .subscribe(
        res => {
          console.warn(res);
          localStorage.setItem("token", res.token);
          this.router.navigate([""]);

          this.email = user.email;

          console.warn("Logged in User: " + JSON.stringify(user.email));
          console.warn("Email token " + this.emailtoken);

          console.warn("THIS User value to send to get method: " + this.email);

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
    const token = localStorage.getItem("token");    
    return this.getDecodedAccessToken(token)
  }

  public logOut() {
    this.loggedInUser = null;
    localStorage.removeItem("token");
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
  addservice(addService: Object) {
    return this.http.post<any>(this.addServiceUrl, addService);
  }
}
