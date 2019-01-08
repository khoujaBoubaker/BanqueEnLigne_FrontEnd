import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class ConnectionService {

  public constructor(public http:Http){

  }

  getAdmin(username:String , password:String){
    return this.http.get('http://localhost:8080/admins/admin?username='+username+"&password="+password).map(response=>response.json());

  }

  getAdminByUsername(username:String){
    return this.http.get('http://localhost:8080/admins/getAdmin?username='+username).map(response=>response.json());

  }

}
