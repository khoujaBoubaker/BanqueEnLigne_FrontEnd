import { Component, OnInit } from '@angular/core';
import {Contact} from '../../Model/Contact';
import {Http} from '@angular/http';
import {Administrateur} from '../../Model/Administrateur';
import {ContactService} from '../../services/contacts.service';


@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})
export class NewClientComponent implements OnInit {
  administrateur : Administrateur=new Administrateur();
  contact : Contact=new Contact();
  mode:number=2;
  http: Http;

  constructor(http: Http,
              public contactservice: ContactService) {

  }

  ngOnInit() {
  }

  // afficher le contact du formulaire
  // utiliser l'api rest pour ajouter un nouveau client
  onSaveData(){
    console.log(this.contact);
    this.mode=2;

  }
  addnewContact() {
console.log(this.administrateur);
this.mode=2;
this.contactservice.saveAdministrateur(this.administrateur).subscribe(data=>{
  console.log(data);
},
  err=>{
  console.log(err);
  });
  }


  annulerAjout(){
    this.mode=1;
    this.administrateur=new Administrateur();
  }
  }




