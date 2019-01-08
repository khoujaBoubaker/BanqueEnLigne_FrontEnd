import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {delayResponse} from 'angular-in-memory-web-api/delay-response';


@Injectable()
export class RendezVousService{

  constructor(public http:Http){}


  public addRendezVous(idClient:number,idConseiller:number,libelle:String,jour:Date,heure:String){
   return this.http.post("http://localhost:8080/rendezvous/ajoutRendezVous?idClient="+idClient+"&idConseiller="+idConseiller+"&libelle="+libelle+"&jour="+jour+"&heure="+heure,heure).map(response=>response.json());

  }


  public getRendezVousPerClient(idClient:number, mc:string,page:number,size:number){
    return this.http.get("http://localhost:8080/rendezvous/listeRendezVousParClient?idClient="+idClient+"&motcle="+mc+"&idClient="+idClient+"&page="+page+"&size="+size).map(response=>response.json());
  }

  public deleteRendezVous(id:number){
    return this.http.delete("http://localhost:8080/rendezvous/deleteRendezVous/"+id).map(response=>response.json());

  }

}
