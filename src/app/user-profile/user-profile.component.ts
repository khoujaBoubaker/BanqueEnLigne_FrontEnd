import { Component,Input, OnInit } from '@angular/core';
import {User} from '../../Model/User';
import {AuthenticationServicee} from '../../services/AuthenticationServicee';
import {ActivatedRoute} from '@angular/router';
import {administrationService} from '../../services/administrationService';
import {DomSanitizer} from '@angular/platform-browser';
import {NgProgress} from 'ngx-progressbar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers:[AuthenticationServicee,administrationService]



})
export class UserProfileComponent implements OnInit {

  constructor(public authService:AuthenticationServicee,
              public route:ActivatedRoute,
              public adminService:administrationService,
              public sanitizer:DomSanitizer,public ngProgress:NgProgress) { }
  id:number;
  adminTrouve:any;

  user:any;


  private image : any;
  private readonly imageType : string='data:image/jpeg;base64,';




  ngOnInit() {

    this.ngProgress.start();
    this.id=+this.route.snapshot.params['id'];
    this.adminService.getAdministrateurById(this.id).subscribe(data=>{
      this.adminTrouve=data;
      console.log(this.adminTrouve);

      this.image=this.sanitizer.bypassSecurityTrustUrl(this.imageType+ data.pic);
      this.ngProgress.done();
     // this.authService.idadmin=this.id;
    },
      error1 => console.log(error1))

  }

}
