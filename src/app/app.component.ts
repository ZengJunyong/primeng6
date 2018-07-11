import {Component, OnInit} from '@angular/core';
import {Car} from './Car';
import {CarService} from './CarService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cars: Car[];

  constructor(private carService: CarService) {
  }

  ngOnInit() {
    this.carService.getCarsSmall().then(cars => this.cars = cars);
  }
}
