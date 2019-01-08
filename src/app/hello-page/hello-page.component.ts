import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap';
import {ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'app-hello-page',
  templateUrl: './hello-page.component.html',
  styleUrls: ['./hello-page.component.css']
})
export class HelloPageComponent implements OnInit {

  constructor(
    public vcr: ViewContainerRef,
    private modalService: BsModalService,
    public totastr: ToastsManager
  ) {
      this.totastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {

    this.totastr.success('Biencenue', 'Authentification', {
      timeOut: 3000, showProgressBar: true, pauseOnHover: false, clickToClose: true, maxLength: 50
    });
  }

}
