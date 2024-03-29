import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Service } from './models/service';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private addserviceurl = 'http://localhost:3000/service/register';
  private verificationUrl = 'http://localhost:3000/user/verifyToken';
  private searchserviceurl = 'http://localhost:3000/service/filter';
  private allservices = 'http://localhost:3000/service';
  private myServices = 'http://localhost:3000/service/filter';
private deleteService = 'http://localhost:3000/service/';

  public p: string;
  public serviceTitle: string;
  public anything: string;
  public id: number;
  public categorie: string;
  public price: number;
   d = new Date();
  public city: string;

  private Services: Service[];

  s: object = {
    provider : this.p,
    serviceTitle : this.serviceTitle,
    description: this.anything,
    providerId : this.id,
    serviceType : this.categorie,
    price : this.price,
    dates: this.d,
    city : this.city,
  };

  /*private selectedStrings = new BehaviorSubject(this.s);
  currentS = this.selectedStrings.asObservable();
*/
  constructor(private http: HttpClient, private authentication: AuthenticationService) {}

  addService(service: object): Observable<any> {
    return this.http.post<any>(this.addserviceurl, service);
  }

  searchService(search: object): Observable<any> {
    return this.http.post<object>(this.searchserviceurl, search);
    // .subscribe((data : Service[]) => {this.Services = data}
  }

  getAll() {
    return this.http.get<Service[]>(this.allservices);
  }

  getMyServices(id: number): Observable<any> {
    return this.http.post<any>(this.myServices, id);
  }


  deleteMyService(service: Service) {
   this.http.delete(this.deleteService + service.id).subscribe(res => console.log("deleted service"), err => alert(err));

  }
}
