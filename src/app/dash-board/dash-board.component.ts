import { Component, OnInit } from '@angular/core';
import {ChiffreAffiareService} from '../../services/ChiffreAffiareService';

declare var $: any;

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css'],
  providers:[ChiffreAffiareService]
})
export class DashBoardComponent implements OnInit {

  chjours: number=0;
  chSemaine : number=0;
  chMois : number=0;
  chTrimestre : number=0;

  nombreDejoursParSemaine:number=7;
  nombreDejoursParMois:number=30;
  nombreDeJoursAujourdhui:number=0;

  public CalculerChiffreAffairesAujourdhui(){
    this.chiffreAffairesService.calculerChiffreDaffaires(this.nombreDeJoursAujourdhui).subscribe(
      data=>{
        this.chjours=data;
      },
      error1 => console.log(error1)
    )
  }

  public CalculerChiffreAffairesAuMois(){
    this.chiffreAffairesService.calculerChiffreDaffaires(this.nombreDejoursParMois).subscribe(
      data=>{
        this.chMois=data;
      },
      error1 => console.log(error1)
    )
  }


  public CalculerChiffreAffairesAlaSemaine(){
    this.chiffreAffairesService.calculerChiffreDaffaires(this.nombreDejoursParSemaine).subscribe(
      data=>{
        this.chSemaine=data;
      },
      error1 => console.log(error1)
    )
  }







  constructor(public chiffreAffairesService:ChiffreAffiareService) { }


  hideDiv(){
    $("#sc1").toggle();
  console.log("click");
  }

  ngOnInit() {
    // Instanciation du chiffre D'affaires
    this.CalculerChiffreAffairesAlaSemaine();
    this.CalculerChiffreAffairesAuMois();
    this.CalculerChiffreAffairesAujourdhui();

  }



}
