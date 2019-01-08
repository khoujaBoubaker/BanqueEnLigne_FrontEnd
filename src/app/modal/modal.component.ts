import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  display='none';

  constructor(private spinnerService: Ng4LoadingSpinnerService) { }

  openModal(){
    this.display="block";
  }

  ngOnInit() {
  }

}
