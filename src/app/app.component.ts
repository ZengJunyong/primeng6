import {Component, OnInit} from '@angular/core';
import {Car} from './Car';
import {CarService} from './CarService';
import {SortEvent} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cars1: Car[];

  cars2: Car[];

  cars3: Car[];

  cols: any[];

  multiSortMeta = [];

  constructor(private carService: CarService) {
  }

  ngOnInit() {
    this.carService.getCarsSmall().then(cars => this.cars1 = cars);
    this.carService.getCarsSmall().then(cars => this.cars2 = cars);
    this.carService.getCarsSmall().then(cars => this.cars3 = cars);

    this.cols = [
      {field: 'vin', header: 'Vin'},
      {field: 'year', header: 'Year'},
      {field: 'brand', header: 'Brand'},
      {field: 'color', header: 'Color'}
    ];
    this.multiSortMeta.push({field: 'year', order: 1});
    this.multiSortMeta.push({field: 'brand', order: -1});
  }

  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
      const value1 = data1[event.field];
      const value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null) {
        result = -1;
      } else if (value1 != null && value2 == null) {
        result = 1;
      } else if (value1 == null && value2 == null) {
        result = 0;
      } else if (typeof value1 === 'string' && typeof value2 === 'string') {
        result = value1.localeCompare(value2);
      } else {
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
      }

      return (event.order * result);
    });
  }

}
