import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Weather } from '../weather';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	citiesToSearch: any;
	allCitiesWeatherData:Weather[]=[];
	constructor(private route: ActivatedRoute, private router: Router, private _data: DataService) {
	}
	ngOnInit() {
		this._data.City.subscribe(res => this.citiesToSearch = res);
			
		this.allCitiesWeatherData.splice(0, this.citiesToSearch.length);
		for (let city of this.citiesToSearch) {
			this._data.currentWeather(city).subscribe(
				(response) => {
					console.log('data: ' + JSON.stringify(response))
					const weatherCityToSearch = new Weather(response['name'], response['main']['temp'], response['weather'][0]['icon']);
					//console.log(this.weatherCityToSearch);
					this.allCitiesWeatherData.push(weatherCityToSearch);
				}
			)
		}
		return this.allCitiesWeatherData

	}

}