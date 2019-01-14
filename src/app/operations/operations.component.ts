import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OperationService} from '../../services/OperationService';
import {Operation} from '../../Model/Operation';
import {RouterExtService} from '../../services/RouterExtService';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css'],
  providers:[OperationService,RouterExtService]
})
export class OperationsComponent implements OnInit {
  idnumber:number;
  operations:any;
  page:number=0;
  size:number=5;
  pages:Array<number>;
  date:Date=new Date();
  display='none';
  operationDetail:Operation;
  x:number=0;

  constructor(private routerExtService:RouterExtService, public router:Router,public activatedroute:ActivatedRoute,
              public operationService:OperationService) {
    console.log(this.activatedroute.snapshot.params['id']);
    this.idnumber=this.activatedroute.snapshot.params['id'];

  }

  retour(){
    this.x=2;
    this.router.navigate(['listeClients',this.x]);
  }

  ngOnInit() {
// appel au service qui recupere tous les virements du compte
    this.getOperations(this.idnumber);
    console.log(this.operations);
    this.operationDetail=new Operation();
  }

  close(){
    this.display="none";

  }

  gotoPage(i){
   this.page=i;
   this.getOperations(this.idnumber);
  }


  getOperations(idnumber){
    this.operationService.getOperations(this.idnumber,this.page,this.size).subscribe(data=> {
      this.operations = data;
      this.pages=new Array(data.totalPages);
    },
      error2 => {
      console.log(error2);
    })

  }





  supprimerOperation(operation:Operation){
       this.operationService.supprimer(operation.numero).subscribe(data=>{
         this.operations.content.splice(
           this.operations.content.indexOf(operation), 1)
       },
         error2 => {console.log(error2)})
  }

  next(){
    this.page=this.page+1;
    this.getOperations(this.idnumber);
  }

  previous(){
    this.page=this.page-1;
    this.getOperations(this.idnumber);
  }


  details(operation){

this.display="block";
this.operationDetail=operation;
console.log(this.operationDetail);
  }



}
