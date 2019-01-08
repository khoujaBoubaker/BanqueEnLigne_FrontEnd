import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Administrateur} from '../Model/Administrateur';
import {getResponseURL} from '@angular/http/src/http_utils';

@Injectable()
export class ContactService{

  constructor(public http:Http){}

  getContacts(){
    return this.http.get('https://jsonplaceholder.typicode.com/users').map(response=>response.json());
  }


  getContactsPagination(motcle: String,page:number,size:number)
  {
     return this.http.get("http://localhost:8080/chercherContacts?mc="+motcle+"&size="+size+"&page="+page).
       map(response=>response.json());
  }

  getAdministarteurs(){
    return this.http.get("http://localhost:8080/user/").map(response=>response.json());
  }


  saveAdministrateur(admin: Administrateur)
  {
    return this.http.post('http://localhost:8080/user',admin).
      map(response=>response.json());
  }

  updateAdministarteur(administrateur: Administrateur)
  {
    return this.http.put('http://localhost:8080/user',administrateur.id).
      map(response=>response.json());
  }



  supp(id){
    return this.http.delete('http://localhost:8080/user/delete/'+id).map(data => data.json());
  }




}
//
