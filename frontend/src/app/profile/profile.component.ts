import { Component, OnInit } from '@angular/core';
import { getQueryPredicate } from '@angular/compiler/src/render3/view/util';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  //Controll over multiple values
  profileForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    adress: new FormControl(''),
    number: new FormControl(''),

  });

  constructor() { }

  ngOnInit() {}

  //TODO
  disabled(){
    //doesn't work yet, so took it out
    // this.profileForm.disable();
    this.profileForm.enable();

  }
  // testing 
  onSubmit(){
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
    this.disabled();

  }
  
  enabled(){
    this.profileForm.enable();
  }
 
}
