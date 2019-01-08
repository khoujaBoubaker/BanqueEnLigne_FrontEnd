import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Compte} from '../Model/Compte';
import {Client} from '../Model/Client';

@Injectable()
export class CompteCourantCC{

  constructor(public http:Http){

  }


  getComptesCourants(idnumber:number,pageC:number,sizeC:number){
    return this.http.get("http://localhost:8080/comptesCourants/chercherCCP?idclient="+idnumber+"&pageCC="+pageC+"&sizeCC="+sizeC)
      .map(data=>data.json());

  }

  supprimerCompteCourant(idcomptecourant:number)
  {
    return this.http.delete("http://localhost:8080/comptesCourants/comptecourant/delete/"+idcomptecourant).map(data=>data.json());
  }

  ajouterCompteCourant(id:number,compteCourant:Compte){
    return this.http.post("http://localhost:8080/comptesCourants/client/"+id,compteCourant).map(data=>data.json());

  }

  getComptesCourantsTriesParDecouvert(idnumber:number,pageC:number,sizeC:number){
  return this.http.get("http://localhost:8080/comptesCourants/chercherCCPTRIESPARDECOUVERT?idclient="+idnumber+"&pageCC="+pageC+"&sizeCC="+sizeC).map(data=>data.json());
  }

  getComptesCourantsTriesParSolde(idnumber : number , pageC:number,sizeC:number){
    return this.http.get("http://localhost:8080/comptesCourants/chercherCCPTRIESPARSOLDE?idclient="+idnumber+"&pageCC="+pageC+"&sizeCC="+sizeC).map(data=>data.json());
  }

  mettreAjourCompteCourant(compte:Compte,client:Client){
    return this.http.put("http://localhost:8080/comptesCourants/comptecourantClient/"+client.idclient,compte).map(response=>response.json());

  }

  getSoldeTotal(id:number){
    return this.http.get("http://localhost:8080/comptesCourants/soldeTotal?idclient="+id).map(response=>response.json());
  }

  // methode doit etre implementée dans le service compteEpargneCE
  getSoldeEpargne(client:Client){
    return this.http.get("http://localhost:8080/comptesCourants/soldeTotalEpargne?idclient="+client.idclient).map(response=>response.json());
  }



}
