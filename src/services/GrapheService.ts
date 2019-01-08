import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class GrapheService{

  constructor(public http:Http){

  }


  public getGraphique(){
    return this.http.get('http://localhost:8080/graphes/chart').map(data=>data.json());
  }

  public getGraphiquesParPeriode(id:number){
    return this.http.get('http://localhost:8080/graphes/liste/'+id).map(data=>data.json());
  }

}
