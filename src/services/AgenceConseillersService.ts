import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

Injectable();
export class AgenceConseillersService{

  constructor(public http:Http){

  }



  getConseillerAgence(id:number,page:number,size:number){
   return this.http.get("http://localhost:8080/conseillers/chercherconseillersParAgence?mc="+id+"&page="+page+"&size="+size).map(response=>response.json());

  }
}
