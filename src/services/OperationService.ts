import {Injectable,ErrorHandler} from '@angular/core';
import {Http} from '@angular/http';
import  {Operation} from '../Model/Operation';
import {Observable} from 'rxjs/Observable';
import {HttpErrorResponse} from '@angular/common/http';
import {generateErrorMessage} from 'codelyzer/angular/styles/cssLexer';
import {getResponseURL} from '@angular/http/src/http_utils';
import {Agence} from '../Model/Agence';
import {Retrait} from '../Model/Retrait';


@Injectable()
export class OperationService{



  constructor(public http:Http,public handlererror:ErrorHandler){

  }



  public getOperationsComptesCourants(id:number,page:number,size:number){
    return this.http.get("http://localhost:8080/operations/chercherOperations/?idcompte="+id+"&page="+page+"&size="+size).
    map(response=>response.json());
  }


  public getRetraits(id:number,page:number,size:number){
    return this.http.get("http://localhost:8080/operations/chercherRetraits/?idcompte="+id+"&page="+page+"&size="+size).
      map(response=>response.json());
  }

  public getVersements(id:number,page:number,size:number){
    return this.http.get("http://localhost:8080/operations/chercherVersements/?idcompte="+id+"&page="+page+"&size="+size).
      map(response=>response.json());
  }


  public getOperationsParDate(id:number,dateop:Date,page:number,size:number){
    return this.http.get("http://localhost:8080/operations/chercherOperationsParDate/?idcompte="+id+"&opdate="+dateop+"&page="+page+"&size="+size).
      map(response=>response.json());
  }



  public getOperations(id:number,page:number,size:number){
    return this.http.get("http://localhost:8080/comptes/chercherOperations/?idcompte="+id+"&page="+page+"&size="+size).
      map(response=>response.json());
  }

  public supprimer(id:number){
   return this.http.delete("http://localhost:8080/comptes/operation/delete/"+id).map(response=>response.json());
  }

  public addOperation(id:number,operation:Operation){
    return this.http.put('http://localhost:8080/comptes/operation/add/'+id,operation).map(response=>response.json())
      .catch(this.handleError);
    }


  private handleError(error: HttpErrorResponse){
    if (error.error instanceof ErrorEvent){
      console.error('An error occurred:', error.error.message);



    }else  {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return Observable.throw(error.error);

  }

  public addVersement(id:number,operation:Operation){
    return this.http.put('http://localhost:8080/comptes/operation/addVersement/'+id,operation).map(response=>response.json());
  }


  public AddRetraitAgence(id:number,operation:Operation){
    return this.http.put('http://localhost:8080/comptes/operation/addOperationDansAgence/'+id,operation).map(response=>response.json());
  }

  public retirerArgent(id:number,retrait:Retrait){
    return this.http.post('http://localhost:8080/operations/retrait/'+id,retrait).map(response=>response.json());
  }

  public deleteOperation(id:number){
    return this.http.delete('http://localhost:8080/operations/supprimerOperation/'+id).map(response=>response.json());

  }


  public retirerAgencewithRequestPama(id1:number,idagence:number,montant:number,libelle:String){
    return this.http.post("http://localhost:8080/operations/RetraitDepuisAgence/?idcompte="+id1+"&idagence="+idagence+"&montant="+montant+"&libelle="+libelle,"").
      map(response=>response.json());
  }



  public clientsVirements(id:number,page:number,size:number){
    return this.http.get("http://localhost:8080/clients/chercherclientsPourVirement?idcl="+id+"&page="+page+"&size="+size).map(response=>response.json());

  }

  public effectuerVersementDansAgence(id:number,idagence:number,montant:number,libelle:String){
    return this.http.post("http://localhost:8080/operations/VerserDansUneAgence/?idcompte="+id+"&idagence="+idagence+"&montant="+montant+"&libelle="+libelle,"").map(response=>response.json());
  }


public effectuerVirementDeCompteACompte(idce:number,idagence:number,montant:number,idde:number,libelle:string){

    return this.http.post("http://localhost:8080/operations/VirementDansUneAgence/?idcompteEmetteur="+idce+"&idagence="+idagence+"&idcompteCrediteur="+idde+"&libelle="+libelle+"&montant="+montant,"").
      map(response=>response.json());

}


public effectuerRetraitPourPayerMensualite(idcompte:number,idcredit:number,idagence:number,montant:number,libelle:String){
    return this.http.post("http://localhost:8080/operations/PayerMensualite/?idcompte="+idcompte+"&idcredit="+idcredit+"&idagence="+idagence+"&montant="+montant+"&libelle="+libelle,"").map(response=>response.json());


}


}
