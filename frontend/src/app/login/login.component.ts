import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../authentication.service';
import { Router} from '@angular/router';
import {HomeComponent} from '../home/home.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    private message;
    constructor(private http: HttpClient, private authentification: AuthenticationService, private router: Router,
                private home: HomeComponent) {
    }

// user is required to fill out both username and password fields
   loginForm = new FormGroup({
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
    });


    ngOnInit() {
       /* this.loginForm.valueChanges.subscribe(
            (value) => console.log(value),
        )*/
    }


// takes information from login form and passes it on
    loginUser() {

        const loginData = {
            email: this.loginForm.get('email').value,
            password: this.loginForm.get('password').value,
        };

        this.sendUserData(loginData);

    }

    // sends Data from login form to backend
    sendUserData(loginData: object) {
        this.authentification.loginUser(loginData);
    }
}