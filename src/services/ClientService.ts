import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Administrateur} from '../Model/Administrateur';
import {Client} from '../Model/Client';
import {Compte} from '../Model/Compte';

import {AuthenticationServicee} from './AuthenticationServicee';
import {HttpClient} from '@angular/common/http';
import {RequestOptions} from '@angular/http';
import {HttpHeaders} from '@angular/common/http';
import{Credit} from '../Model/Credit';

import{Headers} from '@angular/http';


@Injectable()
export class ClientService{

 headers=new HttpHeaders({'authorization':localStorage.getItem("token")});




  constructor(public http:Http,
              public authService:AuthenticationServicee,
              public htttp:HttpClient){
  }





  // liste des utilisateurs
  public getClients(motcle: String,page:number,size:number){
    return this.http.get("http://localhost:8080/clients/chercherclients?mc="+motcle+"&page="+page+"&size="+size).map(data=>data.json());
  }

  public getClientsTriesParSalaire(motcle: String,page:number,size:number){
    return this.http.get("http://localhost:8080/clients/chercherclientsTriessParSalaire?mc="+motcle+"&page="+page+"&size="+size)
      .map(response=>response.json());
  }

  public getClientsTriesParSalaireOC(motcle: String,page:number,size:number){
    return this.http.get("http://localhost:8080/clients/chercherClientsTriessParSalaireOC?mc="+motcle+"&page="+page+"&size="+size)
      .map(response=>response.json());
  }

  public getClientsTriesParEmailCroissant(motcle:string,page:number,size:number){
    return this.http.get("http://localhost:8080/clients/chercherClientsTriessParEmailOC?mc="+motcle+"&page="+page+"&size="+size)
      .map(response=>response.json());
  }

  public getClientsTriesParEmailDecroissant(motcle:string,page:number,size:number){
    return this.http.get("http://localhost:8080/clients/chercherClientsTriessParEmailDEC?mc="+motcle+"&page="+page+"&size="+size)
      .map(response=>response.json());
  }

  public getClientsTriesPardtn(motcle: String,page:number,size:number){
    return this.http.get("http://localhost:8080/clients/chercherclientsTriessPardtn?mc="+motcle+"&page="+page+"&size="+size)
      .map(response=>response.json());
  }


  public getClientsTriesPardtc(motcle: String,page:number,size:number){
    return this.http.get("http://localhost:8080/clients/chercherclientsTriessPardtc?mc="+motcle+"&page="+page+"&size="+size)
      .map(response=>response.json());
  }


  saveClient(client: Client)
  {
    return this.http.post('http://localhost:8080/clients/client',client).
    map(response=>response.json());
  }

  public supprimerClient(id: number){
    return this.htttp.delete("http://localhost:8080/clients/client/delete/"+id,{headers:this.headers});
  }

  public ajouterClient(client:Client){
    return this.http.post("http://localhost:8080/clients/client/",client).map(response=>response.json());
  }

  public ajouterCompteAuClient(idclient:number,compte:Compte){
    return this.http.post("http://localhost:8080/comptes/client/compte/"+idclient,compte).map(response=>response.json());
}


public updateClient(id:number,client:Client) {

  console.log(localStorage.getItem('token'));
  return this.htttp.post("http://localhost:8080/clients/clientupdate/" + id, client,{headers:this.headers});
}





  public getClient(id:number){
    return this.http.get("http://localhost:8080/clients/client/"+id).map(response=>response.json());
  }

  public addClientDansAgence(id:number,client:Client)
  {
    return this.http.post("http://localhost:8080/clients/client/"+id,client).map(response=>response.json());
  }

  public sizeClients(){
    return this.http.get('http://localhost:8080/clients/size').map(response=>response.json());
  }

  public ajouterCreditAunClient(id:number,credit:Credit){
    return this.http.post('http://localhost:8080/credits/AddCredit/'+id,credit).map(response=>response.json());

  }

}
