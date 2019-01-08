import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Conseiller} from '../Model/Conseiller';


Injectable();
export class ConseillersAgence{

  constructor(public http:Http){}


  saveConseiller(id:number,conseiller:Conseiller){
    return this.http.post("http://localhost:8080/conseillers/conseiller/saveInAgence/"+id,conseiller).map(response=>response.json());
    }

}
