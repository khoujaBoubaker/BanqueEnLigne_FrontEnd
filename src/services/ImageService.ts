import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, ResponseContentType} from '@angular/http';
import {DomSanitizer} from '@angular/platform-browser';


@Injectable()
export class ImageService{

  imageToShow:any;

  public constructor(public http:Http,
                     private sanitizer:DomSanitizer){}

  public myFunction(b:Blob){
    let mySrc=this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,'+b);
  }






}
