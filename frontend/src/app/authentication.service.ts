import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from './user';

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  private registerUrl = "http://localhost:3000/user/register";
  private loginUrl = "http://localhost:3000/user/login";
  private verificationUrl = "http://localhost:3000/user/verifyToken";

  private rootUrl = "http://localhost:3000/user/";

  private passwordforgottenUrl = "http://localhost:3000/user/forgotPassword";
  constructor(private http: HttpClient) {}

  //accepts userObject and returns response of backend, backend responses either with error or registered user
  registerUser(user: Object) {
    return this.http.post<any>(this.registerUrl, user);
  }

  loginUser(user) {
    return this.http.post<any>(this.loginUrl, user);
  }

  public isAuthenticated(): Observable<any> {
    const token = localStorage.getItem("token");
    // Checks whether the token is expired or not
    return this.http.post<any>(this.verificationUrl, token);
  }

  public get loggedIn(): boolean {
    return;
  }
  public isUser(): boolean {
    return;
  }
  /**
   * Initiate the passwordforgotten
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
  getUser (email: Object): Observable<User>{
    return this.http.get<any>(this.rootUrl + email);
  }
}
