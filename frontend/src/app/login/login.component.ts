import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private message;
  constructor(
    private http: HttpClient,
    private authentication: AuthenticationService,
    private router: Router,
    private home: HomeComponent
  ) {}



// user is required to fill out both username and password fields
   loginForm = new FormGroup({
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
    });


    ngOnInit() {
    }


// takes information from login form and passes it on
    loginUser() {
        const loginData = {
            email: this.loginForm.get('email').value,
            password: this.loginForm.get('password').value,
        };

        this.sendUserData(loginData);
        setTimeout(() => { this.home.logIn(); }, 100);
    }

    // sends Data from login form to backend
    sendUserData(loginData: object) {
        this.authentication.loginUser(loginData);
    }
}
