import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { DataService } from '../data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  animations: [

    trigger('addedCities', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
          ]))]), {optional: true}),

          query(':leave', stagger('300ms', [
            animate('.6s ease-in', keyframes([
              style({opacity: 1, transform: 'translateY(0)', offset: 0}),
              style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
              style({opacity: 0, transform: 'translateY(-75%)',     offset: 1.0}),
            ]))]), {optional: true})
      ])
    ])

  ]
})
export class SettingsComponent implements OnInit {


  addedCityText: String;
  addedCities= [];

  constructor(private _data: DataService) { }

  ngOnInit() {
    this._data.City.subscribe(res => this.addedCities = res);
    this._data.changeCity(this.addedCities);
  }

  addCity(){
    this.addedCities.push(this.addedCityText);
    this.addedCityText= '';
    this._data.changeCity(this.addedCities);
  }

  removeCity(i){
    this.addedCities.splice(i, 1);
    this._data.changeCity(this.addedCities);
  }

}
