import {Component, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientService} from '../../services/ClientService';
import {Client} from '../../Model/Client';
import {CompteCourantCC} from '../../services/CompteCourantsCC';
import {ToastsManager} from 'ng2-toastr';
import {CompteEpargnesCE} from '../../services/CompteEpargnesCE';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Compte} from '../../Model/Compte';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {compteEpargne} from '../../Model/compteEpargne';
import {OperationService} from '../../services/OperationService';
import {Operation} from '../../Model/Operation';
import {AgenceService} from '../../services/AgenceService';
import {Agence} from '../../Model/Agence';
import * as jsPDF from "jspdf";
import {VirementService} from '../../services/VirementService';

import {NgProgress} from 'ngx-progressbar';


declare var $ :any;


@Component({
  selector: 'app-list-comptes',
  templateUrl: './list-comptes.component.html',
  styleUrls: ['./list-comptes.component.css'],
  providers:[ClientService,CompteCourantCC,CompteEpargnesCE,OperationService,AgenceService,VirementService]
})
export class ListComptesComponent implements OnInit {


  loadingRetrait:boolean=false;
  loadingVersement:boolean=false;

  butDisabled:boolean=true;

  // Agence pour virement de compte à compte :
  matchedAgenceV:Agence;


  public compteAcompte:FormGroup;
  public formCompte: FormGroup;
  public nvvirement:FormGroup;
  public nvversement:FormGroup;
  montantRetraitMinimal:number=10;
  montantVersementMIN:number=10;
  x: number;
  disp='none';
  idcl: number;


  mCle:string="";
  pageCl:number=0;
  sizeCl:number=20;
  clientsVirements:any;

  clientMatched:Client;

  listComptes:any;

  compteMatched:Compte;





  onChange1(){
    console.log(this.compteMatched);
    alert(this.compteMatched);
  }


  onchangeClient(){
    console.log(this.clientMatched);
    this.recupererListeComptes();
    this.totastr.warning("Vous devez choisir un compte du client(e):"+this.clientMatched.nom+" "+this.clientMatched.prenom,"Information");

  }

  recupererListeComptes(){
    console.log(this.clientMatched);
    this.listComptes=this.clientMatched.comptes;
    console.log(this.listComptes);
  }

  retourComptes(){
    this.y=0;
    this.chercher();

  }

  findCpt(){
    alert(this.compteMatched.idcpt);
    console.log(this.compteMatched);
  }

  matchedAgenceCpt:Agence;




  disableInput(){
    if(this.compteAcompte.get('clientBeneficiaire').value){
      return false;
    }
    else
    {
      return true;
    }

  }

  nouvelle(template:TemplateRef<any>){

    this.modalRef=this.modalService.show(template);
    this.getClientsPourVirement();


  }






  // ################################## Fermer modal pour
  // ################################## operations
  fermerModal(){

    this.clientMatched=null;

    this.modalRef.hide();
    this.nvversement.reset();
    this.nvvirement.reset();
    this.compteAcompte.reset();
    console.log("matched client :"+this.clientMatched);

  }

  closeOperations(){
    this.nvvirement.reset();
    this.nvversement.reset();
    this.compteAcompte.reset();
    this.modalRef.hide();

  }



  // RETOUR VERS LA PAGE DES COMPTES
  retournerVersComptes(){
    this.y=0;
  }





  getClientsPourVirement(){
    this.virementService.getPageClients(this.id,this.mCle,this.pageCl,this.sizeCl).subscribe(data=>{
      this.clientsVirements=data;
    },
      error1 => console.log(error1))

  }

  ChangeTEST(){
    console.log(this.clientMatched);
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






virer(){
this.oper="virement";
console.log("test clients");
console.log("----- liste des client dont onpeut virer de l'argent");
this.getClientsPourVirement();
console.log("----------------------");
console.log(this.clientMatched);
this.clientMatched=new Client();

}


  constructor(public route: ActivatedRoute,
              public virementService:VirementService,
              public router: Router,
              public vcr: ViewContainerRef,
              private modalService: BsModalService,
              public clientService: ClientService,
              public compteCourantService: CompteCourantCC,
              public totastr: ToastsManager,
              public compteEpargneservice: CompteEpargnesCE,
              public agenceService:AgenceService,
              public fgcompte: FormBuilder,
              public compteEpargneService: CompteEpargnesCE,
              public fgcompteEpargne: FormBuilder,
              public operationservice: OperationService,
              public ts:FormBuilder,
              public fb:FormBuilder,
              public cc:FormBuilder,
              public ngProgress:NgProgress) {
    this.totastr.setRootViewContainerRef(vcr);
  }

  public telechargerFile(){

    let pdf=new jsPDF('p','pt','letter');

    let  source=$('#customers')[0];

    let specialElementHandlers={
      '#mypassme':function (element,renderer) {
        return true;

      }

    };
    let margins={
      top:80,
      bottom:60,
      left:40,
      width:522
    };

    pdf.fromHTML(
      source,
      margins.left,
      margins.top,{
        'width':margins.width,
        'elementHandlers':specialElementHandlers

      },

      function(dispose){
        pdf.save(this.clie);
      },margins);


  }



  // modals
  public modalRef: BsModalRef;
  //
  id: number;
  y: number = 1;
  soldeTotal: number = 0;

  // variables pour comptes courants
  pageCC: number = 0;
  sizeCC: number = 5;
  clientTrialCC: Client;
  comptesCourantsPart: any;
  pagesComptesCourants: Array<number>;

  // variables pour comptes epargne
  pageCE: number = 0;
  sizeCE: number = 5;
  comptesEpargnesPart: any;
  pagesComptesEpargnes: Array<number>;

  // NOUVEAU COMPTE EPARGNE
  compteEp: compteEpargne = new compteEpargne();

  nouveauCompteEpargne() {

    this.compteEp.solde = this.formCompteEpargne.get('soldeepargneInitial').value;
    this.compteEp.taux = this.formCompteEpargne.get('taux').value;

    this.compteEpargneService.ajoutCompteEpargne(this.id, this.compteEp).subscribe(data => {
      this.getComptesEpargnesCE();
      this.modalRef.hide();
      this.y = 0;
    })
    //console.log(this.compteEp);
    // console.log(this.clientTrialCC);

  }

  // PAGINATION LISTE DES COMPTES EPARGNES

  // go to page i
  goToPageEpargne(i) {
    this.pageCE = i;
    this.getComptesEpargnesCE();
  }

  matched:Agence;
  onchange(){
    console.log(this.matched);

  }

  getOp(){
    this.getOperations(this.cpt);
    this.dateOperation=null;

  }

  // effectuer retrait
  exces:Boolean=false;

  effacer(){
    if(this.exces=true){
      this.exces=false;
    }
  }



  effectuerVirementDecompteAcompte(){

    console.log("cpt id compte emetteur :"+this.cpt.idcpt);
    console.log("agence id :"+this.matchedAgenceV.idagence);
    console.log("montant :"+this.compteAcompte.get('montant').value);
    console.log("id cpt destinataire :"+this.compteAcompte.get('compteDestinataire').value.idcpt);
    console.log("libelle :"+this.compteAcompte.get('libelle').value);

    this.operationservice.effectuerVirementDeCompteACompte(this.cpt.idcpt,this.matchedAgenceV.idagence,this.compteAcompte.get('montant').value,this.compteAcompte.get('compteDestinataire').value.idcpt,this.compteAcompte.get('libelle').value).subscribe(data=>{
        this.totastr.success('versement effectué avec succés','Succès');
        this.fermerModal();
        this.findAfterSearching();
        this.getOperations(this.cpt);


      },
      error1 => {
        this.totastr.error('problème survenu','Erreur');

      })

  }

  effectuerRetrait1(){
    this.loadingRetrait=true;
    this.operationservice.retirerAgencewithRequestPama(this.cpt.idcpt,this.matched.idagence,this.nvvirement.get('montant').value,this.nvvirement.get('libelle').value).subscribe(
      data=>{
        this.loadingRetrait=false;
        this.totastr.success('succès' , 'Retrait', {
          timeOut: 3000, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
        });

        this.chercherSansTri();
        this.getOperations(this.cpt);
        this.fermerModal();
      },error2 =>{

        this.totastr.error('solde insuffisant' , 'Découvert dépassé', {
          timeOut: 3000, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
        });
        this.exces=true;



      }
    )

  }

  effectuerVersement(){
    this.loadingVersement=true;
    this.operationservice.effectuerVersementDansAgence(this.cpt.idcpt,this.matchedAgence.idagence,this.nvversement.get('montantVersement').value,this.nvversement.get('libelle').value).subscribe(data=>
    {
      this.loadingVersement=false;
      this.totastr.success('succés','Versement',{
        timeOut:3000,showProgressBar:true,pauseOnHover:false,clickToClose:true
      });
     // this.chercher();
      this.chercherSansTri();
      this.getOperations(this.cpt);

    },error1 => alert("pas de versement"))
  }

  matchedAgence:Agence;



  /// detail operation

  w(operation){

    this.totastr.success(''+operation.agence.addresse , ''+operation.op, {
      timeOut: 3000, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
    });

  }

  // goto next page if exist
  nextEpargne() {
    if (this.pageCE < this.pagesComptesEpargnes.length - 1) {
      this.pageCE = this.pageCE + 1;
      this.getComptesEpargnesCE();

    }
  }

  // go to previous page if exist
  previousEpargne() {
    if (this.pageCE > 0) {
      this.pageCE = this.pageCE - 1;
      this.getComptesEpargnesCE();
    }

  }










  agences: any;
  motCle:string="";
  page:number=0;
  size:number=20;

  // chercher agences ou effectuer operation
  chercherAgences() {
    this.agenceService.getagences(this.motCle, this.page, this.size).subscribe(data => {
      this.agences = data;
    }, error2 => console.log(error2))
  }

  // solde epargne total
  soldeEpargne: number;

  getSoldeEpargne() {
    this.compteCourantService.getSoldeEpargne(this.client).subscribe(data => {
      this.soldeEpargne = data;
    })
  }

  // afficher solde
  soldeEp() {
    this.compteCourantService.getSoldeEpargne(this.client).subscribe(data => {
        this.soldeEpargne = data;
        this.totastr.success('' + this.soldeEpargne + 'dinars', 'Total comptes épargnes', {
          timeOut: 3000, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
        });
      },
      error2 => console.log(error2))
    // this.modalRef=this.modalService.show(temp);


  }

  // fermeture modal confirmation de suppression de compte epargne

  // ouverture modal de suppression et recuperation de l 'id du ce
  compteToBeDeleted: Compte;

  supprimerCompteEpargne(compte, temp: TemplateRef<any>) {
    this.compteToBeDeleted = compte;
    alert(this.compteToBeDeleted.idcpt);

    this.modalRef = this.modalService.show(temp);

  }


  //close modal suppressiion
  closeModalsuppression() {
    this.modalRef.hide();
  }

  // fermer modal nv compte epargne
  fermerModalnvcompteEpargne() {
    this.modalRef.hide();
  }

  nouveaucptEpargne(temp1: TemplateRef<any>) {
    this.modalRef = this.modalService.show(temp1);

  }

  // supprimer compte epargne
  supprimerCompteEpargneAC() {


    this.compteEpargneService.deleteCompteEpargne(this.compteToBeDeleted.idcpt).subscribe(data => {
      this.comptesEpargnesPart.content.splice(this.comptesEpargnesPart.content.indexOf(this.compteToBeDeleted), 1);
      this.pageCE = 0;
      this.totastr.success('compte épargne supprimé !', ' Compte épargne', {
        timeOut: 3000, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
      });
      this.getComptesEpargnesCE();
      this.modalRef.hide();


    })

  }





  // total solde epargne

  // injection du service de récupération des comptes epargnes par client

  getComptesEpargnesCE() {
    this.compteEpargneService.getComptesEpargnes(this.id, this.pageCE, this.sizeCE).subscribe(data => {
        this.comptesEpargnesPart = data;
        this.pagesComptesEpargnes = new Array(data.totalPages);
      },
      error2 => console.log(error2))
  }

  // comptes epargne affichage et pagination ..

  // aller sur la division de
  openModalVersement1(){
    this.oper='versement';

  }


  montantMin: number = 10;
  decouvertMin = 0;


  // lien vers la division d'affichage de comptes epargnes.
  taux: number = 0;


  client: Client = new Client();
  formCompteEpargne: FormGroup;
  montantMINEpargne: number = 0;



// facultative je n'utilise plus mais je  la laisse au cas ou ..
  afficherDivComptesEpargne() {
    this.y = 0;
    this.getComptesEpargnesCE();
  }

sk(){
    $("#boub").addClass('open');

}

  f(){
    var drop =
      "<div class='btn-group select'>" +
      "<i class='dropdown-arrow'></i>" +
      "<button class='btn dropdown-toggle clearfix' data-toggle='dropdown'>" +
      "<span class='filter-option pull-left'></span>&nbsp;" +
      "</button>" +
      "<ul class='dropdown-menu' role='menu'>" +
      "</ul>" +
      "</div>";
    return $(drop);

  }





  // Ajouter fonction qui indique qu'on est sur la pages des comptes
  // avec le nom du client selectionné .
  HomeComptes(){
  this.totastr.success("Liste des comptes","Client :"+this.client.nom+" "+this.client.prenom);

  }



  ngOnInit() {

  // ng progress
    this.ngProgress.start();

    this.chercherAgences();






    //this.loadScript('../assets/js/jquery1.min.js');
    this.loadScript("../assets/js/formoid-solid-blue.js");

    // ################################# ############################################
    //################################## Virement de compte A compte ################
    //################################## ############################################

    this.compteAcompte=this.cc.group({
      montant: [0, [Validators.required, Validators.min(this.montantRetraitMinimal)]],
      libelle:'',
      agenceRetrait:'',
      compteDestinataire:'',
      clientBeneficiaire:[this.clientMatched,Validators.required]
    });

    this.nvvirement = this.fb.group({

      montant: ['', [Validators.required, Validators.min(this.montantRetraitMinimal)]],
      libelle: '',
      agenceRetrait:''

    });

    this.nvversement = this.ts.group({
      montantVersement: ['', [Validators.required, Validators.min(this.montantVersementMIN)]],
      libelle:'',
      agenceVersement: ''
    });

    this.formCompteEpargne = this.fgcompteEpargne.group({
      soldeepargneInitial: [0, [Validators.required, Validators.min(this.montantMINEpargne)]],
      taux: [0, [Validators.required, Validators.min(this.taux)]]

    });


    this.formCompte = this.fgcompte.group({
      soldeinitial: [0, [Validators.required, Validators.min(this.montantMin)]],
      decouvertinitial: [0, [Validators.required, Validators.min(this.decouvertMin)]]
    });


    this.y = 0;

    this.id = +this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(data => {
      this.client = data;
      this.HomeComptes();

    }, error2 => console.log(error2));


    // charger scripts utiles pour formulaire







    this.chercher();
    this.getComptesEpargnesCE();
    console.log("comptes epargnes-");
    console.log(this.comptesEpargnesPart);


  }



  epargne() {
    this.y = 1;
  }






  soldet() {

    this.compteCourantService.getSoldeTotal(this.id).subscribe(data => {
      this.soldeTotal = data;
      this.totastr.success('' + this.soldeTotal + 'dinars', 'Total comptes courants', {
        timeOut: 3000, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
      });
    }, error2 => console.log(error2))
    // this.modalRef=this.modalService.show(temp);


  }

  // #################################### Tri par decouvert ..........................
  //#####################################

  chercherComptesCourantTriesParDecouvertDesc(){
    this.compteCourantService.getComptesCourantsTriesParDecouvert(this.id,this.pageCC,this.sizeCC).subscribe(data=>{
      this.comptesCourantsPart=data;
    },
      error1 => console.log(error1))

  }

  tricpt:number=0;

  // fonction qui trie par decouvert par ordre decroissant
  triParDecouvert(){
    this.tricpt=1;
    this.chercherComptesCourantTriesParDecouvertDesc();
    console.log(this.tricpt);
  }

  // fonction qui appel le service injecté ainsi que sa méthode
  // de tri par solde
chercherAvecTriDecroissantSolde(){
    this.compteCourantService.getComptesCourantsTriesParSolde(this.id,this.pageCC,this.sizeCC).subscribe(data=>{
      this.comptesCourantsPart=data;
    },
      error1 => console.log(error1))
}

// Appel de la fonction de tri par solde décroissant
  // et appliquer le code css adéquat
  triParSolde(){
    this.tricpt=2;
    this.chercherAvecTriDecroissantSolde();
  }




  chercher() {
    this.compteCourantService.getComptesCourants(this.id, this.pageCC, this.sizeCC).subscribe(data => {
     // this.loading=false;
        this.comptesCourantsPart = data;
        this.pagesComptesCourants = new Array(data.totalPages);
        this.ngProgress.done();
      },
      error2 => console.log(error2))
  }

  chercherSansTri(){
    this.compteCourantService.getComptesCourants(this.id,this.pageCC,this.sizeCC).subscribe(data=>{
      this.comptesCourantsPart=data;
    },
      error1 => console.log(error1))

  }


  deleteTri(){
   this.tricpt=0;
   this.chercher();
   this.totastr.info('aucun tri selectionné','Données');
  }


  // pagination comptes courants
  // METHODE PREVIOUS
  previousCompteCourant() {

    if (this.pageCC > 0) {
      if(this.tricpt==0) {
        this.pageCC = this.pageCC - 1;
        this.chercher();
      }else{
        if(this.tricpt==1){
          this.pageCC=this.pageCC-1;
          this.chercherComptesCourantTriesParDecouvertDesc();
        }
        else{
          if(this.tricpt==2){
            this.pageCC=this.pageCC-1;
            this.chercherAvecTriDecroissantSolde();
          }
        }
      }
    }
  }

  // NEXT PAGE DE CONTACT SUIVANT LE TRI selectionné
  nextCompteCourant() {

    if (this.pageCC < this.pagesComptesCourants.length - 1) {
      if(this.tricpt==0) {
        this.pageCC = this.pageCC + 1;
        this.chercher();
      }
      else{
        if(this.tricpt==1){
          this.pageCC=this.pageCC+1;
          this.chercherComptesCourantTriesParDecouvertDesc();
        }
        else{
          if(this.tricpt==2){
            this.pageCC=this.pageCC+1;
            this.chercherAvecTriDecroissantSolde();
          }
        }
      }
    }
  }


  // GO TO PAGE SUIVANT LE CRIETRE DE RECHERCHE SELECTIONNE

  gotopageCourant(i) {
    if(this.tricpt==0) {
      this.pageCC = i;
      this.chercher();
    }
    else{
      if(this.tricpt==1){
        this.pageCC=i;
        this.chercherComptesCourantTriesParDecouvertDesc();
      }
      else{
        if(this.tricpt==2){
          this.pageCC=i;
          this.chercherAvecTriDecroissantSolde();
        }
      }
    }

  }

  // reffraichir données
  donnees() {
    this.tricpt=0;
    this.chercher();
  }

  // supprimer compte courant
  compteAsupprimer: Compte;

  ouvrModalSuppression(temp: TemplateRef<any>, compte) {
    this.compteAsupprimer = compte;
   // alert(this.compteAsupprimer.idcpt);
    this.modalRef = this.modalService.show(temp);

  }


  fermeModalSuppression() {
    this.modalRef.hide();
  }

  // POUVOIR SUPPRIMER LE COMPTE PASSE dEN PARA%METRE
  supprimerCompte() {
    this.compteCourantService.supprimerCompteCourant(this.compteAsupprimer.idcpt).subscribe(data => {
      this.comptesCourantsPart.content.splice(this.comptesCourantsPart.content.indexOf(this.comptesCourantsPart), 1);
      this.pageCC = 0;
      this.chercher();
      this.modalRef.hide();
    }, error2 => console.log(error2))
  }


  // afficher detail compte courant
  cptDetail: Compte;

  afficherDetail(compte, temp: TemplateRef<any>) {
    this.cptDetail = compte;

    this.modalRef = this.modalService.show(temp);
  }


  retourner() {
    this.router.navigate(['/home/clients']);
  }

  //close modal details
  closeModalDetail() {
    this.modalRef.hide();
    this.cptDetail = new Compte();
  }

  // ouvrir modal pour modifier compte courant

  compteAmodifier: Compte = new Compte();

  ouvrirModalModifCompteCourant(compte, temp: TemplateRef<any>) {
    this.compteAmodifier = compte;
    //alert(this.compteAmodifier.idcpt);
    this.modalRef = this.modalService.show(temp);

  }

  // fermer modal pour modifier compte courant
  closeModalMCC() {
    this.modalRef.hide();
    this.compteAmodifier = new Compte();
  }

  // Mettre a jour compte courant
  updatatbeCompteCourant: Compte;

  updateCompteCourant() {
    this.updatatbeCompteCourant = new Compte();
    this.updatatbeCompteCourant.idcpt = this.compteAmodifier.idcpt;
    this.updatatbeCompteCourant.solde = this.formCompte.get('soldeinitial').value;
    this.updatatbeCompteCourant.decouvert = this.formCompte.get('decouvertinitial').value;
    this.updatatbeCompteCourant.datedecreation = this.compteAmodifier.datedecreation;
    this.updatatbeCompteCourant.numeroCompte=this.compteAmodifier.numeroCompte;
    //console.log(this.updatatbeCompteCourant);
    this.compteCourantService.mettreAjourCompteCourant(this.updatatbeCompteCourant, this.client).subscribe(data => {
      this.modalRef.hide();
      this.chercher();
      this.totastr.success('Mise à jour effectuée avec succés', 'Compte courant', {
        timeOut: 3000, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
      });
      this.modalRef.hide();
    }, error => console.log(error))

  }

  // ouverture d'un modal pour nouveau compte epargne ou courant

  autreCompte(temp1: TemplateRef<any>, temp2: TemplateRef<any>) {
    if (this.y = 1) {

      this.modalRef = this.modalService.show(temp1);

    } else {
      if (this.y = 0)


        this.modalRef = this.modalService.show(temp2);
    }
  }


  compteAcreer: Compte = new Compte();

  nv2() {

    // nouvel compte courant avec les paramètres passés.
    this.compteAcreer.solde = this.formCompte.get('soldeinitial').value;
    this.compteAcreer.decouvert = this.formCompte.get('decouvertinitial').value;
    this.compteAcreer.datedecreation = new Date();
    console.log("detail compte");
    console.log(this.compteAcreer);
    this.compteCourantService.ajouterCompteCourant(this.id, this.compteAcreer).subscribe(data => {
      this.chercher();
      this.modalRef.hide();
      this.formCompte.reset();

    }, error2 => console.log(error2))


  }


  // fermer modal  compte courant
  fermerModalNvCpte() {
    this.modalRef.hide();
    // réinstancier les parametres de validation du formulaire.
    this.formCompte.reset();
  }


  // GET OPERATIONS PER CLIENT

  retourListeComptes() {
    this.y = 1;
  }

  pagesOperation: Array<number>;
  pageoperation: number = 0;
  sizeoperation: number = 5;
  operations: any;
  cpt: Compte;

  findAfterSearching(){
    this.operationservice.getOperationsComptesCourants(this.cpt.idcpt,this.pageoperation,this.sizeoperation).subscribe(data=>
    {if(data.totalElements==0){
      this.totastr.success('aucune operation', ' Détail rendez-vous', {
        timeOut: 1000, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
      });
    }
    else{
      this.operations=data;
    }

    },error2 => console.log(error2))

  }

  getOpAfterReturningView(){
    this.getOperations(this.cpt);
  }

  getOperations(compte: Compte) {
    //console.log(this.loginService.utilistaeur);
    // console.log(this.utilsateur);


    this.cpt = compte;
   // alert(this.cpt.idcpt);

    // this.getVersements();
    // this.getRetraits();

    this.operationservice.getOperationsComptesCourants(this.cpt.idcpt, this.pageoperation, this.sizeoperation).subscribe(data => {
  this.operations = data;
  this.pagesOperation = new Array(data.totalPages);
  this.y = 2;


},
error2 => {
  console.log(error2);
})
this.getRetraits();
    this.getVersements();
}


getOperationsSimple(){

  this.operationservice.getOperationsComptesCourants(this.cpt.idcpt, this.pageoperation, this.sizeoperation).subscribe(data => {
      this.operations = data;
      this.pagesOperation = new Array(data.totalPages);



    },
    error2 => {
      console.log(error2);
    })

}

  // PAGINATION OPERATIONS

  // go to operation

  gotoPageOperation(i) {
    this.pageoperation = i;
    this.getOperations(this.cpt);
  }

  previousOp() {
    if (this.pageoperation > 0) {
      this.pageoperation = this.pageoperation - 1;
      this.getOperations(this.cpt);
    }
  }

  nextOp() {
    if (this.pageoperation < this.pagesOperation.length - 1) {
      this.pageoperation = this.pageoperation + 1;
      console.log(this.pageoperation);
      this.getOperations(this.cpt);
    }


  }


  // ouvrir modal detail compte épargne
  compteEpa:Compte=new Compte();
  detailCompteEpargne(compte:Compte,temp:TemplateRef<any>){
    this.compteEpa=compte;
    this.modalRef=this.modalService.show(temp);

  }




  cptamodifier:Compte;
  ouvrirModalModifCompteEpargne(compte:Compte,t:TemplateRef<any>){
    this.cptamodifier=compte;
    this.modalRef=this.modalService.show(t);

  }

  // fermeture modal modification
  closeModalModificationCE(){
    this.modalRef.hide();
  }

  // update compte epargne
  cptEp: compteEpargne = new compteEpargne();

  updateCompteEpargne() {
    this.cptEp.idcpt = this.cptamodifier.idcpt;
    this.cptEp.solde = this.formCompteEpargne.get('soldeepargneInitial').value;
    this.cptEp.taux = this.formCompteEpargne.get('taux').value;
    this.cptEp.datedecreation = this.cptamodifier.datedecreation;
    console.log(this.cptEp);
    this.compteEpargneService.updateCompteEpargne(this.client.idclient, this.cptEp).subscribe(data => {
        console.log("data updated");
        //this.compteEpargneService.getComptesEpargnes(this.clientTrialCC.idclient,this.pageCE,this.sizeCE);
        this.afficherDivComptesEpargne();
        this.totastr.success('Compte épargne modifié', 'Compte épargne', {
          timeOut: 3000, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
        });
        this.modalRef.hide();
      },
      error2 => console.log(error2))
  }


  // OPEATIONS

  opt:Operation;
  affichageLibelleMvt(operation:Operation){
    this.opt=operation;
    this.totastr.info(''+this.opt.montant+' dinars', ''+this.opt.op,{timeOut: 3000, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
    });
  }

  // FIND OPERATION PAR DATE
  dateOperation:Date;
  FindOperationByDate(){

    console.log(this.dateOperation);
    if(this.dateOperation!=null) {
      this.operationservice.getOperationsParDate(this.cpt.idcpt, this.dateOperation, this.pageoperation, this.sizeoperation).subscribe(data => {
          this.operations = data;
          if (this.operations.totalElements == 0) {
            this.totastr.info('Aucune opération trouvée', 'Opérations', {
              timeOut: 3000, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
            });
            // this.dispFind=true;
          }
        },
        error2 => console.log(error2))
    }
    else {
      this.getOperationsSimple();
    }

  }


  // suppression opérations
  operationSupp: Operation;

  supprimerOperationModal(temp: TemplateRef<any>, operation) {
    //console.log(operation);
    this.operationSupp = operation;
    console.log(this.operationSupp);
    this.modalRef = this.modalService.show(temp);
  }

  suppressionOp() {
    this.operationservice.deleteOperation(this.operationSupp.numero).subscribe(data => {
      this.operations.content.splice(this.operations.content.indexOf(this.operationSupp), 1);
      this.modalRef.hide();
    })

  }

  j:number=0;
  // ouverture modal pour nouvelle opération


//######################################################################### operations sur les comptes retrait versement et virement
  // DE COMPTE A COMPTE

  oper:string="";
  retrait(){
    this.oper="retrait";


  }

  virementModal(){

  }

  versementModal(){

  }

  quitterModalOperation(){
    this.modalRef.hide();
    this.nvvirement.reset();
  }

  effectuerRetrait(){
    alert("bouton marche");
  }


  // retraits afficher modal
  afficherModalRetraits(t:TemplateRef<any>){
    this.modalRef=this.modalService.show(t);
    this.getRetraits();
  }

  fermerModalRetraits(){
    this.modalRef.hide();
  }

  // PAGINATIONS LINK ALL PARAMETERS FOR RETRAITS

  getRetraits(){
    this.operationservice.getRetraits(this.cpt.idcpt,this.pageRetrait,this.sizeRetrait).subscribe(data=>{
        this.retraits=data;
        console.log(this.retraits);
       // this.loading=false;
        this.pagesRetraits=new Array(data.totalPages);
      },
      error2 => {console.log(error2)})
  }

 // variables
  pagesRetraits:Array<number>;
  pageRetrait:number=0;
  sizeRetrait:number=5;
  retraits:any;


  nextPageRetrait(){
    if(this.pageRetrait<this.pagesRetraits.length-1) {
      this.pageRetrait = this.pageRetrait + 1;
      this.getRetraits();
    }
  }

  previousPageRetrait(){
    if(this.pageRetrait>0){
      this.pageRetrait = this.pageRetrait-1;
      this.getRetraits();
    }
  }




  gotoPageRetrait(i){
    this.pageRetrait=i;
    this.getRetraits();
  }

  // variables de versements
  pageVersement:number=0;
  sizeVersement:number=5;
  pagesVersements:Array<number>;
  versements:any;

  // affichage de modal pour recuperer versements
  afficherModalVersements(temp:TemplateRef<any>){
    this.modalRef=this.modalService.show(temp);
    this.getVersements();
  }


  // afficher versements
  getVersements(){
    this.operationservice.getVersements(this.cpt.idcpt,this.pageVersement,this.sizeVersement).subscribe(data=>{
      this.versements=data;
      this.pagesVersements=new Array(data.totalPages);
    })
  }

  // liens de boutons de pagination

  previousVersementPage(){
    if(this.pageVersement>0){
      this.pageVersement=this.pageVersement-1;
      this.getVersements();}
  }

  // go to page fonction
  gotoPageVersements(i){
    this.pageVersement=i;
    this.getVersements();
    console.log(" fonction go to page i")
  }

  // next page versement
  nextPageVersement(){
    if(this.pageVersement<this.pagesVersements.length-1){
      this.pageVersement=this.pageVersement+1;
      this.getVersements();
      console.log(" next page versements ");
    }
  }


  // ouvriri un modal pour nouveau compte courant
  NouveaucCompteCourant(temp:TemplateRef<any>){
    this.modalRef=this.modalService.show(temp);
  }

  NouveaucCompteEpargne(temp:TemplateRef<any>){
    this.modalRef=this.modalService.show(temp);

  }


}
