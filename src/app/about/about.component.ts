import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {ContactService} from '../../services/contacts.service';
import {Administrateur} from '../../Model/Administrateur';
import { Router} from '@angular/router';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  providers: [ContactService]
})
export class AboutComponent implements OnInit {

  AboutInfo: any;
  admin: Administrateur;

  motCle: string ="";
  size: number=5;
  page:number=0;





  constructor(public http: Http, public contactservice: ContactService,public router: Router) {
  }

  ngOnInit() {

  }


  dosearch() {
    this.contactservice.getContactsPagination(this.motCle, this.page, this.size).subscribe(data => {
        this.AboutInfo = data.content;
        console.log(this.AboutInfo);
      },
      error2 => {
        console.log(error2);
      })
  }

  chercher(){
    this.dosearch();
  }




  ondelete(admin1: Administrateur)
  {
    //this.router.navigate(['editContact',id]);
    // Recuperation de l'id de l'objet cliqué :

 console.log(this.AboutInfo);

  }


}









