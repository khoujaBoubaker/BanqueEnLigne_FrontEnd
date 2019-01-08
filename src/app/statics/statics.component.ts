import { Component, OnInit } from '@angular/core';
import {WeatherService} from '../../services/WeatherService';
import {Chart} from 'chart.js';

declare var $:any;

@Component({
  selector: 'app-statics',
  templateUrl: './statics.component.html',
  styleUrls: ['./statics.component.css']
})
export class StaticsComponent implements OnInit {

  chart=[];

  getUrl()
  {
    return "url('http://estringsoftware.com/wp-content/uploads/2017/07/estring-header-lowsat.jpg')";
  }

  constructor(public weather:WeatherService) { }

  hideDiv(){
    $("#sc1").toggle();
  }

  ngOnInit() {

    this.weather.dailyForCast().subscribe(res=>{
      console.log(res);

      let temp_max=res['list'].map(res=>res.temp.max);
      let temp_min=res['list'].map(res=>res.temp.min);
      let alldates=res['list'].map(res=>res.dt);

      let weatherDates=[];
      alldates.forEach((res)=>{
        let jsdate=new Date(res * 1000);
        weatherDates.push(jsdate.toLocaleTimeString('en',{year:'numeric',month:'short',day:'numeric'}))
      });

      //console.log(weatherDates)
      this.chart=new Chart('canvas',{
        type:'bar',
        data:{
          labels:weatherDates,
          datasets:[
            {
              data:temp_max,
              borderColor:'#3cba9f',
              backgroundColor:'#F31429',
              color:'#3cba9f'
            },
            {
              data:temp_min,
              borderColor:'#5739C2',
              fill:false
            },
          ]
        },
        options:{
          legend:{
            display:false
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


      }
    )
  }

}
