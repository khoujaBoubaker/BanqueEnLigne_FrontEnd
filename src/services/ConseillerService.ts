import {Injectable} from '@angular/core';
import {Http, HttpModule} from '@angular/http';
import {Conseiller} from '../Model/Conseiller';
import {HttpHeaders} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ConseillerService {


  headers=new HttpHeaders({'authorization':localStorage.getItem("token")});


  public constructor(public http:Http,
                     public htttp:HttpClient){
    this.headers.append("authorization",localStorage.getItem("token"));

  }

  getConseillers(motcle: String,page:number,size:number)
  {
    return this.http.get("http://localhost:8080/conseillers/chercherconseillers?mc="+motcle+"&size="+size+"&page="+page).
    map(response=>response.json());
  }

  addConseiller(conseiller:Conseiller){
    return this.http.post("http://localhost:8080/conseillers/conseiller",conseiller).map(response=>response.json());
  }

  deleteConseiller(id:number){
    return this.htttp.delete("http://localhost:8080/conseillers/conseiller/delete/"+id,{headers:this.headers,observe:'response'});
  }

  // Mise à jour du conseiller dont l'id est passé en parametre

  updateConseiller(conseiller:Conseiller){
    return this.http.put("http://localhost:8080/conseillers/conseiller/"+conseiller.id,conseiller).map(response=>response.json());

  }


  //recherche conseillers triées par date embauche.
  listesConseillersTriées(mc:String,pg:number,sz:number){
    return this.http.get("http://localhost:8080/conseillers/chercherconseillersTri?mc="+mc+"&size="+sz+"&page="+pg).map(response=>response.json());
  }


  //recherche conseillers triées par date embauche.
  listesConseillersTriéesParNom(mc:String,pg:number,sz:number){
    return this.http.get("http://localhost:8080/conseillers/chercherconseillersTriParNom?mc="+mc+"&size="+sz+"&page="+pg).map(response=>response.json());
  }


  listesConseillersTriéesParDateDeNiassance(mc:String,pg:number,sz:number){
    return this.http.get("http://localhost:8080/conseillers/chercherconseillersTriParDTN?mc="+mc+"&size="+sz+"&page="+pg).map(response=>response.json());
  }

  getConseillerParId(id:number){
    return this.http.get("http://localhost:8080/conseillers/conseiller/"+id).map(response=>response.json());
  }



  getConseillerParAgence(id:number){
    return this.http.get("http://localhost:8080/conseillers/chercherConseillersParAgence/"+id).map(response=>response.json());
    }







}
