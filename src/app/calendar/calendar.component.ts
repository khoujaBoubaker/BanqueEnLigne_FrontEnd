import { Component, OnInit,ViewChild,ElementRef ,ViewEncapsulation} from '@angular/core';
import {Router,Route} from '@angular/router';
import {FullCalendarComponent} from '../../Model/FullCalendarComponent';
import {EvService} from '../../services/EvService';
import {NgProgress} from 'ngx-progressbar';


declare var $ :any;

@Component({
  encapsulation:ViewEncapsulation.None,
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers:[EvService]
})
export class CalendarComponent implements OnInit {
  constructor(public evservice:EvService,public ngProgress:NgProgress){



  }

  @ViewChild("scheduler_here") schedulerContainer: ElementRef;





  ngOnInit(){

    this.ngProgress.start();
    this.ngProgress.done();



    $('body').ready(function(event){

    });

    function block_readonly(id){
      var event = scheduler.getEvent(id);
      if (id == undefined || event.user == "Alex") return true;
      return event.readonly;
    }

    scheduler.attachEvent("onBeforeDrag",block_readonly);
    scheduler.attachEvent("onDblClick",block_readonly);

    scheduler.config.xml_date = "%Y-%m-%d %H:%i";
    scheduler.init(this.schedulerContainer.nativeElement, new Date(),"month");
    this.evservice.get().then((data)=>{
      scheduler.parse(data,"json");
    })
  }





}
