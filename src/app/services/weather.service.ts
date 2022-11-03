import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(public httpClient: HttpClient) { }

  public getWeatherInfo(lattitude: number, longitude:number): Observable<any>{
    return this.httpClient.get('https://api.open-meteo.com/v1/forecast?latitude='+lattitude+'&longitude='+longitude+'&current_weather=true');
  }
}
