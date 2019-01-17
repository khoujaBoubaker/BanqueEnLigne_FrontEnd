import {Injectable} from '@angular/core';
import {JwtHelper} from 'angular2-jwt';



@Injectable()
export class AuthService {

constructor(){

}


public isAuthenticated(){

const token = localStorage.getItem('token');

let jwtHelper=new JwtHelper();
return jwtHelper.isTokenExpired(token);



}




}
