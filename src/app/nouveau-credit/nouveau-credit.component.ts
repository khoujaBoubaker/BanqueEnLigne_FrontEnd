import {Component, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgProgress} from 'ngx-progressbar';
import {ClientService} from '../../services/ClientService';
import {Client} from '../../Model/Client';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ToastsManager} from 'ng2-toastr';
import {CreditService} from '../../services/CreditService';
import {Credit} from '../../Model/Credit';
import {MensualiteService} from '../../services/MensualiteService';
import {Mensualite} from '../../Model/Mensualite';
import {CompteService} from '../../services/CompteService';
import {CompteCourantCC} from '../../services/CompteCourantsCC';
import {Compte} from '../../Model/Compte';
import {AgenceService} from '../../services/AgenceService';
import{Agence} from '../../Model/Agence';
import {OperationService} from '../../services/OperationService';

@Component({
  selector: 'app-nouveau-credit',
  templateUrl: './nouveau-credit.component.html',
  styleUrls: ['./nouveau-credit.component.css'],
  providers:[ClientService,CreditService,MensualiteService,CompteCourantCC,AgenceService,OperationService]
})
export class NouveauCreditComponent implements OnInit {

  agences:any;
  pageA:number=0;
  sizeA:number=10;
  pagesAgence:Array<number>;
  //MOT CLE RECHERCHE AGENCE
  motCle:String="";
  matched:Agence;

  // Méthode onChange
  onchange(){
    console.log(this.matched);
  }

  getAllagences(){
    this.agenceService.getagences(this.motCle,this.pageA,this.sizeA).subscribe(data=>{
      this.agences=data;
      this.pagesAgence=new Array(data.totalPges);
    },
      error1 => console.log(error1))

  }

  libelle:String="";
  // DETAIL CREDIT
  SelectedCredit:Credit;

  //form group pour effectuer retrait
  public nvvirement:FormGroup;

  pagination:Boolean=true;

  display="none";

  // CREDIT A SUPPRIMER
  creditToRemove:Credit;

  id:number;
  client:Client;
  credit:Credit;
  x:number=0;

  pageM:number=0;
  sizeM:number=5;
  pagesMensualites:Array<number>;
  mensualites:any;

  page:number=0;
  size:number=5;
  pages:Array<number>;
  credits:any;

  totalCredit:number;
  mensual:number;
  
  creditgroup:FormGroup;
  public modalRef: BsModalRef;

  listeDesComptesCourants:any;

  // variables pour afficher les comptes services par client
  pageC:number=0;
  sizeC:number=3;
  Comptes:any;
  pagesComptes:Array<number>;

  // Poursuivre le paiement
  CompteChoisi:Compte;

  constructor(public route:ActivatedRoute,
              public router:Router,
              public ngProgress:NgProgress,
              public clientService:ClientService,
              public formbuilder:FormBuilder,
              private modalService:BsModalService,
              public vcr:ViewContainerRef,
              public totastr:ToastsManager,
              public creditService:CreditService,
              public mensualiteService:MensualiteService,
              public compteCourantService:CompteCourantCC,
              public fb:FormBuilder,
              public agenceService:AgenceService,
              public operationService:OperationService) {
    this.totastr.setRootViewContainerRef(vcr);
  }

  mensualiteCalled:Mensualite;
  call(mensualite:Mensualite){
    this.mensualiteCalled=mensualite;
    console.log(this.mensualiteCalled);
    if(this.mensualiteCalled.etat=="NP"){
      this.libelle="Paiement :"+this.mensualiteCalled.dateDePaiementPrevue;
      this.getCredits();
      this.getComptesParIdClient();

      alert("Mise a jour des comptes");
      this.x=1;
    }
    else{
      if(this.mensualiteCalled.etat=="paye"){
        this.totastr.error("Paiement déja effectué","Paiement");
      }
    }

  }
  // NEXT COMPTES
  nextCompte(){
    if(this.pagesComptes.length-1){
      this.pageC=this.pageC+1;
      this.getComptesParIdClient();
    }
  }

  // GO TO PAGE COMPTE
  goToPageCompte(i:number){
    this.pageC=i;
    this.getComptesParIdClient();
  }

  // PREVIOUS COMPTES
  previousCompte(){
    if(this.pageC>0){
      this.pageC=this.pageC-1;
      this.getComptesParIdClient();
    }
  }

  annulerPaiement(){
    this.x=0;
    this.CompteChoisi=null;
  }

  annulerCompte(){
    this.x=0;
    this.CompteChoisi=null;

  }

  mensualiteAfficher:Mensualite;
  verifierMensualite(mensualite:Mensualite){
    this.mensualiteAfficher=mensualite;
    console.log("Mensualite :"+this.mensualiteAfficher);

  }

  choisirCompte(compte){
    this.CompteChoisi=compte;
    console.log(this.CompteChoisi);
  }

  creditSelectionne:Credit;
  getMensualitesParCredit(){

    this.mensualiteService.ListeDesMensualites(this.creditSelectionne.id,this.pageM,this.sizeM).subscribe(data=>{
      this.mensualites=data;
      console.log("data :"+data.content);
      this.pagesMensualites=new Array(data.totalPages);

    },
      error1 => console.log(error1))

  }

  compteToPay:Compte;
  effectuerRetraitMensualite(){
    this.x=2;
  }

  // PREVIOUS MENSUALITE
  previousMensualite(){
    if(this.pageM>0){
      this.pageM=this.pageM-1;
      this.getMensualitesParCredit();
    }
  }
  // NEXT MENSUALITE
  nextMensualite(){
    if(this.pageM<this.pagesMensualites.length-1){
      this.pageM=this.pageM+1;
      this.getMensualitesParCredit();
    }

  }

  gotoPageMensualite(i:number){
    this.pageM=i;
    this.getMensualitesParCredit();

  }

  ouvrirModalMensualites(credit:Credit){
    this.creditSelectionne=credit;
    console.log(this.creditSelectionne);
   // this.display="block";
    $('#myModal').addClass("modal1");
    this.getMensualitesParCredit();
    this.pagination=false;
  }

  closeModal(){
    $('#myModal').removeClass("modal1");
    this.pagination=true;
    this.x=0;
    this.CompteChoisi=null;

  }

  // detail crédit
  detailcredit(credit:Credit){
    this.SelectedCredit=credit;
    //console.log(credit);
    this.detailCredit();
  }

  // suppression
  ConfirmationSuppression(credit:Credit,temp:TemplateRef<any>){
    this.modalRef=this.modalService.show(temp);
    this.creditToRemove=credit;
    console.log(this.creditToRemove);

  }

  closeModalsupression(){
    this.modalRef.hide();
  }

  // afficher détail crédit
  detailCredit(){
    $("#snack").addClass("shw");
    setTimeout(function () {
      $("#snack").removeClass("shw");
    },5000);

  }

  supprimerCredit(){
    this.creditService.deleteCredit(this.creditToRemove.id).subscribe(data=>{
      this.credits.content.splice(this.credits.content.indexOf(this.creditToRemove),1);
      this.totastr.success('Crédit supprimé','Supression');
      this.getCredits();
      this.modalRef.hide();


    },error1 => console.log(error1))


  }

  getCredits(){
    this.creditService.getCreditsByClient(this.id,this.page,this.size).subscribe(data=>{
      this.credits=data;
      this.pages=new Array(data.totalPages);
    },
      error1 => console.log(error1));

  }

  previous(){
    if(this.page>0){
      this.page=this.page-1;
      this.getCredits();
    }
  }

  next(){
    if(this.page<this.pages.length-1){
      this.page=this.page+1;
      this.getCredits();
    }

  }

  gotoPage(i:number){
    this.page=i;
    this.getCredits();

  }

  revenirAuSimulateur(){
    
    this.x=0;
    this.creditgroup.reset();
    this.nouvelleSimulation();

  }

  ajouterCredit(){
    this.credit.apport=this.creditgroup.get('apportPersonnel').value;
    this.credit.montantemprunte=this.creditgroup.get('MontantTotalCredit').value;
    this.credit.duree=this.creditgroup.get('dureeCredit').value;
    this.creditService.CoutCredit(this.credit.apport,this.credit.montantemprunte,this.credit.duree).subscribe(data=>{
      this.credit.montantResteApayer=data;
     this.totastr.success("Crédit ajouté avec succès au client ","Crédit");
    },
      error1 => console.log(error1))

    this.clientService.ajouterCreditAunClient(this.id,this.credit).subscribe(data=>{
     //alert("crédit ajouté");
      this.x=1;
      this.success();
    },
      error1 => console.log(error1))
  }

  myFunction(){
    $("#snackbar").addClass("show");

    setTimeout(function(){
      $("#snackbar").removeClass("show");
    },
      3000);

  }

  nouvelleSimulation(){
    $("#sn1").addClass("shw");
    setTimeout(function () {
      $("#sn1").removeClass("shw")

    },3000);
  }

  success(){
    $("#sn").addClass("shw");
    setTimeout(function(){
      $("#sn").removeClass("shw")
    },3000);
  }

  calculerMensualite(){

    if(this.creditgroup.get('apportPersonnel').value<this.creditgroup.get('MontantTotalCredit').value) {
      this.credit = new Credit();

      this.credit.apport = this.creditgroup.get('apportPersonnel').value;
      this.credit.montantemprunte = this.creditgroup.get('MontantTotalCredit').value;
      this.credit.duree = this.creditgroup.get('dureeCredit').value;
      this.creditService.simulerCredit(this.credit.apport, this.credit.montantemprunte, this.credit.duree).subscribe(data => {
        this.mensual = data;
        this.myFunction();
      }, error1 => console.log(error1))

      this.creditService.CoutCredit(this.credit.apport, this.credit.montantemprunte, this.credit.duree).subscribe(data => {
          this.totalCredit = data;
        },
        error1 => console.log(error1))
    }
    else
    {
      this.totastr.error("L'apport personnel ne peut dépasser le montant crédit total","Erreur");
    }



  }

  getComptesParIdClient(){
    this.compteCourantService.getComptesCourants(this.id,this.pageC,this.sizeC).subscribe(data=>{
        this.Comptes=data;
        this.pagesComptes=new Array(data.totalPages);
      },
      error1 => console.log(error1))
  }

  retour(){
    this.getMensualitesParCredit();
    this.x=0;
    this.getCredits();
  }

  refresh(){
    this.getCredits();
  }

  refreshCredit(){
    this.getCredits();
  }


  payer(){

this.operationService.effectuerRetraitPourPayerMensualite(this.CompteChoisi.idcpt,this.creditSelectionne.id,this.matched.idagence,1,this.libelle).subscribe(
  data=>{
    this.totastr.success("Paiement effectué","Mensualité");
    this.x=3;
    // Mettre a jour mensualité :


  },
  error1 => console.log(error1)
)
    this.mensualiteService.MettreAjourMensualite(this.creditSelectionne.id,this.mensualiteCalled).subscribe(data=>{

    },error1 => console.log(error1))

  }

  ngOnInit() {

    this.CompteChoisi=null;

    this.getAllagences();

    this.nvvirement = this.fb.group({

      montant: [0, [Validators.required]],
      libelle: '',
      agenceRetrait:''

    });

   // this.getCredits();

    this.totastr.success('Crédits','Simulation crédits');

    this.ngProgress.start();

    this.id=+this.route.snapshot.params['id'];

    // APPEL DU WEB SERVICE POUR RECUPERER LISTE DES COMPTES PAR ID CLIENT
    this.compteCourantService.getComptesCourants(this.id,this.pageC,this.sizeC).subscribe(data=>{
      this.Comptes=data;
      this.pagesComptes=new Array(data.totalPages);
    },
      error1 => console.log(error1))


    //fin d'appel au web services
    this.getCredits();
    this.clientService.getClient(this.id).subscribe(data=>{
      this.client=data;
      console.log(this.client);

    },
      error1 => console.log(error1))
    this.ngProgress.done();
    console.log(this.id);

    this.creditgroup=this.formbuilder.group({
      apportPersonnel:'',
      dureeCredit:'',
      MontantTotalCredit:'',
    })
  }

  // open and close nav
  openNav(){
    $("#mySidenav").addClass("sidenav");

  }





}
