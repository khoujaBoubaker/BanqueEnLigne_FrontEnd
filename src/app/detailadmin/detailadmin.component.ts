import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Administrateur} from '../../Model/Administrateur';
import {administrationService} from '../../services/administrationService';
import {Alert} from 'selenium-webdriver';

@Component({
  selector: 'app-detailadmin',
  templateUrl: './detailadmin.component.html',
  styleUrls: ['./detailadmin.component.css'],
  providers:[administrationService]
})
export class DetailadminComponent implements OnInit {

  administrateur:Administrateur=new Administrateur();
  idadministrateur:number;

  name:string="";
  lastname:string="";

  constructor(public router:Router,public activeatedroute:ActivatedRoute,public adminService:administrationService ) {

    this.idadministrateur=activeatedroute.snapshot.params['id'];
    console.log(this.idadministrateur);
    this.name=this.administrateur.nom;

  }



  ngOnInit() {
    this.adminService.getAdministrateurById(this.idadministrateur).subscribe(data=> {
      this.administrateur = data;
      console.log(data);

    },
      error2 =>{ console.log(error2);
    })

  };

  // a faire
  retour(){

  }

  saveOrUpdate(c){

    this.adminService.updateAdministrateur(c).subscribe(data=>{
      alert("Mise à jour effectuée");
    },
      error2 => console.log(error2));

  }

}
