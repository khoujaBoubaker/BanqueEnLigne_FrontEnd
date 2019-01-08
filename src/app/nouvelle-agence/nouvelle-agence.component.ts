import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Agence} from '../../Model/Agence';
import {AgenceService} from '../../services/AgenceService';
import {ToastsManager} from 'ng2-toastr';
import {NgProgress} from 'ngx-progressbar';

@Component({
  selector: 'app-nouvelle-agence',
  templateUrl: './nouvelle-agence.component.html',
  styleUrls: ['./nouvelle-agence.component.css'],
  providers:[AgenceService]
})
export class NouvelleAgenceComponent implements OnInit {


  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  agencegroup:FormGroup;
  x:number;

  constructor(public ag:FormBuilder,public agenceService:AgenceService,
              public totastr:ToastsManager,
              public vcr:ViewContainerRef,
              public ngProgress:NgProgress) {
    this.totastr.setRootViewContainerRef(vcr);
  }

  initiationPage()
  {
    this.totastr.success('formulaire ajout', 'Agence', {
      timeOut: 1000, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
    });
  }

  ngOnInit() {
    this.ngProgress.start();
    this.ngProgress.done();



    this.initiationPage();

    this.x=0;
    this.agencegroup=this.ag.group({
      addresse:'',
      commune:'',
      tel:''


    })
  }

 agence:Agence;
  SaveAgence(){
    this.agence=this.agencegroup.value;
    console.log(this.agence);
    this.totastr.info('Confirmation ', 'Agence',{timeOut: 3000, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
    });
    this.x=2;

  }

  annuler(){
    this.x=0;
    this.totastr.info('opération annulée ', 'Annulation',{timeOut: 3000, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
    });
  }

  confirmerAjoutAgence(){
    this.agence=new Agence();
    this.agence.addresse=this.agencegroup.get('addresse').value;
    this.agence.commune=this.agencegroup.get('commune').value;
    this.agence.telephone=this.agencegroup.get('tel').value;
    console.log(this.agence);
    this.agenceService.addagence(this.agence).subscribe(data=>{
      console.log(data);
    });
    this.totastr.success('agence ajoutée avec succés ', 'Succès',{timeOut: 3000, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
    });
    this.x=3;
  }

  formulaire(){
    this.x=0;
    this.agencegroup.reset();
  }

  closeag(){
    $("#nv").slideToggle();
  }

  closeagrapid(){
    $("#agences").slideToggle(0);
  }









}
