import {Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {ConseillerService} from '../../services/ConseillerService';
import {Conseiller} from '../../Model/Conseiller';
import {FormBuilder,FormGroup} from '@angular/forms';
import {ConseillerClientService} from '../../services/ConseillerClientService';
import {ScheduleModule} from 'primeng/schedule';
import {FullCalendarDirective} from '../../services/FullCalendarDirectory';
import {CalendarComponent} from 'ng-fullcalendar';
import {Options} from 'fullcalendar';
import {EventService} from '../../services/EventService';
import {SchedulerComponent} from '../scheduler/scheduler.component';
import {EvService} from '../../services/EvService';
import {jsonpCallbackContext} from '@angular/common/http/src/module';
import {BsModalRef,BsModalService} from 'ngx-bootstrap';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {LoaderService} from '../../services/LoaderService';
import {ToastsManager} from 'ng2-toastr';
import {Router} from '@angular/router';
import{NgProgress} from 'ngx-progressbar';

import swal from 'sweetalert';


declare var $ :any;


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-conseillers',
  templateUrl: './conseillers.component.html',
  styleUrls: ['./conseillers.component.css'],
  providers:[ConseillerService,ConseillerClientService,EventService,EvService,LoaderService]
})
export class ConseillersComponent implements OnInit {

  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  calendarOptions: Options;
//  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  // variables de pagination et web service listes des conseillers
  motCle:string='';
  page:number=0;
  size:number=5; // valeur par défaut de nombre de pages
  conseillers:any;
  pages:Array<number>;
  display='none';
  conseiller:Conseiller=new Conseiller(); // variable conseiller pour le data binding
  conseilgroup:FormGroup;
  display1='none';
  selectedConseiller:Conseiller=new Conseiller();
  conseillerAmodifi:Conseiller=new Conseiller();
  display3='none';
  name:string="";
  prename:string="";
  alert:boolean=false;
  display4='none';
  // Modal pour les clients dont l'id est cliqué
  clients:any;
  pageClient:number=0;
  sizeClient:number=3;
  conseillerCourant:Conseiller;
  clientss:any;
  pagesClients:Array<number>;

  conseillerAsupprimer:Conseiller;

  // liste des conseillers triés par date d'embauche.


  getConseillers(){
    this.conseillerservice.getConseillers(this.motCle,this.page,this.size).subscribe(data=>{
        this.conseillers=data;
        this.ngProgress.done();

        this.pages=new Array(data.totalPages);
        this.show=false;

      },
      error2 => console.log(error2));

  }


 lien:number;
  getallConseillersTri(){
    this.lien=0;
    this.show=true;
    this.conseillerservice.listesConseillersTriées(this.motCle,this.page,this.size).subscribe(data=>
      {this.conseillers=data;
      this.show=false;
        this.pages=new Array(data.totalPages);
      },
      error2 => {console.log(error2);
    this.show=false;})

  }

  getallConseillersTriParDTN(){
    this.lien=2;
    this.show=true;
    this.conseillerservice.listesConseillersTriéesParDateDeNiassance(this.motCle,this.page,this.size).subscribe(data=>
      {this.conseillers=data;
        this.show=false;
        this.pages=new Array(data.totalPages);
      },
      error2 => {console.log(error2);
        this.show=false;})

  }

  chercherSansFiltre(){
    this.lien=3;
    this.chercher();
  }

  getallConseillersTriParNom(){
    this.lien=1;
    this.show=true;
    this.conseillerservice.listesConseillersTriéesParNom(this.motCle,this.page,this.size).subscribe(data=>
      {this.conseillers=data;
      this.show=false;
        this.pages=new Array(data.totalPages);
      },
      error2 => console.log(error2))

  }


  /*
   Modal service
   */


  // Modal pour confirmation de suppression
  delete(conseiller,template:TemplateRef<any>){
    this.conseillerSuppression=conseiller;
    console.log(this.conseillerSuppression);
    this.modalRef=this.modalService.show(template);
  }

  public modalRef: BsModalRef;





  getClientsByConseillers(id:number,page:number,size:number)
  {
    this.conseilclientservice.getClientByConseiller(id,page,size).subscribe(data=>{
      this.clientss=data;
      this.pagesClients=new Array(data.totalPages);

    },error2 => console.log(error2))
  }

  date:Date=new Date();

  conseillerafiicheList:Conseiller=new Conseiller();

  displayvalidate:boolean=false;

  modifier(c:Conseiller,template:TemplateRef<any>){
    //this.conseilgroup.reset();
    this.conseillerAmodifi=c;

    console.log(c);
    console.log(this.conseillerAmodifi);
   // this.display3="block";
    console.log(this.conseillerAmodifi);
    //this.name=conseiller.nom;
    //this.prename=conseiller.prenom;
   // this.modalService.show(template:TemplateRef<any>);
    this.openModal(template);
  }

  fermerModalModification(){
    this.display3='none';
    this.conseillerAmodifi=new Conseiller();
    }

  fermermodalClients(){
    this.display4='none';

  }
  // fermer modal de succes de modification.
  cl(){
   $('#sf').hide(2000);
  }

  h(){
    $("#mdbd").hide(2000);
  }



  liste(conseiller){
    this.conseillerafiicheList=conseiller;
   //console.log(conseiller);
    this.display4="block";
    this.conseillerCourant=conseiller;
    console.log(this.conseillerCourant);
    this.getClientsByConseillers(this.conseillerCourant.id,this.pageClient,this.sizeClient);

  }

  //

  hidesuccess(){
    this.alert=false;
  }


conseillerModifiable:Conseiller;
  // Mettre à jour le conseiller passé en paramètre
  updateConseiller(){

    this.conseillerModifiable=new Conseiller();
    this.conseillerModifiable.id=this.conseillerAmodifi.id;
    this.conseillerModifiable.dateEmbauche=this.conseillerAmodifi.dateEmbauche;
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
      this.modalRef.hide();
      this.conseilgroup.reset();
      console.log(this.conseillerAmodifi);
      this.chercher();

      this.fermerModalModification();
    },error2 => console.log(error2))
  }



public openModal(template: TemplateRef<any>){
this.modalRef=this.modalService.show(template);
}

show=false;
  constructor(public conseillerservice:ConseillerService,public formbuilder:FormBuilder,
              public conseilclientservice:ConseillerClientService,
              protected eventservice:EventService,public evservice:EvService,
              private modalService:BsModalService,
              public loaderService:LoaderService,
              public totastr:ToastsManager,
              public vcr:ViewContainerRef,
              public router:Router,
              public ngProgress:NgProgress) {
    this.show=true;
    this.totastr.setRootViewContainerRef(vcr);
    //this.getConseillers();


  }




  gotoPage(i:number){
    this.page=i;
    this.getConseillers();

  }

  hidetableConseillers(){
    $('#sss').slideToggle();
  }



  hidetable(){
    $('#s').slideToggle();

  }

  eventClick(model: any) {
    model = {
      event: {
        s:0,
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title,
        allDay: model.event.allDay
        // other params
      },
      duration: {},

    };
    console.log(model.event.title);
    console.log(model.event.s);

  }

  events:any;

  windowResize(model: any) {
    console.log('The calendar has adjusted to a window resize');
  }
  displayEvent: any;
  updateEvent(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title
        // other params
      },
      duration: {
        _data: model.duration._data
      }
    };
    this.displayEvent = model;
  }

  logger: any[] = [];

  eventRender(model: any) {
    this.logger.push(model);
  }

  clearEvents() {
    this.events = [];
  }

  loadevents(){

      this.eventservice.getEvents().subscribe(data => {
        this.events = data;
      });
    }


  @ViewChild("scheduler_here") schedulerContainer: ElementRef;

  closeagrAPID(){
    $("#c").slideToggle(0);
  }

  hidetable1(){
    $("#mn").slideToggle(2000);
  }
  ngOnInit() {

    this.ngProgress.start();
    this.chercher();


    this.loaderService.display(true);












    this.conseilgroup=this.formbuilder.group({
      nomConseiller:'',
      prenomConseiller:'',
      emailConseiller:'',
      dateDeNaissance:'',
      dateEmbauche:''



    });



    this.getConseillers();
  }

  ajouterConseillerService(){
    this.conseillerservice.addConseiller(this.conseiller).subscribe(data=>{
      console.log(this.conseiller);
      this.getConseillers();
      this.conseiller=new Conseiller();
    },
      error2 => console.log(error2))
  }

  ajoutConseiller(){
    this.ajouterConseillerService();
    //this.getConseillers();
    this.fermerModal();
  }


  closeModal(){
    this.modalRef.hide();
    this.conseillerAmodifi=new Conseiller();
  }

  new(){
   // this.conseiller=new Conseiller();
    this.display='block';
  }

  closeModalDeetails(){
    //this.display1='none';
    $("#j").hide();
  }



  chercher(){
    this.ngProgress.start();
    this.lien=3;

    this.getConseillers();
  }

  detail(conseiller:Conseiller,template:TemplateRef<any>){
    console.log(conseiller);
    this.selectedConseiller=conseiller;
   // this.display1="block";
   this.openModal(template);

  }

  conseillerSuppression:Conseiller=new Conseiller();
  // suppression conseiller
  supprimerConseiller(){
      this.conseillerservice.deleteConseiller(this.conseillerSuppression.id).subscribe(data=> {

          this.conseillers.content.splice(this.conseillers.content.indexOf(this.conseillerSuppression),1);
          this.modalRef.hide();

        },error2 => console.log(error2)
      )
  }

  next(){
    if(this.page<this.pages.length-1) {
      this.page = this.page + 1;
      this.getConseillers();
    }
  }

  previous(){
    if(this.page>0) {
      this.page = this.page - 1;
      this.getConseillers();
    }
  }

  fermerModal(){
    this.display='none';
    this.conseilgroup.reset();
  }


  // navigate to editConseiller
  editConseiller(id){
    this.router.navigate(['/home/EditConseiller',id]);

}



}
