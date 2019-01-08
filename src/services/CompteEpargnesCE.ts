import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Compte} from '../Model/Compte';
import {compteEpargne} from '../Model/compteEpargne';

@Injectable()
export class CompteEpargnesCE {

  constructor(public http: Http) {
  }

// AJOUT COMPTE EPARGNES
  ajoutCompteEpargne(id: number, compte: compteEpargne) {
    return this.http.post("http://localhost:8080/comptesEpargnes/client/"+id, compte).map(response => response.json());
  }


  // LISTE DE TOUS LES COMPTES EPARGNES
  getComptesEpargnes(idnumber: number, pageE: number, sizeE: number) {
    return this.http.get("http://localhost:8080/comptesEpargnes/chercherCCE?idclient=" + idnumber + "&pageCE=" + pageE + "&sizeCE=" + sizeE)
      .map(response => response.json());

  }

  // SUPPRIMER COMPTES EPARGNE

  deleteCompteEpargne(idcompteEpargne:number){
    return this.http.delete("http://localhost:8080/comptesEpargnes/compteEpargne/delete/"+idcompteEpargne).map(response=>response.json());
    }

    updateCompteEpargne(id:number,compte:compteEpargne){
    return this.http.post("http://localhost:8080/comptesEpargnes/client/update/"+id,compte).map(response=>response.json());
    }


}
