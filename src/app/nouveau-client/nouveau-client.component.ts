import {Component, OnInit, ViewContainerRef} from '@angular/core';
import { Router} from '@angular/router';
import {Client} from '../../Model/Client';
import {ClientService} from '../../services/ClientService';
import {FormBuilder, FormControl, FormGroup, Validator, Validators} from '@angular/forms';
import {ToastsManager} from 'ng2-toastr';
import {AgenceService} from '../../services/AgenceService';
import {Agence} from '../../Model/Agence';
import {NgProgress} from 'ngx-progressbar';


@Component({
  selector: 'app-nouveau-client',
  templateUrl: './nouveau-client.component.html',
  styleUrls: ['./nouveau-client.component.css'],
  providers:[ClientService,AgenceService]
})
export class NouveauClientComponent implements OnInit {

  client:Client=new Client();
  x:number=0;
  clientForm:FormGroup;
  formgender:FormGroup;
  title:string="next";
 // cl:Client=new Client();
  display='none';
  minimal:number=1;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  agences:any;
  page:number=0;
  size:number=20;
  motcle:string="";
  agenceSelected:Agence;
  loading:Boolean=false;

  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  prochain(){
    this.clientService.addClientDansAgence(this.cl.agence.idagence,this.cl).subscribe(data=>{
      this.loading=true;
      this.x=3;
    },
      err=>console.log(err))

  }

  select(){
    this.agenceSelected=this.clientForm.get('agenceClient').value;
    alert(this.agenceSelected.addresse);
  }

  Retour(){
    this.x=0;
    this.clientForm.reset();
  }



  constructor(public router:Router,public clientService:ClientService,public fc:FormBuilder,
              public totastr:ToastsManager,public vcr:ViewContainerRef,
              public agenceservice:AgenceService,
              public ngProgress:NgProgress

              ) {
    this.totastr.setRootViewContainerRef(vcr);
  }

  // modal stubs
  fermerModal(){
    this.display='none';
  }

  // annuler  sans sauvegarder
  annuler(){
    this.clientForm.reset();
    this.x=0;


    this.agenceservice.getagences(this.motcle,this.page,this.size).subscribe(data=>{
        this.agences=data;
      },
      error2 => console.log(error2));

    this.agenceSelected=new Agence();


  }





  precedent(){
    this.x=0;
   // this.clientForm.reset();
    this.agenceservice.getagences(this.motcle,this.page,this.size).subscribe(data=>{
        this.agences=data;
      },
      error2 => console.log(error2))



  }


  page1(){
    this.x=1;
  }

  ajoutNouuvelClientMessage(){
    this.totastr.info('Ajouter un client', '',{timeOut: 5000, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
    });
  }

  afficherMessage(){
    this.totastr.success('client ajouté', 'succes',{timeOut: 3000, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
    });
  }
  // appel au web service qui ajoute un client
  confirmerAjoutClient(){

    this.addClient();

    this.afficherMessage();
    this.x=0;
    this.clientForm.reset();

  }


  closeagrAPID(){
    $("#edit").slideToggle(0);
  }

  ngOnInit() {

    this.ngProgress.start();






    this.agenceservice.getagences(this.motcle,this.page,this.size).subscribe(data=>{
      this.agences=data;
      this.ngProgress.done();
    },
      error2 => console.log(error2));




      this.totastr.warning('Tous les champs sont à renseigner', 'Formulaires',{timeOut: 3000, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
      });

    this.ajoutNouuvelClientMessage();




    this.clientForm=this.fc.group({
      nomclient:'',
      prenomclient:'',
      addresseclient:'',
      email:['', [Validators.pattern(this.emailPattern)]],
      salaire:['',[Validators.required, Validators.min(this.minimal)]],
      datedenaissance:'',
      agenceClient:''


    })



  }

//  loading:Boolean=false;

  cl:Client=new Client();
  confirmer(){

    this.cl.nom=this.clientForm.value.nomclient;
    this.cl.prenom=this.clientForm.value.prenomclient;
    this.cl.addresse=this.clientForm.value.addresseclient;
    this.cl.email=this.clientForm.value.email;
    this.cl.salaire=this.clientForm.value.salaire;
    this.cl.datedenaissance=this.clientForm.value.datedenaissance;
    this.cl.agence=this.clientForm.value.agenceClient;
    console.log(this.cl);
    if(this.clientForm.status=="VALID"){
      this.x=1;
    }
    else{

      this.totastr.error('champs obligatoires non renseignés', 'Ajout client',{timeOut: 5000, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
      });


      this.x=0;
    }



  }

  // loguer le client passé en parametre en mode console
  //on peut  appeler le web service d'ajout de client
  // mais cette methode nous redirige vers un composant de
  // confirmation d'ajout de ce client ( recuperation du client passé au formulaire ...)
  next(){
    this.cl.nom=this.clientForm.value.nomclient;
    this.cl.prenom=this.clientForm.value.prenomclient;
    this.cl.addresse=this.clientForm.value.addresseclient;
    this.cl.email=this.clientForm.value.email;
    this.cl.salaire=this.clientForm.value.salaire;
    this.cl.datedenaissance=this.clientForm.value.datedenaissance;
    console.log(this.cl);
    //this.addClient();
    this.x=3;
    this.display="block";

  }

  nextpage(){
    this.x=3;

  }

  previousPage(){
    this.x=0;
  }



  // appel au web service pour ajouter un client
  addClient(){
   this.clientService.ajouterClient(this.cl).subscribe(data=>
   {console.log(data);

   },
     error2 => console.log(error2))
  }

  // ANNULER INSCRIPTION CLIENT
  annulerInscription(){
    this.client=new Client();
    this.x=0;
    this.clientForm.reset();
  }





















  // afficher premier composant d'ajout de client
  stub0(){
    this.x=0;
  }

  stub1(){
    if(this.clientForm.invalid==true){
      this.totastr.error('Tous les champs sont obligatoires','Formulaire ajout client');
    }
    else{
      if(this.clientForm.invalid==false){
        this.x=1;
      }
    }

  }
  stub2(){
    this.x=2;
  }



  // retour a la liste des clients
  retourner(){
    this.router.navigate(['/home/clients']);
  }



}
