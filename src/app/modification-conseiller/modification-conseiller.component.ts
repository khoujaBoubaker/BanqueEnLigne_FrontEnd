import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ConseillerService} from '../../services/ConseillerService';
import {Conseiller} from '../../Model/Conseiller';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsModalRef} from 'ngx-bootstrap';
import {ToastsManager} from 'ng2-toastr';
import {LoaderService} from '../../services/LoaderService';


@Component({
  selector: 'app-modification-conseiller',
  templateUrl: './modification-conseiller.component.html',
  styleUrls: ['./modification-conseiller.component.css'],
  providers:[ConseillerService,LoaderService]
})
export class ModificationConseillerComponent implements OnInit {

  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  id:number;
  conseiller:Conseiller=new Conseiller();

  public modalRef: BsModalRef;

  hideList(){
    $("#s").slideToggle(0);
  }

  // recuperation du conseiller passé en parametre

  conseilgroup:FormGroup;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(public formbuilder:FormBuilder,
              public router:Router,
              public route:ActivatedRoute,
              public conseillerservice:ConseillerService,
              public totastr:ToastsManager,
              public Loaderservice:LoaderService) { }

              //  retour a la liste des conseillers ;apres avoir allé a la page de modifcation
       // d'un conseiller on va aller a la page des conseillers

  retour()
  {
    this.router.navigate(['/home/conseillers']);
  }


  infoConseiller() {

    this.totastr.info('Modification conseiller', 'Nom:'+this.conseiller.nom, {
      timeOut: 3000, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
    });
  }


  ngOnInit() {


    this.loadScript('../assets/js/jquery.min.js');
    this.loadScript('../assets/js/custom.min.js');
    this.loadScript('../assets/js/TooltipsBoubaker.js');




    this.conseilgroup=this.formbuilder.group({
      nomConseiller:'',
      prenomConseiller:'',
      emailConseiller:['', [Validators.pattern(this.emailPattern)]],
      dateDeNaissance:'',
      dateEmbauche:''



    });

    this.id=+this.route.snapshot.params['id'];
    console.log("-------------");
    console.log(this.id);
    this.conseillerservice.getConseillerParId(this.id).subscribe(data=>{
      this.conseiller=data;

      console.log(this.conseiller);
      },error2 => console.log(error2)
    );

    this.totastr.warning('Modification conseiller', ''+this.conseiller.nom+'', {
      timeOut: 3000, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
    });


  }





  // editer un conseiller

  conseillerModifiable:Conseiller;
  // Mettre à jour le conseiller passé en paramètre
  updateConseiller(){

    this.conseillerModifiable=new Conseiller();
    this.conseillerModifiable.id=this.conseiller.id;
    this.conseillerModifiable.dateEmbauche=this.conseiller.dateEmbauche;
    this.conseillerModifiable.nom=this.conseilgroup.get('nomConseiller').value;
    this.conseillerModifiable.prenom=this.conseilgroup.get('prenomConseiller').value;
    this.conseillerModifiable.email=this.conseilgroup.get('emailConseiller').value;
    this.conseillerModifiable.datedenaissance=this.conseilgroup.get('dateDeNaissance').value;
    this.conseillerModifiable.dateEmbauche=this.conseilgroup.get('dateEmbauche').value;
    this.conseillerservice.updateConseiller(this.conseillerModifiable).subscribe(data=>{
      this.totastr.info('conseiller modifié', 'Modification',{timeOut: 10000, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
      });
      console.log(this.conseilgroup.get('nomConseiller').value);
      //this.alert=true;
     // this.modalRef.hide();
      this.conseilgroup.reset();
      console.log(this.conseiller);
      this.router.navigate((['/home/conseillers']));


    },error2 => console.log(error2))
  }



}

