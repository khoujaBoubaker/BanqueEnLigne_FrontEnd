import {Component, OnInit, TemplateRef} from '@angular/core';
import {Chart} from 'Chart.js';

import {variable} from '@angular/compiler/src/output/output_ast';
import {GrapheService} from '../../services/GrapheService';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ChiffreAffiareService} from '../../services/ChiffreAffiareService';
import {NgProgress} from 'ngx-progressbar';
import {ClientService} from '../../services/ClientService';
import {ConseillerService} from '../../services/ConseillerService';

declare var $:any;

@Component({
  selector: 'app-graphique',
  templateUrl: './graphique.component.html',
  styleUrls: ['./graphique.component.css'],
  providers:[ChiffreAffiareService,ClientService,ConseillerService]
})
export class GraphiqueComponent implements OnInit {

  chjours:number=0;
  chSemaine : number=0;
  chMois : number= 0;
  chTrimetstre : number=0;
  totalClients:number;

  nombreDejoursParSemaine:number=7;
  nombreDejoursParMois:number=30;
  nombreDeJoursAujourdhui:number=0;

 // totalconseillers:number;







  // calculer chiffre affaires aujourd'hui

  public CalculerChiffreAffairesAujourdhui(){
    this.chiffreAffairesService.calculerChiffreDaffaires(this.nombreDeJoursAujourdhui).subscribe(
      data=>{
        this.chjours=data;
      },
      error1 => console.log(error1)
    )
  }

  // calculer chiffre affaires semaine
  public CalculerChiffreAffairesAlaSemaine(){
    this.chiffreAffairesService.calculerChiffreDaffaires(this.nombreDejoursParSemaine).subscribe(
      data=>{
        this.chSemaine=data;
      },
      error1 => console.log(error1)
    )
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

  f(){
 alert("fff");
  }

  jourBar:number=7;
  public modalRef:BsModalRef;

  alertMe(){
    alert('blob');
  }

  chart=[];

  chartme=[];
  chartline=[];

  hideDiv(){
    $("#sc1").toggle();
  }

  constructor(
              public grapheservice:GrapheService,
              public modalService:BsModalService,
              public chiffreAffairesService:ChiffreAffiareService,
              public ngProgress:NgProgress,
              public clientService:ClientService,
              public conseilService:ConseillerService) {

  }

  affidherDetailGraphiqueSemaine(temp:TemplateRef<any>){
    this.modalRef=this.modalService.show(temp);
  }

  public CalculerChiffreAffairesAuMois(){
    this.chiffreAffairesService.calculerChiffreDaffaires(this.nombreDejoursParMois).subscribe(
      data=>{
        this.chMois=data;
      },
      error1 => console.log(error1)
    )
  }

  range(){
    $("#reportrange").datepicker();
  }


  public NombreClients(){
    this.clientService.sizeClients().subscribe(data=>{
      this.totalClients=data;
    },
      error1 => console.log(error1))
  }


  charthere:Boolean=true;

  ngOnInit() {
  // load scripts files
   this.loadScript('../assets/js/jquery.min.js');
   this.loadScript('../assets/js/Chart.min.js');


    this.ngProgress.start();

    this.CalculerChiffreAffairesAujourdhui();
    this.CalculerChiffreAffairesAlaSemaine();
    this.CalculerChiffreAffairesAuMois();
    this.NombreClients();




    this.grapheservice.getGraphiquesParPeriode(this.jourBar).subscribe(res=>{
      this.ngProgress.done();
      console.log(res);

      let montantRetraits=res.map(res=>res.montantRetraits);
      let montantVersements=res.map(res=>res.montantVersements);
      let total=res.map(res=>res.montantToutesOperations);
      let toutesLesDates=res.map(res=>res.date);
      //let

      let graphDates=[];
      toutesLesDates.forEach((res)=>{
        let jsdate=new Date(res);
        graphDates.push(jsdate.toLocaleDateString('en',{year:'numeric',month:'short',day:'numeric'}))
      });
      console.log(graphDates);

      this.chartme=new Chart('canvas',{
        type:'bar',
        data:{
          labels:graphDates,
          datasets:[
            {
              label:'Retraits',
              data:montantRetraits,



              fill:true,
              backgroundColor:'#F31429'
            },
            {
              label:'Versements',
              data:montantVersements,

              fill:false,
              fontSize:14,
              backgroundColor:'#2DC5C2'
            },
            {
              label:'Total',
              data:total,
              fontSize:14,

              fill:false,
              backgroundColor:'#DFCBC2'
            }
          ]
        },
        options:{
          legend:{
            display:true,
            labels:{
              fontColor:"#154360",
              fontSize:14
            }


          },
          title:{
             display:true,
            text:'stat de la semain en cours'
          },
          scales:{
            xAxes:[{
              display:true
            }],
            yAxes:[{
              display:true

            }]
          }

        }
      }),
        this.chart=new Chart('canvas1',{
          type:'line',
          data:{
            labels:graphDates,
            datasets:[
              {
                label:'Retraits',
                data:-montantRetraits,


                fill:true,
                backgroundColor:'#3cba9'
              },
              {
                label:'Versements',
                data:montantVersements,

                fill:false,
                backgroundColor:'#5739C2'
              },
              {
                label:'Total',
                data:total,

                fill:false,
                backgroundColor:'#F1C40F'
              }
            ]
          },
          options:{
            legend:{
              display:true,


            },
            title:{
              display:true,
              text:'stat de la semain en cours'
            },
            scales:{
              xAxes:[{
                display:true
              }],
              yAxes:[{
                display:true

              }]
            }

          }
        })

this.charthere=false;




    })








  }

}
