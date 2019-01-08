import { Component, OnInit } from '@angular/core';



declare var jquery:any;

@Component({
  selector: 'app-appheader',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.css']
})
export class AppheaderComponent implements OnInit {
  effect:number;

  title:string="boubaker";

  constructor() { }

  ngOnInit() {
  }

  togglegeneral1(){
    this.effect=3;
    $("#g").slideToggle();
    $("#home").hide(1000);
    $("#edit").hide(1000);
  }


  toggleagences(){
    this.effect=4;
    $("#agences").slideToggle();
    $("#home").hide(1000);
    $("#edit").hide(1000);
    $("#g").hide(1000);
  }

  toggleConseillers(){
    this.effect=5;
    $("#c").slideToggle();
    $("#agences").hide(1000);
    $("#home").hide(1000);
    $("#edit").hide(1000);
    $("#g").hide(1000);
  }


  toggleHome(){
    $("#home").slideToggle();
    $("#edit").hide(300);
    $("#g").hide();
   // this.zone=0;
    this.effect=1;
  }


  toggleForm(){
    $("#edit").slideToggle();
    $("#home").hide(1000);
    $("#g").hide(1000);
   this.effect=2;
  }




}
