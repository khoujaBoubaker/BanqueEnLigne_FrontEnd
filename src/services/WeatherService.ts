import {Injectable} from '@angular/core';
import {Http} from '@angular/http';


@Injectable()
export class WeatherService{

  constructor(private http:Http){}

  dailyForCast(){
    return this.http.get("https://samples.openweathermap.org/data/2.5/forecast/daily?id=524901&appid=b1b15e88fa797225412429c1c50c122a1").
      map(response=>response.json());
  }


}
