import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Mensualite} from '../Model/Mensualite';

@Injectable()
export class MensualiteService{

  constructor(public http:Http){}


  ListeDesMensualites(id:number,page:number,size:number){
    return this.http.get("http://localhost:8080/mensualites/chercherMensualites/?idcredit="+id+"&pageM="+page+"&sizeM="+size).map(response=>response.json());

  }


  MettreAjourMensualite(id:number,mensualite:Mensualite){
    return this.http.put("http://localhost:8080/mensualites/MettreAjourMensualite/"+id,mensualite).map(response=>response.json());

  }

}
