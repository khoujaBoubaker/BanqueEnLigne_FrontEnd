import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class VirementService{

constructor(public http:Http){}

/*
   cet appel nous retourne la liste des clients
 */
getClientsPourVirement(id : number){

return this.http.get('http://localhost:8080/clients/virements/chercherListeClientsPourVirement?idclient='+id).
map(response=>response.json());

}

/*
 cet appel nous retourne une page de clients
 dont le motif de recherche est le nom d'un client.
 */

getPageClients(cl:number,motcle:String,page:number,size:number){
  return this.http.get('http://localhost:8080/clients/virement?idcl='+cl+"&motCle="+motcle+"&page="+page+"&size="+size).
  map(reponse=>reponse.json());

}

}
