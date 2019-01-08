import { Component, OnInit } from '@angular/core';
import {Validator} from '@angular/forms';

@Component({
  selector: 'app-nouveau-formulaire',
  templateUrl: './nouveau-formulaire.component.html',
  styleUrls: ['./nouveau-formulaire.component.css']
})
export class NouveauFormulaireComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSaveContact(data){
    console.log(data);
}

}
