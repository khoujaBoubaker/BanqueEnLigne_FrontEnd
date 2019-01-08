import { Component, OnInit } from '@angular/core';
import {administrationService} from '../../services/administrationService';
import {Http} from '@angular/http';
import { Router} from '@angular/router';
import {Administrateur} from '../../Model/Administrateur';
import {MatTooltipModule} from '@angular/material/tooltip';



declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-liste-administrateurs',
  templateUrl: './liste-administrateurs.component.html',
  styleUrls: ['./liste-administrateurs.component.css'],
  providers:[administrationService]
})
export class ListeAdministrateursComponent implements OnInit {

  display='none';

  motCle: String="";
  page : number=0;
  size : number=5;
  administrateurs: any;
  pages:Array<number>;
  SelectedAdmin:Administrateur=new Administrateur();
  constructor( public http: Http,public administrationservice:administrationService,public router: Router) { }

  ngOnInit() {
    this.chercher();
    $("#t").ready(function(){
      $("#t").tool
    });
  }

ouvr(){
  $("#myModal").modal();

}

mod(){
    $("#myModal").modal();
}

  onEdit(id:number){
    this.router.navigate(['editadmin',id]);
    }

  nombreDePage(){
    console.log("clik");
    }

    openModal(){
    this.display="block";
    }

onCloseHandled(){
    this.display="none";

}

tofive(){
    this.size=5;
    this.chercher();
    $("#mn").slideToggle();
}

toten(){
    this.size=10;
    this.chercher();
}

showdetails(admin){
   this.SelectedAdmin=admin;
   console.log(this.SelectedAdmin);
   this.display="block";
}
  NombreDePages(a){
console.log(a);
  }


  delete(admin) {
    console.log(admin);
    this.administrationservice.supprimerAdmin(admin.id).subscribe(data => {
      this.administrateurs.content.splice(
        this.administrateurs.content.indexOf(admin),1);
      $("#suppressionid").show();
      $("#suppressionid").hide();


    })
  }


  doSearch(){
    this.administrationservice.getContactsPagination(this.motCle,this.page,this.size).subscribe(
      data=>{
        this.administrateurs=data;
        this.pages=new Array(data.totalPages);
      },
      error2 => console.log(error2));
  }

  chercher(){
    this.doSearch();
  }

  gotoPage(i:number){
    this.page=i;
    this.doSearch();
  }

  deleteData(admin){
    console.log("---");
    console.log(admin);
    console.log("---");
  }
  // DESIGN

  hidetable()
  {
    $("#datatable").slideToggle();
  }

  op(c){
    $("#myModal").show();
    console.log(c);
    this.SelectedAdmin=c;
  }

  fermermodal(){
    $("#myModal").hide();
  }

  next(){
    this.page=this.page+1;
    this.chercher();

  }

  previous(){
    this.page=this.page-1;
    this.chercher();
  }


}




