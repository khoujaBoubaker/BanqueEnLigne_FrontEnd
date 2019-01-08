import {Injectable} from '@angular/core';
import {Event} from './Event';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class EvService{

  get(){
    return Promise.resolve([
      {id: 1, start_date: "2018-03-22 10:00", end_date: "2018-03-22 13:00", text: "Event 1"},
      {id: 2, start_date: "2017-09-03 00:00", end_date: "2017-09-03 13:00", text: "Event 2"},
    ]);
  }

}
