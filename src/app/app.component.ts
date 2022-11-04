import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { WeatherService } from './services/weather.service';
import * as moment from 'moment';
import 'moment-timezone';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  public weatherFormGroup: FormGroup;
  public city: string;
  public lattitude: number;
  public longitude: number;
  public cities = [{"name": "Dallas", "lat":32.46, "long": -96.48}, {"name":"Chicago", "lat":41.85, "long": -87.65}, {"name":"New York", "lat":40.71, "long": -74.01}];
  public searchDisabled: boolean = true;
  public results: {
    temperature: number,
    windspeed: number,
    winddirection: number,
    weathercode: number,
    time: string
  };
  public weatherCodeName: string;
  public weathercode = [{"id":0, "code": "Clear sky"}, 
  {"id":1, "code": "Mainly clear, partly cloudy, and overcast"},{"id":2, "code":"Mainly clear, partly cloudy, and overcast"},{"id":3, "code": "Mainly clear, partly cloudy, and overcast"},
  {"id":45, "code": "Fog and depositing rime fog"},{"id":48, "code": "Fog and depositing rime fog"},
  {"id":51, "code": "Drizzle: Light, moderate, and dense intensity"},{"id":53, "code": "Drizzle: Light, moderate, and dense intensity"},{"id":55, "code": "Drizzle: Light, moderate, and dense intensity"},
  {"id":56, "code": "Freezing Drizzle: Light and dense intensity"},{"id":57, "code": "Freezing Drizzle: Light and dense intensity"},
  {"id":61, "code": "Rain: Slight, moderate and heavy intensity"},{"id":63, "code": "Rain: Slight, moderate and heavy intensity"},{"id":65, "code": "Rain: Slight, moderate and heavy intensity"},
  {"id":66, "code": "Freezing Rain: Light and heavy intensity"},{"id":67, "code": "Freezing Rain: Light and heavy intensity"},
  {"id": 71, "code": "Snow fall: Slight, moderate, and heavy intensity"},{"id":73, "code": "Snow fall: Slight, moderate, and heavy intensity"},{"id":75, "code": "Snow fall: Slight, moderate, and heavy intensity"},
  {"id":77, "code": "Snow grains"}, 
  {"id":80, "code": "Rain showers: Slight, moderate, and violent"},{"id":81, "code": "Rain showers: Slight, moderate, and violent"},{"id":82, "code": "Rain showers: Slight, moderate, and violent"},
  {"id":85, "code": "Snow showers slight and heavy"},{"id":86, "code": "Snow showers slight and heavy"},
  {"id":95, "code": "Thunderstorm: Slight or moderate"},
  {"id":96, "code": "Thunderstorm with slight and heavy hail"},{"id":99, "code": "Thunderstorm with slight and heavy hail"}
];

  constructor(private fb: FormBuilder,
              public weatherService: WeatherService){}
  
  ngOnInit(){
    this.weatherFormGroup = this.fb.group({
      lattitude: [null],
      longitude: [null],
      city: [""]
    });

    this.weatherFormGroup.valueChanges.subscribe(form => {
      if(form.city || (form.longitude && form.lattitude)){
        this.searchDisabled = false;
      }else{
        this.searchDisabled = true;
      }
    })
  }

  getWeather(){
    this.city = this.weatherFormGroup.get('city')?.value;
    this.longitude = this.weatherFormGroup.get('longitude')?.value;
    this.lattitude = this.weatherFormGroup.get('lattitude')?.value;
    if(this.city){
     this.lattitude = parseInt(this.city.split(',')[0]);
     this.longitude = parseInt(this.city.split(',')[1]);
    }
    this.weatherService.getWeatherInfo(this.lattitude, this.longitude).subscribe(res => {
      this.results = res.current_weather;
      var localDate = moment.utc(this.results.time).toDate();
      this.results.time = moment(localDate).local().format('MM/DD/YYYY');
    });
  }

  getWeatherCode(id:number){
    var found = this.weathercode.filter(codes => codes.id == id);
    return found[0].code;
  }

}
