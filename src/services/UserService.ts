import {Http} from '@angular/http';


export class UserService{



  constructor(public http:Http){

  }

  getUser(){
    return this.http.get("").map(response=>response.json());
  }
}
