import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';


@Injectable()
export class EventService{

  public getEvents(): Observable<any> {
    const dateObj = new Date();
    const yearMonth = dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
    let data=[{
      title:'all day event',
      start: yearMonth + '-01',

    },{
      title: 'Long Event',
      start: yearMonth + '-09',
      end: yearMonth + '-10'
    },
      {
        title: 'Long Event',
        start: yearMonth + '-09',
        end: yearMonth + '-10'
      }


    ];



    return Observable.of(data);

  }

}
