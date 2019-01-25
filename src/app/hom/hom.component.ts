import { Component, OnInit } from '@angular/core'
import {User} from '../../Model/User';
import {HostListener,Inject} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
declare const window : any;
import {PageEvent} from '@angular/material';

import * as $ from 'jquery';

import {NgProgress} from 'ngx-progressbar';
import {Router} from '@angular/router';
import {AuthenticationServicee} from '../../services/AuthenticationServicee';
import {AuthService} from '../../services/AuthService';

@Component({
  selector: 'app-hom',
  templateUrl: './hom.component.html',
  styleUrls: ['./hom.component.css']
})
export class HomComponent implements OnInit {

  admin:Boolean;
  dispe='none';


// navbar toggle functions


 // go to profile
gotoprofile(){
this.router.navigate(['/home/Profile',this.authService.nomUserLoggedIn.id]);
}

// Activate bouton hide all onglets
  hideOnglets(){
    $("body #agences").hide(1000);
    $("body #c").hide(1000);
    $("body #home").hide(1000);
    $("body #edit").hide(1000);
    $("body #a").hide(1000);

  }


  // add methods to activate navbar
  //# logout function

   logout1(){
    this.router.navigate(['/login']);
    this.authService.logout();
    this.playaudioOut();

   }

   // open Modal profile







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
    this.dispe='none';
  }


  dispRecherche='block';
  disp='none';








  logout(){
    this.router.navigate(['/login']);
alert('confirm');
    this.playaudioOut();
    this.authService.logout();



  }


  profile:String="";
  rechercherProfile(){
    if(this.authService.isAdmin()==true){
      this.profile="ADMIN";
    }
    else {
      if(this.authService.isAdmin()==false){
        this.profile="SIMPLE USER";
      }
    }
  }


  openModalProfile(){
    this.rechercherProfile();
    $("#snack").addClass("shw");

  }




closeModalProfile(){

 $("#snack").removeClass("shw");

}

// deconnexion
w3_openclose(){
    $("body #edit").hide(1000);
    $("body #home").hide(1000);

    $("body #c").hide(1000);
    $("body #agences").hide(1000);
    $("body #a").hide(1000);
    this.dispe='block';
  }

// Confirmer deconnexion
 deconnecter(){
    this.authService.logout();
    this.router.navigate(['/login']);
this.playaudioOut();
  }















  constructor(public ngProgress:NgProgress,
              public router:Router,
              public authService:AuthenticationServicee,
              public auth:AuthService
              ) { }


 playaudio(){
let audio=new Audio();
audio.src="../assets/audio/ding.m4a";
audio.load();
audio.play();

 }

 playaudioOut(){
    let audio=new Audio();
    audio.src="../assets/audio/out.m4a";
    audio.load();
    audio.play();

 }

playaudiogun(){
    let audio=new Audio();
    audio.src="../assets/audio/gun.WAV";
    audio.load();
    audio.play();

 }



  ngOnInit() {

  console.log("ten :"+this.auth.isAuthenticated());



  this.authService.IsAlreadyConnected();
  this.playaudio();


  this.dispe='none';



  //  this.loadScript('../node_modules/chart.js/dist/Chart.min.js');
    this.loadScript('../assets/js/bootstrap.min.js');
    this.loadScript('../assets/js/h.js');

    this.loadScript('../assets/js/jquery1.min.js');
    this.loadScript('../assets/js/bootstrap.min.js');
    this.loadScript('../assets/js/custom.min.js');
    this.loadScript('../assets/js/moment.min.js');
    this.loadScript('../assets/js/Chart.min.js');

   // this.loadScript('../assets/js/fullcalendar.js');



    console.log(this.authService.isAdmin());
    console.log(this.authService.jwtToken);
    console.log(this.authService.roles);

  }

onActivate(event){
window.scroll(0,0);
}

@HostListener("window:scroll",[])
haut(){
 const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
 //number=0;
window.scrollTo(0,number - 20);


}

  @HostListener("window:scroll",[])
  onWindowScroll(){
    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number > 20) {
      $('#nav').addClass('black');
      $('#f').addClass('btnHautDePage');


    } else if (number < 20) {
      $('#nav').removeClass('black');
      $('#f').removeClass('btnHautDePage');
    }






  }

}
