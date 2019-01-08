import { Component, OnInit } from '@angular/core';
import {Administrateur} from '../../Model/Administrateur';
import {ActivatedRoute} from '@angular/router';
import {Http} from '@angular/http';
import {ContactService} from '../../services/contacts.service';

@Component({
  selector: 'app-detail-contatct',
  templateUrl: './detail-contatct.component.html',
  styleUrls: ['./detail-contatct.component.css']
})
export class DetailContatctComponent implements OnInit {

  administrateur: Administrateur=new Administrateur();
  idadmin: number;
  constructor(public activatedroute: ActivatedRoute,public contactservice: ContactService) {
    this.idadmin=activatedroute.snapshot.params['idadmin'];
  }

  ngOnInit() {
  }

  supprimer(id){
   return this.contactservice.supp(id).subscribe();
  }


}
