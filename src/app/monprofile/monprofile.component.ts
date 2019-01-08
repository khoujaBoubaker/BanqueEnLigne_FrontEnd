import { Component, OnInit } from '@angular/core';
import {ContactService} from '../../services/contacts.service';
import {Contact} from '../../Model/Contact';
import {Administrateur} from '../../Model/Administrateur';
import {modalservice} from '../../services/modalservice';




declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-monprofile',
  templateUrl: './monprofile.component.html',
  styleUrls: ['./monprofile.component.css'],
  providers:[modalservice]
})
export class MonprofileComponent implements OnInit {
  administrateur :Administrateur=new Administrateur();
  constructor (public contactservice: ContactService,public ms:modalservice)
{
}
  ngOnInit() {


    $("#fg").show(2000);
    }
clearData(){
    this.administrateur=new Administrateur();
   $("#cl").click(function () {
     $("dialog").open();
   });
    console.log("message ..");
   }

  addNewPersonne(){
    this.contactservice.saveAdministrateur(this.administrateur).subscribe(data=>{console.log(data)},
  error2 =>{console.log(error2);});}


  closeformulaire()
  {
    $("#formulaire").slideToggle(1500);
  }

  hidefo(){

    $("#fg").slideToggle(); $("#hdmenu").slideToggle();
  }

  y(){
    $("#af").slideDown("normal");
  }
mode:Number=1;

changeMenu(){this.mode=2;$("#btn").hide();
}

  retourversCoordonnees(){this.mode=1;$("#btn").show(1500);$("#send").show(1500);

}

openmodal(id: string)
{
  this.ms.open(id);
}


}
