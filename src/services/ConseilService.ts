import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Time} from '@angular/common';

@Injectable()
export class ConseilService{

  constructor(public http:Http){}


  public ConseillersDisponible(idagence:number,jour:Date,heure:String){
    return this.http.get("http://localhost:8080/rendezvous/listeConseillersDispo?idagence="+idagence+"&jour="+jour+"&heure="+heure).map(response=>response.json());
  }




  getConseillerParAgence(id:number){
    return this.http.get("http://localhost:8080/conseillers/chercherConseillersParAgence/"+id).map(response=>response.json());

  }


}
