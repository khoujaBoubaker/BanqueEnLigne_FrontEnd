import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-cl',
  templateUrl: './new-cl.component.html',
  styleUrls: ['./new-cl.component.css']
})
export class NewClComponent implements OnInit {

  step:number=1;

  constructor() { }

  ngOnInit() {
  }

  step2(){
    this.step=2;
  }
  step1(){
    this.step=1;
  }

  step3(){
    this.step=3;
  }

}
