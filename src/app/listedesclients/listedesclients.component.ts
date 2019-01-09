import {Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {ClientService} from '../../services/ClientService';
import {Client} from '../../Model/Client';
import {CompteService} from '../../services/CompteService';
import {Compte} from '../../Model/Compte';
import {Validators, FormGroup,FormControl, FormBuilder} from '@angular/forms';
import {OperationService} from '../../services/OperationService';
import {ComptCourantService} from '../../services/ComptCourantService';
import {Operation} from '../../Model/Operation';
import {HttpErrorResponse} from '@angular/common/http';
import {BsModalRef,BsModalService} from 'ngx-bootstrap';
import {Conseiller} from '../../Model/Conseiller';
import {AgenceService} from '../../services/AgenceService';
import {Agence} from '../../Model/Agence';
import { Ng4LoadingSpinnerService,Ng4LoadingSpinnerModule,Ng4LoadingSpinnerComponent } from 'ng4-loading-spinner';
import {Http} from '@angular/http';
import {LoadingspinnerComponent} from '../loadingspinner/loadingspinner.component';
import {CompteCourantCC} from '../../services/CompteCourantsCC';
import {CompteEpargnesCE} from '../../services/CompteEpargnesCE';
import {compteEpargne} from '../../Model/compteEpargne';

import {ToastsManager} from 'ng2-toastr';
import {Retrait} from '../../Model/Retrait';
import {MatSelectModule} from '@angular/material';
import {LoginService} from '../../services/LoginService';
import {ConseilService} from '../../services/ConseilService';
import {Time} from '@angular/common';
import {RendezVousService} from '../../services/RendezVousService';
import {RendezVous} from '../../Model/RendezVous';
import {IOption} from 'ng-select';

import {NgProgress} from 'ngx-progressbar';


import {HostListener,Inject} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
declare const window : any;



declare var $ :any;
import * as jsPDF from 'jspdf';
import {AuthenticationServicee} from '../../services/AuthenticationServicee';



@Component({
  selector: 'app-listedesclients',
  templateUrl: './listedesclients.component.html',
  styleUrls: ['./listedesclients.component.css'],
  providers:[ClientService,
    CompteService,
    ConseilService,
    OperationService,
    ComptCourantService,
    Ng4LoadingSpinnerService,
    LoadingspinnerComponent,
    CompteCourantCC,CompteEpargnesCE,

    LoginService,
    RendezVousService,
   AuthenticationServicee]
})
export class ListedesclientsComponent implements OnInit {


  utilsateur: String;
  clientsuppress: Client;
  public modalRef: BsModalRef;
  operationSupp: Operation;
  nom: string;
  prenom: string;
  clientAsupprimer: Client;

  selectedClient: Client;
  motCle: string = "";
  page: number = 0;
  size: number = 5;
  pages: Array<number>;
  clients: any;
  compte: Compte = new Compte();
  NombreDeComptes: number = 0;
  y: number = 1;
  pageCompte: number = 0;
  sizeCompte: number = 5;
  pagesComptes: Array<number>;
  date: Date = new Date();
  visible = false;
  display4 = 'none';
  p: number = 0;

  nombreDeClients:number;

  nvversement: FormGroup;
  clientModifiable: Client;

  pagesOperation: Array<number>;
  pageoperation: number = 0;
  sizeoperation: number = 5;

  formgroupvirement: FormGroup;
  formCompteEpargne: FormGroup;
  nvvirement: FormGroup;
  operation: Operation = new Operation();
  compteCourant: Compte;

  successMessage = '';
  errorMessage = '';
  versement: Operation = new Operation();

  // Validation MIN MAX
  montantMIN: number = 1;
  decouvertMin: number = 1;
  isValidFormSubmitted = null;
  formgroupClient: FormGroup;

  pagesRetraits:Array<number>;
  pageRetrait:number=0;
  sizeRetrait:number=5;
  retraits:any;
  dispFind:Boolean=false;




// ############################################
// ########################################## EDITER CLIENTS ET CONSULTER COMPTES

  editclient(id:number){
    this.router.navigate(['/home/EditClient',id]);
  }

  editCredits(id:number){
    this.router.navigate(['/home/SimulerCredit',id]);
  }

  consulterComptes(id:number){
    this.router.navigate(['/home/MesComptes',id]);
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


  trierOC(){
    this.tricl = "salaireCroissant";
    this.doSearchCleintsParOrdreCroissant();
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
    pdf.save('Test.pdf');
  },margins);


}





  @ViewChild('content') content:ElementRef;
  public downloadPDF(){
    let doc=new jsPDF();

    let specialElementHandlers={
      '#editor':function (element,renderer) {
        return true;

      }
    };
    let content=this.content.nativeElement;
    doc.fromHTML(content.innerHTML,15,15,{
      'width':190,
      'elementHandlers':specialElementHandlers
    });

doc.save('test.pdf');

  }


  // css stubs
  // afficher Modal pour tri par salaire
  tricl: string = "";

  openModalTriClientParSalaire(t: TemplateRef<any>) {
    this.modalRef = this.modalService.show(t);
  }

  //  chercher tous les client triés par solde
  TousLesClientsTriesParSalaire() {
    this.showw = true;
    this.tricl = "salaire";
    this.clientservice.getClientsTriesParSalaire(this.motCle, this.page, this.size).subscribe(
      data => {
        this.clients = data;
        this.pages = new Array(data.totalPages);
        this.showw = false;
        this.showspinner = false;
      },
      error2 => console.log(error2));

  }

  clientsdtn() {
    this.showw = true;
    this.tricl = "dtn";
    this.clientservice.getClientsTriesPardtn(this.motCle, this.page, this.size).subscribe(
      data => {
        this.clients = data;
        this.pages = new Array(data.totalPages);
        this.showw = false;
        },
      error2 => console.log(error2));

  }

  clientsDTC() {
    this.showw = true;
    this.tricl = "dtc";
    this.clientservice.getClientsTriesPardtc(this.motCle, this.page, this.size).subscribe(
      data => {
        this.clients = data;
        this.pages = new Array(data.totalPages);
        this.showw = false;
        },
      error2 => {
        console.log(error2);
        this.showw = false;
      });
  }

  // ouvrir modal pour inscrire un nouveau client
  clientInscrit: Client;

  nouveauClient(t: TemplateRef<any>) {
    //this.clientInscrit=new Client();
    this.formgroupClient.reset();

    this.modalRef = this.modalService.show(t);


  }




  // methode de tri
  trierParSolde() {
    this.tricl = "salaire";
  }

  //Modal de suppression
  show(client: Client, template: TemplateRef<any>) {

    this.selectedClient = client;
    console.log("*****");
    console.log(this.selectedClient);
    this.modalRef = this.modalService.show(template);

  }





  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  supprimerModalClient() {

    this.supprimerClient(this.selectedClient);
    this.modalRef.hide();
    this.totastr.warning('suppression du client', 'Suppression', {
      timeOut: 3000, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
    });

  }

  detailClient() {
    let nom = this.selectedClient.nom;
    let prenom = this.selectedClient.prenom;
    let salaire = this.selectedClient.salaire;
    let dtn = this.selectedClient.datedenaissance;
    console.log(nom);
    this.totastr.success('Nom :' + nom + ',' +
      ' Prenom :' + prenom + ',' + ' salaire: ' + salaire + ',' + ' date de naissance: ' + dtn, 'Détails', {
      timeOut: 6000, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 1
    });

  }

  closeModalsuppression1() {
    this.totastr.info('suppression compte courant annulée', 'Annulation', {
      timeOut: 3000, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
    });
    this.modalRef.hide();

  }



  closeModalDetail() {
    this.modalRef.hide();
    this.totastr.info('modal détail fermé', '', {
      timeOut: 3000, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
    });
  }

  closeModalsupression() {

    this.modalRef.hide();
    this.clientsuppress = new Client();
    this.formgroupClient.reset();
    this.totastr.info('suppression annulée', '', {
      timeOut: 3000, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
    });

  }

  closeModal() {
    this.modalRef.hide();
    this.clientsuppress = new Client();
    this.formgroupClient.reset();
    this.totastr.info('Modification annulée', '', {
      timeOut: 3000, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
    });
  }






  displayvalidate: boolean = true;




  closeModalsuppression() {
    this.modalRef.hide();
  }



  oper: string = "";



  agenceSelected(event) {
    console.log('selected employee: ' + event);
  }

  agences: any;

  // chercher agences ou effectuer operation
  chercherAgences() {
    this.agenceService.getagences(this.motCle, this.page, this.size).subscribe(data => {
      this.agences = data;
    }, error2 => console.log(error2))
  }

  public formCompte: FormGroup;

  closeagrAPID() {
    $("#edit").slideToggle(0);
  }

  // show toasts
  showInfoListesClients() {
    this.totastr.info('Liste des clients', '', {
      timeOut: 10000, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
    });
  }


  infoClient() {

    this.totastr.info('liste des clients', 'Banque en ligne', {
      timeOut: 3000, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
    });
  }

  // ######################################################################## NGONINIT ###################################
  montantRetraitMinimal: number = 1;
  dateDuJour: Date = new Date();

  // initialistion de formgroup pour rendez vous
  formgroupRendezVous: FormGroup;
  day: number = 0;
  month: number = 0;
  year: number = 0;
  dt: String = '';

  // reset formulaire de rendez-vous
  resetFormulaireRDV(){
    this.formgroupRendezVous.reset();
  }

  verification(){

    console.log("roles"+this.authService.roles);
  }

  ngOnInit() {
   // this.verification();
    console.log("verification des id");
   this.verification();
   // console.log(this.authService.roles);


    // verifier si le token est sauvegardé dans le web storage








    this.ngProgress.start();

    //this.loadScript('../assets/js/custom.min.js');

   // this.loadScript('../assets/js/TooltipsBoubaker.js');
   // this.loadScript('https://code.jquery.com/jquery-1.12.4.js');
    //this.loadScript('https://code.jquery.com/ui/1.12.1/jquery-ui.js');

    //GESTION DE SESSION
    // SI LE TOKEN ENREGISTRE en memoire est invalide alors




    //console.log("composant clients: "+this.authService.jwtToken);

    this.dt = this.year + '-' + this.month + '-' + this.day;
    console.log(this.dt);


    this.chercher();

    this.day = this.dateDuJour.getDate();
    this.month = this.dateDuJour.getUTCMonth();
    this.year = this.dateDuJour.getFullYear();
    //console.log(new Date().getDate());

   // this.utilsateur = this.loginService.utilistaeur;
   // this.infoClient();
    //this.closeagrAPID();
    //this.showInfoListesClients();

    this.formgroupRendezVous = this.fbv.group({
      libelleRDV: '',
      dateRDV: [''],
      heureRDV: '',
      conseillerRDV: '',

    });

    this.nvversement = this.ts.group({
      montantVersement: ['', [Validators.required, Validators.min(this.montantMIN)]],
      agenceVersement: ''
    });

    this.formgroupClient = this.fbc.group({
      nomClient: '',
      prenomClient: '',
      salaireClient: '',
      emailClient: '',
      datedenaissance: ''


    });




    this.formCompte = this.fgcompte.group({
      soldeinitial: [0, [Validators.required, Validators.min(this.montantMIN)]],
      decouvertinitial: [0, [Validators.required, Validators.min(this.decouvertMin)]]
    });

    this.formCompteEpargne = this.fgcompteEpargne.group({
      soldeepargneInitial: [0, [Validators.required, Validators.min(this.montantMIN)]],
      taux: 0

    });


    this.nvvirement = this.fb.group({

      montant: ['', [Validators.required, Validators.min(this.montantRetraitMinimal)]],
      libelle: ''

    });


  }

  reset() {
    this.errorMessage = "";
    $("#c").hide();
  }

  dis: boolean = false;
  selectedAgence: Agence;
  matchedAgence: Agence;

  // OnChange methode
  cherche() {
    // this.ngOnInit();
    //this.sho=true;
    this.chercher();
    this.totastr.warning('En cours', 'Recherche clients', {
      timeOut: 500, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
    });
  }

  matchedConseiller: Agence;
  match: String = '';

  saveRDV() {
    console.log(this.formgroupRendezVous.get('libelleRDV').value);
    console.log(this.formgroupRendezVous.get('dateRDV').value);
    console.log(this.formgroupRendezVous.get('heureRDV').value);
    console.log(this.match);
  }

  closeModalRDV() {
    this.modalRef.hide();
    this.formgroupRendezVous.reset();
  }

  onchangeTime() {
    alert("time changed");
  }

  onChange() {
    alert(this.matchedAgence.idagence);
    console.log(this.matchedAgence);

    //console.log(this.selectedAgence);
  }

  get(agence) {
    console.log(agence);

  }


  onAgenceChange(agence) {
    this.selectedAgence = agence;
    console.log(this.selectedAgence);

  }


  operationaboutie: boolean = false;



  // ############################################################################################ COMPTES COURANTS #######################biiis
  pageCC: number = 0;
  sizeCC: number = 5;
  clientTrialCC: Client;
  comptesCourantsPart: any;
  pagesComptesCourants: Array<number>;

  soldeTotal: number;

  getSoldeTotal() {
    this.compteCourantServiceCC.getSoldeTotal(this.selectedClient.idclient).subscribe(data => {
      this.soldeTotal = data;
    }, error2 => console.log(error2))

  }

  solde() {
    // this.modalRef=this.modalService.show(temp);

    this.totastr.success('' + this.soldeTotal + 'dinars', 'Total comptes courants', {
      timeOut: 3000, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
    });
  }






  // ######### Pagination ############################


  comptecourantAsupprimer: Compte;

  // ############################# AFFICHAGE MODAL POUR SUPPRESSION COMPTE COURANT ################################
  supprimerCompteCourant(template: TemplateRef<any>, compte: Compte) {
    this.modalRef = this.modalService.show(template);
    this.comptecourantAsupprimer = compte;
    console.log(this.comptecourantAsupprimer);

  }

  //################### fonction qui affiche le modal pour pouvoir supprimer un compte epargne ########################
  compteEpargne: compteEpargne;

  supprimerCompteEpargne(compte: compteEpargne, temp: TemplateRef<any>) {
    this.compteEpargne = compte;
    console.log(this.compteEpargne);
    this.modalRef = this.modalService.show(temp);

  }

  detailEpargne() {
    this.totastr.info('détail du compte épargne', ' Compte épargne', {
      timeOut: 3000, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
    });

  }

  // LISTE RENDEZ VOUSSS PAR CLIENT
  rdvs: any;
  pageRDV: number = 0;
  sizeRDV: number = 3;
  pagesRDV: Array<number>;

  motif:string="";
  getRendezVousClient() {
    this.rendezVousService.getRendezVousPerClient(this.clrdv.idclient,this.motif, this.pageRDV, this.sizeRDV).subscribe(data => {
        this.rdvs = data;
        this.pagesRDV = new Array(data.totalPages);
        console.log(data);
      },
      error2 => console.log(error2))
  }

  // formulaire d'ajout rendez vous ######################################################################
  // get conseillers de meme agenceee #######################################################################
  // A APPELER AVANT L OUVERTURE DE MODAL DE GESTION DE RENDEZ VOUS
  conseillers:any;
  getConseillersDeMemeAgence()
  {
    this.conseilservice.getConseillerParAgence(this.clrdv.agence.idagence).subscribe(data=>{
      this.conseillers=data;
    },
      error2 => console.log(error2))
  }



  //
  chercherRendezVousParMotCle(){
    alert(this.motif);
    this.getRendezVousClient();
  }

  //femer modal rendez vous er reinitialisation de formulaire
  fermerModalRendezVous(){
    this.modalRef.hide();
    this.formgroupRendezVous.reset();
  }

  //  go to next page in pagination div
  nextpageRDV() {
    if (this.pageRDV < this.pagesRDV.length - 1) {
      this.pageRDV = this.pageRDV + 1;
      this.getRendezVousClient();
    }
  }

  // go to previous page
  previouspageRDV(){
    if(this.pageRDV>0){
      this.pageRDV=this.pageRDV-1;
      this.getRendezVousClient();
    }

}

// supprimer rendez vous
  suppRDV(rendezVous){
    console.log("suppression rende zvous");
  }

  gotoPagerdv(i){
    this.pageRDV=i;
    this.getRendezVousClient();
  }

  // GESTION RENDEZ VOUS ############################################"" OPEN MODAL POUR RENDEZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ VOUSSSSSSSSSSSSSSSSS
  clrdv:Client;
  idagenceRechercherConseiller:number;
  i:number=1;
  openModalRendezVous(client:Client,temp:TemplateRef<any>){
    this.z=0;
   // console.log("ppppp");
    // appel de la methode
    this.clrdv=client;
    // appel de la methode qui nous retourne la liste des conseillers dans cette agence

    this.conseilservice.getConseillerParAgence(this.clrdv.agence.idagence).subscribe(data=>{
      this.conseillers=data;
     // alert("data loaded");
    },
      error2 => console.log(error2
      ));
    //alert(this.clrdv.agence.idagence);
    this.getRendezVousClient();
    this.r=0;
    //this.getRendezVousClient();
    this.modalRef=this.modalService.show(temp);

    //console.log(this.clrdv);
    this.idagenceRechercherConseiller=this.clrdv.agence.idagence;
    console.log("idagence selectionnée :"+this.idagenceRechercherConseiller);
  }

  cs:Conseiller;
  onChangeConseil(conseiller){

    this.cs=conseiller;
    alert(this.formgroupRendezVous.get('conseillerRDV').value.nom);


  }




 idConseiller:number;
  saveRendezVous(){

    this.libelleToBeSaved=this.formgroupRendezVous.get('libelleRDV').value;
    this.jourToBeSaved=this.formgroupRendezVous.get('dateRDV').value;
    this.heureToBeSaved=this.formgroupRendezVous.get('heureRDV').value;
    this.idConseiller=this.formgroupRendezVous.get('conseillerRDV').value.id;

    this.rendezVousService.addRendezVous(this.clrdv.idclient,this.idConseiller,this.libelleToBeSaved,this.jourToBeSaved,this.heureToBeSaved).subscribe(data=>{
        this.z=0;
        this.formgroupRendezVous.reset();
       // this.z=0;
      },
      error2 => console.log(error2))

    //console.log(this.libelleToBeSaved);
    // console.log(this.jourToBeSaved);
    // console.log(this.heureToBeSaved);
  }

  // retourner a la page des rendez vous et reinitialisation de formulaires
  RETOUR(){
    this.z=0;
    this.formgroupRendezVous.reset();

  }


  // rendez-vous à mettre a jour
  rendezVousToBeUpdated:RendezVous;
modif(rendezVous:RendezVous){
  this.rendezVousToBeUpdated=rendezVous;
  console.log("-------------------------");
  console.log(this.rendezVousToBeUpdated);
    this.r=2;
}

  retourListeRDV(){
  this.r=1;
  this.changed=false;
    this.totastr.success('Chargement', 'Rendez-vous',{timeOut: 3000, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
    });
  }

  changed:Boolean=false;
  changelibelle(){
   this.changed=true;

  }

  dateSelected:Date;
  heureSelected:String="00:00";
  conseillerDisponibles:any;
  nbre:number;
  onChangeDate(){
    this.dateSelected=this.formgroupRendezVous.get('dateRDV').value;
    console.log("date choisie :"+this.dateSelected);

    this.conseilservice.ConseillersDisponible(this.idagenceRechercherConseiller,this.dateSelected,this.heureSelected).subscribe(data=>{
      this.conseillerDisponibles=data;
      this.nbre=data.length;
      console.log("lo"+this.conseillerDisponibles);
      console.log("longu"+data.length);

      this.totastr.success(this.nbre +' conseiller(s)', 'Conseillers disponibles',{timeOut: 3000, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
      });

    })

  }

  matchedConseil:Conseiller;
  onChangeConseiller(){
    alert(this.matchedConseil.id);
    }

    libelleToBeSaved:String="";
    jourToBeSaved:Date;
    heureToBeSaved:String="";





  listeRDV(){
  this.r=1;
  this.changed=false;
  this.pageRDV=0;
  this.getRendezVousClient();
  }

  r:number;
  x:number;
  nouveauRDV(){
    this.formgroupRendezVous.reset();
    this.z=1;
  }

 supprimerRDV(rendezvous:RendezVous){
    this.rendezVousService.deleteRendezVous(rendezvous.id).subscribe(data=> {
        this.rdvs.content.splice(this.rdvs.content.indexOf(rendezvous), 1);
        this.totastr.success('suppression', 'Rendez-vous', {
          timeOut: 1000, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
        });
      },
      error2 => console.log(error2)
    )
 }

 // afficher details rendez vous
  rdv:RendezVous;
  afficherLibelleRDV(rendezvous:RendezVous){
    console.log(rendezvous);
    this.totastr.success('Motif:'+rendezvous.libelle, ' Détail rendez-vous', {
      timeOut: 1000, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
    });
  }
 rdvdetail:RendezVous;
  horaireRDV(rendezvous:RendezVous){
    this.rdvdetail=rendezvous;
    this.totastr.success('Date:'+this.rdvdetail.dateRendezVous, ' Détail rendez-vous', {
      timeOut: 1000, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
    });


  }

  //details rendez vous

  detailRendezVous(rendezvous){
    this.disp='block';
  }

  //afficher un conseiller d un rendez vous
  rendez:RendezVous;
  conseiller(rendezvous){this.rendez=rendezvous;

    this.totastr.success(''+this.rendez.conseiller.nom+" "+this.rendez.conseiller.prenom, 'Conseiller:', {
      timeOut: 1000, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
    });

  }


  w3_open(){
    this.disp='block';
    this.dispRecherche='none';
    console.log("open me");
  }
  dispRecherche='block';
  disp='none';
  w3_close(){
    this.disp='none';
    this.dispRecherche='block';
    console.log("click me");
  }

  showspinner:boolean=true;

  constructor(public router: Router,public operationService:OperationService,
              public clientservice: ClientService,
              public compteService: CompteService,
              public comptecourantService:ComptCourantService,
              public fb:FormBuilder,
              public fbc:FormBuilder,
              private modalService:BsModalService,
              public ts:FormBuilder,
              public fbv:FormBuilder,
              public agenceService:AgenceService,
              public fgcompte:FormBuilder,
              public spinnerService: Ng4LoadingSpinnerService,
              public http:Http,
              public compteCourantServiceCC:CompteCourantCC,
              public compteEpargneService:CompteEpargnesCE,
              public fgcompteEpargne:FormBuilder,

              public totastr:ToastsManager,
              public vcr:ViewContainerRef,
              public loginService:LoginService,
              public conseilservice:ConseilService,
              public rendezVousService:RendezVousService,
              public authService:AuthenticationServicee,
              public ngProgress:NgProgress) {


    this.totastr.setRootViewContainerRef(vcr);
  }





    gotoPage(i) {
    if(this.tricl==""){
      this.page=i;
      this.doSearch();
    }
    else{
      if(this.tricl=="salaire"){
        this.page=i;
        this.doSearchClientsParOrdreDecroissant();
      }
      else{
        if(this.tricl=="salaireCroissant"){
          this.page = i;
          this.doSearchCleintsParOrdreCroissant();

        }
        else{
          if(this.tricl="emailcr"){
            this.page=i;
            this.doSearchClientEmailCroissant();
          }

        }
      }

    }
  }

  previous() {
    if(this.page>0) {
      if(this.tricl==""){
      this.page = this.page - 1;
      this.doSearch();}
      else {
        if(this.tricl=="salaire"){
          this.page=this.page-1;
          this.doSearchClientsParOrdreDecroissant();
        }
        else {
          if(this.tricl=="salaireCroissant"){
            this.page=this.page-1;
            console.log(this.page);
            this.doSearchCleintsParOrdreCroissant();
          }
          else{
            if(this.tricl=="emailcr"){
              this.page=this.page-1;
              this.doSearchClientEmailCroissant();
            }
          }

        }
      }

    }
  }

  doSearchClientsParOrdreDecroissant(){
    this.clientservice.getClientsTriesParSalaire(this.motCle,this.page,this.size).subscribe(data=>{
      this.clients=data;
    },
      error1 => console.log(error1))
  }

  doSearchCleintsParOrdreCroissant(){
    this.clientservice.getClientsTriesParSalaireOC(this.motCle,this.page,this.size).subscribe(data=>{
      this.clients=data;
    },
      error1 => console.log(error1))

  }

  next() {
    if(this.page<this.pages.length-1) {
      if(this.tricl==""){
      this.page = this.page + 1;
      this.doSearch();}
      else{
        if(this.tricl=="salaire"){
          this.page=this.page+1;
          this.doSearchClientsParOrdreDecroissant();
        }
        else{
          if(this.tricl=="salaireCroissant")
          {this.page=this.page+1;
          this.doSearchCleintsParOrdreCroissant();}
          else {
            if(this.tricl=="emailcr"){
              this.page=this.page+1;
              this.doSearchClientEmailCroissant();
            }
          }
        }
      }
    }
    console.log(this.tricl);
  }

refreshData(){
this.ngProgress.start();
this.doSearch();

}

  doSearch() {
    this.ngProgress.start();
    this.clientservice.getClients(this.motCle, this.page, this.size).subscribe(
      data => {
        this.clients = data;                      /////////////////////////////////////////////////////////////////////////
        this.pages = new Array(data.totalPages);
        this.nombreDeClients=data.totalElements;
        this.showw=false;
        this.ngProgress.done();

        this.showspinner=false;
      },
      error2 => console.log(error2));
  }

  // SEARCH CLIENT TRIES PAR EMAIL DECROISSANT
  doSearchClientEmailCroissant(){
    this.clientservice.getClientsTriesParEmailCroissant(this.motCle,this.page,this.size).subscribe(
      data=>{
        this.clients=data;
      },
      error1 => console.log(error1)
    )
  }
 // EMAIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIL CROISSANT
  triemailcr(){
    this.tricl="emailcr";
    this.doSearchClientEmailCroissant();
  }

  doSearchClientEmailDecroissant(){
    this.clientservice.getClientsTriesParEmailDecroissant(this.motCle,this.page,this.size).subscribe(
      data=>{
        this.clients=data;
      },
      error1 => console.log(error1)
    )
  }

  triemaildec(){
    this.tricl="emaildec";
    this.doSearchClientEmailDecroissant();
  }

  // desactiver tri
  DT(){
    this.tricl="";
    this.chercher();
    this.totastr.info('Aucun tri sélectionné','Liste des clients');
  }

  showw:Boolean=true;
  chercher() {
    this.doSearch();
    this.ngProgress.done();
  }

  supprimerClient(client) {
    console.log(client);
    this.clientservice.supprimerClient(client.idclient).subscribe(data => {
      this.clients.content.splice(
        this.clients.content.indexOf(client), 1)



    })
  }

  // nouveau rendez vous
  z:number=0;
  nouveauRendezVous(){
    // passer a la division d'ajout de rendez vous.
    this.z=1;

  }

  nbreRDV(){
    this.getRendezVousClient();


    this.totastr.success(''+this.rdvs.totalElements, 'Nombre de rendez-vous', {
      timeOut: 3000, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
    });

  }






}
