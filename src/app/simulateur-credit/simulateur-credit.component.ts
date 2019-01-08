import {Component, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {NgProgress} from 'ngx-progressbar';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CreditService} from '../../services/CreditService';
import {Credit} from '../../Model/Credit';
import {ToastsManager} from 'ng2-toastr';
import {Chart} from 'Chart.js';

import {BsModalRef, BsModalService} from 'ngx-bootstrap';



@Component({
  selector: 'app-simulateur-credit',
  templateUrl: './simulateur-credit.component.html',
  styleUrls: ['./simulateur-credit.component.css'],
  providers: [CreditService]
})
export class SimulateurCreditComponent implements OnInit {

  public modalRef: BsModalRef;
  CoutTotal:number;

  creditgroup : FormGroup;
  nbre:number;
  mensualite:number;
  credit : Credit;
  chartCredit=[];

  // chart stubs
  apptPersonnel:number=0;
  montantCdt:number=0;


  log(){
    alert(this.nbre);
  }





  calculer(temp:TemplateRef<any>){
    this.credit=new Credit();
    this.credit.apport=this.creditgroup.get('apportPersonnel').value;
    this.credit.montantemprunte=this.creditgroup.get('MontantTotalCredit').value;
    this.credit.duree=this.creditgroup.get('dureeCredit').value;
    //console.log(this.credit);
    this.apptPersonnel=this.creditgroup.get('apportPersonnel').value;
    this.montantCdt=this.creditgroup.get('MontantTotalCredit').value;
    this.creditService.CoutCredit(this.credit.apport,this.credit.montantemprunte,this.credit.duree).subscribe(data=>{
      this.CoutTotal=data;
    },
      error1 => console.log(error1))
    this.creditService.simulerCredit(this.credit.apport,this.credit.montantemprunte,this.credit.duree).subscribe(data=>{
      this.mensualite=data;
      // CHART INSTANCIATION



      // FIN DE L'INSTANTIATION
     // this.ouvrirModalSimulateur(temp);
      $("#snack").addClass('shw');
        $("#snack").addClass('alertt');
      console.log(this.mensualite);
    },
      error1 => console.log(error1))
  }

  constructor(public ngProgress:NgProgress,
              public formBuilder : FormBuilder,
              public creditService:CreditService,
              private modalService: BsModalService,
              public vcr:ViewContainerRef,
              public totastr:ToastsManager)
   {
    this.totastr.setRootViewContainerRef(vcr);
  }

  ouvrirModalSimulateur(temp:TemplateRef<any>){
    this.modalRef = this.modalService.show(temp);

  }

  fermeModalSuppression(){
    this.modalRef.hide();
  }





  ngOnInit() {
    this.totastr.info("Simulation crédit en ligne","Crédit");
    this.ngProgress.start();
    this.ngProgress.done();
    this.creditgroup=this.formBuilder.group({
      apportPersonnel:'',
      dureeCredit:'',
      MontantTotalCredit:'',

    })



  }

}
