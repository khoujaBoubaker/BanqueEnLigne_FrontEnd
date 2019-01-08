import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Agence} from '../Model/Agence';
import {Conseiller} from '../Model/Conseiller';


@Injectable()
export class AgenceService{


  constructor(public http:Http){

  }

  public addagence(agence:Agence){
    return this.http.post("http://localhost:8080/agences/agence",agence).map(response=>response.json());

  }


  public trouverAgenceById(id:number){
    return this.http.get("http://localhost:8080/agences/Agence/"+id).map(response=>response.json());

  }

// GET ALL AGENCES VIA REST APT
  public getagences(motcle: String,page:number,size:number){
    return this.http.get("http://localhost:8080/agences/chercherAgences?mc="+motcle+"&page="+page+"&size="+size)
      .map(response=>response.json());
  }

  // get agences triees par commune.

  public getagencesTrieesParCommune(motcle: String,page:number,size:number){
    return this.http.get("http://localhost:8080/agences/chercherAgencesTriesParCmmune?mc="+motcle+"&page="+page+"&size="+size)
      .map(response=>response.json());
  }


  public supprimerAgence(id: number){
   return this.http.delete("http://localhost:8080/agences/agence/delete/"+id).map(response=>response.json());
  }



// ###################   ajouter Conseiller dans une agence ....
  saveConseiller(id:number,conseiller:Conseiller){
    return this.http.post("http://localhost:8080/conseillers/conseiller/saveInAgence/"+id,conseiller).map(response=>response.json());
  }


  getConseillerAgence(id:number,page:number,size:number){
    return this.http.get("http://localhost:8080/conseillers/chercherconseillersParAgence?mc="+id+"&page="+page+"&size="+size).map(response=>response.json());

  }



  public getClientParAgence(motcle:number,page:number,size:number){
    return this.http.get("http://localhost:8080/clients/chercherclientsParAgence?mc="+motcle+"&page="+page+"&size="+size).map(response=>response.json());
  }


  public editAgence(id:number,agence:Agence){
    return this.http.put("http://localhost:8080/agences/agence/"+id,agence).map(response=>response.json());
  }



}
