import {Component, HostListener, OnInit, ɵConsole} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import * as $ from 'jquery';
import {DomSanitizer} from '@angular/platform-browser';

import {AuthenticationServicee} from '../services/AuthenticationServicee';
import {Router} from '@angular/router';
import {ImageService} from '../services/ImageService';
import {Administrateur} from '../Model/Administrateur';
import {administrationService} from '../services/administrationService';
declare const window : any;



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[AuthenticationServicee,ImageService],


})
export class AppComponent implements OnInit {
  titl:string='boubaker';
  dispe='none';
  user:any;
  counter:number=5;
  private readonly imageType : string='data:image/jpeg;base64,';
  private image:any;
  k:number;



  dateduJour:Date = new Date();
   day=this.dateduJour.getDay();

   // GET INFORMATIONS ADMINISTRATOR

  fade(){
    $("#panel").toggle("slow");
  }

  profile(){
    this.router.navigate(['/home/Profile',this.authService.nomUserLoggedIn.id]);
    this.k=0;

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


  w3_close(){
    this.dispe='none';
  }

  deconnecter(){
    this.authService.logout();
  }

  w3_open(){
    $("body #edit").hide(1000);
    $("body #home").hide(1000);

    $("body #c").hide(1000);
    $("body #agences").hide(1000);
    $("body #a").hide(1000);
    this.dispe='block';
  }


  constructor (public authService:AuthenticationServicee,
               public router:Router,
               public sanitizer:DomSanitizer,
               public adminService:administrationService){}

  effect:number;
  disp:Boolean=false;



  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  cliquer(){
    $("#settings").toggle();

  }




  ngOnInit(){
   // alert('app loaded');


    //this.image=this.sanitizer.bypassSecurityTrustUrl(this.imageType+ this.authService.nomUserLoggedIn.pic);

    this.user=this.authService.nomUserLoggedIn;
    console.log("administrateur connecté :"+this.user);
    console.log(this.user);

    console.log("verifier adminité :"+this.authService.roles);


    //console.log(this.authService.nomUserLoggedIn);
    //console.log("verifier si l'utilsateur est admin :"+this.authService.isAdmin());

    this.loadScript('../assets/js/jquery.min.js');
    this.loadScript('../assets/js/bootstrap.min.js');
    //this.loadScript('../assets/js/custom.min.js');









  }


  togglegeneral(){
    this.effect=5;
    $("body #c").slideDown(1000);
    $("body #home").hide(1000);
    $("body #edit").hide(1000);
    $("body #agences").hide(1000);
    $("body #a").hide(1000);

  }

  toggleagences(){
    this.effect=4;
    $("body #agences").slideDown(1000);
    $("body #c").hide(1000);
    $("body #home").hide(1000);
    $("body #edit").hide(1000);
    $("body #a").hide(1000);

  }

  hideOnglets(){
    $("body #agences").hide(1000);
    $("body #c").hide(1000);
    $("body #home").hide(1000);
    $("body #edit").hide(1000);
    $("body #a").hide(1000);

  }



  toggleCalendrier(){
    this.effect=3;
    $("body #a").slideDown(1000);

    $("body #agences").hide(1000);
    $("body #c").hide(1000);
    $("body #home").hide(1000);
    $("body #edit").hide(1000);

  }


  toggleHome(){
    $("#home").slideDown(1000);
    $("#edit").hide(1000);
    $("#g").hide(1000);
    $("#agences").hide(1000);
    //this.zone=0;
    this.effect=1;
  }



























  toggleForm(){
    $("body #edit").slideDown(1000);
    $("body #home").hide(1000);

    $("body #c").hide(1000);
    $("body #agences").hide(1000);
    $("body #a").hide(1000);
    this.effect=2;
  }



  @HostListener("window:scroll",[])
  onWindowScroll(){
    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number > 10) {
      $('#nav').addClass('black');


    } else if (number < 10) {
      $('#nav').removeClass('black');

    }


  }





  logout1(){
    this.router.navigate(['/login']);
    this.authService.logout();


  }


















}
