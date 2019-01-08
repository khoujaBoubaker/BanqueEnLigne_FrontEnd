import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Credit} from '../Model/Credit';

@Injectable()
export class CreditService{

  public constructor(public http:Http){
  }

   simulerCredit(apport : number , total: number , duree : number ){
    return this.http.get("http://localhost:8080/credits/credit?apport="+apport+"&total="+total+"&duree="+duree).
      map(response => response.json());
  }

  CoutCredit(apport : number, total : number,duree : number){
    return this.http.get("http://localhost:8080/credits/Coutcredit?apport="+apport+"&total="+total+"&duree="+duree).
    map(response => response.json());
  }

  getCreditsByClient(id:number,page:number,size:number){
    return this.http.get("http://localhost:8080/credits/creditsParClient?idcl="+id+"&page="+page+"&size="+size).map(response=>response.json());
  }

  deleteCredit(id:number){
    return this.http.delete('http://localhost:8080/credits/credit/delete/'+id).map(response=>response.json());
  }

  updateCredit(credit:Credit,id:number){
    return this.http.put('http://localhost:8080/credits/credit/MiseAjour/'+id,credit).map(response=>response.json());
  }






}
