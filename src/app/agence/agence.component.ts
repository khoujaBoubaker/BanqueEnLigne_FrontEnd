import {Component, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AgenceService} from '../../services/AgenceService';
import {Agence} from '../../Model/Agence';
import {BsModalRef,BsModalService} from 'ngx-bootstrap';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ToastsManager} from 'ng2-toastr';
import {AgenceConseillersService} from '../../services/AgenceConseillersService';
import {ConseillerClientService} from '../../services/ConseillerClientService';
import {ConseillerService} from '../../services/ConseillerService';
import {Conseiller} from '../../Model/Conseiller';
import {ClientService} from '../../services/ClientService';
import {Client} from '../../Model/Client';
import {Router} from '@angular/router';
import {NgProgress} from 'ngx-progressbar';

declare var test: any;

@Component({
  selector: 'app-agence',
  templateUrl: './agence.component.html',
  styleUrls: ['./agence.component.css'],
  providers: [AgenceService,ConseillerService,ClientService]
})
export class AgenceComponent implements OnInit {

  agences: any;
  conseillers:any;
  pageConseiller:number=0;
  sizeConseiller:number=5;
  pagesConseillers:Array<number>;

  motCle:string="";
  size:number=5;
  page:number=0;
  pages:Array<number>;

  clients:any;
  pagesClients:Array<number>;
  pageClient:number=0;
  sizeClient:number=5;


  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }


  // close modal ajout agence il faut declarer cette fonction
  // pour pouvoir reinitialiser le formgroup
  // sinon on aura un formulair non instancié
  closeModale(){
    this.modalRef.hide();
    this.agencegroup.reset();
  }


  modifierAgence(){
    this.router.navigate(['/home/editagence',this.agence.idagence]);
    this.modalRef.hide();
  }

  // ############# Chargement liste des clients par agence #####################################
  //#############################################################################################
  getClientsParAgence(id:number,pageClient:number,sizeClient:number){
    this.agenceservice.getClientParAgence(id,pageClient,sizeClient).subscribe(data=>{
   this.clients=data;
   console.log("--------------------------- DATA ----------");
   console.log(data);
   this.pagesClients=new Array(data.totalPages);
    },
      error2 => console.log(error2))
  }

  // ############  previous page clients
  previousClient(){
    if(this.pageClient>0){
      this.pageClient=this.pageClient-1;
      this.getClientsParAgence(this.agenceSelectedPourAfficherClients.idagence,this.pageClient,this.sizeClient);
    }

  }


  gotoPageClient(i){
    this.pageClient=i;
    this.getClientsParAgence(this.agenceSelectedPourAfficherClients.idagence,this.pageClient,this.sizeClient);
  }


  nextClient(){
    if(this.pageClient<this.pagesClients.length-1){
      this.pageClient=this.pageClient+1;
      this.getClientsParAgence(this.agenceSelectedPourAfficherClients.idagence,this.pageClient,this.sizeClient);
    }
  }


  // modal variables
  public modalRef:BsModalRef;

  public agencegroup:FormGroup;

  //ouvrir modal de suppression$
  agenceAsuuprimer:Agence;
  ouvrirModalSuppressionagence(t:TemplateRef<any>,agence:Agence)
  {
    this.agenceAsuuprimer=agence;
    console.log(this.agenceAsuuprimer);
    this.modalRef=this.modalService.show(t);
  }

  // MODAL INFOS CONSEILLERS
  conseillerSuppression=new Conseiller();
  supprimerCons(conseiller:Conseiller){
    this.conseillerSuppression=conseiller;
    console.log(this.conseillerSuppression);
    this.conseillerService.deleteConseiller(this.conseillerSuppression.id).subscribe(data=> {
      this.totastr.error('Conseiller supprimé', 'Suppression',{timeOut: 3000, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
      });
        this.conseillers.content.splice(this.conseillers.content.indexOf(this.conseillerSuppression),1);
        console.log(this.selectedAgence.idagence);
        if(this.conseillers.numberOfElements==1){this.pageConseiller=0;}
        this.getConseillersParAgence(this.selectedAgence.idagence, this.pageConseiller, this.sizeConseiller);

       // this.modalRef.hide();;

      },error2 => console.log(error2)
    )

  }


  modifierConsInfo(){
    this.totastr.warning('Modification','Modification',{timeOut: 500, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
    });

  }

  detailClientParAgence(client){
    this.totastr.success('nom :'+client.nom + ' ,prenom :' +client.prenom
      +' ,email: '+client.email+' ,date de naissance :'+client.datedenaissance+ ' ,date inscription:'+client.dateEmbauche , client.nom +' '+client.prenom,{timeOut: 3000, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
    });

  }

  detailConseiller(conseiller){
    console.log(conseiller);
    this.totastr.success('nom :'+conseiller.nom + ' ,prenom :' +conseiller.prenom
      +' ,email: '+conseiller.email+' ,date de naissance :'+conseiller.datedenaissance+ ' ,date embauche:'+conseiller.dateEmbauche , conseiller.nom +' '+conseiller.prenom,{timeOut: 3000, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
    });
  }

  previousConseiller(){
    if(this.pageConseiller>0){
      this.pageConseiller=this.pageConseiller-1;
      this.getConseillersParAgence(this.selectedAgence.idagence,this.pageConseiller,this.sizeConseiller);
    }
  }

  agenceSelectedPourAfficherClients:Agence;
  ouvrirModalClients(t:TemplateRef<any>,agence:Agence){
    this.agenceSelectedPourAfficherClients=agence;
    this.modalRef=this.modalService.show(t);
    this.getClientsParAgence(this.agenceSelectedPourAfficherClients.idagence,this.pageClient,this.sizeClient);
    this.totastr.info('Chargement en cours','Liste des clients',{timeOut: 500, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
    });

  }

  // supprimer Client 2eme tableau ..
  selectedClient:Client=new Client();
  supprimerClientfromLiseClientsParAgence(client){
    this.selectedClient=client;
    this.clientService.supprimerClient(this.selectedClient.idclient).subscribe(data=>{
      this.clients.content.splice(this.clients.content.indexOf(this.selectedClient),1);
      this.totastr.warning('client '+this.selectedClient.nom+' '+this.selectedClient.prenom +' supprimé avec succés' ,'Suppression client',{timeOut: 500, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
      });
      console.log("data avant suppression"+this.clients);
      if(this.clients.numberOfElements==1){this.pageClient=0;}
      this.getClientsParAgence(this.agenceSelectedPourAfficherClients.idagence,this.pageClient,this.sizeClient);

    })

  }

  closeModalConseillers(t:TemplateRef<any>){
    this.modalRef.hide();
    this.totastr.success('fermeture en cours','Liste des conseillers',{timeOut: 500, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
    });
  }

  NextConseiller(){
    if(this.pageConseiller<this.pagesConseillers.length-1){
      this.pageConseiller=this.pageConseiller+1;
      this.getConseillersParAgence(this.selectedAgence.idagence,this.pageConseiller,this.sizeConseiller);
    }
  }


  gotoPageConseillers(i){
    this.pageConseiller=i;
    this.getConseillersParAgence(this.selectedAgence.idagence,this.pageConseiller,this.sizeConseiller);
  }

  // ################## Méthode change() #########################
  cherche(){
    this.doSearch();
  }

  // ################ Méthode pour ouvrir modal de modification ###########
  ouvrirModalModification(temp:TemplateRef<any>,agence){
    this.agence=agence;
   this.modalRef=this.modalService.show(temp);
  }


  agenceAffich:Agence;
  detail(t:TemplateRef<any>,agence:Agence){
    console.log("initiation....");
    this.agenceAffich=agence;
    this.modalRef=this.modalService.show(t);
  }

  // tri d'agences par commune
  tri:string="";
  agencesTriCommune(){
    this.tri="commune";
    this.doSearchAgecesTrieesParCommune();
  }

  // ###### charger liste conseillers ##################
  selectedAgence:Agence;
  ouvrirModalConseillers(temp:TemplateRef<any>,agence:Agence){

    this.totastr.info('Chargement', 'liste des conseillers',{timeOut: 1000, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
    });

    this.selectedAgence=agence;
    this.getConseillersParAgence(this.selectedAgence.idagence,this.pageConseiller,this.sizeConseiller);
    console.log(agence);

    console.log(this.conseillers);

    this.modalRef = this.modalService.show(temp);




  }
  number:number;
  getConseillersParAgence(id:number,page:number,size:number){
    this.agenceservice.getConseillerAgence(id,page,size).subscribe(data=>{
      this.conseillers=data;
      this.pagesConseillers = new Array(data.totalPages);
      this.number=this.conseillers.totalElements;
     // console.log(this.number);

    },error2 => console.log(error2))
  }

  //Search agences triees parcommune
  doSearchAgecesTrieesParCommune(){
    this.agenceservice.getagencesTrieesParCommune(this.motCle,this.page,this.size).subscribe(
      data=>{
        this.agences=data;
        this.pages=new Array(data.totalPages);
      },
      error2 => console.log(error2));
  }

  // supprimerAgence via modal
previous(){
    if(this.page>0) {
      this.page = this.page - 1;
      this.doSearch();
    }else {
      console.log("not permitted");
    }
}

next(){
    if(this.page<this.pages.length-1) {
      this.page = this.page + 1;
      this.doSearch();
    }else {
      console.log("not permitted");
    }
}

supprimerAgence(){
    this.agenceservice.supprimerAgence(this.agenceAsuuprimer.idagence).subscribe(data=>{
      this.agences.content.splice(this.agences.content.indexOf(this.agenceAsuuprimer),1);
      if(this.agences.numberOfElements==1){
        this.page=0;
        this.doSearch();
      }
    });
  this.doSearch();
    this.modalRef.hide();

}



  modifierConseiller(temp:TemplateRef<any>,conseiller){
    console.log(conseiller);
    this.modalRef=this.modalService.show(temp);
  }





  constructor(public agenceservice: AgenceService,
              private modalService:BsModalService,
              private formbuilder:FormBuilder,
              public totastr:ToastsManager,
              public vcr:ViewContainerRef,
              public conseillerService:ConseillerService,
              public clientService:ClientService,
              public router:Router,
              public ngProgress:NgProgress) {
    this.totastr.setRootViewContainerRef(vcr);

  }

  EditAgence(id : number){
    this.router.navigate(['/home/editagence',id]);
  }

  infogences(){
    this.totastr.info('liste agences', 'Banque en ligne',{timeOut: 3000, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
    });
  }

  f(){
    new test();
  }

  nvelleAgence(t:TemplateRef<any>){
    this.modalRef=this.modalService.show(t);
  }

  ajoutAgence(){
    console.log(this.agencegroup.value)

}

  ngOnInit() {

    this.ngProgress.start();



    this.loadScript('../assets/js/jquery.min.js');
    this.loadScript('../assets/js/custom.min.js');
    this.loadScript('../assets/js/TooltipsBoubaker.js');

    this.infogences();

    this.chercherAgence();
   // console.log(this.agences.content);

    this.agencegroup=this.formbuilder.group({
      addresse:'',
      commune:'',
      telephone:''
    })

  }


     doSearch(){
      this.agenceservice.getagences(this.motCle,this.page,this.size).subscribe(
        data=>{
          this.ngProgress.done();
          console.log(this.motCle);
          this.agences=data;
          this.pages=new Array(data.totalPages);
        },
        error2 => console.log(error2));
    }


    chercherAgence(){
    this.tri="";
    this.doSearch();
    }


    supprimer(agence)
    {
      console.log(agence);
      this.agenceservice.supprimerAgence(agence.idagence).subscribe(data=>
      {
        alert("Voulez vous suuprimer");
        this.agences.content.splice(
          this.agences.content.indexOf(agence),1)
      })



    }

    afficher(i){
    alert(i);
    }

    gotoPage(i){
    console.log(this.page);
    this.page=i;
    this.doSearch();

    }

    closeagrAPID1(){
      $("#agences").slideToggle(0);
    }

    // fermer division agences
  closeag(){
    $("#agences1").slideToggle();
  }

// ######################################################## FERMER MODAL D4AJOUT D'AGENCE###############################
  closeModal(){
    this.modalRef.hide();
    this.agencegroup.reset();
  }


  //  ####################################################### AJOUT AGENCE SERVICE #####################################
  agence:Agence;
  ajout(){
   // console.log(this.agencegroup.value);
    this.agence=new Agence();
    this.agence.addresse=this.agencegroup.get('addresse').value;
    this.agence.commune=this.agencegroup.get('commune').value;
    this.agence.telephone=this.agencegroup.get('telephone').value;
    //console.log(this.agence);
    console.log(this.agence);
    this.agenceservice.addagence(this.agence).subscribe(data=>{
      this.doSearch();
    },error2 => console.log(error2));
    this.modalRef.hide();
    this.agencegroup.reset();



  }




}
