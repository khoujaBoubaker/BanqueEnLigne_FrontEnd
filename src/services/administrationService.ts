import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Administrateur} from '../Model/Administrateur';

@Injectable()
export class administrationService{



  constructor(public http: Http){}

  // appel de la liste des administrateurs

  getContactsPagination(motcle: String,page:number,size:number)
  {
    return this.http.get("http://localhost:8080/chercherContacts?mc="+motcle+"&size="+size+"&page="+page).
    map(response=>response.json());
  }

  get(){
    return this.http.get("http://localhost:8080/chercherContacts").
    map(response=>response.json());
  }

  // GET ADMINISTARTEUR BY ID

  getAdministrateurById(id:number)
  {
    return this.http.get("http://localhost:8080/admins/findadmin/"+id).map(response=>response.json());
  }

  updateAdministrateur(admin:Administrateur)
    {

    return this.http.put("http://localhost:8080/user/"+admin.id,admin).map(response=>response.json());
  }


  public supprimerAdmin(id: number){
    return this.http.delete("http://localhost:8080//user/delete/"+id).map(response=>response.json());
  }

  public authenticate(login:string,password:string){
    return this.http.get('http://localhost:8080/authenticate?username='+login+'&password='+password).map(response=>response.json());
  }


}
