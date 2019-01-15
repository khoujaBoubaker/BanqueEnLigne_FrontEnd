import { Component, OnInit } from '@angular/core'
import {User} from '../../Model/User';
import {HostListener,Inject} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
declare const window : any;
import {PageEvent} from '@angular/material';

import {NgProgress} from 'ngx-progressbar';
import {Router} from '@angular/router';
import {AuthenticationServicee} from '../../services/AuthenticationServicee';

@Component({
  selector: 'app-hom',
  templateUrl: './hom.component.html',
  styleUrls: ['./hom.component.css']
})
export class HomComponent implements OnInit {

  admin:Boolean;
  dispe='none';


  // add methods to activate navbar
  //# logout function

   logout1(){
    this.router.navigate(['/login']);
    this.authService.logout();
   }

   // toggle







  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  b:string="boubaker";

  currentUser:User;
  effect:number=0;








  w3_close(){
    this.disp='none';
  }

  w3_open(){
    this.disp='block';
    this.dispRecherche='none';
    console.log("open me");
  }
  dispRecherche='block';
  disp='none';








  logout(){
    this.router.navigate(['/login']);
    this.authService.logout();


  }








  constructor(public ngProgress:NgProgress,
              public router:Router,
              public authService:AuthenticationServicee) { }

  ngOnInit() {

  this.dispe='none';



    this.loadScript('../assets/js/jquery.min.js');
    this.loadScript('../assets/js/bootstrap.min.js');
    this.loadScript('../assets/js/custom.min.js');


    console.log(this.authService.isAdmin());
    console.log(this.authService.jwtToken);
    console.log(this.authService.roles);

  }

  @HostListener("window:scroll",[])
  onWindowScroll(){
    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number > 20) {
      $('#nav').addClass('black');
     

    } else if (number < 20) {
      $('#nav').removeClass('black');
    }


  }

}
