import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import { Router,  ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class urlPermission implements CanActivate{

  constructor(public router:Router){

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (localStorage.getItem('currentUser')){
      return true;
    }

    //not logged in so redirect to login page with the return url
    this.router.navigate(['/login'],{queryParams:{returnUrl:state.url}})
  }

}
