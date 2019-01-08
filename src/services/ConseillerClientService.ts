import {Injectable} from '@angular/core';
import{Http} from '@angular/http';

@Injectable()
export class ConseillerClientService{

  constructor(public http:Http){

  }


  // Recuperation de la liste des clients a partir de
  //l'id de conseiller passé en parametre
  getClientByConseiller(id:number,page:number,size:number){
    return this.http.get("http://localhost:8080/conseillers/chercherclients?idconseiller="+id+"&size="+size+"&page="+page).
    map(response=>response.json());

  }

}
