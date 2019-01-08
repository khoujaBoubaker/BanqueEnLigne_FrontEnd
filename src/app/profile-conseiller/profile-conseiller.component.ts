import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Route} from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile-conseiller',
  templateUrl: './profile-conseiller.component.html',
  styleUrls: ['./profile-conseiller.component.css']
})
export class ProfileConseillerComponent implements OnInit {

  constructor(public activatedroute:ActivatedRoute,public router:Router) { }

  ngOnInit() {
    this.activatedroute.snapshot['id'];
  }

}
