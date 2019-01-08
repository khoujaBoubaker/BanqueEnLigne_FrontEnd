import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationServicee} from '../../services/AuthenticationServicee';
import {ToastsManager} from 'ng2-toastr';
import {User} from '../../Model/User';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgProgress} from 'ngx-progressbar';

declare var $: any;



declare var feather:any;

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  loading : boolean=false;

  user : User=new User();
  formgroupLG:FormGroup;

  constructor(public router:Router,
              public route:ActivatedRoute,
              public authService:AuthenticationServicee,
              public totastr:ToastsManager,
              vcr:ViewContainerRef,
              public fblogin:FormBuilder,
              public ngProgress:NgProgress


              ) {
    this.totastr.setRootViewContainerRef(vcr);
  }


  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }




  ngOnInit() {

    // GESTION DE SESSION



   // this.loadScript('../assets/js/jquery.min.js');
    this.loadScript('../assets/js/h.js');
    this.loadScript('../assets/js/jquery1.min.js');
   // this.loadScript("../assets/js/formoid-solid-blue.js");
    //this.loadScript('https://code.jquery.com/jquery-1.1.14.js');
    //this.loadScript('https://code.jquery.com/jquery-2.2.4.js');


    this.formgroupLG=this.fblogin.group({
      username:'',
      password:''
    });

    this.formgroupLG.reset();

    //reset
    this.authService.logout();
    console.log("--- value ---");
    console.log(this.formgroupLG.value);


  }


  loginn(){

    this.ngProgress.start();



    this.user=this.formgroupLG.value;
    if(this.formgroupLG.status=="VALID"){

      this.loading=true;

      this.authService.loginn(this.user)
        .subscribe(resp=>{


            let jwt = resp.headers.get('authorization');

            this.loading=false;
            this.ngProgress.done();



            this.authService.saveToken(jwt);
            //this.authService.loadToken();
            console.log("log is"+this.authService.jwtToken);
            console.log("admin :"+this.authService.isAdmin());
            //console.log(this.authService.roles);

            this.router.navigateByUrl('/home/clients');
            //  this.authService.loadToken();

          },
          err=>{

            this.loading=false;
            console.log(err);
            if(err.status==401){
              this.totastr.error('mot de pass incorrect','fail');
              this.ngProgress.done();
            }
          })


    }





  }




}
