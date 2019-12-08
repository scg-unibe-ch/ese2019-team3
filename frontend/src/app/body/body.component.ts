import { Component, OnInit } from '@angular/core';
import {Service} from "../models/service";
import {ServiceService} from "../service.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit {
//public selectedIndex = 0;
  constructor(private service: ServiceService, public httpClient: HttpClient, private router: Router, private auth: AuthenticationService) {

  }
  loggedIn = this.auth.getCurrentUser();
 /* public number: string []= [
      "1", "2", "3", "4", "5"
  ];*/

/*public images: string[] = [
    "../../assets/home/catering2.jpg",
    "../../assets/home/band2.jpg",
    "../../assets/home/cake2.jpg",
    "../../assets/home/stage2.jpg",
    "../../assets/home/advert2.jpg",
];*/

/*@TODO make a slideshow with pictures. style body component with more html. */
  ngOnInit() {
   //this.showSlide();
  }
/*
 selectImage(index: number){
   this.selectedIndex = index;

 }
  showSlide(){
    let i;
    const slides = Array.from(document.getElementsByClassName("slides"));
    for (i = 0; i < slides.length; i++) {

      slides[i]['style'].display = "none";
    }
    this.slideIndex++;
    if (this.slideIndex > slides.length) {
      this.slideIndex = 1
    }
    slides[this.slideIndex-1]['style'].display = "block";
    setTimeout(this.showSlide, 4000); // Change image every 2 seconds

  }*/
  onSubmit(){
  }

}
