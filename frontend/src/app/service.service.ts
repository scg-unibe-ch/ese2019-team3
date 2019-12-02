import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Service } from "./models/service";

@Injectable({
  providedIn: "root"
})
export class ServiceService {
  private addserviceurl = "http://localhost:3000/service/register";
  private verificationUrl = "http://localhost:3000/user/verifyToken";
  private searchserviceurl = "http://localhost:3000/service/filter";
  private allservices = "http://localhost:3000/service";
  private myServices = "http://localhost:3000/service/filter";

  private Services: Service[];
  /*s = {city: '', serviceType: '', description: ''};
  private selectedStrings = new BehaviorSubject(this.s);
  currentS = this.selectedStrings.asObservable();
*/
  constructor(private http: HttpClient) {}

  addService(service: Object): Observable<any> {
    return this.http.post<any>(this.addserviceurl, service);
  }

  searchService(search: Object): Observable<any> {
    return this.http.post<Object>(this.searchserviceurl, search);
    //.subscribe((data : Service[]) => {this.Services = data}
  }

  getAll() {
    return this.http.get<Service[]>(this.allservices);
  }

  getMyServices(id: number): Observable<any> {
    return this.http.post<any>(this.myServices, id);
  }

<<<<<<< HEAD

=======
  // Checks whether the token is expired or not
  //public isAuthenticated(): Observable<any> {    const token = localStorage.getItem('token');
  //return this.http.post<any>(this.verificationUrl, token)
  // }
>>>>>>> origin/Dialog
}
