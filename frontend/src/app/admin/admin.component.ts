import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../models/user';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})


export class AdminComponent implements OnInit {
   Users: User[];
   private user: any;
  // private Users: any;

  constructor(private http: HttpClient) {
    this.getRegistrationRequests();
    // -->testing without connection to backend
    /*this.Users = [{
      username : 'name1',
      address: 'Beispielweg 1',
      phone : '123798'
    },
      {
        username : 'blubb',
        address: 'Gasse 4',
        phone : '132423'
      },
      {
        username : 'SomeName',
        address: 'SomeStreet 5',
        phone : '230840984'
      },
      ];*/
  }
// fetches users that need to be validated from backend
  getRegistrationRequests() {
    this.http.get('http://localhost:3000/user/verify').subscribe((data: User[]) => {this.Users = data; });
  }
// calls function for verification and refreshes users to be verified
  validateUser(user: User) {
    this.sendUserToValidate(user);
    setTimeout(() => { this.getRegistrationRequests(); }, 50);
  }

  // calls function for deletion and refreshes users to be verified
  deleteUser(user: User) {
    this.sendUserToDelete(user);
    setTimeout(() => { this.getRegistrationRequests(); }, 50);
  }
// sends user to backend for deletion and tells admin it was deleted
sendUserToDelete(user: User) {
  this.http.delete('http://localhost:3000/user/' + user.id)
      .subscribe(res => alert('User wurde gelöscht'), err => alert('User konnte nicht gelöscht werden'));
}
// sends user to backend for validation and tells admin it was validated
sendUserToValidate(user: User) {
    this.http.put('http://localhost:3000/user/verify/' + user.id, user, {responseType: 'text'})
        .subscribe(res => alert('User wurde validiert'), err => console.log('User konnte nicht validiert werden'));
}
  ngOnInit() {
    this.getRegistrationRequests();
  }


}


