import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class ComptCourantService{

  constructor(public http:Http){}

  // rechercher les comptes courants par id
  getComptesCourants(idnumber:number,pageC:number,sizeC:number){
    return this.http.get("http://localhost:8080/comptes/cherchercomptes/?idmc="+idnumber+"&pageC="+pageC+"&sizeC="+sizeC)
      .map(data=>data.json());

  }



  supprimerCompteCourant(id:number){
    return this.http.delete("http://localhost:8080/comptes/compte/delete/"+id).map(response=>response.json());

  }


  getComptesCourantsTriesParDateDeCreation(idnumber:number,pageC:number,sizeC:number){
    return this.http.get("http://localhost:8080/comptes/cherchercomptesTriesParDateDeCreation/?idmc="+idnumber+"&pageC="+pageC+"&sizeC="+sizeC)
      .map(data=>data.json());

  }


  getComptesCourantsTriesParDecouvert(idnumber:number,pageC:number,sizeC:number){
    return this.http.get("http://localhost:8080/comptes/cherchercomptesTriesParDecouvert/?idmc="+idnumber+"&pageC="+pageC+"&sizeC="+sizeC)
      .map(data=>data.json());
  }

  //recherche des comptes courant triés par solde
  getComptesCourantsTriesParSolde(idnumber:number,pageC:number,sizeC:number){
    return this.http.get("http://localhost:8080/comptesCourants/chercherCCPTRIESPARSOLDE?idclient="+idnumber+"&pageCC="+pageC+"&sizeCC="+sizeC)
      .map(data=>data.json());

  }




}
