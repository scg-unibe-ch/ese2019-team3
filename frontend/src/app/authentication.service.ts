import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  private registerUrl = 'http://localhost:3000/user/register';
  private loginUrl = 'http://localhost:3000/user/login';
  private verificationUrl = 'http://localhost:3000/user/verifyToken';
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
  public isAuthenticated(): Observable<any> {
      const token = localStorage.getItem('token');
  // Checks whether the token is expired or not
    if(this.http.post<any>(this.verificationUrl, token) === '200')
        return true;
            else return false;;
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
