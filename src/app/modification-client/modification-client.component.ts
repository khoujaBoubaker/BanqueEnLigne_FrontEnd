import {Component, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientService} from '../../services/ClientService';
import {Client} from '../../Model/Client';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

declare var $ :any;

@Component({
  selector: 'app-modification-client',
  templateUrl: './modification-client.component.html',
  styleUrls: ['./modification-client.component.css'],
  providers:[ClientService]
})
export class ModificationClientComponent implements OnInit {


  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  formgroupClient:FormGroup;

  constructor(public fbc:FormBuilder,
              public route:ActivatedRoute,
              public router:Router,
              public clientservice:ClientService,
              public vcr:ViewContainerRef,
              private modalService:BsModalService) {

  }

  changed:boolean=false;
  id:number;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  client:Client=new Client();

  // appel au service
  change(){
    this.changed=true;
  }

  // update client

  clientSelected: Client;
  clientModifiabl: Client = new Client();

  updateClient() {


    // console.log("id "+this.selectedClient.idclient);
    // console.log("client pris en param"+this.selectedClient);
    // console.log(c); logger les données passées en paramètre
    //this.clientModifiable=new Client();



    // console.log(this.selectedClient);
    // console.log(this.selectedClient.idclient);
    //console.log("nom"+this.formgroupClient.get('nomClient').value);

    this.clientModifiabl.nom = this.formgroupClient.get('nomClient').value;
    this.clientModifiabl.prenom = this.formgroupClient.get('prenomClient').value;
    this.clientModifiabl.email = this.formgroupClient.get('emailClient').value;
    this.clientModifiabl.datedenaissance = this.formgroupClient.get('datedenaissance').value;
    this.clientModifiabl.salaire = this.formgroupClient.get('salaireClient').value;
    console.log(this.clientModifiabl);



 this.clientservice.updateClient(this.id,this.clientModifiabl).subscribe(data=>{
   //alert("modified data");
   this.router.navigate(['/home/clients']);
   },
   error2 =>
     console.log(error2));
     //this.modalRef=this.modalService.show(temp:TemplateRef);

   }

  public modalRef:BsModalRef;

  sessionExpiree(template:TemplateRef<any>){
    this.modalRef=this.modalService.show(template);

  }

  ngOnInit() {

    this.loadScript('../assets/js/jquery.min.js');
    this.loadScript('../assets/js/custom.min.js');
    this.loadScript('../assets/js/TooltipsBoubaker.js');



    this.id=+this.route.snapshot.params['id'];
    this.clientservice.getClient(this.id).subscribe(data=>{
      this.client=data;
    },
      error2 => console.log(error2));
    console.log(this.id);


    this.formgroupClient = this.fbc.group({
      nomClient: '',
      prenomClient: '',
      salaireClient: '',
      emailClient: ['', [Validators.pattern(this.emailPattern)]],
      datedenaissance: ''


    });
  }


  hideList() {

    $("#scl").toggle();
  }

}
