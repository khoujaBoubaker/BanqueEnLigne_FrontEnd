import { Component, OnInit,Input } from '@angular/core';
import {AuthenticationServicee} from '../../services/AuthenticationServicee';
import {User} from '../../Model/User';

@Component({
  selector: 'app-profile-cp',
  templateUrl: './profile-cp.component.html',
  styleUrls: ['./profile-cp.component.css'],
  providers:[AuthenticationServicee]


})
export class ProfileCpComponent implements OnInit {

  @Input() user:any;

  constructor(public authService:AuthenticationServicee) { }

  ngOnInit() {

  }

}
