import { Component, OnInit,ElementRef,ViewChild,ViewEncapsulation} from '@angular/core';
import "dhtmlx-scheduler";
import {} from "@types/dhtmlxscheduler";
import {EvService} from '../../services/EvService';

declare var $ :any;

@Component({
  encapsulation:ViewEncapsulation.None,
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css'],
  providers:[EvService]
})
export class SchedulerComponent implements OnInit {

  @ViewChild("scheduler_here") schedulerContainer: ElementRef;

  constructor() { }

  ngOnInit() {
    scheduler.init(this.schedulerContainer.nativeElement);


  }

}
