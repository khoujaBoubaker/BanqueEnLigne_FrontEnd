import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AgenceService} from '../../services/AgenceService';
import {Agence} from '../../Model/Agence';
import {FormBuilder, FormGroup} from '@angular/forms';

declare var $ :any;

@Component({
  selector: 'app-editagence',
  templateUrl: './editagence.component.html',
  styleUrls: ['./editagence.component.css'],
  providers:[AgenceService]
})
export class EditagenceComponent implements OnInit {



  constructor(
    public router:Router,
    public route:ActivatedRoute,
    public agenceservice:AgenceService,
    public formbuilder:FormBuilder
  ) { }



  hideList() {

    $("#s").toggle();
  }

  annuler(){
    this.router.navigate(['/home/Agences']);
  }

  id:number;
  public agencegroup:FormGroup;
  agence:Agence;


  agenceToBeUpdated:Agence;
  updateagence(){
    this.agenceToBeUpdated=new Agence();
    this.agenceToBeUpdated.addresse=this.agencegroup.get('addresse').value;
    this.agenceToBeUpdated.commune=this.agencegroup.get('commune').value;
    this.agenceToBeUpdated.telephone=this.agencegroup.get('telephone').value;
    console.log(this.agenceToBeUpdated);
    this.agenceservice.editAgence(this.id,this.agenceToBeUpdated).subscribe(data=>{
      alert('data updated');
      this.router.navigate(['/home/Agences']);

    })

  }

  ngOnInit() {

    this.id=+this.route.snapshot.params['id'];
    this.agenceservice.trouverAgenceById(this.id).subscribe(data=>{
      this.agence=data;
    },
      error2 => console.log(error2));


    this.agencegroup=this.formbuilder.group({
      addresse:'',
      commune:'',
      telephone:''
    })

  }

}
