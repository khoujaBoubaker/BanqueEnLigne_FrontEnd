import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class CompteService{


  constructor(public http:Http){}

  /*
   appel du service : a la donnée de l'id du client on recupere la liste des comptes
   */

  getComptesCourantById(idClient:Number){
    return this.http.get("http://localhost:8080/comptes/comptes/"+idClient).map(response=>response.json());
  }
}
