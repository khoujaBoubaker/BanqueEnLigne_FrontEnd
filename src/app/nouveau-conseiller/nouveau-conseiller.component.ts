import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Conseiller} from '../../Model/Conseiller';
import {AgenceService} from '../../services/AgenceService';
import {Agence} from '../../Model/Agence';
import {ConseillersAgence} from '../../services/ConseillersAgence';
import {ToastsManager} from 'ng2-toastr';
import {Validator} from '@angular/forms';
import {NgProgress} from 'ngx-progressbar';
import {AuthenticationServicee} from '../../services/AuthenticationServicee';

@Component({
  selector: 'app-nouveau-conseiller',
  templateUrl: './nouveau-conseiller.component.html',
  styleUrls: ['./nouveau-conseiller.component.css',],
  providers:[AgenceService,AuthenticationServicee]
})
export class NouveauConseillerComponent implements OnInit {
  loading:boolean=false;

  constructor(public formbuilder:FormBuilder,
              public agenceservice:AgenceService,
              public totastr:ToastsManager,
              public vcr:ViewContainerRef,
              public ngProgress:NgProgress,
              public authService:AuthenticationServicee) {
    this.totastr.setRootViewContainerRef(vcr);
  }


  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  conseilgroup:FormGroup;
  x:number=0;
  conseillerParameter:Conseiller=new Conseiller();
  agences:any;
  agenceSelected:Agence;

  // diplay data toast
  showInfo() {
    this.totastr.info('GESTION CONSEILLERS');
  }

  showInfowARNING() {
    this.totastr.warning('vos données sont sauvegardées');
  }
  showError() {
    this.totastr.error('Tous les champs sont obligatoires');
  }

  showSuccess() {
    let opti = { progressBar: true,  timeOut: 30000,toastClass: 'black'};
    this.totastr.success('Ajouter vos données en appuyanat sur le bouton confirmer','success',opti);
  }

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  ngOnInit() {

   // this.authService.saveToken(localStorage.setItem('token',jwt));


    this.ngProgress.start();

    this.getAgences();


    this.showInfo();
   this.showInfowARNING();
   this.showError();
   this.showSuccess();




    this.conseilgroup=this.formbuilder.group({
      nomConseiller:'',
      prenomConseiller:'',
      emailConseiller:['', [Validators.required ,Validators.pattern(this.emailPattern)]],
      dateDeNaissance:'',
      agence: Agence
    })
  }

  ajoutCons(){
    this.conseiller=new Conseiller();
    this.conseillerParameter=this.conseilgroup.value;
    //console.log(this.conseilgroup.value);
    //console.log(this.conseillerParameter);
    console.log(this.conseillerParameter);
    this.conseiller.nom=this.conseilgroup.get('nomConseiller').value;
    this.conseiller.prenom=this.conseilgroup.get('prenomConseiller').value;
    this.conseiller.datedenaissance=this.conseilgroup.get('dateDeNaissance').value;
    this.conseiller.email=this.conseilgroup.get('emailConseiller').value;
    console.log("----------------");
    console.log(this.conseiller);
    this.x=2;
  }

  annuler()
  {
    this.x=0;
    this.getAgences();
    this.conseilgroup.reset();
  }

  getAgences(){
    this.agenceservice.getagences("",0,5).subscribe(data=>{
      this.agences=data;
      this.ngProgress.done();
    },
      error1 => console.log(error1))

  }

  ids:number;
  selectChangeHandler(){

    //console.log(event);
    //alert(this.agenceSelected.idagence);
    //console.log(this.agenceSelected?.idagence);
    console.log(this.conseilgroup.get('agence').value.idagence);
    this.ids=this.conseilgroup.get('agence').value.idagence;

    this.totastr.info('agence selectionnée'+this.ids,'success');


  }
  conseiller:Conseiller;
  ajouterConseiller(){
    this.conseiller.nom=this.conseilgroup.get('nomConseiller').value;
   console.log(this.conseiller);
  }

id:number;
  confirmerAjoutConseiller(){
    this.loading=true;
this.id=this.conseilgroup.get('agence').value.idagence;
   this.agenceservice.saveConseiller(this.id,this.conseiller).subscribe(data=>{
     // toast a afficher lors d'jout d'un conseiller
     this.totastr.success('conseiller ajouté','succes');
     this.loading=false;
     console.log(data);
     this.x=3;
   },
     error2 => {console.log(error2);
     console.log('eeeee')})
  }

  customers= ['a','b','c'];

  select(){
    console.log(this.conseilgroup.get('agence').value.idagence);
  }

  formulaire(){
    this.x=0;
    this.conseilgroup.reset();
  }


}
