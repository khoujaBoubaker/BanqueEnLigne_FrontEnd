import {Http} from '@angular/http';
import {Injectable} from '@angular/core';

@Injectable()
export class ChiffreAffiareService{

  constructor(public http: Http){

  }


  public calculerChiffreDaffaires(numberOfDays : number){
    return this.http.get('http://localhost:8080/chiffreAffaires/jours/'+numberOfDays).map(data=> data.json());
  }










}
