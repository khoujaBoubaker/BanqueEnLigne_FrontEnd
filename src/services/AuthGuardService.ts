import {Injectable} from '@angular/core';
import {Router,CanActivate} from '@angular/router';
import {AuthService} from '../services/AuthService';

@Injectable()
export class AuthGuardService implements CanActivate{

constructor(public auth:AuthService,public router:Router){}

canActivate(){
if(!this.auth.isAuthenticated()){
this.router.navigate(['/login']);
confirm('session expirée');
return false;
}
return true;

}



}
