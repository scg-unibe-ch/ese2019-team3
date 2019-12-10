import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Service} from './models/service';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  s = {
      provider: '',
      serviceTitle: '',
      description: '',
      providerId: '',
      serviceType: '',
      price: '',
      dates: '',
      city: '',

  };

  private InputSearch = new BehaviorSubject(this.s);
  currentInputSearch = this.InputSearch.asObservable();

  constructor() {
  }

  // setInput and use it in  new component.
  setInputSearch(s: any) {
    this.InputSearch.next(s);
  }

/*
  //get the Input of the Search currentSearchInput
  getInputSearch(): Observable<any>{
    return this.InputSearch.asObservable();
}*/
}
