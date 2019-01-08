import {Injectable} from '@angular/core';
import  {HttpClient} from '@angular/common/http';

import{Response,RequestOptions,Headers} from '@angular/http';
import {JwtHelper} from 'angular2-jwt';
import {User} from '../Model/User';
import {ConnectionService} from './ConnectionService';
import {ImageService} from './ImageService';
import {DomSanitizer} from '@angular/platform-browser';
import {Administrateur} from '../Model/Administrateur';


@Injectable()
export class AuthenticationServicee{



  public host:string='http://localhost:8080/login';
  private headers = new Headers({'Content-Type': 'application/json'});
  public constructor(public http:HttpClient,
                     public connectionservice:ConnectionService,
                     public imageservice:ImageService,
                     public sanitizer:DomSanitizer){}
  public jwtToken:string;
  public roles:Array<any>;

  public nomUserLoggedIn:any;
  imgToShow:any;
  mysrc:any;

  private readonly imageType : string='data:image/jpeg;base64,';
  public image: any;

  IsConnected:Boolean=false;
  idadmin:number;






  loggedIn:Boolean=false;

  loadToken(){
    this.jwtToken=localStorage.getItem('token');
  }







  loginn(user){


   // this.loadToken();
    this.connectionservice.getAdmin(user.username,user.password).subscribe(data=>{
      this.nomUserLoggedIn=data;
      this.image=this.sanitizer.bypassSecurityTrustUrl(this.imageType+ data.pic);
      console.log("data :"+this.nomUserLoggedIn.id);


    },
      error1 => console.log(error1))
    return this.http.post(this.host,user,{observe:'response'});





  }

  saveToken(jwt:string){
    this.jwtToken=jwt;
    //this.loadToken();
    localStorage.setItem('token',jwt);
    let jwtHelper=new JwtHelper();
    this.roles=jwtHelper.decodeToken(this.jwtToken).roles;
    console.log(this.roles);
    this.loggedIn=true;

  }

  logout(){
    this.jwtToken=null;
    localStorage.removeItem('token');
    this.loggedIn=false;
  }

  IsAlreadyConnected() {

    if (localStorage.getItem('token')) {
      this.loadToken();
      this.saveToken(localStorage.getItem('token'));
      this.isAdmin();
      return true;
    }

  }








  isAdmin(){

    for(let r of this.roles){
      if(r.authority=='admin') return true;
    }
    return false;

  }









}
