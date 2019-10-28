import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private registerUrl = "http://localhost:3000/user/register"

  private passwordforgottenUrl = "http://localhost:3000/user/forgotPassword"
  constructor(private http: HttpClient) {
  }

  //accepts userObject and returns response of backend, backend responses either with error or registered user
  registerUser(user: Object){
    return this.http.post<any>(this.registerUrl, user)
  }


   /** 
   * Initiate the passwordforgotten
   * sends put request to the backend 
   * to replace old password
   * @param email email of the user 
   */ 
  passwordForgotten(email: Object){
    return this.http.put<any>(this.passwordforgottenUrl, email)
  }
}
