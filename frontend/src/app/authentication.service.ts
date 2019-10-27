import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  private registerUrl = "http://localhost:3000/api/register"
  private loginUrl = "http://localhost:3000/api/login"


  constructor(private http: HttpClient) {
  }

  //accepts userObject and returns response of backend, backend responses either with error or registered user
  registerUser(user){
    return this.http.post<any>(this.registerUrl, user)
  }

  loginUser(user){
    return this.http.post<any>(this.loginUrl, user)
  }
  public get loggedIn () : boolean {
    return
  }
  public isUser() : boolean {
    return
  }
}
