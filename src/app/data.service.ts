import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { HttpClient } from '@angular/common/http';

import { Weather } from './weather';
@Injectable({
	providedIn: 'root'
})
export class DataService {
	private weather: Weather[] = [];
	weatherCityToSearch: Weather;
	constructor(private http: HttpClient) { }
	private addedCities = new BehaviorSubject<any>([]);
	City = this.addedCities.asObservable();
	changeCity(City) {
		this.addedCities.next(City)
	}
	currentWeather(cityWeather: string) {
		return this.http.request("GET",`http://api.openweathermap.org/data/2.5/weather?appid=9bc4ea8d30f574651730786313f5ba07&q=${cityWeather}&units=metric`,{responseType:"json"});
	}

}
